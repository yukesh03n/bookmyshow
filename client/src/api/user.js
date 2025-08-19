import { axiosInstance } from ".";

export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("api/users/get-current-user");
        return response.data;
    } catch (e) {
        console.log(e);
        return e?.response?.data;
    }
};

export const ForgetPassword = async (value) => {
    try {
        const response = await axiosInstance.patch(
            "api/users/forgetpassword",
            value
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const ResetPassword = async (value, id) => {
    try {
        const response = await axiosInstance.patch(
            `/api/users/resetpassword/${id}`,
            value
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};