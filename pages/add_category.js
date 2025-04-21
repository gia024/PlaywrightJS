import { expect } from '@playwright/test';

export default class AddCategoryPage {
  constructor(page) {
    this.page = page;

    // Form fields
    this.nameEn = page.getByRole('textbox', { name: 'Name (English)' });
    this.nameNe = page.getByRole('textbox', { name: 'Name (Nepali)' });
    this.order = page.locator('input[name="order"]');

    // Buttons
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Navigation elements
    this.dataLink = page.getByRole('link', { name: 'Data' });
    this.categoryPage = page.getByRole('tab', { name: 'Category' });
    this.addCategoryButton = page.getByRole('button', { name: 'Add Category' });
  }

  // Navigates to the Add Category 
  async navigateToAddCategoryForm() {
    await this.dataLink.click(); 
    await this.categoryPage.click(); 
    await this.addCategoryButton.click(); 
  }

  // Fills the form with given data and submits it
  async fillCategoryForm(categoryData) {
    await this.nameEn.fill(categoryData.nameEn);
    await this.nameNe.fill(categoryData.nameNe); 
    await this.order.fill(categoryData.order.toString());
    await this.saveButton.click(); 
  }
}
