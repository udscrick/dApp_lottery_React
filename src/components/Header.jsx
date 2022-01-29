import { Component } from "react";
import web3 from '../web3'

class Header extends Component{
    render(){
        return(
            <div className="card" style={{width:'50%',marginTop:'40px'}}>
            <h2 style={{textAlign:'center'}}>Contract Details</h2>
      <p>Manager Address: {this.props.manager}</p>
      <p>No. Of Players: {this.props.players.length}</p>
      <p>Contract Prize Fund: { web3.utils.fromWei(this.props.balance.toString(),'ether')} eth</p>
      <p>Your Metamask account id: {this.props.myadd}</p>
      </div>
        )
    }
}

export default Header