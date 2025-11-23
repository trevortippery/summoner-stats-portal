import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom/vitest';
import Header from "../Header";

afterEach(cleanup);


const mockUseLocation = vi.fn();

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    useLocation: () => mockUseLocation(),
  };
});

vi.mock('../Search', () => ({
  default: () => <div data-testid="search">Search</div>
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("has navigation with accessible label", () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    render(<Header />);

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  describe("when on home page", () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/' });
    });

    it("does not show search", () => {
      render(<Header />);

      expect(screen.queryByTestId('search')).not.toBeInTheDocument();
    });

    it("shows home link", () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    });
  });

  describe("when on summoner page", () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/summoner/test/tag' });
    });

    it("shows search", () => {
      render(<Header />);

      expect(screen.getByTestId('search')).toBeInTheDocument();
    });

    it("shows home link", () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    });
  });
});