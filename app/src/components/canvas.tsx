// Need to npm install react-icons
// Resource: https://vinoth.info/react-sketch-canvas/
import React from 'react';
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { FaPen, FaEraser, FaUndo, FaRedo, FaTrashAlt } from 'react-icons/fa';

interface CanvasProps {
  onDraw: (canvasDataURL: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onDraw }) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const reservedHeight = 220;
      const availableHeight = windowHeight - reservedHeight;

      const aspectRatio = 16 / 9;

      let newHeight = availableHeight;
      let newWidth = newHeight / aspectRatio;

      if (newWidth > windowWidth) {
        newWidth = windowWidth;
        newHeight = newWidth * aspectRatio;
      }

      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleRealTimeUpdate = () => {
    canvasRef.current?.exportImage("png").then(onDraw);
  };

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value);
  };

  const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Canvas Container */}
      <div style={{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }}>
        <ReactSketchCanvas
          width={`${canvasSize.width}px`}
          height={`${canvasSize.height}px`}
          strokeColor={strokeColor}
          ref={canvasRef}
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          className="rounded-md"
          onStroke={handleRealTimeUpdate}
        />
      </div>

      {/* Toolbar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-2 shadow-md flex items-center gap-2 justify-center flex-nowrap">
        <div className="flex items-center gap-2 justify-center">
          {/* Stroke Color Picker */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={strokeColor}
              onChange={handleStrokeColorChange}
              className="w-8 h-8 p-1 rounded-full sm:w-10 sm:h-10"
            />
          </div>

          {/* Pen Icon */}
          <button
            type="button"
            className={`text-white bg-gray-600 p-1 sm:p-2 rounded-full transition-colors hover:bg-blue-500 ${eraseMode ? "" : "border-2 border-blue-500"}`}
            onClick={handlePenClick}
          >
            <FaPen className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Eraser Icon */}
          <button
            type="button"
            className={`text-white bg-gray-600 p-1 sm:p-2 rounded-full transition-colors hover:bg-blue-500 ${eraseMode ? "border-2 border-blue-500" : ""}`}
            onClick={handleEraserClick}
          >
            <FaEraser className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Eraser Width Control */}
          {eraseMode && (
            <div className="flex items-center gap-2">
              <label htmlFor="eraserWidth" className="text-white text-sm sm:text-base">
                Eraser Width
              </label>
              <input
                type="range"
                className="form-range w-16 sm:w-24"
                min="1"
                max="20"
                step="1"
                id="eraserWidth"
                value={eraserWidth}
                onChange={handleEraserWidthChange}
              />
            </div>
          )}

          {/* Stroke Width Control */}
          {!eraseMode && (
            <div className="flex items-center gap-2">
              <label htmlFor="strokeWidth" className="text-white text-sm sm:text-base">
                Stroke Width
              </label>
              <input
                type="range"
                className="form-range w-16 sm:w-24"
                min="1"
                max="20"
                step="1"
                id="strokeWidth"
                value={strokeWidth}
                onChange={handleStrokeWidthChange}
              />
            </div>
          )}

          {/* Undo Icon */}
          <button
            type="button"
            className="text-white bg-gray-600 p-1 sm:p-2 rounded-full transition-colors hover:bg-blue-500"
            onClick={handleUndoClick}
          >
            <FaUndo className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Redo Icon */}
          <button
            type="button"
            className="text-white bg-gray-600 p-1 sm:p-2 rounded-full transition-colors hover:bg-blue-500"
            onClick={handleRedoClick}
          >
            <FaRedo className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Clear Icon */}
          <button
            type="button"
            className="text-white bg-red-600 p-1 sm:p-2 rounded-full transition-colors hover:bg-red-700"
            onClick={handleClearClick}
          >
            <FaTrashAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
