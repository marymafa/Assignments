import React from 'react';
import { connect } from 'react-redux';

class GameInfo extends React.Component {
	componentWillReceiveProps(props) {

	}
	render() {
		const healthStyle = {
			width: `${200 * (this.props.lifes / 100)}px`
		}
		const passiveHealthStyle = {
			width: `${200 * (this.props.lifeCaps[this.props.level] / 100)}px`
		}
		const expStyle = {
			width: `${400 * (this.props.xp / this.props.levelCaps[this.props.level])}px`
		}
		return(
		 <div className="info">
		 	<div className="level">
		 		<p>{this.props.level + 1}</p>
		 		<span className="small">lvl</span>
		 	</div>
		 	<div className="act-health bar act" style={healthStyle}></div>
		 	<div className="health-bar bar" style={passiveHealthStyle}></div>
		 	<p className="health-num num">{this.props.lifes} / {this.props.lifeCaps[this.props.level]}</p>
		 	<div className="exp-bar bar"></div>
		 	<div className="act-exp bar" style={expStyle} ></div>
		 	<p className="exp-num num">{this.props.xp}  / {this.props.levelCaps[this.props.level]}</p>
		 	
		</div>
		);
	}
}

const mapStateToProps = state => ({
	lifes: state.player.lifes,
	xp: state.player.experience,
	level: state.player.level,
	levelCaps: state.levelsExp,
	lifeCaps: state.player.baseLevelHealth
});

export default connect(mapStateToProps)(GameInfo);
