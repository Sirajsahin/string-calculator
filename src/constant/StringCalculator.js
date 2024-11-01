// src/StringCalculator.js
import React, { useState } from "react";

const StringCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const add = (numbers) => {
    if (numbers === "") return 0;
    const delimiter = numbers.startsWith("//") ? numbers[2] : ",";
    const nums = numbers.split(new RegExp(`[${delimiter}\\n]`));
    const negativeNumbers = nums.filter((num) => parseInt(num) < 0);

    if (negativeNumbers.length > 0) {
      throw new Error(
        `negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

    return nums.reduce((sum, num) => sum + parseInt(num), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setResult(add(input));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">String Calculator</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-md w-full"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter numbers"
          className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </form>
      <h2 className="mt-4 text-lg font-semibold">
        Result: <span className="text-blue-500">{result}</span>
      </h2>
    </div>
  );
};

export default StringCalculator;
