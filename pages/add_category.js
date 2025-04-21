import { expect } from '@playwright/test';

export default class AddCategoryPage {
  constructor(page) {
    this.page = page;

    // Form fields
    this.nameEn = page.getByRole('textbox', { name: 'Name (English)' });
    this.nameNe = page.getByRole('textbox', { name: 'Name (Nepali)' });
    this.order = page.getByRole('textbox', { name: 'Order' });

    // Buttons
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Navigation elements
    this.dataLink = page.getByRole('link', { name: 'Data' });
    this.categoryPage = page.getByRole('tab', { name: 'Category' });
    this.addCategoryButton = page.getByRole('button', { name: 'Add Category' });
  }

  // Navigates to the Add Category form by clicking through the UI
  async navigateToAddCategoryForm() {
    await this.dataLink.click(); // Click on the "Data" link in the sidebar or menu
    await this.categoryPage.click(); // Click on the "Category" tab
    await this.addCategoryButton.click(); // Click on the "Add Category" button
  }

  // Fills the form with given data and submits it
  async fillCategoryForm(categoryData) {
    await this.nameEn.fill(categoryData.nameEn); // Fill English name
    await this.nameNe.fill(categoryData.nameNe); // Fill Nepali name
    await this.order.fill(categoryData.order); // Fill order number
    await this.saveButton.click(); // Click Save
  }
}
