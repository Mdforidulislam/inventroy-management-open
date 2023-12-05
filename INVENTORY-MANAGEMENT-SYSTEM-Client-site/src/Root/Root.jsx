import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import AOS from 'aos';
import 'aos/dist/aos.css';
import {Helmet} from "react-helmet";

const Root = () => {

    const location = useLocation()
    const removehader = location.pathname.includes('/login')
    const removeFooter = location.pathname.includes('/register')
    return (
        <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Home || </title>
            </Helmet>
            
            {
               removehader || removeFooter ? " " : <Header></Header> 
            }
            <Outlet></Outlet>
            {
               removehader || removeFooter ? " " : <Footer></Footer>
            }
            
        </div>
    );
};

export default Root;