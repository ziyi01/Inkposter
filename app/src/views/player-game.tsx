import React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import Toolbar from '../components/toolbar';
import { useGamePresenter } from '../presenters/player-game-presenter';

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
  } = useGamePresenter();

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
      {/* Word */}
      <h1 className="text-3xl font-bold mb-4">
        Your word is <span className="text-red-500">sun</span>
      </h1>
      <h2 className="text-lg mb-8">(You are the inkposter?)</h2>

      {/* Canvas Section */}
      <div className="rounded-md mb-6 p-4">
        <ReactSketchCanvas
          width="600px"
          height="400px"
          strokeColor={strokeColor}
          ref={canvasRef}
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          className="rounded-md"
        />
      </div>

      {/* Toolbar below canvas */}
      <div className="w-full flex justify-center mb-4">
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
    </div>
  );
};

export default PlayerGame;