import React from 'react';
import { SwipeButton } from "swipe-button";
import styles from '../page.module.css';
import { ChevronRight, Check } from './icons';

type DemoProps = {
  theme: string;
  disabled: boolean;
  reverseSwipe: boolean;
  handleSuccess: () => void;
  handleFail: () => void;
  successMessage: string;
};

export function Demo({ theme, disabled, reverseSwipe, handleSuccess, handleFail, successMessage }: DemoProps) {
  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoWrapper}>
        <div className={`${styles.swipeDemo} ${styles[theme]}`}>
          <SwipeButton.Root 
            onSuccess={handleSuccess} 
            onFail={handleFail}
            disabled={disabled}
            reverseSwipe={reverseSwipe}
            className={styles.swipeButton}
          >
            <SwipeButton.Rail>
              {reverseSwipe ? "← Swipe to confirm" : "Swipe to confirm →"}
            </SwipeButton.Rail>
            <SwipeButton.Overlay>
              {reverseSwipe ? "← Confirmed!" : "Confirmed! →"}
            </SwipeButton.Overlay>
            <SwipeButton.Slider>
              <ChevronRight className={reverseSwipe ? styles.reverseIcon : ''} />
            </SwipeButton.Slider>
          </SwipeButton.Root>
        </div>
        {successMessage && (
          <div className={styles.successMessage}>
            <Check />
            <span>{successMessage}</span>
          </div>
        )}
      </div>
      
      <div className={styles.demoDescription}>
        <h2>Swipe Button Component</h2>
        <p>A fully customizable, unstyled, and accessible swipe-to-action button for React. Built from scratch with zero dependencies.</p>
        <ul className={styles.featureList}>
          <li><Check /> Fully accessible</li>
          <li><Check /> Touch & mouse support</li>
          <li><Check /> Customizable styling</li>
          <li><Check /> Reverse direction support</li>
          <li><Check /> Success & fail callbacks</li>
          <li><Check /> Zero dependencies</li>
        </ul>
      </div>
    </div>
  );
}