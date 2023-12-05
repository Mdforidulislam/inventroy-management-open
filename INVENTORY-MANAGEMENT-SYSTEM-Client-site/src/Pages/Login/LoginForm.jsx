import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/Authentication";
import useUserShop from "../../Hooks/useUserShop";

const LoginForm = () => {
  const {singingWithemail,googleLogin} = useContext(AuthContext)
 
  const navigation = useNavigate()
  const location = useLocation()
  // const form = location.state.from.pathname || '/' ;
  console.log(location);
const handleSubmiteForm = (event) =>{
      event.preventDefault()
      const email = event.target.email.value;
      const password = event.target.password.value;
      singingWithemail(email, password)
      .then(result =>{
        console.log(result)
        navigation('/dashboard/home')
      })
      .catch(error => console.log(error))
}

const handleLoginGoogle = () =>{
  googleLogin()
.then(result => {   
  console.log(result)
  navigation('/dashboard/home')
})
  .catch(error => console.log(error))
}
  return (
      <Card color="transparent" shadow={true} className="p-10" style={{width:'100%',height:'100%'}} >
        <Typography variant="h4" color="white">
          Sign In
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Login.
        </Typography>
        <form onSubmit={handleSubmiteForm} className="mt-8 mb-2 w-full">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="white" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              type="email"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="white" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="white"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            sign In
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
           Create Account here?{" "}
              <Link to='/register'> Sign Up</Link>
          </Typography>
        </form>
        <Button
          onClick={handleLoginGoogle}
              size="lg"
              variant="outlined"
              color="white"
              className="flex items-center gap-3"
            >
              <img
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
              Continue with Google
          </Button>
      </Card>
  );
};

export default LoginForm;
