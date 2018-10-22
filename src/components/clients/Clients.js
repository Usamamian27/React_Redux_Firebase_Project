import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class Clients extends Component {

    state ={
        totalOwed : null
    }

/////// when we need somthing coming from redux state and we need to modify it then we use this method
    /// This method exists for rare use cases where the state depends on changes in props over time.
    ///  like here our balance prop is dependent on clients to update.
    static  getDerivedStateFromProps(props ,state){
        const {clients } =  props;

        if (clients){

            // Add balance of all clients

            const total = clients.reduce((total,client)=>{
                return total + parseFloat(client.balance.toString());
            } , 0);

            return {totalOwed: total}


        }
        return null;
    }

    render() {
        const { clients } = this.props;
        const {totalOwed} = this.state;

        if(clients){
            return (
                <div className="row">
                    <div className="col-md-6">
                        <h2>
                            {''}
                            <i className="fas fa-users" />
                            Clients {''}
                        </h2>
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-right text-secondary">
                            Total Owed {' '}

                        <span className="text-primary">
                            ${parseFloat(totalOwed).toFixed(2)}

                        </span>
                        </h5>

                    </div>

                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>

                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`}
                                            className="btn btn-dark bg-dark btn-sm">
                                            <i className="fas fa-arrow-circle-right">Details</i>

                                        </Link>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            );

        }else {
            return <h1><Spinner/></h1>;
        }





    }
}

// export default Clients;

export default compose(
    firestoreConnect([{ collection : 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);