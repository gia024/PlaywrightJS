import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generateUsername } from 'unique-username-generator';
import LoginPage from '../pages/login';
import AddUserPage from '../pages/add_user';
import env from '../fixtures/env';
import { generateRandomDevnagri, generateTenDigitPhoneNumber } from '../fixtures/custom-fixtures';

let sharedUserData = {};
let page;

test.describe.serial('User CRUD: Add, Edit, Delete', () => {
  let loginPage;
  let addUserPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    addUserPage = new AddUserPage(page);

    await loginPage.goto();
    const { validemail, validpassword } = env.loginCredentials;
    await loginPage.login(validemail, validpassword);
    await page.getByText('EN', { exact: true }).click();
  });

  test('Add a user with random data', async () => {
    await addUserPage.navigateToAddUserForm();

    const firstName = generateRandomDevnagri(5);
    const middleName = generateRandomDevnagri(5);
    const lastName = generateRandomDevnagri(5);
    const username = generateUsername("", 0, 5);
    const email = faker.internet.email({ firstName, lastName });
    const organization = faker.company.name();
    const designation = faker.person.jobTitle();
    const phone = generateTenDigitPhoneNumber();
    const role = 'Viewer';
    const userGroup = 'National';

    sharedUserData = {
      firstName,
      middleName,
      lastName,
      username,
      email,
      organization,
      designation,
      phone,
      role,
      userGroup
    };

    await addUserPage.fillUserForm(sharedUserData);
    await addUserPage.submitForm();

    // Check success message
    await addUserPage.expectSuccess('New user added successfully.');
  });

  test('Edit the recently added user', async () => {
  await page.getByRole('link', { name: 'Users' }).first().click();

  // Locate the first user row (recently added user)
  const firstUserRow = page.locator('table tbody tr').first();
  await expect(firstUserRow).toBeVisible();

  // Click kebab menu → Edit
  await firstUserRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();

  // Clear and update Organization
  await addUserPage.organizationInput.fill('');
  const newOrganization = faker.company.name();
  await addUserPage.organizationInput.fill(newOrganization);

  // Clear and update Designation
  await addUserPage.designationInput.fill('');
  const newDesignation = generateRandomDevnagri(5);
  await addUserPage.designationInput.fill(newDesignation);

  // Clear and update Phone
  await addUserPage.phoneInput.fill('');
  const newPhone = generateTenDigitPhoneNumber();
  await addUserPage.phoneInput.fill(newPhone);

  // Click Save button
  await page.locator('button[data-slot="button"]:has-text("Save")').click();

  await page.waitForTimeout(1000);

  // Update shared data
  sharedUserData.organization = newOrganization;
  sharedUserData.designation = newDesignation;
  sharedUserData.phone = newPhone;
});


  // test('Delete the added user', async () => {
  //   await page.getByRole('link', { name: 'Users' }).click();

  //   const userRow = page.locator('tr').filter({ hasText: sharedUserData.username });
  //   await expect(userRow).toBeVisible();

  //   await userRow.getByRole('button', { name: 'Actions' }).click();
  //   await page.getByRole('menuitem', { name: 'Delete' }).click();

  //   const confirmButton = page.getByRole('button', { name: 'Confirm' });
  //   if (await confirmButton.isVisible()) {
  //     await confirmButton.click();
  //   }

  //   await expect(page.locator('tr', { hasText: sharedUserData.username })).toHaveCount(0);
  // });

});
