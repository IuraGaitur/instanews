import * as React from 'react';
import {BrowserRouter as AppRouter, Route, Switch} from 'react-router-dom';
import {default as MainPage} from './../main/main'
import {default as TestPage} from './../test/test'

class Router extends React.Component {
    public render() {
        return (
            <AppRouter>
                <Switch>
                    <Route exact={true} path="/" component={MainPage}/>
                    <Route exact={true} path="/test" component={TestPage}/>
                </Switch>
            </AppRouter>
        );
    }
}

export default Router;