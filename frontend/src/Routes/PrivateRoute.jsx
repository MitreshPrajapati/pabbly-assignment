import React from "react";
import { Route, Redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const PrivateRoute = ({children}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if( !isAuthenticated){
    return navigate('/');
  }
  return children;
};

export default PrivateRoute;
