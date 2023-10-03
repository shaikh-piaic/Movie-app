import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Movies() {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedGenre, setSelectedGenre] = useState("All");
	const [minRating, setMinRating] = useState(0);

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
		// console.log(genres);
		// console.log(movies);
	}, [movies, genres]);

	const filterMovies = () => {
		return movies?.filter(
			(movie) =>
				(selectedGenre === "All" || movie.genre === selectedGenre) &&
				movie.title.toLowerCase().includes(search.toLowerCase()) &&
				movie.rating >= minRating
		);
	};

	const renderMovies = filterMovies()?.map((movie) => (
		<Col key={movie._id} sm={12} md={6} lg={3}>
			<Card style={{ margin: "10px", width: "200px" }}>
				<Card.Img variant='top' src={movie.image} height={250} width={200} />
				<Card.Body>
					<Card.Title>{movie.title}</Card.Title>
					<Card.Text>
						Genre: {movie.genre}
						<br />
						Rating: {movie.rating}
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	));

	return (
		<div className='px-5 mt-5'>
			<Form>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Search for a movie'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Form.Group>
				<Row className='mt-3'>
					<Col>
						<Form.Group>
							<Form.Label>Filter by Genre:</Form.Label>
							<Form.Control
								as='select'
								value={selectedGenre}
								onChange={(e) => setSelectedGenre(e.target.value)}>
								<option value='All'>All</option>
								{genres?.map((genre) => (
									<option key={genre._id} value={genre.title}>
										{genre.title}
									</option>
								))}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Minimum Rating:</Form.Label>
							<Form.Control
								type='number'
								min='0'
								max='10'
								step='0.1'
								value={minRating}
								onChange={(e) => setMinRating(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row>{renderMovies}</Row>
		</div>
	);
}

export default Movies;
