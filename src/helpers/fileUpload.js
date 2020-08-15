import config from "../config";


export const fileUpload = async (file) => {
    
    const url = config.CD_API;
    // console.log(config)
    // console.log(`config.CD_API: ${config.CD_API}`);
    // console.log(`config.CD_UPLOAD_PRESET: ${config.CD_UPLOAD_PRESET}`);

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', config.CD_UPLOAD_PRESET);

    try {

        const resp = await fetch(url, {
            method: 'POST',
            body: formData
        });

        // console.log(resp);

        if (resp.ok) {
            const urlResp = await resp.json();
            // console.log(urlResp);
            return urlResp.secure_url;
        }
        else {
            throw await resp.json();
        }

    } catch (error) {
        return "Error al cargar el archivo";
    }
};