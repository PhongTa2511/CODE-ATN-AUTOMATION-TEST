import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { testData } from '../../utils/testData';

test.describe('Login UI Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    
    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
  });

  test('should fail login and capture screenshot/video', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    
    // Intentionally asserting wrong message to fail and trigger screenshot/video recording
    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!', { timeout: 3000 });
  });
});
