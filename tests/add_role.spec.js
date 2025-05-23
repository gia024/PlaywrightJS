import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import AddRolePage from '../pages/add_role';
import env from '../fixtures/env';

test.describe('Add Role Tests', () => {
  let page, context, loginPage, addRolePage;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    addRolePage = new AddRolePage(page);

    // Login to the application
    await loginPage.goto();
    const { validemail, validpassword } = env.loginCredentials;
    await loginPage.login(validemail, validpassword);

    // Toggle language button (if needed)
    await page.getByText('EN', { exact: true }).click();
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('Add role with selected permissions', async () => {
    const roleName = 'QA Tester ' + Date.now(); // unique role name

    await addRolePage.navigateToAddRoleForm();
    await addRolePage.fillRoleForm(roleName); // No need to pass permissions
    await addRolePage.submitForm();
    await addRolePage.expectSuccess();
  });

  test('Add role without any permissions', async () => {
    const roleName = 'Viewer Only ' + Date.now();

    await addRolePage.navigateToAddRoleForm();
    // If addRolePage.fillRoleForm has no hardcoded checkbox clicks, it’ll be empty
    await addRolePage.fillRoleForm(roleName); 
    await addRolePage.submitForm();
    await addRolePage.expectSuccess();
  });
});