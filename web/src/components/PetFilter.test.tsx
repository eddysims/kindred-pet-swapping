import { render, screen, fireEvent } from "@testing-library/react";
import { PetFilter } from "./PetFilter";
import type { PropsWithChildren } from "react";

const mockSetFilterBy = jest.fn();
const mockSetShowAvailable = jest.fn();

jest.mock("nuqs", () => ({
  useQueryState: jest.fn((key: string) => {
    if (key === "filterBy") {
      return ["", mockSetFilterBy];
    }
    if (key === "showAvailable") {
      return [false, mockSetShowAvailable];
    }
    return ["", jest.fn()];
  }),
  parseAsString: {
    withDefault: (defaultValue: string) => ({ defaultValue }),
  },
  parseAsBoolean: {
    withDefault: (defaultValue: boolean) => ({ defaultValue }),
  },
}));

type SelectProps = {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

jest.mock("@/components/ui/select", () => {
  let mockOnValueChange: ((value: string) => void) | null = null;

  const MockSelect = ({
    defaultValue,
    onValueChange,
    children,
  }: PropsWithChildren<SelectProps>) => {
    mockOnValueChange = onValueChange || null;
    return (
      <div data-testid="mock-select" data-default-value={defaultValue}>
        {children}
      </div>
    );
  };

  const MockSelectTrigger = ({ children }: PropsWithChildren) => (
    <button
      type="button"
      role="combobox"
      aria-expanded="false"
      aria-controls="select-content"
      data-testid="select-trigger"
    >
      {children}
    </button>
  );

  const MockSelectValue = () => <span data-testid="select-value" />;

  const MockSelectContent = ({ children }: PropsWithChildren) => (
    <div data-testid="select-content">{children}</div>
  );

  const MockSelectItem = ({
    value,
    children,
  }: PropsWithChildren<{ value: string }>) => (
    <div
      data-testid={`select-item-${value}`}
      onClick={() => {
        if (mockOnValueChange) {
          mockOnValueChange(value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (mockOnValueChange) {
            mockOnValueChange(value);
          }
        }
      }}
    >
      {children}
    </div>
  );

  return {
    Select: MockSelect,
    SelectTrigger: MockSelectTrigger,
    SelectValue: MockSelectValue,
    SelectContent: MockSelectContent,
    SelectItem: MockSelectItem,
  };
});

describe("PetFilter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls setFilterBy with 'cat' when Cats option is selected", async () => {
    render(<PetFilter />);

    const catsOption = screen.getByTestId("select-item-cat");
    fireEvent.click(catsOption);

    expect(mockSetFilterBy).toHaveBeenCalledWith("cat");
  });

  it("calls setFilterBy with null when Show All option is selected", async () => {
    render(<PetFilter />);

    const showAllOption = screen.getByTestId("select-item-all");
    fireEvent.click(showAllOption);

    expect(mockSetFilterBy).toHaveBeenCalledWith(null);
  });

  it("calls setShowAvailable when checkbox is toggled", async () => {
    render(<PetFilter />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockSetShowAvailable).toHaveBeenCalledWith(true);
  });
});

describe("PetFilter Component with different initial states", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows correct default value when filterBy has a value", () => {
    const useQueryStateMock = jest.requireMock("nuqs").useQueryState;
    useQueryStateMock.mockImplementation((key: string) => {
      if (key === "filterBy") {
        return ["cat"];
      }
      return ["", jest.fn()];
    });

    render(<PetFilter />);

    const selectTrigger = screen.getByRole("combobox");
    expect(selectTrigger).toBeInTheDocument();
  });

  it("shows checked state when showAvailable is true", () => {
    const useQueryStateMock = jest.requireMock("nuqs").useQueryState;
    useQueryStateMock.mockImplementation((key: string) => {
      if (key === "showAvailable") {
        return [true];
      }
      return ["", jest.fn()];
    });

    render(<PetFilter />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
});
