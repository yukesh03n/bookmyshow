import { axioxInstance } from ".";

export const getAllMovies = async () => {
    try {
        const response = await axioxInstance.get("api/movies/get-all-movies");
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const addMovie = async (value) => {
    try {
        const response = await axioxInstance.post("api/movies/add-movie", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const updateMovie = async (value) => {
    try {
        const response = await axioxInstance.put("api/movies/update-movie", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const deleteMovie = async (value) => {
    try {
        const response = await axioxInstance.put("api/movies/delete-movie", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};
