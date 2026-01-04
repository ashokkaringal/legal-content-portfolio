import { test, expect } from '@playwright/test';

test.describe('UI Elements & Content Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section', () => {
    test('should display hero section with heading', async ({ page }) => {
      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();
      
      const heroHeading = heroSection.locator('h1');
      await expect(heroHeading).toBeVisible();
      const headingText = await heroHeading.textContent();
      expect(headingText).toContain('Blog Content');
    });

    test('should display CTA buttons in hero', async ({ page }) => {
      const viewWorkBtn = page.locator('a:has-text("View My Work")');
      const freeSampleBtn = page.locator('a:has-text("Get Free Sample")');
      
      await expect(viewWorkBtn).toBeVisible();
      await expect(freeSampleBtn).toBeVisible();
    });

    test('should have hero metrics displayed', async ({ page }) => {
      // Check for metrics like AI Detection Score, Grammar Score, etc.
      const metrics = page.locator('#hero').locator('text=/\\d+%/');
      const count = await metrics.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Problem/Solution Section', () => {
    test('should display problem/solution section', async ({ page }) => {
      const section = page.locator('#problem-solution');
      await expect(section).toBeVisible();
      
      const heading = section.locator('h2');
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText).toContain('Content Crisis');
    });

    test('should display problems column', async ({ page }) => {
      const problemsCard = page.locator('.problem-card');
      await expect(problemsCard).toBeVisible();
      
      const problemsHeading = problemsCard.locator('h3');
      await expect(problemsHeading).toBeVisible();
      const headingText = await problemsHeading.textContent();
      expect(headingText).toContain('Problems');
    });

    test('should display solutions column', async ({ page }) => {
      const solutionsCard = page.locator('.solution-card');
      await expect(solutionsCard).toBeVisible();
      
      const solutionsHeading = solutionsCard.locator('h3');
      await expect(solutionsHeading).toBeVisible();
      const headingText = await solutionsHeading.textContent();
      expect(headingText).toContain('Solutions');
    });

    test('should have problem and solution list items', async ({ page }) => {
      const problemItems = page.locator('.problem-card li');
      const solutionItems = page.locator('.solution-card li');
      
      await expect(problemItems.first()).toBeVisible();
      await expect(solutionItems.first()).toBeVisible();
      
      expect(await problemItems.count()).toBeGreaterThan(0);
      expect(await solutionItems.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Portfolio Section', () => {
    test('should display portfolio section with heading', async ({ page }) => {
      const portfolioSection = page.locator('#portfolio');
      await expect(portfolioSection).toBeVisible();
      
      const heading = portfolioSection.locator('h2');
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText).toContain('Sample Work');
    });

    test('should display all 6 blog cards', async ({ page }) => {
      const blogCards = page.locator('.blog-card');
      await expect(blogCards).toHaveCount(6);
    });

    test('should have blog card with required elements', async ({ page }) => {
      const firstBlogCard = page.locator('.blog-card').first();
      
      // Check for category badge
      const badge = firstBlogCard.locator('span').filter({ hasText: /Personal Injury|Brain Injury|Truck|Rideshare|Workplace/ });
      await expect(badge.first()).toBeVisible();
      
      // Check for title
      const title = firstBlogCard.locator('h3');
      await expect(title).toBeVisible();
      
      // Check for location
      const location = firstBlogCard.locator('p').filter({ hasText: /CA|FL|OR|WA|TX/ });
      await expect(location.first()).toBeVisible();
      
      // Check for metrics
      const metrics = firstBlogCard.locator('span').filter({ hasText: /Word Count|AI Detection|Grammar|Readability/ });
      expect(await metrics.count()).toBeGreaterThan(0);
      
      // Check for Read Full Blog button
      const readBtn = firstBlogCard.locator('button.blog-read-btn, button:has-text("Read Full Blog")');
      await expect(readBtn).toBeVisible();
    });

    test('should display all blog card titles', async ({ page }) => {
      const expectedTitles = [
        'Top 5 Tips for Choosing the Right Personal Injury Lawyer',
        'Common Types of Cases a Personal Injury Lawyer Can Handle',
        'Top 5 Common Causes of Traumatic Brain Injuries',
        'Why Truck Accidents Are More Complicated Than Regular Car Accidents',
        'Key Benefits of Hiring a Rideshare Accident Attorney',
        'Common Risks at Oil Refineries & Their Consequences'
      ];

      for (const title of expectedTitles) {
        const titleElement = page.locator(`text=${title}`).first();
        await expect(titleElement).toBeVisible();
      }
    });
  });

  test.describe('Services Section', () => {
    test('should display services section', async ({ page }) => {
      const servicesSection = page.locator('#services');
      await expect(servicesSection).toBeVisible();
      
      const heading = servicesSection.locator('h2');
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText).toContain('What You Get');
    });

    test('should display all 8 service cards', async ({ page }) => {
      const serviceCards = page.locator('.service-card');
      await expect(serviceCards).toHaveCount(8);
    });

    test('should have service cards with icons and descriptions', async ({ page }) => {
      const firstServiceCard = page.locator('.service-card').first();
      
      // Check for icon/emoji
      const icon = firstServiceCard.locator('text=/[📝🤖🔗📚✍️⚡🔄📊]/');
      await expect(icon.first()).toBeVisible();
      
      // Check for title
      const title = firstServiceCard.locator('h3');
      await expect(title).toBeVisible();
      
      // Check for description
      const description = firstServiceCard.locator('p');
      await expect(description).toBeVisible();
    });
  });

  test.describe('Process Section', () => {
    test('should display process section', async ({ page }) => {
      const processSection = page.locator('#process');
      await expect(processSection).toBeVisible();
      
      const heading = processSection.locator('h2');
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText).toContain('How It Works');
    });

    test('should display all 4 process steps', async ({ page }) => {
      const processSteps = page.locator('.process-step');
      await expect(processSteps).toHaveCount(4);
    });

    test('should have numbered process steps', async ({ page }) => {
      for (let i = 1; i <= 4; i++) {
        const step = page.locator('.process-step').nth(i - 1);
        const stepNumber = step.locator(`text=${i}`);
        await expect(stepNumber).toBeVisible();
      }
    });
  });

  test.describe('Pricing Section', () => {
    test('should display pricing section', async ({ page }) => {
      const pricingSection = page.locator('#pricing');
      await expect(pricingSection).toBeVisible();
      
      const heading = pricingSection.locator('h2');
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText).toContain('Pricing');
    });

    test('should display all 3 pricing cards', async ({ page }) => {
      const pricingCards = page.locator('.pricing-card');
      await expect(pricingCards).toHaveCount(3);
    });

    test('should display correct pricing amounts', async ({ page }) => {
      const singleBlogPrice = page.locator('text=$100').first();
      const monthlyPrice = page.locator('text=$350').first();
      const bulkPrice = page.locator('text=$75').first();
      
      await expect(singleBlogPrice).toBeVisible();
      await expect(monthlyPrice).toBeVisible();
      await expect(bulkPrice).toBeVisible();
    });

    test('should have POPULAR badge on Monthly Package', async ({ page }) => {
      const popularBadge = page.locator('text=POPULAR');
      await expect(popularBadge).toBeVisible();
    });

    test('should have CTA buttons in pricing cards', async ({ page }) => {
      const pricingCards = page.locator('.pricing-card');
      const count = await pricingCards.count();
      
      for (let i = 0; i < count; i++) {
        const card = pricingCards.nth(i);
        const ctaButton = card.locator('a[href="#contact"]');
        await expect(ctaButton).toBeVisible();
      }
    });
  });

  test.describe('Testimonials Section', () => {
    test('should display testimonials section', async ({ page }) => {
      const testimonialsSection = page.locator('#testimonials');
      await expect(testimonialsSection).toBeVisible();
      
      const heading = testimonialsSection.locator('h2');
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Contact Section', () => {
    test('should display contact section', async ({ page }) => {
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
      
      const heading = contactSection.locator('h2');
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText).toContain('Work Together');
    });

    test('should display contact form with all fields', async ({ page }) => {
      const form = page.locator('#contact-form');
      await expect(form).toBeVisible();
      
      // Check required fields
      await expect(page.locator('#name')).toBeVisible();
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('#firm')).toBeVisible();
      await expect(page.locator('#phone')).toBeVisible();
      await expect(page.locator('#message')).toBeVisible();
    });

    test('should display contact info sidebar', async ({ page }) => {
      const contactInfo = page.locator('#contact').locator('text=Get in Touch');
      await expect(contactInfo).toBeVisible();
    });
  });

  test.describe('Footer', () => {
    test('should display footer', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should have footer quick links section', async ({ page }) => {
      const quickLinks = page.locator('footer').locator('text=Quick Links');
      await expect(quickLinks).toBeVisible();
    });

    test('should have footer legal links section', async ({ page }) => {
      const legalLinks = page.locator('footer').locator('text=Legal');
      await expect(legalLinks).toBeVisible();
    });

    test('should display copyright text', async ({ page }) => {
      const copyright = page.locator('footer').locator('text=/©.*2024/');
      await expect(copyright).toBeVisible();
    });
  });
});


