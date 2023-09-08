import React from 'react'
const Svm = ({setKey,removeLayer,changeSvmC,changeSvmKernel,changeSvmDegree,changeSvmGamma,changeSvmRandomState}) => {
    //function changeKernel(key,value)
       // {
       //     changeSvmKernel(key,value)
       // }
  return (
    <div className='card1 flex flex-col w-96 border-2 background-color1 gap-1' key={setKey}>
        <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
        SVM
        <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
        </div>
        <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
            <p className='self-start'>C</p>
            <input type='float' className='rounded-lg' onChange={e=>changeSvmC(setKey,e.target.value)}></input>
            <p className='self-start'>Kernel</p>
            <select name="kernel" id="kernel" className='border-1 h-10' onChange={e=>changeSvmKernel(setKey,e.target.value)}>
                <option value="'rbf'">rbf</option>
                <option value="'linear'">linear</option>
                <option value="'poly'">poly</option>
                <option value="'sigmoid'">sigmoid</option>
            </select>
            <p className='self-start'>Degree</p>
            <input type='number' className='rounded-lg' onChange={e=>changeSvmDegree(setKey,e.target.value)}></input>
            <p className='self-start'>Gamma</p>
            <select name="gamma" id="gamma" className='border-1 h-10' onChange={e=>changeSvmGamma(setKey,e.target.value)}>
                <option value="'scale'">scale</option>
                <option value="'auto'">auto</option>
            </select>
            <p className='self-start'>Random State</p>
            <input type='number' className='rounded-lg' onChange={e=>changeSvmRandomState(setKey,e.target.value)}></input>
        </div>
    </div>
  )
}

export default Svm