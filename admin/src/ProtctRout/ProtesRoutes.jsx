import { useNavigate } from "react-router-dom";
import { UserInfo } from "../hooks/Auth/useLogin";
import { useEffect } from "react";

function ProtesRoutes({ children }) {
  const { User } = UserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!User && User?.isAdmin === false && User?.isVerify === false) {
      navigate("/login");
    }
  }, [User, navigate]);

  if (!User && User?.isAdmin === false && User?.isVerify === false) {
    return navigate("/login");
  }

  return children;
}

export default ProtesRoutes;
