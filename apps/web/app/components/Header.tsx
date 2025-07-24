import React from 'react';
import styles from '../page.module.css';
import { Github } from './icons';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>React Unstyled Swipe Button</h1>
      <p className={styles.subtitle}>A lightweight, accessible swipe-to-action component for React</p>
      <div className={styles.ctas}>
        <a href="https://github.com/alishirani1384/swipe-button" target="_blank" rel="noopener noreferrer" className={styles.primary}>
          <Github /> View on GitHub
        </a>
      </div>
    </header>
  );
}