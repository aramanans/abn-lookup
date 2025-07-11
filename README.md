# ABN Lookup Playwright Automation

This project automates testing of the [ABN Lookup](https://abr.business.gov.au/) website using [Playwright](https://playwright.dev/). It verifies business details and error handling for ABN searches.


## Features

- Search for a business by name and verify details (entity name, ABN status, entity type, GST registration, business location, business names).
- Search for an invalid ABN and verify error messages and links.
- Uses Page Object Model for maintainable test code.

## Prerequisites
This is an example of how to list things you need to use the software and how to install them.
1.**Install depemdencies:**
npm install npm@latest -g 

2. **Run tests:**
   ```bash
   npx playwright test --ui
   ```

3. **View results:**
   - Test results will be shown in the terminal.
   - For HTML reports:
     ```bash
     npx playwright show-report
     ```

## Customization

- Update `testdata.json` to change search queries or expected results.


## Requirements

- Node.js >= 16
- Playwright


