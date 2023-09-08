function annHidden(layer) {
   
    return {imports:["\nimport joblib"],code:["keras.layers.Dense("+layer.units+", activation="+layer.activation+")])\nmodel.compile(loss="+layer.loss+",optimizer="+layer.optimizer+",metrics="+layer.metrics+")\nmodel.fit(X_train,Y_train,epochs="+layer.epochs+",batch_size="+layer.batch_size+")\njoblib.dump(model,'"+layer.filename+".pkl')\n"]}   
}

export default annHidden;