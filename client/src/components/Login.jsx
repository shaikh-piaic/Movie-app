import React, { useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Login.css";
function Login() {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	// const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:1000/api/users/login",
				formData
			);

			if (response.data.token) {
				// Successful login, store the token and redirect to the dashboard
				localStorage.setItem("token", response.data.token);
				window.location.href = "/admin/dashboard";
			} else {
				setError("Invalid credentials. Please try again.");
			}
		} catch (error) {
			setError("An error occurred during login. Please try again later.");
		}
	};

	return (
		<Container fluid className='login-container'>
			<Row className='justify-content-center align-items-center full-height'>
				<Col className='login-form-container'>
					<Form className='login-form' onSubmit={handleSubmit}>
						<h2 className='text-center'>Login</h2>
						<Form.Group controlId='username'>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type='text'
								name='username'
								value={formData.username}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Button variant='primary' type='submit' className='login-button'>
							Login
						</Button>
					</Form>
					{error && <Alert variant='danger'>{error}</Alert>}
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
