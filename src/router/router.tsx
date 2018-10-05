import * as React from 'react';
import {BrowserRouter as AppRouter, Route, Switch} from 'react-router-dom';
import {default as MainPage} from './../main/main'

class Router extends React.Component {
    public render() {
        return (
            <AppRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact={true} path="/" component={MainPage}/>
                </Switch>
            </AppRouter>
        );
    }
}

export default Router;