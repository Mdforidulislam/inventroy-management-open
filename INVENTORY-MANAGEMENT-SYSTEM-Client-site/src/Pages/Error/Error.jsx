
import { Empty } from "keep-react";
import Container from "../../ShareComponent/Container/Container";
import { Helmet } from "react-helmet";

const Error = () => {
  return (
    <div>
      <Container>
      <Helmet>
                <meta charSet="utf-8" />
                <title> error </title>
            </Helmet>
        <Empty
          title="404 Not Found"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry."
          buttonText="Go To Home Page"
          redirectBtnSize="md"
          redirectUrl="/"
        />
      </Container>
    </div>
  );
};

export default Error;
