import { test, expect } from '@playwright/test';
import testdata from '../testdata.json';
import { ABNLookupPage } from '../pages/abnLookup';


test.beforeEach(async({page}) => {
  await page.goto('https://abr.business.gov.au/');
})

test('Search for AUTOMIC PTY LTD and verify details', async ({ page }) => {

  const abnLookupPage = new ABNLookupPage(page);
  await abnLookupPage.goto(); // Navigate to the ABN Lookup page
  await abnLookupPage.searchByName((testdata.searchByName));
  await page.waitForSelector('text=Search results', { timeout: 5000 });
  
  await page.getByRole('row', { name: '152 260 814 Active Automic Group Business Name 2000 NSW' }).getByRole('link').click();
  await page.waitForSelector('text=Entity name:'); 
  
  // Verify the entity name
  const entityName = await page.locator("//span[@itemprop='legalName']").textContent();
  await expect(entityName).toBe('AUTOMIC PTY LTD');

  // // Verify the ABN status
  const abnStatus = await page.getByRole('row',{ name: 'ABN status:' }).textContent();
  await expect(abnStatus).toContain('Active from 19');


// //Verify Entity type: Australian Private Company
const entityType = await page.getByRole('row', { name: 'Entity type:' }).textContent();
await expect(entityType).toContain('Australian Private Company');


// VerifyGST Registration: Registered from 01 Apr 2012
const gstRegistration = await page.getByRole('row', { name: 'Goods & Services Tax (GST):' }).textContent();
await expect(gstRegistration).toContain('Registered from 01');

// VerifyMain business location: NSW 2000
const mainBusinessLocation = await page.getByRole('row', { name: 'Main business location:' }).textContent();
await expect(mainBusinessLocation).toContain('NSW 2000');

// Verify Business names:
const businessName1 = await page.getByRole('row', { name: 'CoSecPro External site' }).textContent();
await expect(businessName1).toContain('CoSecPro');
  
const businessName2 = await page.getByRole('row', { name: 'Automic Group External site'}).textContent();
await expect(businessName2).toContain('Automic');

})

test('Search for invalid ABN and verify error message', async ({ page }) => {
  const abnLookupPage = new ABNLookupPage(page);
  await abnLookupPage.goto();
  await abnLookupPage.searchByName(testdata.invalidABNSearch);
  
  const searchResults = await page.locator('//h1[1]').textContent();
  await expect(searchResults).toContain('Invalid ABN');

  const errorMessage = await page.locator('.process-message').textContent();
  await expect(errorMessage).toContain('The number entered is not a valid ABN');

  const detailedExplaination = await page.locator('.process-message').textContent();
  await expect(detailedExplaination).toContain("The number entered");

  await expect(await page.getByRole('link', { name: 'advanced search' })).toBeVisible();
  await expect(await page.getByRole('link', { name: 'frequently asked questions' })).toBeVisible();


});




