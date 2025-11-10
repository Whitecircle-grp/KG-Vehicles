import React from 'react';
import { FaBell, FaShieldAlt, FaCar, FaUsers, FaCode, FaHeart, FaRocket, FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.1) 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2 mb-8">
            <FaHeart className="text-red-400 mr-2" />
            <span className="text-blue-300 text-sm font-medium">Built with Passion</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent"> KG Vehicles</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing vehicle management through intelligent automation, 
            secure technology, and user-centric design.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaShieldAlt className="text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart & Secure</h3>
              <p className="text-gray-300 leading-relaxed">
                We eliminate the hassle of managing vehicle insurance policies through 
                intelligent automation and military-grade security protocols.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaBell className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Timely Reminders</h3>
              <p className="text-gray-300 leading-relaxed">
                Our smart notification system sends automated email alerts exactly when you need them, 
                ensuring renewals are smooth and stress-free.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaCar className="text-purple-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Built for Everyone</h3>
              <p className="text-gray-300 leading-relaxed">
                Whether you're managing a single vehicle or an entire fleet, 
                our solution adapts to your needs with scalable, user-friendly design.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Why Choose  KG Vehicles?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
                  <FaCheckCircle className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Never Miss a Deadline</h4>
                  <p className="text-gray-300">Advanced notification system ensures you're always few days ahead of any expiry.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                  <FaCheckCircle className="text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Enterprise-Grade Security</h4>
                  <p className="text-gray-300">  We value your privacy — all your details are kept secure and never shared with anyone.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/20 p-2 rounded-lg mt-1">
                  <FaCheckCircle className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Grows With You</h4>
                  <p className="text-gray-300">  Whether you manage one vehicle or an entire fleet, KG Vehicles is built to handle it all — easily and efficiently.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
                  <div className="text-gray-300 text-sm">Missed Renewals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-gray-300 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
                  <div className="text-gray-300 text-sm">Days Notice</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-gray-300 text-sm">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">KG VEHICLES </h2>
            <p className="text-gray-300 text-lg">Succesfull  Work Last 30 + Years</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-green-500/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-green-400 text-xl font-bold">1500+ </span>
              </div>
              <h4 className="text-white font-semibold">Commercial Construction Done</h4>
            </div>
            
            <div className="text-center group">
              <div className="bg-yellow-500/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-yellow-400 text-xl font-bold">3500+</span>
              </div>
              <h4 className="text-white font-semibold">Trusted Clients</h4>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-blue-400 text-xl font-bold">5000+</span>
              </div>
              <h4 className="text-white font-semibold">Reta, Gitti, Iron Completed Supplier</h4>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-600/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-green-500 text-xl font-bold">3000+</span>
              </div>
              <h4 className="text-white font-semibold">Cement + Senetry Ware  Supplie</h4>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="flex items-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <FaCode className="text-blue-400 mr-3" />
              <span className="text-white font-medium">Truthed organisation</span>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Our Commitment</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <FaRocket className="text-blue-400 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Innovation First</h3>
              <p className="text-gray-300 leading-relaxed">
                Continuously evolving our platform with cutting-edge technology 
                to deliver the best user experience.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <FaUsers className="text-green-400 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">User-Centric</h3>
              <p className="text-gray-300 leading-relaxed">
                Every feature is designed with our users in mind, ensuring 
                simplicity without compromising functionality.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <FaShieldAlt className="text-purple-400 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Trust & Security</h3>
              <p className="text-gray-300 leading-relaxed">
                Your data is protected with enterprise-level security measures 
                and transparent privacy practices.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience the Future of Vehicle Management?
            </h3>
            <p className="text-gray-300 text-lg mb-6 italic">
              Embrace the smarter way to manage insurance. No stress. No surprises. Just peace of mind.
            </p>
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
              onClick={() => window.location.href='/login'}
            >
              Join  KG Vehicles Today
              <FaRocket className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-pulse"></div>
      <div className="fixed top-40 right-20 w-6 h-6 bg-purple-500/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="fixed bottom-20 left-20 w-3 h-3 bg-green-500/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default About;
