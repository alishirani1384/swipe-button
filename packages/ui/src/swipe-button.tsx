"use client";

import { forwardRef } from "react";
import { defaultStyles } from "./styles";
import { SwipeContext, useSwipeContext, type SwipeContextType } from "./SwipeContext";
import { useSwipe } from "./useSwipe";

import type { HTMLAttributes } from "react";

export interface SwipeButtonRootProps extends HTMLAttributes<HTMLDivElement> {
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
    const swipeValues = useSwipe({ onSuccess, onFail, disabled, reverseSwipe, delta });

    return (
      <SwipeContext.Provider value={swipeValues as SwipeContextType}>
        <style>{defaultStyles}</style>
        <div
          ref={swipeValues.containerRef}
          className={`swipe-button__root ${className || ""}`}
          style={style}
          data-disabled={disabled}
          data-swiping={swipeValues.isSwiping}
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

const Rail = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
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
  HTMLAttributes<HTMLDivElement>
>(({ className, style, children, ...props }, ref) => {
  const { overlayWidth, isSwiping } = useSwipeContext();
  return (
    <div
      ref={ref}
      className={`swipe-button__overlay ${className || ""}`}
      style={{ width: `${overlayWidth}px`, ...style }}
      {...props}
    >
      {isSwiping ? children : null}
    </div>
  );
});
Overlay.displayName = "SwipeButton.Overlay";

const Slider = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    const { sliderPosition, handleDragStart, handleKeyDown, containerRef, sliderRef, reverseSwipe } = useSwipeContext();
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const swipeableWidth = containerWidth - sliderWidth;
    const progress = reverseSwipe
      ? ((swipeableWidth - sliderPosition) / swipeableWidth) * 100
      : (sliderPosition / swipeableWidth) * 100;
    return (
      <div
        ref={sliderRef}
        className={`swipe-button__slider ${className || ""}`}
        style={{ transform: `translateX(${sliderPosition}px)`, ...style }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        tabIndex={0}
        aria-label="Swipe to confirm"
        {...props}
      />
    );
  }
);
Slider.displayName = "SwipeButton.Slider";

export const SwipeButton = { Root, Rail, Overlay, Slider };