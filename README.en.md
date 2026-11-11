# Chuyan | Energy Storage Investment Modeling Demo

[简体中文 README](README.md) · [Live demo](https://wangweiyi-wwyz.github.io/Chuyan-demo/)

Chuyan is a browser-based tool for preliminary investment analysis of energy storage projects. Adjust project, revenue, cost, and financing assumptions to compare returns and cash flows across scenarios and see how the results flow into the financial statements.

## Features

- **Project modeling** — Set construction and operating parameters, revenue, capital and operating costs, financing, and tax assumptions.
- **Scenario comparison** — Compare base, upside, and downside cases using interactive charts.
- **Financial statements** — Review the income statement, cash flow statement, balance sheet, and metrics such as the debt service coverage ratio (DSCR).
- **Desktop and iPhone layouts** — Switch between Chinese and English or light and dark themes. Desktop uses sidebar navigation. The iPhone layout provides a collapsible menu and horizontally scrollable tables.

## Using the demo

1. Open the live demo and start with the sample project.
2. Adjust the project inputs and scenario assumptions.
3. Review the updated results on the dashboard, in the scenario comparison, and in the financial statements.

On an iPhone, open the demo in Safari and choose **Share → Add to Home Screen** to launch it from the Chuyan icon.

## Running locally

The project uses HTML, CSS, and JavaScript. It requires no front-end dependencies or build step. With Python 3 installed, run this command from the repository root:

~~~sh
python -m http.server 8000 --bind 127.0.0.1
~~~

Then open the [local site](http://localhost:8000/).

## Key files

| File | Purpose |
| --- | --- |
| `index.html`, `app.js` | Page entry point and application interactions |
| `evaluation-core.js`, `finance-core.js`, `statements-core.js` | Investment evaluation, financing, and statement calculations |
| `dashboard.js`, `decision-charts.js` | Dashboard and analysis charts |
| `localization.js`, `locale-dictionary.js` | Chinese and English interfaces |
| `mobile.css`, `mobile.js`, `manifest.webmanifest` | Mobile layout, navigation, and home-screen launch |
| `demo-mode.js` | Feature configuration for the public demo |

GitHub Pages publishes the live demo from the root of the `main` branch.

## Demo scope

Calculations run in the browser, and project data stays in the current browser. Excel input import and Excel and Word exports are unavailable in the public demo. The sample project and results are intended for demonstrating the model and supporting preliminary analysis.
