import { Component } from "react";

class NoMetaMask extends Component{
    render(){
        return(
            <div className="card" style={{margin:'20px',padding:'20px'}}>
                <div className="row">
                    <span>This app requires the metamask extension to be installed and setup on the browser</span>
                    <span><a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" style={{cursor:'pointer'}} target='_blank'>Download Metamask(Chrome)</a></span>
                    <span>Kindly restart the browser and load this page once that is done</span>
                </div>
            </div>
        )
    }
}

export default NoMetaMask