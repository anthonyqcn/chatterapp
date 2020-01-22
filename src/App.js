import React, { useState } from 'react';
import './App.css';
import NamePicker from './NamePicker.js';

function App() {
	const [messages, setMessages] = useState([]);

	//console.log(messages);
	return (
		<main>
			<header>
				<img
					className="logo"
					alt="logo"
					src="https://www.freeiconspng.com/uploads/christmas-flake-geometric-hexagon-holiday-line-snow---3.png"
				/>
				Chatter
				<NamePicker />
			</header>

			<div className="messages">
				{messages.map((m, i) => {
					return (
						<div key={i} className="message-wrap">
							<div className="message">{m}</div>
						</div>
					);
				})}
			</div>

			<TextInput
				onSend={text => {
					setMessages([text, ...messages]);
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
