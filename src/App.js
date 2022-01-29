import { Component } from "react";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import NoMetaMask from "./components/NoMetaMask";
// import './App.css';


class App extends Component {
  state = {
    ethavailable:false
  }
constructor(props){
  super(props)
  
  
}

componentDidMount(){
  console.log("ETH available?",this.state.ethavailable)
  if(window.ethereum){
    console.log("Eth available")
    this.setState({
      ethavailable: true
    })
  }
  else{
    console.log("No eth")
  }
}

  render(){
    return(
      <div>
      <span>{this.state.ethavailable}</span>
        {this.state.ethavailable==true?<Home />:<NoMetaMask />}
      </div>
    ) 
    }
  }
  


export default App;
