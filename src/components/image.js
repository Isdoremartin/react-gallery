import React, {useRef, useState} from 'react'
import useScroll from '../utils/hooks/useScroll'
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import useTFclassify from '../utils/hooks/useTFclassify';


 function Image({index, image, handleRemove, show}) {

    const [isHovering, setisHovering] = useState(false)
    const imageRef = useRef();
    const [predict, predictions, isLoading, setPredictions] = useTFclassify();
    

    const scrollPosition = useScroll();

    
    return (
        <div 
            key={index}>
            <div className='relative'
                onMouseEnter={
                    () => setisHovering(true)
                }

                onMouseLeave={
                    () => setisHovering(false)
            }>
                {(predictions.length > 0 || isLoading) && (

                    <span 
                    onClick={() => setPredictions([])}
                    className='absolute bg-gray-800 text-white rounded-lg shadow px-2 left-0 ml-5'>
                    {isLoading && <p>Fetching results...</p>}
                    { predictions.map((prediction) => (
                            <div className="flex justify-between">
                                <p>{prediction.className}</p>
                                <p>{Math.floor(prediction.probability * 100)} %</p>
                        
                            </div>
                        ))}
                    </span>
                )

                }

                <button className={
                        `fas fa-search absolute left-2 top-2 bg-white px-1 rounded text-lg-4 cursor-pointer opacity-25 hover:opacity-100
                        ${ isHovering ? "" : "hidden" }`
                    }

                    onClick={() => predict(imageRef.current)
                }>
                  predict
                </button>
                <button className={
                        `fas fa-times absolute right-2 top-2 bg-white px-1 rounded text-lg-4 cursor-pointer opacity-25 hover:opacity-100
                        ${isHovering ? "" : "hidden" }`
                    }

                    onClick={() => handleRemove(index)
                }>
                  &times; 
                </button>
                <img 
                    src={image}
                    ref={imageRef}
                    width="100%"
                    height="auto"
                    alt='img'
                    onClick={show}
                    crossOrigin="anonymous"
                />
            </div>
            
            
        </div>
    )
}
// Image.propTypes = {
//     show: (props, propName) => {
//         if(typeof(props[propName]) != "function"){
//             return new Error(`${propName} must be a function but you have provided ${typeof props[propName]}`)
//         }
        
//     },
//     index: (props, propName) => {
//         if(typeof(props[propName]) != "function"){
//             return new Error(`${propName} must be a number but you have provided ${typeof props[propName]}`)
//         }
        
//     },
// }
Image.propTypes = {
    show: PropTypes.func,
    index: PropTypes.number,
    image: PropTypes.string,
    handleRemove: PropTypes.func,
}
export default Image;
