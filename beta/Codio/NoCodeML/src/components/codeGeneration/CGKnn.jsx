function kNN(layer) {
    if(layer.choice=='Classifier')
        return {imports:["from sklearn import neighbors"],code:["model=neighbors.KNeighborsClassifier(n_neighbors="+layer.number_neighbours+",algorithm="+layer.algorithm+",weights="+layer.weights+" )\n"]}
    else
        return {imports:["from sklearn import neighbors"],code:["model=neighbors.KNeighborsRegressor(n_neighbors="+layer.number_neighbours+",algorithm="+layer.algorithm+",weights="+layer.weights+" )\n"]}
 
}

export default kNN;