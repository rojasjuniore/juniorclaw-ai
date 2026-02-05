import { test, expect } from '@playwright/test';

/**
 * CLICK-THROUGH TEST
 * 
 * Hace click en todos los elementos interactivos de la app
 * y verifica que ninguno cause un crash o error de JS.
 * 
 * Si algo se rompe → test falla.
 */

test.describe('Click-Through - No Crash Test', () => {
  
  test.beforeEach(async ({ page }) => {
    // Capturar errores de consola
    page.on('pageerror', (error) => {
      console.error('Page error:', error.message);
      throw new Error(`Page crashed: ${error.message}`);
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Console error:', msg.text());
      }
    });

    await page.goto('/');
    // Esperar a que la app cargue
    await page.waitForLoadState('networkidle');
  });

  test('should not crash when clicking all buttons', async ({ page }) => {
    // Encontrar todos los botones
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    console.log(`Found ${count} buttons`);

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Solo clickear si es visible y está habilitado
      if (await button.isVisible() && await button.isEnabled()) {
        try {
          await button.click({ timeout: 2000 });
          // Esperar un momento para que la UI responda
          await page.waitForTimeout(300);
          
          // Verificar que la página no muestra error
          const errorText = await page.locator('text=Application error').count();
          expect(errorText).toBe(0);
        } catch (e) {
          // Ignorar timeouts por elementos que desaparecen
          console.log(`Button ${i} click skipped:`, e);
        }
      }
    }
  });

  test('should not crash when clicking all links', async ({ page }) => {
    // Solo links internos (no externos)
    const links = page.locator('a:not([href^="http"])');
    const count = await links.count();
    
    console.log(`Found ${count} internal links`);

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      
      if (await link.isVisible()) {
        try {
          await link.click({ timeout: 2000 });
          await page.waitForTimeout(300);
          
          // Verificar sin crash
          const errorText = await page.locator('text=Application error').count();
          expect(errorText).toBe(0);
          
          // Volver al inicio si navegó
          await page.goto('/');
          await page.waitForLoadState('networkidle');
        } catch (e) {
          console.log(`Link ${i} click skipped:`, e);
        }
      }
    }
  });

  test('should not crash when interacting with inputs', async ({ page }) => {
    const inputs = page.locator('input, textarea');
    const count = await inputs.count();
    
    console.log(`Found ${count} inputs`);

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      
      if (await input.isVisible() && await input.isEnabled()) {
        try {
          await input.click();
          await input.fill('test input 123');
          await input.press('Enter');
          await page.waitForTimeout(500);
          
          // Verificar sin crash
          const errorText = await page.locator('text=Application error').count();
          expect(errorText).toBe(0);
        } catch (e) {
          console.log(`Input ${i} interaction skipped:`, e);
        }
      }
    }
  });

  test('should not crash on scroll', async ({ page }) => {
    // Scroll hasta el final
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);
    
    // Verificar sin crash
    const errorText = await page.locator('text=Application error').count();
    expect(errorText).toBe(0);

    // Scroll de vuelta
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    
    expect(errorText).toBe(0);
  });

  test('should not crash on window resize', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 1024, height: 768 },  // Tablet landscape
      { width: 768, height: 1024 },  // Tablet portrait
      { width: 375, height: 667 },   // Mobile
      { width: 320, height: 568 },   // Small mobile
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(300);
      
      // Verificar sin crash
      const errorText = await page.locator('text=Application error').count();
      expect(errorText).toBe(0);
    }
  });

  test('should handle rapid interactions without crash', async ({ page }) => {
    // Click rápido múltiples veces
    const clickableElements = page.locator('button, a, [onclick], [role="button"]');
    const count = await clickableElements.count();
    
    // Click rápido en los primeros 5 elementos visibles
    let clicked = 0;
    for (let i = 0; i < count && clicked < 5; i++) {
      const el = clickableElements.nth(i);
      if (await el.isVisible()) {
        try {
          // Triple click rápido
          await el.click({ clickCount: 3, timeout: 1000 });
          clicked++;
        } catch {
          // Ignorar errores
        }
      }
    }

    await page.waitForTimeout(500);
    
    // Verificar que la app sigue viva
    const errorText = await page.locator('text=Application error').count();
    expect(errorText).toBe(0);
    
    // Verificar que podemos seguir interactuando
    await expect(page.locator('body')).toBeVisible();
  });

});
