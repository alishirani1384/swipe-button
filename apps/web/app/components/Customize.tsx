import React from 'react';
import { SwipeButton } from "swipe-button";
import styles from '../page.module.css';
import { ChevronRight } from './icons';

type CustomizeProps = {
  theme: string;
  setTheme: (theme: string) => void;
  reverseSwipe: boolean;
  setReverseSwipe: (reverse: boolean) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  handleSuccess: () => void;
  handleFail: () => void;
};

export function Customize({ theme, setTheme, reverseSwipe, setReverseSwipe, disabled, setDisabled, handleSuccess, handleFail }: CustomizeProps) {
  return (
    <div className={styles.customizeContainer}>
      <div className={styles.customizeOptions}>
        <h2>Customize</h2>
        <div className={styles.optionGroup}>
          <label>Theme</label>
          <div className={styles.themeSelector}>
            <button 
              className={`${styles.themeButton} ${theme === 'default' ? styles.activeTheme : ''}`}
              onClick={() => setTheme('default')}
            >
              Default
            </button>
            <button 
              className={`${styles.themeButton} ${theme === 'blue' ? styles.activeTheme : ''}`}
              onClick={() => setTheme('blue')}
            >
              Blue
            </button>
            <button 
              className={`${styles.themeButton} ${theme === 'green' ? styles.activeTheme : ''}`}
              onClick={() => setTheme('green')}
            >
              Green
            </button>
            <button 
              className={`${styles.themeButton} ${theme === 'purple' ? styles.activeTheme : ''}`}
              onClick={() => setTheme('purple')}
            >
              Purple
            </button>
          </div>
        </div>
        
        <div className={styles.optionGroup}>
          <label>Direction</label>
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleButton} ${!reverseSwipe ? styles.activeToggle : ''}`}
              onClick={() => setReverseSwipe(false)}
            >
              Left to Right
            </button>
            <button 
              className={`${styles.toggleButton} ${reverseSwipe ? styles.activeToggle : ''}`}
              onClick={() => setReverseSwipe(true)}
            >
              Right to Left
            </button>
          </div>
        </div>
        
        <div className={styles.optionGroup}>
          <label>State</label>
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleButton} ${!disabled ? styles.activeToggle : ''}`}
              onClick={() => setDisabled(false)}
            >
              Enabled
            </button>
            <button 
              className={`${styles.toggleButton} ${disabled ? styles.activeToggle : ''}`}
              onClick={() => setDisabled(true)}
            >
              Disabled
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.customizePreview}>
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
      </div>
    </div>
  );
}