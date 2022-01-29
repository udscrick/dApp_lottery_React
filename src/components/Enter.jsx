import { Component } from "react";
import { Spinner } from "react-bootstrap";

class Enter extends Component{
    render(){
        return(
            <div className="card" style={{width:'50%',marginTop:'40px',marginBottom:'40px'}}>
                 {/* <h2 style={{textAlign:'center'}}></h2> */}
                 <p className="h2" style={{textAlign:'center'}}>Enter Raffle</p>
      <form onSubmit={this.props.enterRaffle}>
      
<div className="input-group mb-3" style={{width:'50%'}}>
  <div className="input-group-prepend">
    {/* <span className="input-group-text">$</span> */}
  </div>
  <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" placeholder='Enter amount you wish to send(min: 0.01 eth)' onChange={(event)=>this.props.searchTermChange(event)}/>
  <div className="input-group-append">
    <span className="input-group-text">eth</span>
  </div>
</div>
      {this.props.message&&this.props.message!='Transaction completed'?<div style={{display:'flex',alignItems:'center'}}><span>{this.props.message}</span><Spinner animation="grow" /></div>:<button type="submit" className="btn btn-outline-primary" style={{marginBottom:'25px'}} >Enter Raffle</button>}
     
      
      </form>
    
            </div>
        )
    }
}

export default Enter