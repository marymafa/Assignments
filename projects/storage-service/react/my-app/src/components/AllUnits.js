import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as action from "../redux/actions";

class AllUnits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: [],
            selectedUnits: [],
            selectedUnit: this.props.selections,
        }

    }
    componentDidMount() {
        axios.get("http://localhost:3002/unitsData").then(result => {
            this.setState({ unit: result.data })
        })
    }
    async viewUnits() {
        axios.get("http://localhost:3002/unitsData" + "selectedValue").then(result => {
            this.setState({ unit: result.data })
        })
    }
    SelectValue = (e) => {
        const data = e.target.value
        this.props.saveSelectedVAlues(data)
    }
    render() {
        return (
            <div>
                <h1>All units</h1>
                <div></div>
                <div className="unit">
                    <label>
                        units:
                            <select name="units" onChange={(e) => this.SelectValue(e)} >
                            <option value={0}>All units</option>
                            {this.state.unit.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                        </select>
                    </label>
                </div>
                <div>
                    <Link to="/" ><button type="button">Next</button></Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        name: state.selectValues.name,
        selections: state.selectValues.selections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveSelectedVAlues: (data) => {
            dispatch(action.saveSelect(data))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUnits);