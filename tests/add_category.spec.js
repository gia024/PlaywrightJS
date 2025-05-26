import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login'; 
import AddCategoryPage from '../pages/add_category'; 
import { generateRandomString, generateRandomDevnagri, generateRandomONum } from '../fixtures/custom-fixtures'; 
import env from '../fixtures/env';

test.describe('Add category', () => {
  let loginPage;
  let addCategoryPage;
  let page; // Global page object for use in test

  // This runs once before all tests in this block
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    // Initialize login page and perform login
    loginPage = new LoginPage(page);
    await loginPage.goto();

    // Extract email and password from env file
    const { validemail, validpassword } = env.loginCredentials;
    await loginPage.login(validemail, validpassword);

    // Initialize Add Category page object after successful login
    addCategoryPage = new AddCategoryPage(page);

    // Ensure that login is successful by checking URL or dashboard element
    await expect(page).not.toHaveURL('https://pin-dev.naxadev.com/login');
  });

  // Main test: add a new category
  test('Add Category', async () => {
    await page.getByText('EN', { exact: true }).click();

    // Create test data
    const categoryData = {
      nameEn: generateRandomString(7), 
      nameNe: generateRandomDevnagri(7),
      order: generateRandomONum() 
    };

    // Navigate to form and submit category
    await addCategoryPage.navigateToAddCategoryForm();
    await addCategoryPage.fillCategoryForm(categoryData);

    await expect(page.getByText(categoryData.nameEn)).toBeVisible();
  });
});
