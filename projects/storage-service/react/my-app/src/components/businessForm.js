import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';

class BusinessFrom extends React.Component {
    constructor(props) {
        super(props);

        this.inputBusinessName = this.inputBusinessName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputContactName = this.inputContactName.bind(this);
        this.inputContactEmail = this.inputContactEmail.bind(this);
        this.inputContactNumber = this.inputContactNumber.bind(this);
    }
    inputBusinessName(e) {
        this.props.updateName(e.target.value)
    }
    inputContactName(e) {
        this.props.updateContactName(e.target.value)
    }
    inputContactEmail(e) {
        this.props.updateContactEmail(e.target.value)
    }
    inputContactNumber(e) {
        this.props.updateContactNumber(e.target.value)
    }
    handleSubmit(val) {
        this.props.submitNewData(this.props.name, this.props.contact_name, this.props.contact_email, this.props.contact_number)
    }

    render() {
        console.log("redux props", this.props)

        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Register your business</h2>
                <div>
                    <label>Name</label>
                    <input type="text" data-toggle="tooltip" data-placement="top" title="name" business onChange={this.inputBusinessName} />
                </div>
                <div>
                    <label>Contact Name</label>
                    <input type="text" data-toggle="tooltip" data-placement="top" title=" contact name" onChange={this.inputContactName} />
                </div>
                <div>
                    <label>Contact Email</label>
                    <input type="text" data-toggle="tooltip" data-placement="top" title=" contact email" onChange={this.inputContactEmail} />
                </div>
                <div>
                    <label>Contact Number</label>
                    <input type="tel" data-toggle="tooltip" data-placement="top" title=" contact number" onChange={this.inputContactNumber} />
                </div>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.registerBusinesses.name,
        contact_name: state.registerBusinesses.contact_name,
        contact_email: state.registerBusinesses.contact_email,
        contact_number: state.registerBusinesses.contact_number,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => {
            dispatch(action.saveName(name))
        },
        updateContactName: (contact_name) => {
            dispatch(action.saveContactName(contact_name))
        },
        updateContactEmail: (email) => {
            dispatch(action.saveContactEmail(email))
        },
        updateContactNumber: (number) => {
            dispatch(action.saveContactNumber(number))
        },
        submitNewData: (newData) => {
            dispatch(action.onSubmit(newData))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessFrom);