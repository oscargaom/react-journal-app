import config from "../config";


export const fileUpload = async (file) => {
    
    const url = config.cd_api;
    // console.log(config)
    // console.log(`config.cd_api: ${config.cd_api}`);
    // console.log(`config.cd_upload_preset: ${config.cd_upload_preset}`);

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', config.cd_upload_preset);

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
        return error;
    }
};