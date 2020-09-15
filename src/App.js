import React from 'react';

import {ThemeProvider} from './components/themes/ThemeProvider'

import ProviderFlow from './components/chartProvider/Providerflow'

import Leftbar from './components/chartProvider/Leftbar'

import { useStoreState } from 'react-flow-renderer';
import { getConnectedEdges } from 'react-flow-renderer/dist/ReactFlow';

import {Header, HeaderButton, DropdownMenu, NavItem} from './components/header/Header'
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import logo from './logo.svg'
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftpanelOpen: true
    }
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  btnLeftPanelClicked = () => {
    if (this.state.leftpanelOpen) {
      document.getElementById("leftbar").style.width= "0px";
      document.getElementById("leftbar").style.maxWidth= "0px";
      document.getElementById("leftbar").style.opacity=0
      
    } else {
      document.getElementById("leftbar").style.width= "20%";
      document.getElementById("leftbar").style.maxWidth = "260px";
      document.getElementById("leftbar").style.opacity=1
      
    }
    this.setState({leftpanelOpen: !this.state.leftpanelOpen})
  }

  setActiveMenu = () => {

  }

  render() {
    return (
      <ThemeProvider>
        <Header
          start={
            <>
            <NavItem  
            callback={()=>{
              this.btnLeftPanelClicked()
            }}
            icon={<MenuOpenIcon style={{transform: "rotate(180deg)", alingItems:"center", justifyContent:"center"}}/>}>
              
            </NavItem>
            <NavItem icon={<MenuOpenIcon/>}>
              
            </NavItem>
            </>}
          center={ <>
            <img src={logo} style={{height:"32px", paddingRight:"5px"}}/>
            <span style={{fontSize:"20px", color:"white"}}>Studio</span>
            </>}
          end={<>
            <NavItem icon={<MenuIcon/>}>
              <DropdownMenu> </DropdownMenu>
            </NavItem>
            </>}>
        </Header>
        <ProviderFlow 
        topbarheight={50}
        panelTitle="Explorer"
        />
      </ThemeProvider>
    );
  }
}

export default App;
