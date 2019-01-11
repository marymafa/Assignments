import React from "react";
import { connect } from "react-redux";
import * as action from "../redux/actions";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UnitsFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.inputName = this.inputName.bind(this);
    }
    async  postData() {
        console.log('this.props before sending to the api :', this.props);
        var postNewData = await axios.post('http://localhost:3002/unitsData', {
            name: this.props.name,
            blocks_id: this.props.blocks_id,
            units_type_id:this.props.units_type_id,
        });
        console.log("TESTING PROPS", this.props.units_type_id)

        this.setState({
            redirect: true,
        })
    }
    inputName(e) {
        this.props.updateBlockName(e.target.value)
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/unit_types' />
        }
    }
    render() {
        console.log("units props", this.props.units_type_id);

        return (
            <div>
                <h1>Storage Service</h1>
                <h2>Enter the block name of the business</h2>
                <div>
                    <label>Units</label>
                    <input data-toggle="tooltip" data-placement="top" title="units" type="text" onChange={this.inputName} />
                </div>
                {this.renderRedirect()}
                <div><button onClick={() => this.postData()}>Submit</button></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.businessUnits.name,
        blocks_id: state.selectValues.selections,
        units_type_id: state.selectValues.selections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBlockName: (name) => {
            dispatch(action.saveUnits(name))
        },
        
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitsFrom);