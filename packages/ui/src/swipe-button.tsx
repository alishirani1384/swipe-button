"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

const defaultStyles = `
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
}

.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
}

/* Structural Properties */
:root {
    --sw-height: 48px;
    --sw-slider-width: 48px;
    /* --- MODIFIED: Changed to a large value for a fully rounded pill shape --- */
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
    /* --- MODIFIED: Using secondary for the background track for better contrast --- */
    background-color: hsl(var(--secondary)); 
    border: 1px solid hsl(var(--border));
    border-radius: var(--sw-border-radius);
    overflow: hidden;
    user-select: none;
    touch-action: none; 
    font-family: sans-serif;
    color: hsl(var(--muted-foreground));
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
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
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
    /* --- MODIFIED: Using background for the slider to contrast with the track --- */
    background-color: hsl(var(--background));
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
    const [hasSucceeded, setHasSucceeded] = useState(false);

    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const positionRef = useRef(0);

    useEffect(() => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const sliderWidth = sliderRef.current?.offsetWidth || 0;
      const endPosition = containerWidth - sliderWidth;

      const startPos = reverseSwipe ? endPosition : 0;
      setInitialSliderPosition(startPos);
      setSliderPosition(startPos);
      positionRef.current = startPos;
      setOverlayWidth(sliderWidth / 2);
    }, [reverseSwipe]);

    const handleDragging = useCallback((e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;

      let currentX;
      if ("touches" in e) {
        const touch = e.touches[0];
        if (!touch) return;
        currentX = touch.clientX;
      } else {
        currentX = e.clientX;
      }
      const displacement = currentX - startX.current;
      let newPosition = initialSliderPosition + displacement;

      const containerWidth = containerRef.current?.offsetWidth || 0;
      const sliderWidth = sliderRef.current?.offsetWidth || 0;
      const swipeableWidth = containerWidth - sliderWidth;

      newPosition = Math.max(0, Math.min(newPosition, swipeableWidth));

      setSliderPosition(newPosition);
      positionRef.current = newPosition;

      const overlayWidthValue = reverseSwipe
        ? containerWidth - (newPosition + sliderWidth / 2)
        : newPosition + sliderWidth / 2;

      setOverlayWidth(overlayWidthValue);

      const successThreshold = delta ?? swipeableWidth;
      const isSuccess = reverseSwipe
        ? newPosition <= initialSliderPosition - successThreshold
        : newPosition >= successThreshold;

      if (isSuccess) {
        const endPosition = reverseSwipe ? 0 : swipeableWidth;
        setSliderPosition(endPosition);
        positionRef.current = endPosition;
        setOverlayWidth(containerWidth);
        onSuccess();
        setHasSucceeded(true);
        isDragging.current = false;
        window.removeEventListener("mousemove", handleDragging);
        window.removeEventListener("touchmove", handleDragging);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchend", handleDragEnd);
      }
    }, [initialSliderPosition, reverseSwipe, containerRef, sliderRef, delta, onSuccess, setHasSucceeded, setSliderPosition, setOverlayWidth]);

    const handleDragEnd = useCallback(() => {
      if (!isDragging.current) return;

      isDragging.current = false;

      const containerWidth = containerRef.current?.offsetWidth || 0;
      const sliderWidth = sliderRef.current?.offsetWidth || 0;
      const swipeableWidth = containerWidth - sliderWidth;

      const successThreshold = delta ?? swipeableWidth;

      const isSuccess = reverseSwipe
        ? positionRef.current <= initialSliderPosition - successThreshold
        : positionRef.current >= successThreshold;

      if (isSuccess) {
        const endPosition = reverseSwipe ? 0 : swipeableWidth;
        setSliderPosition(endPosition);
        positionRef.current = endPosition;
        setOverlayWidth(containerWidth);
        onSuccess();
        setHasSucceeded(true);
      } else {
        onFail?.();
        setSliderPosition(initialSliderPosition);
        positionRef.current = initialSliderPosition;
        setOverlayWidth(sliderWidth / 2);
        setIsSwiping(false);
      }

      window.removeEventListener("mousemove", handleDragging);
      window.removeEventListener("touchmove", handleDragging);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    }, [reverseSwipe, initialSliderPosition, delta, containerRef, sliderRef, onSuccess, setHasSucceeded, onFail, setIsSwiping, setSliderPosition, setOverlayWidth, handleDragging]);

    const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (disabled || hasSucceeded) return;

      isDragging.current = true;
      setIsSwiping(true);

      let clientX;
      if ("touches" in e) {
        clientX = e.touches[0]?.clientX ?? 0;
      } else {
        clientX = e.clientX;
      }
      startX.current = clientX;

      window.addEventListener("mousemove", handleDragging);
      window.addEventListener("touchmove", handleDragging);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }, [disabled, hasSucceeded, setIsSwiping, handleDragging, handleDragEnd]);

    useEffect(() => {
      return () => {
        window.removeEventListener("mousemove", handleDragging);
        window.removeEventListener("touchmove", handleDragging);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchend", handleDragEnd);
      };
    }, [handleDragging, handleDragEnd]);

    const contextValue = {
      isSwiping,
      sliderPosition,
      overlayWidth,
      disabled,
      reverseSwipe,
      containerRef,
      sliderRef,
      handleDragStart,
    };

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
    <div
      ref={ref}
      className={`swipe-button__rail ${className || ""}`}
      {...props}
    />
  )
);
Rail.displayName = "SwipeButton.Rail";

const Overlay = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { overlayWidth } = useSwipeContext();
  return (
    <div
      ref={ref}
      className={`swipe-button__overlay ${className || ""}`}
      style={{ width: `${overlayWidth}px`, ...style }}
      {...props}
    />
  );
});
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