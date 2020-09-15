import React, {memo, useState} from 'react'
import { useStoreState,Handle } from 'react-flow-renderer';
import { getConnectedEdges } from 'react-flow-renderer/dist/ReactFlow';



const TfOutputNode = React.memo(({data}) => {
    const nodes = useStoreState((store) => store.nodes);
    const transform = useStoreState((store) => store.transform);
    const edges = useStoreState((store) => store.edges);
    const [shrinked, setShrinked] = React.useState(true)


    return (
        <div id={data.label + "node"} style={{border:"1px solid rgba(255,255,255,.1)", borderRadius:"5px", boxShadow:"0px 0px 10px rgba(0,0,0,.5"}}>  
            <Handle
            type="target"
            position="top"
            style={data.inputSlotTyle ? data.inputSlotTyle : { background: '#fff' }}
            className={data.className ? data.className : undefined}
            />
            <div style={data.background ? data.background : { display:"flex", flexDirection:'column'}}>
                <div style={{width:"100%", minHeight:"35px",background:"rgba(0,75,0,.8)", borderTopLeftRadius:"5px", borderTopRightRadius:"5px",flexDirection:"row", display:"flex", justifyContent:"center", alignItems:"center"}}>                
                    <strong style={{fontSize:"18px",display:"flex",flex:3,color:"#FFF",paddingLeft:"10px"}}>{data.op}</strong>
                    <input style={{fontSize:"16px", marginRight:"10px",outline:'none', border:"none", borderBottom:"white 1px solid", textAlign:"right", display:"flex",flex:2, color:"#ccc",paddingRight:"10px",backgroundColor:"transparent",minWidth:"1%", minHeight:"100%"}} defaultValue={data.label} onChange={(e)=>data.label=e.target.value}></input>  
                </div>
            </div>
        </div>
    )
})


export {TfOutputNode}


// { id: '5', type: 'customNode', data: { label: 'Node 5', color:"red" },style:{width:256}, position: { x: this.state.flowOffset.x+400, y: this.state.flowOffset.y+200 } },
            