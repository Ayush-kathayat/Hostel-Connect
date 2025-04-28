
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About HostelConnect</h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80" 
              alt="Hostel common area" 
              className="w-full h-64 md:h-80 object-cover"
            />
            
            <div className="p-6">
  <h2 className="text-2xl font-semibold text-hostel-blue mb-4">Our Mission</h2>
  <p className="text-gray-700 mb-4">
    Welcome to Hostel Connect! We understand how important it is to find a safe, affordable, and convenient place to stay while you pursue your studies. Our platform is designed to help you find the best hostels near top-ranked universities across India, making your student life easier and more enjoyable.
  </p>
  
  <h2 className="text-2xl font-semibold text-hostel-blue mb-4 mt-8">What We Offer</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">Comprehensive Search</h3>
      <p className="text-gray-700">
        Find hostels by location, price, and amenities to match your travel needs.
      </p>
    </div>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">Verified Reviews</h3>
      <p className="text-gray-700">
        Read authentic reviews from fellow travelers to make informed decisions.
      </p>
    </div>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">Best Price Guarantee</h3>
      <p className="text-gray-700">
        We work directly with hostels to ensure you get the best possible rates.
      </p>
    </div>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">Community Connection</h3>
      <p className="text-gray-700">
        Connect with other travelers and find the perfect social environment.
      </p>
    </div>
  </div>
  
  <h2 className="text-2xl font-semibold text-hostel-blue mb-4 mt-8">Our Team</h2>
  <p className="text-gray-700 mb-6">
    Team Behind Hostel Connect: We are a group of students passionate about improving the way you search for hostels. Our goal is to simplify your hostel search process and help you find a great place to stay while you're in college.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold text-lg mb-2">
      <a href="https://www.linkedin.com/in/ayush-kathayat-306218248/" target="_blank" rel="noopener noreferrer">Ayush Kathayat</a>
    </h3>
    <p className="text-gray-700">Role: Full Stack Developer</p>
    <p className="text-gray-700">
      <a href="https://www.linkedin.com/in/ayush-kathayat-306218248/" target="_blank" rel="noopener noreferrer" className="text-hostel-blue">LinkedIn</a>
    </p>
  </div>

  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold text-lg mb-2">
      <a href="https://www.linkedin.com/in/rohit--kumar-/" target="_blank" rel="noopener noreferrer">Rohit Kumar</a>
    </h3>
    <p className="text-gray-700">Role: Backend Developer</p>
    <p className="text-gray-700">
      <a href="https://www.linkedin.com/in/rohit--kumar-/" target="_blank" rel="noopener noreferrer" className="text-hostel-blue">LinkedIn</a>
    </p>
  </div>

  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold text-lg mb-2">
      <a href="https://www.linkedin.com/in/sutirthochakravorty/" target="_blank" rel="noopener noreferrer">Sutirtho Chakravorty</a>
    </h3>
    <p className="text-gray-700">Role: Frontend Developer</p>
    <p className="text-gray-700">
      <a href="https://www.linkedin.com/in/sutirthochakravorty/" target="_blank" rel="noopener noreferrer" className="text-hostel-blue">LinkedIn</a>
    </p>
  </div>

  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-semibold text-lg mb-2">
      <a href="https://www.linkedin.com/in/bala-shashi-51249b219/" target="_blank" rel="noopener noreferrer">Shashi Bala</a>
    </h3>
    <p className="text-gray-700">Role: Frontend Developer</p>
    <p className="text-gray-700">
      <a href="https://www.linkedin.com/in/bala-shashi-51249b219/" target="_blank" rel="noopener noreferrer" className="text-hostel-blue">LinkedIn</a>
    </p>
  </div>
</div>

</div>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
