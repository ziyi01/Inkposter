// källa: https://vinoth.info/react-sketch-canvas/examples/

import { useState, useRef } from "react";
import { ReactSketchCanvasRef } from "react-sketch-canvas";

export const gamePresenter = () => {
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

  const handleStrokeWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value);
  };

  const handleStrokeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value);
  };

  return {
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
  };
};
