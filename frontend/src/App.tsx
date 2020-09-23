import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

interface Game {
	developer: string;
	game_name: string;
	genre: string;
	id: number;
	img_url: string;
	meta_score: number;
	platforms: string;
	rating: string;
	release_year: number;
	summary: string;
	__createdtime: number;
	__updatedtime__: number;
}

const App: React.FC = () => {
	useEffect(() => {
		getAPI();
	}, []);

	const getAPI = () => {
		const API = 'http://127.0.0.1:5000/';

		fetch(API)
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((apiData) => {
				console.log(apiData);

				setLoading(true);
				setGameData(apiData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let [loading, setLoading] = useState<boolean>(true);
	let [gameData, setGameData] = useState<Game[]>([]);

	return (
		<Fragment>
			<header>
				<h1>Meta Game Reviews</h1>
			</header>
			<main>
				{loading === false ? (
					<div>
						<h1>Loading...</h1>
					</div>
				) : (
					<section>
						{gameData.map((game) => {
							let metaColor = 'low';

							if (game.meta_score >= 70) {
								metaColor = 'high';
							} else if (game.meta_score <= 69 && game.meta_score >= 49) {
								metaColor = 'medium';
							} else {
								metaColor = 'low';
							}

							return (
								<div className="game-container" key={String(game.id)}>
									<h1>{game.game_name}</h1>
									<p>
										<strong>Developer:</strong> {game.developer}
									</p>
									<p>
										<strong>Genre:</strong> {game.genre}
									</p>
									<img src={game.img_url} alt={game.game_name} />

									<p>
										<strong>Meta Score:</strong> <span className={metaColor}>{game.meta_score}</span>
									</p>
									<p>
										<strong>Available on:</strong> {game.platforms}
									</p>
									<p>
										<strong>Rating:</strong> {game.rating}
									</p>
									<p>
										<strong>Release Year:</strong> {game.release_year}
									</p>
									<p>{game.summary}</p>
								</div>
							);
						})}
					</section>
				)}
			</main>
		</Fragment>
	);
};

export default App;
