"use client";

import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";

const defaultStyles = `
  :root {
    /* Color Palette (HSL format for easy modification) */
    --sw-background: 240 10% 3.9%;
    --sw-foreground: 0 0% 98%;
    --sw-muted-foreground: 240 5% 64.9%;
    --sw-border: 240 3.7% 15.9%;
    --sw-slider: 240 5.9% 90%;
    --sw-success: 142.1 76.2% 36.3%;

    /* Structural Properties */
    --sw-height: 48px;
    --sw-slider-width: 40px;
    --sw-border-radius: 9999px;
    --sw-font-size: 14px;
    --sw-transition-duration: 150ms;
  }

  .swipe-button__root {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--sw-height);
    background-color: hsl(var(--sw-background));
    border: 1px solid hsl(var(--sw-border));
    border-radius: var(--sw-border-radius);
    overflow: hidden;
    user-select: none;
    touch-action: none; /* Prevents scrolling on mobile */
    font-family: sans-serif;
    color: hsl(var(--sw-muted-foreground));
    font-size: var(--sw-font-size);
  }

  .swipe-button__root[data-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .swipe-button__rail {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--sw-transition-duration) ease-in-out;
  }

  .swipe-button__root[data-swiping='true'] .swipe-button__rail {
    opacity: 0;
  }

  .swipe-button__overlay {
    position: absolute;
    inset-block: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(var(--sw-success));
    color: hsl(var(--sw-foreground));
    font-weight: 500;
    pointer-events: none;
  }
  
  .swipe-button__root[data-reverse='true'] .swipe-button__overlay {
    left: auto;
    right: 0;
  }

  .swipe-button__slider {
    position: absolute;
    inset-block: 0;
    width: var(--sw-slider-width);
    height: 100%;
    background-color: hsl(var(--sw-slider));
    border-radius: var(--sw-border-radius);
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .swipe-button__slider:active {
    cursor: grabbing;
  }
`;

interface SwipeContextType {
  isSwiping: boolean;
  sliderPosition: number;
  overlayWidth: number;
  disabled: boolean;
  reverseSwipe: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  sliderRef: React.RefObject<HTMLDivElement>;
  handleDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
}

const SwipeContext = createContext<SwipeContextType | null>(null);
const useSwipeContext = () => {
  const context = useContext(SwipeContext);
  if (!context) {
    throw new Error(
      "SwipeButton components must be used within a SwipeButton.Root"
    );
  }
  return context;
};

interface SwipeButtonRootProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess: () => void;
  onFail?: () => void;
  disabled?: boolean;
  reverseSwipe?: boolean;
  delta?: number;
}

const Root = forwardRef<HTMLDivElement, SwipeButtonRootProps>(
  (
    {
      className,
      style,
      children,
      onSuccess,
      onFail,
      disabled = false,
      reverseSwipe = false,
      delta,
      ...props
    },
    ref
  ) => {
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
  useEffect(() => {
      // This is a dummy effect that returns a cleanup function to be run on unmount.
      // The actual event listeners are cleaned up in handleEnd.
      return () => {
           window.removeEventListener("mousemove", () => {});
           window.removeEventListener("touchmove", () => {});
           window.removeEventListener("mouseup", () => {});
           window.removeEventListener("touchend", () => {});
      }
    }, [])
        const contextValue = { isSwiping, sliderPosition, overlayWidth, disabled, reverseSwipe, containerRef, sliderRef, handleDragStart };

    return (
      <SwipeContext.Provider value={contextValue as SwipeContextType}>
        <style>{defaultStyles}</style>
        <div
          ref={containerRef}
          className={`swipe-button__root ${className || ""}`}
          style={style}
          data-disabled={disabled}
          data-swiping={isSwiping}
          data-reverse={reverseSwipe}
          {...props}
        >
          {children}
        </div>
      </SwipeContext.Provider>
    );
  }
);
Root.displayName = "SwipeButton.Root";

const Rail = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`swipe-button__rail ${className || ""}`} {...props} />
  )
);
Rail.displayName = "SwipeButton.Rail";

const Overlay = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    const { overlayWidth } = useSwipeContext();
    return (
      <div
        ref={ref}
        className={`swipe-button__overlay ${className || ""}`}
        style={{ width: `${overlayWidth}px`, ...style }}
        {...props}
      />
    );
  }
);
Overlay.displayName = "SwipeButton.Overlay";

const Slider = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    const { sliderPosition, handleDragStart, sliderRef } = useSwipeContext();
    return (
      <div
        ref={sliderRef}
        className={`swipe-button__slider ${className || ""}`}
        style={{ transform: `translateX(${sliderPosition}px)`, ...style }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        {...props}
      />
    );
  }
);
Slider.displayName = "SwipeButton.Slider";

export const SwipeButton = { Root, Rail, Overlay, Slider };

