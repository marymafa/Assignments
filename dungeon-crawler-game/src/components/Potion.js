import React from 'react';
import { config } from '../config';
import { connect } from 'react-redux';
import { playerPositionToItems } from '../helpers';
import { handleItems } from '../actions';

class Potion extends React.Component {

	componentWillReceiveProps(next) {
		const props = this.props;
		if (playerPositionToItems(config.MAP_DEFAULT_WIDTH * props.x + 10, config.MAP_DEFAULT_HEIGHT * props.y + 10, props.playerXcoord, props.playerYcoord)) {
			props.handleItems(props.y, props.x);
		}
		return true;
	}

	render() {
		const potionPosition = {
			top: config.MAP_DEFAULT_HEIGHT * this.props.y + 10,
			left: config.MAP_DEFAULT_WIDTH * this.props.x + 10
		}
		
		return(
			<div className="potion" style={potionPosition} />
			)
	}
}

const mapStateToProps = (state) => ({
	fogMap: state.fogMap,
	playerXcoord: state.player.xCoord,
	playerYcoord: state.player.yCoord
});

const mapDispatchToProps = dispatch => ({
	handleItems: (y, x) => dispatch(handleItems(y, x))
});
export default connect(mapStateToProps, mapDispatchToProps)(Potion);