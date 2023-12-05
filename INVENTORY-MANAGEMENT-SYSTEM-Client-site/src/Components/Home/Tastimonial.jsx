// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Container from "../../ShareComponent/Container/Container";
import SectionTitle from '../../ShareComponent/SectionTitle/SectionTitle';


function StarIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-yellow-700"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    );
  }



const Tastimonial = () => {
  const myCustomerData = [
    {
      id: 1,
      name: "John Doe",
      title: "Fantastic Product!",
      description:
        "I recently purchased this product and it exceeded my expectations. The quality is superb, and it's worth every penny.",
      review: "5 stars",
      img: "https://example.com/john-doe.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Highly Recommended",
      description:
        "I've been using this product for a month, and I'm impressed with its performance. Definitely recommend it to others.",
      review: "4 stars",
      img: "https://example.com/jane-smith.jpg",
    },
    {
      id: 3,
      name: "Bob Johnson",
      title: "Great Customer Service",
      description:
        "Had an issue with my order, but the customer service team was quick to resolve it. Excellent service!",
      review: "5 stars",
      img: "https://example.com/bob-johnson.jpg",
    },
    {
      id: 4,
      name: "Emily White",
      title: "Beautiful Design",
      description:
        "The design of this product is not only functional but also aesthetically pleasing. I'm happy with my purchase.",
      review: "4 stars",
      img: "https://example.com/emily-white.jpg",
    },
    {
      id: 5,
      name: "David Brown",
      title: "Easy to Use",
      description:
        "As a first-time user, I found this product very user-friendly. The instructions were clear, and I had no trouble getting started.",
      review: "5 stars",
      img: "https://example.com/david-brown.jpg",
    },
  ];

  return (
    <Container>
      <div className="border p-10 rounded-xl shadow-sm">
        <div className='py-6 mb-6'>
            <SectionTitle title='Customer Testimonials' description='All the customer Review and comments here , that make good relation and better service '></SectionTitle>
        </div>
        <Swiper
          spaceBetween={50}
          modules={[Navigation, Pagination, Scrollbar, A11y]}

          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          loop={Infinity}
          pagination={{ clickable: true }}

        >
          {myCustomerData?.map((client) => (
            <SwiperSlide key={client.id}>
              <Card
                color="transparent"
                shadow={false}
                className="w-full max-w-[26rem] border p-6"
              >
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="mx-0 flex items-center gap-4 pt-0 pb-8"
                >
                  <Avatar
                    size="lg"
                    variant="circular"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt="tania andrew"
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                       {client?.name}
                      </Typography>
                      <div className="5 flex items-center gap-0">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                      </div>
                    </div>
                    <Typography color="blue-gray">
                      {client?.title}
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="mb-6 p-0">
                  <Typography>
                    &quot;{client?.description} !!!&quot;
                  </Typography>
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Tastimonial;
