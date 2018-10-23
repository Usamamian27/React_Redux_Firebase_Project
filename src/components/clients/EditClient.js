import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Spinner from '../layout/Spinner';


class EditClient extends Component {

    constructor(props) {
        super(props);

        // create refs

        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();

    }

    onSubmit = (e) =>{
        e.preventDefault();
        const {client , firestore} = this.props;

        // updated Client

        const updClient ={
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 :
                this.balanceInput.current.value
        }


        // Update client in firestore

        firestore
            .update({collection : 'clients' , doc: client.id}, updClient)
            .then(() => this.props.history.push('/'));




    }








    render() {

        const {client} =  this.props;
        const { disableBalanceOnEdit } = this.props.setting;

        if (client){

            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left">
                                    Back to Dashboard
                                </i>
                            </Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            Edit Client
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstname">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        minLength="2"
                                        required

                                        // ref is used to update new value
                                        // to exiting field

                                        ref={this.firstNameInput}

                                        defaultValue={client.firstName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        minLength="2"
                                        required

                                        ref={this.lastNameInput}
                                        defaultValue={client.lastName}

                                        // default value is used instead of value
                                        // bcz it's a controled component
                                        // it can't let us edit with value
                                        // it must be initialized with previous values / data from collection
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        ref={this.emailInput}
                                        defaultValue={client.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        minLength="10"
                                        required
                                        ref={this.phoneInput}
                                        defaultValue={client.phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="balance">
                                        Balance
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="balance"
                                        ref={this.balanceInput}
                                        defaultValue={client.balance}
                                        disabled={disableBalanceOnEdit}
                                    />
                                </div>
                                <input type="submit" value="submit" className="btn btn-primary btn-block"/>

                            </form>
                        </div>

                    </div>

                </div>
            );

        }
        else
        {
            return <Spinner/>;
        }

    }
}

export default compose(

    //  the reason for this different looking firestore connect method
    // is that we need to access id for each client i.e from URL
    // we need to get that from props

    firestoreConnect(props => [
        {collection : 'clients', storeAs : 'client' , doc: props.match.params.id }
    ]),


    /// we can do destructuring for this code like below
    // connect((state, props) => ({
    //     client: state.firestore.ordered.client && state.firestore.ordered.client[0]
    // }))

    connect(({firestore : {ordered} , setting } , props) => ({
            client: ordered.client && ordered.client[0],
            setting: setting

        })

    )
)(EditClient);