import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './tabs.css'
import Tab from './Tab'

export default class Tabs extends Component {

  

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.label,
            children : this.props.children
        }
    }

    onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

    componentDidMount() {
        console.log(this.props.children)
    }

    render() {
        

        let children = this.props.children === undefined ? [] : this.props.children 
        if (!Array.isArray(children)) {
            children = [children]
        }

        return (
        <div className="tabs">
            <ol className="tab-list">
            {children!==undefined && children.map((child) => {
                const { label } = child.props;

                return (
                <Tab
                    activeTab={this.state.activeTab}
                    key={label}
                    label={label}
                    onClick={this.onClickTabItem}
                />
                );
            })}
            </ol>
            <div className="tab-content">
            {children!==undefined && children.map((child) => {
                if (child.props.label !== this.state.activeTab) return undefined;
                return child.props.children;
            })}
            </div>
        </div>
        );
    }
}
