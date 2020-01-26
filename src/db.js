import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

let store;
const coll = 'messages';

function useDB(room) {
	const [messages, setMessages] = useState([]);

	function add(m) {
		setMessages(current => {
			const msgs = [m, ...current];
			msgs.sort((a, b) => b.ts.seconds - a.ts.seconds);
			return msgs;
		});
	}
	function remove(id) {
		setMessages(current => current.filter(m => m.id !== id));
	}

	useEffect(() => {
		store
			.collection(coll)
			.where('room', '==', room)
			.onSnapshot(snap =>
				snap.docChanges().forEach(c => {
					const { doc, type } = c;
					if (type === 'added') add({ ...doc.data(), id: doc.id });
					if (type === 'removed') remove(doc.id);
				})
			);
	}, []);
	return messages;
}

const db = {};
db.send = function(msg) {
	return store.collection(coll).add(msg);
};
db.delete = function(id) {
	return store
		.collection(coll)
		.doc(id)
		.delete();
};

export { db, useDB };

const firebaseConfig = {
	apiKey: 'AIzaSyCsQhLRogvPgF2I3-D3RaEEHEzxWiExnyg',
	authDomain: 'chatter2020-7dc4e.firebaseapp.com',
	databaseURL: 'https://chatter2020-7dc4e.firebaseio.com',
	projectId: 'chatter2020-7dc4e',
	storageBucket: 'chatter2020-7dc4e.appspot.com',
	messagingSenderId: '190797374257',
	appId: '1:190797374257:web:b0a208c2e6f2fd4c844610'
};

firebase.initializeApp(firebaseConfig);
store = firebase.firestore();
