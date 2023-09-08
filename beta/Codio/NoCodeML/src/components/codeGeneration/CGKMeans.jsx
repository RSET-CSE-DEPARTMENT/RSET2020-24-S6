function kMeans(layer) {
   
    return {imports:["from sklearn import cluster"],code:["model=cluster.KMeans(n_clusters="+layer.n_clusters+",init="+layer.init+",n_init="+layer.n_init+",max_iter="+layer.max_iter+",random_state="+layer.random_state+" )\n"]}
   
}

export default kMeans;