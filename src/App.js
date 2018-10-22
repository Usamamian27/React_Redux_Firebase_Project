import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import AppNavbar from './components/layout/AppNavbar';
import DashBoard from './components/layout/Dashboard';
import AddClients from './components/clients/AddClients';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import Login   from './components/auth/Login';




import { UserIsAuthenticated , UserIsNotAuthenticated} from './helpers/auth';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (

        <Provider store ={store}>
          <Router>
            <div className="App">
            <AppNavbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={UserIsAuthenticated(DashBoard)}>

                        </Route>
                        <Route exact path="/clients/add" component={UserIsAuthenticated(AddClients)}>

                        </Route>
                        <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)}>

                        </Route>
                        <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)}></Route>

                        <Route exact path="/login" component={UserIsNotAuthenticated(Login)}></Route>
                    </Switch>
                </div>

          </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
