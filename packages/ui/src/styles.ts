export const defaultStyles = `
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
}

.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
}

/* Structural Properties */
:root {
    --sw-height: 48px;
    --sw-slider-width: 48px;
    /* --- MODIFIED: Changed to a large value for a fully rounded pill shape --- */
    --sw-border-radius: 9999px; 
    --sw-font-size: 14px;
    --sw-transition-duration: 150ms;
}

.swipe-button__root {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--sw-height);
    /* --- MODIFIED: Using secondary for the background track for better contrast --- */
    background-color: hsl(var(--secondary)); 
    border: 1px solid hsl(var(--border));
    border-radius: var(--sw-border-radius);
    overflow: hidden;
    user-select: none;
    touch-action: none; 
    font-family: sans-serif;
    color: hsl(var(--muted-foreground));
    font-size: var(--sw-font-size);
}

.swipe-button__root[data-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
}

.swipe-button__rail {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--sw-transition-duration) ease-in-out;
}

.swipe-button__root[data-swiping='true'] .swipe-button__rail {
    opacity: 0;
}

.swipe-button__overlay {
    position: absolute;
    inset-block: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    font-weight: 500;
    pointer-events: none;
    white-space:nowrap;
}
  
.swipe-button__root[data-reverse='true'] .swipe-button__overlay {
    left: auto;
    right: 0;
}

.swipe-button__slider {
    position: absolute;
    inset-block: 0;
    width: var(--sw-slider-width);
    height: 100%;
    /* --- MODIFIED: Using background for the slider to contrast with the track --- */
    background-color: hsl(var(--background));
    border-radius: var(--sw-border-radius);
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.swipe-button__slider:active {
    cursor: grabbing;
}
`;