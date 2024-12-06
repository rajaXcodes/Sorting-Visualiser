import React, { useEffect, useState } from "react";
import "./index.css";

function QuickSort() {
  const [array, setArray] = useState([]);
  const [len, setLength] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [animationTimeouts, setAnimationTimeouts] = useState([]);

  function initialiseArray() {
    const newArray = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArray);
    setIsSorting(false);
  }
  useEffect(() => {
    return () => {
      animationTimeouts.forEach((timeout) => clearTimeout(timeout));
      setAnimationTimeouts([]);
      setIsSorting(false); 
    };
  }, []);
  useEffect(() => {
    initialiseArray();
  }, [len]);

  function util() {
    if (isSorting) return;
    setIsSorting(true);

    const animations = [];
    const copyArray = [...array];

    const quickSortHelper = (array, left, right) => {
      if (left >= right) return;
      const pivotIndex = partition(array, left, right, animations);
      quickSortHelper(array, left, pivotIndex - 1);
      quickSortHelper(array, pivotIndex + 1, right);
    };

    const partition = (array, left, right, animations) => {
      const pivot = array[right];
      let i = left - 1;

      for (let j = left; j < right; j++) {
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          animations.push([i, j]);
        }
      }
      [array[i + 1], array[right]] = [array[right], array[i + 1]];
      animations.push([i + 1, right]);

      return i + 1;
    };

    quickSortHelper(copyArray, 0, copyArray.length - 1);
    animateSorting(animations);
  }

  const animateSorting = (animations) => {
    const timeouts = [];
    for (let i = 0; i < animations.length; i++) {
      const timeout = setTimeout(() => {
        const [barOneIdx, barTwoIdx] = animations[i];
        const arrayBars = document.getElementsByClassName("array-bar");
        arrayBars[barOneIdx].style.backgroundColor = "red";
        arrayBars[barTwoIdx].style.backgroundColor = "red";

        setTimeout(() => {
          const tempHeight = arrayBars[barOneIdx].style.height;
          arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
          arrayBars[barTwoIdx].style.height = tempHeight;
          arrayBars[barOneIdx].style.backgroundColor = "blue";
          arrayBars[barTwoIdx].style.backgroundColor = "blue";
        }, 100);
      }, i * 200);
      timeouts.push(timeout);
    }

    setTimeout(() => {
      setIsSorting(false);
      setAnimationTimeouts([]);
    }, animations.length * 200);

    setAnimationTimeouts(timeouts);
  };

  const handleReset = () => {
    animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    setAnimationTimeouts([]);
    initialiseArray();
  };

  return (
    <div>
      <h1>Quick Sort</h1>
      <h4>Time Complexity = O(nlog(n))</h4>
      <div className="array-container">
        <div className="controls-container">
          <select
            name="dropdown"
            id="dropdown"
            onChange={(event) => setLength(parseInt(event.target.value))}
            value={len}
          >
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
          </select>
          <button onClick={util} disabled={isSorting}>
            Start
          </button>
          <button onClick={handleReset}>Reset Array</button>
        </div>
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

export default QuickSort;
