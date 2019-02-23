import React from 'react'
import {storageKeys as CONST} from "../../constants";
import {Redirect} from 'react-router-dom';
import NotFoundVol from "./NotFoundVol";
import Requests from './Requests'
import Reg from './Reg'
import {Route, Switch} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../content/favicon.png'
import {vol_pages} from '../constants'

const FILE = './src/Volunteer/components/Volunteer.js';

class Volunteer extends React.Component {

    render() {
        const FUNC = 'render()';
        console.log(FILE, FUNC, '\n', 'start');

        const token = localStorage.getItem(CONST.TOKEN) || sessionStorage.getItem(CONST.TOKEN);
        if (token === null) return <Redirect to="/volunteer/login"/>;
        const vol_admin = localStorage.getItem(CONST.VOL_ADMIN) || sessionStorage.getItem(CONST.VOL_ADMIN);

        return (
            <div className="h-100">
                <Navbar bg="primary" variant="dark" expand="md" sticky="top">
                    <Navbar.Brand href="/volunteer/request">
                        <img
                            alt="LOGO"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" activeKey={this.props.activePage}
                             onSelect={k => this.handleSelect(k)}>
                            <Nav.Link eventKey={vol_pages.REQUEST} href="/volunteer/request"
                                      className="ml-auto">Заявки</Nav.Link>
                            {vol_admin === "true" && <Nav.Link eventKey={vol_pages.REG} href="/volunteer/reg"
                                                               className="ml-auto">Регистрация</Nav.Link>}
                        </Nav>
                        <Nav className="ml-md-auto">
                            <Nav.Link className="font-weight-bold ml-auto"
                                      onClick={() => this.props.signOut()}>
                                Выход
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact path="/volunteer/request" render={() => <Requests {...this.props}/>}/>
                    {vol_admin === "true" && <Route exact path="/volunteer/reg" render={() => <Reg {...this.props}/>}/>}
                    <Redirect exact from="/volunteer" to="/volunteer/request"/>
                    <Route render={() => <NotFoundVol {...this.props}/>}/>
                </Switch>
            </div>
        );
    }
}

export default Volunteer;