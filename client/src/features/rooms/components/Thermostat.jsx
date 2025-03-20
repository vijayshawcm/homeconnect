"use client";

import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion

export default function Thermostat({ temperature, onTemperatureChange }) {
  const [temp, setTemperature] = useState(temperature);
  const minTemp = 15;
  const maxTemp = 30;

  // Calculate the position of the indicator based ontemp
  const calculateIndicatorPosition = () => {
    const tickCount = 15; // Number of tick marks
    const angleStep = 180 / tickCount; // Angle per step
    const tempStep = (maxTemp - minTemp) / tickCount; // Temp per tick

    const tempOffset = temp - minTemp;
    const tickIndex = Math.round(tempOffset / tempStep); // Ensure exact tick positioning

    const angle = tickIndex * angleStep - 180; // -135 to +135 degrees
    return angle;
  };

    useEffect(() => {
      setTemperature(temperature);
    }, [temperature]);

    const changeTemperature = (newTemp) => {
      setTemperature(newTemp);
      onTemperatureChange(newTemp);
    };

    const increaseTemp = () => {
      if (temp < maxTemp) {
        changeTemperature(temp + 1);
      }
    };

    const decreaseTemp = () => {
      if (temp > minTemp) {
        changeTemperature(temp - 1);
      }
    };

  // Generate tick marks based on the number oftemp steps
  const generateTicks = () => {
    const ticks = [];
    const tickCount = maxTemp - minTemp; // 15 tick marks (one per degree)
    const angleStep = 180 / tickCount; // Spread over 180 degrees

    for (let i = 0; i <= tickCount; i++) {
      const angle = i * angleStep - 180; // Align with the indicator
      const isLongTick = i % 5 === 0;
      const tickLength = isLongTick ? 12 : 10;
      const gap = 6; // Gap between circle edge and ticks

      const x1 = 100 + (90 + gap) * Math.cos((angle * Math.PI) / 180);
      const y1 = 100 + (90 + gap) * Math.sin((angle * Math.PI) / 180);
      const x2 =
        100 + (90 + gap + tickLength) * Math.cos((angle * Math.PI) / 180);
      const y2 =
        100 + (90 + gap + tickLength) * Math.sin((angle * Math.PI) / 180);

      ticks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth={isLongTick ? 3 : 2}
          strokeLinecap="round"
        />
      );
    }
    return ticks;
  };

  // Calculate indicator position
  const angle = calculateIndicatorPosition();
  const indicatorLength = 10;
  const indicatorGap = 6; // Gap between indicator end and circle edge

  // Start point is further inside, end point has a gap from the edge
  const indicatorStartX =
    100 +
    (90 - indicatorLength - indicatorGap) * Math.cos((angle * Math.PI) / 180);
  const indicatorStartY =
    100 +
    (90 - indicatorLength - indicatorGap) * Math.sin((angle * Math.PI) / 180);
  const indicatorEndX =
    100 + (90 - indicatorGap) * Math.cos((angle * Math.PI) / 180);
  const indicatorEndY =
    100 + (90 - indicatorGap) * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="relative">
        <svg width="270" height="270" viewBox="0 0 260 260">
          <defs>
            {/* Drop Shadow Filter with Blue Tint */}
            <filter
              id="dropShadow"
              x="-30%"
              y="-30%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="6"
                dy="6"
                stdDeviation="8"
                floodColor="rgba(24, 76, 133, 0.4)"
              />
            </filter>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="90"
            fill="#D9D9D9"
            stroke="#184C85"
            strokeWidth="3"
            transform="translate(30, 30)"
            filter="url(#dropShadow)" // Apply the shadow filter
          />

          {/* Tick marks */}
          <g transform="translate(30, 30)">{generateTicks()}</g>

          {/* Temperature indicator line */}
          <motion.line
            x1={indicatorStartX + 30}
            y1={indicatorStartY + 30}
            x2={indicatorEndX + 30}
            y2={indicatorEndY + 30}
            stroke="#184C85"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{
              x1: indicatorStartX + 30,
              y1: indicatorStartY + 30,
              x2: indicatorEndX + 30,
              y2: indicatorEndY + 30,
            }}
            animate={{
              x1: indicatorStartX + 30,
              y1: indicatorStartY + 30,
              x2: indicatorEndX + 30,
              y2: indicatorEndY + 30,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }} // Smooth spring animation
          />
        </svg>

        {/* Temperature display and controls */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center">
            <button
              onClick={decreaseTemp}
              className="text-blue-600 font-bold text-xl focus:outline-none"
              aria-label="Decreasetemp"
            >
              <Minus size={24} />
            </button>
            <div className="mx-2 text-4xl font-light">{temp}°C</div>
            <button
              onClick={increaseTemp}
              className="text-red-600 font-bold text-xl focus:outline-none"
              aria-label="Increasetemp"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Cold and Hot labels */}
        <div className="absolute left-0 top-36 text-blue-600 font-semibold text-md">
          Cold
        </div>
        <div className="absolute right-0 top-36 text-red-600 font-semibold text-md">
          Hot
        </div>
      </div>
    </div>
  );
}
