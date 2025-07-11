"use client";

import { useEffect, useRef, useState } from "react";

const styles = `
:root {
  --swipe-button-height: 50px;
  --swipe-button-border-radius: 25px;
  --swipe-slider-width: 50px;
  --swipe-slider-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  --swipe-bg-color: #f0f0f0;
  --swipe-rail-text-color: #555;
  --swipe-overlay-color: #4caf50;
  --swipe-overlay-text-color: white;
  --swipe-slider-color: #ffffff;
}

.swipe-button-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px; /* Example height */
  background-color: #f0f0f0; /* Default rail color */
  border-radius: 25px; /* Pill shape */
  overflow: hidden;
  user-select: none; /* Prevents text selection during drag */
  cursor: grab;
}

.swipe-button-container.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.swipe-button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #4caf50; /* Example success color */
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}

.swipe-button-overlay-text {
  color: white;
  font-weight: bold;
}

.swipe-button-rail-text {
  flex-grow: 1;
  text-align: center;
  color: #555;
  padding: 0 60px; /* Give space for the slider */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.swipe-button-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50px; /* Example width */
  background-color: #ffffff; /* Default slider color */
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: grab;
}

.swipe-button-slider:active {
  cursor: grabbing;
}
`;

export interface SwipeButtonProps {
  onSuccess: () => void;
  onFail?: () => void;
  disabled?: boolean;
  reverseSwipe?: boolean;

  title?: string;
  railText?: string;
  overlayText?: string;
  children?: React.ReactNode;

  delta?: number;
}

export const SwipeButton = ({
  title,
  railText,
  overlayText,
  children,
  disabled = false,
  delta,
  reverseSwipe,
  onSuccess,
  onFail,
  // ... other props will be used later
}: SwipeButtonProps) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [overlayWidth, setOverlayWidth] = useState(0);
  const [initialSliderPosition, setInitialSliderPosition] = useState(0);

  // We will add mouse and touch event handlers here later
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
  const cleanup = () => {
    window.removeEventListener('mousemove', handleDragging);
    window.removeEventListener('touchmove', handleDragging);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchend', handleDragEnd);
  };

  // The return function from useEffect serves as the cleanup
  return () => {
    cleanup();
  };
}, []);

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const endPosition = containerWidth - sliderWidth;

    const startPos = reverseSwipe ? endPosition : 0;
    setInitialSliderPosition(startPos);
    setSliderPosition(startPos);
  }, [reverseSwipe]);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (disabled) return;

    isDragging.current = true;
    setIsSwiping(true); // Show overlay and hide rail text

    // Determine starting X position from either mouse or touch event
    if ("touches" in e) {
      const touch = e.touches[0];
      if (!touch) return;
      startX.current = touch.clientX;
    } else {
      startX.current = e.clientX;
    }

    // Add listeners to the window to track movement and release
    window.addEventListener("mousemove", handleDragging);
    window.addEventListener("touchmove", handleDragging);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);
  };

  const handleDragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;

    let currentX;
    if ("touches" in e) {
      const touch = e.touches[0];
      if (!touch) return;
      currentX = touch.clientX;
    } else {
      currentX = e.clientX;
    }
    const displacement = reverseSwipe
      ? startX.current - currentX
      : currentX - startX.current;
    let newPosition = initialSliderPosition + displacement;

    // Get container and slider dimensions from our refs
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const swipeableWidth = containerWidth - sliderWidth;

    // Constrain the slider's position within the container boundaries
    if (newPosition < 0) newPosition = 0;
    if (newPosition > swipeableWidth) newPosition = swipeableWidth;

    setSliderPosition(newPosition);

    const overlayWidthValue = reverseSwipe
      ? containerWidth - newPosition
      : newPosition + sliderWidth / 2;

    setOverlayWidth(overlayWidthValue); // Center overlay behind slider
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const swipeableWidth = containerWidth - sliderWidth;

    // Use the delta prop if provided, otherwise default to the full width
    const successThreshold = delta ?? swipeableWidth;

    const isSuccess = reverseSwipe
      ? sliderPosition <= initialSliderPosition - successThreshold
      : sliderPosition >= successThreshold;

    if (isSuccess) {
      // ---- SUCCESS ----
      onSuccess();
      const endPosition = reverseSwipe ? 0 : swipeableWidth;
      setSliderPosition(endPosition);
      setOverlayWidth(containerWidth);
    } else {
      // ---- FAIL ----
      onFail?.();
      // Reset the slider and overlay to the beginning
      setSliderPosition(initialSliderPosition);
      setOverlayWidth(0);
      setIsSwiping(false); // Hide overlay and show rail text again
    }

    // Clean up global event listeners
    window.removeEventListener("mousemove", handleDragging);
    window.removeEventListener("touchmove", handleDragging);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchend", handleDragEnd);
  };

  return (
    <>
      <style>{styles}</style>
      <div
      ref={containerRef}
      className={`swipe-button-container ${disabled ? "disabled" : ""}`}
      aria-label={title || "Swipe button"}
    >
      {/* Overlay that reveals on swipe */}
      <div
        className="swipe-button-overlay"
        style={{
          width: `${overlayWidth}px`,
          // Align the overlay to the right for reverse swipe
          [reverseSwipe ? "right" : "left"]: "0",
        }}
      >
        <span className="swipe-button-overlay-text">{overlayText}</span>
      </div>

      {/* The visible text on the rail */}
      {!isSwiping && <span className="swipe-button-rail-text">{railText}</span>}

      {/* The draggable slider */}
      <div
        ref={sliderRef}
        className="swipe-button-slider"
        style={{ left: `${sliderPosition}px` }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {children}
      </div>
      </div>
    </>
  );
};
