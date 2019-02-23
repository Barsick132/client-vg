import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Login from './Login'
import Volunteer from './Volunteer'

const FILE = './src/Volunteer/components/App.js';

class App extends React.Component {
    render() {
        const FUNC = 'render()';
        console.log(FILE, FUNC, '\n', 'start');

        return (
            <Switch>
                <Route exact path="/volunteer/login" render={() => <Login {...this.props}/>}/>
                <Route path="/volunteer" render={() => <Volunteer {...this.props}/>}/>
            </Switch>
        );
    }

}

export default App