function decisionTree(layer) {
   
    return {imports:["from sklearn import tree"],code:["model=tree.DecisionTreeClassifier(splitter="+layer.splitter+",min_samples_split="+layer.min_samples_split+",random_state="+layer.random_state+" )\n"]}
   
}

export default decisionTree;