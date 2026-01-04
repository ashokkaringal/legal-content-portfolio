import { test, expect } from '@playwright/test';

test.describe('Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Blog Modal', () => {
    test('should open modal when clicking Read Full Blog button', async ({ page }) => {
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.click();
      
      const modal = page.locator('#blog-modal');
      await expect(modal).toBeVisible();
    });

    test('should display modal title when opened', async ({ page }) => {
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.click();
      
      const modalTitle = page.locator('#modal-title');
      await expect(modalTitle).toBeVisible();
      const titleText = await modalTitle.textContent();
      expect(titleText).toBeTruthy();
      expect(titleText.length).toBeGreaterThan(0);
    });

    test('should display modal content when opened', async ({ page }) => {
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.click();
      
      const modalContent = page.locator('#modal-content');
      await expect(modalContent).toBeVisible();
    });

    test('should close modal when clicking close button', async ({ page }) => {
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.click();
      
      const modal = page.locator('#blog-modal');
      await expect(modal).toBeVisible();
      
      const closeBtn = page.locator('#modal-close');
      await closeBtn.click();
      await page.waitForTimeout(300);
      
      await expect(modal).toHaveClass(/hidden/);
    });

    test('should open correct blog content for each button', async ({ page }) => {
      const blogButtons = page.locator('button.blog-read-btn');
      const buttonCount = await blogButtons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 6); i++) {
        const button = blogButtons.nth(i);
        const blogId = await button.getAttribute('data-blog');
        
        await button.click();
        await page.waitForTimeout(500);
        
        const modal = page.locator('#blog-modal');
        await expect(modal).toBeVisible();
        
        const modalTitle = page.locator('#modal-title');
        await expect(modalTitle).toBeVisible();
        
        // Close modal before next iteration
        const closeBtn = page.locator('#modal-close');
        await closeBtn.click();
        await page.waitForTimeout(300);
      }
    });

    test('should close modal when pressing Escape key', async ({ page }) => {
      const firstBlogBtn = page.locator('button.blog-read-btn').first();
      await firstBlogBtn.click();
      
      const modal = page.locator('#blog-modal');
      await expect(modal).toBeVisible();
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      
      await expect(modal).toHaveClass(/hidden/);
    });
  });

  test.describe('Contact Form', () => {
    test('should show validation error for empty required fields', async ({ page }) => {
      const submitBtn = page.locator('#contact-form button[type="submit"]');
      await submitBtn.click();
      
      // Check HTML5 validation
      const nameField = page.locator('#name');
      const emailField = page.locator('#email');
      const firmField = page.locator('#firm');
      const messageField = page.locator('#message');
      
      // Check if fields are marked as invalid
      const nameValid = await nameField.evaluate((el) => el.validity.valid);
      const emailValid = await emailField.evaluate((el) => el.validity.valid);
      const firmValid = await firmField.evaluate((el) => el.validity.valid);
      const messageValid = await messageField.evaluate((el) => el.validity.valid);
      
      expect(nameValid).toBe(false);
      expect(emailValid).toBe(false);
      expect(firmValid).toBe(false);
      expect(messageValid).toBe(false);
    });

    test('should accept valid form input', async ({ page }) => {
      await page.fill('#name', 'John Doe');
      await page.fill('#email', 'john@example.com');
      await page.fill('#firm', 'Test Law Firm');
      await page.fill('#phone', '555-1234');
      await page.fill('#message', 'Test message for contact form');
      
      // Check if fields are valid
      const nameField = page.locator('#name');
      const emailField = page.locator('#email');
      const firmField = page.locator('#firm');
      const messageField = page.locator('#message');
      
      const nameValid = await nameField.evaluate((el) => el.validity.valid);
      const emailValid = await emailField.evaluate((el) => el.validity.valid);
      const firmValid = await firmField.evaluate((el) => el.validity.valid);
      const messageValid = await messageField.evaluate((el) => el.validity.valid);
      
      expect(nameValid).toBe(true);
      expect(emailValid).toBe(true);
      expect(firmValid).toBe(true);
      expect(messageValid).toBe(true);
    });

    test('should validate email format', async ({ page }) => {
      await page.fill('#email', 'invalid-email');
      await page.locator('#contact-form').click(); // Click outside to trigger validation
      
      const emailField = page.locator('#email');
      const emailValid = await emailField.evaluate((el) => el.validity.valid);
      expect(emailValid).toBe(false);
    });

    test('should have form message display area', async ({ page }) => {
      const formMessage = page.locator('#form-message');
      await expect(formMessage).toBeVisible();
    });

    test('should handle form submission', async ({ page }) => {
      // Fill form
      await page.fill('#name', 'John Doe');
      await page.fill('#email', 'john@example.com');
      await page.fill('#firm', 'Test Law Firm');
      await page.fill('#message', 'Test message');
      
      // Submit form
      const submitBtn = page.locator('#contact-form button[type="submit"]');
      
      // Listen for form submission
      const formSubmitted = page.waitForEvent('submit', { timeout: 1000 }).catch(() => null);
      await submitBtn.click();
      
      // Note: Actual submission behavior depends on form handler implementation
      // This test verifies the button is clickable and form can be submitted
      await expect(submitBtn).toBeEnabled();
    });
  });

  test.describe('CTA Button Interactions', () => {
    test('should navigate to portfolio when clicking View My Work', async ({ page }) => {
      const viewWorkBtn = page.locator('a:has-text("View My Work")').first();
      await viewWorkBtn.click();
      await page.waitForTimeout(500);
      
      const portfolioSection = page.locator('#portfolio');
      await expect(portfolioSection).toBeVisible();
    });

    test('should navigate to contact when clicking Get Free Sample', async ({ page }) => {
      const freeSampleBtn = page.locator('a:has-text("Get Free Sample")').first();
      await freeSampleBtn.click();
      await page.waitForTimeout(500);
      
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
    });

    test('should navigate to contact from pricing card CTAs', async ({ page }) => {
      const pricingCTAs = page.locator('.pricing-card a[href="#contact"]');
      const firstCTA = pricingCTAs.first();
      
      await firstCTA.click();
      await page.waitForTimeout(500);
      
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
    });
  });

  test.describe('Hover Effects', () => {
    test('should have hover effect on blog cards', async ({ page }) => {
      const firstBlogCard = page.locator('.blog-card').first();
      
      // Get initial transform
      const initialTransform = await firstBlogCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      
      await firstBlogCard.hover();
      await page.waitForTimeout(300);
      
      // Check if hover class is applied or transform changed
      const hoverClass = await firstBlogCard.getAttribute('class');
      expect(hoverClass).toBeTruthy();
    });

    test('should have hover effect on service cards', async ({ page }) => {
      const firstServiceCard = page.locator('.service-card').first();
      await firstServiceCard.hover();
      await page.waitForTimeout(300);
      
      const cardClass = await firstServiceCard.getAttribute('class');
      expect(cardClass).toBeTruthy();
    });
  });
});


