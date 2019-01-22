import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class BlockFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.inputBlockName = this.inputBlockName.bind(this);
    }
    async  postData() {

        let formInput = {
            name: this.props.name,
            locations_id: this.props.locations_id
        }

        let errors = this.validFormFields(formInput);
        if (errors) {
            this.props.showErros(errors)
            console.log(errors);
        }

        if (this.isEmpty(errors)) {
            var postNewData = await axios.post('http://localhost:3002/blockData', formInput);
            this.setState({
                redirect: true,
            })

        }

    }

    validFormFields(data) {
        let errors = {};
        if (data.name == "") {
            errors.address = "block name is required";
        }

        this.props.showErros(errors)
        return errors;
    };
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    inputBlockName(e) {

        this.props.updateBlockName(e.target.value)

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/unit_types' />
        }
    }
    render() {
        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Enter  block name for the business</h2>
                <div>
                    <label>Block</label>
                    <input
                        data-toggle="tooltip"
                        data-placement="top" title=" block_name"
                        type="text"
                        onChange={this.inputBlockName}
                    />
                    <h4 style={{ color: "red" }}> {this.props.erros.country}</h4>
                </div>
                {this.renderRedirect()}
                <div><button onClick={() => this.postData()}>Submit</button></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.businessBlocks.name,
        locations_id: state.selectValues.selections,
        erros: state.registerBusinesses.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBlockName: (name) => {
            dispatch(action.saveBlockName(name))
        },
        updateLocationId: (locationid) => {
            dispatch(action.saveLocations_Id(locationid))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
        showErros: (err) => {
            dispatch(action.FieldsErros(err))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockFrom);