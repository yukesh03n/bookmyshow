import { axiosInstance } from ".";

export const getAllTheatreForAdmin = async () => {
    try {
        const response = await axiosInstance.get("api/theatre/get-all-theatres");
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const getAllTheatre = async (ownerId) => {
    try {
        const response = await axiosInstance.get(`api/theatre/get-all-theatres-by-owner/${ownerId}`);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const addTheatre = async (value) => {
    try {
        const response = await axiosInstance.post("api/theatre/add-theatre", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const updateTheatre = async (value) => {
    try {
        const response = await axiosInstance.put("api/theatre/update-theatre", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const deleteTheatre = async (value) => {
    try {
        const response = await axiosInstance.delete(`api/theatre/delete-theatre/${value}`);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};
