function annHidden(layer) {
   
    return {imports:[""],code:["keras.layers.Dense("+layer.units+", activation="+layer.activation+"),"]}   
}

export default annHidden;