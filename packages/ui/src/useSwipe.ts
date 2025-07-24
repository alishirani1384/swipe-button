import { useState, useRef, useEffect, useCallback } from "react";

import type { MouseEvent, TouchEvent, KeyboardEvent } from "react";

export interface UseSwipeProps {
  onSuccess: () => void;
  onFail?: () => void;
  disabled?: boolean;
  reverseSwipe?: boolean;
  delta?: number;
}

export function useSwipe({
  onSuccess,
  onFail,
  disabled = false,
  reverseSwipe = false,
  delta,
}: UseSwipeProps) {
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

  const handleDragging = useCallback((e: globalThis.MouseEvent | globalThis.TouchEvent) => {
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
    let newPosition = initialSliderPosition + (reverseSwipe ? -displacement : displacement);

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

    checkSuccess(newPosition, swipeableWidth);
  }, [initialSliderPosition, reverseSwipe, delta, onSuccess]);

  const checkSuccess = useCallback((currentPosition: number, swipeableWidth: number) => {
    const successThreshold = delta ?? swipeableWidth;
    const isSuccess = reverseSwipe
      ? currentPosition <= successThreshold
      : currentPosition >= successThreshold;

    if (isSuccess) {
      const endPosition = reverseSwipe ? 0 : swipeableWidth;
      setSliderPosition(endPosition);
      positionRef.current = endPosition;
      setOverlayWidth(containerRef.current?.offsetWidth || 0);
      onSuccess();
      setHasSucceeded(true);
      isDragging.current = false;
    }
  }, [delta, onSuccess, reverseSwipe]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;

    isDragging.current = false;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const swipeableWidth = containerWidth - sliderWidth;

    checkSuccess(positionRef.current, swipeableWidth);

    if (!hasSucceeded) {
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
  }, [checkSuccess, onFail, initialSliderPosition, hasSucceeded]);

  const handleDragStart = useCallback((e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
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
  }, [disabled, hasSucceeded, handleDragging, handleDragEnd]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || hasSucceeded) return;

    const step = 10; // pixels per key press
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const swipeableWidth = containerWidth - sliderWidth;

    let newPosition = positionRef.current;

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      newPosition += reverseSwipe ? -step : step;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      newPosition += reverseSwipe ? step : -step;
    } else {
      return;
    }

    newPosition = Math.max(0, Math.min(newPosition, swipeableWidth));

    setSliderPosition(newPosition);
    positionRef.current = newPosition;

    const overlayWidthValue = reverseSwipe
      ? containerWidth - (newPosition + sliderWidth / 2)
      : newPosition + sliderWidth / 2;

    setOverlayWidth(overlayWidthValue);
    setIsSwiping(true);

    checkSuccess(newPosition, swipeableWidth);

    if (!isDragging.current) {
      // Simulate drag end if not dragging
      if (newPosition === positionRef.current) {
        handleDragEnd();
      }
    }
  }, [disabled, hasSucceeded, reverseSwipe, checkSuccess, handleDragEnd]);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleDragging);
      window.removeEventListener("touchmove", handleDragging);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDragging, handleDragEnd]);

  return {
    isSwiping,
    sliderPosition,
    overlayWidth,
    disabled,
    reverseSwipe,
    containerRef,
    sliderRef,
    handleDragStart,
    handleKeyDown,
  };
}