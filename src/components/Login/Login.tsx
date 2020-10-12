import React from "react"
import {reduxForm, InjectedFormProps} from "redux-form";
import {Input, createField} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import style from "../../components/common/FormsControls/FormsControls.module.css"


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm = ({handleSubmit, error}: InjectedFormProps<FormDataType>) => {

    return (
        <form onSubmit={handleSubmit}>
                {createField('Email', 'email', [required], Input, {type: 'text'})}
                {createField('Password', 'password', [required], Input, {type: 'text'})}
                {createField(null, 'rememberMe', [], Input, {type: 'checkbox'},'remember me')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type LoginType = {
    isAuth: boolean,
    login: (email: string, password: string, rememberMe: boolean) => void
}

const Login = (props: LoginType) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)
