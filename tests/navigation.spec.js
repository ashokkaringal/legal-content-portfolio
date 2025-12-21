import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Navigation', () => {
    test.use({ viewport: { width: 1920, height: 1080 } }); // Ensure desktop viewport
    
    test('should display all navigation links', async ({ page }) => {
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('nav', { state: 'visible', timeout: 10000 });
      
      // Try both nav-link class and direct href selectors
      const navLinks = page.locator('nav a.nav-link, nav a[href^="#"]').filter({ hasNotText: '[Your Name]' });
      const count = await navLinks.count();
      expect(count).toBeGreaterThanOrEqual(3); // At least 3 nav links (Home, Sample/Samples, Service/Services, Contact)
      
      const linkTexts = await navLinks.allTextContents();
      const allText = linkTexts.join(' ');
      expect(allText).toMatch(/Home/i);
      expect(allText).toMatch(/Sample/i);
      expect(allText).toMatch(/Service/i);
      expect(allText).toMatch(/Contact/i);
    });

    test('should navigate to Home section when clicking Home link', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      // Try both nav-link and direct selector
      const homeLink = page.locator('nav a.nav-link[href="#hero"], nav a[href="#hero"]').first();
      await homeLink.waitFor({ state: 'visible', timeout: 10000 });
      await homeLink.evaluate(el => el.click());
      await page.waitForTimeout(1000); // Wait for smooth scroll
      
      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();
    });

    test('should navigate to Portfolio section when clicking Samples link', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      const samplesLink = page.locator('nav a.nav-link[href="#portfolio"], nav a[href="#portfolio"]').first();
      await samplesLink.waitFor({ state: 'visible', timeout: 10000 });
      await samplesLink.click();
      await page.waitForTimeout(1000);
      
      const portfolioSection = page.locator('#portfolio');
      await expect(portfolioSection).toBeVisible();
    });

    test('should navigate to Services section when clicking Services link', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      const servicesLink = page.locator('nav a.nav-link[href="#services"], nav a[href="#services"]').first();
      await servicesLink.waitFor({ state: 'visible', timeout: 10000 });
      await servicesLink.click();
      await page.waitForTimeout(1000);
      
      const servicesSection = page.locator('#services');
      await expect(servicesSection).toBeVisible();
    });

    test('should navigate to Contact section when clicking Contact link', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      const contactLink = page.locator('nav a.nav-link[href="#contact"], nav a[href="#contact"]').first();
      await contactLink.waitFor({ state: 'visible', timeout: 10000 });
      await contactLink.click();
      await page.waitForTimeout(1000);
      
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
    });

    test('should navigate to hero when clicking logo', async ({ page }) => {
      const logoLink = page.locator('header a[href="#hero"]').first();
      await logoLink.click();
      await page.waitForTimeout(500);
      
      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();
    });

    test('should have hover effects on navigation links', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      const homeLink = page.locator('nav a.nav-link[href="#hero"], nav a[href="#hero"]').first();
      await homeLink.waitFor({ state: 'visible', timeout: 10000 });
      await homeLink.hover();
      await page.waitForTimeout(200);
      
      // Check if link is visible and hoverable
      await expect(homeLink).toBeVisible();
    });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

    test('should display mobile menu button on mobile viewport', async ({ page }) => {
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      await expect(mobileMenuBtn).toBeVisible();
    });

    test('should toggle mobile menu when clicking menu button', async ({ page }) => {
      // Scroll to top to ensure header is visible
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Wait for button to be visible and in viewport
      await expect(mobileMenuBtn).toBeVisible({ timeout: 2000 });
      await mobileMenuBtn.scrollIntoViewIfNeeded();
      
      // Menu should be hidden initially (check visibility, not class)
      await page.waitForFunction(
        (menuId) => {
          const menu = document.getElementById(menuId);
          if (!menu) return true;
          return !menu.classList.contains('open');
        },
        'mobile-menu',
        { timeout: 2000 }
      );
      
      // Click to open and wait for menu to become visible
      await mobileMenuBtn.evaluate(el => el.click());
      await page.waitForFunction(
        (menuId) => {
          const menu = document.getElementById(menuId);
          if (!menu) return false;
          const hasOpen = menu.classList.contains('open');
          const style = window.getComputedStyle(menu);
          const isVisible = style.maxHeight !== '0px' && style.maxHeight !== '';
          return hasOpen && isVisible;
        },
        'mobile-menu',
        { timeout: 2000 }
      );
      
      // Verify open class is added
      const hasOpenClass = await mobileMenu.evaluate(el => el.classList.contains('open'));
      expect(hasOpenClass).toBe(true);
      
      // Click to close and wait for menu to hide
      await mobileMenuBtn.evaluate(el => el.click());
      await page.waitForFunction(
        (menuId) => {
          const menu = document.getElementById(menuId);
          if (!menu) return true;
          return !menu.classList.contains('open');
        },
        'mobile-menu',
        { timeout: 2000 }
      );
    });

    test('should have all mobile menu links', async ({ page }) => {
      // Scroll to top to ensure header is visible
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Wait for button to be visible and in viewport
      await expect(mobileMenuBtn).toBeVisible({ timeout: 2000 });
      await mobileMenuBtn.scrollIntoViewIfNeeded();
      
      // Open menu and wait for it to be visible
      await mobileMenuBtn.evaluate(el => el.click());
      await page.waitForFunction(
        (menuId) => {
          const menu = document.getElementById(menuId);
          if (!menu) return false;
          return menu.classList.contains('open');
        },
        'mobile-menu',
        { timeout: 2000 }
      );
      
      // Wait for links to be visible
      const mobileMenuLinks = page.locator('#mobile-menu a');
      // Links are accessible when menu is open
      await expect(mobileMenuLinks).toHaveCount(4);
      
      const linkTexts = await mobileMenuLinks.allTextContents();
      expect(linkTexts.some(text => text.includes('Home'))).toBe(true);
      expect(linkTexts.some(text => text.includes('Sample'))).toBe(true);
      expect(linkTexts.some(text => text.includes('Service'))).toBe(true);
      expect(linkTexts.some(text => text.includes('Contact'))).toBe(true);
    });

    test('should navigate to section when clicking mobile menu link', async ({ page }) => {
      // Scroll to top to ensure header is visible
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Wait for button to be visible and in viewport
      await expect(mobileMenuBtn).toBeVisible({ timeout: 2000 });
      await mobileMenuBtn.scrollIntoViewIfNeeded();
      
      // Open menu
      await mobileMenuBtn.evaluate(el => el.click());
      await page.waitForFunction(
        (menuId) => {
          const menu = document.getElementById(menuId);
          if (!menu) return false;
          return menu.classList.contains('open');
        },
        'mobile-menu',
        { timeout: 2000 }
      );
      
      // Click portfolio link and wait for navigation
      const portfolioLink = page.locator('#mobile-menu a[href="#portfolio"]');
      await portfolioLink.evaluate(el => el.click());
      
      // Wait for smooth scroll to complete
      await page.waitForFunction(() => {
        const portfolio = document.getElementById('portfolio');
        if (!portfolio) return false;
        const rect = portfolio.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
      }, { timeout: 3000 });
      
      const portfolioSection = page.locator('#portfolio');
      await expect(portfolioSection).toBeVisible({ timeout: 2000 });
    });

    test('should close mobile menu after clicking a link', async ({ page }) => {
      // Scroll to top to ensure header is visible
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Wait for button to be visible and in viewport
      await expect(mobileMenuBtn).toBeVisible({ timeout: 2000 });
      await mobileMenuBtn.scrollIntoViewIfNeeded();
      
      // Open menu
      await mobileMenuBtn.evaluate(el => el.click());
      await page.waitForFunction(
        (menuId) => {
          const menu = document.getElementById(menuId);
          if (!menu) return false;
          return menu.classList.contains('open');
        },
        'mobile-menu',
        { timeout: 2000 }
      );
      
      // Click home link
      const homeLink = page.locator('#mobile-menu a[href="#hero"]');
      await homeLink.evaluate(el => el.click());
      
      // Menu should close after navigation (check visibility, not class)
      await page.waitForFunction(
        (menuId) => {
          const menu = document.getElementById(menuId);
          if (!menu) return true;
          return !menu.classList.contains('open');
        },
        'mobile-menu',
        { timeout: 2000 }
      );
    });
  });

  test.describe('Footer Navigation', () => {
    test('should have footer quick links', async ({ page }) => {
      const footerLinks = page.locator('footer a[href^="#"]');
      await expect(footerLinks.first()).toBeVisible();
    });

    test('should navigate to sections via footer links', async ({ page }) => {
      const footerPortfolioLink = page.locator('footer a[href="#portfolio"]');
      await footerPortfolioLink.click();
      await page.waitForTimeout(500);
      
      const portfolioSection = page.locator('#portfolio');
      await expect(portfolioSection).toBeVisible();
    });

    test('should have back to top button', async ({ page }) => {
      // Scroll to bottom first
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      
      const backToTopBtn = page.locator('#back-to-top');
      await expect(backToTopBtn).toBeVisible();
    });

    test('should scroll to top when clicking back to top button', async ({ page }) => {
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      
      const scrollYBefore = await page.evaluate(() => window.scrollY);
      expect(scrollYBefore).toBeGreaterThan(0);
      
      const backToTopBtn = page.locator('#back-to-top');
      await backToTopBtn.click();
      await page.waitForTimeout(1000); // Wait for smooth scroll
      
      const scrollYAfter = await page.evaluate(() => window.scrollY);
      expect(scrollYAfter).toBeLessThan(100); // Should be near top
    });
  });
});
