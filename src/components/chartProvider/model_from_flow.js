import React from 'react'
import * as tf from '@tensorflow/tfjs'

const computeFlow = (elements, nodes) => {
    nodes.map((node)=> {        
        if(!node.data.initialized)node.data.init();
    })
    nodes[0].data.build(elements)

    let inputs = nodes.filter((node)=>{return node.data.type === 'input'}).map((input)=>{return input.data.tf_output})
    let outputs = nodes.filter((node)=>{return node.data.type === 'output'}).map((output)=>{return output.data.tf_output})

    return {inputs, outputs}
}


export default (elements ,nodes) => {
    const flow_io = computeFlow(elements, nodes);
    const model = tf.model(flow_io)
    model.summary()
}