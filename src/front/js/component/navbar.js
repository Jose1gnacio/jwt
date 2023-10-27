import React, { useContext, useState, useStore } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.currentUser?.user?.email ?
						<Link to="/login">
							<button className="btn btn-primary">Log in</button>
						</Link>
						:
						<button className="btn btn-primary" onClick={()=>{
							actions.logOut()
						}}>Log out</button>					
					}
					
				</div>
			</div>
		</nav>
	);
};
