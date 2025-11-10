import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaCar,
  FaBell,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaCheckCircle,
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.1) 2px, transparent 2px)',
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2 mb-8">
              <FaShieldAlt className="text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">
                Vehicle Management Made Simple
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                KG VEHICLES
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-normal text-gray-300">
                Smart Vehicle Management
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Never miss another vehicle document expiry. AutoTrack
              intelligently manages your fleet with automated reminders,
              comprehensive tracking, and seamless administration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center"
                onClick={() => navigate('/login')}
              >
                Get Started Free
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <FeatureCard
              icon={<FaCar className="text-blue-400 text-2xl" />}
              title="Smart Vehicle Tracking"
              description="Comprehensive vehicle management with detailed records, document uploads, and real-time status monitoring."
              color="blue"
            />
            <FeatureCard
              icon={<FaBell className="text-purple-400 text-2xl" />}
              title="Automated Reminders"
              description="Never miss expiry dates with intelligent email notifications and customizable alert preferences."
              color="purple"
            />
            <FeatureCard
              icon={<FaUsers className="text-green-400 text-2xl" />}
              title="Admin Dashboard"
              description="Powerful admin tools for managing users, vehicles, and system-wide analytics with ease."
              color="green"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Manage Your Fleet
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built with a modern technology stack for reliability, security, and
            performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <SubFeature
              color="blue"
              title="Real-Time Vehicle Tracking"
              text="Monitor vehicle locations and movements in real time for better fleet control and route optimization."
            />
            <SubFeature
              color="purple"
              title="Centralized Vehicle Records"
              text="Store and manage all vehicle details, including registration, maintenance, insurance, and driver info in one place."
            />
            <SubFeature
              color="green"
              title="Automated Maintenance Reminders"
              text="Set up smart notifications for upcoming service dates, insurance renewals, and fitness checks."
            />
          </div>

          {/* Dashboard Preview */}
          <DashboardPreview />
        </div>
      </div>

      {/* Company Section */}
      <div className="bg-white/5 backdrop-blur-lg border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              KG VEHICLES
            </h2>
            <p className="text-gray-300 text-lg">
              Successful Work for the Last 30+ Years
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              bg="bg-green-500/20"
              textColor="text-green-400"
              title="1500+"
              description="Commercial Constructions Completed"
            />
            <StatCard
              bg="bg-yellow-500/20"
              textColor="text-yellow-400"
              title="3500+"
              description="Trusted Clients"
            />
            <StatCard
              bg="bg-blue-500/20"
              textColor="text-blue-400"
              title="5000+"
              description="Reta, Gitti, and Iron Supplies"
            />
            <StatCard
              bg="bg-green-600/20"
              textColor="text-green-500"
              title="3000+"
              description="Cement & Sanitary Ware Supplies"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Vehicle Management?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust AutoTrack for their vehicle
            management needs. Get started today and never miss an important
            deadline again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center"
              onClick={() => navigate('/login')}
            >
              Start Managing Vehicles
              <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              className="border border-gray-500 text-gray-300 hover:text-white hover:border-gray-400 font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:bg-white/5"
              onClick={() => navigate('/about')}
            >
              Learn More
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-white/10">
            <FeatureFooter icon={<FaShieldAlt />} text="100% Secure" color="text-green-400" />
            <FeatureFooter icon={<FaBell />} text="Smart Alerts" color="text-yellow-400" />
            <FeatureFooter icon={<FaChartLine />} text="Analytics" color="text-blue-400" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-pulse"></div>
      <div
        className="fixed top-40 right-20 w-6 h-6 bg-purple-500/30 rounded-full animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="fixed bottom-20 left-20 w-3 h-3 bg-green-500/30 rounded-full animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>
    </div>
  );
};

/* --- Subcomponents --- */

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
    <div
      className={`bg-${color}-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
);

const StatsSection = () => (
  <div className="relative bg-white/5 backdrop-blur-lg border-y border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          ['100%', 'Secure'],
          ['24/7', 'Monitoring'],
          ['Auto', 'Reminders'],
          ['Cloud', 'Based'],
        ].map(([num, label]) => (
          <div className="text-center" key={label}>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {num}
            </div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SubFeature = ({ color, title, text }) => (
  <div className="flex items-start space-x-4">
    <div className={`bg-${color}-500/20 p-3 rounded-lg`}>
      <FaCheckCircle className={`text-${color}-400 text-xl`} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{text}</p>
    </div>
  </div>
);

const DashboardPreview = () => (
  <div className="relative">
    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-white font-bold text-lg">Dashboard Preview</h4>
        <FaChartLine className="text-blue-400 text-xl" />
      </div>
      {[
        ['Active Vehicles', '24', 'text-white'],
        ['Expiring Soon', '3', 'text-yellow-400'],
        ['Total Users', '156', 'text-green-400'],
      ].map(([label, value, color]) => (
        <div key={label} className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">{label}</span>
            <span className={`${color} font-bold`}>{value}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StatCard = ({ bg, textColor, title, description }) => (
  <div className="text-center group">
    <div
      className={`${bg} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
    >
      <span className={`${textColor} text-2xl font-bold`}>★</span>
    </div>
    <h4 className="text-white font-semibold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const FeatureFooter = ({ icon, text, color }) => (
  <div className="flex items-center text-gray-400">
    <span className={`${color} mr-2`}>{icon}</span>
    <span className="text-sm">{text}</span>
  </div>
);

export default Home;
