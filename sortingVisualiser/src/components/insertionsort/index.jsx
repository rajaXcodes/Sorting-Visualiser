import React from "react";
import { useState, useEffect } from "react";
function InsertionSort() {
  const [array, setArray] = useState([]);
  const [len, setLength] = useState(50);

  function initialiseArray() {
    const newArray = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArray);
  }

  useEffect(() => {
    initialiseArray();
  }, [len]);
  const insertionSort = () => {
    const animations = [];
    const arrayCopy = [...array];

    for (let i = 1; i < arrayCopy.length; i++) {
      let j = i - 1;
      const key = arrayCopy[i];

      while (j >= 0 && arrayCopy[j] > key) {
        arrayCopy[j + 1] = arrayCopy[j];
        animations.push([j + 1, arrayCopy[j]]);
        j--;
      }
      arrayCopy[j + 1] = key;
      animations.push([j + 1, key]);
    }

    animateSorting(animations);
  };

  return (
    <div>
      <h1>Insertion Sort</h1>
      <div className="array-container">
        <select
          name="dropdown"
          id="dropdown"
          onChange={(event) => setLength(parseInt(event.target.value))}
          value={len}
        >
          <option value="40">40</option>
          <option value="70">70</option>
          <option value="90">90</option>
          <option value="100">100</option>
          <option value="120">120</option>
        </select>
        <button onClick={initialiseArray}>Reset Array</button>
        <button onClick={insertionSort}>Start</button>
        <div className="array-bars">
          {array.map((val, idx) => (
            <div
              key={idx}
              className="array-bar"
              style={{ height: `${val}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InsertionSort;
