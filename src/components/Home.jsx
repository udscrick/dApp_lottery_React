

import web3 from '../web3';
import lottery from '../lottery';
import react,{Component} from 'react'
import Header from './Header';
import Enter from './Enter';
import Winner from './Winner';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';


class Home extends Component{
      //COnstructor before ES6
  // constructor(props){
  //   super(props);
  //   this.state = {manager:''}
  // }
  
  //After es6, this code below is automatically moved into the constructor
  state = {
    manager:'',
    players:[],
    balance:0,
    myadd:'',searchTerm:'',
    message:'',
    isMgr:false,
    messageWin:'',
    accounts:[],
    winner:null,
    isSwitchOn: false,
    isModalShown:false,
    winLoader:false
    
  };
balance = 0
  componentDidMount(){
   this.initializeData()
   this.checkAccounts()
    
  }
checkAccounts = ()=>{
    //console.log("Tesstt")
    if(window.ethereum) {       window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })}
}
  initializeData =async ()=>{
    
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)
   
    const accounts = await web3.eth.getAccounts()
    let myadd = await web3.currentProvider.selectedAddress
    //console.log("Balance is: ",balance)
    //console.log("Accounts are: ",accounts)
    //console.log("My add: ",myadd)
    //console.log("manager add: ",manager)
   
    
    this.setState({
      manager,
      players,
      balance,
      myadd,
      accounts
    });
    let isMgr = this.isManager()
    //console.log("Is manager? ",isMgr)
  }
 
  handleClose = () => this.setState({isModalShown:false});
  handleShow = () => this.setState({isModalShown:true});

  render(){

    //console.log("Web3 version: ",web3.version)
  return (
    <div  style={{
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#FAFAFA'
        }}>
    
    <div className='row'  style={{
        width:'100%',
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        }}
   >
   <div style={{marginTop:'20px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
   <div style={{marginRight:'10px'}}>
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
</div>
<span><a style={{textDecoration:'underline',color:'blue'}} onClick={this.handleShow}>Click here for instructions</a></span>
</div>
    <Header 
      manager={this.state.manager} 
      players={this.state.players} 
      myadd={this.state.myadd}
      balance={this.state.balance}    
      />
    </div>
    <div className='row' style={{
        width:'100%',
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        }}>
     
     <Enter searchTermChange={this.searchTermChange} enterRaffle={this.enterRaffle} message={this.state.message}/>

     <div style={{display:'contents'}}>
        <Form.Check 
    type="switch"
    id="custom-switch"
    label="Admin Mode"
    checked = {this.state.isSwitchOn}
    onChange={(event)=>this.adminModeChange(event)}
  />
  <div>
      <span>*For testing, any admin can pick a winner, this feature will be limited to managers when deployed to main eth network</span>
  </div>
  </div>
  {this.state.isSwitchOn?
  this.state.winLoader?<Spinner animation="grow" />:
  <div style={{width:'25%',display:'flex',alignItems:'center',justifyContent:'center'}}> 
  <button type="button" className="btn btn-primary btn-lg" onClick={this.pickWinner} disabled={this.state.players.length>0?false:true}>Pick Winner</button></div>
  :null}

    <Winner winner={this.state.winner} balance={this.balance}/>
  
     
    </div>
    
    <Modal show={this.state.isModalShown} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                <li>Ensure you have metamask installed and an account set up</li>
                <li>Switch the network to Rinkeby Test Eth Network</li>
                <li>Send some test eth to your metamask account using <a href='https://faucets.chain.link/rinkeby' style={{textDecoration:'underline'}} target='_blank'>This tool</a></li>
                <li>Enter the raffle(You may switch accounts and try multiple entries or you may try using a single account)</li>
                <li>Toggle the Admin Switch</li>
                <li>Click on Pick WInner</li>
                ***Note: You may be asked by metamask to authorize/unlock your wallet.Kindly do so in order to link your wallet with the portal
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    </div>
  );
}

searchTermChange = (event)=>{
    //console.log("Sercihing: ",event.target.value)
    this.setState({searchTerm:event.target.value})
}
adminModeChange = (event)=>{
    this.setState({
        isSwitchOn:!this.state.isSwitchOn
    })
    //console.log("Evnet val: ",this.state.isSwitchOn)
}

isManager = ()=>{
  if(this.state.manager.toLowerCase()===this.state.myadd.toLowerCase()){
    this.setState({isMgr:true})
    return true;
  }
  this.setState({isMgr:false})
  return false;
}

pickWinner = async(event)=>{
  event.preventDefault();
  this.setState({messageWin:'Picking a winner',winLoader:true})
  try{
    await lottery.methods.pickWinner().send({
      from:this.state.accounts[0]
    })
    let winner = await lottery.methods.contestWinner().call()
    this.initializeData()
    //console.log("Winner is: ",winner)
    this.setState({messageWin:'WInner picked',winner:winner,winLoader:false})
  }
  catch(err){
    //console.log("Pick winner error")
    this.setState({messageWin:'Pick winner error',winLoader:false})
  }
  
}

enterRaffle= async(event)=>{
    //console.log("Hereee")
  this.setState({message:'Transaction in progress....'})
  event.preventDefault(); //SO that form does not auto submit
  //console.log("Val: ",this.state.searchTerm)
 if(parseInt(this.state.searchTerm)||parseFloat(this.state.searchTerm)){
   try{
     //console.log("In try")
    await lottery.methods.enter().send({
      from: this.state.myadd,
      value: web3.utils.toWei(this.state.searchTerm,'ether')
  });
  this.initializeData()
  this.setState({message:'Transaction completed'})
   }
   catch (err){
     //console.log("COntract error: ",err)
     this.setState({message:'Contract error. Please try again later'})
   }
  
 }
}
}

export default Home