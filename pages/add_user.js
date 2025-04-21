import { expect } from '@playwright/test';

export default class AddUserPage {
    constructor(page) {
        this.page = page;
    
        // Form field locators
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.emailInput = page.getByRole('textbox', { name: 'Enter your email address' });
        this.roleDropdown = page.getByRole('combobox').filter({ hasText: 'Role of User' });
        this.userGroupDropdown = page.getByRole('combobox').filter({ hasText: 'Select User Group' });
        this.organizationInput = page.getByRole('textbox', { name: 'Enter Your Organization' });
        this.designationInput = page.getByRole('textbox', { name: 'Your Designation' });
    
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

        await this.roleDropdown.click();
        await this.page.getByRole('button', { name: userData.role }).click();

        await this.userGroupDropdown.click();
        await this.page.getByRole('button', { name: userData.userGroup }).first().click();

        await this.organizationInput.fill(userData.organization);
        await this.designationInput.fill(userData.designation);

        await this.phoneInput.fill(userData.phone);
        await this.page.getByRole("button",{name:"Save"}).click()

    }

    async submitForm() {
        await this.saveButton.click();
    }

    async expectSuccess() {
        await expect(this.page.getByText('New user added successfully.')).toBeVisible();
    }
}
