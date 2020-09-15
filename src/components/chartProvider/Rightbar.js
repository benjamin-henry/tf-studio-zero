import React, { Component } from 'react'
import { useStoreState } from 'react-flow-renderer';
import { getConnectedEdges } from 'react-flow-renderer/dist/ReactFlow';

export default  () => {
    const nodes = useStoreState((store) => store.nodes);
    const transform = useStoreState((store) => store.transform);
    const edges = useStoreState((store) => store.edges);

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

    const closeRightbar = () => {
       const bar = document.getElementById('rightbar')
       bar.style.width = "0"
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
        <aside id="rightbar" className="right">
          <div className="description">
            <span>Left Bar</span>
            <button onClick={()=>{
              let bar = document.getElementById("rightbar")
              bar.style.maxWidth = "0px"
              bar.style.opacity = "0"
            //   bar.style.left = "0px"
              // bar.style.display="none"
              // bar.style.minWidth = 0
            }}>X</button>
          </div>
          <div className="title">Zoom & pan transform</div>
          <div className="transform">
            [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
          </div>
          <div className="title">Nodes</div>
          {nodes.map((node) => (
            <div key={node.id} className="nodeConnections">
            {node.id} - {node.data.label} - from : {getNodeSources(node, getConnections())} to : {getNodeTargets(node, getConnections())}
            </div>
          ))}
        </aside>
    )
}
