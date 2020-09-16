import React from 'react'
import * as tf from '@tensorflow/tfjs'

import ReactFlow, { useStoreState, isNode, isEdge} from 'react-flow-renderer';
import { getConnectedEdges , getOutgoers} from 'react-flow-renderer/dist/ReactFlow';
import {get_ops,keyToClassName} from './get_tf_ops'

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

const computeFlow = (elements, nodes) => {
    nodes.map((node)=> {        
        node.data.init();
    })
    nodes[0].data.build(elements)

    let inputs = nodes.filter((node)=>{return node.data.type === 'input'}).map((input)=>{return input.data.tf_output})
    let outputs = nodes.filter((node)=>{return node.data.type === 'output'}).map((output)=>{return output.data.tf_output})
   
    
    // const input_sympbolic_tensors = inputs.map((input)=>{return input.data.tf_output})
    // const output_sympbolic_tensors = outputs.map((output)=>{return output.data.tf_output})

    return {inputs, outputs}


}


export default (elements ,nodes) => {

    let flow_io = computeFlow(elements, nodes);
    const model = tf.model(flow_io)
    model.summary()
}