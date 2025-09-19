require("@testing-library/jest-dom");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
  })),
});
