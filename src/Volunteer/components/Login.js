import React from 'react'
import {Container, Jumbotron, Form, Row, Col, Button} from 'react-bootstrap'
import CustomInput from '../../CustomInput/index'
import {Redirect} from 'react-router-dom';
import {storageKeys as CONST} from '../../constants'

const FILE = './src/Volunteer/components/Login.js';

class Login extends React.Component {

    constructor(props) {
        super(props);
        const FUNC = 'constructor(props)';
        console.log(FILE, FUNC, '\n', 'start');

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const FUNC = 'handleSubmit(e)';
        console.log(FILE, FUNC, '\n', 'start');
        e.preventDefault();

        const re = new RegExp('^form-control (is-valid|is-invalid)$');
        const validLogin = e.target[0].className.replace(re, '$1') === "is-valid";
        const validPass = e.target[1].className.replace(re, '$1') === "is-valid";

        if (validLogin && validPass) {
            this.props.onLogin(e.target[0].value, e.target[1].value, e.target[2].checked);
            return false;
        }
    };

    render() {
        const FUNC = 'render()';
        console.log(FILE, FUNC, '\n', 'start');

        const token = localStorage.getItem(CONST.TOKEN) || sessionStorage.getItem(CONST.TOKEN);
        if (token !== null) return <Redirect to="/volunteer"/>;

        return (
            <Container>
                <Row className="align-items-center justify-content-center vh-100">
                    <Col sm={9} md={7} lg={5}>
                        <Jumbotron className="m-2">
                            <p className="h2">Вход в панель управления</p>
                            {this.props.errorMessage && <p className={"text-danger"}>{this.props.errorMessage}</p>}
                            <Form onSubmit={this.handleSubmit}>
                                <CustomInput label="Логин" type="email" necessarily={true}/>
                                <CustomInput label="Пароль" type="password"
                                             placeholder="Введите пароль" maxLength="100"/>
                                <div className={"custom-control custom-checkbox mb-2"}>
                                    <input type="checkbox" className="custom-control-input"
                                           id="checkRememberMe"
                                           onChange={this.onChangeCheckContactData}/>
                                    <label className="custom-control-label" htmlFor="checkRememberMe">
                                        Запомнить меня
                                    </label>
                                </div>
                                <Button type="submit">Войти</Button>
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;