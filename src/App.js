import React, { useState, useEffect } from 'react';
import './App.css';
import { db, useDB } from './db.js';
import NamePicker from './namePicker.js';
import { Browser, Route, BrowserRouter } from 'react-router-dom';
import Camera from 'react-snap-pic';
import TextInput from './textinput.js';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// function takePicture(img) {
// 	console.log(img);
// 	return setShowCamera(false);
// }

function App() {
	useEffect(() => {
		const { pathname } = window.location;
		if (pathname.length < 2) window.location.pathname = 'home';
	}, []);
	return (
		<BrowserRouter>
			<Route path="/:room" component={Room} />
		</BrowserRouter>
	);
}

function Room(props) {
	const { room } = props.match.params;
	const messages = useDB(room);
	const [name, setName] = useState('');
	const [showCamera, setShowCamera] = useState(false);
	function takePicture(img) {
		setShowCamera(false);
		return console.log(img);
	}

	return (
		<main>
			{showCamera && <Camera takePicture={takePicture} />}
			<header>
				<div>
					<img
						className="logo"
						alt="logo"
						src="https://www.freeiconspng.com/uploads/christmas-flake-geometric-hexagon-holiday-line-snow---3.png"
					/>
					Chatter
				</div>
				<NamePicker onSave={setName} />
			</header>

			<div className="messages">
				{messages.map((m, i) => {
					return (
						<div
							key={i}
							className="message-wrap"
							from={m.name === name ? 'me' : 'you'}
						>
							<div className="message">
								<div className="msg-name">{m.name}</div>
								<div className="msg-text">{m.text}</div>
							</div>
						</div>
					);
				})}
			</div>

			<TextInput
				onSend={text => {
					db.send({
						text,
						name,
						ts: new Date(),
						room
					});
				}}
				showCamera={() => setShowCamera(true)}
			/>
		</main>
	);
}

export default App;
