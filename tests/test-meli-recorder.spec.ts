import { test, expect } from '@playwright/test';

test('Test using recorder', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.ar/');
  await page.getByPlaceholder('Buscar productos, marcas y má').click();
  await page.getByPlaceholder('Buscar productos, marcas y má').fill('playstation 5');
  await page.getByPlaceholder('Buscar productos, marcas y má').press('Enter');
  await page.getByRole('button', { name: 'Llega mañana' }).click();
  await page.getByLabel('Más relevantes').click();
  await page.getByText('Menor precio').click();
  await page.getByRole('link', { name: 'Sony PlayStation 5 Slim 1TB Standard color blanco' }).click();
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();
});