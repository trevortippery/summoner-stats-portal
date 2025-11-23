import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import userEvent from "@testing-library/user-event";
import Search from '../Search';
import '@testing-library/jest-dom/vitest';
afterEach(cleanup);

// Create mock functions at module level
const mockNavigate = vi.fn();
const mockSetSummonerInfo = vi.fn();

// Mock modules with proper factory functions
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' }),
  };
});

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();


vi.mock('../contexts/SummonerContext', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useSummoner: () => ({
      setSummonerInfo: mockSetSummonerInfo,
      summoner: {
        gameName: "",
        tagLine: "",
        platform: "na1",
        region: "americas",
        puuid: null,
        loading: false,
        error: null,
      },
      setPuuid: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      resetSummoner: vi.fn(),
    }),
  };
});


describe('Search Component - User Perspective', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays a search form with all necessary fields', () => {
    render(<Search />);

    // User should see a region selector
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // User should see input fields with appropriate placeholders
    expect(screen.getByPlaceholderText('Game Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tag Line')).toBeInTheDocument();

    // User should see a submit button
    expect(screen.getByRole('button', { name: /Go!/i })).toBeInTheDocument();
  });


  it('allows user to select a region from the dropdown', async () => {
    const user = userEvent.setup();
    render(<Search />);

    const regionSelect = screen.getByRole('combobox');

    // Select using the option element
    const europeWestOption = screen.getByRole('option', { name: 'Europe West' });
    await user.selectOptions(regionSelect, europeWestOption);

    expect(regionSelect).toHaveValue('euw1|europe');
  });

  it('can submit search form and navigate to summoner page', async () => {
    const user = userEvent.setup();

    // Mock successful API response
    fetchMocker.mockResponseOnce(JSON.stringify({
      puuid: "test-puuid-123",
      gameName: "TestPlayer",
      tagLine: "NA1"
    }));

    render(<Search />);

    // Fill out the form
    const regionSelect = screen.getByRole('combobox');
    const gameNameInput = screen.getByPlaceholderText('Game Name');
    const tagLineInput = screen.getByPlaceholderText('Tag Line');
    const submitButton = screen.getByRole('button', { name: /Go!/i });

    // User interactions
    await user.selectOptions(regionSelect, 'na1|americas');
    await user.type(gameNameInput, 'TestPlayer');
    await user.type(tagLineInput, 'NA1');
    await user.click(submitButton);

    // Wait for async operations to complete
    await vi.waitFor(() => {
      // Verify navigation was called with correct route
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/summoner/TestPlayer/NA1',
      });
    });
  });
});

