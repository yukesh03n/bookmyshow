import { axioxInstance } from ".";

export const RegisterUser = async (value) => {
    try {
        const response = await axioxInstance.post("api/users/register", value);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const LoginUser = async (value) => {
    try {
        const response = await axioxInstance.post("api/users/login", value);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const GetCurrentUser = async () => {
    try {
        const response = await axioxInstance.get("api/users/get-current-user");
        return response.data;
    } catch (e) {
        console.log(e);
        return e?.response?.data;
    }
};