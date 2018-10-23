import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
} from '../../actions/settingAction';

class Settings extends Component {

    disableBalanceOnAddChange = () =>{
        const {setDisableBalanceOnAdd} = this.props;
        setDisableBalanceOnAdd();
    }

    disableBalanceOnEditChange = () =>{
        const {setDisableBalanceOnEdit} = this.props;
        setDisableBalanceOnEdit();
    }

    allowRegistrationChange = () =>{
        const {setAllowRegistration} = this.props;
        setAllowRegistration();
    }




    render() {


        const {disableBalanceOnAdd , disableBalanceOnEdit , allowRegistration} = this.props.setting;


        return (
            <div>
                <div className="row">
                    <div className="cl-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Edit Settings
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label >Allow Registration</label> {' '}
                                <input
                                    type="checkbox"
                                    name="allowRegistration"
                                    checked={!!allowRegistration}
                                    onChange={this.allowRegistrationChange}
                                />
                            </div>
                            <div className="form-group">
                                <label >Disable Balance On Add</label> {' '}
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnAdd"
                                    checked={!!disableBalanceOnAdd}
                                    onChange={this.disableBalanceOnAddChange}
                                />
                            </div>
                            <div className="form-group">
                                <label >Disable Balance On Edit</label> {' '}
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnEdit"
                                    checked={!!disableBalanceOnEdit}
                                    onChange={this.disableBalanceOnEditChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state,props)=>({
    auth : state.firebase.auth,

    setting: state.setting
}),{setAllowRegistration ,setDisableBalanceOnAdd , setDisableBalanceOnEdit})(Settings);