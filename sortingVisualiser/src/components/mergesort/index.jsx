import React, { useEffect, useState } from "react";
import "./index.css";

function MergeSort() {
  const [array, setArray] = useState([]);
  const [len, setLength] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [animationTimeouts, setAnimationTimeouts] = useState([]);

  // Initialize array with random values
  function initialiseArray() {
    const newArray = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArray);
    setIsSorting(false);
  }

  useEffect(() => {
    initialiseArray();
  }, [len]);

  // Cleanup any timeouts on unmount or reset
  useEffect(() => {
    return () => {
      animationTimeouts.forEach((timeout) => clearTimeout(timeout));
      setAnimationTimeouts([]);
      setIsSorting(false);
    };
  }, [animationTimeouts]);

  // Merge sort utility function
  function util() {
    if (isSorting) return; // Prevent sorting if already in progress
    setIsSorting(true);

    const animations = [];
    const copyArray = [...array];

    const mergeSortHelper = (array, start, end) => {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      mergeSortHelper(array, start, mid);
      mergeSortHelper(array, mid + 1, end);
      merge(array, start, mid, end);
    };

    // Merge function to combine sorted halves
    const merge = (array, start, mid, end) => {
      const temp = [];
      let i = start,
        j = mid + 1;

      // Merge two sorted halves
      while (i <= mid && j <= end) {
        if (array[i] <= array[j]) {
          temp.push(array[i++]);
        } else {
          temp.push(array[j++]);
        }
      }

      while (i <= mid) temp.push(array[i++]);
      while (j <= end) temp.push(array[j++]);

      // Update the main array and add animation steps
      for (let k = start; k <= end; k++) {
        animations.push([k, temp[k - start]]);
        array[k] = temp[k - start];
      }
    };

    mergeSortHelper(copyArray, 0, copyArray.length - 1);
    animateSorting(animations); // Trigger animations
  }

  // Animate sorting based on generated animations
  const animateSorting = (animations) => {
    const timeouts = [];
    for (let i = 0; i < animations.length; i++) {
      const timeout = setTimeout(() => {
        const [barIdx, newHeight] = animations[i];
        const arrayBars = document.getElementsByClassName("array-bar");

        // Highlight the bar while it's being sorted
        arrayBars[barIdx].style.backgroundColor = "red";
        setTimeout(() => {
          arrayBars[barIdx].style.height = `${newHeight}px`;
          arrayBars[barIdx].style.backgroundColor = "blue";
        }, 100);
      }, i * 200); // Delay each animation step by 200ms
      timeouts.push(timeout);
    }

    // Reset state after all animations are done
    setTimeout(() => {
      setIsSorting(false);
      setAnimationTimeouts([]);
    }, animations.length * 200);

    setAnimationTimeouts(timeouts); // Store the timeouts
  };

  // Handle reset action
  const handleReset = () => {
    animationTimeouts.forEach((timeout) => clearTimeout(timeout)); // Clear previous animations
    setAnimationTimeouts([]);
    initialiseArray(); // Reset the array and sorting state
  };

  return (
    <div>
      <h1>Merge Sort</h1>
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

export default MergeSort;
