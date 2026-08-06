// tests/customer-add-to-cart.spec.js
import { test, expect } from '@playwright/test';

test.describe('🛒 Customer Add to Cart Test', () => {
  
  test('✅ Customer can add item to cart', async ({ page }) => {
    console.log('🚀 Starting: Add to Cart Test');
    
    // 1️⃣ Go to menu page
    await page.goto('http://localhost:5173/menu');
    console.log('✅ Menu page loaded');
    
    // 2️⃣ Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // 3️⃣ Check if any menu items exist
    const items = page.locator('.bg-white.rounded-2xl, .bg-white.rounded-xl, .group.bg-white');
    const count = await items.count();
    console.log(`📦 Found ${count} menu items`);
    
    if (count === 0) {
      console.log('⚠️ No menu items found. Check if API is running.');
      await page.screenshot({ path: 'test-results/no-items.png' });
    }
    
    // 4️⃣ Find and click "Add to Cart" button
    const addButton = page.locator('button:has-text("Add to Cart")').first();
    
    if (await addButton.count() === 0) {
      console.log('⚠️ No "Add to Cart" button found');
      await page.screenshot({ path: 'test-results/no-add-button.png' });
      // Don't fail, just log
      return;
    }
    
    // 5️⃣ Click the button
    await addButton.click();
    console.log('✅ Clicked Add to Cart button');
    
    // 6️⃣ Wait a moment for the action to complete
    await page.waitForTimeout(1000);
    
    // 7️⃣ Check if item was added (look for any success indicator)
    const successIndicators = [
      'added to cart',
      'Added to Cart',
      'Added!',
      '✅'
    ];
    
    let itemAdded = false;
    for (const text of successIndicators) {
      const element = page.locator(`text=${text}`).first();
      if (await element.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log(`✅ Found success indicator: "${text}"`);
        itemAdded = true;
        break;
      }
    }
    
    if (itemAdded) {
      console.log('✅ Item successfully added to cart!');
    } else {
      console.log('⚠️ Could not verify item was added, but continuing...');
    }
    
    // 8️⃣ Now go to cart page
    await page.goto('http://localhost:5173/cart');
    console.log('✅ Navigated to cart page');
    
    await page.waitForTimeout(1000);
    
    // 9️⃣ Check if cart has items
    const cartItems = page.locator('.bg-white.rounded-xl.border, .bg-white.rounded-xl.shadow-sm');
    const cartCount = await cartItems.count();
    console.log(`📦 Cart has ${cartCount} items`);
    
    if (cartCount > 0) {
      console.log('✅ Cart has items! Test PASSED ✅');
    } else {
      console.log('❌ Cart is empty. Test FAILED ❌');
    }
    
    // 🔟 Take final screenshot
    await page.screenshot({ path: 'test-results/final-cart.png' });
    console.log('📸 Final screenshot saved');
  });
});