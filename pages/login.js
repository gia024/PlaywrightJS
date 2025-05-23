class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByRole('textbox', { name: 'Email/Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember Me' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto(baseURL) {
    await this.page.goto(`${baseURL}login`);
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.rememberMeCheckbox.check();
    await this.signInButton.click();
  }

  async switchToEnglishIfNeeded() {
    try {
      // Wait for the toggle to be visible
      await this.languageToggle.waitFor({ state: 'visible', timeout: 5000 });
      await this.languageToggle.click();
    } catch (e) {
      // Do nothing if already in English
      console.error("Language toggle not visible or already in English.");
    }
  }
}

export default LoginPage;