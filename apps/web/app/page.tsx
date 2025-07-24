"use client";
import { SwipeButton } from "swipe-button";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Demo } from "./components/Demo";
import { Customize } from "./components/Customize";
import { CodeTab } from "./components/Code";
import { Tabs } from "./components/Tabs";

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
      <Header />

      <main className={styles.main}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={styles.tabContent}>
          {activeTab === 'demo' && (
            <Demo 
              theme={theme}
              disabled={disabled}
              reverseSwipe={reverseSwipe}
              handleSuccess={handleSuccess}
              handleFail={handleFail}
              successMessage={successMessage}
            />
          )}

          {activeTab === 'customize' && (
            <Customize 
              theme={theme}
              setTheme={setTheme}
              reverseSwipe={reverseSwipe}
              setReverseSwipe={setReverseSwipe}
              disabled={disabled}
              setDisabled={setDisabled}
              handleSuccess={handleSuccess}
              handleFail={handleFail}
            />
          )}

          {activeTab === 'code' && (
            <CodeTab />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

