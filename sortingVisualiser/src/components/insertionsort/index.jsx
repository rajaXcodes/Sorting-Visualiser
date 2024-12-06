import React, { useEffect, useState } from "react";
import "./index.css";

function InsertionSort() {
  const [array, setArray] = useState([]);
  const [len, setLength] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [animationTimeouts, setAnimationTimeouts] = useState([]);

  function initialiseArray() {
    const newArray = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setIsSorting(false);
    setArray(newArray);
  }

  useEffect(() => {
    initialiseArray();
  }, [len]);

  useEffect(() => {
    return () => {
      animationTimeouts.forEach((timeout) => clearTimeout(timeout));
      setAnimationTimeouts([]);
      setIsSorting(false);
    };
  }, []);

  function insertionSort() {
    if (isSorting) return;
    setIsSorting(true);
    const animations = [];
    const copyArray = [...array];

    // Insertion Sort Algorithm
    for (let i = 1; i < copyArray.length; i++) {
      let j = i - 1;
      let key = copyArray[i];
      while (j >= 0 && copyArray[j] > key) {
        copyArray[j + 1] = copyArray[j];
        animations.push([j, j + 1]);
        j--;
      }
      copyArray[j + 1] = key;
      animations.push([j + 1, key]);
    }

    animateSorting(animations);
  }

  const animateSorting = (animations) => {
    const timeouts = [];
    for (let i = 0; i < animations.length; i++) {
      const timeout = setTimeout(() => {
        const [barIdx, newHeight] = animations[i];
        const arrayBars = document.getElementsByClassName("array-bar");

        arrayBars[barIdx].style.backgroundColor = "red";
        setTimeout(() => {
          arrayBars[barIdx].style.height = `${newHeight}px`;
          arrayBars[barIdx].style.backgroundColor = "blue";
        }, 100);
      }, i * 150);
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
      <h1>Insertion Sort</h1>
      <h4>
        Time Complexity = O(n<sup>2</sup>)
      </h4>
      <div className="array-container">
        <div className="controls-container">
          <select
            name="dropdown"
            id="dropdown"
            onChange={(event) => setLength(parseInt(event.target.value))}
            value={len}
          >
            <option value="40">30</option>
            <option value="70">40</option>
            <option value="90">50</option>
            <option value="100">60</option>
          </select>
          <button onClick={insertionSort} disabled={isSorting}>
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

export default InsertionSort;
