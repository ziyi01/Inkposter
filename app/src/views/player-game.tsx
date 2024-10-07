import React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import Toolbar from '../components/toolbar';
import { gamePresenter } from '../presenters/player-game-presenter';

const PlayerGame: React.FC = () => {
  const {
    canvasRef,
    eraseMode,
    strokeWidth,
    eraserWidth,
    strokeColor,
    handleEraserClick,
    handlePenClick,
    handleUndoClick,
    handleRedoClick,
    handleClearClick,
    handleStrokeWidthChange,
    handleEraserWidthChange,
    handleStrokeColorChange,
  } = gamePresenter();

  return (
    <div className="d-flex flex-column gap-2 p-2">
      <h1>Your word is "summer"</h1>
      <h2>You are the Inkposter</h2>

      <ReactSketchCanvas
        width="600px"
        height="400px"
        strokeColor={strokeColor}
        ref={canvasRef}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
      />

      <Toolbar
        eraseMode={eraseMode}
        handlePenClick={handlePenClick}
        handleEraserClick={handleEraserClick}
        handleUndoClick={handleUndoClick}
        handleRedoClick={handleRedoClick}
        handleClearClick={handleClearClick}
        strokeWidth={strokeWidth}
        handleStrokeWidthChange={handleStrokeWidthChange}
        eraserWidth={eraserWidth}
        handleEraserWidthChange={handleEraserWidthChange}
        strokeColor={strokeColor}
        handleStrokeColorChange={handleStrokeColorChange}
      />
    </div>
  );
};

export default PlayerGame;