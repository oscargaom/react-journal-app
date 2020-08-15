import '@testing-library/jest-dom'
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';
import config from '../../config';

cloudinary.config({
    cloud_name: config.CD_CNAME,
    api_key: config.CD_API_KEY,
    api_secret: config.CD_API_SECRET
});

describe('Pruebas del helper fileUpload', () => {

    test('debe el api cargar un archivo y retornar la url en donde se deposito la imagen', async (done) => {

        const resp = await fetch('https://static3.depositphotos.com/1002290/164/i/450/depositphotos_1645221-stock-photo-escorpion-surrounded-by-fire-on.jpg');

        const imgBlob = await resp.blob();

        const file = new File([imgBlob], 'imgtest.jpg');

        const respUpload = await fileUpload(file);

        const urlSegments = respUpload.split('/');

        const fileId = urlSegments[urlSegments.length - 1];

        const fileIdSegments= fileId.split('.');

        cloudinary.v2.api.delete_resources(fileIdSegments[0], {}, (error, result) => {
            // console.log(error);
            // console.log(result);
            done(); 
        });

        expect(respUpload).toContain('https://res.cloudinary.com/');
    });


    // test('debe el api responder un error al intentar cargar un archivo vacío', async () => {
    //     const file = new File([], 'emptyImg.jpg');

    //     const resp = await fileUpload(file);

    //     expect(resp).toBe('Error al cargar el archivo');
    // })

});
