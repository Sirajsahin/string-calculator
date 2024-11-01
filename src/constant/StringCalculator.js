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
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter numbers"
        />
        <button type="submit">Add</button>
      </form>
      <h2>Result: {result}</h2>
    </div>
  );
};

export default StringCalculator;
