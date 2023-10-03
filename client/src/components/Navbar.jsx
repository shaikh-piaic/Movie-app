import React from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";

const MovieNavbar = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg' className='px-5'>
			<Navbar.Brand href='/'>Movie App</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav>
					<Nav.Link className='mx-2' href='/'>
						Home
					</Nav.Link>
					<Nav.Link className='mx-2' href='/admin/login'>
						Admin
					</Nav.Link>
				</Nav>
				{/* <Form className='d-flex' >
					<Form.Control
						type='search'
						placeholder='Search'
						className='me-2'
						aria-label='Search'
					/>
					<Button variant='outline-success'>Search</Button>
				</Form> */}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default MovieNavbar;
