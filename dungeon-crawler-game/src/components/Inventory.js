import React from 'react';
import { connect } from 'react-redux';
import { putOn, giveDescription } from '../actions';

class Inventory extends React.Component {
	render() {
		const activeStyle = {
			boxShadow: `inset 0px 0px 5px gold`
		}
		const passiveStyle = {
			opacity: '0.4'
		}
		return(
			<div className="inventory foot">
				{this.props.inventory.length > 0 && 
				 this.props.inventory.map((item, ind) => <div className="inventory-item" onClick={() => this.props.putOn(item)} 
				 style={item.type === 'weapon' ? !this.props.activeWeapon ? {} : this.props.activeWeapon.id === item.id ? {...activeStyle, background: `url(${item.image} center no-repeat`} : {...passiveStyle, background: `url(${item.image} center no-repeat`}
											   : !this.props.activeArmor  ? {} : this.props.activeArmor.id === item.id ? {...activeStyle, background: `url(${item.image} center no-repeat`} : {...passiveStyle, background: `url(${item.image} center no-repeat`}} 
				 key={ind} onMouseEnter={() => this.props.giveDescription(item)}>
				 	<img src={item.image} alt=""/>	 
				</div>)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	inventory: state.player.inventory,
	activeWeapon: state.player.weapon,
	activeArmor: state.player.armor
});

const mapDispatchToProps = dispatch => ({
	putOn: (itemObj) => dispatch(putOn(itemObj)),
	giveDescription: (artifact) => dispatch(giveDescription(artifact))
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
