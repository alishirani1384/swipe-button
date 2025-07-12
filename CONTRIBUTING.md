# Contributing to React Unstyled Swipe Button

First off, thank you for considering contributing! We love receiving contributions from the community, and this document provides everything you need to know to get started.

Your contributions help make this component better for everyone. We welcome all forms of contributions, including:

*   Reporting bugs
*   Suggesting new features
*   Improving documentation
*   Submitting code changes and bug fixes

## Code of Conduct

To ensure a welcoming and inclusive environment for everyone, this project and everyone participating in it is governed by a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report any unacceptable behavior. *(You will need to create a `CODE_OF_CONDUCT.md` file—a good template is the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)).*

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please make sure it hasn't already been reported by searching the [Issues](https://github.com/alishirani1384/swipe-button/issues) on GitHub.

When filing a new bug report, please include:

1.  A clear and descriptive title (e.g., "Component fails to reset position after failed `reverseSwipe`").
2.  A detailed description of the problem.
3.  Steps to reproduce the bug. A minimal reproduction case is ideal (e.g., a small code snippet or a link to a CodeSandbox).
4.  The expected behavior and what actually happened.
5.  Details about your environment (e.g., React version, browser, operating system).

### Suggesting Enhancements

If you have an idea for a new feature or an improvement to an existing one, please open an issue with the "feature request" label.

Provide as much detail as possible, including:
1.  A clear description of the feature and the problem it solves (the "why").
2.  An example of how the feature might be used (the "how").
3.  Any alternative solutions or features you've considered.

## Your First Code Contribution

Ready to contribute code? Here’s how to set up the project and submit your changes.

### Development Setup

This project is a monorepo managed with **pnpm** and **Turborepo**.

1.  **Fork the Repository**
    Click the "Fork" button on the top right of the [main repository page](https://github.com/alishirani1384/swipe-button).

2.  **Clone Your Fork**
    Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/alishirani1384/swipe-button.git
    cd swipe-button
    ```

3.  **Install Dependencies**
    We use `pnpm` as our package manager. Install it if you don't have it (`npm install -g pnpm`), then run:
    ```bash
    pnpm install
    ```
    This will install dependencies for all the packages and apps in the monorepo.

4.  **Run the Development Environment**
    To work on the component and see your changes live in the showcase app, run the `dev` command from the root directory:
    ```bash
    pnpm dev
    ```
    This command, powered by Turborepo, will start the development servers for both the `ui` package (in watch mode) and the `web` (showcase) and `docs` applications.

### Pull Request Process

1.  **Create a New Branch**
    Create a new branch from `main` for your feature or bugfix.
    ```bash
    git checkout -b feat/add-new-animation
    # or
    git checkout -b fix/solve-drag-issue
    ```

2.  **Make Your Changes**
    Make your changes to the codebase. The core component code is located in `packages/ui/src/swipe-button`.

3.  **Ensure Code Quality**
    Before committing, run the linter to check for any style issues.
    ```bash
    pnpm lint
    ```

4.  **Commit Your Changes**
    We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps us automate releases and generate changelogs. Your commit message should be structured as follows:

    ```
    feat: Allow custom easing functions for animations
    ```
    Common commit types include: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

5.  **Push to Your Fork**
    Push your changes to your forked repository.
    ```bash
    git push origin feat/add-new-animation
    ```

6.  **Open a Pull Request**
    - Go to the original repository on GitHub and you should see a prompt to create a new Pull Request from your recently pushed branch.
    - Make sure your PR has a clear title and a detailed description of the changes you've made. If your PR fixes an existing issue, link it using keywords like `Closes #123`.
    - Submit the PR, and our team will review it as soon as possible.

Thank you again for your interest in making this project better! We look forward to your contributions.