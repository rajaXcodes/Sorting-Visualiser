import React, { useEffect, useState } from "react";
import "./bubbleSort.css";

function BubbleSort() {
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
  function bubbleSort() {
    if (isSorting) return;
    setIsSorting(true); 
    const animations = [];
    const copyarray = [...array];

    // Bubble Sort Algorithm
    for (let i = 0; i < copyarray.length - 1; i++) {
      for (let j = 0; j < copyarray.length - i - 1; j++) {
        if (copyarray[j] > copyarray[j + 1]) {
          [copyarray[j], copyarray[j + 1]] = [copyarray[j + 1], copyarray[j]];
          animations.push([j, j + 1]);
        }
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
      <h1>Bubble Sort</h1>
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
          <button onClick={bubbleSort} disabled={isSorting}>
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

export default BubbleSort;
