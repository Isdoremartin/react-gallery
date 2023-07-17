import React, { useState } from 'react'
import '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';



export default function useTFclassify() {
    const [isLoading, setIsloading] = useState(false)
    const [predictions, setPredictions] = useState([])

    function predict(img) {
        // const  img = imageRef.current;
        
        setIsloading(true);

           // Load the model.
          mobilenet.load().then(model => {
          // Classify the image.
          model.classify(img).then(predictions => {
        //   console.log('Predictions: ');
        //   console.log(predictions);
          setPredictions(predictions)
          setIsloading(false);
         });
        });
    }
    return [predict, predictions, isLoading, setPredictions];
}
