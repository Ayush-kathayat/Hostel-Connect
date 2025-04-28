import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  School,
  Search,
  Star,
  Shield,
  HomeIcon,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-hostel-blue to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 leading-tight">
            Find the Perfect Hostel in India
          </h1>
          <p className="text-xl md:text-2xl text-center mb-10 max-w-2xl leading-relaxed">
            Discover affordable and comfortable accommodations near top
            universities and major cities across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Button
              size="lg"
              className="bg-white text-hostel-blue hover:bg-gray-100 font-semibold px-8 py-6 rounded-lg shadow-md transition-all hover:shadow-xl"
            >
              <Search className="mr-3 h-5 w-5" /> Find Hostels
            </Button>
            <Button
              size="lg"
              className="bg-blue-800 text-white hover:bg-blue-900 font-semibold px-8 py-6 rounded-lg shadow-md transition-all hover:shadow-xl border border-blue-600"
            >
              <HomeIcon className="mr-3 h-5 w-5" /> Post Hostels
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          How HostelConnect Works
        </h2>
        <div className="w-24 h-1 bg-hostel-blue mx-auto mb-10 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
          Finding the right hostel has never been easier. Our platform helps you
          discover, compare and book hostels all in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="rounded-full bg-hostel-lightBlue bg-opacity-20 p-5 inline-flex items-center justify-center mb-6">
              <Search className="text-hostel-blue" size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Search
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Search for hostels by city or university to find accommodations
              that match your needs and preferences.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="rounded-full bg-hostel-lightOrange bg-opacity-20 p-5 inline-flex items-center justify-center mb-6">
              <Star className="text-hostel-orange" size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Compare
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Compare amenities, prices, and reviews to find the perfect hostel
              for your stay within your budget.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="rounded-full bg-green-100 p-5 inline-flex items-center justify-center mb-6">
              <Shield className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Book Securely
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Book your hostel with confidence through our secure platform with
              verified listings and payment protection.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-20 border-t border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
            Why Choose HostelConnect?
          </h2>
          <div className="w-24 h-1 bg-hostel-blue mx-auto mb-16 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="rounded-full bg-hostel-lightBlue bg-opacity-20 p-5 inline-flex items-center justify-center mb-6 mx-auto">
                <MapPin className="text-hostel-blue" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Location-Based Search
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find hostels near your current location or any destination with
                our precise search and mapping system.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="rounded-full bg-hostel-lightOrange bg-opacity-20 p-5 inline-flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-hostel-orange"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Best Prices
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get the best deals on hostels with our price comparison and
                exclusive offers tailored for students.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="rounded-full bg-hostel-lightBlue bg-opacity-20 p-5 inline-flex items-center justify-center mb-6 mx-auto">
                <School className="text-hostel-blue" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                University Proximity
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find hostels within a 10km radius of top educational
                institutions across India for convenient commuting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-6 py-20">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
    Popular Destinations
  </h2>
  <div className="w-24 h-1 bg-hostel-blue mx-auto mb-16 rounded-full"></div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { city: "Mumbai", img: "/public/City photos/Mumbai.jpeg" },
      { city: "Delhi", img: "/public/City photos/Delhi.webp" },
      { city: "Bangalore", img: "/public/City photos/Banglore.webp" },
      { city: "Chennai", img: "/public/City photos/hydrebad.jpeg" },
      { city: "Hyderabad", img: "/public/City photos/Chennai.jpeg" },
      { city: "Kolkata", img: "/public/City photos/Kolkata.png" },
      { city: "Pune", img: "public/City photos/Pune'.jpeg" },
      { city: "Ahmedabad", img: "/public/City photos/ahmedabad.webp" },
    ].map(({ city, img }) => (
      <div
        key={city}
        className="bg-white rounded-xl overflow-hidden transition-all hover:shadow-xl border border-gray-200 hover:border-hostel-blue group"
      >
        <div className="h-48 relative">
          <img
            src={img}
            alt={city}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
            <h3 className="text-white font-semibold text-xl group-hover:text-hostel-lightBlue transition-colors">
              {city}
            </h3>
          </div>
        </div>
        <div className="p-4 bg-white flex justify-between items-center">
          <span className="text-gray-600 text-sm">Find hostels</span>
          <ArrowRight
            size={16}
            className="text-hostel-blue opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    ))}
  </div>
</div>


      {/* CTA Section */}
      <div className="bg-gradient-to-r from-hostel-blue to-blue-700 py-20 shadow-lg">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Find Your Perfect Hostel?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who've found their ideal accommodation
            through HostelConnect.
          </p>
          <Button
            size="lg"
            className="bg-white text-hostel-blue hover:bg-gray-100 font-semibold px-8 py-6 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            Start Searching Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          What Our Users Say
        </h2>
        <div className="w-24 h-1 bg-hostel-blue mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Priya S.",
              university: "Delhi University",
              quote:
                "HostelConnect helped me find affordable accommodation just 2km from my campus. I couldn't be happier with my hostel!",
            },
            {
              name: "Rahul K.",
              university: "IIT Mumbai",
              quote:
                "The comparison tools made it easy to find a hostel that had all the amenities I needed within my budget.",
            },
            {
              name: "Anjali P.",
              university: "Bangalore Institute of Technology",
              quote:
                "As a student from another state, finding accommodation was my biggest worry. HostelConnect made it simple and stress-free.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-center justify-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed text-center">
                "{testimonial.quote}"
              </p>
              <div className="text-center">
                <div className="font-semibold text-lg text-gray-800">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {testimonial.university}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
