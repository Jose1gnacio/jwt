import React, { useContext, useState, useStore } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {store.token && store.token !== "" && store.token !== undefined ? (
        "Estás logeado" + store.token
      ) : (
		<>
		<div className="text-center mt-5">
          <input
            type="email"
            placeholder="email"
            value={store.email}
			name="email"
            onChange={(e) => actions.inputLogin(e)}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={store.password}
			name="password"
            onChange={(e) => actions.inputLogin(e)}
          ></input>
          <button onClick={(e) => {
              e.preventDefault();
              actions.Login(e, navigate);
            }}>Login</button>
        </div>
		<Link to="/register" className="text-decoration-underline">
                ¿ Registrarse ?
              </Link>
		</>
        
      )}

      <div></div>
    </div>
  );
};
