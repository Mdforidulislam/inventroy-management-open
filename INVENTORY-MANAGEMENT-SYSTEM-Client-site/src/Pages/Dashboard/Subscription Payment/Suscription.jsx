import React from "react";
import Container from "../../../ShareComponent/Container/Container";
import CardPremium from "./CardPremium";
import { Helmet } from "react-helmet";

const Suscription = () => {
  return (
    <Container>
      <div className="py-6 ">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || suscription </title>
            </Helmet>
        <div className="text-center  text-3xl font-semibold bg-[#03a9f4] p-10 rounded-sm">
           <h1 className="text-white">Subscribe Our Pakage and bost your sales Collection</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            <CardPremium dollor='10' productLimite='200'></CardPremium>
            <CardPremium dollor='20' productLimite='450'></CardPremium>
            <CardPremium dollor='50' productLimite='1500'></CardPremium>
        </div>
      </div>
    </Container>
  );
};

export default Suscription;
