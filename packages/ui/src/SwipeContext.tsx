import { createContext, useContext, type RefObject } from "react";

import type { MouseEvent, TouchEvent, KeyboardEvent } from "react";

interface SwipeContextType {
  isSwiping: boolean;
  sliderPosition: number;
  overlayWidth: number;
  disabled: boolean;
  reverseSwipe: boolean;
  containerRef: RefObject<HTMLDivElement>;
  sliderRef: RefObject<HTMLDivElement>;
  handleDragStart: (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
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

export { SwipeContext, useSwipeContext, type SwipeContextType };