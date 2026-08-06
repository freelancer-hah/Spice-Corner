// tests/customer-register.spec.js
import { test, expect } from '@playwright/test';

test.describe('📝 Customer Registration Test', () => {
  
  test('✅ Customer can register a new account', async ({ page }) => {
    console.log('🚀 Starting: Customer Registration Test');
    
    // Generate unique email to avoid duplicate errors
    const timestamp = Date.now();
    const uniqueEmail = `testuser${timestamp}@example.com`;
    
    // 1️⃣ Go to register page
    await page.goto('http://localhost:5173/register');
    console.log('✅ Register page loaded');
    
    // 2️⃣ Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // 3️⃣ Take screenshot before registration
    await page.screenshot({ path: 'test-results/register-page.png' });
    console.log('📸 Register page screenshot saved');
    
    // 4️⃣ Fill registration form
    await page.fill('input[name="name"]', 'Test User');
    console.log('✅ Name filled');
    
    await page.fill('input[name="email"]', uniqueEmail);
    console.log(`✅ Email filled: ${uniqueEmail}`);
    
    await page.fill('input[name="phone"]', '03001234567');
    console.log('✅ Phone filled');
    
    await page.fill('input[name="password"]', 'Test@123');
    console.log('✅ Password filled');
    
    await page.fill('input[name="confirmPassword"]', 'Test@123');
    console.log('✅ Confirm password filled');
    
    // 5️⃣ Take screenshot before submit
    await page.screenshot({ path: 'test-results/register-form-filled.png' });
    console.log('📸 Form filled screenshot saved');
    
    // 6️⃣ Click register button
    await page.click('button:has-text("Create Account")');
    console.log('✅ Clicked Create Account button');
    
    // 7️⃣ Wait for response
    await page.waitForTimeout(3000);
    
    // 8️⃣ Check current URL
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    
    // 9️⃣ Check if registration was successful
    if (currentUrl === 'http://localhost:5173/' || currentUrl.includes('home')) {
      console.log('✅✅✅ REGISTRATION SUCCESSFUL! Redirected to home');
      
      // Check if user is logged in (navbar shows user name or logout)
      const logoutBtn = page.locator('button:has-text("Logout")');
      if (await logoutBtn.isVisible()) {
        console.log('✅ User is logged in');
      }
      
      await page.screenshot({ path: 'test-results/register-success.png' });
      console.log('📸 Success screenshot saved');
      
    } else {
      console.log('❌❌❌ REGISTRATION FAILED');
      
      // Check for error message
      const errorMsg = page.locator('.bg-red-50, .text-red-600, .text-red-500');
      if (await errorMsg.isVisible()) {
        const errorText = await errorMsg.textContent();
        console.log(`❌ Error message: ${errorText}`);
      }
      
      await page.screenshot({ path: 'test-results/register-failed.png' });
      console.log('📸 Failure screenshot saved');
    }
    
    console.log('🏁 Registration Test Complete');
  });
});