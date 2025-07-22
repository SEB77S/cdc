// src/hooks/useAutoLogin.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { getToken } from "../api/initialConfigService";

const useAutoLogin = () => {
  const location = useLocation();
  const { userId, setAuth } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("user_id");

    if (idFromUrl && parseInt(idFromUrl) !== userId) {
      const fetchToken = async () => {
        try {
          const response = await getToken({ user_id: parseInt(idFromUrl) });
          const accessToken = response.data.access_token;

          setAuth({
            token: accessToken,
            userId: parseInt(idFromUrl),
          });

          console.log("✅ Token obtenido:", accessToken);
        } catch (err) {
          console.error("❌ Error al hacer login automático:", err);
        }
      };

      fetchToken();
    }
  }, [location.search]);
};

export default useAutoLogin;
