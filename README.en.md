# Chuyan | Energy Storage Investment Modeling Demo

[简体中文 README](README.md) · [Live demo](https://wangweiyi-wwyz.github.io/Chuyan-demo/)

Chuyan is a browser-based tool for preliminary investment analysis of energy storage projects. Adjust project, revenue, cost, and financing assumptions to compare returns and cash flows across scenarios and see how the results flow into the financial statements.

## Features

### Sign-in and project dashboard

- The demo sign-in form accepts an account, password, and invitation code, with a button to fill in the sample credentials. **Remember this device** lets visitors return in the same browser without signing in again. The form demonstrates the sign-in flow.
- The dashboard shows rated power, energy capacity, construction investment, and the debt share. Its setup checklist links to the input pages, and the return preview switches between project and equity IRR across the three scenarios.

### Project and timeline

Enter the project name, city, stage, construction start date, construction period, and operating life. The sample is a standalone storage project in Shanxi with six months of construction and 20 years of operation. The page derives commercial operation and operating end dates and lets users specify separate project and equity discount rates, input sources, and notes.

### Technical and operating assumptions

Set rated power and energy capacity, state-of-charge limits, charge and discharge efficiency, the operating schedule, and degradation for a lithium iron phosphate (LFP) system. Preview initial usable capacity, round-trip efficiency, and first-year AC discharge energy before allocating energy to revenue streams.

### Capital and operating costs

- Enter construction costs on a tax-inclusive or tax-exclusive basis. Set input VAT, the deductible share, useful life, and residual value for each asset and review its initial carrying amount.
- Set first-year fixed operating costs and their annual escalation. Schedule capacity augmentation or battery replacement and record retired and installed capacity, downtime, and proceeds from retired equipment. Review annual operating payments, renewal investment, and taxes in charts and tables.

### Revenue assumptions

- **Spot trading.** Set purchase and sale prices, their escalation rates, and transaction fees. The model combines these inputs with operating assumptions to estimate power purchases and sales.
- **Ancillary services.** Configure reserved resources, service volume, settlement prices, performance factors, and deductions separately for peak shaving and primary and secondary frequency regulation.
- **Capacity and other revenue.** Enable capacity compensation, capacity leasing, and other operating revenue as applicable. Capacity revenue can be modeled using eligible or contracted capacity, annual rates, performance factors, and effective periods.
- **Annual revenue preview.** Switch between trend and bar charts to review operating revenue, power purchases and transaction fees, and the difference between them. Expand the annual table to check discharge energy, tax-inclusive and tax-exclusive revenue, and expenses.

### Financing and taxes

Configure one bank loan with an adjustable debt share, interest rate, term, and repayment method. The model supports equal principal and equal total payments. During construction, principal is deferred and interest is funded by equity. Set project-company VAT, surtaxes, and income tax assumptions, along with receivable and payable days and a minimum cash reserve. Preview initial funding, annual debt service, taxes, and working capital.

### Scenario settings and investment results

- Set separate downside, base, and upside factors for charging and discharging prices, daily cycles, ancillary service revenue, fixed operating costs, and renewal investment. The cases share the same underlying project inputs.
- The project perspective uses unlevered cash flow. The equity perspective reflects borrowing, debt service, and shareholder contributions and distributions. The results page summarizes IRR, NPV, and payback metrics and lets users switch scenarios and perspectives to review cash flow and risk.
- Investment charts show annual revenue, electricity purchases, debt service pressure, and equity NPV sensitivity. The model uses annual assumptions for preliminary screening and internal investment reviews.

### Financial statements and reconciliation

Select a scenario to review opening and annual figures for the income statement, cash flow statement, balance sheet, working capital schedule, depreciation schedule, and debt schedule. The debt schedule includes the debt service coverage ratio (DSCR). Separate views cover project cash flow, equity cash flow, calendar cash flow, and depreciation by asset. The reconciliation view reports discrepancies and periods for checks such as balance-sheet balance and cash, fixed-asset, debt, and VAT roll-forwards.

### Demo scope and device support

The demo information page lists the features available online. Users enter assumptions manually, and calculations and saved inputs stay in the current browser. Excel input import and Excel and Word exports are unavailable in the public demo. The interface supports Chinese and English and light and dark themes. Desktop uses sidebar navigation. On iPhone, the website offers a collapsible menu, horizontally scrollable financial tables, and a Safari home-screen shortcut.

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
