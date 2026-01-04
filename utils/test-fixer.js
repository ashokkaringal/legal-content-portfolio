import fs from 'fs';
import path from 'path';

/**
 * Utility to analyze test failures and suggest code fixes
 */
export class TestFixer {
  constructor(resultsPath = 'test-results/results.json') {
    this.resultsPath = resultsPath;
    this.failures = [];
  }

  loadResults() {
    if (!fs.existsSync(this.resultsPath)) {
      console.log('No test results found. Run tests first.');
      return false;
    }

    const results = JSON.parse(fs.readFileSync(this.resultsPath, 'utf-8'));
    this.failures = results.suites?.flatMap(suite => 
      suite.specs?.flatMap(spec => 
        spec.tests?.filter(test => test.results?.some(r => r.status === 'failed'))
          .map(test => ({
            title: test.title,
            file: spec.file || 'unknown',
            errors: test.results?.filter(r => r.status === 'failed').map(r => ({
              message: r.error?.message || 'Unknown error',
              stack: r.error?.stack,
            })) || [],
          }))
      ) || []
    ) || [];

    return true;
  }

  analyzeFailures() {
    if (this.failures.length === 0) {
      console.log('No failures to analyze. All tests passed!');
      return null;
    }

    const analysis = {
      totalFailures: this.failures.length,
      categories: {},
      suggestedFixes: [],
    };

    this.failures.forEach(failure => {
      const category = this.categorizeFailure(failure);
      if (!analysis.categories[category]) {
        analysis.categories[category] = [];
      }
      analysis.categories[category].push(failure);
    });

    // Generate suggested fixes
    analysis.suggestedFixes = this.generateFixes(analysis.categories);

    return analysis;
  }

  categorizeFailure(failure) {
    const errorText = failure.errors[0]?.message?.toLowerCase() || '';
    
    if (errorText.includes('locator') || errorText.includes('not found') || errorText.includes('not visible')) {
      return 'Element Not Found';
    } else if (errorText.includes('timeout') || errorText.includes('waiting')) {
      return 'Timeout';
    } else if (errorText.includes('expected') || errorText.includes('assert')) {
      return 'Assertion Failed';
    } else if (errorText.includes('navigation') || errorText.includes('goto')) {
      return 'Navigation';
    } else if (errorText.includes('form') || errorText.includes('input')) {
      return 'Form Issues';
    } else {
      return 'Other';
    }
  }

  generateFixes(categories) {
    const fixes = [];

    Object.entries(categories).forEach(([category, failures]) => {
      const fix = {
        category,
        count: failures.length,
        description: this.getCategoryDescription(category),
        codeFixes: this.getCodeFixes(category, failures),
      };
      fixes.push(fix);
    });

    return fixes;
  }

  getCategoryDescription(category) {
    const descriptions = {
      'Element Not Found': 'Elements are not being found in the DOM. This could be due to incorrect selectors, timing issues, or elements not existing.',
      'Timeout': 'Tests are timing out while waiting for elements or actions to complete.',
      'Assertion Failed': 'Assertions are failing because expected values do not match actual values.',
      'Navigation': 'Navigation or URL-related issues detected.',
      'Form Issues': 'Form-related issues including validation, input fields, or submission.',
      'Other': 'Other types of failures that need investigation.',
    };
    return descriptions[category] || 'Unknown issue category.';
  }

  getCodeFixes(category, failures) {
    const fixes = [];

    switch (category) {
      case 'Element Not Found':
        fixes.push({
          type: 'selector',
          description: 'Update element selectors to match current HTML structure',
          example: `// Before
await page.locator('.old-class').click();

// After - check actual HTML structure
await page.locator('#actual-id').click();
// or
await page.locator('button:has-text("Actual Text")').click();`,
        });
        fixes.push({
          type: 'wait',
          description: 'Add explicit waits for dynamically loaded elements',
          example: `// Add wait before interaction
await page.waitForSelector('#element-id', { state: 'visible' });
await page.locator('#element-id').click();`,
        });
        break;

      case 'Timeout':
        fixes.push({
          type: 'timeout',
          description: 'Increase timeout or add proper wait conditions',
          example: `// Increase timeout
await page.locator('#element').click({ timeout: 10000 });

// Or wait for network/idle
await page.waitForLoadState('networkidle');
await page.locator('#element').click();`,
        });
        break;

      case 'Assertion Failed':
        fixes.push({
          type: 'assertion',
          description: 'Use more flexible assertions or verify actual values',
          example: `// Instead of exact match
await expect(element).toHaveText('Exact Text');

// Use contains
await expect(element).toContainText('Partial Text');

// Or check actual value first
const text = await element.textContent();
console.log('Actual:', text);`,
        });
        break;

      case 'Navigation':
        fixes.push({
          type: 'navigation',
          description: 'Ensure page is fully loaded before interactions',
          example: `// Wait for page load
await page.goto('/');
await page.waitForLoadState('networkidle');
await page.waitForSelector('header');`,
        });
        break;

      case 'Form Issues':
        fixes.push({
          type: 'form',
          description: 'Verify form field IDs and add proper waits',
          example: `// Wait for form to be ready
await page.waitForSelector('#contact-form');
await page.fill('#name', 'Test');
await page.fill('#email', 'test@example.com');`,
        });
        break;
    }

    return fixes;
  }

  generateFixReport(outputPath = 'test-results/fix-suggestions.md') {
    if (!this.loadResults()) {
      return;
    }

    const analysis = this.analyzeFailures();
    if (!analysis) {
      return;
    }

    let report = '# Test Fix Suggestions\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n\n`;
    report += `- Total Failures: ${analysis.totalFailures}\n`;
    report += `- Categories: ${Object.keys(analysis.categories).length}\n\n`;

    report += `## Failure Categories\n\n`;
    Object.entries(analysis.categories).forEach(([category, failures]) => {
      report += `### ${category} (${failures.length} failures)\n\n`;
      failures.slice(0, 3).forEach(failure => {
        report += `- ${failure.title}\n`;
      });
      if (failures.length > 3) {
        report += `- ... and ${failures.length - 3} more\n`;
      }
      report += `\n`;
    });

    report += `## Suggested Fixes\n\n`;
    analysis.suggestedFixes.forEach(fix => {
      report += `### ${fix.category}\n\n`;
      report += `${fix.description}\n\n`;
      report += `**Affected Tests:** ${fix.count}\n\n`;
      
      fix.codeFixes.forEach(codeFix => {
        report += `#### ${codeFix.type}\n\n`;
        report += `${codeFix.description}\n\n`;
        report += `\`\`\`javascript\n${codeFix.example}\n\`\`\`\n\n`;
      });
    });

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, report);
    console.log(`\nFix suggestions generated: ${outputPath}`);
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new TestFixer();
  fixer.generateFixReport();
}


