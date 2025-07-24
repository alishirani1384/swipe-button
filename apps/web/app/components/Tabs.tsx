import React from 'react';
import styles from '../page.module.css';
import { Sliders, Palette, Code } from './icons';

type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
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
  );
}