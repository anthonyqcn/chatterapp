import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './db.js';
import NamePicker from './namePicker.js';

function App() {
	const [messages, setMessages] = useState([]);
	const [name, setName] = useState('');
	//console.log(messages);

	useEffect(() => {
		//use to have your app run some code only one time
		db.listen({
			// any time a message is added
			receive: m => {
				setMessages(current => [m, ...current]); // use set messages function, but this time use alt syntax to pass in a function with current state
			}
		});
	}, []);

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
						<div key={i} className="message-wrap">
							{/*<div className="username"><{}</div>*/}
							<div className="message">{m.text}</div>
						</div>
					);
				})}
			</div>

			<TextInput
				onSend={text => {
					db.send({
						text,
						name,
						ts: new Date()
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
