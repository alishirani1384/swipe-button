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

The component works out-of-the-box with a beautiful default dark theme. Simply compose the parts you need inside the `SwipeButton.Root`.

```jsx
import React from 'react';
import { SwipeButton } from '@your-npm-username/react-swipe-button';
import { ChevronRight } from 'lucide-react'; // Example using a popular icon library

const App = () => {
  const handleSuccess = () => {
    console.log('Action Confirmed!');
  };

  return (
    <div style={{ width: '350px', margin: '2rem auto' }}>
      <SwipeButton.Root onSuccess={handleSuccess}>
        <SwipeButton.Rail>
          <span>Swipe to Confirm</span>
        </SwipeButton.Rail>
        <SwipeButton.Overlay>
          <span>Confirmed!</span>
        </SwipeButton.Overlay>
        <SwipeButton.Slider>
          <ChevronRight color="black" />
        </SwipeButton.Slider>
      </SwipeButton.Root>
    </div>
  );
};

export default App;
```

## API Reference (Props)

### `<SwipeButton.Root />`

This is the main container that manages the state and logic. It accepts the following props:

| Prop           | Type         | Default    | Description                                                            |
| -------------- | ------------ | ---------- | ---------------------------------------------------------------------- |
| `onSuccess`    | `() => void` | _Required_ | Callback function triggered on a successful swipe.                     |
| `onFail`       | `() => void` | `undefined`| Optional callback triggered when a swipe fails to meet the threshold.  |
| `disabled`     | `boolean`    | `false`    | If `true`, the button is inactive and visually disabled.               |
| `reverseSwipe` | `boolean`    | `false`    | If `true`, the swipe direction is from right to left.                  |
| `delta`        | `number`     | `undefined`| The pixel distance to trigger success. Defaults to the full width.       |

It also accepts all standard `div` props like `className` and `style`.

### Other Components

The following components are used to build the UI and accept all standard `div` props (`className`, `style`, `children`, etc.).

*   `<SwipeButton.Rail />`: The background track.
*   `<SwipeButton.Overlay />`: The colored layer that is revealed on swipe.
*   `<SwipeButton.Slider />`: The draggable handle.

## Customization

The power of this component comes from its lack of styling. Here's how you can customize it.

### 1. Using CSS Variables

The easiest way to theme the component is by overriding the default CSS custom properties.

```css
/* Your custom stylesheet, e.g., App.css */
.light-theme {
  --sw-background: 0 0% 98%;
  --sw-foreground: 240 10% 3.9%;
  --sw-muted-foreground: 240 3.8% 46.1%;
  --sw-border: 240 5.9% 90%;
  --sw-slider: 240 10% 3.9%;
  --sw-success: 221.2 83.2% 53.3%;
}
```

```jsx
// In your component
import './App.css';

<SwipeButton.Root onSuccess={handleSuccess} className="light-theme">
  {/* ... child components ... */}
</SwipeButton.Root>
```

### 2. Full List of CSS Variables

Here are all the variables you can override:

```css
/* Color Palette (HSL format) */
--sw-background: 240 10% 3.9%;
--sw-foreground: 0 0% 98%;
--sw-muted-foreground: 240 5% 64.9%;
--sw-border: 240 3.7% 15.9%;
--sw-slider: 240 5.9% 90%;
--sw-success: 142.1 76.2% 36.3%;

/* Structural Properties */
--sw-height: 48px;
--sw-slider-width: 40px;
--sw-border-radius: 9999px;
--sw-font-size: 14px;
--sw-transition-duration: 150ms;
```

### 3. Using Styled-Components (or other CSS-in-JS)

The compound API works perfectly with CSS-in-JS libraries.

```jsx
import styled from 'styled-components';
import { SwipeButton } from '@your-npm-username/react-swipe-button';

const StyledSlider = styled(SwipeButton.Slider)`
  background: linear-gradient(to right, #ff8a00, #e52e71);
  box-shadow: 0 0 15px #e52e71;
`;

const StyledRoot = styled(SwipeButton.Root)`
  border: 1px solid #444;
`;

// Later in your app...
<StyledRoot onSuccess={handleSuccess}>
  <SwipeButton.Rail>Swipe with Style</SwipeButton.Rail>
  <SwipeButton.Overlay>Done!</SwipeButton.Overlay>
  <StyledSlider />
</StyledRoot>
```

## Contributing

Contributions are welcome! If you have a feature request, bug report, or want to improve the code, please feel free to open an issue or submit a pull request.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.