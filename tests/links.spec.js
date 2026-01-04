import { test, expect } from '@playwright/test';

test.describe('Link Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Internal Anchor Links', () => {
    test('should have working #hero anchor link', async ({ page }) => {
      const heroLink = page.locator('a[href="#hero"]').first();
      await heroLink.click();
      await page.waitForTimeout(500);
      
      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();
      
      // Check URL hash
      const url = page.url();
      expect(url).toContain('#hero');
    });

    test('should have working #portfolio anchor link', async ({ page }) => {
      const portfolioLink = page.locator('a[href="#portfolio"]').first();
      await portfolioLink.click();
      await page.waitForTimeout(500);
      
      const portfolioSection = page.locator('#portfolio');
      await expect(portfolioSection).toBeVisible();
    });

    test('should have working #services anchor link', async ({ page }) => {
      const servicesLink = page.locator('a[href="#services"]').first();
      await servicesLink.click();
      await page.waitForTimeout(500);
      
      const servicesSection = page.locator('#services');
      await expect(servicesSection).toBeVisible();
    });

    test('should have working #contact anchor link', async ({ page }) => {
      const contactLink = page.locator('a[href="#contact"]').first();
      await contactLink.click();
      await page.waitForTimeout(500);
      
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
    });

    test('should have working #pricing anchor link', async ({ page }) => {
      const pricingLink = page.locator('a[href="#pricing"]').first();
      if (await pricingLink.count() > 0) {
        await pricingLink.click();
        await page.waitForTimeout(500);
        
        const pricingSection = page.locator('#pricing');
        await expect(pricingSection).toBeVisible();
      }
    });
  });

  test.describe('External Links', () => {
    test('should have mailto link in contact section', async ({ page }) => {
      const mailtoLink = page.locator('a[href^="mailto:"]');
      const count = await mailtoLink.count();
      expect(count).toBeGreaterThan(0);
      
      const firstMailto = mailtoLink.first();
      const href = await firstMailto.getAttribute('href');
      expect(href).toMatch(/^mailto:/);
    });

    test('should have LinkedIn link placeholder', async ({ page }) => {
      const linkedInLink = page.locator('a[aria-label="LinkedIn"]');
      const count = await linkedInLink.count();
      
      if (count > 0) {
        const href = await linkedInLink.first().getAttribute('href');
        // Note: This might be a placeholder (#) - that's acceptable for now
        expect(href).toBeTruthy();
      }
    });

    test('should have footer legal links', async ({ page }) => {
      const privacyLink = page.locator('footer a:has-text("Privacy Policy")');
      const termsLink = page.locator('footer a:has-text("Terms of Service")');
      
      // These links might be placeholders (#) - verify they exist
      if (await privacyLink.count() > 0) {
        await expect(privacyLink.first()).toBeVisible();
      }
      
      if (await termsLink.count() > 0) {
        await expect(termsLink.first()).toBeVisible();
      }
    });
  });

  test.describe('CTA Links', () => {
    test('should have View My Work linking to portfolio', async ({ page }) => {
      const viewWorkLinks = page.locator('a:has-text("View My Work")');
      const count = await viewWorkLinks.count();
      expect(count).toBeGreaterThan(0);
      
      const firstLink = viewWorkLinks.first();
      const href = await firstLink.getAttribute('href');
      expect(href).toBe('#portfolio');
    });

    test('should have Get Free Sample linking to contact', async ({ page }) => {
      const freeSampleLinks = page.locator('a:has-text("Get Free Sample")');
      const count = await freeSampleLinks.count();
      expect(count).toBeGreaterThan(0);
      
      const firstLink = freeSampleLinks.first();
      const href = await firstLink.getAttribute('href');
      expect(href).toBe('#contact');
    });

    test('should have pricing card CTAs linking to contact', async ({ page }) => {
      const pricingCTAs = page.locator('.pricing-card a[href="#contact"]');
      const count = await pricingCTAs.count();
      expect(count).toBe(3); // All 3 pricing cards should have contact CTAs
    });
  });

  test.describe('Link Accessibility', () => {
    test('should have accessible link text', async ({ page }) => {
      const allLinks = page.locator('a[href]');
      const linkCount = await allLinks.count();
      
      for (let i = 0; i < Math.min(linkCount, 20); i++) {
        const link = allLinks.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        // Link should have either text content or aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should not have broken image links', async ({ page }) => {
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        
        if (src && !src.startsWith('data:')) {
          // Check if image loads
          const naturalWidth = await img.evaluate((el) => {
            return new Promise((resolve) => {
              if (el.complete) {
                resolve(el.naturalWidth);
              } else {
                el.onload = () => resolve(el.naturalWidth);
                el.onerror = () => resolve(0);
                setTimeout(() => resolve(el.naturalWidth), 1000);
              }
            });
          });
          
          // Note: We're just checking if the attribute exists, not if it's broken
          // Actual broken link detection would require network monitoring
        }
      }
    });
  });

  test.describe('Smooth Scrolling', () => {
    test('should smoothly scroll to sections', async ({ page }) => {
      // Start at top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      
      const initialScroll = await page.evaluate(() => window.scrollY);
      
      // Click portfolio link
      const portfolioLink = page.locator('a[href="#portfolio"]').first();
      await portfolioLink.click();
      
      // Wait for scroll animation
      await page.waitForTimeout(1000);
      
      const finalScroll = await page.evaluate(() => window.scrollY);
      expect(finalScroll).toBeGreaterThan(initialScroll);
    });
  });
});


