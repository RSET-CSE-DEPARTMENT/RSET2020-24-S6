import React from 'react'

const KMeans = ({setKey,removeLayer,changeKMeansClusterNo,changeKMeansInit,changeKMeansInitNo,changeKMeansRandom,changeKMeansMaxIter}) => {


  return (
    <div className='card1 flex flex-col w-96 border-2 rounded-lg background-color1 gap-1' key={setKey}>
      <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
      K-means
      <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
      </div>
      <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
        <p className='self-start rounded-lg'>No of clusters</p>
        <input type='number' className='rounded-lg' onChange={e=>changeKMeansClusterNo(setKey,e.target.value)}></input>

        <p className='self-start'>Initial cluster centroid</p>
          <select name="init" id="init" className='border-1 rounded-lg h-10' onChange={e=>changeKMeansInit(setKey,e.target.value)}>
              <option value="'k-means++'">k-means++</option>
              <option value="'random'">Random</option>
          </select>

        <p className='self-start'>Times run on cluster centroids</p>
        <input type='number' className='rounded-lg' onChange={e=>changeKMeansInitNo(setKey,e.target.value)}></input>

        <p className='self-start'>Maximum iterations</p>
        <input type='number' className='rounded-lg' onChange={e=>changeKMeansMaxIter(setKey,e.target.value)}></input>

        <p className='self-start'>Random state</p>
        <input type='number' className='rounded-lg' onChange={e=>changeKMeansRandom(setKey,e.target.value)}></input>
      </div>
    </div>
  )
}

export default KMeans