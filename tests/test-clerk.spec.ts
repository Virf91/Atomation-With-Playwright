import { test, expect, Browser, Page } from '@playwright/test';

( async () => { 
    let page: Page;
    let browser: Browser;
    test.describe('Test Clerk flujos principales', () => {
        test.beforeEach(async ({ page }) => {
            // Configurar la autenticación HTTP antes de navegar
            await page.setExtraHTTPHeaders({
                'Authorization': 'Basic ' + Buffer.from('abbott:hq7C9%PI4qKj%n#l').toString('base64')
            });
            await page.goto('https://qa.contigoaliados.abbott/', { waitUntil: 'networkidle' });
            await expect(page.getByRole('heading', { name: 'Ingresa a tu cuenta' })).toBeVisible();
        });

        test('Login usuario Aliada Chile', async ({ page }) => {
            await page.getByRole('button', { name: 'Colombia Colombia' }).click();
            await page.getByText('Chile').click();
            await page.getByPlaceholder('farmacia@farmacia.com').fill('virginia.federici@balloon-group.com');
            await page.getByPlaceholder('********').fill('12345');
            await page.getByRole('button', { name: 'Ingresar' }).click();
            
            
        });
    });
})();


