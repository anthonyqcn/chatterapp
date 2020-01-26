import React, { useState, useRef, useEffect } from 'react';
import './namePicker.css';
import { MdEdit } from 'react-icons/md';
import { MdSave } from 'react-icons/md';

function NamePicker(props) {
	const [name, setName] = useState('');
	const [showName, setShowName] = useState(false);
	//const [editName, setEditName] = useState(false);
	const inputEl = useRef(null);

	function save() {
		inputEl.current.focus();
		if (name) {
			props.onSave(name);
			localStorage.setItem('name', name);
		}
		setShowName(!showName);
	}

	useEffect(() => {
		const n = localStorage.getItem('name', name);
		if (n) {
			setName(n);
			props.onSave(name);
		}
	}, []);

	return (
		<div className="edit-username">
			<input
				value={name}
				ref={inputEl}
				placeholder="Put your name here"
				className="name-input"
				onChange={e => setName(e.target.value)}
				style={{ display: showName ? 'none' : 'flex' }}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						save();
					}
				}}
			/>

			{showName && <div>{name}</div>}
			<button onClick={save} className="name-button">
				{showName ? <MdEdit /> : <MdSave />}
			</button>
		</div>
	);
}

export default NamePicker;
