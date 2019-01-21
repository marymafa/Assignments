import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class BusinessFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.inputBusinessName = this.inputBusinessName.bind(this);
        this.inputContactName = this.inputContactName.bind(this);
        this.inputContactEmail = this.inputContactEmail.bind(this);
        this.inputContactNumber = this.inputContactNumber.bind(this);
        this.validFields = this.validFields.bind(this)
    }

    async  postData() {

        var postNewData = await axios.post('http://localhost:3002/data', {
            name: this.props.name,
            contact_name: this.props.contact_name,
            contact_email: this.props.contact_email,
            contact_number: this.props.contact_number
        });
        this.setState({
            redirect: true,
        })
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

    validFields() {

        var valid = true;
        let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let testingEmail = validEmail.test(this.refs.email.value);
        var message = "";
        let validContactNumber = /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/;
        let testContactNumber = validContactNumber.test(this.refs.contact_number.value)

        if (testingEmail) {
            return valid
            message += "you have entered the wrong email('exmple@gmail.com')"
            this.props.updateContactEmail({ email: valid })
            console.log("email valid", this.props.email)

        }

        if (this.refs.name.value > 0) {
            this.props.updateName({ name: valid })
            console.log("name", this.props.updateName({ name: valid }))

        }
        if (this.refs.contact_name.value > 0) {
            this.props.updateContactName({ contact_name: valid })
            console.log("cname", this.props.updateContactName({ contact_name: valid }))

        }
        if (testContactNumber) {
            return valid
            this.props.updateContactNumber({ contact_number: valid })
            console.log("contact_number", this.props.updateContactNumber({ contact_number: valid }))
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/view_all_businesses' />
        }
    }
    render() {
        return (
            <div>
                <Link to="/businessOwnerLogin" >login</Link>|
                <Link to="/" >Logout</Link>
                <h1>Storage Service</h1>
                <h2>Please login if you have registered your business Or   register your business, to get started </h2>
                <div>
                    <label>Name</label>
                    <input
                        ref="name"
                        value={this.props.name}
                        type="text"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="name"
                        onChange={(e) => { this.inputBusinessName(e); this.validFields() }}

                    />
                </div>
                <div>
                    <label>Contact Name</label>
                    <input
                        ref="contact_name"
                        type="text"
                        value={this.props.contact_name}
                        data-toggle="tooltip"
                        data-placement="top"
                        title=" contact name"
                        onChange={(e) => { this.inputContactName(e); this.validFields() }}
                    />

                </div>
                <div>
                    <label>Contact Email</label>
                    <input
                        ref="email"
                        type="text"
                        value={this.props.email}
                        data-toggle="tooltip"
                        data-placement="top"
                        title=" contact email"
                        onChange={(e) => { this.inputContactEmail(e); this.validFields() }}
                    />
                </div>
                <div>
                    <label>Contact Number</label>
                    <input
                        ref="contact_number"
                        type="tel"
                        data-toggle="tooltip"
                        value={this.props.contact_number}
                        data-placement="top"
                        title=" contact number"
                        onChange={(e) => { this.inputContactNumber(e); this.validFields() }}

                    />
                </div>
                <div>
                    {this.renderRedirect()}
                    <button onClick={() => this.postData()}>Register</button>

                </div>
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