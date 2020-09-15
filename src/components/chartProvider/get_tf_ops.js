import React from 'react';
import * as tf from '@tensorflow/tfjs'


const keyToClassName = ({key,_key}) => {
    let nkey = String(key).replace(' ','_')
    let _nkey = String(_key).replace(' ','_')
    return `${nkey} ${_nkey}`
}

const get_ops =  ({op}) => {
    const ops = {
        "tf.tensor": tf.tensor,
        "tf.scalar": tf.scalar,
        "tf.tensor1d": tf.tensor1d,
        "tf.tensor2d": tf.tensor2d,
        "tf.tensor3d": tf.tensor3d,
        "tf.tensor4d": tf.tensor4d,
        "tf.tensor5d": tf.tensor5d,
        "tf.tensor6d": tf.tensor6d,
        "tf.buffer": tf.buffer,
        "tf.clone": tf.clone,
        "tf.complex": tf.complex,
        "tf.eye": tf.eye,
        "tf.fill": tf.fill,
        "tf.imag": tf.imag,
        "tf.linspace": tf.linspace,
        "tf.oneHot": tf.oneHot,
        "tf.ones": tf.ones,
        "tf.onesLike": tf.onesLike,
        "tf.print": tf.print,
        "tf.range": tf.range,
        "tf.real": tf.real,
        "tf.truncatedNormal": tf.truncatedNormal,
        "tf.variable": tf.variable,
        "tf.zeros": tf.zeros,
        "tf.zerosLike": tf.zerosLike,
        "tf.batchToSpaceND": tf.batchToSpaceND,
        "tf.broadcastTo": tf.broadcastTo,
        "tf.cast": tf.cast,
        "tf.depthToSpace": tf.depthToSpace,
        "tf.expandDims": tf.expandDims,
        "tf.pad": tf.pad,
        "tf.reshape": tf.reshape,
        "tf.setdiff1dAsync": tf.setdiff1dAsync,
        "tf.spaceToBatchND": tf.spaceToBatchND,
        "tf.squeeze": tf.squeeze,
        "tf.booleanMaskAsync": tf.booleanMaskAsync,
        "tf.concat": tf.concat,
        "tf.gather": tf.gather,
        "tf.reverse": tf.reverse,
        "tf.slice": tf.slice,
        "tf.split": tf.split,
        "tf.stack": tf.stack,
        "tf.tile": tf.tile,
        "tf.unstack": tf.unstack,
        "tf.multinomial": tf.multinomial,
        "tf.randomGamma": tf.randomGamma,
        "tf.randomNormal": tf.randomNormal,
        "tf.randomUniform": tf.randomUniform,
        "tf.sequential": tf.sequential,
        "tf.model": tf.model,
        "tf.input": tf.input,
        "tf.loadGraphModel": tf.loadGraphModel,
        "tf.loadLayersModel": tf.loadLayersModel,
        "tf.io.browserFiles": tf.io.browserFiles,
        "tf.io.http": tf.io.http,
        "tf.io.copyModel": tf.io.copyModel,
        "tf.io.listModels": tf.io.listModels,
        "tf.io.moveModel": tf.io.moveModel,
        "tf.io.removeModel": tf.io.removeModel,
        "tf.SymbolicTensor": tf.SymbolicTensor,
        "tf.deregisterOp": tf.deregisterOp,
        "tf.registerOp": tf.registerOp,
        "tf.layers.elu": tf.layers.elu,
        "tf.layers.leakyReLU": tf.layers.leakyReLU,
        "tf.layers.prelu": tf.layers.prelu,
        "tf.layers.reLU": tf.layers.reLU,
        "tf.layers.softmax": tf.layers.softmax,
        "tf.layers.thresholdedReLU": tf.layers.thresholdedReLU,
        "tf.layers.activation": tf.layers.activation,
        "tf.layers.dense": tf.layers.dense,
        "tf.layers.dropout": tf.layers.dropout,
        "tf.layers.embedding": tf.layers.embedding,
        "tf.layers.flatten": tf.layers.flatten,
        "tf.layers.permute": tf.layers.permute,
        "tf.layers.repeatVector": tf.layers.repeatVector,
        "tf.layers.reshape": tf.layers.reshape,
        "tf.layers.spatialDropout1d": tf.layers.spatialDropout1d,
        "tf.layers.conv1d": tf.layers.conv1d,
        "tf.layers.conv2d": tf.layers.conv2d,
        "tf.layers.conv2dTranspose": tf.layers.conv2dTranspose,
        "tf.layers.conv3d": tf.layers.conv3d,
        "tf.layers.cropping2D": tf.layers.cropping2D,
        "tf.layers.depthwiseConv2d": tf.layers.depthwiseConv2d,
        "tf.layers.separableConv2d": tf.layers.separableConv2d,
        "tf.layers.upSampling2d": tf.layers.upSampling2d,
        "tf.layers.add": tf.layers.add,
        "tf.layers.average": tf.layers.average,
        "tf.layers.concatenate": tf.layers.concatenate,
        "tf.layers.dot": tf.layers.dot,
        "tf.layers.maximum": tf.layers.maximum,
        "tf.layers.minimum": tf.layers.minimum,
        "tf.layers.multiply": tf.layers.multiply,
        "tf.layers.batchNormalization": tf.layers.batchNormalization,
        "tf.layers.layerNormalization": tf.layers.layerNormalization,
        "tf.layers.averagePooling1d": tf.layers.averagePooling1d,
        "tf.layers.averagePooling2d": tf.layers.averagePooling2d,
        "tf.layers.averagePooling3d": tf.layers.averagePooling3d,
        "tf.layers.globalAveragePooling1d": tf.layers.globalAveragePooling1d,
        "tf.layers.globalAveragePooling2d": tf.layers.globalAveragePooling2d,
        "tf.layers.globalMaxPooling1d": tf.layers.globalMaxPooling1d,
        "tf.layers.globalMaxPooling2d": tf.layers.globalMaxPooling2d,
        "tf.layers.maxPooling1d": tf.layers.maxPooling1d,
        "tf.layers.maxPooling2d": tf.layers.maxPooling2d,
        "tf.layers.maxPooling3d": tf.layers.maxPooling3d,
        "tf.layers.gru": tf.layers.gru,
        "tf.layers.gruCell": tf.layers.gruCell,
        "tf.layers.lstm": tf.layers.lstm,
        "tf.layers.lstmCell": tf.layers.lstmCell,
        "tf.layers.rnn": tf.layers.rnn,
        "tf.layers.simpleRNN": tf.layers.simpleRNN,
        "tf.layers.simpleRNNCell": tf.layers.simpleRNNCell,
        "tf.layers.stackedRNNCells": tf.layers.stackedRNNCells,
        "tf.layers.bidirectional": tf.layers.bidirectional,
        "tf.layers.timeDistributed": tf.layers.timeDistributed,
        "tf.layers.Layer": tf.layers.Layer,
        "tf.layers.Layer.apply": tf.layers.Layer.apply,
        "tf.layers.inputLayer": tf.layers.inputLayer,
        "tf.layers.zeroPadding2d": tf.layers.zeroPadding2d,
        "tf.layers.alphaDropout": tf.layers.alphaDropout,
        "tf.layers.gaussianDropout": tf.layers.gaussianDropout,
        "tf.layers.gaussianNoise": tf.layers.gaussianNoise,
        "tf.layers.masking": tf.layers.masking,
        "tf.add": tf.add,
        "tf.sub": tf.sub,
        "tf.mul": tf.mul,
        "tf.div": tf.div,
        "tf.addN": tf.addN,
        "tf.divNoNan": tf.divNoNan,
        "tf.floorDiv": tf.floorDiv,
        "tf.maximum": tf.maximum,
        "tf.minimum": tf.minimum,
        "tf.mod": tf.mod,
        "tf.pow": tf.pow,
        "tf.squaredDifference": tf.squaredDifference,
        "tf.abs": tf.abs,
        "tf.acos": tf.acos,
        "tf.acosh": tf.acosh,
        "tf.asin": tf.asin,
        "tf.asinh": tf.asinh,
        "tf.atan": tf.atan,
        "tf.atan2": tf.atan2,
        "tf.atanh": tf.atanh,
        "tf.ceil": tf.ceil,
        "tf.clipByValue": tf.clipByValue,
        "tf.cos": tf.cos,
        "tf.cosh": tf.cosh,
        "tf.dilation2d": tf.dilation2d,
        "tf.elu": tf.elu,
        "tf.erf": tf.erf,
        "tf.exp": tf.exp,
        "tf.expm1": tf.expm1,
        "tf.floor": tf.floor,
        "tf.isFinite": tf.isFinite,
        "tf.isInf": tf.isInf,
        "tf.isNaN": tf.isNaN,
        "tf.leakyRelu": tf.leakyRelu,
        "tf.log": tf.log,
        "tf.log1p": tf.log1p,
        "tf.logSigmoid": tf.logSigmoid,
        "tf.neg": tf.neg,
        "tf.prelu": tf.prelu,
        "tf.reciprocal": tf.reciprocal,
        "tf.relu": tf.relu,
        "tf.relu6": tf.relu6,
        "tf.round": tf.round,
        "tf.rsqrt": tf.rsqrt,
        "tf.selu": tf.selu,
        "tf.sigmoid": tf.sigmoid,
        "tf.sign": tf.sign,
        "tf.sin": tf.sin,
        "tf.sinh": tf.sinh,
        "tf.softplus": tf.softplus,
        "tf.sqrt": tf.sqrt,
        "tf.square": tf.square,
        "tf.step": tf.step,
        "tf.tan": tf.tan,
        "tf.tanh": tf.tanh,
        "tf.dot": tf.dot,
        "tf.matMul": tf.matMul,
        "tf.norm": tf.norm,
        "tf.outerProduct": tf.outerProduct,
        "tf.transpose": tf.transpose,
        "tf.avgPool3d": tf.avgPool3d,
        "tf.conv1d": tf.conv1d,
        "tf.conv2d": tf.conv2d,
        "tf.conv2dTranspose": tf.conv2dTranspose,
        "tf.conv3d": tf.conv3d,
        "tf.conv3dTranspose": tf.conv3dTranspose,
        "tf.depthwiseConv2d": tf.depthwiseConv2d,
        "tf.maxPool3d": tf.maxPool3d,
        "tf.maxPoolWithArgmax": tf.maxPoolWithArgmax,
        "tf.pool": tf.pool,
        "tf.separableConv2d": tf.separableConv2d,
        "tf.all": tf.all,
        "tf.any": tf.any,
        "tf.argMax": tf.argMax,
        "tf.argMin": tf.argMin,
        "tf.logSumExp": tf.logSumExp,
        "tf.max": tf.max,
        "tf.mean": tf.mean,
        "tf.min": tf.min,
        "tf.prod": tf.prod,
        "tf.sum": tf.sum,
        "tf.batchNorm": tf.batchNorm,
        "tf.localResponseNormalization": tf.localResponseNormalization,
        "tf.logSoftmax": tf.logSoftmax,
        "tf.moments": tf.moments,
        "tf.softmax": tf.softmax,
        "tf.sparseToDense": tf.sparseToDense,
        "tf.image.cropAndResize": tf.image.cropAndResize,
        "tf.image.flipLeftRight": tf.image.flipLeftRight,
        "tf.image.nonMaxSuppressionAsync": tf.image.nonMaxSuppressionAsync,
        "tf.image.nonMaxSuppressionPadded": tf.image.nonMaxSuppressionPadded,
        "tf.image.nonMaxSuppressionPaddedAsync": tf.image.nonMaxSuppressionPaddedAsync,
        "tf.image.nonMaxSuppressionWithScore": tf.image.nonMaxSuppressionWithScore,
        "tf.image.nonMaxSuppressionWithScoreAsync": tf.image.nonMaxSuppressionWithScoreAsync,
        "tf.image.resizeBilinear": tf.image.resizeBilinear,
        "tf.image.resizeNearestNeighbor": tf.image.resizeNearestNeighbor,
        "tf.image.rotateWithOffset": tf.image.rotateWithOffset,
        "tf.basicLSTMCell": tf.basicLSTMCell,
        "tf.multiRNNCell": tf.multiRNNCell,
        "tf.equal": tf.equal,
        "tf.greater": tf.greater,
        "tf.greaterEqual": tf.greaterEqual,
        "tf.less": tf.less,
        "tf.lessEqual": tf.lessEqual,
        "tf.logicalAnd": tf.logicalAnd,
        "tf.logicalNot": tf.logicalNot,
        "tf.logicalOr": tf.logicalOr,
        "tf.logicalXor": tf.logicalXor,
        "tf.notEqual": tf.notEqual,
        "tf.where": tf.where,
        "tf.whereAsync": tf.whereAsync,
        "tf.cumsum": tf.cumsum,
        "tf.spectral.fft": tf.spectral.fft,
        "tf.spectral.ifft": tf.spectral.ifft,
        "tf.spectral.irfft": tf.spectral.irfft,
        "tf.spectral.rfft": tf.spectral.rfft,
        "tf.gatherND": tf.gatherND,
        "tf.scatterND": tf.scatterND,
        "tf.stridedSlice": tf.stridedSlice,
        "tf.inTopKAsync": tf.inTopKAsync,
        "tf.topk": tf.topk,
        "tf.unsortedSegmentSum": tf.unsortedSegmentSum,
        "tf.movingAverage": tf.movingAverage,
        "tf.dropout": tf.dropout,
        "tf.signal.frame": tf.signal.frame,
        "tf.signal.hammingWindow": tf.signal.hammingWindow,
        "tf.signal.hannWindow": tf.signal.hannWindow,
        "tf.signal.stft": tf.signal.stft,
        "tf.linalg.bandPart": tf.linalg.bandPart,
        "tf.linalg.gramSchmidt": tf.linalg.gramSchmidt,
        "tf.linalg.qr": tf.linalg.qr,
        "tf.grad": tf.grad,
        "tf.grads": tf.grads,
        "tf.customGrad": tf.customGrad,
        "tf.valueAndGrad": tf.valueAndGrad,
        "tf.valueAndGrads": tf.valueAndGrads,
        "tf.variableGrads": tf.variableGrads,
        "tf.train.sgd": tf.train.sgd,
        "tf.train.momentum": tf.train.momentum,
        "tf.train.adagrad": tf.train.adagrad,
        "tf.train.adadelta": tf.train.adadelta,
        "tf.train.adam": tf.train.adam,
        "tf.train.adamax": tf.train.adamax,
        "tf.train.rmsprop": tf.train.rmsprop,
        "tf.losses.absoluteDifference": tf.losses.absoluteDifference,
        "tf.losses.computeWeightedLoss": tf.losses.computeWeightedLoss,
        "tf.losses.cosineDistance": tf.losses.cosineDistance,
        "tf.losses.hingeLoss": tf.losses.hingeLoss,
        "tf.losses.huberLoss": tf.losses.huberLoss,
        "tf.losses.logLoss": tf.losses.logLoss,
        "tf.losses.meanSquaredError": tf.losses.meanSquaredError,
        "tf.losses.sigmoidCrossEntropy": tf.losses.sigmoidCrossEntropy,
        "tf.losses.softmaxCrossEntropy": tf.losses.softmaxCrossEntropy,
        "tf.constraints.maxNorm": tf.constraints.maxNorm,
        "tf.constraints.minMaxNorm": tf.constraints.minMaxNorm,
        "tf.constraints.nonNeg": tf.constraints.nonNeg,
        "tf.constraints.unitNorm": tf.constraints.unitNorm,
        "tf.initializers.constant": tf.initializers.constant,
        "tf.initializers.glorotNormal": tf.initializers.glorotNormal,
        "tf.initializers.glorotUniform": tf.initializers.glorotUniform,
        "tf.initializers.heNormal": tf.initializers.heNormal,
        "tf.initializers.heUniform": tf.initializers.heUniform,
        "tf.initializers.identity": tf.initializers.identity,
        "tf.initializers.leCunNormal": tf.initializers.leCunNormal,
        "tf.initializers.leCunUniform": tf.initializers.leCunUniform,
        "tf.initializers.ones": tf.initializers.ones,
        "tf.initializers.orthogonal": tf.initializers.orthogonal,
        "tf.initializers.randomNormal": tf.initializers.randomNormal,
        "tf.initializers.randomUniform": tf.initializers.randomUniform,
        "tf.initializers.truncatedNormal": tf.initializers.truncatedNormal,
        "tf.initializers.varianceScaling": tf.initializers.varianceScaling,
        "tf.initializers.zeros": tf.initializers.zeros,
        "tf.regularizers.l1": tf.regularizers.l1,
        "tf.regularizers.l1l2": tf.regularizers.l1l2,
        "tf.regularizers.l2": tf.regularizers.l2,
        "tf.util.assert": tf.util.assert,
        "tf.util.createShuffledIndices": tf.util.createShuffledIndices,
    
        "tf.util.flatten": tf.util.flatten,
        "tf.util.now": tf.util.now,
        "tf.util.shuffle": tf.util.shuffle,
        "tf.util.sizeFromShape": tf.util.sizeFromShape,
        "tf.backend": tf.backend,
        "tf.getBackend": tf.getBackend,
        "tf.ready": tf.ready,
        "tf.registerBackend": tf.registerBackend,
        "tf.removeBackend": tf.removeBackend,
        "tf.setBackend": tf.setBackend,
        "tf.browser.fromPixels": tf.browser.fromPixels,
        "tf.browser.toPixels": tf.browser.toPixels,
        "tf.metrics.binaryAccuracy": tf.metrics.binaryAccuracy,
        "tf.metrics.binaryCrossentropy": tf.metrics.binaryCrossentropy,
        "tf.metrics.categoricalAccuracy": tf.metrics.categoricalAccuracy,
        "tf.metrics.categoricalCrossentropy": tf.metrics.categoricalCrossentropy,
        "tf.metrics.cosineProximity": tf.metrics.cosineProximity,
        "tf.metrics.meanAbsoluteError": tf.metrics.meanAbsoluteError,
        "tf.metrics.meanAbsolutePercentageError": tf.metrics.meanAbsolutePercentageError,
        "tf.metrics.meanSquaredError": tf.metrics.meanSquaredError,
        "tf.metrics.precision": tf.metrics.precision,
        "tf.metrics.recall": tf.metrics.recall,
        "tf.metrics.sparseCategoricalAccuracy": tf.metrics.sparseCategoricalAccuracy,
        "tf.callbacks.earlyStopping": tf.callbacks.earlyStopping
    }
    if(ops[op] !== undefined) 
        return ops[op]  
    console.error(op)
}

export {
    get_ops,
    keyToClassName
}