// tests/admin-login.spec.js
import { test, expect } from '@playwright/test';

test.describe('🔐 Admin Login Test', () => {
  
  test('✅ Admin can login with correct credentials', async ({ page }) => {
    console.log('🚀 Starting: Admin Login Test');
    
    // 1️⃣ Go to admin login page
    await page.goto('http://localhost:5173/admin/login');
    console.log('✅ Admin login page loaded');
    
    // 2️⃣ Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // 3️⃣ Take screenshot before login
    await page.screenshot({ path: 'test-results/admin-login-page.png' });
    console.log('📸 Login page screenshot saved');
    
    // 4️⃣ Fill email/username field
    const emailField = page.locator('input[type="text"], input[type="email"], input[placeholder*="Email"]').first();
    await emailField.fill('admin@example.com');
    console.log('✅ Email filled: admin@example.com');
    
    // 5️⃣ Fill password field
    const passField = page.locator('input[type="password"]').first();
    await passField.fill('admin123');
    console.log('✅ Password filled: admin123');
    
    // 6️⃣ Click login button
    const loginBtn = page.locator('button:has-text("Login"), button[type="submit"]').first();
    await loginBtn.click();
    console.log('✅ Clicked Login button');
    
    // 7️⃣ Wait for response
    await page.waitForTimeout(3000);
    
    // 8️⃣ Check current URL
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    
    // 9️⃣ Check if login was successful
    if (currentUrl.includes('dashboard')) {
      console.log('✅✅✅ LOGIN SUCCESSFUL! Redirected to dashboard');
      
      // Check if dashboard is visible
      const dashboardTitle = page.locator('h1:has-text("Dashboard")');
      if (await dashboardTitle.isVisible()) {
        console.log('✅ Dashboard title is visible');
      }
      
      await page.screenshot({ path: 'test-results/admin-login-success.png' });
      console.log('📸 Success screenshot saved');
      
    } else {
      console.log('❌❌❌ LOGIN FAILED! Still on login page');
      
      // Check for error message
      const errorMsg = page.locator('.bg-red-50, .text-red-600, .text-red-500');
      if (await errorMsg.isVisible()) {
        const errorText = await errorMsg.textContent();
        console.log(`❌ Error message: ${errorText}`);
      } else {
        console.log('❌ No error message visible');
      }
      
      await page.screenshot({ path: 'test-results/admin-login-failed.png' });
      console.log('📸 Failure screenshot saved');
    }
    
    console.log('🏁 Admin Login Test Complete');
  });
});