function outPut(layer){

    return{imports:["\nimport joblib"],code:["model.fit(X_train,Y_train)\njoblib.dump(model,'"+layer.fileName+".pkl')\n"]}
}
export default outPut