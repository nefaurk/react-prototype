import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editor from './editor/Editor';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Editor />,
	document.getElementById("root"),
);
registerServiceWorker();
