import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UnitTypesFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.inputHeight = this.inputHeight.bind(this);
        this.inputLength = this.inputLength.bind(this);
        this.inputWidth = this.inputWidth.bind(this);
        this.inputName = this.inputName.bind(this);
    }

    async  postData() {
        var postNewData = await axios.post('http://localhost:3002/unitTypesData', {
            name: this.props.name,
            length: this.props.length,
            height: this.props.height,
            width: this.props.width
        });
        this.setState({ redirect: true })

    }

    inputName(e) {

        this.props.updateUnitTypesName(e.target.value)
    }
    inputLength(e) {
        this.props.updateUnitTypesLength(e.target.value)
    }
    inputHeight(e) {
        this.props.updateUnitTypesHeight(e.target.value)
    }
    inputWidth(e) {
        this.props.updateUnitTypesWidth(e.target.value)
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/view_unit_type' />
        }
    }
    render() {
        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Fill in the details below</h2>
                <div>
                    <label>Name</label>
                    <input data-toggle="tooltip" data-placement="top" title="name" type="text" onChange={this.inputName} />
                </div>
                <div>
                    <label>Length</label>
                    <input data-toggle="tooltip" data-placement="top" title="Length" type="text" onChange={this.inputLength} />
                </div>
                <div>
                    <label>Height</label>
                    <input data-toggle="tooltip" data-placement="top" title="Height" type="text" onChange={this.inputHeight} />
                </div>
                <div>
                    <label>Width</label>
                    <input data-toggle="tooltip" data-placement="top" title="Width" type="text" onChange={this.inputWidth} />
                </div>
                <div>
                    {this.renderRedirect()}
                    <input type="button" value="Submit" onClick={() => this.postData()} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.businessUnitTypes.name,
        length: state.businessUnitTypes.length,
        height: state.businessUnitTypes.height,
        width: state.businessUnitTypes.width

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUnitTypesName: (name) => {
            dispatch(action.saveUnitTypesName(name))
        },
        updateUnitTypesLength: (length) => {
            dispatch(action.saveUnitTypesLength(length))
        },
        updateUnitTypesHeight: (height) => {
            dispatch(action.saveUnitTypesHeight(height))
        },
        updateUnitTypesWidth: (width) => {
            dispatch(action.saveUnitTypesWidth(width))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitTypesFrom);