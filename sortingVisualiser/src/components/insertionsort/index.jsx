import React, { useEffect, useState } from "react";
import "./index.css";

function InsertionSort() {
  const [array, setArray] = useState([]);
  const [len, setLength] = useState(50);
  const [isSortingIS, setIsSortingIS] = useState(false);
  const [animationTimeouts, setAnimationTimeouts] = useState([]);

  function initialiseArray() {
    const newArray = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArray);
    setIsSortingIS(false);
  }

  useEffect(() => {
    initialiseArray();
  }, [len]);
  useEffect(() => {
    return () => {
      animationTimeouts.forEach((timeout) => clearTimeout(timeout)); // Cleanup timeouts on unmount
      setAnimationTimeouts([]); // Reset animation state
      setIsSorting(false); // Reset sorting state
    };
  }, []);
  function util() {
    if (isSortingIS) return;
    setIsSortingIS(true);

    const animations = [];
    const copyArray = [...array];

    for (let i = 1; i < copyArray.length; i++) {
      let j = i;
      while (j > 0 && copyArray[j] < copyArray[j - 1]) {
        animations.push([j, j - 1]);
        [copyArray[j], copyArray[j - 1]] = [copyArray[j - 1], copyArray[j]];
        j--;
      }
    }

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
      setIsSortingIS(false);
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
      <h1>Insertion Sort</h1>
      <h4>Time Complexity = O(n^2)</h4>
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
          <button onClick={util} disabled={isSortingIS}>
            Start
          </button>
          <button onClick={handleReset}>
            Reset Array
          </button>
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

export default InsertionSort;
