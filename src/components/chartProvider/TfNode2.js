import React, {memo, useState} from 'react'
import { useStoreState,Handle, getOutgoers, isEdge,isNode } from 'react-flow-renderer';
import { getConnectedEdges } from 'react-flow-renderer/dist/ReactFlow';

import * as tf from '@tensorflow/tfjs'

import BlockFinder from '../blockComposer/BlockFinder'

import {get_ops, keyToClassName} from './get_tf_ops'
import {get_default_op_params} from './ops_default_params'
import './tf_css_colors.css'
import './tf_node_css.css'
import { notEqual } from '@tensorflow/tfjs';

const getNodeById = (_nodes, id) => {
    let res = _nodes.filter((node)=>{return node.id === id })
    return res[0]
}

const getIncomers = function (node, elements) {
    if (!isNode(node)) {
        return [];
    }
    var incomersIds = elements.filter(function (e) { return isEdge(e) && e.target === node.id; }).map(function (e) { return e.source; });
    return elements.filter(function (e) { return incomersIds.includes(e.id); });
};

  const preload_ins_outs = (elements, node) => {
    let inc = getIncomers(node, elements)
    let out = getOutgoers(node, elements)

    let inc_ids = []
    let out_ids = []

    for(let i in inc) {
        inc_ids.push(inc[i].id)
    }
    for(let i in out) {
        out_ids.push(out[i].id)
    }
    
    node.data.incomers = inc_ids
    node.data.outgoers = out_ids
}

const TfNode = React.memo(({id, data, selected, computed}) => {
    const nodes = useStoreState((store) => store.nodes);
    const transform = useStoreState((store) => store.transform);
    const edges = useStoreState((store) => store.edges);
    const [shrinked, setShrinked] = React.useState(false);

    const compute = (elements, nodes) => {

    }

    document.addEventListener('keypress',() => {
        selected = false;
    })

    data.reset = () => {
        data = {
            op:data.op,
            key:data.key,
            _key: data._key,
            params:{name:undefined},
            tf_op:undefined,
            tf_function:undefined,
            tf_output:undefined,
            incomers:undefined,
            outgoers:undefined,
            initialized:false,
            type:undefined,
        }
    }

    data.init= () => {
            data.initialized = false;
            data.tf_op = get_ops(data)
            data.params = get_default_op_params(data)
            data.params.name = undefined // clear name to get auto layer indexing from data.tf_op
            data.tf_function = data.tf_op(data.params)
            data.params.name = data.tf_function.name
            data.tf_output = undefined;
            data.incomers = undefined;
            data.outgoers = undefined;
            data.type = undefined;
            data.initialized = true;
    }

    data.preload_ins_outs = (elements) => {
        let n = getNodeById(nodes, id) // get self reference

        let inc = getIncomers(n, elements)
        let out = getOutgoers(n, elements)
    
        let inc_ids = []
        let out_ids = []
    
        for(let i in inc) {
            inc_ids.push(inc[i].id)
        }
        for(let i in out) {
            out_ids.push(out[i].id)
        }
        data.incomers = inc_ids
        data.outgoers = out_ids
    }


    data.apply_on_tf_output = (tf_output) => {
        try {
            data.tf_output = data.tf_op(data.params).apply(tf_output)
        } catch (error) {
            console.error(error)
        }
    }

    // check if node is an input tensor or an input layer
    data.isInput = () => {
        return data.op.match("input")
    }

    data.isBuilt = () => {
        return data.tf_output !== undefined;
    }

    data.build = (elements) => {
        data.params.name = data.tf_function.name
        try {
            
            //get node inputs and outputs
            let n = getNodeById(nodes, id) // self reference
            let inc = getIncomers(n, elements)
            let out = getOutgoers(n, elements)

            // if not connected
            if(inc.length == 0 && out.length == 0) {
                data.type = 'nc'
                alert(`${n.data.params.name} is not connected`)
            } 

            // if connected
            else {

                // if no incomers, node is considerer as an input
                if(inc.length < 1) {
                    data.tf_output = data.tf_function
                    data.type = 'input'
                }
                else 
                // compute for single input
                if(inc.length < 2) {
                    inc[0].data.isBuilt() ?
                    data.apply_on_tf_output(inc[0].data.tf_output)
                    : inc[0].data.build(elements)
                }
                // compute for multiple inputs
                else { 
                    let tf_outputs = []
                    inc.forEach((node)=>{
                        node.data.isBuilt() ?
                        tf_outputs.push(node.data.tf_output)
                        : node.data.build(elements)
                    })
                    data.apply_on_tf_output(tf_outputs)
                }

                // if no outgoers, node is considerer as an output
                if(out.length < 1) {
                    data.type = 'output'
                }
                
                else { 
                    out.forEach((node)=>{
                        node.data.build(elements)
                    })
                }
            }    
        } catch (error) {
            console.log(error)
        }
    }

    // parameters text input onChange event
    data.param_changed = (e, key) => {
        e.preventDefault();

        let tmp = e.target.value;
        const m = e.target.value.match(',')
        if(m) {
            tmp = tmp.split(',')
            tmp.forEach(i => parseInt(i));
        }   
        else 
        if(!isNaN(parseInt(tmp)))
            tmp = parseInt(tmp)
        else
        tmp=String(tmp)
        data.params[key]=tmp;   
    }

    // shrink/expand node UI
    data.paramsBtnClicked = (e) => {
        e.preventDefault();
        setShrinked(!shrinked);
    }

    
    if(!data.initialized) {
        data.init()
    }

    return (
        <div id={data.label + "node"}  className={`${selected || data.focused ? "node_container_selected" : "node_container"}`}>  
            {!data.isInput() &&
            <Handle
                type="target"
                position="top"
                className="handle"
            />}
            <div>
                <div className={`${keyToClassName(data)} node_header`}>                
                        <strong >{data.op}</strong>
                        <input  defaultValue={data.params.name} ></input>        
                </div>
                <button className="shrink_button" onClick={(e)=>{data.paramsBtnClicked(e)}}>
                    <span className="label">Parameters</span>
                    <span className={`${shrinked===true ? "arrow rotated": "arrow"}`}>&#9660;</span>
                </button>        
                
                <div className={`${shrinked===true ? "params_container shrinked": "params_container"}`}>
                    <div style={{ overflowY:"scroll", marginBottom:"15px"}}>
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
            