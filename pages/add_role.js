import { expect } from '@playwright/test';

export default class AddRolePage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.usersLink = page.getByRole('link', { name: 'Users' });
    this.rolesLink = page.getByRole('link', { name: 'Roles' });
    this.addRoleButton = page.getByRole('button', { name: 'Add Role' });

    // Form fields
    this.roleNameInput = page.getByRole('textbox', { name: 'Enter role' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Success message
    this.successMessage = page.getByText('Role and Permission is added');
  }

  async navigateToAddRoleForm() {
    await this.usersLink.click();
    await this.rolesLink.click();
    await this.addRoleButton.click();
  }

  async fillRoleForm(roleName) {
    await this.roleNameInput.fill(roleName);

    // Manually click specific checkboxes — adjust based on your UI
    await this.page.getByRole('checkbox', { name: 'Can add user' }).click();
    await this.page.getByRole('checkbox', { name: 'Can delete data' }).click();
    await this.page.getByRole('checkbox', { name: 'Can add map' }).click();
    await this.page.getByRole('checkbox', { name: 'Can change activity' }).click();
  }

  async submitForm() {
    await this.saveButton.click();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async deleteRole(roleName) {
    const roleRow = this.page.getByRole('row', { name: roleName });
    await roleRow.getByRole('button').nth(1).click(); // Adjust nth if needed
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await expect(this.page.getByText('Role deleted successfully')).toBeVisible();
  }
}