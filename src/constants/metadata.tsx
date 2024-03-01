import linkedinPhoto from "@/public/linkedin-photo.jpeg";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryan Eloy | Portfolio",
  description:
    "Passionate about technology with 5-6 years of experience creating scalable and efficient web applications. Driven by challenges!",
  authors: [
    {
      name: "Ryan Eloy",
      url: "www.linkedin.com/in/ryan-eloy-5906b91a5",
    },
  ],
  openGraph: {
    title: "Ryan Eloy | Portfolio",
    description:
      "Passionate about technology with 5-6 years of experience creating scalable and efficient web applications. Driven by challenges!",
    images: [linkedinPhoto.src],
  },
  category: "Web Development",
  robots: "index",
};
