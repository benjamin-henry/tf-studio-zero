import React, { Component } from 'react'
import { useStoreState } from 'react-flow-renderer';
import { getConnectedEdges } from 'react-flow-renderer/dist/ReactFlow';

import BlockFinder from '../blockComposer/BlockFinder'
import * as tf from '@tensorflow/tfjs'
import model_from_flow from './model_from_flow'


export default  (props) => {
    const nodes = useStoreState((store) => store.nodes);
    const transform = useStoreState((store) => store.transform);
    const edges = useStoreState((store) => store.edges);

    const [open, setOpen] = React.useState(props.open);

    const getConnections = () => {
      return getConnectedEdges(nodes, edges)
    }

    const getNodeSources = (node, connections) => {
      let srcs = []
      connections.forEach((conn) => {
        if (conn.target == node.id) {
          srcs.push(conn.source)
        }
      })
      return srcs.join(', ')
    }

    const getNodeTargets = (node, connections) => {
      let srcs = []
      connections.forEach((conn) => {
        if (conn.source == node.id) {
          srcs.push(conn.target)
        }
      })
      return srcs.join(', ')
    }


    return (
        <aside id="leftbar" className="left">
          <div className="description">
            <span id="leftbarspan" style={{ fontSize:"16px"}}>{props.panelTitle}</span>
          </div>
          
            <BlockFinder maxHeight={200} addBlock={props.addElementByNameCallback}/>
            <button onClick={(e)=>{e.preventDefault();model_from_flow(props.elements, nodes)}}>build</button>


          {/* <div className="title">Zoom & pan transform</div>
          <div className="transform">
            [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
          </div>
          <div className="title">Nodes</div>
          {nodes.map((node) => (
            <div key={node.id} className="nodeConnections">
            {node.id} - {node.data.label} - from : {getNodeSources(node, getConnections())} to : {getNodeTargets(node, getConnections())}
            </div>
          ))}
          <div className="model-section">
            
          </div> */}
        </aside>
    )
}
