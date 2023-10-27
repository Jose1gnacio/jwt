import React, { useContext, useState, useStore } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  
  return (
    <div className="row md-12 contenedor-register mb-5 mt-5">
      <div className="col-md-9 contenedor-form">
        <form
          className="form-card shadow"
          onSubmit={(e) => actions.submitUserImage(e, navigate)}
        >          
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control mb-2"
            id="inputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingresa tu email"
            required
            name={"email"}
            value={store.email}
            onChange={actions.inputUserValue}
          />
          <div className="row mb-6">
            <div className="col-md-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control mb-2"
                id="password"
                placeholder="Contraseña"
                required
                name={"password"}
                value={store.password}
                onChange={actions.inputUserValue}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Repetir Contraseña
              </label>
              <input
                type="password"
                className="form-control mb-2"
                id="re_password"
                placeholder="Repita contraseña"
                required
                name={"rep_password"}
                value={store.rep_password}
                onChange={actions.inputUserValue}
              />
            </div>
          </div>
          <button
            type="submit"
            className="buttonRegister btn btn-dark  m-2 p-2 px-4"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
