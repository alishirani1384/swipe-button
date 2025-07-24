import React from 'react';
import styles from '../page.module.css';

export function CodeTab() {
  const usageCode = `import { SwipeButton } from "swipe-button";

export default function MyComponent() {
  const handleSuccess = () => {
    console.log("Swipe action completed!");
  };

  return (
    <SwipeButton.Root onSuccess={handleSuccess}>
      <SwipeButton.Rail>
        Swipe to confirm →
      </SwipeButton.Rail>
      <SwipeButton.Overlay>
        Confirmed! →
      </SwipeButton.Overlay>
      <SwipeButton.Slider>
        →
      </SwipeButton.Slider>
    </SwipeButton.Root>
  );
}`;

  return (
    <div className={styles.codeContainer}>
      <h2>Installation</h2>
      <div className={styles.codeBlock}>
        <code>npm install swipe-button</code>
        <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText('npm install swipe-button')}>Copy</button>
      </div>
      
      <h2>Usage</h2>
      <div className={styles.codeBlock}>
        <pre>{usageCode}</pre>
        <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText(usageCode)}>Copy</button>
      </div>
      
      <h2>Props</h2>
      <div className={styles.propsTable}>
        <div className={styles.propRow}>
          <div className={styles.propName}>onSuccess</div>
          <div className={styles.propType}>() ={'>'} void</div>
          <div className={styles.propDesc}>Callback function when swipe is completed successfully</div>
        </div>
        <div className={styles.propRow}>
          <div className={styles.propName}>onFail</div>
          <div className={styles.propType}>() ={'>'} void</div>
          <div className={styles.propDesc}>Optional callback when swipe is not completed</div>
        </div>
        <div className={styles.propRow}>
          <div className={styles.propName}>disabled</div>
          <div className={styles.propType}>boolean</div>
          <div className={styles.propDesc}>Whether the swipe button is disabled</div>
        </div>
        <div className={styles.propRow}>
          <div className={styles.propName}>reverseSwipe</div>
          <div className={styles.propType}>boolean</div>
          <div className={styles.propDesc}>Whether to reverse the swipe direction (right to left)</div>
        </div>
        <div className={styles.propRow}>
          <div className={styles.propName}>delta</div>
          <div className={styles.propType}>number</div>
          <div className={styles.propDesc}>Optional threshold for successful swipe (in pixels)</div>
        </div>
      </div>
    </div>
  );
}