import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import env from '../fixtures/env';
import faker from '@faker-js/faker';

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });
  
  test('Login with valid credentials', async () => {
    const { validemail, validpassword } = env.loginCredentials;
    await loginPage.login(validemail, validpassword);
    await expect(loginPage.page).not.toHaveURL('https://pin-dev.naxadev.com/'); 
  });

  test('Login with invalid password', async () => {
    const { validemail, invalidpassword } = env.loginCredentials;
    await loginPage.login(validemail, invalidpassword);
    await expect(loginPage.page.locator('text=Invalid credentials')).toBeVisible(); 
  });

  test('Login with invalid email', async () => {
    const { invalidemail, validpassword } = env.loginCredentials;
    await loginPage.login(invalidemail, validpassword);
    await expect(loginPage.page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('Login with empty email and password', async () => {
    await loginPage.login('', '');
    await expect(loginPage.page.locator('text=Email is required')).toBeVisible(); 
  });

  test('Login with empty email', async () => {
    const { validpassword } = env.loginCredentials
    await loginPage.login('', validpassword);
    await expect(loginPage.page.locator('text=Email is required')).toBeVisible(); 
  });

  test('Login with empty password', async () => {
    const { validemail } = env.loginCredentials;
    await loginPage.login(validemail, '');
    await expect(loginPage.page.locator('text=Password is required')).toBeVisible(); 
  });
});
