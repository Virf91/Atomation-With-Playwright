import { test, expect } from "@playwright/test";

test.describe('Exploratory Testing in Mercado Libre', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.mercadolibre.com.ar');
        await expect(page).toHaveTitle('Mercado Libre Argentina - Envíos Gratis en el día');
        await page.getByTestId('action:understood-button').click();
        const searchBar = page.getByPlaceholder('Buscar productos, marcas y más');
        await searchBar.type('Playstation 5');
        await page.keyboard.press('Enter');
        await page.getByRole('button', { name: 'Más tarde' }).click();

    });

    test('Validate that the search bar is working', async ({ page }) => {
    const results = page.locator('section').filter({ hasText: 'Búsquedas relacionadasgta' })
    await expect(results).toBeVisible();
    }); 


    test('validate that the switchs "LLegan hoy" works', async ({ page }) => {
        const switchLLegaManana = page.getByRole('button', { name: 'Llegan hoy' });
        await switchLLegaManana.click();  
    });


    // test('validate that the filter "Full envios" works', async ({ page }) => {
    //     const switchFullEnvios = page.getByRole('button', { name: 'full te da envío gratis En' });
    //     await switchFullEnvios.click();
    // });

    test('Validate that Condition Filter works', async ({ page }) => {
        const conditionNew = await page.getByLabel('Nuevo, 185 resultados');
        await conditionNew.click();
        const closeConditionNew = await page.getByLabel('Quitar el filtro de Condición');
        await closeConditionNew.click();
    });

    test('Validate that the order filter by price works', async ({ page }) => {
        const sortButton = page.getByLabel('Más relevantes');
        await sortButton.click();
        const priceFilter = page.getByText('Menor precio');
        await priceFilter.click();
    });

});
