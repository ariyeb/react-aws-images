import Axios from "axios";

const url = "http://localhost:3030/";

export const sendImage = async (formData) => {
    try {
        const result = await Axios.post(url + "upload-image", formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });

        return result.data;
    } catch (err) {
        console.log(err);
    }
};

export const getIamgesData = async () => {
    try {
        const result = await Axios.get(url + "images");
        return result.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteImage = async (location, _id) => {
    try {
        await Axios.delete(url + "delete-image", {
            data: {
                key: location,
                _id
            }
        });
        return;
    } catch (err) {
        console.log(err);
    }
};