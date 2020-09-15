import React from 'react'
import * as tf from '@tensorflow/tfjs'

// import { useStoreState } from 'react-flow-renderer';
import { getConnectedEdges, getOutgoers } from 'react-flow-renderer/dist/ReactFlow';
import {get_ops,keyToClassName} from './get_tf_ops'


const getInputNodes = (nodes) => {
    let inputs = []
    nodes.map((node)=>{
        
    })
    console.log(inputs)
}

// const applyNext = (x) => {
//     let results= []
//     let next = []

//     for (let i in nodes) {
//         console.log(nodes[i].data.tf_function)
//     }
// }

const getNodeById = (nodes, id) => {
    let result = []
    
    nodes.forEach((node) => {
        if(node.id == id) return node
    })
}

export default (elements ,nodes) => {
    let model_inputs = []
    let model_outputs = []

    nodes.map((node)=> {
        if(node.data.op.match('input')) {

            node.data.tf_val = node.data.tf_function
            model_inputs.push(node)
        }
    })

    let result = []
    for (let i in model_inputs) {
        let next = getOutgoers(model_inputs[i], elements)
        
        for(let n in next) {  
            let f = get_ops(next[n].data)
            const res =  next[0].data.compute(model_inputs[i].data.tf_function)
            result.push(res)
        }
    }
    
    const x = model_inputs[0].data.tf_function
    // let next = getOutgoers(model_inputs[0], elements)

    const model = tf.model({inputs:x, outputs:result[result.length-1]})
    model.summary()
}