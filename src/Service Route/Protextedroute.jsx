import React from "react";
import { Navigate } from "react-router-dom";

const Protectedroute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <>{children}</>;
  } else {
    return (
      <>
        {alert("First LOG IN")}
        <Navigate to={"/login"} />
      </>
    );
  }
};

export default Protectedroute;
