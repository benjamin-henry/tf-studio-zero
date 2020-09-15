const default_ops_params = {
    "Convolutional" : {
        "tf.layers.conv1d" : {
            filters: 32,
            kernelSize: 3,
            strides: 1,
            padding:"same",
            dataFormat:"channelsLast",
            dilationRate: 1,
            activation:"relu",
            useBias:true,
            kernelRegularizer:null,
            kernelConstraint :null,
            biasRegularizer:null,
            biasConstraint :null,
            activityRegularizer:null,
            inputShape:null,
            dtype:"float32",
            name:"",
            trainable:true
        },
        "tf.layers.conv2d" : {
            filters: 32,
            kernelSize: 3,
            strides: 1,
            padding:"same",
            dataFormat:"channelsLast",
            dilationRate: 1,
            activation:"relu",
            useBias:true,
            kernelRegularizer:null,
            kernelConstraint :null,
            biasRegularizer:null,
            biasConstraint :null,
            activityRegularizer:null,
            inputShape:null,
            dtype:"float32",
            name:"",
            trainable:true
        },
        "tf.layers.conv3d" : {
            filters: 32,
            kernelSize: 3,
            strides: 1,
            padding:"same",
            dataFormat:"channelsLast",
            dilationRate: 1,
            activation:"relu",
            useBias:true,
            kernelRegularizer:null,
            kernelConstraint :null,
            biasRegularizer:null,
            biasConstraint :null,
            activityRegularizer:null,
            inputShape:null,
            dtype:"float32",
            name:"",
            trainable:true
        },
        "tf.layers.conv2dTranspose" : {
            filters: 32,
            kernelSize: 3,
            strides: 1,
            padding:"same",
            dataFormat:"channelsLast",
            dilationRate: 1,
            activation:"relu",
            useBias:true,
            kernelRegularizer:null,
            kernelConstraint :null,
            biasRegularizer:null,
            biasConstraint :null,
            activityRegularizer:null,
            inputShape:null,
            dtype:"float32",
            name:"",
            trainable:true
        },
        "tf.layers.depthwiseConv2d" : {
            filters: 32,
            kernelSize: 3,
            depthMultiplier: 3,
            depthwiseInitialiser:null,
            depthwiseRegularizer:null, 
            strides: 1,
            padding:"same",
            dataFormat:"channelsLast",
            dilationRate: 1,
            activation:"relu",
            useBias:true,
            kernelRegularizer:null,
            kernelConstraint :null,
            biasRegularizer:null,
            biasConstraint :null,
            activityRegularizer:null,
            inputShape:null,
            dtype:"float32",
            name:"",
            trainable:true
        },
        "tf.layers.separableConv2d" : {
            filters_1: 32,
            filters_2: 32,
            kernelSize: 3,
            depthMultiplier: 3,
            depthwiseInitialiser:null,
            depthwiseRegularizer:null, 
            strides: 1,
            padding:"same",
            dataFormat:"channelsLast",
            dilationRate: 1,
            activation:"relu",
            useBias:true,
            kernelRegularizer:null,
            kernelConstraint :null,
            biasRegularizer:null,
            biasConstraint :null,
            activityRegularizer:null,
            inputShape:null,
            dtype:"float32",
            name:"",
            trainable:true
        },
    },
    "Basic": {
        "tf.layers.activation": {
            activation: 'relu',
            inputShape: null
        },
        "tf.layers.dense": {
            units: 32,
            activation: "relu",
            useBias:true,
            kernelRegularizer:null,
            kernelConstraint :null,
            biasRegularizer:null,
            biasConstraint :null,
            activityRegularizer:null,
            inputShape:null,
            dtype:"float32",
            name:"",
            trainable:true,
        },
        "tf.layers.dropout": {
            inputDim: 1000,
            outputDim: 128,
            embeddingsInitializer: null,
            embeddingsRegularizer:null
        },
        "tf.layers.embedding": {
            
        },
        "tf.layers.flatten": {
            
        },
        "tf.layers.permute": {
            
        },
        "tf.layers.repeatvector": {
            
        },
        "tf.layers.reshape": {
            
        },
        "tf.layers.spatialdropout1d": {
            
        },
    },
    "Inputs": {
        "tf.layers.inputLayer": {
            inputShape: [28,28,3],
            dtype: 'float32'
        },
        "tf.input": {
            shape: [28,28,3],
            dtype: "float32"
        }
    },
   
}



const get_default_op_params = ({key, _key, op}) => {
    if (default_ops_params[_key.replace(' ','_')][op] !== undefined)
        return default_ops_params[_key.replace(' ','_')][op]
    return {}
}

export {
    default_ops_params, get_default_op_params
}