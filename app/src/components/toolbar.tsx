// källa: https://vinoth.info/react-sketch-canvas/examples/

import React from 'react';

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
    <div className="d-flex gap-2 align-items-center">
      <button type="button" className="btn btn-sm btn-outline-primary" disabled={!eraseMode} onClick={handlePenClick}>
        Pen
      </button>

      <span style={{ display: eraseMode ? 'none' : 'block' }}>
        <label htmlFor="strokeWidth" className="form-label">
          Stroke width
        </label>
        <input
          disabled={eraseMode}
          type="range"
          className="form-range"
          min="1"
          max="20"
          step="1"
          id="strokeWidth"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />
      </span>

      <button type="button" className="btn btn-sm btn-outline-primary" disabled={eraseMode} onClick={handleEraserClick}>
        Eraser
      </button>

      <span style={{ display: !eraseMode ? 'none' : 'block' }}>
        <label htmlFor="eraserWidth" className="form-label">
          Eraser width
        </label>
        <input
          disabled={!eraseMode}
          type="range"
          className="form-range"
          min="1"
          max="20"
          step="1"
          id="eraserWidth"
          value={eraserWidth}
          onChange={handleEraserWidthChange}
        />
      </span>

      <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleUndoClick}>
        Undo
      </button>

      <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleRedoClick}>
        Redo
      </button>

      <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleClearClick}>
        Clear
      </button>

      <label htmlFor="color">Stroke color</label>
      <input type="color" value={strokeColor} onChange={handleStrokeColorChange} />
    </div>
  );
};

export default Toolbar;