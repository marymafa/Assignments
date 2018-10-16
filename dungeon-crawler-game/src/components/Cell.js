import React from 'react';

class Cell extends React.Component {
	shouldComponentUpdate(next) {
		let props = this.props;
		return props.cell !== next.cell;
	}
	render() {
		const wall = {
			background: `url('https://photos-1.dropbox.com/t/2/AABDGr40k69tWtdRxu0O6mdHbSh5YFB3bBuk1Nag3Z921g/12/602033425/png/32x32/1/_/1/2/wall.png/ELLS3u0EGEwgAigC/xT4oouRzOM-8Z1OKdrpzNYy3o8to0kpmB5MxlXWn8g4?preserve_transparency=1&size=2048x1536&size_mode=3') center no-repeat`
		};
		const freeSpot = {
			background: `url('https://photos-6.dropbox.com/t/2/AADk-RAJahcNMMVpvP5EQpI4rfUzozpqGUAxNmLMo_9Xhg/12/602033425/png/32x32/1/_/1/2/ground.png/ELLS3u0EGE4gAigC/ZOjo1X-nv0V1x8nUCq28_i2nJgyKvEnXZMzSzuNqPYQ?preserve_transparency=1&size=2048x1536&size_mode=3') center no-repeat`
		};
		return <div className="cell" style={this.props.cell === 0 ? wall : freeSpot} />;
	}
}

export default Cell;
