function logisticRegression(layer) {
   
    return {imports:["from sklearn import linear_model"],code:["model=linear_model.LogisticRegression(class_weight="+layer.class_weight+",penalty="+layer.penalty+",max_iter="+layer.max_iter+",random_state="+layer.random_state+" )\n"]}
   
}

export default logisticRegression;