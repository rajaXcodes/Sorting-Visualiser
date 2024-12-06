import React, { useState, useEffect } from "react";
import "./index.css";

function MergeSort() {
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

  const ms = () => {
    const animations = [];
    const arrayCopy = [...array];
    mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1, animations);
    animateSorting(animations);
  };

  const mergeSortHelper = (array, start, end, animations) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(array, start, mid, animations);
    mergeSortHelper(array, mid + 1, end, animations);
    merge(array, start, mid, end, animations);
  };

  const merge = (array, start, mid, end, animations) => {
    const temp = [];
    let i = start,
      j = mid + 1;

    while (i <= mid && j <= end) {
      if (array[i] <= array[j]) {
        temp.push(array[i++]);
      } else {
        temp.push(array[j++]);
      }
    }

    while (i <= mid) temp.push(array[i++]);
    while (j <= end) temp.push(array[j++]);

    for (let k = start; k <= end; k++) {
      animations.push([k, temp[k - start]]);
      array[k] = temp[k - start];
    }
  };

  const animateSorting = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [barIdx, newHeight] = animations[i];
        const arrayBars = document.getElementsByClassName("array-bar");
        const barStyle = arrayBars[barIdx].style;
        barStyle.height = `${newHeight}px`;
        barStyle.backgroundColor = "red";

        setTimeout(() => {
          barStyle.backgroundColor = "blue";
        }, 50);
      }, i * 50); // Adjust timing for smoother animations
    }
  };

  return (
    <div>
      <h1>Merge Sort</h1>
      <div className="array-container">
        <select
          name="dropdown"
          id="dropdown"
          onChange={(event) => setLength(parseInt(event.target.value))}
          value={len}
          className="selectbutton"
        >
          <option value="40">40</option>
          <option value="70">70</option>
          <option value="90">90</option>
          <option value="100">100</option>
          <option value="120">120</option>
        </select>
        <button onClick={initialiseArray}>Reset Array</button>
        <button onClick={ms}>Start</button>
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
