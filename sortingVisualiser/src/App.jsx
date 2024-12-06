import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import BubbleSort from "./components/bubblesort/bubbleSort";
import InsertionSort from "./components/insertionsort";
import MergeSort from "./components/mergesort";
import QuickSort from "./components/quicksort";
import { useState, useEffect } from "react";
function App() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Sorting Visualiser</h1>
      <div>
        <button onClick={() => navigate("/")}>Bubble Sort</button>
        <button onClick={() => navigate("/quicksort")}>Quick Sort</button>
        <button onClick={() => navigate("/insertionsort")}>
          Insertion Sort
        </button>
        <button onClick={() => navigate("/mergesort")}>Merge Sort</button>
      </div>

      <Routes>
        <Route path="/" element={<BubbleSort />} />
        <Route path="/insertionsort" element={<InsertionSort key="insert" />} />
        <Route path="/mergesort" element={<MergeSort key="merge" />} />
        <Route path="/quicksort" element={<QuickSort key="quick" />} />
      </Routes>
    </div>
  );
}

export default App;
