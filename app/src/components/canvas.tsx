// Need to npm install react-icons
// Resource: https://vinoth.info/react-sketch-canvas/
import React from 'react';
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { useRef, useState, ChangeEvent } from "react";
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
    <div>
      {/* Canvas */}
      <div className="rounded-md mb-6 p-4">
        <ReactSketchCanvas
          width="600px"
          height="400px"
          strokeColor={strokeColor}
          ref={canvasRef}
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          className="rounded-md"
          onStroke={handleRealTimeUpdate}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4">

        {/* Stroke Color Picker */}
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className="w-10 h-10 p-1 rounded-full"
          />
        </div>

        {/* Pen Icon */}
        <button
          type="button"
          className={`text-white bg-gray-600 p-2 rounded-full transition-colors hover:bg-blue-500 ${eraseMode ? "" : "border-2 border-blue-500"}`}
          onClick={handlePenClick}
        >
          <FaPen size={20} />
        </button>

        {/* Eraser Icon */}
        <button
          type="button"
          className={`text-white bg-gray-600 p-2 rounded-full transition-colors hover:bg-blue-500 ${eraseMode ? "border-2 border-blue-500" : ""}`}
          onClick={handleEraserClick}
        >
          <FaEraser size={20} />
        </button>

        {/* Eraser Width Control */}
        {eraseMode && (
          <div className="flex items-center gap-2">
            <label htmlFor="eraserWidth" className="text-white">
              Eraser Width
            </label>
            <input
              type="range"
              className="form-range w-24"
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
            <label htmlFor="strokeWidth" className="text-white">
              Stroke Width
            </label>
            <input
              type="range"
              className="form-range w-24"
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
          className="text-white bg-gray-600 p-2 rounded-full transition-colors hover:bg-blue-500"
          onClick={handleUndoClick}
        >
          <FaUndo size={20} />
        </button>

        {/* Redo Icon */}
        <button
          type="button"
          className="text-white bg-gray-600 p-2 rounded-full transition-colors hover:bg-blue-500"
          onClick={handleRedoClick}
        >
          <FaRedo size={20} />
        </button>

        {/* Clear Icon */}
        <button
          type="button"
          className="text-white bg-red-600 p-2 rounded-full transition-colors hover:bg-red-700"
          onClick={handleClearClick}
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default Canvas;
