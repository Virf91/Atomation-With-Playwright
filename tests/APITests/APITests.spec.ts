import {test, expect} from '@playwright/test';

const REPO = 'Atomation-With-Playwright';
const USER = 'Virf91';

test('Validar que se puede crear un Issue en el repositorio de Github', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`,
    {
        data: {
            title: '[Bug] reporte N°1',
            body: 'Breve descripción del problema',
        },
    });

    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] reporte N°1',
        body: 'Breve descripción del problema',
    }));
});
