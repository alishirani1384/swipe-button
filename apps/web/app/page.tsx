"use client";
import { SwipeButton } from "swipe-button";
import React, { useState } from "react";
import styles from "./page.module.css";
import { ArrowRight, Check, ChevronRight, Code, Github, Palette, Settings, Sliders } from "./components/icons";

export default function Web() {
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("demo");
  const [theme, setTheme] = useState("default");
  const [reverseSwipe, setReverseSwipe] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const handleSuccess = () => {
    setSuccessMessage("Success! Swipe action completed.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleFail = () => {
    setSuccessMessage("Swipe not completed.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>React Unstyled Swipe Button</h1>
        <p className={styles.subtitle}>A lightweight, accessible swipe-to-action component for React</p>
        
        <div className={styles.ctas}>
          <a href="https://github.com/alishirani1384/swipe-button" target="_blank" rel="noopener noreferrer" className={styles.primary}>
            <Github /> View on GitHub
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'demo' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            <Sliders /> Demo
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'customize' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('customize')}
          >
            <Palette /> Customize
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'code' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <Code /> Code
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'demo' && (
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
          )}

          {activeTab === 'customize' && (
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
          )}

          {activeTab === 'code' && (
            <div className={styles.codeContainer}>
              <h2>Installation</h2>
              <div className={styles.codeBlock}>
                <code>npm install swipe-button</code>
                <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText('npm install swipe-button')}>Copy</button>
              </div>
              
              <h2>Usage</h2>
              <div className={styles.codeBlock}>
                <pre>{`import { SwipeButton } from "swipe-button";

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
}`}</pre>
                <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText(`import { SwipeButton } from "swipe-button";

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
}`)}>Copy</button>
              </div>
              
              <h2>Props</h2>
              <div className={styles.propsTable}>
                <div className={styles.propRow}>
                  <div className={styles.propName}>onSuccess</div>
                  <div className={styles.propType}>() {"=>"} void</div>
                  <div className={styles.propDesc}>Callback function when swipe is completed successfully</div>
                </div>
                <div className={styles.propRow}>
                  <div className={styles.propName}>onFail</div>
                  <div className={styles.propType}>() {"=>"} void</div>
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
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/alishirani1384/swipe-button" target="_blank" rel="noopener noreferrer">
          <Github /> GitHub
        </a>
        <a href="/docs">
          <Settings /> Documentation
        </a>
        <a href="/examples">
          <Code /> Examples
        </a>
      </footer>
    </div>
  );
}

