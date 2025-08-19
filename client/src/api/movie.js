import { axiosInstance } from ".";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("api/movies/get-all-movies");
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const addMovie = async (value) => {
    try {
        const response = await axiosInstance.post("api/movies/add-movie", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const updateMovie = async (value) => {
    try {
        const response = await axiosInstance.put("api/movies/update-movie", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const deleteMovie = async (value) => {
    try {
        const response = await axiosInstance.put("api/movies/delete-movie", value);
        return response.data;
    } catch (e) {
        return e?.response?.data;
    }
};

export const getMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/movie/${id}`);
        return response.data;
    } catch (err) {
        return err.response;
    }
};
