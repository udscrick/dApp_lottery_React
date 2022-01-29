import { Component } from "react";
class Winner extends Component{
render(){
    return(<div className="card" style={{width:'50%',marginTop:'40px',marginBottom:'40px',padding:'20px'}}>
     <p className="h2" style={{textAlign:'center'}}>Winner Announcements</p>
        {this.props.winner?<span>The winner of the raffle is: {this.props.winner}.</span>:<span>Keep checking here to find out who won the raffle</span>}
    </div>)
}
}

export default Winner