function SVM(layer) {
    
    return {imports:["from sklearn import svm"],code:["model=svm.SVC(kernel="+layer.kernel+",C="+layer.c+",degree="+layer.degree+",gamma="+layer.gamma+",random_state="+layer.random_state+" )\n"]}
    
}

export default SVM;