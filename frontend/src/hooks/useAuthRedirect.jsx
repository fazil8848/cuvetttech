import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuthRedirect = (redirectPath) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("company");
    if (token) {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath]);
};
export default useAuthRedirect;
