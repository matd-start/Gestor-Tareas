import { useEffect, useState } from "react";
import { registerRequets, loginRequest, verifyTokenRequest } from "../api/authAxios";
import { AuthContext} from "./CreateContext";
import Cookies from "js-cookie";
import PropTypes from "prop-types"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequets(user);
            if (res.status === 200) {
            setUser(res.data);
            setIsAuthenticated(true);
            }
            
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    };

const signin = async (user) => {
    try {
        const res = await loginRequest(user);
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([]);
    } catch (error) {
        const data = error.response?.data;

        const errorList = Array.isArray(data) ? data : [data?.message || data || "Error inesperado"];

        setErrors(errorList);
        console.error("Error al iniciar sesión:", errorList);
    }
};

const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
}


    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signup,
            signin,
            logout,
            loading,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}