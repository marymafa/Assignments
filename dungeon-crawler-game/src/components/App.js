import React from 'react';
import GameInfo from './GameInfo';
import Board from './Board';
import Inventory from './Inventory';
import Messages from './Messages';
import { connect } from 'react-redux';
import { handleGameStatus, startNewGame } from '../actions';


class App extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.playerLifes <= 0) {
			this.props.handleGameStatus('loss');
		}
		if (nextProps.bossLifes <= 0) {
			this.props.handleGameStatus('win');
		}
	}
	render() {
		return (
			<div className="app">
				{this.props.gameIsRunning &&
				  <div>
					<GameInfo />				
					<Board />				
					<div className="footer">
						<Messages />
						<Inventory />
					</div>
				  </div> }
				  {this.props.gameLose && 
				  	<div className="lose-screen screen">
				  		<h1>Sorry :) Game is too tough for you</h1>
				  		<p>start new game?</p>
				  		<button onClick={() => this.props.startNewGame()}>go</button>
				  	</div>
				  }
				  {this.props.gameWin &&
				  	<div className="win-screen screen">
				  		<h1>Congrats! You won my tiny game!</h1>
				  		<p>Do you want to play more?</p>
				  		<button onClick={() => this.props.startNewGame()}>go</button>
				  	</div>
				  }
			</div>
		);
	}
}

const mapStateToProps = state => ({
	gameIsRunning: state.playing,
	gameWin: state.win,
	gameLose: state.lose,
	playerLifes: state.player.lifes,
	bossLifes: state.boss.health
});
const mapDispatchToProps = dispatch => ({
	handleGameStatus: (str) => dispatch(handleGameStatus(str)),
	startNewGame: () => dispatch(startNewGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
