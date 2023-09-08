import React from 'react'

const ANNOutput = ({setKey,removeLayer,changeANNOutputActivation,changeANNOutputUnits,changeANNOutputLoss,changeANNOutputOptimizer,changeANNOutputMetrics,changeANNOutputBatchSize,changeANNOutputEpochs,changeANNOutputFilename}) => {
  return (
    <div>
        <div className='card1 flex flex-col w-96 border-2 rounded-lg background-color1 gap-1' key={setKey}>
            <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
            ANN Output
            <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
            </div>
            <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
                <p className='self-start rounded-lg'>Activation</p>
                <select name="activation" id="activation" className='border-1 rounded-lg h-10' onChange={e=>changeANNOutputActivation(setKey,e.target.value)}>
                    <option value="'relu'">relu</option>
                    <option value="'sigmoid'">sigmoid</option>
                    <option value="'tanh'">tanh</option>
                    <option value="'linear'">linear</option>
                    <option value="'softmax'">Soft Max</option>
                </select>
                <p className='self-start rounded-lg'>Units</p>
                <input type='number' className='rounded-lg' onChange={e=>changeANNOutputUnits(setKey,e.target.value)}></input>
                <p className='self-start rounded-lg'>loss</p>
                <select name="loss" id="loss" className='border-1 rounded-lg h-10' onChange={e=>changeANNOutputLoss(setKey,e.target.value)}>
                    <option value="'binary_crossentropy'">Binary Crossentropy</option>
                    <option value="'MSE'">Mean Square error</option>
                    <option value="'sparse_categorical_crossentropy'">Sparce Categorical Crossentropy</option>

                </select>
                <p className='self-start rounded-lg'>optimizer</p>
                <select name="optimizer" id="optimizer" className='border-1 rounded-lg h-10' onChange={e=>changeANNOutputOptimizer(setKey,e.target.value)}>
                    <option value="'adam'">Adam</option>
                    <option value="'SGD'">Stochastic Gradient Descent</option>
                    <option value="'Adagrad'">Adagrad</option>
                    <option value="'RMSprop'">RMSprop</option>
                </select>
                <p className='self-start rounded-lg'>Batch size</p>
                <input type='number' className='rounded-lg' onChange={e=>changeANNOutputBatchSize(setKey,e.target.value)}></input>
                <p className='self-start rounded-lg'>Epoch</p>
                <input type='number' className='rounded-lg' onChange={e=>changeANNOutputEpochs(setKey,e.target.value)}></input>
                <p className='self-start rounded-lg'>File Name</p>
                <input type='text' className='rounded-lg' onChange={e=>changeANNOutputFilename(setKey,e.target.value)}></input>
            </div>
        </div>
    </div>
  )
}

export default ANNOutput