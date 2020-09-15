import React, { useState } from 'react'
import tf_ops from "../tf_API.json"
import '../chartProvider/provider.css'

export default (props) => {
    const [filterValue, setFilterValue] = useState("")
    const [filterResult, setFilterResult] = useState(tf_ops)
    const [antiBump, setAntiBump] = useState(null)
    const [antiBumpTempo, setAntiBumpTempo] = useState(0)

    let tempo = null;
    
    const findInDict = (value) => {
        let result = {} 
        Object.keys(tf_ops).forEach((key) => {
            Object.keys(tf_ops[key]).forEach((_key) => {
                for(let op in tf_ops[key][_key]) {
                    const match = tf_ops[key][_key][op].toLowerCase().match(value.toLowerCase())
                    if(match) {
                        if(result[key] === undefined)
                            {result[key]={};}

                        if(result[key][_key] === undefined)
                            {result[key][_key] = []}

                        if(!(match.input in result[key][_key])) {
                            result[key][_key].push(tf_ops[key][_key][op]) 
                        }                       
                    }
                }
            })
        })
        setFilterResult(result)
        
    }

    const inputChanged = (value) => {
        clearTimeout(tempo);
        if (value == "") {
            setFilterResult(tf_ops)    
        }    
        else {
            tempo = setTimeout(()=>{findInDict(value)},650)
        }
    }


    return (
        <div className="title">
            <input type="text"
            defaultValue={filterValue} 
            onInput={(e)=>inputChanged(e.target.value)}
            style={{marginTop:"10px", marginBottom:"10px", paddingLeft:"10px", width:"90%", background:"transparent", color:"white", fontWeight:"bold", fontSize:"18px"}}
            > 
            </input>
            <div style={{overflowY:"auto",overflowX:"hidden", alignItems:"center",justifyContent:"center", overFlowX:"hidden", maxHeight:props.maxHeight, width:"100%"}}>
                {   
                    Object.keys(filterResult).map((key) => (
                        <div key={key} style={{boxSizing:"border-box",display:"flex", marginTop:"10px", width:"100%"}}>
                            <div style={{width:"100%", paddingLeft:"1px"}} >
                                <div style={{width:"100%",paddingLeft:"5px",display:"flex", alignItems:"center",fontWeight:"bold",fontSize:"18px", flexGrow:1, height:"32px", background:"#111"}}>{key}</div>
                                <div>
                                {  
                                    Object.keys(filterResult[key]).map((_key) => (
                                        <div style={{boxSizing:"border-box", paddingLeft:"1px",fontWeight:"bold",fontSize:"18px"}}>
                                            <div style={{display:"flex", alignItems:"center", height:"32px", background:"#222", paddingLeft:"5px"}}>{_key}</div>
                                        <div style={{maxWidth:"100%",marginBottom:"10px",borderLeft:"1px dashed #555"}}>
                                            {
                                            filterResult[key][_key].map((op)=> (
                                                <div style={{paddingLeft:"10px", marginRight:"10px", display:"flex", flexDirection:"row", height:"42px", borderBottom:"1px dashed #666"}}>
                                                    <div style={{display:"flex", marginLeft:"12px",flexDirection:"column", flex:1,alignItems:"flex-start", justifyContent:"center",fontSize:"16px",}}>
                                                        {op.split('.')[op.split('.').length-1]}
                                                    </div>
                                                    <div style={{display:"flex",flexDirection:"column",flex:1, alignItems:"flex-end", justifyContent:"center"}}>
                                                        <button onClick={(e)=>{e.preventDefault();props.addBlock({key:key,_key:_key,op:op})}} style={{width:"30px", height:"30px", borderRadius:"50%", background:"#111", color:"white", fontSize:"20px", border:"none", outline:"none"}}>+</button>
                                                    </div>
                                                </div>
                                            ))
                                            }
                                        </div>
                                        </div>
                                    )) 
                                }
                                </div>
                            </div> 
                        </div>
                    ))                   
                }                
            </div>
        </div>
    )
}


