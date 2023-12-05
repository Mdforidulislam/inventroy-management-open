
import { Helmet } from "react-helmet";
import Container from "../../../ShareComponent/Container/Container";
import ProductTable from "./ProductTable";

const ProductMangement = () => {
  return (
    <Container>
      <div className="w-full">
        <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || product pages </title>
            </Helmet>
            <ProductTable></ProductTable>
        </div>
      </div>
    </Container>
  );
};

export default ProductMangement;
