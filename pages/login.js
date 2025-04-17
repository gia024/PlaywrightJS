// pages/login.js
import { expect } from '@playwright/test';
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput =  page.getByRole('textbox', { name: 'Username or email' });
    this.passwordInput =   page.getByRole('textbox', { name: '********' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }
  async goto() {
    await this.page.goto('https://pin-dev.naxadev.com/login');
  }
  async login(emailAddress, passwordText) {
    await this.emailInput.fill(emailAddress);
    await this.passwordInput.fill(passwordText);
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
  }
}
export default LoginPage;






