import Container from "../../ShareComponent/Container/Container";
import LoginForm from "./LoginForm";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login-animation.json";
import { Button } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <div className="bg-[#3ea4d1] w-full h-screen flex justify-center items-center">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home || Login page </title>
            </Helmet>
      <Container>
        <div className="bg-gradient-to-r from-[#96dff6] to-[#4db1dc] w-[1200px] h-full md:h-[700px] rounded-xl block  md:flex justify-center gap-6  items-center">
          <div className="flex-1">
            <Lottie
              animationData={loginAnimation}
              loop={true}
              style={{ width: "400px" }}
            />
          </div>
          <div className="bg-[#009fce] shadow-2xl p-12 rounded-xl flex-1 w-full h-full">
            <LoginForm></LoginForm>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
