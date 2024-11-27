import { axioxInstance } from ".";

export const getAllTheatreForAdmin = async () => {
    try {
        const response = await axioxInstance.get("api/theatre/get-all-theatres");
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const getAllTheatre = async (ownerId) => {
    try {
        const response = await axioxInstance.get(`api/theatre/get-all-theatres-by-owner/${ownerId}`);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const addTheatre = async (value) => {
    try {
        const response = await axioxInstance.post("api/theatre/add-theatre", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const updateTheatre = async (value) => {
    try {
        const response = await axioxInstance.put("api/theatre/update-theatre", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const deleteTheatre = async (value) => {
    try {
        const response = await axioxInstance.delete(`api/theatre/delete-theatre/${value}`);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};
