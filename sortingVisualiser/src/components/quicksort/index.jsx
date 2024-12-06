import React from "react";
import { useState,useEffect } from "react";
function QuickSort() {
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
  const quickSort = () => {
    const animations = [];
    const arrayCopy = [...array];
    quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, animations);
    animateSorting(animations);
  };
  
  const quickSortHelper = (array, low, high, animations) => {
    if (low < high) {
      const pivotIdx = partition(array, low, high, animations);
      quickSortHelper(array, low, pivotIdx - 1, animations);
      quickSortHelper(array, pivotIdx + 1, high, animations);
    }
  };
  
  const partition = (array, low, high, animations) => {
    const pivot = array[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        animations.push([i, j]);
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    animations.push([i + 1, high]);
    return i + 1;
  };
  
  return <div>
    <h1>Quick Sort</h1>
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
        <button onClick={quickSort}>Start</button>
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
  </div>;
}

export default QuickSort;
