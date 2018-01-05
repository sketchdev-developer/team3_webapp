import { SpecHelper } from './support/spec.helper';
import { LoginPage } from './pages/login.po';

xdescribe('logging in', () => {
  let specHelper: SpecHelper;
  let loginPage: LoginPage;

  let email: string;
  let password: string;

  beforeEach(() => {
    specHelper = new SpecHelper();
    loginPage = new LoginPage();
  });

  describe('valid credentials', () => {
    beforeEach(() => {
      email = 'valid@example.com';
      password = 'ValidPassword123!';
    });

    it('redirects to protected page', () => {
      specHelper.navigateTo(loginPage);

      loginPage.emailInput.sendKeys(email);
      loginPage.passwordInput.sendKeys(password);

      expect(specHelper.getCurrentUrl()).toEqual('/dashboard');
    });
  });

  describe('invalid credentials', () => {
    beforeEach(() => {
      email = 'invalid@example.com';
      password = 'wrongPassword!';
    });

    it('shows error on login page', () => {
      specHelper.navigateTo(loginPage);

      loginPage.emailInput.sendKeys(email);
      loginPage.passwordInput.sendKeys(password);

      expect(loginPage.errorMessages.getText()).toEqual('Invalid email/password combination');
    });
  });
});