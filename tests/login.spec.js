// tests/login.spec.js
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.js';
import env from '../fixtures/env.js';

test.describe('Login Tests', () => {
  let loginPage;
  let page;
  let context;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto(env.baseURL);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('Login with valid credentials', async () => {
    const { validemail, validpassword } = env.loginCredentials;
    await loginPage.login(validemail, validpassword);
    
    // Check if the URL has changed to indicate a successful login
    await expect(page).not.toHaveURL(`${env.baseURL}login`);
  });

  test('Login with invalid password', async () => {
    const { validemail, invalidpassword } = env.loginCredentials;
    await loginPage.login(validemail, invalidpassword);

    // Expect error message when login fails
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('Login with invalid email', async () => {
    const { invalidemail, validpassword } = env.loginCredentials;
    await loginPage.login(invalidemail, validpassword);

    // Expect error message when login fails
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('Login with empty email and password', async () => {
    await loginPage.login('', '');

    // Check for validation messages
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('Login with empty email', async () => {
    const { validpassword } = env.loginCredentials;
    await loginPage.login('', validpassword);

    // Check for email required validation message
    await expect(page.locator('text=Email is required')).toBeVisible();
  });

  test('Login with empty password', async () => {
    const { validemail } = env.loginCredentials;
    await loginPage.login(validemail, '');

    // Check for password required validation message
    await expect(page.locator('text=Password is required')).toBeVisible();
  });
});