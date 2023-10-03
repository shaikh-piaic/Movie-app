import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Modal,
	Form,
	Dropdown,
} from "react-bootstrap";
import "./Dashboard.css";
import axios from "axios";

function Dashboard() {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [showAddMovieModal, setShowAddMovieModal] = useState(false);
	const [showAddGenreModal, setShowAddGenreModal] = useState(false);
	const [newMovie, setNewMovie] = useState({
		title: "",
		genre: "",
		rating: 0.0,
		runtime: 0,
		description: "",
		image: "",
	});
	const [newGenre, setNewGenre] = useState({
		title: "",
	});

	useEffect(() => {
		// Fetch movies from the /api/movies endpoint
		axios.get("http://localhost:1000/api/movies").then((response) => {
			// console.log(response.data.movies);
			setMovies(response.data.movies);
		});

		// Fetch genres from the /api/genres endpoint
		axios.get("http://localhost:1000/api/genres").then((response) => {
			// console.log(response.data.genre);
			setGenres(response.data.genre);
		});
	}, []);

	const handleAddMovie = () => {
		// Prepare the data to send to the server
		const movieData = {
			title: newMovie.title,
			genre: newMovie.genre,
			rating: newMovie.rating,
			runtime: newMovie.runtime,
			description: newMovie.description,
			image: newMovie.image,
		};

		// Make a POST request to your API endpoint
		axios
			.post("http://localhost:1000/api/movies/addmovie", movieData)
			.then((response) => {
				console.log("Movie added successfully:", response.data);

				// Close the modal and clear the 'newMovie' state
				setShowAddMovieModal(false);
				setNewMovie({
					title: "",
					genre: "",
					rating: 0.0,
					runtime: 0,
					description: "",
					image: "",
				});
			})
			.catch((error) => {
				// Handle any errors that occurred during the POST request
				console.error("Error adding movie:", error);
			});
		window.location.reload();
	};

	const handleAddGenre = () => {
		// Prepare the data to send to the server
		const genreData = {
			title: newGenre.title,
		};

		// Make a POST request to your API endpoint
		axios
			.post("http://localhost:1000/api/genres/addgenre", genreData)
			.then((response) => {
				console.log("Genre added successfully:", response.data);

				// Close the modal and clear the 'newMovie' state
				setShowAddGenreModal(false);
				setNewGenre({
					title: "",
				});
			})
			.catch((error) => {
				// Handle any errors that occurred during the POST request
				console.error("Error adding genre:", error);
			});
		window.location.reload();
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/admin/login";
	};
	const handleDel = (id) => {
		axios.delete(`http://localhost:1000/api/movies/${id}`).then((response) => {
			console.log("Movie deleted successfully:", response.data);
		});
		window.location.reload();
	};

	return (
		<Container fluid>
			<Row>
				<Col md={3} lg={2} className='dashboard-sidebar'>
					<div className='button-container'>
						{/* Buttons for Add Genre, Add Movie, and Logout */}
						<Button
							variant='primary'
							onClick={() => setShowAddGenreModal(true)}>
							Add Genre
						</Button>
						<Button
							variant='success'
							onClick={() => setShowAddMovieModal(true)}>
							Add Movie
						</Button>
						<Button variant='danger' onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</Col>
				<Col md={9} lg={10}>
					{/* Movie Table */}
					<div className='table-container'>
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>Title</th>
									<th>Genre</th>
									<th>Rating</th>
									<th>Runtime</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{movies.map((movie, index) => (
									<tr key={index}>
										<td>{movie.title}</td>
										<td>{movie.genre}</td>
										<td>{movie.rating}/10.0</td>
										<td>{movie.runtime} minutes</td>
										<td>
											<Button
												variant='danger'
												onClick={() => handleDel(movie._id)}>
												Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>

			{/* Add Movie Modal */}
			<Modal
				show={showAddMovieModal}
				onHide={() => setShowAddMovieModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Movie</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								value={newMovie.title}
								onChange={(e) =>
									setNewMovie({ ...newMovie, title: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group controlId='genre'>
							<Form.Label>Genre</Form.Label>
							<Dropdown>
								<Dropdown.Toggle variant='light'>
									{newMovie.genre || "Select Genre"}
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{genres?.map((genre, index) => (
										<Dropdown.Item
											key={index}
											onClick={() =>
												setNewMovie({ ...newMovie, genre: genre.title })
											}>
											{genre.title}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</Form.Group>
						<Form.Group controlId='rating'>
							<Form.Label>Rating</Form.Label>
							<Form.Control
								type='number'
								max={10}
								min={1}
								step={0.1}
								value={newMovie.rating}
								onChange={(e) =>
									setNewMovie({ ...newMovie, rating: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group controlId='runtime'>
							<Form.Label>Runtime</Form.Label>
							<Form.Control
								type='number'
								min={1}
								value={newMovie.runtime}
								onChange={(e) =>
									setNewMovie({ ...newMovie, runtime: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								value={newMovie.description}
								onChange={(e) =>
									setNewMovie({ ...newMovie, description: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image Url</Form.Label>
							<Form.Control
								type='text'
								value={newMovie.image}
								onChange={(e) =>
									setNewMovie({ ...newMovie, image: e.target.value })
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => setShowAddMovieModal(false)}>
						Close
					</Button>
					<Button variant='primary' onClick={handleAddMovie}>
						Add Movie
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Add Genre Modal */}
			<Modal
				show={showAddGenreModal}
				onHide={() => setShowAddGenreModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Genre</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								value={newGenre.title}
								onChange={(e) =>
									setNewGenre({ ...newGenre, title: e.target.value })
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => setShowAddGenreModal(false)}>
						Close
					</Button>
					<Button variant='primary' onClick={handleAddGenre}>
						Add Genre
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default Dashboard;
