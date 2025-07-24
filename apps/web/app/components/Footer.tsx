import React from 'react';
import styles from '../page.module.css';
import { Github, Settings, Code } from './icons';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/alishirani1384/swipe-button" target="_blank" rel="noopener noreferrer">
        <Github /> GitHub
      </a>
    </footer>
  );
}