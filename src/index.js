import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Prototype from './prototype/Prototype';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Prototype />,
	document.getElementById("root"),
);
registerServiceWorker();
