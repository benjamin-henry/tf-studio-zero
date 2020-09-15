import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    return (
        <>
        <Handle
            type="target"
            position="left"
            style={{ background: '#fff' }}
            onConnect={(params) => console.log('handle onConnect', params)}
        />
        <div style={{background: data.color, height:"100px", display:"flex"}}>
            {/* Custom content here */}
            Node: <strong>{data.color ? data.color : "pass data props"}</strong>
        </div>
        {/* <input className="nodrag" type="color" onChange={data.onChange ? data.onChange : undefined} defaultValue={data.color ? data.color : "red"} /> */}
        <Handle type="source" position="right" id="a" style={{ top: 10, background: '#fff', height:"10px", width:"5px", borderBottomLeftRadius:"5px",borderTopLeftRadius:"5px" }} />
        <Handle type="source" position="right" id="b" style={{ bottom: 10, top: 'auto', background: '#fff' }} />
        </>
    );
});