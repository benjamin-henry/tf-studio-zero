import React, {memo, useState} from 'react'
import { useStoreState,Handle } from 'react-flow-renderer';
import { getConnectedEdges } from 'react-flow-renderer/dist/ReactFlow';



const TfInputNode = React.memo(({data}) => {
    const nodes = useStoreState((store) => store.nodes);
    const transform = useStoreState((store) => store.transform);
    const edges = useStoreState((store) => store.edges);
    const [shrinked, setShrinked] = React.useState(true)


    return (
        <div id={data.label + "_node"} style={{border:"1px solid rgba(255,255,255,.1)", borderRadius:"5px", boxShadow:"0px 0px 10px rgba(0,0,0,.5"}}>  
            <div style={data.background ? data.background : { display:"flex", flexDirection:'column'}}>
                <div style={{width:"100%", minHeight:"35px",background:"rgba(240,100,0,.8)", borderTopLeftRadius:"5px", borderTopRightRadius:"5px",flexDirection:"row", display:"flex", justifyContent:"center", alignItems:"center"}}>                
                        <strong style={{fontSize:"18px",display:"flex",flex:3,color:"#FFF",paddingLeft:"10px"}}>{data.op}</strong>
                        <input style={{fontSize:"16px",outline:'none', marginRight:"10px", border:"none", borderBottom:"white 1px solid", textAlign:"right", display:"flex",flex:2, color:"#ccc",paddingRight:"10px",backgroundColor:"transparent",minWidth:"1%", minHeight:"100%"}} defaultValue={data.label} onChange={(e)=>data.label=e.target.value}></input>           
                </div>
                <div style={{width:"100%", minHeight:"25px",paddingTop:"10px",paddingBottom:"10px",background:"#222", opacity:.9, flexDirection:"row", display:"flex", alignItems:"stretch"  }}>
                    <div style={{flex:1, paddingLeft:"10px"}}>
                        <span style={{color:"#eee", fontSize:"18px"}}>Parameters</span>  
                    </div>
                    <div style={{flex:1,textAlign:'right', marginRight:"10px"}}>
                        <button onClick={(e)=>{console.log(e)}} style={{background:"none", outlined:"none", border: "none", color:"#eee ", fontSize:"14px", transform: data.shrinked ? "rotate(-90deg)" : "rotate(0deg)"}}>&#9664;</button>
                    </div>
                            
                </div>
                <div style={{width:"100%",background:"#111", opacity:.85 , paddingBottom:"10px"}}>
                    <div style={{margin:"10px"}}>
                        {
                            Object.keys(data.params).map((key) => (
                                <div style={{margin:"5px"}}>
                                <div key={data.label+"_"+key} style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", height:"30px", margin:"5px"}}>
                                    <div style={{flex:1, display:"flex", fontSize:"18x",color:"white", alignItems:"flex-start", justifyContent:"flex-start"}}>{key} : </div>
                                    <input type="text" style={{fontWeight:"bold", border:"none", borderBottom:"1px solid white", color:"white", fontSize:"16px", background:"transparent", fontColor:"white",flex:1, minWidth:"1%",outline:"none"}} defaultValue={data.params[key]} onChange={(e)=>{data.params[key]=e.target.value;}}></input>
                                </div>
                                <div style={{width:"100%", height:"1px", borderTop:"1px solid white", opacity:.5, paddingTop:"5px", paddingBottom:"5px"}}></div>
                            </div>
                        ))
                        }
                    </div>    
                </div>
                <button style={{color:"white",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:'center',outline:"none", width:"100%",background:"#222", opacity:.85,height:"30px",borderBottomRightRadius:"5px",borderTopLeftRadius:"5px", border:"1px solid rgba(255,255,255,.1)"}}>
                        <span style={{flex:1}}>
                            ADD
                        </span>
                        <span style={{flex:"1"}}>
                            Layer
                        </span>
                </button>
            </div>
            <Handle
                type="source"
                position="bottom"
                style={data.outputSlotTyle ? data.outputSlotTyle : { background: '#fff' }}
                className={data.className ? data.className : undefined}
            />
        </div>
    )
})


export {TfInputNode}


// { id: '5', type: 'customNode', data: { label: 'Node 5', color:"red" },style:{width:256}, position: { x: this.state.flowOffset.x+400, y: this.state.flowOffset.y+200 } },
            