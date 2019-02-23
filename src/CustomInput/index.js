import * as React from 'react'
import {} from 'react-bootstrap';
import uniqid from 'uniqid'
import InputMask from 'react-input-mask'
import {const_type as CT, const_typeView as CTV} from "./constants";
import validator from "validator";

export default class CustomInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.type !== undefined ? props.type : CT.TEXT,
            typeView: props.typeView !== undefined ? props.typeView : CTV.USUAL,
            label: props.label,
            placeholder: props.placeholder !== undefined ? props.placeholder : "",
            maxLength: props.maxLength,
            currentLength: 0,
            necessarily: props.necessarily,
            showNec: props.showNec,
            helpText: props.helpText,
            validClass: "",
            onChange: props.onChange
        };

        switch (props.type) {
            case CT.EMAIL:
                this.state.placeholder = "email@example.ru";
                break;
            case CT.PHONE:
                this.state.placeholder = "+7 (999) 999-0000";
                break;
            case CT.URL:
                this.state.placeholder = "https://reference.example.net";
                break;
            case CT.PASS: {
                this.state.necessarily = true;
                break;
            }
        }

        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onChangeInput(e) {
        const value = e.target.value;
        this.setState({
            value: value,
            currentLength: value.length
        }, () => {
            if (checkValid(this.state, value)) {
                this.setState({validClass: "is-valid"})
            } else {
                this.setState({validClass: "is-invalid"})
            }
        });
        if(this.state.onChange!==undefined){
            this.state.onChange(e);
        }
    }

    render() {
        let helpId = uniqid("customInput_helpId");
        const Id = uniqid("customInput_Id");
        let input = <input id={Id} type={this.state.type} className={"form-control " + this.state.validClass}
                           aria-describedby={helpId}
                           placeholder={this.state.placeholder}
                           aria-label={this.state.label}
                           onChange={this.onChangeInput} maxLength={this.state.maxLength}/>;
        if (this.state.type === CT.TEXTAREA) {
            input = <textarea id={Id} className={"form-control " + this.state.validClass}
                              aria-describedby={helpId}
                              placeholder={this.state.placeholder}
                              aria-label={this.state.label} rows={this.state.rows}
                              onChange={this.onChangeInput} maxLength={this.state.maxLength}/>;
        }
        if (this.state.type === CT.PHONE) {
            input = <InputMask type="tel" className={"form-control " + this.state.validClass}
                               aria-describedby={helpId}
                               placeholder={this.state.placeholder}
                               aria-label={this.state.label}
                               onChange={this.onChangeInput}
                               mask="+7 (999) 999-9999" maskChar=" "/>;
        }

        return (
            <div>
                {this.state.typeView === CTV.USUAL && (
                    <div className="form-group">
                        {this.state.label && <label htmlFor={Id}>
                            {this.state.necessarily && this.state.showNec && (
                                <span className="text-danger">*&nbsp;</span>
                            )}
                            {this.state.label}
                        </label>}
                        {input}
                        {this.state.maxLength && this.state.type !== CT.PHONE && (
                            <small className="form-text text-muted float-right">
                                {this.state.currentLength} / {this.state.maxLength}
                            </small>
                        )}
                        {this.state.helpText && (
                            <small id={helpId} className="form-text text-muted">
                                {this.state.helpText}
                            </small>
                        )}
                    </div>
                )}
                {this.state.typeView === CTV.SHORT && (
                    <div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                {this.state.label && (
                                    <span className="input-group-text" id="basic-addon1">{this.state.label}</span>
                                )}</div>
                            {input}
                        </div>
                        {this.state.maxLength && this.state.type !== CT.PHONE && (
                            <small className="form-text text-muted float-right">
                                {this.state.currentLength} / {this.state.maxLength}
                            </small>
                        )}
                        <small id={helpId} className="form-text text-muted mb-2">
                            {this.state.necessarily && this.state.showNec && (
                                <div>
                                    <span className="text-danger">*&nbsp;</span>
                                    Обязательное поле
                                </div>
                            )}
                            {!this.state.necessarily && this.state.helpText}
                        </small>
                    </div>
                )}
            </div>
        );
    }
}

const checkValid = (state, value) => {
    switch (state.type) {
        case CT.URL: {
            return ((state.necessarily && validator.isURL(value) && value !== "") ||
                (!state.necessarily && (validator.isURL(value) || value === "")));
        }
        case CT.EMAIL: {
            return ((state.necessarily && validator.isEmail(value) && value !== "") ||
                (!state.necessarily && (validator.isEmail(value) || value === "")));
        }
        case CT.PHONE: {
            const re = new RegExp('^\\+7 \\((\\d{3})\\) (\\d{3})-(\\d{4})$');
            const formatPhone = value.replace(re, '$1$2$3');
            return ((state.necessarily && formatPhone.length === 10 && value.length !== 0) ||
                (!state.necessarily && (formatPhone.length === 10 || value.length === 0)));
        }
        case CT.TEXTAREA: {
            return ((state.necessarily && value.length !== 0) ||
                (!state.necessarily));
        }
        case CT.PASS: {
            return value.length >= 6;
        }
        default:
            return false;
    }
};