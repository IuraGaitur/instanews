import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Router from './router/router';

ReactDOM.render(
    <Router />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
