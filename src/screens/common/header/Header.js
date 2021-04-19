import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "none",
            username: "",
            loginPasswordRequired: "none",
            loginPassword: "",
            firstnameRequired: "none",
            firstname: "",
            lastnameRequired: "none",
            lastname: "",
            emailRequired: "none",
            email: "",
            registerPasswordRequired: "none",
            registerPassword: "",
            contactRequired: "none",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "none",
            username: "",
            loginPasswordRequired: "none",
            loginPassword: "",
            firstnameRequired: "none",
            firstname: "",
            lastnameRequired: "none",
            lastname: "",
            emailRequired: "none",
            email: "",
            registerPasswordRequired: "none",
            registerPassword: "",
            contactRequired: "none",
            contact: ""
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "block" }) : this.setState({ usernameRequired: "none" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "block" }) : this.setState({ loginPasswordRequired: "none" });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "block" }) : this.setState({ firstnameRequired: "none" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "block" }) : this.setState({ lastnameRequired: "none" });
        this.state.email === "" ? this.setState({ emailRequired: "block" }) : this.setState({ emailRequired: "none" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "block" }) : this.setState({ registerPasswordRequired: "none" });
        this.state.contact === "" ? this.setState({ contactRequired: "block" }) : this.setState({ contactRequired: "none" });

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    registrationSuccess: true
                });
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    onChangeHandler = (event,name) => {
        let newState = {...this.state};
        newState[name] = event.target.value;
    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo" />
                    {!this.state.loggedIn ?
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.openModalHandler}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    }
                    {this.props.showBookShowButton === "true" && !this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Button variant="contained" color="primary" onClick={this.openModalHandler}>
                                Book Show
                            </Button>
                        </div>
                        : ""
                    }

                    {this.props.showBookShowButton === "true" && this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        : ""
                    }

                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={(e)=>this.onChangeHandler(e,'username')} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <form>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" autoComplete="off" loginpassword={this.state.loginPassword} onChange={(e)=>this.onChangeHandler(e,'loginPassword')} />
                                    <FormHelperText className={this.state.loginPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </form>
                            </FormControl>
                            <br /><br />
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }

                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={(e)=>this.onChangeHandler(e,'firstname')} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={(e)=>this.onChangeHandler(e,'lastname')} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={(e)=>this.onChangeHandler(e,'email')} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <form>
                                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                    <Input id="registerPassword" type="password" autoComplete="off" registerpassword={this.state.registerPassword} onChange={(e)=>this.onChangeHandler(e,'registerPassword')} />
                                    <FormHelperText className={this.state.registerPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </form>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={(e)=>this.onChangeHandler(e,'contact')} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
}

export default Header;