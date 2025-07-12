"use client";

import { SwipeButton } from "@repo/ui";
import React from "react";

// --- Some icons for our showcase ---
const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const Lock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const Trash = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;


export default function Web() {
  const handleSuccess = (variant: string) => {
    alert(`Success from the ${variant} variant!`);
  };

  return (
    <main style={styles.main}>
      <div style={styles.hero}>
        <h1 style={styles.title}>React Unstyled Swipe Button</h1>
        <p style={styles.subtitle}>
          A zero-dependency, fully customizable, and unstyled swipe button for modern React applications.
        </p>
      </div>

      <div style={styles.showcaseGrid}>

        {/* --- Variant 1: Sleek Dark --- */}
        <div style={styles.variantCard}>
          <h3 style={styles.variantTitle}>Sleek Dark Mode</h3>
          <div style={{...styles.swipeContainer, ...styles.darkTheme}}>
            <SwipeButton railText="Swipe to unlock" onSuccess={() => handleSuccess('Dark')}>
              <div style={styles.sliderContent}><Lock /></div>
            </SwipeButton>
          </div>
        </div>

        {/* --- Variant 2: Destructive Action --- */}
        <div style={styles.variantCard}>
          <h3 style={styles.variantTitle}>Destructive Action</h3>
          <div style={{...styles.swipeContainer, ...styles.destructiveTheme}}>
            <SwipeButton railText="Swipe to Delete" overlayText="Deleted" onSuccess={() => handleSuccess('Destructive')}>
              <div style={styles.sliderContent}><Trash /></div>
            </SwipeButton>
          </div>
        </div>

        {/* --- Variant 3: Minimalist --- */}
        <div style={styles.variantCard}>
          <h3 style={styles.variantTitle}>Minimalist</h3>
          <div style={{...styles.swipeContainer, ...styles.minimalTheme}}>
            <SwipeButton railText="Confirm" onSuccess={() => handleSuccess('Minimal')}>
               <div style={{...styles.sliderContent, color: '#333'}}><ChevronRight /></div>
            </SwipeButton>
          </div>
        </div>
        
        {/* --- Variant 4: Reverse Neon --- */}
        <div style={styles.variantCard}>
          <h3 style={styles.variantTitle}>Reverse Neon</h3>
          <div style={{...styles.swipeContainer, ...styles.neonTheme}}>
            <SwipeButton railText="Swipe Left to Activate" reverseSwipe={true} onSuccess={() => handleSuccess('Neon')}>
               <div style={{...styles.sliderContent, transform: 'rotate(180deg)', color: '#fff'}}><ChevronRight /></div>
            </SwipeButton>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- Styles for the showcase page ---
// For a real project, you'd likely use CSS Modules or a styling library.
const styles: { [key: string]: React.CSSProperties } = {
  main: { fontFamily: 'sans-serif', background: '#f9f9f9', minHeight: '100vh', padding: '2rem' },
  hero: { textAlign: 'center', marginBottom: '4rem' },
  title: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' },
  subtitle: { fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '0 auto' },
  showcaseGrid: { display: 'grid', gap: '2rem', maxWidth: '900px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' },
  variantCard: { background: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  variantTitle: { marginBottom: '1rem', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' },
  swipeContainer: {
    // Overriding the default component styles using CSS variables
    '--swipe-button-height': '56px',
    '--swipe-button-border-radius': '12px',
    '--swipe-slider-width': '56px',
  } as React.CSSProperties,
  darkTheme: {
    '--swipe-bg-color': '#222',
    '--swipe-rail-text-color': '#888',
    '--swipe-overlay-color': '#0070f3',
    '--swipe-slider-color': '#333',
    color: '#fff',
  } as React.CSSProperties,
  destructiveTheme: {
    '--swipe-bg-color': '#FFEBEB',
    '--swipe-rail-text-color': '#A63333',
    '--swipe-overlay-color': '#DC2626',
    '--swipe-slider-color': '#fff',
    color: '#DC2626',
  } as React.CSSProperties,
  minimalTheme: {
    '--swipe-bg-color': '#EAEAEA',
    '--swipe-rail-text-color': '#777',
    '--swipe-overlay-color': '#D1D1D1',
    '--swipe-slider-color': '#fff',
  } as React.CSSProperties,
  neonTheme: {
    '--swipe-bg-color': '#111',
    '--swipe-rail-text-color': '#888',
    '--swipe-overlay-color': '#F400F4',
    '--swipe-slider-color': '#330033',
    '--swipe-slider-box-shadow': '0 0 15px #F400F4',
  } as React.CSSProperties,
  sliderContent: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
};