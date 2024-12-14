import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Footer from "../footer/footer";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [time, setTime] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let startTime;
    if (scrolling) {
      startTime = Date.now();
      const timer = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [scrolling]);

  const handleScroll = () => {
    if (window.scrollY > 50 && !scrolling) {
      setScrolling(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolling]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blackish-blue to-green-gradient relative overflow-hidden mt-20">
      <Header />

      {/* Animated Squares */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300 rounded-lg opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 bg-indigo-400 rounded-lg opacity-20 animate-bounce"></div>
      <div className="absolute top-20 right-1/4 w-24 h-24 bg-purple-300 rounded-lg opacity-25 animate-ping"></div>

      {/* Header Section */}
      <header className="text-center py-12">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Welcome to TickBook
        </h1>
        <p className="mt-4 text-xl text-white/90 font-light">
          Discover and book your favorite events, programs, and experiences.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16 relative z-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    {/* Left Content */}
    <div>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-6 drop-shadow-lg">
        Built for the events of today and tomorrow
      </h2>
      <p className="text-lg text-white/90 leading-relaxed">
        Whether it's concerts, workshops, conferences, or local meetups, we help you find events that match your interests. Book tickets effortlessly and stay updated with the latest programs.
      </p>
      <button onClick={() => navigate('/signup')} className="mt-8 mr-4 px-6 py-3 bg-red-500 text-white font-medium text-lg shadow-md hover:bg-indigo-100 hover:text-black transition duration-300">
        SIGN UP NOW
      </button>
      <button onClick={()=>navigate('/events')} className="mt-8 px-6 py-3 bg-transparent border-2 border-blue-500 text-indigo-600 font-medium text-lg rounded-sm shadow-md hover:bg-indigo-100 transition duration-300">
        Explore Events
      </button>
    </div>

    {/* Right Content */}
    <div className="relative">
      <img
        src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1734198914/rb_61944_taorh0.png"
        alt="Event illustration"
        className="rounded-xl shadow-sm w-full h-auto"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-20 rounded-lg"></div>
    </div>
  </div>
</main>

{/* Plan and Execute Section */}
<div className="bg-white py-16 mt-16">
  <main className="max-w-7xl mx-auto px-8 py-16 relative z-10">
    <div className="flex flex-col md:flex-row items-center">
      {/* Left Content */}
      <div className="mb-8 md:mb-0 md:w-1/2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-6 drop-shadow-lg">
          Plan, Execute, and Analyze Your Event—All in One Seamless Platform
        </h2>
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-40 rounded-lg"></div>
        <p className="text-lg text-black/90 leading-relaxed">
          Say goodbye to juggling tools. Our fully customizable event booking platform makes it easy to manage everything—from seamless online event bookings to attendee tracking—all in one place. Conducting live online events will be available in the future!
        </p>
      </div>
    </div>
  </main>
</div>

{/* Do More in Less Time Section */}
<div className="flex justify-center bg-white">
  <div className="flex flex-col md:flex-row bg-gradient-to-br from-black to-blackish-blue w-full md:w-11/12 rounded-xl h-auto md:h-screen justify-center md:justify-start relative">
    {/* Left Content */}
    <div className="mt-12 sm:mt-16 ml-4 sm:ml-8 md:ml-12 lg:ml-24 text-center md:text-left">
      <h5 className="text-green-500 text-base sm:text-lg md:text-xl">DO MORE IN LESS TIME</h5>
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
        End-to-end
      </h1>
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
        event planning
      </h1>
      
    </div>

    {/* Center Image */}
    <div className="flex items-center justify-center w-full md:w-1/2 mt-8 md:mt-0">
      <img
        src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1734183764/rb_2148560144_gkaumr.png"
        alt="Event Planning"
        className="w-5/6 sm:w-4/5 md:w-11/12 lg:w-full max-w-md md:max-w-lg lg:max-w-2xl object-contain"
      />
    </div>
  </div>
</div>


      {/* --------------------------------------   */}
      <div className="h-auto bg-white">
  {/* First Main Section */}
  <main className="container mx-auto px-8 py-16 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left Content */}
      <div>
        <h4 className="text-blue-800 text-lg font-normal">
          CREATE EVENTS
        </h4>
        <h2 className="text-4xl font-semibold text-black mb-6 drop-shadow-lg sm:text-3xl">
          Built for the events of today and tomorrow
        </h2>
        <p className="text-lg text-black/90 leading-relaxed sm:text-base">
          Whether it's concerts, workshops, conferences, or local meetups,
          we help you find events that match your interests. Book tickets
          effortlessly and stay updated with the latest programs.
        </p>
        <h5 className="text-blue-800 text-lg font-normal sm:text-base">
          Explore our event ticketing platform
        </h5>
      </div>

      {/* Right Content */}
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1734180666/rb_23_bh54xv.png"
          alt="Event illustration"
          className="rounded-lg shadow-sm w-full sm:w-11/12"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-5 rounded-lg"></div>
      </div>
    </div>
  </main>

  {/* Second Main Section */}
  <main className="container mx-auto px-8 py-16 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left Content */}
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1734180644/cancelled-events-announcement-concept_lf1jlg.png"
          alt="Event illustration"
          className="rounded-sm shadow-sm w-full sm:w-11/12"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-10 rounded-lg"></div>
      </div>

      {/* Right Content */}
      <div>
        <h2 className="text-4xl font-semibold text-black mb-6 drop-shadow-lg sm:text-3xl">
          KEEP THEM HOOKED
        </h2>
        <h5 className="text-blue-800 text-xl sm:text-lg">
          Seamless Audience Engagement
        </h5>
        <p className="text-lg text-black/90 leading-relaxed sm:text-base">
          Whether onsite or online, our interactive tools like live polls,
          networking lounges, discussion channels, and 1:1 meeting features
          make engaging attendees effortless. Foster meaningful connections,
          spark discussions, and build a vibrant community with ease.
        </p>
        <h5 className="text-orange-500 text-lg font-normal sm:text-base">
          Explore our audience engagement features
        </h5>
      </div>
    </div>
  </main>
</div>

      {/* ---------------------------------   */}
      {/* Blue Box with Stopwatch */}
 <div className="flex items-center justify-center bg-white relative h-auto md:h-80">
  <h1></h1>

  {/* Left Section (Hidden on Mobile) */}
  <div className="hidden lg:block w-1/6 bg-white"></div>

  {/* Center Section */}
  <div className="w-full h-auto flex items-center justify-center relative shadow-2xl rounded-lg overflow-hidden mx-6">
    <div className="w-full p-6 sm:p-8 md:p-10 bg-gradient-to-br from-black via-blackish-blue to-green-gradient rounded-lg shadow-lg text-center text-white relative z-10 backdrop-blur-md">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md">
        Book Your Event
      </h2>
      <div className="text-2xl sm:text-3xl md:text-4xl font-mono mb-4">
        <span>Time Up: </span>
        <span className="font-bold">{time}s</span>
      </div>
      <button onClick={() => navigate('/login')} className="mt-8 px-6 sm:px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold text-lg rounded-lg shadow-md hover:opacity-90 transition duration-300">
         Sign In
      </button>
    </div>

    {/* Subtle Background Animation */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 opacity-20"></div>
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-green-400 to-blue-400 rounded-full blur-3xl opacity-30"></div>
    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-bl from-purple-500 to-pink-400 rounded-full blur-3xl opacity-20"></div>
  </div>

  {/* Right Section (Hidden on Mobile) */}
  <div className="hidden lg:block w-1/6 bg-white"></div>
</div>

      {/* -------------------------   */}


      <div className="h-auto bg-white">
  {/* First Main Section */}

  {/* Second Section with Poll */}
  <main className="container mx-auto px-8 py-16 relative z-10 border-t-2 border-gray-200">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Poll Text (Left Side) */}
      <div>
        <h4 className="text-blue-800 text-lg font-normal sm:text-base">
          JOIN OUR POLL
        </h4>
        <h2 className="text-4xl font-semibold text-black mb-6 drop-shadow-lg sm:text-3xl">
          Your feedback helps us grow!
        </h2>
        <p className="text-lg text-black/90 leading-relaxed sm:text-base">
          We’d love to hear your opinions about our platform. Take a moment
          to answer a few quick questions and help us make TickBook better for
          you.
        </p>
      </div>

      {/* Poll Options (Right Side) */}
      <div className="relative bg-gray-100 p-6 rounded-lg shadow-lg sm:w-full">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 sm:text-xl">
          Take the Poll
        </h3>
        <form>
          {/* Question 1 */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2 sm:text-base">
              Are you interested in our platform?
            </label>
            <div className="space-y-2">
              <label className="flex items-center sm:text-sm">
                <input
                  type="radio"
                  name="interested"
                  value="yes"
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center sm:text-sm">
                <input
                  type="radio"
                  name="interested"
                  value="no"
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2 sm:text-base">
              Have you created events on our platform?
            </label>
            <div className="space-y-2">
              <label className="flex items-center sm:text-sm">
                <input
                  type="radio"
                  name="created_events"
                  value="yes"
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center sm:text-sm">
                <input
                  type="radio"
                  name="created_events"
                  value="no"
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-6 py-3 w-full sm:w-11/12 bg-gradient-to-br from-blue-gradient via-green-950 to-green-gradient rounded-xl text-white font-medium text-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </main>
</div>


      {/* Final Call to Action */}
     <div className="bg-white text-black py-16 text-center mb-32">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
    Ready to manage your events
  </h1>
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
    smarter, better?
  </h1>
  <button onClick={() => navigate('/events')} className="mt-4 px-6 py-3 bg-red-500 text-white font-medium text-lg rounded-sm shadow-md hover:bg-red-600 transition duration-300">
    Get Started Now
  </button>
</div>


      <Footer />
    </div>
  );
};

export default HomePage;
