import { test, Browser, Page, expect } from "@playwright/test";
import { beforeEach } from "node:test";

(async () => {
    let textoDePrueba = 'Hola Mundo desde la pc de Virginia';
    let page: Page;
    let browser: Browser;
    test.describe('Test Sandbox Free Range Testers', () => {
        
        test.beforeEach('Dado que navego a la página de Free Range Testers', async ({ page }) => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            await expect(page).toHaveTitle('Automation Sandbox');
        });

        test('Validar generación de ID dinámico', async ({ page }) => {
            await test.step('Validar generación de ID dinámico', async () => {              
                const botonGenerarID = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await botonGenerarID.click({force: true});
                const idGenerado = await page.locator('#hidden-element').textContent();
                expect(idGenerado).not.toBeNull();    
            });
        });
        // otra forma de probar el id dinámico
        test('Validar generación de ID dinámico opc 2', async ({ page }) => {
            const botonGenerarID = page.getByRole('button', { name: 'Hacé click para generar un ID' });
            await botonGenerarID.click({force: true});
            await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
        });
        test('Validar funcionalidad de checkbox', async ({ page }) => {
            await test.step('Validar checkbox', async () => {
                const checkbox = page.getByLabel('Pizza 🍕');
                await checkbox.check();
                await expect(checkbox).toBeChecked();
                await checkbox.uncheck();
                await expect(checkbox).not.toBeChecked();
            });
        });

        test('Validar que estén los items del checkbox', async ({ page }) => {
            await test.step('Validar totalidad de los items del checkbox', async () => {
                await expect(page.getByLabel('Pizza 🍕')).toBeVisible();
                await expect(page.getByLabel('Hamburguesa 🍔')).toBeVisible();
                await expect(page.getByLabel('Pasta 🍝')).toBeVisible();
                await expect(page.getByLabel('Helado 🍧')).toBeVisible();
                await expect(page.getByLabel('Torta 🍰')).toBeVisible();
            });
        });

        test('Validar Radio Buttons', async ({ page }) => {
            await test.step('Validar Radio Buttons', async () => {
                const radioButton = page.getByLabel('Si');
                await radioButton.check();
                await expect(radioButton).toBeChecked();
            });
        });

        test('Validar entrada de texto', async ({ page }) => {
            await test.step('Validar entrada de texto', async () => {   
                const campoTexto = page.getByPlaceholder('Ingresá texto');
                await expect(campoTexto).toBeEditable();
                await campoTexto.fill(textoDePrueba);
                await expect(campoTexto).toHaveValue(textoDePrueba); // si uso el toHaveText en este caso no funciona
                await campoTexto.clear();
                await expect(campoTexto).toHaveValue('');
                await campoTexto.type(textoDePrueba);
                await expect(campoTexto).toHaveValue(textoDePrueba);
            });
        });

        test('Validar funcionalidad Dropdown deportes', async ({ page }) => {
            await test.step('Validar Dropdown', async () => {
                const dropdown = page.getByLabel('Dropdown');
                await dropdown.selectOption('Fútbol');
                await expect(dropdown).toHaveValue('Fútbol');
            });
        });

        test('Validar elementos de Dropdown deportes', async ({ page }) => {
            await test.step('Validar elementos de Dropdown deportes', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball']
                for (let opc of deportes) {
                    const elemento = await page.$(`select#formBasicSelect > option:text("${opc}")`);
                    if(elemento){
                        console.log(`La opción '${opc}' está presente en la lista`)
                    } else{
                        throw new Error (`La opción '${opc}' no está presente en la lista`)
                    }
                } 
            });
        });

        test('Validar Dropdown dias de la semana', async ({ page }) => {
                const dropdown = page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Viernes' }).click();
        });


        test('Validar Shadow DOM', async ({ page }) => {
            await test.step('Validar Shadow DOM', async () => {
                const shadowHost = page.getByRole('heading', { name: 'Shadow DOM' });
                await expect(shadowHost).toHaveText('Shadow DOM');
                const shadowDomContent = page.getByText('Este es un ejemplo de Shadow');
                await expect(shadowDomContent).toHaveText('Este es un ejemplo de Shadow DOM para practicar automation testing.');
            });
        });


        test('Validar valores de una tabla estática', async ({ page }) => {
            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                const valoresColumnasNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', (elements) => elements.map(elements => elements.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                expect(valoresColumnasNombres).toEqual(nombresEsperados);
            })
            
        })


        test('Validar que los valores cambien en una tabla dinámica', async ({ page }) => {
            await test.step('Puedo validar valores de una tabla dinámica', async () => {
                const valoresColumnasNombres = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', (elements) => elements.map(elements => elements.textContent));
                console.log(valoresColumnasNombres);
                await page.reload();
                const nombresEsperadosPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', (elements) => elements.map(elements => elements.textContent));
                console.log(nombresEsperadosPostReload);
                expect(valoresColumnasNombres).not.toEqual(nombresEsperadosPostReload);
            })
            
        })
    

        test('Validar funcionalidad de soft assertion con datos del checkbox', async ({ page }) => {
            await test.step('Validar totalidad de los items del checkbox', async () => {
                await expect.soft(page.getByLabel('Pizzasfsdgd'), 'No se encontró el elememento Pizza').toBeVisible();
                await expect.soft(page.getByLabel('Hamburguesa 🍔'), 'No se encontró el elememento Hamburguesa').toBeVisible();
                await expect.soft(page.getByLabel('Pasta 🍝'), 'No se encontró el elememento Pasta').toBeVisible();
                await expect.soft(page.getByLabel('Helado 🍧'), 'No se encontró el elemento Helado').toBeVisible();
                await expect.soft(page.getByLabel('Torta 🍰'), 'No se encontró el elemento Torta').toBeVisible();
            });
        })
        
        test('Validar funcionalidad de pop-up', async ({ page }) => {
            await test.step('Cuando hago click en el pop-up', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar un elemento dentro del pop-up', async () => {
                const popUp = page.locator('div').filter({ hasText: 'Popup de ejemplo' }).nth(3)
                await expect(popUp).toBeVisible();
                const textoPopUp = page.getByText('¿Viste? ¡Apareció un Pop-up!')
                await expect(textoPopUp).toBeVisible();
                await page.getByRole('button', { name: 'Cerrar' }).click();

            })
            
            
        })

//-------------------------ANOTATIONS----------------------------------
//skip : saltea el test case
//only : solo ejecuta el test case que tiene ese annotation
//agrupaciones: uso de tags @ para agrupar tests: @Sanbox me servira para correr desde la terminal solo los que tengan ese tag
//En la terminal correr: npx playwright test --grep @Sanbox 
//test('Validar generación de ID dinámico @Sanbox', async ({ page }) => {
//     await test.step('Validar generación de ID dinámico', async () => {              
//         const botonGenerarID = page.getByRole('button', { name: 'Hacé click para generar un ID' });
//         await botonGenerarID.click({force: true});
//         const idGenerado = await page.locator('#hidden-element').textContent();
//         expect(idGenerado).not.toBeNull();    
//     });
// });
//skip condicionales: ejemplo
    test('Validar Radio Buttons skipeado', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Chrome does not support radio buttons');
    await test.step('Validar Radio Buttons', async () => {
        const radioButton = page.getByLabel('Si');
        await radioButton.check();
        await expect(radioButton).toBeChecked();
    });
});  
//Personal annotations
    test('Validar Dropdown dias de la semana con uso de annotations', async ({ page }) => {
        //personal anotations
        test.info().annotations.push({
        type: 'User Story 1234', description: 'El usuario selecciona día de la semana' });
        const dropdown = page.getByRole('button', { name: 'Día de la semana' }).click();
        await page.getByRole('link', { name: 'Viernes' }).click();
});

//Uso del test.fail : para cuando deseo que el resultado sea error y lo considere como pass
    test('Validar valores de una tabla estática usando test.fail', async ({ page }) => {
        test.fail();
        await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
            const valoresColumnasNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', (elements) => elements.map(elements => elements.textContent));
            const nombresEsperados = ['Batistuta', 'Ronaldo', 'Mbappe'];
            expect(valoresColumnasNombres).toEqual(nombresEsperados);
        })
    
})    

// Uso del fixme(es similar al skip): en el caso de que algo no esté implementado todavia y yo quiera saltearlo
    test.fixme('Validar valores de una tabla estática usando fixme', async ({ page }) => {
        await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
            const valoresColumnasNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', (elements) => elements.map(elements => elements.textContent));
            const nombresEsperados = ['Batistuta', 'Ronaldo', 'Mbappe'];
            expect(valoresColumnasNombres).toEqual(nombresEsperados);
        })
})  
// Uso del test.inifo para adjuntar screenshot por ejemplo
test('Validar Dropdown dias de la semana con uso de  de test.info para screenshot', async ({ page }) => {
    test.info().attachments.push({
        name: 'Screenshot',
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'    
    })
    const dropdown = page.getByRole('button', { name: 'Día de la semana' }).click();
    await page.getByRole('link', { name: 'Viernes' }).click();
});
// Repasar comandos para correr tests por proyecto
// npx playwright test --ui me permite correr tests desde la ui que ofrece Playwright
//---------------------------------
//Record y record at cursor se usan para crear teste desde cero navegando 
// y el at cursor empieza desde donde tenes el cursor, por si lo queres usar
// en un test ya creado
//---------------------------------
// MUY ÚTIL!!! npx playwright codegen www.google.com hace que el test se crea y se muestr en tiempo real
});


test.describe('Test elementos web típicos', () => {

    test('Validar carga de files', async ({ page }) => {
        await test.step('Carga de archivos', async () => {
            await page.goto('https://practice-automation.com/file-upload/');
            const selecFile = page.locator('#file-upload')
            await selecFile.click();
            const rutaArchivo = 'C:/Users/virfe/OneDrive/Imágenes/AVATAR.jpg';
            await selecFile.setInputFiles(rutaArchivo);
            const botonUpload = page.getByRole('button', { name: 'Upload' })
            await botonUpload.click();
            const mensajeExito = page.getByLabel('Contact form').getByText('Thank you for your message.')
            await expect(mensajeExito).toBeVisible();
        });
    });

    test('Validar Drag and Drop', async ({ page }) => {
        await page.goto('https://letcode.in/dropable');
        const draggable = page.locator('#draggable');
        const droppable = page.locator('#droppable');
        await draggable.dragTo(droppable);
        const msjSucces = page.getByText('Dropped!')
        await expect(msjSucces).toBeVisible();      
    }); 

    test('Validar prompt', async ({ page }) => {
        await page.goto('https://practice-automation.com/popups/');
        page.on('dialog', async (dialog) => {
        await dialog.accept('Virginia');
        });
        await page.getByRole('button', { name: 'Prompt Popup' }).click();
        await expect(page.getByText('Nice to meet you, Virginia!')).toBeVisible();
    });
})

})();