import React from 'react';
import { connect } from 'react-redux';
import FogRow from './FogRow';

class Fog extends React.Component {
	render() {
		return(
			<div className="fog">
				{this.props.fogMap.map((fogRow, ind) => <FogRow key={ind} fogRow={fogRow} /> )}
			</div>
			)
	}
}

const mapStateToProps = state => ({
	fogMap: state.fogMap
});

export default connect(mapStateToProps)(Fog);