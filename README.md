# React Unstyled Swipe Button

[![npm version](https://img.shields.io/npm/v/swipe-button.svg)](https://www.npmjs.com/package/swipe-button)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENCE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A lightweight, unstyled, and fully accessible swipe-to-action button for modern React applications. Built from scratch with zero dependencies.

---

### [**Live Demo & Showcase →**](https://your-homepage-url.com)

*(Link to your deployed `apps/web` homepage)*

![React Swipe Button Showcase GIF](https://your-link-to-a-demo-gif.com/demo.gif)
*(**Pro-tip:** Record a short GIF of your showcase page and upload it here!)*

## Why React Unstyled Swipe Button?

This component was built to provide a flexible and robust foundation for any "swipe-to-action" feature. Unlike other libraries, it ships with **zero styles**, giving you complete control over the look and feel. It's perfect for design systems, custom UIs, and scenarios where you don't want to fight with pre-existing CSS.

### Key Features

*   ✅ **Zero Dependencies:** Incredibly lightweight with no other packages to manage.
*   🎨 **Completely Unstyled:** Bring your own styles. Works perfectly with standard CSS, CSS Modules, CSS-in-JS (like Styled Components), or utility-class frameworks (like Tailwind CSS).
*   📱 **Modern & Smooth:** Built with React hooks for a fluid, touch-friendly experience on any device.
*   🎛️ **Highly Customizable:** Control text, icons, colors, swipe direction, and trigger sensitivity through a simple prop API.
*   ♿️ **Accessibility in Mind:** Designed with `aria` attributes for screen reader support.

## Installation

Choose your favorite package manager:

```bash
# PNPM
pnpm add swipe-button

# NPM
npm install swipe-button

# Yarn
yarn add swipe-button
```

## Basic Usage

Import the `SwipeButton` component. Then, provide a success callback and the content you want to display.

```jsx
import React from 'react';
import { SwipeButton } from 'swipe-button';

const App = () => {
  const handleSuccess = () => {
    console.log('Action Confirmed!');
  };

  return (
    <div style={{ width: '350px', margin: '2rem auto' }}>
      <SwipeButton railText="Swipe to Confirm" onSuccess={handleSuccess}>
        <span style={{ fontWeight: 'bold' }}>&gt;&gt;</span>
      </SwipeButton>
    </div>
  );
};

export default App;
```

## API Reference (Props)

The component is configured through a simple set of props:

| Prop           | Type                | Default     | Description                                                                  |
| -------------- | ------------------- | ----------- | ---------------------------------------------------------------------------- |
| `onSuccess`    | `() => void`        | _Required_  | Callback function triggered on a successful swipe.                           |
| `onFail`       | `() => void`        | `undefined` | Optional callback triggered when a swipe fails to meet the threshold.        |
| `disabled`     | `boolean`           | `false`     | If `true`, the button is inactive and visually disabled.                     |
| `reverseSwipe` | `boolean`           | `false`     | If `true`, the swipe direction is from right to left.                        |
| `delta`        | `number`            | `undefined` | The pixel distance from the start required to trigger success. Defaults to the full swipeable width. |
| `children`     | `React.ReactNode`   | `undefined` | The content for the slider handle (e.g., an icon, text, or custom element).  |
| `title`        | `string`            | `undefined` | A title for the container, used for the `aria-label` attribute.              |
| `railText`     | `string`            | `undefined` | The text displayed on the rail behind the slider.                            |
| `overlayText`  | `string`            | `undefined` | The text displayed in the colored overlay that reveals on swipe.             |

## Customization

The power of this component comes from its lack of styling. Here's how you can customize it.

### 1. Using CSS Variables

The easiest way to theme the component is by overriding the default CSS custom properties.

```css
/* Your custom stylesheet, e.g., App.css */

.my-dark-theme {
  --swipe-bg-color: #222;
  --swipe-rail-text-color: #888;
  --swipe-overlay-color: #0070f3;
  --swipe-slider-color: #333;
  --swipe-overlay-text-color: #fff;

  /* You can also override structural variables */
  --swipe-button-height: 56px;
  --swipe-button-border-radius: 12px;
}
```

```jsx
// In your component
import './App.css';
import { Lock } from 'lucide-react'; // Example using an icon library

<div className="my-dark-theme">
  <SwipeButton railText="Swipe to unlock" onSuccess={handleSuccess}>
    <Lock color="white" />
  </SwipeButton>
</div>
```

### 2. Destructive Action Theme

Create a "delete" button by overriding the colors for a destructive action.

```css
.my-delete-theme {
  --swipe-bg-color: #ffebeb;
  --swipe-rail-text-color: #a63333;
  --swipe-overlay-color: #dc2626;
  --swipe-slider-color: #f8fafc;
  --swipe-overlay-text-color: #fff;
}
```

```jsx
import { Trash2 } from 'lucide-react';

<div className="my-delete-theme">
  <SwipeButton
    railText="Swipe to Delete"
    overlayText="Item Deleted"
    onSuccess={handleSuccess}
  >
    <Trash2 color="#dc2626" />
  </SwipeButton>
</div>
```

### 3. Using Styled-Components (or other CSS-in-JS)

You can also wrap the `SwipeButton` in a styled component to apply styles dynamically.

```jsx
import styled from 'styled-components';
import { SwipeButton } from 'swipe-button';

const StyledSwipeButton = styled(SwipeButton)`
  .swipe-button-container {
    background-color: #e0f2fe;
    border: 2px solid #0ea5e9;
  }
  .swipe-button-slider {
    background-color: #0ea5e9;
    box-shadow: none;
  }
  .swipe-button-rail-text {
    color: #0ea5e9;
    font-weight: 600;
  }
`;

// Later in your app...
<StyledSwipeButton railText="Swipe to Continue" onSuccess={handleSuccess}>
  <span style={{ color: 'white', fontSize: '24px' }}>→</span>
</StyledSwipeButton>
```

## Contributing

Contributions are welcome! If you have a feature request, bug report, or want to improve the code, please feel free to open an issue or submit a pull request.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.