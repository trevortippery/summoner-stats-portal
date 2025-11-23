import { afterEach, expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import useProfile from "../useProfile";
import { cleanup, render, renderHook, waitFor } from "@testing-library/react";

afterEach(cleanup);


const fetchMocker = createFetchMock(vi);
const mockSetSummonerInfo = vi.fn();
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

const testProfile = {
  profileIconId: "0",
  summonerLevel: 30,
  gameName: "Tippery",
}

function getProfile() {
  let profile;

  function TestComponent() {
    profile = useProfile();
    return null;
  }

  render(<TestComponent />)

  return profile;
}

test("gives loading false and profile null when first called", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testProfile));
  const profile = getProfile();
  expect(profile).toEqual({
    loading: false,
    profile: null,
  });
});

test("to be loading false and profile null on initial load", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testProfile));
  const { result } = renderHook(() => useProfile());
  expect(result.current).toEqual({
    loading: false,
    profile: null,
  });
});

test('should call the API and give back the profile', async () => {
  const platform = 'na1';
  const puuid = 'test-puuid-123';
  const mockProfile = { name: 'TestPlayer', level: 30 };

  fetchMocker.mockResolvedValueOnce({
    ok: true,
    json: async () => mockProfile
  });

  const { result } = renderHook(() => useProfile(platform, puuid));

  // Wait for the hook to make the API call
  await waitFor(() => {
    expect(fetchMocker).toHaveBeenCalledWith(`/api/summoner/by-puuid/${platform}/${puuid}`);
  });

  expect(result.current.profile).toEqual(mockProfile);
});