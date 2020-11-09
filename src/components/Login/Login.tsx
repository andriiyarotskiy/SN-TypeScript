import React from "react"
import {reduxForm, InjectedFormProps} from "redux-form";
import {Input, createField} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import style from "../../components/common/FormsControls/FormsControls.module.css"
import {NullableType} from "../../utils/typeAssist";


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

type LoginFormOwnType = { captchaUrl: NullableType<string> }

const LoginForm = ({handleSubmit, error, captchaUrl}: InjectedFormProps<FormDataType, LoginFormOwnType> & LoginFormOwnType) => { // child component

    return (
        <form onSubmit={handleSubmit}>
            <div>Email : free@samuraijs.com </div>
            <div>Password : free</div>
            {createField('Email', 'email', [required], Input, {type: 'text'})}
            {createField('Password', 'password', [required], Input, {type: 'text'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && createField("Symbols from image", 'captcha', [required], Input, {}, '')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnType>({form: 'login'})(LoginForm)

type LoginType = {
    isAuth: boolean,
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
    captchaUrl: NullableType<string>
}

const Login = (props: LoginType) => {  // parent component

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}
const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)
