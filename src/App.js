import React, { useState, useEffect } from 'react';
import './App.css';
import { db, useDB } from './db.js';
import NamePicker from './namePicker.js';
import { Browser, Route, BrowserRouter } from 'react-router-dom';

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
	//console.log(messages);

	return (
		<main>
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
			/>
		</main>
	);
}

function TextInput(props) {
	var [text, setText] = useState('');
	// normal js comment
	return (
		<div className="text-input-wrap">
			<input
				value={text}
				className="text-input"
				placeholder="Type your message here"
				onChange={e => setText(e.target.value)}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						if (text) props.onSend(text);
						setText('');
					}
				}}
			/>
			<button
				onClick={() => {
					if (text) props.onSend(text);
					setText('');
				}}
				className="button"
				disabled={!text}
			>
				SEND
			</button>
		</div>
	);
}

export default App;
