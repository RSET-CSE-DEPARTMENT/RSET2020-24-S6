import React from 'react'
import linearRegression from './codeGeneration/CGLinearRegression'
import SVM from './codeGeneration/CGSVM'
import logisticRegression from './codeGeneration/CGLogisticRegression'
import decisionTree from './codeGeneration/CGDecisionTree'
import kMeans from './codeGeneration/CGKMeans'
import kNN from './codeGeneration/CGKnn'
import randomForest from './codeGeneration/CGRandomForest'
import naiveBayes from './codeGeneration/CGNaiveBayes'
import { useState } from 'react'
import CodeSection from './CodeSection'
import inputs from './codeGeneration/CGInput'
import preprocess from './codeGeneration/CGPreprocess'
import outPut from './codeGeneration/CGOutput'
import axios from 'axios'
import annInput from './codeGeneration/CGANNInput.jsx'
import annHidden from './codeGeneration/CGANNHidden.jsx'
import annOutput from './codeGeneration/CGANNOutput.jsx'

const CodeGeneration = ({data,selectedOption}) => {
  
  const [completed,setCompleted]=useState(false)
  const [imports,setImports]=useState('')
  const [code,setCode]=useState('')
  // var imports
  // var code
  function handleCompleted()
  {
      setCompleted(!completed)
  }
  
function createCode(data){
  var temp1=''
  var temp2=''
  data.map(layer=>
    { 
        if(layer.type==='input')
        {
          var temp=inputs(layer,selectedOption)
          console.log(temp)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        
        else if(layer.type==='preprocess')
        {
          var temp=preprocess(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='linear_regression')
        {  
          var temp=linearRegression(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='logistic_regression')
        {
          var temp=logisticRegression(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='knn')
        {
          var temp=kNN(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='kmeans')
        {
          var temp=kMeans(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='randomforest')
        {
          var temp=randomForest(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='decision_tree')
        {
          var temp=decisionTree(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='svm')
        {
          var temp=SVM(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='naive_bayes')
        {
          var temp=naiveBayes(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        
        else if(layer.type==='output')
          {
            var temp=outPut(layer)
            temp1=temp1+temp.imports
            temp2=temp2+temp.code
            setImports(temp1)
            setCode(temp2)
          }
        else if(layer.type==='annInput')
        {
          var temp=annInput(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='annHidden')
        {
          var temp=annHidden(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
        else if(layer.type==='annOutput')
        {
          var temp=annOutput(layer)
          temp1=temp1+temp.imports
          temp2=temp2+temp.code
          setImports(temp1)
          setCode(temp2)
        }
    }
  )
        handleCompleted()
        var temp3=temp1+'\n'+temp2 ;
        console.log("hello")
        axios.defaults.withCredentials = true //since no ssl..
        const response= axios.post('http://localhost:8080/codegeneration', {
            data : {
                code:temp3,
            }})
            console.log("sent?");
}
async function handleDownload (e)  {
  axios.defaults.withCredentials = true
  let blob = await fetch('http://localhost:8080/file').then(r => r.blob());
  let blob1 = await fetch('http://localhost:8080/download/output').then(r => r.blob());
  console.log(blob,blob1)
  const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mynewfile1.py'); // Set the desired filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      const url1 = window.URL.createObjectURL(new Blob([blob1]));
      const link1 = document.createElement('a');
      link1.href = url1;
      link1.setAttribute('download', 'output.pkl'); // Set the desired filename
      document.body.appendChild(link1);
      link1.click();
      link1.parentNode.removeChild(link1);
};
  return (
    (completed)?
    (
    <div>
      <CodeSection imports={imports} code={code}/>
      <div class="button" onClick={handleDownload} >
      <div class="button-wrapper">
        <div class="text">Download</div>
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
          </span>
        </div>
      </div>
   </div>
    ):
    (
    <div className='center'>
      <button className='w-80  m-1 background-color-blue rounded-lg' onClick={()=>createCode(data)}>Generate Code</button>
    </div>
    )
  )
}
export default CodeGeneration