import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375, height: 667 }, // iPhone SE
  { name: 'Tablet', width: 768, height: 1024 }, // iPad
  { name: 'Desktop', width: 1920, height: 1080 }, // Desktop
];

test.describe('Responsive Design Tests', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} Viewport (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      });

      test('should display header correctly', async ({ page }) => {
        const header = page.locator('header');
        await expect(header).toBeVisible();
      });

      test('should display hero section correctly', async ({ page }) => {
        const heroSection = page.locator('#hero');
        await expect(heroSection).toBeVisible();
        
        const heroHeading = heroSection.locator('h1');
        await expect(heroHeading).toBeVisible();
      });

      test('should display navigation correctly', async ({ page }) => {
        if (viewport.width < 768) {
          // Mobile: menu button should be visible
          const mobileMenuBtn = page.locator('#mobile-menu-btn');
          await expect(mobileMenuBtn).toBeVisible();
        } else {
          // Desktop: nav links should be visible
          const navLinks = page.locator('nav a[href^="#"]');
          await expect(navLinks.first()).toBeVisible();
        }
      });

      test('should display portfolio section correctly', async ({ page }) => {
        const portfolioSection = page.locator('#portfolio');
        await expect(portfolioSection).toBeVisible();
        
        const blogCards = page.locator('.blog-card');
        await expect(blogCards.first()).toBeVisible();
      });

      test('should display contact form correctly', async ({ page }) => {
        // Scroll to contact section
        await page.evaluate(() => {
          document.querySelector('#contact')?.scrollIntoView();
        });
        await page.waitForTimeout(500);
        
        const contactForm = page.locator('#contact-form');
        await expect(contactForm).toBeVisible();
        
        const nameField = page.locator('#name');
        await expect(nameField).toBeVisible();
      });

      test('should have readable text at viewport size', async ({ page }) => {
        const heroHeading = page.locator('#hero h1');
        await expect(heroHeading).toBeVisible();
        
        // Check if text is readable (not too small)
        const fontSize = await heroHeading.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).fontSize);
        });
        
        // Font size should be reasonable (at least 16px for readability)
        expect(fontSize).toBeGreaterThan(12);
      });

      test('should not have horizontal scroll', async ({ page }) => {
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = viewport.width;
        
        // Body width should not exceed viewport width significantly
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small margin for rounding
      });
    });
  }

  test.describe('Mobile-Specific Tests', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should show mobile menu button', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      await expect(mobileMenuBtn).toBeVisible();
    });

    test('should hide desktop navigation on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const desktopNav = page.locator('nav .hidden.md\\:flex');
      // Desktop nav should be hidden on mobile
      const isVisible = await desktopNav.isVisible();
      expect(isVisible).toBe(false);
    });

    test('should stack blog cards vertically on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const blogCards = page.locator('.blog-card');
      const firstCard = blogCards.first();
      const secondCard = blogCards.nth(1);
      
      await expect(firstCard).toBeVisible();
      await expect(secondCard).toBeVisible();
      
      // On mobile, cards should stack (second card should be below first)
      const firstCardBottom = await firstCard.boundingBox();
      const secondCardTop = await secondCard.boundingBox();
      
      if (firstCardBottom && secondCardTop) {
        expect(secondCardTop.y).toBeGreaterThan(firstCardBottom.y);
      }
    });
  });

  test.describe('Desktop-Specific Tests', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should show desktop navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const desktopNav = page.locator('nav a[href^="#"]');
      await expect(desktopNav.first()).toBeVisible();
    });

    test('should hide mobile menu button on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      // Mobile menu button should be hidden on desktop
      const isVisible = await mobileMenuBtn.isVisible();
      expect(isVisible).toBe(false);
    });

    test('should display blog cards in grid on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const blogCards = page.locator('.blog-card');
      await expect(blogCards).toHaveCount(6);
      
      // On desktop, multiple cards should be visible in a row
      const firstCard = blogCards.first();
      const secondCard = blogCards.nth(1);
      
      const firstCardBox = await firstCard.boundingBox();
      const secondCardBox = await secondCard.boundingBox();
      
      if (firstCardBox && secondCardBox) {
        // Cards should be side by side (similar Y position)
        const yDifference = Math.abs(firstCardBox.y - secondCardBox.y);
        expect(yDifference).toBeLessThan(50); // Allow some margin
      }
    });
  });
});


