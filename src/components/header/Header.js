import React,  {useState} from 'react'
import {useTheme} from '../themes/ThemeProvider'
import { CSSTransition } from 'react-transition-group';
import '../../App.css'

import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';




function Header(props) {
    const theme = useTheme();
    const layout = theme.layout.nav_layout

    const [headerHeight, setHeaderHeight] = useState(layout.nav_container.height ? layout.nav_container.height : 46)

    const mergeStyles = (s1,s2) => {
        return Object.assign({},s1,s2)
    }

    return (
        <div id={props.id} 
            style={
                layout.nav_container, {
                    height: headerHeight,
                    background:theme.getPaletteInterface("background"),
                    borderBottom: `1px solid ${theme.getPalette("white")}`,
                    transition: ".5s ease"
                }
            }>
            <div style={layout.nav}>
                <div style={layout.navLeft}>
                    {props.start}
                </div>
                <div style={layout.navCenter}>
                    {props.center}
                </div>
                <div style={layout.navRight}>
                    {props.end}
                </div>
            </div>
        </div>
    )
}

function HeaderButton(props) {
    const theme = useTheme();
    const layout = theme.layout.nav_layout
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);

    const hoverColor = props.hoverColor ?  props.hoverColor :  "black";
    
    const containerHeight = layout.nav_container.height.replace('px',"") * .8

    const onMouseEnter = (e,onMouseEnter) => {
        e.preventDefault();
        setHover(true)
        if(onMouseEnter) {
            onMouseEnter()
        }     
    }

    const onMouseLeave = (e,onMouseLeave) => {
        setHover(false);
        e.preventDefault();
        if(onMouseLeave) {
            onMouseLeave()
        }    
    }

    const onClick = (e, onClick) => {
        e.preventDefault();
        if(onClick) {
            onClick();
        }
        if(props.activable)
            setActive(!active)
    }


    return (
        <button
        style={{
            width: containerHeight * .8,
            height: containerHeight * .8,
            background: active || hover ? theme.getPaletteInterface("primary") : theme.getPaletteInterface("background"),
            borderRadius: containerHeight * .4,
            transition: ".2s filter",
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            outline:"none",
            border: props.borderColor ? `1px solid ${props.borderColor}` : 'none',
            marginLeft: "5px",
            marginRight: "5px",
            fontSize:props.fontSize ? props.fontSize : "none",
            color: props.color? props.color : active || hover ? `white` :theme.getPaletteInterface("primary"),
            boxShadow: active ? `0px 0px 5px 2px ${theme.getPaletteInterface("primary")}, inset 0px 0px 5px 2px black` : `inset 0px 0px 5px 2px black`
        }} 
        onMouseEnter={(e)=>{onMouseEnter(e,props.onMouseEnter)}}
        onMouseLeave={(e)=>{onMouseLeave(e,props.onMouseLeave)}}
        onClick={(e)=>{onClick(e,props.onClick)}}
        >     
            {props.icon} 

            {active && props.children} 
        </button>
    )
}

function DropDownButton(props) {
    const theme = useTheme();
    const layout = theme.layout.nav_layout
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);

    const hoverColor = props.hoverColor ?  props.hoverColor :  "black";
    
    const containerHeight = layout.nav_container.height.replace('px',"") * .8

    const onMouseEnter = (e,onMouseEnter) => {
        e.preventDefault();
        setHover(true)
        if(onMouseEnter) {
            onMouseEnter()
        }     
    }

    const onMouseLeave = (e,onMouseLeave) => {
        setHover(false);
        e.preventDefault();
        if(onMouseLeave) {
            onMouseLeave()
        }    
    }

    const onClick = (e, onClick) => {
        e.preventDefault();
        if(onClick) {
            onClick();
        }
        if(props.activable)
            setActive(!active)
    }


    return (
        <button
        style={{
            width: containerHeight * .8,
            height: containerHeight * .8,
            background: active || hover ? theme.getPaletteInterface("primary") : theme.getPaletteInterface("background"),
            borderRadius: containerHeight * .4,
            transition: ".2s filter",
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            outline:"none",
            border: props.borderColor ? `1px solid ${props.borderColor}` : 'none',
            marginLeft: "5px",
            marginRight: "5px",
            fontSize:props.fontSize ? props.fontSize : "none",
            color: props.color? props.color : active || hover ? `white` :theme.getPaletteInterface("primary"),
            boxShadow: active ? `0px 0px 5px 2px ${theme.getPaletteInterface("primary")}, inset 0px 0px 5px 2px black` : `inset 0px 0px 5px 2px black`
        }} 
        onMouseEnter={(e)=>{onMouseEnter(e,props.onMouseEnter)}}
        onMouseLeave={(e)=>{onMouseLeave(e,props.onMouseLeave)}}
        onClick={(e)=>{onClick(e,props.onClick)}}
        >     
            {props.icon} 
            {active && props.children} 
        </button>
    )
}

function NavItem(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <li className="nav-item">
        <a button className="icon-button" 
        onClick={() => {
            setOpen(!open);
            if(props.callback)
                props.callback();
            }
        }>
          {props.icon}
        </a>
        {open && props.children}
      </li>
    );
  }



function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);

    function DropdownItem(props) {
        return (
          <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        );
      }

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
    return (    
        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition
                onEnter={calcHeight}
                in={activeMenu === 'main'}
                timeout={200}
                classNames="menu-primary"
                unmountOnExit>
                <div className="menu">
                    <DropdownItem
                        leftIcon={<PersonIcon/>}
                        rightIcon={<ArrowForward />}
                        goToMenu="profile">
                        <h3>Profile</h3>
                    </DropdownItem>

                    <DropdownItem
                        leftIcon={<SettingsIcon/>}
                        rightIcon={<ArrowForward/>}
                        goToMenu="settings">
                        <h3>Settings</h3>
                    </DropdownItem>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'profile'}
                timeout={200}
                onEnter={calcHeight}
                classNames="menu-secondary"
                unmountOnExit>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowBack/>}>
                        <h3>Go back</h3>
                    </DropdownItem>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={200}
                onEnter={calcHeight}
                classNames="menu-secondary"
                unmountOnExit>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowBack/>}>
                        <h3>Go back</h3>
                    </DropdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

export {
    Header,
    HeaderButton,
    DropdownMenu,
    NavItem
};