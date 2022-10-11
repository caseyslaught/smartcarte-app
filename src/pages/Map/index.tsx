import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

interface Props {}

const MapPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { token, checkToken } = useAuth();

  useEffect(() => {
    if (!checkToken(token)) navigate("/login", { replace: true });
  }, [token, checkToken, navigate]);

  return <div>Map</div>;
};

export default MapPage;
