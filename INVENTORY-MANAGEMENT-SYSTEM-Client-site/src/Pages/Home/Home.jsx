import Banner from "../../Components/Home/Banner";
import FAQ from "../../Components/Home/FAQ";
import Pricing from "../../Components/Home/Pricing";
import ProductCategory from "../../Components/Home/ProductCategroy/ProductCategory";
import Tastimonial from "../../Components/Home/Tastimonial";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Helmet} from "react-helmet";


const Home = () => {
    useEffect(() => {
        AOS.init({
        });
      }, []);
    return (
        <div>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Home || </title>
            </Helmet>
            <div data-aos="fade-up">
                <Banner></Banner>
            </div>
            <div data-aos="fade-zoom-in">
                <ProductCategory></ProductCategory>
            </div>
            <div  data-aos="zoom-in-up" className="flex justify-center items-center">
                <Pricing></Pricing>
            </div >
             <div  data-aos="fade-zoom-in" className="bg-[#03a9f4] md:p-20">
                <FAQ></FAQ>
             </div>
             <div data-aos="zoom-out-down" className="hidden md:flex">
                <Tastimonial></Tastimonial>
             </div>
        </div>
    );
};

export default Home;