import React, { useEffect, useState } from 'react'
import Axios from 'axios';


const api = process.env.REACT_APP_UNSPLASH_API

const secret = process.env.REACT_APP_UNSPLASH_KEY

export default function useFetchImage(page, searchTerm) {
   
    const [images, setImages] = useState([]);
    
    const [errors, setErrors] = useState([]);

    const [isLooading, setisLoading] = useState(false);
    
    function fetch(res) {
        const url = searchTerm == null ? "photos?":`search/photos?query=${searchTerm}&`;

        Axios.get(
            `${api}/${url}client_id=${secret}&page=${page}`)
            .then(res => {

                if(searchTerm == null){
                    fetchRandom(res);
                }else{
                    fetchSearch(res);
                }
                
                setisLoading(false);
  
              })
            .catch((e) =>{
                setErrors(["Unable to Load Images"]);
                setisLoading(false);
            });
    }

    function fetchSearch(res) {
       
        if (page > 1) {

            setImages([...images, ...res.data.results]);
        }else{

            setImages([ ...res.data.results]);
        }
    
            
    }

    function fetchRandom(res) {
    
        setImages([...images, ...res.data]);
              
    }

    //use effect for loading pages
    useEffect(() => {

       setisLoading(true);

       fetch();
    
    }, [page])


    //use effect for search
    useEffect(() => {

        
       setisLoading(true);

       fetch();
    
    }, [searchTerm])


    
    return [images, setImages, errors, isLooading];
}
