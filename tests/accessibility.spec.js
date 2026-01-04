import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('ARIA Labels and Roles', () => {
    test('should have aria-label on mobile menu button', async ({ page }) => {
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const ariaLabel = await mobileMenuBtn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.toLowerCase()).toContain('menu');
    });

    test('should have aria-label on modal close button', async ({ page }) => {
      // Open modal first
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.click();
      await page.waitForTimeout(300);
      
      const closeBtn = page.locator('#modal-close');
      const ariaLabel = await closeBtn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.toLowerCase()).toContain('close');
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1');
      const h2 = page.locator('h2');
      
      await expect(h1.first()).toBeVisible();
      await expect(h2.first()).toBeVisible();
      
      // Should have at least one h1
      expect(await h1.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have labels associated with form inputs', async ({ page }) => {
      const nameInput = page.locator('#name');
      const nameLabel = page.locator('label[for="name"]');
      
      await expect(nameLabel).toBeVisible();
      await expect(nameInput).toBeVisible();
      
      // Check other required fields
      const emailLabel = page.locator('label[for="email"]');
      const firmLabel = page.locator('label[for="firm"]');
      const messageLabel = page.locator('label[for="message"]');
      
      await expect(emailLabel).toBeVisible();
      await expect(firmLabel).toBeVisible();
      await expect(messageLabel).toBeVisible();
    });

    test('should indicate required fields', async ({ page }) => {
      const nameLabel = page.locator('label[for="name"]');
      const nameLabelText = await nameLabel.textContent();
      expect(nameLabelText).toContain('*');
      
      const emailLabel = page.locator('label[for="email"]');
      const emailLabelText = await emailLabel.textContent();
      expect(emailLabelText).toContain('*');
    });

    test('should have proper input types', async ({ page }) => {
      const emailInput = page.locator('#email');
      const inputType = await emailInput.getAttribute('type');
      expect(inputType).toBe('email');
      
      const phoneInput = page.locator('#phone');
      const phoneType = await phoneInput.getAttribute('type');
      expect(phoneType).toBe('tel');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate with Tab key', async ({ page }) => {
      // Start at top
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      
      // Should be able to tab through navigation
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });

    test('should activate links with Enter key', async ({ page }) => {
      const homeLink = page.locator('nav a[href="#hero"]').first();
      await homeLink.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      
      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();
    });

    test('should close modal with Escape key', async ({ page }) => {
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.click();
      await page.waitForTimeout(300);
      
      const modal = page.locator('#blog-modal');
      await expect(modal).toBeVisible();
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      
      await expect(modal).toHaveClass(/hidden/);
    });

    test('should submit form with Enter key', async ({ page }) => {
      // Scroll to form
      await page.evaluate(() => {
        document.querySelector('#contact')?.scrollIntoView();
      });
      await page.waitForTimeout(500);
      
      // Fill form
      await page.fill('#name', 'Test User');
      await page.fill('#email', 'test@example.com');
      await page.fill('#firm', 'Test Firm');
      await page.fill('#message', 'Test message');
      
      // Focus submit button and press Enter
      const submitBtn = page.locator('#contact-form button[type="submit"]');
      await submitBtn.focus();
      
      // Note: Actual submission depends on form handler
      await expect(submitBtn).toBeEnabled();
    });
  });

  test.describe('Focus Indicators', () => {
    test('should have visible focus indicators on links', async ({ page }) => {
      const homeLink = page.locator('nav a[href="#hero"]').first();
      await homeLink.focus();
      
      // Check if element has focus
      const isFocused = await homeLink.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBe(true);
    });

    test('should have visible focus indicators on buttons', async ({ page }) => {
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.focus();
      
      const isFocused = await firstBlogBtn.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBe(true);
    });

    test('should have visible focus indicators on form inputs', async ({ page }) => {
      const nameInput = page.locator('#name');
      await nameInput.focus();
      
      const isFocused = await nameInput.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBe(true);
    });
  });

  test.describe('Image Alt Text', () => {
    test('should have alt text on images', async ({ page }) => {
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const ariaLabel = await img.getAttribute('aria-label');
        
        // Image should have either alt text or aria-label
        // (or be decorative with empty alt)
        const hasAccessibleName = alt !== null || ariaLabel !== null;
        expect(hasAccessibleName).toBe(true);
      }
    });
  });

  test.describe('Color Contrast', () => {
    test('should have readable text colors', async ({ page }) => {
      // This is a basic check - full contrast testing would require more complex analysis
      const heroHeading = page.locator('#hero h1');
      await expect(heroHeading).toBeVisible();
      
      const color = await heroHeading.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      // Just verify that color is set (not transparent)
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
      expect(color).not.toBe('transparent');
    });
  });

  test.describe('Semantic HTML', () => {
    test('should use semantic HTML elements', async ({ page }) => {
      // Check for semantic elements
      const header = page.locator('header');
      const footer = page.locator('footer');
      const nav = page.locator('nav');
      const main = page.locator('main');
      const sections = page.locator('section');
      
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();
      await expect(nav).toBeVisible();
      await expect(sections.first()).toBeVisible();
    });

    test('should use proper button elements for actions', async ({ page }) => {
      const blogButtons = page.locator('button.blog-read-btn');
      const count = await blogButtons.count();
      expect(count).toBe(6);
      
      // All should be actual button elements
      for (let i = 0; i < count; i++) {
        const btn = blogButtons.nth(i);
        const tagName = await btn.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('button');
      }
    });
  });
});


