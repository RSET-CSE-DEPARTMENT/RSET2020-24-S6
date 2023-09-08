function randomForest(layer) {
    if(layer.choice=='Classifier')
        return {imports:["from sklearn import ensemble"],code:["model=ensemble.RandomForestClassifier(n_estimators="+layer.n_estimators+",criterion="+layer.criterion+",min_samples_split="+layer.min_sample_split+",max_features="+layer.max_features+" )\n"]}
    else
        return {imports:["from sklearn import ensemble"],code:["model=ensemble.RandomForestRegressor(n_estimators="+layer.n_estimators+",criterion="+layer.criterion+",min_samples_split="+layer.min_sample_split+",max_features="+layer.max_features+" )\n"]}
 
}

export default randomForest;