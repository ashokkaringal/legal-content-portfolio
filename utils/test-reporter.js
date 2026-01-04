import fs from 'fs';
import path from 'path';

/**
 * Custom test reporter that generates detailed failure analysis
 */
export class TestReporter {
  constructor(outputDir = 'test-results') {
    this.outputDir = outputDir;
    this.failures = [];
    this.summary = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    };
  }

  onTestEnd(test, result) {
    this.summary.total++;
    
    if (result.status === 'passed') {
      this.summary.passed++;
    } else if (result.status === 'failed') {
      this.summary.failed++;
      this.failures.push({
        title: test.title,
        file: test.location.file,
        error: result.error?.message || 'Unknown error',
        duration: result.duration,
        retry: result.retry,
        attachments: result.attachments || [],
      });
    } else if (result.status === 'skipped') {
      this.summary.skipped++;
    }
  }

  onEnd(result) {
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Generate detailed failure report
    this.generateFailureReport();
    
    // Generate fix recommendations
    this.generateFixRecommendations();
    
    // Generate summary report
    this.generateSummaryReport();
  }

  generateFailureReport() {
    if (this.failures.length === 0) {
      return;
    }

    const reportPath = path.join(this.outputDir, 'failure-report.md');
    let report = '# Test Failure Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n\n`;
    report += `- Total Tests: ${this.summary.total}\n`;
    report += `- Passed: ${this.summary.passed}\n`;
    report += `- Failed: ${this.summary.failed}\n`;
    report += `- Skipped: ${this.summary.skipped}\n\n`;
    report += `## Failed Tests\n\n`;

    this.failures.forEach((failure, index) => {
      report += `### ${index + 1}. ${failure.title}\n\n`;
      report += `**File:** \`${failure.file}\`\n\n`;
      report += `**Error:**\n\`\`\`\n${failure.error}\n\`\`\`\n\n`;
      report += `**Duration:** ${failure.duration}ms\n\n`;
      
      if (failure.attachments.length > 0) {
        report += `**Attachments:**\n`;
        failure.attachments.forEach((attachment) => {
          report += `- ${attachment.name}: ${attachment.path}\n`;
        });
        report += `\n`;
      }
      
      report += `---\n\n`;
    });

    fs.writeFileSync(reportPath, report);
    console.log(`\nFailure report generated: ${reportPath}`);
  }

  generateFixRecommendations() {
    if (this.failures.length === 0) {
      return;
    }

    const recommendationsPath = path.join(this.outputDir, 'fix-recommendations.md');
    let recommendations = '# Fix Recommendations\n\n';
    recommendations += `Generated: ${new Date().toISOString()}\n\n`;
    recommendations += `## Analysis of Failures\n\n`;

    // Group failures by type
    const failureTypes = this.categorizeFailures();

    Object.entries(failureTypes).forEach(([category, failures]) => {
      recommendations += `### ${category}\n\n`;
      recommendations += `**Count:** ${failures.length}\n\n`;
      
      failures.forEach((failure) => {
        recommendations += `#### ${failure.title}\n\n`;
        recommendations += this.generateFixSuggestion(failure);
        recommendations += `\n`;
      });
    });

    fs.writeFileSync(recommendationsPath, recommendations);
    console.log(`Fix recommendations generated: ${recommendationsPath}`);
  }

  categorizeFailures() {
    const categories = {
      'Element Not Found': [],
      'Timeout': [],
      'Assertion Failed': [],
      'Navigation Issues': [],
      'Form Validation': [],
      'Other': [],
    };

    this.failures.forEach((failure) => {
      const error = failure.error.toLowerCase();
      
      if (error.includes('locator') || error.includes('not found') || error.includes('not visible')) {
        categories['Element Not Found'].push(failure);
      } else if (error.includes('timeout') || error.includes('waiting')) {
        categories['Timeout'].push(failure);
      } else if (error.includes('expected') || error.includes('assert')) {
        categories['Assertion Failed'].push(failure);
      } else if (error.includes('navigation') || error.includes('goto')) {
        categories['Navigation Issues'].push(failure);
      } else if (error.includes('form') || error.includes('input') || error.includes('validation')) {
        categories['Form Validation'].push(failure);
      } else {
        categories['Other'].push(failure);
      }
    });

    // Remove empty categories
    Object.keys(categories).forEach((key) => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  }

  generateFixSuggestion(failure) {
    const error = failure.error.toLowerCase();
    let suggestion = '**Root Cause:**\n';
    
    if (error.includes('locator') || error.includes('not found')) {
      suggestion += 'Element selector may be incorrect or element does not exist in the DOM.\n\n';
      suggestion += '**Suggested Fix:**\n';
      suggestion += '1. Verify the element exists in the HTML\n';
      suggestion += '2. Check if the selector is correct (ID, class, or text)\n';
      suggestion += '3. Ensure the element is not conditionally rendered\n';
      suggestion += '4. Add proper wait conditions if element loads dynamically\n';
    } else if (error.includes('timeout')) {
      suggestion += 'Test timed out waiting for an element or action.\n\n';
      suggestion += '**Suggested Fix:**\n';
      suggestion += '1. Increase timeout if element takes longer to load\n';
      suggestion += '2. Add explicit wait conditions (waitForLoadState, waitForSelector)\n';
      suggestion += '3. Check for network issues or slow API calls\n';
      suggestion += '4. Verify element is not hidden or covered by another element\n';
    } else if (error.includes('expected') || error.includes('assert')) {
      suggestion += 'Assertion failed - expected value did not match actual value.\n\n';
      suggestion += '**Suggested Fix:**\n';
      suggestion += '1. Verify the expected value is correct\n';
      suggestion += '2. Check if the element content has changed\n';
      suggestion += '3. Use more flexible assertions (toContain instead of toBe)\n';
      suggestion += '4. Add debugging to see actual vs expected values\n';
    } else if (error.includes('navigation')) {
      suggestion += 'Navigation or URL issue detected.\n\n';
      suggestion += '**Suggested Fix:**\n';
      suggestion += '1. Verify the URL is correct\n';
      suggestion += '2. Check if the page requires authentication\n';
      suggestion += '3. Ensure the page is fully loaded before interactions\n';
      suggestion += '4. Check for JavaScript errors in console\n';
    } else if (error.includes('form') || error.includes('validation')) {
      suggestion += 'Form validation or input issue.\n\n';
      suggestion += '**Suggested Fix:**\n';
      suggestion += '1. Verify form field IDs and names are correct\n';
      suggestion += '2. Check if form validation is working as expected\n';
      suggestion += '3. Ensure required fields are properly marked\n';
      suggestion += '4. Test form submission handler\n';
    } else {
      suggestion += 'Unknown error type.\n\n';
      suggestion += '**Suggested Fix:**\n';
      suggestion += '1. Review the error message carefully\n';
      suggestion += '2. Check browser console for JavaScript errors\n';
      suggestion += '3. Verify network requests are completing\n';
      suggestion += '4. Check if the website structure has changed\n';
    }
    
    suggestion += '\n**Code Location:**\n';
    suggestion += `\`\`\`\n${failure.file}\n\`\`\`\n`;
    
    return suggestion;
  }

  generateSummaryReport() {
    const summaryPath = path.join(this.outputDir, 'test-summary.json');
    const summary = {
      timestamp: new Date().toISOString(),
      summary: this.summary,
      failures: this.failures.map((f) => ({
        title: f.title,
        file: f.file,
        error: f.error,
      })),
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`Test summary generated: ${summaryPath}`);
  }
}


