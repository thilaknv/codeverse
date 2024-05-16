import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthProps } from "../../helpers/types";

interface ProtectProps {
  children: ReactNode;
}

const Protect = ({ children }: ProtectProps) => {
  const { pathname } = useLocation();
  const { USER } = useAuth() as AuthProps;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!USER);
  useEffect(() => {
    if (!USER && !loading) {
      navigate(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [USER, loading, navigate, pathname]);

  useEffect(() => {
    USER != null && setLoading(false);
  }, [USER]);

  setTimeout(() => setLoading(false), 5000);

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
