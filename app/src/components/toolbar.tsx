// Need to npm install react-icons
import React from 'react';
import { FaPen, FaEraser, FaUndo, FaRedo, FaTrashAlt } from 'react-icons/fa'; // Import icons

interface ToolbarProps {
  eraseMode: boolean;
  handlePenClick: () => void;
  handleEraserClick: () => void;
  handleUndoClick: () => void;
  handleRedoClick: () => void;
  handleClearClick: () => void;
  strokeWidth: number;
  handleStrokeWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  eraserWidth: number;
  handleEraserWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  strokeColor: string;
  handleStrokeColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  eraseMode,
  handlePenClick,
  handleEraserClick,
  handleUndoClick,
  handleRedoClick,
  handleClearClick,
  strokeWidth,
  handleStrokeWidthChange,
  eraserWidth,
  handleEraserWidthChange,
  strokeColor,
  handleStrokeColorChange,
}) => {
  return (
    <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
      {/* Stroke Color Picker */}
      <div className="flex items-center gap-2">
        <label htmlFor="color" className="text-white">
          Color
        </label>
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
        className={`text-white p-2 rounded-full transition-colors ${!eraseMode ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-500`}
        onClick={handlePenClick}
        disabled={!eraseMode}
      >
        <FaPen size={20} />
      </button>

      {/* Eraser Icon */}
      <button
        type="button"
        className={`text-white p-2 rounded-full transition-colors ${eraseMode ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-500`}
        onClick={handleEraserClick}
        disabled={eraseMode}
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
  );
};

export default Toolbar;
