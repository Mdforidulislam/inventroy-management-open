import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/Authentication";
import Swal from "sweetalert2";

import useAxiosPublice from "../../Hooks/useAxiosPublice";


const RegisterForm = () => {
  const { createUser, setProfile } = useContext(AuthContext);
  // const [fileName, setFileName] = useState("");

  const navigation = useNavigate();
  const axioxpublice = useAxiosPublice();


  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  
  //     setFileName(formData);
  //   }
  // };


  const handlesumite = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userImg = event.target.img.value;
    const userInfo = {name,email,userImg}
    // console.log(email, password,fileName);

    // const res = await axioxpublice.post(img_hosting_api,fileName,{
    //   headers:{
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })

    // console.log('form here',res);

   const userData = await axioxpublice.post('/users',userInfo)
   console.log(userData);


    createUser(email, password)
      .then((result) => {
        console.log(result);
        if (result) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You are successfully register",
            showConfirmButton: false,
            timer: 1200,
          });
        }

        navigation("/shopecrease");

        setProfile(result.user, name , userImg);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card
      color="transparent"
      shadow={true}
      className="flex flex-col p-5 justify-center items-center h-full"
    >
      <Typography variant="h4" color="white">
        Sign Up
      </Typography>
      <Typography color="white" className="mt-1 font-normal text-center">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-full max-w-screen-md"
        onSubmit={handlesumite}
      >
        <div className="mb-6 flex flex-col gap-6">
          <Typography variant="h6" color="white">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="Your Name"
            name="name"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white">
            Your Image URL
          </Typography>
          <Input
            size="lg"
            placeholder="Your Name"
            name="img"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            name="email"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            name="password"
            placeholder="Password"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                className="font-medium transition-colors hover:text-gray-900 ml-1"
              >
                Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "ml-0" }}
        />
        <Button type="submit" className="mt-6" fullWidth>
          Sign Up
        </Button>
        <Typography color="white" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default RegisterForm;
