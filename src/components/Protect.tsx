import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthProps } from "../../helpers/types";

interface ProtectProps {
  children: ReactNode;
}

const Protect = ({ children }: ProtectProps) => {
  const { pathname } = useLocation();
  const { currentUser } = useAuth() as AuthProps;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!currentUser);
  useEffect(() => {
    if (!currentUser && !loading) {
      navigate(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, loading, navigate, pathname]);

  useEffect(() => {
    if (currentUser !== null) {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="whole-page-loader">
        <span className="loader"></span>
      </div>
    );
  }

  return <>{children}</>;
};

export default Protect;
