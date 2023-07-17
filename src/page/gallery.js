import React, { useContext } from 'react';
import Images from '../components/Images';
import AppContext from '../store/AppContext';


export default function Gallery() {
  const  [isLoggedIn] = useContext(AppContext);
    
    
    return(
        <section className="flex justify-center">
   
          <div className='w-10/12'>
         
         <div className='text-center'>
         <Images />
   
         </div>
         </div>
   
        </section>
     );
}
