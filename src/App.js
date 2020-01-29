import React, { useState, useEffect } from 'react';
import './App.css';
import { db, useDB } from './db.js';
import NamePicker from './namePicker.js';
import { Browser, Route, BrowserRouter } from 'react-router-dom';
import Camera from 'react-snap-pic';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { MdSend, MdCamera } from 'react-icons/md';

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
	async function takePicture(img) {
		setShowCamera(false);
		const imgID = Math.random()
			.toString(36)
			.substring(7);
		var storageRef = firebase.storage().ref();
		var ref = storageRef.child(imgID + '.jpg');
		await ref.putString(img, 'data_url');
		db.send({ img: imgID, name, ts: new Date(), room });
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
				{messages.map((m, i) => (
					<Message key={i} m={m} name={name} />
				))}
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

const bucket =
	'https://firebasestorage.googleapis.com/v0/b/chatter2020-7dc4e.appspot.com/o/';
const suffix = '.jpg?alt=media';

function TextInput(props) {
	var [text, setText] = useState('');
	return (
		<div className="text-input-wrap">
			<button
				onClick={props.showCamera}
				style={{ position: 'absolute', left: 2, top: 10 }}
			>
				<MdCamera style={{ height: 15, width: 15 }} />
			</button>
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
				<MdSend style={{ height: 15, width: 15 }} />
			</button>
		</div>
	);
}

function Message({ m, name }) {
	return (
		<div className="message-wrap" from={m.name === name ? 'me' : 'you'}>
			<div className="message">
				<div className="msg-name">{m.name}</div>
				<div className="msg-text">
					{m.text}
					{m.img && <img src={bucket + m.img + suffix} alt="pic" />}
				</div>
			</div>
		</div>
	);
}

export default App;
