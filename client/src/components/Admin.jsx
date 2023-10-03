import React from "react";
import { Link, Outlet, Route, Switch, redirect } from "react-router-dom";
import Login from "./Login";
import { Button } from "react-bootstrap";
// import Login from "./Login";
// import Signup from "./Signup";

function Admin() {
	// redirect("/admin/login");
	return (
		<div className='admin-container px-5'>
			<h1 className='text-center my-3'>Welcome to the Admin Page</h1>
			<div className='admin-content my-5'>
				<Outlet />
			</div>
		</div>
	);
}

export default Admin;
