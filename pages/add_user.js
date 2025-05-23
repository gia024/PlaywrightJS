import { expect } from '@playwright/test';

export default class AddUserPage {
    constructor(page) {
        this.page = page;

        // Form field locators
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
        this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name', exact: true });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username *' });
        this.emailInput = page.getByRole('textbox', { name: 'Email *' });
        this.roleDropdown = page.getByRole('combobox', { name: 'Role *' });
        this.userGroupDropdown = page.getByRole('combobox', { name: 'Group *' });
        this.organizationInput = page.getByRole('textbox', { name: 'Organization *' });
        this.designationInput = page.getByRole('textbox', { name: 'Designation *' });
        this.phoneInput = page.locator('input[placeholder="User\'s Phone Number"]');

        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.usersLink = page.getByRole('link', { name: 'Users' });
        this.addUsersButton = page.getByRole('button', { name: 'Add Users' });
    }

    async navigateToAddUserForm() {
        await this.usersLink.click();
        await this.addUsersButton.click();
    }

    async fillUserForm(userData) {
        await this.firstNameInput.fill(userData.firstName);
        await this.middleNameInput.fill(userData.middleName);
        await this.lastNameInput.fill(userData.lastName);
        await this.usernameInput.fill(userData.username);
        await this.emailInput.fill(userData.email);

        await this.page.locator('button[role="combobox"]:has-text("Choose Role")').click();
        await this.page.getByRole('button', { name: userData.role }).first().click();

        await this.page.locator('button[role="combobox"]:has-text("Choose Group")').click();
        await this.page.getByRole('button', { name: userData.userGroup }).first().click();

        await this.organizationInput.fill(userData.organization);
        await this.designationInput.fill(userData.designation);
        await this.phoneInput.fill(userData.phone);
    }

    async submitForm() {
        await this.saveButton.click();
    }

    async expectSuccess(expectedText) {
        // Find the specific element with the success message
        const successMessage = this.page.locator('div[data-title]', { hasText: expectedText });

        // Assert it is visible and contains the correct text
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText(expectedText);
    }

    async deleteUserByUsername(username) {
        await this.usersLink.click();

        const userRow = this.page.getByRole('row', { name: new RegExp(username, 'i') });
        await expect(userRow).toBeVisible();

        await userRow.getByRole('button').click(); // opens action menu
        await this.page.getByRole('menuitem', { name: 'Delete' }).click();

        const confirmInput = this.page.getByRole('textbox', { name: 'delete' });
        await confirmInput.click();
        await confirmInput.fill('delete');

        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
}
