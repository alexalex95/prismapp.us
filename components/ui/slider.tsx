"use client";

import React, { useEffect, useRef, useState } from "react";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  formatLabel?: (value: number) => string;
}

export function Slider({ min, max, step = 1, value, onValueChange }: SliderProps) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = (v: number) => Math.round(((v - min) / (max - min)) * 100);

  useEffect(() => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  }, [value]);

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  return (
    <div className="relative w-full h-10 flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(e) => {
          const val = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(val);
          onValueChange([val, maxVal]);
        }}
        className="thumb absolute w-full h-0 pointer-events-none appearance-none outline-none"
        style={{ zIndex: minVal > max - 10 ? 5 : 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(e) => {
          const val = Math.max(Number(e.target.value), minVal + 1);
          setMaxVal(val);
          onValueChange([minVal, val]);
        }}
        className="thumb absolute w-full h-0 pointer-events-none appearance-none outline-none"
        style={{ zIndex: 4 }}
      />

      {/* Track */}
      <div className="relative w-full">
        {/* Background track */}
        <div
          className="absolute z-[1] w-full rounded-full"
          style={{ height: "6px", background: "rgba(255,255,255,0.08)" }}
        />
        {/* Active range track */}
        <div
          ref={range}
          className="absolute z-[2] rounded-full bg-accent"
          style={{ height: "6px" }}
        />
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2.5px solid var(--accent-color);
          background: rgb(16, 11, 28);
          cursor: pointer;
          margin-top: -8px;
          box-shadow:
            0 0 0 4px rgba(139, 92, 246, 0.14),
            0 2px 10px rgba(0, 0, 0, 0.55);
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }
        input[type="range"]:active::-webkit-slider-thumb {
          box-shadow:
            0 0 0 7px rgba(139, 92, 246, 0.2),
            0 2px 10px rgba(0, 0, 0, 0.55);
          transform: scale(1.08);
        }
        input[type="range"]::-moz-range-thumb {
          pointer-events: all;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2.5px solid var(--accent-color);
          background: rgb(16, 11, 28);
          cursor: pointer;
          box-shadow:
            0 0 0 4px rgba(139, 92, 246, 0.14),
            0 2px 10px rgba(0, 0, 0, 0.55);
        }
        input[type="range"]::-moz-range-track {
          background: transparent;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
