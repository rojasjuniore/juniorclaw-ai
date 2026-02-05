import { test, expect } from '@playwright/test';

test.describe('Junior Claw Landing Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Junior Claw/);
    await expect(page.locator('text=junior-claw')).toBeVisible();
    await expect(page.locator('text=ONLINE')).toBeVisible();
  });

  test('should display terminal header', async ({ page }) => {
    // Terminal window elements
    await expect(page.locator('.rounded-full.bg-red-500')).toBeVisible();
    await expect(page.locator('.rounded-full.bg-yellow-500')).toBeVisible();
    await expect(page.locator('.rounded-full.bg-green-500')).toBeVisible();
  });

  test('should display client section', async ({ page }) => {
    await expect(page.locator('text=TRACK RECORD')).toBeVisible();
    await expect(page.locator('text=Chainlink')).toBeVisible();
    await expect(page.locator('text=Railway')).toBeVisible();
    await expect(page.locator('text=Google Cloud')).toBeVisible();
  });

  test('should display stats section', async ({ page }) => {
    await expect(page.locator('text=TAREAS')).toBeVisible();
    await expect(page.locator('text=AGENTES')).toBeVisible();
    await expect(page.locator('text=UPTIME')).toBeVisible();
    await expect(page.locator('text=2847+')).toBeVisible();
    await expect(page.locator('text=99.9%')).toBeVisible();
  });

  test('should display footer with links', async ({ page }) => {
    // Use emoji to target specific footer element
    await expect(page.getByText('🦞 JUNIOR CLAW v2.0')).toBeVisible();
    
    // Check links
    await expect(page.locator('a:has-text("INTECHCHAIN")')).toBeVisible();
    await expect(page.locator('a:has-text("TELEGRAM")')).toBeVisible();
    await expect(page.locator('a:has-text("GITHUB")')).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    await expect(page.locator('text=junior-claw')).toBeVisible();
    await expect(page.locator('text=ONLINE')).toBeVisible();
    await expect(page.locator('text=TRACK RECORD')).toBeVisible();
  });

  test('should have correct link targets', async ({ page }) => {
    const intechLink = page.locator('a[href="https://intechchain.com"]');
    const telegramLink = page.locator('a[href="https://t.me/rojasjuniore"]');
    const githubLink = page.locator('a[href="https://github.com/rojasjuniore"]');
    
    await expect(intechLink).toHaveCount(1);
    await expect(telegramLink).toHaveCount(1);
    await expect(githubLink).toHaveCount(1);
  });

});

test.describe('API Integration', () => {
  
  test('chat API returns valid response', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        messages: [{ role: 'user', content: 'Hola' }]
      }
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('content');
    expect(typeof data.content).toBe('string');
    expect(data.content.length).toBeGreaterThan(0);
  });

  test('chat API handles project queries', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        messages: [{ role: 'user', content: 'Construir una app de delivery' }]
      }
    });
    
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.content).toBeDefined();
    expect(data.content.length).toBeGreaterThan(20);
  });

  test('chat API handles invalid request gracefully', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {}
    });
    
    // Should return error but not crash
    expect(response.status()).toBeLessThan(500);
  });

});
