import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

class Messages extends React.Component {
	componentDidMount() {
		this.messageWrapper = ReactDOM.findDOMNode(this.refs.info);
	}
	componentWillReceiveProps(props) {
		if (props.messages.length > 5) {
			this.messageWrapper.scrollTop += 10;
		}
		return true;
	}
	render() {
		return(
			<div className="messages foot" ref="info">
				{this.props.messages.map((message, ind) => {
					return message.match('Enemy') || message.match('Boss') ? <p key={ind} style={{color: 'red'}}>- {message}</p> : message.match('!!') ? <p key={ind} style={{color: 'gold'}}>- {message}</p> : <p key={ind} style={{color: '#51cc4d'}} >- {message}</p>;	
				})}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	player: state.player.level,
	messages: state.messages
});

export default connect(mapStateToProps)(Messages);