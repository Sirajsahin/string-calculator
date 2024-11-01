// src/StringCalculator.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

describe("StringCalculator", () => {
  // Mock the window.alert function before each test
  beforeEach(() => {
    window.alert = jest.fn();
  });

  // Clear mock calls after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 0 for an empty string", () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/result/i)).toHaveTextContent("Result: 0");
  });

  test("should return the number for a single number", () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/result/i)).toHaveTextContent("Result: 1");
  });

  test("should return the sum of two numbers", () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), {
      target: { value: "1,5" },
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/result/i)).toHaveTextContent("Result: 6");
  });

  test("should handle new lines between numbers", () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), {
      target: { value: "1\n2,3" },
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/result/i)).toHaveTextContent("Result: 6");
  });

  test("should handle custom delimiters", () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), {
      target: { value: "//;\n1;2" },
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/result/i)).toHaveTextContent("Result: 3");
  });

  test("should throw an error for negative numbers", () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), {
      target: { value: "1,-2,3" },
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(window.alert).toHaveBeenCalledWith(
      "negative numbers not allowed: -2"
    );
  });
});
