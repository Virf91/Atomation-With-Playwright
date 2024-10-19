import { test, expect } from "@playwright/test";

test.describe('Exploratory Testing in Mercado Libre', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.mercadolibre.com.ar');
        await expect(page).toHaveTitle('Mercado Libre Argentina - Envíos Gratis en el día');
        await page.getByTestId('action:understood-button').click();
        const searchBar = page.getByPlaceholder('Buscar productos, marcas y más');
        await searchBar.type('Playstation 5');
        await page.keyboard.press('Enter');

    });

    test('Validate that the search bar is working', async ({ page }) => {
    const results = page.locator('section').filter({ hasText: 'Búsquedas relacionadasgta' })
    await expect(results).toBeVisible();
    }); 


    test('validate that the switchs "LLegan hoy" works', async ({ page }) => {
        const switchLLegaManana = page.getByRole('button', { name: 'Llegan hoy' });
        await switchLLegaManana.click();  
    });


    test('validate that the filter "Full envios" works', async ({ page }) => {
        const switchFullEnvios = page.getByRole('button', { name: 'full te da envío gratis En' });
        await switchFullEnvios.click();
    });

    test('Validate that Condition Filter works', async ({ page }) => {
        const conditionNew = await page.getByLabel('Nuevo, 171 resultados');
        await conditionNew.click();
        const closeConditionNew = await page.getByLabel('Quitar el filtro de Condición');
        await closeConditionNew.click();
    });




    // test('Validate that the order filter by price works', async ({ page }) => {
    //     const searchBar = page.getByPlaceholder('Buscar productos, marcas y más');
    //     await searchBar.type('Playstation 5');
    //     await page.keyboard.press('Enter');
    //     const sortButton = page.locator('div').filter({ hasText: /^Más relevantesMás relevantes$/ }).first()
    //     await sortButton.click();
    //     const priceFilter = page.locator('div').filter({ hasText: /^Mayor precio$/ }).first()
    //     await priceFilter.click();
    // });

//para validar que esten todos los items podria utilizar:
// test('Los items del dropdown son los esperados', async ({ page }) => {
//     await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
//         await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
//     })
//     await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
//         const deportes = ['Fútbol', 'Tennis', 'Basketball']

//         for (let opcion of deportes) {
//             const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
//             if (element) {
//                 console.log(`La opción '${opcion}' está presente.`);
//             } else {
//                 throw new Error(`La opción '${opcion}' no está presente.`);
//             }
//         }

//     })
// })


   
});
