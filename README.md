# Create Gulp Bootstrap Template

![GitHub License](https://img.shields.io/github/license/AmitDeka/create-gulp-bs-template?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dm/create-gulp-bs-template?style=flat-square)

This project is a Bootstrap 5 starter template integrated with Gulp for an efficient development workflow. It includes SCSS support for easy styling, BrowserSync for live reloading, and Gulp tasks for building and optimizing your website.

### Features

- Bootstrap 5.2.3: For responsive and modern web design.
- SCSS: For modular and maintainable styling.
- Gulp: Task runner to automate tasks such as minifying CSS, JavaScript, and optimizing images.
- BrowserSync: Live-reloading server to speed up development.
- Cross-Environment Builds: Easily switch between development and production environments.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14.x or above)
- npm

### Installation

Clone the repository and install the dependencies:

```
npx create-gulp-bs-template <project-name>
cd <project-name>
npm install
```

### Running the Development Server

To start the server with live reloading:

```
npm start
```

This will launch a local server with BrowserSync and automatically reload the page when files are modified.

### Available Scripts

- npm start: Start the development server with BrowserSync.
- npm run dev: Run the development server and watch for changes in files.
- npm run prod: Build the project for production (without minification).
- npm run prodm: Build the project for production (with minification).

### Project Structure

```
├── dist/               # Compiled project files
├── src/                # Source files
│   ├── scss/           # SCSS files
│   ├── js/             # JavaScript files
│   ├── images/         # Image assets
├── gulpfile.js         # Gulp tasks
├── package.json        # Project dependencies and scripts
└── README.md           # Project information
```

Building for Production
To build the project for production without minification, run:

```
npm run prod
```

To build the project for production with minification, run:

```
npm run prodm
```

## Author

Amit Deka
[Email](mailto:amitdeka13@gmail.com)
