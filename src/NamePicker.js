import React, { useState } from 'react';
import './NamePicker.css';

function NamePicker(props) {
	const [editName, setEditName] = useState(false);
	const [name, setName] = useState('');

	return (
		<div>
			<input
				placeholder="Put your name here"
				className=""
				onChange={e => setName(e.target.value)}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						if (name) props.onSend(name);
						setName('');
					}
				}}
			/>
			<button
				onClick={() => {
					if (name) props.onSend(name);
					setName('');
				}}
				className=""
			>
				Submit
			</button>
		</div>
	);
}

export default NamePicker;
