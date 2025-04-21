import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import LoginPage from '../pages/login';
import AddUserPage from '../pages/add_user';
import env from '../fixtures/env';
import { generateTenDigitPhoneNumber } from '../fixtures/custom-fixtures'; // 👈 import your phone number generator

test.describe('Add User with Faker', () => {
  let loginPage;
  let addUserPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    addUserPage = new AddUserPage(page);

    await loginPage.goto();
    const { validemail, validpassword } = env.loginCredentials;
    await loginPage.login(validemail, validpassword);
    await expect(page).not.toHaveURL('https://pin-dev.naxadev.com/login');
  });

  test('Add user using Faker data', async () => {
    await addUserPage.navigateToAddUserForm();

    // Generate individual pieces of fake data
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const {generateUsername}= require('unique-username-generator') ;
    const username = generateUsername("",0,5);
    const email = faker.internet.email({ firstName, lastName });
    const organization = faker.company.name();
    const designation = faker.person.jobTitle();
    const phone = generateTenDigitPhoneNumber(); //use your 10-digit number

    const role = 'Viewer';
    const userGroup = 'National';

    // Combine all generated data into a user object
    const userData = {
      firstName,
      middleName,
      lastName,
      username,
      email,
      organization,
      designation,
      phone,
      role,
      userGroup,
    };

    await addUserPage.fillUserForm(userData);
    await addUserPage.submitForm();
    await addUserPage.expectSuccess();
  });
});
