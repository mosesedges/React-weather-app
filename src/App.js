import React, { useState } from 'react';
import './App.css';

const App = () => {
	const api = {
		key: '39df5a66c66975433954ebb2cc1e82d1',
		base: 'https://api.openweathermap.org/data/2.5/',
	};

	const [weather, setWeather] = useState({});
	const [query, setQuery] = useState('');

	const search = (e) => {
		if (e.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery('');
				});
		}
	};

	let today = new Date().toDateString();

	return (
		<div
			className={
				typeof weather.main != 'undefined'
					? weather.main.temp < 15
						? 'app'
						: 'app warm'
					: 'app back'
			}
		>
			<main>
				<div className='search-box'>
					<input
						className='search-bar'
						type='text'
						placeholder='search...'
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className='location-box'>
							<div className='location'>
								{weather.name}, {weather.sys.country}
							</div>
							<div className='date'>{today}</div>
						</div>
						<div className='weather-box'>
							<div className='temp'>{Math.round(weather.main.temp)}&deg;C</div>
							<div className='weather'>{weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
};

export default App;
