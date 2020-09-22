import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

interface Game {
	developer: String;
	game_name: String;
	genre: String;
	id: Number;
	img_url: String;
	meta_score: Number;
	platforms: String;
	rating: String;
	release_year: Number;
	summary: String;
	__createdtime: Number;
	__updatedtime__: Number;
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
			<div>
				{loading === false ? (
					<div>Loading...</div>
				) : (
					<div>
						{gameData.map((game) => (
							<div key={String(game.id)}>{game.id}</div>
						))}
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default App;
