import Container from "../../ShareComponent/Container/Container";
<link rel="stylesheet" href="bower_components/aos/dist/aos.css" />;
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DemoVideo = () => {
  useEffect(() => {
    AOS.init({
    });
  }, []);
  const videoDemo = [
    {
      url: "https://youtu.be/UKsm7nK_zDQ?si=Fa7m1Kq9GGJ5Yv3A",
      title: "Video 1",
    },
    {
      url: "https://youtu.be/UKsm7nK_zDQ?si=Fa7m1Kq9GGJ5Yv3A",
      title: "Video 2",
    },
    {
      url: "https://youtu.be/UKsm7nK_zDQ?si=Fa7m1Kq9GGJ5Yv3A",
      title: "Video 3",
    },
    {
      url: "https://youtu.be/UKsm7nK_zDQ?si=Fa7m1Kq9GGJ5Yv3A",
      title: "Video 4",
    },
    {
      url: "https://youtu.be/UKsm7nK_zDQ?si=Fa7m1Kq9GGJ5Yv3A",
      title: "Video 4",
    },
    {
      url: "https://youtu.be/UKsm7nK_zDQ?si=Fa7m1Kq9GGJ5Yv3A",
      title: "Video 4",
    },
  ];

  return (
    <Container>
      <div>
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videoDemo?.map((video) => (
            <div
              key={video.url}
              className="relative overflow-hidden rounded-lg"
            >
              <iframe width="560" height="315" src="https://www.youtube.com/embed/UKsm7nK_zDQ?si=Tm22kbthDXAt3n3P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DemoVideo;
