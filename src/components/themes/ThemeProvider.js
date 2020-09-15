import React, { Component } from 'react'
import {Theme01} from './Theme01'


const ThemeContext = React.createContext();

class ThemeProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: Theme01,
            type: "light"
        }
    }

    setType = (type) => {
        this.setState({type:type})
    }

    getPalette = () => {
        return this.state.theme["palette"]
    }

    getPaletteInterface = (name) => {
        return this.state.theme["palette"][name][this.state.type]
    }

    getFontColor = () => {
        return this.state.theme["palette"]["fontColors"][this.state.type]
    }

    toggle = () => {
        this.state.type === 'dark' ? this.setType("light") : this.setType("dark");
    }

    componentDidMount() {
        const noPref = window.matchMedia('(prefers-color-scheme: no-preference)')
        const darkPref = window.matchMedia('(prefers-color-scheme: dark)')

        if(noPref.matches){  
            this.setType('light');
        } else if(darkPref.matches){  
            this.setType('dark');
            darkPref.addEventListener('change', (e) => {
                e.preventDefault();
                this.state.type === 'dark' ? this.setType("light") : this.setType("dark");
            })
        } 
        else this.setType("light");
    }
        
    render() {
        return (
            <ThemeContext.Provider value={{
                    values:this.state.theme,
                    layout:this.state.theme["layout"],
                    type: this.state.type,
                    toggle: this.toggle,
                    setType: this.setType,
                    getPaletteInterface: this.getPaletteInterface,
                    getFontColor: this.getFontColor,
                    getPalette: this.getPalette
                }}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}

const useTheme = () => {
    const theme = React.useContext(ThemeContext);
    if (theme == null) {
      throw new Error('useAuth() called outside of a AuthProvider?');
    }
    return theme;
};

export {ThemeProvider, useTheme, ThemeContext}
