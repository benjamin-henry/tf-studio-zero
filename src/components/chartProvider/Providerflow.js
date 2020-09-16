import React, { Component } from 'react'

import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, MiniMap, Background   } from 'react-flow-renderer';
import Leftbar from './Leftbar'
import './provider.css';
import customNode from './customNode'
import { TfNode } from './TfNode2'

import from_flow from './model_from_flow'


export default class ProviderFlow extends Component {
    constructor(props) {
        super(props);
        this.state={
            leftbarShrinked:false,
            flowOffset: {
                x: 16*16,
                y: 16*4
            },
            elements:[],
            graphStyles: { width: "100%", height: window.innerHeight -  this.props.topbarheight },
            snapGrid: [8,8],
            nodeTypes:{
                "TfNode": TfNode,
            },
            keypressed:[],
            selectedNode:undefined,
        }
    }



    componentDidMount() {
        window.addEventListener('resize',this.onWindowResize)
    }

    handleSelectedNode = (node) => {

    }

    onWindowResize = () => {
        this.setState({graphStyles: { width: "100%", height: window.innerHeight - this.props.topbarheight}})
    }

    setElements = (els) => {
        for(let i in els) {
            if ("source" in els[i]) {
                els[i].animated=true
                els[i].type="default"
            }
        }
        this.setState({elements: els});
    }

    onConnect = (params) => {   
        params.source != params.target ?
            this.setElements(addEdge(params, this.state.elements))
         :
            console.error("linkingerror : Cannot connect a slot to itself") 
    }

    onElementsRemove = (elementsToRemove) => this.setElements(removeElements(elementsToRemove, this.state.elements))

    onElementClick = (event, element) => {
        event.preventDefault();
        element.data.selected = true; 
        if(this.state.selectedNode !== undefined)
            this.state.selectedNode.data.selected = false
        this.setState({selectedNode: element})
    };

    onPaneClick = (event) => {
        event.preventDefault();
        console.log('cliked')
        if(this.state.selectedNode !== undefined) {
            // this.state.selectedNode.data.set_tf_function()
            this.state.selectedNode.data.selected = false;
            this.setState({selectedNode: undefined})
        }
    }

    onLoad = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

    onConnectStart = (args) => {
        // console.log(args.currentTarget.attributes["data-nodeId"],args.currentTarget.attributes["data-handlePose"])
    }

    addElement = (el) => {
        if(this.state.selectedNode !== undefined)
            this.state.selectedNode.data.selected = false
        let max_id = 0
        let els = Array.from(this.state.elements)
        for(let e in els) max_id = max_id < parseInt(els[e].id) ? parseInt(els[e].id) : max_id
        el["id"] = (max_id + 1).toString()
        el.data.params["op"] = el.op
        els.push(el)
        this.setState({selectedNode: el})
        this.setElements(els)
    }

    addElementByName = ({op, key, _key}) => {
        this.addElement({
                id:0,
                type:"TfNode",
                data:{
                    op: op,
                    key:key,
                    _key: _key,
                    params:{name:undefined},
                    tf_op:undefined,
                    tf_function:undefined,
                    tf_output:undefined,
                    incomers:undefined,
                    outgoers:undefined,
                    type:undefined
                },
                selected:true,
                style: {width: "330px"},
                position:{x: this.state.flowOffset.x, y: this.state.flowOffset.y + 200*this.state.elements.length}
            })
    }   

    render() {
        return (
            <div className="providerflow" 
            style={{
                display: "flex",
                height: this.state.graphStyles.height,
                background: "#222222",
            }} >
                
            <ReactFlowProvider>   
                <Leftbar 
                opened={this.props.LeftBarOpen}
                panelTitle={this.props.panelTitle}
                addElementByNameCallback={(r)=>{this.addElementByName(r)}}
                model_from_flow={from_flow}
                elements={this.state.elements}
                >                  
                </Leftbar>
                 
                <div className="reactflow-wrapper" >
                    <ReactFlow
                    onPaneClick={(e) => {this.onPaneClick(e)}}
                    onlyRenderVisibleNodes={true}
                    minZoom={.1}
                    elements={this.state.elements}
                    onElementClick={(e, els)=>{this.onElementClick(e, els)}}
                    onSelect={this.handleSelectedNode}
                    onConnect={this.onConnect}
                    onConnectStart={this.onConnectStart}
                    onElementsRemove={this.onElementsRemove}
                    snapToGrid={true}
                    snapGrid={this.state.snapGrid}
                    onLoad={this.onLoad}
                    style={this.state.graphStyles}
                    nodeTypes={this.state.nodeTypes}
                    >
                        <Controls  />
                        {/* <MiniMap nodeColor={(n) => {
                            if (n.type === 'input') return 'blue';
                            if (n.type === 'default') return "red";
                            if (n.type === 'output') return 'green';
                            if (n.type === 'TfNode') return 'red';
                            if (n.type === 'TfInputNode') return 'orange';
                            if (n.type === 'TfOutputNode') return 'green';
                        }}
                        color="black">
                        </MiniMap> */}
                    </ReactFlow>
                    
                </div>
            </ReactFlowProvider>
            </div>
        )
    }
}

