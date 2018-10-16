import React from 'react';
import { connect } from 'react-redux';

class Boss extends React.Component {
	render() {
		const bossPosition = {
			top: this.props.yCoord,
			left: this.props.xCoord
		}
		return(
			<div className="boss" style={bossPosition} />
			)
	}
}

const mapStateToProps = state => ({
	xCoord: state.boss.xCoord,
	yCoord: state.boss.yCoord
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Boss);
