import React, {memo, useState} from 'react'
import { useStoreState,Handle } from 'react-flow-renderer';
import { getConnectedEdges } from 'react-flow-renderer/dist/ReactFlow';

import * as tf from '@tensorflow/tfjs'

import BlockFinder from '../blockComposer/BlockFinder'

import {get_ops,keyToClassName} from './get_tf_ops'
import {get_default_op_params} from './ops_default_params'
import './tf_css_colors.css'
import './tf_node_css.css'

const TfNode = React.memo(({data}) => {
    const nodes = useStoreState((store) => store.nodes);
    const transform = useStoreState((store) => store.transform);
    const edges = useStoreState((store) => store.edges);
    const [shrinked, setShrinked] = React.useState(true);
    
    data.tf_op = get_ops(data)
    data.params = get_default_op_params(data)
    data.params.tfOp = data.op  

    data.set_tf_function = () => {
        data.tf_function = data.tf_op(data.params)
        console.log(data.tf_function)
        data.params.name = data.tf_function.name
        // data.label = data.tf_function.name
    }

    data.compute = (input) => {
        return data.tf_op(data.params).apply(input)
    }

    data.param_changed = (e, key) => {
        e.preventDefault();
        let tmp = e.target.value;
        const m = e.target.value.match(',')
        if(m) {
            tmp = tmp.split(',')
            tmp.forEach(i => parseInt(i));
        }   
        else
            tmp = parseInt(tmp)

        data.params[key]=tmp;   
    }

    data.paramsBtnClicked = (e) => {
        e.preventDefault();
        setShrinked(!shrinked);
    }

    data.isInput = () => {
        return data.op.match("input")
    }

    return (
        <div id={data.label + "node"}  className={`node_container ${data.selected ? "selected" : ""}`}>  
            {!data.isInput() &&<Handle
                type="target"
                position="top"
                className="handle"
            />}
            <div>
                <div className={`${keyToClassName(data)} node_header`}>                
                        <strong >{data.op}</strong>
                        <input defaultValue={data.tf_function.name} onChange={(e)=> {data.params.name=e.target.value;data.label=e.target.value;}}></input>        
                </div>
                <button className="shrink_button" onClick={(e)=>{data.paramsBtnClicked(e)}}>
                    <span className="label">Parameters</span>
                    <span className={`${shrinked===true ? "arrow rotated": "arrow"}`}>&#9660;</span>
                </button>        
                
                <div className={`${shrinked===true ? "params_container shrinked": "params_container"}`}>
                    <div style={{ overflowY:"scroll", marginBottom:"12px"}}>
                    {  
                        Object.keys(data.params).map((key) => (
                            <div style={{margin:"5px"}}>
                                <div key={data.label+"_"+key} style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center",  marginLeft:"5px", marginRight:"5px"}}>
                                    <div style={{flex:1, display:"flex", fontSize:"18x",color:"white", alignItems:"flex-start", justifyContent:"flex-start"}}>{key} : </div>
                                    <input type="text" onChange={(e)=> {data.param_changed(e, key)}}  style={{border:"none", borderBottom:"1px solid white", color:"white", fontSize:"13px", background:"transparent", fontColor:"white",flex:1, minWidth:"1%",outline:"none"}} defaultValue={data.params[key]}></input>
                                </div>
                                <div style={{width:"100%", height:"1px", borderTop:"1px solid white", opacity:.5, paddingTop:"5px", paddingBottom:"5px"}}></div>
                                
                            </div>
                        ))
                    }   
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position="bottom"
                className="handle"
            />
        </div>
    )
})


export {TfNode}


// { id: '5', type: 'customNode', data: { label: 'Node 5', color:"red" },style:{width:256}, position: { x: this.state.flowOffset.x+400, y: this.state.flowOffset.y+200 } },
            