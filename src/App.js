import React, {Component} from 'react';
import './App.css';
import InputMask from 'react-input-mask';
import {Modal, Button, Image, Form, Col} from 'react-bootstrap';
import {Chat} from './Chat/index.js'
import CONST from './constants'

import textBanner from './content/Текстовка баннера3.png'
import logoLSTU from './content/logo/logo ЛГТУ.png'
import logoLDM from './content/logo/logo ЛДМ.png'
import logoRKN from './content/logo/logo РКН.png'
import logoSLLO from './content/logo/logo СЛЛО.png'
import logoUMVD from './content/logo/logo УМВД.png'
import qot1 from './content/Quotes/Слайд 1.jpg'
import qot2 from './content/Quotes/Слайд 2.jpg'
import qot3 from './content/Quotes/Слайд 3.jpg'
import qot4 from './content/Quotes/Слайд 4.jpg'

import validator from 'validator';

class MaxLengthLabel extends React.Component {

    render() {
        return (
            <small className={"form-text text-muted float-right"}>
                {this.props.currentLength} / {this.props.maxLength}
            </small>
        );
    }
}

// Модальное окно подтверждения
class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedRadio: undefined,
            disabledBtn: false,
            showScreen: "d-none",
            showTextError: "",
            checkedSpeakVol: false
        };

        if (this.props.srcScreen !== undefined) {
            this.state = {...this.state, disabledBtn: true, showScreen: "", showTextError: "d-none"};
        }

        this.onChangeRadioConfirmScreen = this.onChangeRadioConfirmScreen.bind(this);
        this.onChangeCheckConfirmModal = this.onChangeCheckConfirmModal.bind(this);
        this.getCheckScreen = this.getCheckScreen.bind(this);
        this.isSpeakVol = this.isSpeakVol.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.srcScreen !== undefined) {
            this.setState({...this.state, disabledBtn: true, showScreen: "", showTextError: "d-none"});
        } else {
            this.setState({...this.state, disabledBtn: false, showScreen: "d-none", showTextError: ""});
        }
        if (nextProps.show === false) this.setState({
            checkedRadio: undefined,
            disabledBtn: false,
            showScreen: "d-none",
            showTextError: "",
            checkedSpeakVol: false
        })
    }

    getCheckScreen() {
        return this.state.checkedRadio;
    }

    isSpeakVol() {
        return this.state.checkedSpeakVol;
    }

    onChangeRadioConfirmScreen(e) {
        if (e.target.value !== undefined) {
            this.setState({checkedRadio: e.target.value !== "Нет", disabledBtn: false});
        }
    }

    onChangeCheckConfirmModal(e) {
        this.setState({...this.state, checkedSpeakVol: e.target.checked});
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className={this.state.showScreen}>
                            <Image src={this.props.srcScreen} className="mb-2"
                                   fluid/>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridConfirmScreen">
                                    <Form.Label as="legend"><span className="text-danger">*</span>&nbsp;На скриншоте
                                        изображен запрещенный контент?</Form.Label>
                                    <div>
                                        <Form.Check custom
                                                    inline
                                                    type="radio"
                                                    label="Нет"
                                                    value="Нет"
                                                    name="radiosConfirmScreen"
                                                    id="radiosConfirmScreen1"
                                                    onChange={this.onChangeRadioConfirmScreen}/>
                                        <Form.Check custom
                                                    inline
                                                    type="radio"
                                                    label="Да"
                                                    value="Да"
                                                    name="radiosConfirmScreen"
                                                    id="radiosConfirmScreen2"
                                                    onChange={this.onChangeRadioConfirmScreen}/>
                                    </div>
                                    <small className="text-muted">Это поможет нам делать нашу работу чуточку лучше
                                        <span role="img" aria-label="WINKING FACE"> &#128521;</span>
                                    </small>
                                </Form.Group>
                            </Form.Row>
                        </div>
                        <div className={this.state.showTextError + " mb-2"}>К сожалению скриншот сделать не удалось<span
                            role="img" aria-label="CONFUSED FACE"> &#128533;</span>, но мы все равно проверим и
                            обработаем твою заявку!
                        </div>
                        {/* Чекбокс диалога с волонтером */}
                        <div className={"custom-control custom-checkbox"}>
                            <input type="checkbox" className="custom-control-input"
                                   id="checkConfirmModal"
                                   onChange={this.onChangeCheckConfirmModal}/>
                            <label className="custom-control-label" htmlFor="checkConfirmModal">
                                Хочу обсудить данную заявку в чате с Волонтером
                            </label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onClick} disabled={this.state.disabledBtn}>
                        Далее
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

// Модальное окно для ошибок, исключений и короткиох оповещений
class InfoModal extends React.Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}
                   aria-labelledby="contained-modal-title-vcenter" centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class App
    extends Component {

    constructor() {
        super();

        this.state = {
            url: "",
            comment: "",
            checkContactData: false,

            fullName: "",
            email: "",
            phone: "",
            consentContactData: false,

            textButton: "Отправить",
            disabledButton: true
        };


        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeCheckContactData = this.onChangeCheckContactData.bind(this);

        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeConsentContactData = this.onChangeConsentContactData.bind(this);

        this.onClickSend = this.onClickSend.bind(this);

        this.handlerSetRequest = this.handlerSetRequest.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
        this.displayChat = this.displayChat.bind(this);
        this.buttonUpdateUI = this.buttonUpdateUI.bind(this);
    }

    static updateButton(context) {
        if (context.state.loading === true) return;
        if (context.state.url === "" || context.state.validUrl === "is-invalid") {
            context.setState({disabledButton: true});
            return;
        }
        if (context.state.checkContactData) {
            context.setState({disabledButton: true});

            if (!context.state.consentContactData) {
                return;
            }

            if (context.state.fullName === "" && context.state.email === "" && context.state.phone === "") {
                return;
            }

            if (context.state.validEmail === "is-invalid" || context.state.validPhone === "is-invalid") {
                return;
            }

            context.setState({disabledButton: false});

            // Можно отправлять имеющиеся данные на сервер //
        } else {
            context.setState({disabledButton: false});

            // Можно отправлять имеющиеся данные на сервер //
        }
    }

    buttonUpdateUI(loading) {
        if (loading)
            this.setState({
                textButton: <div><span className="spinner-border spinner-border-sm" role="status"
                                       aria-hidden="true"/>&nbsp;Загрузка...</div>,
                disabledButton: true,
                loading: true
            });
        else
            this.setState({
                textButton: "Отправить",
                disabledButton: false,
                loading: false
            });
    }

    onClickSend(e) {
        e.preventDefault();

        this.buttonUpdateUI(true);

        let cli_data = {};
        if (this.state.checkContactData) {
            // С контактными данными
            if (this.state.fullName !== "") cli_data.cli_fullname = this.state.fullName;
            if (this.state.email !== "") cli_data.cli_email = this.state.email;
            if (this.state.phone !== "") cli_data.cli_phone = App.formatPhone(this.state.phone);
        }

        const context = this;

        fetch(CONST.SERVER_HOST + 'getClient', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(cli_data)
        }).then(function (response) {
            if (response.status !== 200) {
                // Сервер вернул не верный статус
                console.log('Failed Request /getClient. Status code: ', response.status);
                context.buttonUpdateUI(false);
                context.displayInfo({
                    header: "Упс!",
                    text: "Не удалось установить соединение с сервером."
                }, true);
            } else {
                // Ответ получен
                response.json()
                    .then((body) => {
                        if (body.status === "OK") {
                            console.log("Client ID: ", body.cli_id);

                            let req_body = {
                                cli_id: body.cli_id,
                                rqt_url: context.state.url,
                                rqt_comment: context.state.comment === "" ? undefined : context.state.comment,
                                dlg_create: context.confirmModal.isSpeakVol(),
                                rqt_imgsource: 'NaN'
                            };

                            // Запрос скриншота
                            context.getScreen(context.state.url)
                                .then((rqt_imgsource) => {
                                    console.log('Successful getting screenshot: ', rqt_imgsource);

                                    req_body.rqt_imgsource = rqt_imgsource;
                                })
                                .catch((err) => {
                                    console.log('Unsuccessful getting screenshot. Error: ', err);
                                })
                                .finally(() => {
                                    context.buttonUpdateUI(false);
                                    context.handlerSetRequest(req_body, context.confirmModal, context.showChat);
                                });
                        } else {
                            // Сервер ответил, но не верно
                            console.log('Server Response Error /getClient');
                            context.buttonUpdateUI(false);
                            context.displayInfo({
                                header: "Упс!",
                                text: "Сервер ответил ошибкой."
                            }, true);
                        }
                    })
                    .catch((err) => {
                        // Не удалось распарсить ответ
                        console.log('Server Response. Parse JSON Error /getClient', err);
                        context.buttonUpdateUI(false);
                        context.displayInfo({
                            header: "Оу!",
                            text: "Не удалось разобрать ответ от сервера."
                        }, true);
                    });
            }
        }).catch(function (error) {
            // Ошибка запроса
            console.log('Error Request /getClient. Error: ', error);
            context.buttonUpdateUI(false);
            context.displayInfo({
                header: "Ого!",
                text: "Произошла ошибка при попытке запроса сервера."
            }, true);
        });
    }

    displayInfo(body, error) {
        if (error) {
            this.setState(
                {
                    headerInfoModal: <span role="img" aria-label="FACE WITH OPEN MOUTH">{body.header}&nbsp;&#128558;
                        </span>,
                    contentInfoModal: <span role="img" aria-label="folded hands">{body.text}&nbsp;Попробуй позднее, если не будет лень&nbsp;&#128591;
                        </span>,
                    showInfoModal: true
                });
        } else {
            this.setState(
                {
                    headerInfoModal: body.header,
                    contentInfoModal: body.text,
                    showInfoModal: true
                });
        }
    }

    getScreen(url) {
        return new Promise((resolve, reject) => {
            fetch(CONST.SERVER_HOST + 'getScreen?URL=' + url, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then((res) => {
                if (res.status !== 200) {
                    reject('Failed Request /getScreen. Status code: ', res.status);
                } else {
                    res.json()
                        .then((body) => {
                            if (body.status === 'OK') {
                                resolve(body.imgsource);
                            } else {
                                reject('Server Response Server Error /getScreen');
                            }
                        })
                        .catch((err) => {
                            reject('Server Response. Parse JSON Error /getScreen', err);
                        });
                }
            }).catch((err) => {
                reject('Error Request /getScreen. Error: ', err);
            });
        });
    }

    displayChat(rqt_id, dlg_id, cli_id) {
        this.setState(
            {
                dataChat: {
                    rqt_id: rqt_id,
                    dlg_id: dlg_id,
                    cli_id: cli_id
                }
            });
    }

    handlerSetRequest(body, confirmModal, showChat) {

        const AppSuccessfullySub = () => {
            this.displayInfo({
                header: <span role="img" aria-label="WINKING FACE">Успех!&nbsp;&#128521;</span>,
                text: <span role="img" aria-label="SMILING FACE WITH OPEN MOUTH">Заявка успешно отправлена! Спасибо тебе за помощь&nbsp;&#128515;</span>
            })
        };

        this.setState({
            showConfirmModal: true,
            onHideConfirmModal: () => this.setState({showConfirmModal: false}),
            onClickConfirmModal: () => {

                /*                                                      *
                *                                                       *
                * Необходимо модернизировать запрос, чтобы информация   *
                * о валидности картинки отправлялась на сервер          *
                *                                                       *
                *                                                       */
                body.dlg_create = confirmModal.isSpeakVol();
                this.setRequest(body)
                    .then((res) => {
                        console.log("Request ID: ", res.rqt_id, " Dialog ID: ", res.dlg_id);

                        // Открываем чат или выходим
                        if (res.dlg_id !== null) {
                            showChat(res.rqt_id, res.dlg_id, body.cli_id, AppSuccessfullySub)
                            //this.displayChat(res.rqt_id, res.dlg_id, body.cli_id);
                        } else {
                            AppSuccessfullySub();
                        }
                    })
                    .catch((err) => {
                        console.log('Unsuccessful /setRequest. Error: ', err);
                        this.displayInfo({
                            header: "Упс!",
                            text: "Отправка заявки завершилась с ошибкой."
                        }, true);
                    })
                    .finally(() => {
                        this.setState({showConfirmModal: false});
                    });
            },
            srcScreen: body.rqt_imgsource !== 'NaN' ? "https://" + body.rqt_imgsource : undefined
        });
    }

    setRequest(body) {
        return new Promise((resolve, reject) => {
            fetch(CONST.SERVER_HOST + 'setRequest', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(body)
            }).then((res) => {
                if (res.status !== 200) {
                    reject('Failed Request /setRequest. Status code: ', res.status);
                } else {
                    res.json()
                        .then((body) => {
                            if (body.status === 'OK') {
                                resolve({
                                    rqt_id: body.rqt_id,
                                    dlg_id: body.dlg_id
                                });
                            } else {
                                reject('Server Response Server Error /setRequest');
                            }
                        })
                        .catch((err) => {
                            reject('Server Response. Parse JSON Error /setRequest', err);
                        });
                }
            }).catch((err) => {
                reject('Error Request /setRequest. Error: ', err);
            });
        });
    }

    onChangeUrl(e) {
        const url = e.target.value;
        this.setState({url: url});

        if (validator.isURL(url)) {
            this.setState({validUrl: "is-valid"}, () => {
                App.updateButton(this);
            });
        } else {
            this.setState({validUrl: "is-invalid"}, () => {
                App.updateButton(this);
            });
        }
    }

    onChangeComment(e) {
        this.setState({comment: e.target.value, validComment: "is-valid"}, () => {
            App.updateButton(this);
        });
    }

    onChangeFullName(e) {
        this.setState({...this.state, fullName: e.target.value, validFullName: "is-valid"}, () => {
            App.updateButton(this);
        });
    }

    onChangeCheckContactData(e) {
        const checkContactData = e.target.checked;
        this.setState({checkContactData: checkContactData}, () => {
            App.updateButton(this);
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;
        this.setState({email: email});

        if (validator.isEmail(email) || email === "") {
            this.setState({validEmail: "is-valid"}, () => {
                App.updateButton(this);
            });
        } else {
            this.setState({validEmail: "is-invalid"}, () => {
                App.updateButton(this);
            });
        }
    }

    static formatPhone(phone) {
        const re = new RegExp('^\\+7 \\((\\d{3})\\) (\\d{3})-(\\d{4})$');
        return phone.replace(re, '$1$2$3');
    }

    onChangePhone(e) {
        const phone = e.target.value;
        const formatPhone = App.formatPhone(phone);
        this.setState({phone: phone});

        if (formatPhone.length === 10 || phone.length === 0) {
            this.setState({validPhone: "is-valid"}, () => {
                App.updateButton(this);
            });
        } else {
            this.setState({validPhone: "is-invalid"}, () => {
                App.updateButton(this);
            });
        }
    }

    onChangeConsentContactData(e) {
        const consentContactData = e.target.checked;
        this.setState({consentContactData: consentContactData}, () => {
            App.updateButton(this);
        });
    }

    render() {

        return (
            // Наметим тут основную разметку страницы,
            // прочие компоненты будут в других файлах
            <div>

                {/* Логотипы */}
                <div className="container" style={{textAlign: 'center'}}>
                    <div className="row align-items-center">
                        <div className="col py-1 py-md-2">
                            <img src={logoLDM} alt="Липецкий дом молодежи" className="img-fluid logo"/>
                        </div>
                        <div className="col py-1 py-md-2">
                            <img src={logoUMVD} alt="УМВД Липецкой области" className="img-fluid logo"/>
                        </div>
                        <div className="col py-1 py-md-2">
                            <img src={logoLSTU} alt="ЛГТУ" className="img-fluid logo"/>
                        </div>
                        <div className="w-100 d-sm-none"/>
                        <div className="col py-1 py-md-2">
                            <img src={logoRKN} alt="Роскомнадзор" className="img-fluid logo"/>
                        </div>
                        <div className="col py-1 py-md-2">
                            <img src={logoSLLO} alt="Совет лидеров Липецкой области" className="img-fluid logo"/>
                        </div>
                    </div>
                </div>

                {/* Баннер */}
                <div className="banner">
                    <img src={textBanner} alt="Текст баннера Голос поколения" className="img-fluid"
                         style={{maxHeight: 500}}/>
                </div>

                {/* Контент */}
                <div className="container my-3">
                    <div className="row mx-1">
                        <div className="col-lg-10 offset-lg-1 card card-body shadow p-3"
                             style={{background: '#FFFFFA'}}>

                            {/* Форма */}
                            <form>

                                {/* Поле ссылки */}
                                <div className="form-group">
                                    <label htmlFor="reference">
                                        <span className="text-danger">*</span>&nbsp;
                                        Ссылка на подозрительный контент
                                    </label>
                                    <input type="url" className={"form-control " + this.state.validUrl} id="reference"
                                           aria-describedby="refHelp"
                                           placeholder="https://reference.example.net"
                                           onChange={this.onChangeUrl} maxLength="2048"/>
                                    <MaxLengthLabel currentLength={this.state.url.length} maxLength="2048"/>
                                    <small id="refHelp" className="form-text text-muted">
                                        Отправь ссылку и сделай мир лучше
                                        <span role="img"
                                              aria-label="GRINNING CAT FACE WITH SMILING EYES">&nbsp;&#128568;</span>
                                    </small>
                                </div>

                                {/* Поле комментария */}
                                <div className="form-group">
                                    <label htmlFor="comment">Комментарий</label>
                                    <textarea className={"form-control " + this.state.validComment} id="comment"
                                              rows="3"
                                              placeholder="Есть что сказать? Скажи!" aria-describedby="commentHelp"
                                              onChange={this.onChangeComment} maxLength="2000"/>
                                    <MaxLengthLabel currentLength={this.state.comment.length} maxLength="2000"/>
                                    <small id="commentHelp" className="form-text text-muted">
                                        Возможно, у тебя есть какая-то важная информация для нас
                                    </small>
                                </div>

                                {/* Чекбокс контактных данных */}
                                <div className={"custom-control custom-checkbox mb-2"}>
                                    <input type="checkbox" className="custom-control-input"
                                           id="checkContactData" data-toggle="collapse"
                                           data-target="#collapsePersonalData"
                                           aria-controls="collapsePersonalData"
                                           onChange={this.onChangeCheckContactData}/>
                                    <label className="custom-control-label" htmlFor="checkContactData">
                                        Хочу, чтобы со мной
                                        потом связались
                                    </label>
                                </div>


                                {/* Дополнительные поля контактных данных */}
                                <div className="collapse" id="collapsePersonalData">
                                    <div className="mb-3 ml-4">

                                        {/* Поле имени */}
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                    <span role="img" className="input-group-text" id="fullName"
                                                          aria-label="SMILING FACE WITH SMILING EYES"
                                                          style={{width: '47px'}}>&#128522;</span>
                                            </div>
                                            <input type="text" className={"form-control " + this.state.validFullName}
                                                   placeholder="Ваня Иванов" aria-label="Полное имя"
                                                   aria-describedby="fullName" onChange={this.onChangeFullName}
                                                   maxLength="200"/>
                                        </div>
                                        <MaxLengthLabel currentLength={this.state.fullName.length}
                                                        maxLength="200"/>
                                        <small id="fullNameHelp" className="form-text text-muted mb-2">
                                            Скажи как к тебе обращаться ^^
                                        </small>

                                        {/* Поле для e-mail */}
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                    <span role="img" className="input-group-text" id="email"
                                                          aria-label="e-mail" style={{width: '47px'}}>&#128231;</span>
                                            </div>
                                            <input type="email" className={"form-control " + this.state.validEmail}
                                                   placeholder="email@example.ru" aria-label="Email"
                                                   aria-describedby="email" onChange={this.onChangeEmail}
                                                   maxLength="200"/>
                                        </div>
                                        <MaxLengthLabel currentLength={this.state.email.length} maxLength="200"/>
                                        <small className="form-text text-muted mb-2">&nbsp;</small>

                                        {/* Поле номера телефона */}
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                    <span role="img" className="input-group-text" id="phone"
                                                          aria-label="MOBILE PHONE" style={{
                                                        width: '47px',
                                                        paddingLeft: '15px',
                                                        textAlign: 'center'
                                                    }}>&#128241;</span>
                                            </div>
                                            <InputMask type="tel" className={"form-control " + this.state.validPhone}
                                                       placeholder="+7 (999) 999-0000" aria-label="Телефон"
                                                       aria-describedby="phone" onChange={this.onChangePhone}
                                                       mask="+7 (999) 999-9999" maskChar=" "/>
                                        </div>

                                        {/* Чекбокс согласия на обработку персональных данных */}
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="consentContactData" onChange={this.onChangeConsentContactData}/>
                                            <label className="custom-control-label" htmlFor="consentContactData">
                                                Я согласен на обработку и хранение моих персональных данных на
                                                территории Европы.
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Кнопка для отправки */}
                                <button type="submit" className="btn btn-warning mb-2" onClick={this.onClickSend}
                                        disabled={this.state.disabledButton}>{this.state.textButton}
                                </button>
                                <small className="form-text text-muted">Символом <div
                                    className="text-danger d-inline">*</div> отмечено обязательное для заполнения
                                    поле. Остальные поля ты можешь не заполнять
                                    <span role="img" aria-label="SMILING FACE WITH SUNGLASSES"> &#128526;</span>
                                </small>

                                {/* Модальное окно для ошибок, исключений и короткиох оповещений */}
                                <InfoModal show={this.state.showInfoModal}
                                           header={this.state.headerInfoModal}
                                           text={this.state.contentInfoModal}
                                           onHide={() => this.setState({showInfoModal: false})}/>

                                <ConfirmModal show={this.state.showConfirmModal}
                                              onHide={this.state.onHideConfirmModal}
                                              onClick={this.state.onClickConfirmModal}
                                              header="Подтверждение" srcScreen={this.state.srcScreen}
                                              onRef={ref => {
                                                  this.confirmModal = ref
                                              }}/>
                            </form>
                        </div>
                    </div>

                    <Chat onRef={ref => {
                        this.showChat = ref
                    }}/>

                    {/* Карусель с цитатами */}
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div id="carouselQuotes" className="carousel slide my-3" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselQuotes" data-slide-to="0" className="active"/>
                                    <li data-target="#carouselQuotes" data-slide-to="1"/>
                                    <li data-target="#carouselQuotes" data-slide-to="2"/>
                                    <li data-target="#carouselQuotes" data-slide-to="3"/>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={qot1} className="d-block w-100" alt="Цитата 1"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={qot2} className="d-block w-100" alt="Цитата 2"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={qot3} className="d-block w-100" alt="Цитата 3"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={qot4} className="d-block w-100" alt="Цитата 4"/>
                                        <div className="carousel-caption d-block">
                                            <p className="quoteText">Не гонитесь за большими деньгами, делайте добро и
                                                оно обязательно к вам вернется. Возможно, в виде хороших связей ;)</p>
                                            <p className="authorText">Ковальчук А. Д. (разработчик)</p>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselQuotes" role="button"
                                   data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                    <span className="sr-only">Назад</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselQuotes" role="button"
                                   data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                                    <span className="sr-only">Далее</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
