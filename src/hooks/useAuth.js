import { useEffect } from "react";
import { getToken } from "../api/initialConfigService";


export const useAuth = (module) => {
    useEffect(() => {
        const login = async (user) => {
            try {
                const response = await getToken(user);
                localStorage.setItem("access_token", response.data.access_token);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };

        login({ user_id: parseInt(String(module.user_id)) });
    }, [module]);
};
