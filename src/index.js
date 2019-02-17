import React from 'react';
import ReactDOM from 'react-dom';
import Client from './Client/client';
import Volunteer from './Volunteer/volunteer';
import NotFound from './NotFound/notFound';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Client} />
                    <Route path="/volunteer" component={Volunteer} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
