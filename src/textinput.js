import React, { useState } from 'react';
import { MdSend, MdCamera } from 'react-icons/md';

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

export default TextInput;
