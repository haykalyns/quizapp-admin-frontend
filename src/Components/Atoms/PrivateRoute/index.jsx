import { Navigate } from "react-router-dom";

export default function PrivateOutlet({ pages }) {
  const token = document.cookie.split('; ').find(row => row.startsWith('jwt_token='));
  const isAuthenticated = token ? true : false;
  return isAuthenticated ? pages : <Navigate to="/login" />;
}





