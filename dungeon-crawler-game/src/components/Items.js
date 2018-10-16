import React from 'react';
import { config } from '../config';
import { connect } from 'react-redux';
import { playerPositionToItems } from '../helpers';
import { handleArtifacts } from '../actions';

class Item extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state !== nextState || this.props !== nextProps) return false;
	}
	componentWillReceiveProps(next) {
		const props = this.props;
		if (playerPositionToItems(config.MAP_DEFAULT_WIDTH * props.x + 10, config.MAP_DEFAULT_HEIGHT * props.y + 10, props.playerXcoord, props.playerYcoord)) {
			this.props.handleArtifacts(props.y, props.x, props);
		}
		return true;
	}
	render() {
		const itemPosition = {
			top: config.MAP_DEFAULT_HEIGHT * this.props.y + 10,
			left: config.MAP_DEFAULT_WIDTH * this.props.x + 10
		}
		return(
			<div className="item" style={itemPosition} />
			)
	}
}

const mapStateToProps = (state) => ({
	fogMap: state.fogMap,
	availableArtifacts: state.artifacts,
	playerXcoord: state.player.xCoord,
	playerYcoord: state.player.yCoord
});

const mapDispatchToProps = dispatch => ({
	handleArtifacts: (y, x) => dispatch(handleArtifacts(y, x))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);