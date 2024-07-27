import Image from "next/image";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/email', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while subscribing.");
      console.error(error);
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image src={assets.logo} alt="logo" className="w-[130px] sm:w-auto" />
        {/* <Link href={'/admin/addProduct'} className="flex items-center gap-2 font-medium py-1 px-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get Started
          <Image src={assets.arrow} alt="arrow" />
        </Link> */}
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="pl-4 outline-none"
            type="email"
            placeholder="Enter your email"
          />
          <button type="submit" className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
