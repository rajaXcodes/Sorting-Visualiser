import React, { useEffect, useState } from "react";
import "./bubbleSort.css";

function BubbleSort() {
  const [array, setArray] = useState([]);
  const [len, setLength] = useState(50);
  const [isPaused, setIsPaused] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [animations, setAnimations] = useState([]);

  function initialiseArray() {
    const newArray = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArray);
    setAnimations([]); // Reset animations when resetting the array
    setIsSorting(false); // Reset sorting state
  }

  useEffect(() => {
    initialiseArray();
  }, [len]);

  function bubbleSort() {
    if (isSorting) return; // Don't start sorting if already sorting
    setIsSorting(true);
    const animations = [];
    const copyarray = [...array];

    for (let i = 0; i < copyarray.length - 1; i++) {
      for (let j = 0; j < copyarray.length - i - 1; j++) {
        if (copyarray[j] > copyarray[j + 1]) {
          [copyarray[j], copyarray[j + 1]] = [copyarray[j + 1], copyarray[j]];
          animations.push([j, j + 1]);
        }
      }
    }
    setAnimations(animations);
    animateSorting(animations);
  }

  function animateSorting(animations) {
    let i = 0;

    function processAnimation() {
      if (i < animations.length && !isPaused) {
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

          i++;
          setTimeout(processAnimation, 20);
        }, 10);
      }
    }

    processAnimation();
  }

  function handlePause() {
    setIsPaused(true);
    console.log(isPaused);
  }

  function handleResume() {
    setIsPaused(false);
    console.log(isPaused);
    animateSorting(animations);
  }

  return (
    <div>
      <h1>Bubble Sort</h1>
      <div className="array-container">
        <div className="controls-container">
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
          <button onClick={bubbleSort} disabled={isSorting}>
            Start
          </button>
          <button onClick={initialiseArray}>Reset Array</button>
          <button onClick={handlePause} disabled={isPaused || !isSorting}>
            Pause
          </button>
          <button onClick={handleResume} disabled={!isPaused}>
            Resume
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

export default BubbleSort;
