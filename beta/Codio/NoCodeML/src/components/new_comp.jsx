import React from 'react'
import { useState, useEffect } from 'react'
import Linear_regression from './Linear_regression.jsx'
import Logistic_resgression from './Logistic_resgression.jsx'
import KNN from './KNN.jsx'
import KMeans from './KMeans.jsx'
import RandomForest from './RandomForest.jsx'
import Decision_tree from './Decision_tree.jsx'
import Svm from './Svm.jsx'
import Naive_bayes from './Naive_bayes.jsx'
import Preprocess from './Preprocess.jsx'
import Input from './Input.jsx'
import CodeGeneration from './CodeGeneration.jsx'
import Output from './Output.jsx'
import ANNInput from './ANNInput.jsx'
import ANNHidden from './ANNHidden.jsx'
import ANNOutput from './ANNOutput.jsx'
//import Output1 from './Output1.jsx'
import './style.css' 

const NewComp = () => {
  const [layers,setLayers]=useState([{key:crypto.randomUUID(),type:'input',filename:'read.csv',iloc:'0',inbuilt:'iris_plant',testsize:'30',inputrandomstate:'None'},{key:crypto.randomUUID(),type:'preprocess',scaler:'StandardScaler'}])
  const [output,setOutput]=useState(true)
  const [ann,setAnn]=useState(false)
  useEffect(() => {
    if(layers.length===3)
    {
      setLayers((currentLayers)=>{return currentLayers.filter(layer => layer.type !== 'output')})
      setOutput(true)
    }
  }, [layers])
  console.log(layers)  
  const [selectedOption, setSelectedOption] = useState('option1');
  function handleInputChange(event) {
    setSelectedOption(event.target.value);
  }
  function addOutput()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'output',fileName:'output'}]})
  }
  function addLinearRegression()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'linear_regression'}]})
    setOutput(false)
    addOutput()
  }
  function addLogisticRegression()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'logistic_regression',class_weight:"'balanced'",penalty:"'l2'",random_state:'None',max_iter:'100'}]})
    setOutput(false)
    addOutput()
  }
  function removeLayer(key)
  {
    setLayers(currentLayers => {
      return currentLayers.filter(layer => layer.key !== key)
    })
  }
  function addKNN()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'knn',choice:'Classifier',number_neighbours:'5',algorithm:"'auto'",weights:"'uniform'"}]})
    setOutput(false)
    addOutput()
  }
  function addKMeans()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'kmeans',n_clusters:'8',init:"'k-means++'",n_init:'10',max_iter:'300',random_state:'0'}]})
    setOutput(false)
    addOutput()
  }
  function addRandomForest()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'randomforest',choice:'classifier',n_estimators:'100',criterion:"'gini'",min_sample_split:'2',max_features:'10'}]})
    setOutput(false)
    addOutput()
  }
  function addDecisionTree()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'decision_tree',splitter:"'best'",min_samples_split:'2',random_state:'None'}]})
    setOutput(false)
    addOutput()
  }
  function addSvm()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:"svm",c:'1.0',kernel:"'rbf'",degree:'3',gamma:"'scale'",random_state:'None'}]})
    setOutput(false)
    addOutput()
  }
  function addNaiveBayes()
  {
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'naive_bayes',estimator:'GaussianNB'}]})
    setOutput(false)
    addOutput()
  }
  function addANN(e){
    // e.preventDefault();
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'annInput',input_dim:'8'}]})
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'annHidden',activation:"'relu'",units:'128'}]})
    setLayers((currentLayers)=>{return[...currentLayers,{key:crypto.randomUUID(),type:'annOutput',activation:"'relu'",units:'128',loss:"'binary_crossentropy'",optimizer:"'adam'",metrics:"['accuracy']",epochs:'10',batch_size:'32',filename:'output'}]})
    setOutput(false)
    setAnn(true)
    // addOutput()
  }
  function addANNLayer(e){
    // e.preventDefault();
    const val = [...layers];
    val.splice(-2,0,{key:crypto.randomUUID(),type:'annHidden',activation:"'relu'",units:'128'})
    setLayers(val)
  }
  function changeANNInputDim(key,input_dim)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,input_dim}
        }
      return layer
    })
    })
  }
  function changeANNHiddenActivation(key,activation)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,activation}
        }
      return layer
    })
    })
  }
  function changeANNHiddenUnits(key,units)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,units}
        }
      return layer
    })
    })
  }
  function changeANNOutputActivation(key,activation)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,activation}
        }
      return layer
    })
    })
  }
  function changeANNOutputUnits(key,units)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,units}
        }
      return layer
    })
    })
  }
  function changeANNOutputLoss(key,loss)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,loss}
        }
      return layer
    })
    })
  }
  function changeANNOutputOptimizer(key,optimizer)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,optimizer}
        }
      return layer
    })
    })
  }
  function changeANNOutputMetrics(key,metrics)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,metrics}
        }
      return layer
    })
    })
  }
  function changeANNOutputEpochs(key,epochs)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,epochs}
        }
      return layer
    })
    })
  }
  function changeANNOutputBatchSize(key,batch_size)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,batch_size}
        }
      return layer
    })
    })
  }
  function changeANNOutputFilename(key,filename)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,filename}
        }
      return layer
    })
    })
  }
  function changeDecisionSplitter(key,splitter)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,splitter}
        }
      return layer
    })
    })
  }
  function changeDecisionMinSamplesSplit(key,min_samples_split)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(min_samples_split==="")
            min_samples_split='2'
          return {...layer,min_samples_split}
        }
      return layer
    })
    })
  }
  function changeDecisionRandomState(key,random_state)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(random_state==="")
             random_state='None'
          return {...layer,random_state}
        }
      return layer
    })
    })
  }
  function changeSvmC(key,C)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(C==="")
             C='1.0'
          return {...layer,C}
        }
      return layer
    })
    })
  } 
  function changeSvmKernel(key,kernel)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,kernel}
        }
      return layer
    })
    })
  }
  function changeSvmDegree(key,degree)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(degree==="")
             degree='3'
          return {...layer,degree}
        }
      return layer
    })
    })
  }
  function changeSvmGamma(key,gamma)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,gamma}
        }
      return layer
    })
    })
  }
  function changeSvmRandomState(key,random_state)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(random_state==="")
             random_state='None'
          return {...layer,random_state}
        }
      return layer
    })
    })
  }
  function changeNaiveBayesEstimator(key,estimator)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,estimator}
        }
      return layer
    })
    })
  }
  
 
  function changeLogisticPenalty(key,penalty)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        console.log(key+'   '+layer.key)
          console.log(penalty)
          return {...layer,penalty}
        }
      return layer
    })
    })
  }
  function changeLogisticClassWeight(key,class_weight)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,class_weight}
        }
      return layer
    })
    })
  }
  function changeLogisticRandomState(key,random_state)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(random_state==="")
             random_state='None'
          return {...layer,random_state}
        }
      return layer
    })
    })
  }
  function changeLogisticMaxIter(key,max_iter)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(max_iter==="")
             max_iter='100'
          return {...layer,max_iter}
        }
      return layer
    })
    })
  }
  function changeKNNChoice(key,choice)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,choice}
        }
      return layer
    })
    })
  }
  function changeKNNNumber(key,number_neighbours)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(number_neighbours==="")
             number_neighbours='5'
          return {...layer,number_neighbours}
        }
      return layer
    })
    })
  }
  
  function changeKNNAlgorithm(key,algorithm)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,algorithm}
        }
      return layer
    })
    })
  }
  function changeKNNWeights(key,weights)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,weights}
        }
      return layer
    })
    })
  }
  function changeKMeansClusterNo(key,n_clusters)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(n_clusters==="")
             n_clusters='8'
          return {...layer,n_clusters}
        }
      return layer
    })
    })
  }
  function changeKMeansInit(key,init)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,init}
        }
      return layer
    })
    })
  }
  function changeKMeansInitNo(key,n_init)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(n_init==="")
             n_init='10'
          return {...layer,n_init}
        }
      return layer
    })
    })
  }
  function changeKMeansRandom(key,random_state)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(random_state==="")
             random_state='None'
          return {...layer,random_state}
        }
      return layer
    })
    })
  }
  function changeKMeansMaxIter(key,max_iter)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(max_iter==="")
             max_iter='300'
          return {...layer,max_iter}
        }
      return layer
    })
    })
  }

  function changeRandomChoice(key,choice)
  {
    if(choice==='classifier')
    {
      let criterion="'gini'"
      setLayers(currentLayers => {
        return currentLayers.map(layer=>{
        if(layer.key===key){
            return {...layer,criterion}
          }
        return layer
      })
      })
    }
    else
    {
      let criterion="'squared_error'"
      setLayers(currentLayers => {
        return currentLayers.map(layer=>{
        if(layer.key===key){
            return {...layer,criterion}
          }
        return layer
      })
      })
    }
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,choice}
        }
      return layer
    })
    })
  }
  function changeRandomEstimators(key,n_estimators)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(n_estimators==="")
             n_estimators='100'
          return {...layer,n_estimators}
        }
      return layer
    })
    })
  }
  function changeRandomCriterion(key,criterion)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,criterion}
        }
      return layer
    })
    })
  }
  function changeRandomMinSample(key,min_sample_split)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(min_sample_split==="")
            min_sample_split='2'
          return {...layer,min_sample_split}
        }
      return layer
    })
    })
  }
  function changeRandomMaxFeatures(key,max_features)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(max_features==="")
             max_features='10'
          return {...layer,max_features}
        }
      return layer
    })
    })
  }
  function changeOutputFileName(key,fileName)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(fileName==="")
             fileName='f1.txt'
          return {...layer,fileName}
        }
      return layer
    })
    })
  }
  function changePreprocess(key,scaler)
  {
    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,scaler}
        }
      return layer
    })
    })
  }
  function changeInputFileName(key,filename)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(filename==="")
             filename='read.csv'
          return {...layer,filename}
        }
      return layer
    })
    })
  }
  function changeInputInbuilt(key,inbuilt)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
          return {...layer,inbuilt}
        }
      return layer
    })
    })
  }
  function changeInputTestSize(key,testsize)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(testsize==="")
             testsize='30'
          return {...layer,testsize}
        }
      return layer
    })
    })
  }
  function changeInputRandomState(key,inputrandomstate)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(inputrandomstate==="")
             inputrandomstate='None'
          return {...layer,inputrandomstate}
        }
      return layer
    })
    })
  }
  function changeInputFileInteger(key,iloc)
  {

    setLayers(currentLayers => {
      return currentLayers.map(layer=>{
      if(layer.key===key){
        if(iloc==="")
             iloc='0'
          return {...layer,iloc}
        }
      return layer
    })
    })
  }
  return (
    <div className='flex flex-col'>
      <div className='m-12 flex flex-row-reverse place-content-start gap-4'>
        {
          output?
            (<div className='card1 w-96 py-2 border-dashed  gap-1 text-4xl rounded-lg background-color1'>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addLinearRegression()}>Linear Regression</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addLogisticRegression()}>Logistic Regression</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addKNN()}>KNN</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addKMeans()}>K-means</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addRandomForest()}>Random Forest</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addDecisionTree()}>Decision Tree</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addSvm()}>SVM</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>addNaiveBayes()}>Naive Bayes</button>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={(e)=>addANN(e)}>ANN</button>
            </div>):ann?(<div className='flex flex-row'>
            <div className='card1 w-96 py-2 border-dashed  gap-1 text-4xl h-24 rounded-lg background-color1'>
              <button className='w-80  m-1 background-color-blue rounded-lg' onClick={(e)=>addANNLayer(e)}>Add layer</button>
            </div>
            </div>):(<div></div>)
            
          }
          <ul className='flex flex-row text-4xl gap-2 p-1'>
            {
              layers.map(layer=>
              {
                if(layer.type==='input')
              {
                return <Input setKey={layer.key} selectedOption={selectedOption} handleInputChange={handleInputChange} changeInputFileName={changeInputFileName} changeInputFileInteger={changeInputFileInteger} changeInputInbuilt={changeInputInbuilt} changeInputTestSize={changeInputTestSize} changeInputRandomState={changeInputRandomState}/>
              }
                if(layer.type==='preprocess')
                {
                  return <Preprocess setKey={layer.key} changePreprocess={changePreprocess}/>
                }
                if(layer.type==='linear_regression')
              {
                return <Linear_regression setKey={layer.key} removeLayer={removeLayer} />
              }
              if(layer.type==='logistic_regression')
              {
                return <Logistic_resgression setKey={layer.key} removeLayer={removeLayer} changeLogisticPenalty={changeLogisticPenalty} changeLogisticClassWeight={changeLogisticClassWeight} changeLogisticRandomState={changeLogisticRandomState} changeLogisticMaxIter={changeLogisticMaxIter}/>
              }
              if(layer.type==='knn')
              {
                return <KNN setKey={layer.key} removeLayer={removeLayer} changeKNNChoice={changeKNNChoice} changeKNNAlgorithm={changeKNNAlgorithm} changeKNNNumber={changeKNNNumber} changeKNNWeights={changeKNNWeights} />
              }
              if(layer.type==='kmeans')
              {
                return <KMeans setKey={layer.key} removeLayer={removeLayer} changeKMeansClusterNo={changeKMeansClusterNo} changeKMeansInit={changeKMeansInit} changeKMeansInitNo={changeKMeansInitNo} changeKMeansMaxIter={changeKMeansMaxIter} changeKMeansRandom={changeKMeansRandom} />
              }
              if(layer.type==='randomforest')
              {
                return <RandomForest setKey={layer.key} choice={layer.choice} removeLayer={removeLayer} changeRandomChoice={changeRandomChoice} changeRandomCriterion={changeRandomCriterion} changeRandomEstimators={changeRandomEstimators} changeRandomMaxFeatures={changeRandomMaxFeatures} changeRandomMinSample={changeRandomMinSample} />
              }
              if(layer.type==='decision_tree')
              {
                return <Decision_tree setKey={layer.key} removeLayer={removeLayer} changeDecisionSplitter={changeDecisionSplitter} changeDecisionMinSamplesSplit={changeDecisionMinSamplesSplit} changeDecisionRandomState={changeDecisionRandomState}/>
              }
              if(layer.type==='svm')
              {
                return <Svm setKey={layer.key} removeLayer={removeLayer} changeSvmC={changeSvmC} changeSvmKernel={changeSvmKernel} changeSvmDegree={changeSvmDegree} changeSvmGamma={changeSvmGamma} changeSvmRandomState={changeSvmRandomState}/>
              }
              if(layer.type==='naive_bayes')
              {
                return <Naive_bayes setKey={layer.key} removeLayer={removeLayer} changeNaiveBayesEstimator={changeNaiveBayesEstimator} />
              }
              if(layer.type==='output'&& ann===false)
                {
                 // return <Output1 setKey={layer.key}/>
                  return <Output setKey={layer.key} changeOutputFileName={changeOutputFileName}/>
                }
              if(layer.type==='annInput')
              {
                return <ANNInput setKey={layer.key} removeLayer={removeLayer} changeANNInputDim={changeANNInputDim}/>
              }
              if(layer.type==='annHidden')
              {
                return <ANNHidden setKey={layer.key} removeLayer={removeLayer} changeANNHiddenActivation={changeANNHiddenActivation} changeANNHiddenUnits={changeANNHiddenUnits} />
              }
              if(layer.type==='annOutput')
              {
                return <ANNOutput setKey={layer.key} removeLayer={removeLayer} changeANNOutputActivation={changeANNOutputActivation} changeANNOutputUnits={changeANNOutputUnits} changeANNOutputLoss={changeANNOutputLoss} changeANNOutputOptimizer={changeANNOutputOptimizer} changeANNOutputMetrics={changeANNOutputMetrics} changeANNOutputBatchSize={changeANNOutputBatchSize} changeANNOutputEpochs={changeANNOutputEpochs} changeANNOutputFilename={changeANNOutputFilename}/>
              }
            })}
          </ul>
      </div>
      <CodeGeneration data={layers} selectedOption={selectedOption}/>
    </div>
  )
}

export default NewComp