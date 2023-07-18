import React, { useEffect, useRef } from 'react'
import '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import useTFclassify from '../utils/hooks/useTFclassify';

export default function Tensorflow() {
    const imageRef = useRef();

    const [predict, predictions, isLoading] = useTFclassify();

      

  return (
    <div className="flex justify-center">
        <div className="w-1/3">
            <h1>Tensorflow Example</h1>

            <img src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzE3NTJ8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNjg5MzQzNDY5fDA&ixlib=rb-4.0.3&q=80&w=1080"
                 ref={imageRef}
                 width="400"
                 crossOrigin="anonymous"
            />
            <div className="text-center my-5">
                {
                        predictions.length > 0 && 
                        predictions.map((prediction) => (
                            <div className="flex justify-between">
                                <p>{prediction.className}</p>
                                <p>{Math.floor(prediction.probability * 100)} %</p>
                        
                            </div>
                        ))
                }
                
               <button className='p-2 W-40 rounded bg-blue-800 text-white'
                       onClick={() =>predict(imageRef.current)}>
                        {isLoading && '⏳'}
                        {!isLoading && "Predict result"}
                </button>

            </div>
        </div>
    </div>
  )
  }

