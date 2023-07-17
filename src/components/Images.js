import React, {
    useRef,
    useState,
} from 'react';
import Image from '../components/image';
import useFetchImage from '../utils/hooks/useFetchImage';
import Loading from './loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import useDebounce from '../utils/hooks/useDebounce';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';


export default function Images() {
    const [page, setPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState(null);

    const [images, setImages, errors, isLooading] = useFetchImage(page, searchTerm);

    const inputRef = useRef(null)

    const [newImageUrl, setnewimageUrl] = useState("")
    const [showPreview, setshowPreview] = useState(false)

    
    // Loading effect
    // const [isLooading, setisLoading] = useEffect(false)

    // useEffect(() => {
    // inputRef.current.focus()


    // }, [])


    // Add Image function

    // function handleAdd() {
    // if(newImageUrl != ""){
    //     setImages([newImageUrl, ...images]);

    //     setnewimageUrl("")
    // }

    // }

    // Remove Image function

    function handleRemove(index) {
    // setimages(images.filter((image,i) => i != index));
    setImages([
        ...images.slice(0, index),
        ...images.slice(index + 1, images.length),
    ]);
    }


    function handleChange(event) {
        setnewimageUrl(event.target.value)

    }

    const debounce = useDebounce();

    function handleInput(e) {
        const text = e.target.value;

        debounce(() => setSearchTerm(text));

       
    }
    
    return(
        <section> 
          <div className='my-5'>
            <input type="text" 
            onChange={handleInput} 
            className="w-full border rounded shadow p-2"
            placeholder='Search images here'/>
          </div>
          {
            errors.length > 0 && (
                <div className='flex h-screen'>
                    <p className='m-auto'>
                        {
                        errors[0]
                    } </p>
                </div>
            )
        }

            
<LayoutGroup type="crossfade">
        <InfiniteScroll 
        dataLength={images.length} 
        next={() => setPage(page + 1)}
        hasMore = {true}
        className="flex flex-wrap">
         
         {images.map((img, index) => (
            <motion.div 
            className='w-1/6 p-1 border flex justify-center'
            key={index}
            layoutId={img.urls.regular}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            >
            <Image 
               show={() => setshowPreview(img.urls.regular)}
                
                image={
                    img.urls.regular
                }
                handleRemove={handleRemove}
                index={index}
                key={index}/>
            </motion.div>
        ))}
        </ InfiniteScroll >

        <AnimatePresence>
            {showPreview && 
            <motion.section 
            layoutId={showPreview}
            exit={{opacity: 0, rotate: 360, transition:{duration:1}}}
            onClick={() => setshowPreview(false)}
            className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-40">
            
               <div className='bg-white'>
               <img 
                    src={showPreview}
                    width="300"
                    height="auto"
                    alt='img'
                    className='rounded-lg'
                    
                />
               </div> 
              
            </motion.section>}
            </AnimatePresence>

        </LayoutGroup> 
            
            {isLooading && <Loading />}

            {/* <div className='flex justify-between  y-5'>
            <div className='w-full'>
            <input 
            type="text" 
            id='inputBox'
            ref={inputRef}
            className='p-2 border-green-600 shadow rounded w-full'
            value={newImageUrl}
            onChange={handleChange}/>
            </div>
            <div>
            <button 
              disabled = {newImageUrl == ""}
              className={`p-2  text-white ml-2 ${
              newImageUrl != "" ? "bg-green-600" : "bg-green-300"
              }`}
              onClick={handleAdd}>Add New</button>
              </div>
      </div> */} 
      
      
      </section>

    );
}


