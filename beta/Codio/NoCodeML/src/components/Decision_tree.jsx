import React from 'react'
const Decision_Tree = ({setKey,changeDecisionSplitter,changeDecisionMinSamplesSplit,changeDecisionRandomState,removeLayer}) => {
    function changeSplitter(key,value)
        {
            changeDecisionSplitter(key,value)
        }
  return (
    <div className='card1 flex flex-col w-96 border-2 rounded-lg background-color1' key={setKey}>
        <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
        Decision Tree
        <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
        </div>
        <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
            <p className='self-start'>Splitter</p>
            
            <select name="splitter" id="splitter" className='border-1 h-10' onChange={e=>changeSplitter(setKey,e.target.value)}>
                <option value="'best'">best</option>
                <option value="'random'">random</option>
            </select>
            <p className='self-start'>Min Samples Split</p>
            <input type='number' className='rounded-lg' onChange={e=>changeDecisionMinSamplesSplit(setKey,e.target.value)}></input>
            <p className='self-start'>Random State</p>
            <input type='number' className='rounded-lg' onChange={e=>changeDecisionRandomState(setKey,e.target.value)}></input>
        </div>
    </div>
  )
}

export default Decision_Tree