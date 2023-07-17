// import logo from './logo.svg';
// import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {  Routes, Route, useLocation,  } from 'react-router-dom';
import "./assets/css/tailwind.css";
import Header from './components/Header';
import Loading from './components/loading';
import NotFound from './page/404';
import Gallery from './page/gallery';
import Home from './page/Home';
import Login from './page/login';
import SignUp from './page/SignUp';
import AppContext from './store/AppContext';
import routes from './utils/routes';
import AuthRoute from './utils/routes/AuthRoute';
import GuestRoute from './utils/routes/GuestRoute';
import { motion } from 'framer-motion';
import Tensorflow from './page/tensorflow';



function App() {

    const [isLoggedIn, setisLoggedIn] = useState(null);

    const [user, setUser] = useState({});

    const [isLoading, setIsloading] = useState(true)
   
    useEffect(() =>{
        setIsloading(true);
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setisLoggedIn(true);
            setUser(user);
            const uid = user.uid;
            console.log(user);
            setIsloading(false);
            // ...
        } else {
            // User is signed out
            // ...
            setisLoggedIn(false);
            setUser({});
            console.log(user);
            setIsloading(false);
        }
        });

    }, [])
    
    const location = useLocation();
    if(isLoading) return <Loading />;
  
    return (
     
        
        <AppContext.Provider value={[isLoggedIn, user]}>
            {/* <Fragment> */}
            <Header />
            <AnimatePresence  initial={false}>
            < Routes key={location.pathname} location={location}>
             
                {/* {routes.map((route, index) => {

                   return (
                    <Route 
                     key={index
                     path={route.path}
                     exact={route.exact}
                     Component={route.component}
                    />);

                   }) } */}

                  <Route path="/" element={
                        <motion.div initial={{x: 200}} animate={{x: 0}} exit={{scale: 0, transition:{duration:1}}}>
                            <Home /> 
                        </motion.div>}>
                   </ Route>

                  <Route path="/flow" element={
                        <motion.div initial={{x: 200}} animate={{x: 0}} exit={{scale: 0, transition:{duration:1}}}>
                            <Tensorflow /> 
                        </motion.div>}>
                   </ Route>

                   <Route element={
                        <motion.div
                                initial={{x: 200}}
                                animate={{x: 0}}
                                exit={{scale: 0, transition:{duration:1}}}
                        >
                            <AuthRoute/>
                        </motion.div>
                     }>
                        <Route path="/gallery" element={<Gallery />}></ Route>
                      
                    </Route>

                   <Route element={
                            <motion.div initial={{x: 200}}animate={{x: 0}} exit={{scale: 0, transition:{duration:1}}}>
                                <GuestRoute/>
                            </motion.div>
                        }>
                            <Route path="/login" element={<Login />}></ Route>

                            <Route path="/signup" element={<SignUp />}></ Route>

                    </Route>

                   
                   
                   <Route path="*"element={<NotFound />}></ Route>
                    
            </ Routes>
            </AnimatePresence>
            {/* </Fragment> */}
            </AppContext.Provider>
           
    

    );

}



// class App extends React.Component {
//   // constructor(props) {
//   //   console.log('App constructor');
//   //   super(props);

//   //   this.state = {title: "Hello React ", isShowing: false};
//   // }

//   componentDidUpdate() {
//     console.log("App Mounted")
//     // this.setState({title: "Hello LifeCycle"})
//     console.log("App Updated");
//   }
  
//   // functions

//   handleClick = () => {
//     this.setState({isShowing: !this.state.isShowing})
//   }

//   render(){
//     console.log('App Render');
//     return (
//      <section className="flex justify-center">
//        <div className='w-1/2'>
      
//       <div className='text-center'>

//       <div className='my-4'>{this.state.title}</div>
//       <button
//       className='p-1 bg-blue-700 text-white my-2'

//       onClick={this.handleClick}>
//         Toggle Image
//       </button>
//       </div>
//       { this.state.isShowing ? (<Images/>): null }
//       </div>

//      </section>
    
//     );
//   }
// }

export default App;
