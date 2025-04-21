import {test, expect} from '@playwright/test';
import LoginPage from '../pages/login';
import { generateRandomString } from '../fixtures/custom-fixtures';
import { generateRandomNumber } from '../fixtures/custom-fixtures';
import env from '../fixtures/env';

test.describe('Add category', () =>{
    let loginPage;
    let addCategoryPage;

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        loginPage = new LoginPage(page);

        await loginPage.goto();
        const {validemail, validpassword} = env.loginCredentials;
        await loginPage.login(validemail, validpassword);

        await expect(page).toHaveURL('https://pin-dev.naxadev.com/login');

    });
    
    test('Add Category', async () => {
        const categoryNameEn = generateRandomString(7);
        const categoryNameNe = generateRandomString(7);
        const orderNum = generateRandomNumber();

        const categoryData ={
        categoryNameEn,
        categoryNameNe,
        orderNum
        }
    });

})