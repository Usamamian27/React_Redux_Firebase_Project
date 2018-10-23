import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import Spinner from '../layout/Spinner';


class AppNavbar extends Component {

    state = {
        isAuthenticated :false
    }


    static getDerivedStateFromProps(props , state ){
        const { auth } = props;

        if(auth.uid){
            return {isAuthenticated: true}
        }
        else
        {
            return {isAuthenticated :false}
        }
    }

    onLogout = (e) =>{
        e.preventDefault();

         const {firebase} = this.props;
         firebase.logout();
    }





    render() {


        const {auth } = this.props;
        const {allowRegistration} = this.props.setting;

        return (

            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        ClientPanel
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain">

                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">

                        <ul className="navbar-nav mr-auto">

                            {this.state.isAuthenticated ? (

                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        DashBoard
                                    </Link>
                                </li>

                            ) : null}

                        </ul>

                        {this.state.isAuthenticated ? (

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#!">
                                        {auth.email}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/settings" className="nav-link">
                                        Settings
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#!"
                                       onClick={this.onLogout}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>

                        ) : null}



                        {allowRegistration && !this.state.isAuthenticated ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </ul>

                        ) : null
                        }
                    </div>

                </div>
            </nav>
        );
    }
}

export default compose(
    firebaseConnect(),
    connect((state,props) => ({
        auth: state.firebase.auth,
        setting: state.setting
    }))
)(AppNavbar);