export const Theme01 = {
  "palette": {
    "type":"dark",
      "common" : {
        "black": "#000",
        "white": "#fff"
      },
      "info": {
        "dark": "#1976d2", 
        "light": "#64b5f6", 
        "main": "#2196f3",
        "contrastText": "#fff",
      }, 
      "success": {
        "dark": "#388e3c", 
        "light": "#81c784", 
        "main": "#4caf50",
        "contrastText": "#fff",
      }, 
      "primary": {
        "dark": "#1166AA", 
        "light": "#a6d4fa", 
        "main": "#90caf9",
        "contrastText": "#fff",
      }, 
      "warning": {
        "dark": "#f57c00", 
        "light": "#ffb74d", 
        "main": "#ff9800",
        "contrastText": "#fff",
      }, 
      "error": {
        "dark": "#d32f2f", 
        "light": "#e57373", 
        "main": "#f44336",
        "contrastText": "#fff",
      }, 
      "secondary": {
        "dark": "#aa0000", 
        "light": "#f6a5c0", 
        "main": "#f48fb1",
        "contrastText": "#fff",
      },
      "fontColors" : {
        "dark": "#ffffff", 
        "light": "#f6a5c0",
        "contrastText": "#fff",
      },
      "background": {
        "dark": "#111", 
        "light": "#555555",
      }
    },
    layout: {
      nav_layout: {
        nav_container: {
          display:"flex",
          flexDirection:"row", 
          width:"100%", 
          boxSizing:"border-box",
          height: "50px"
        },
        nav: {
          display:"flex",
          height:"100%",
          alignItmes: "center",
          justifyContent: "center"
        },
        navLeft: {
          maxHeight: "100%",
          display: "flex",
          alignItems:"center",
          justifyContent: "flex-start",
          flex:2,
          marginLeft:"12px"
        },
        navCenter: {
          maxHeight: "100%",
          display: "flex",
          alignItems:"center",
          justifyContent: "center"
        },
        navRight: {
          maxHeight: "100%",
          display: "flex",
          alignItems:"center",
          justifyContent: "flex-end",
          flex:2,
          marginRight:"12px"
        }   
      }  
    }
}

