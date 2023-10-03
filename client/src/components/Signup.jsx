import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import "./Signup.css";
function Signup() {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	// const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:1000/api/users/signup",
				formData
			);

			if (response.data.success) {
				setSuccess(true);
			} else {
				setError("Registration failed. Please try again.");
			}
		} catch (error) {
			setError(
				"An error occurred during registration. Please try again later."
			);
		}
	};

	return (
		<Container fluid className='signup-container mt-5 px-5'>
			<Row className='justify-content-center align-items-center full-height'>
				<Col className='signup-form-container'>
					<Form className='signup-form' onSubmit={handleSubmit}>
						<h2 className='text-center'>Signup</h2>
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
						<Button variant='primary' type='submit' className='signup-button'>
							Signup
						</Button>
					</Form>
					{error && <Alert variant='danger'>{error}</Alert>}
					{success && (
						<Alert variant='success'>
							Registration successful. <a href='/login'>Login</a>
						</Alert>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default Signup;
