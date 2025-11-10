import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  FaPaperPlane,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let timer;
    if (submitted || errorMsg) {
      timer = setTimeout(() => {
        setSubmitted(false);
        setErrorMsg("");
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [submitted, errorMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
     "service_284851q",
         "template_1tv4l43",
        e.target,
         "Bgi_-TNE4JD0JO9Ws"
      )
      .then(
        () => {
          setIsLoading(false);
          setSubmitted(true);
          setErrorMsg("");
          e.target.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          setIsLoading(false);
          setErrorMsg("❌ Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.1) 2px, transparent 2px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2 mb-8">
            <FaHeadset className="text-blue-400 mr-2" />
            <span className="text-blue-300 text-sm font-medium">
              We're Here to Help
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about AutoTrack? We'd love to hear from you. Send us
            a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Enter your name"
                      required
                      className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Enter your email"
                      required
                      className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    required
                    className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <FaCheckCircle className="mr-3" />
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* ✅ Feedback Messages */}
              {submitted && (
                <p className="mt-4 text-green-400 font-medium text-center">
                  Thank you! Your message has been sent.
                </p>
              )}
              {errorMsg && (
                <p className="mt-4 text-red-400 font-medium text-center">
                  {errorMsg}
                </p>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300 text-sm">sawanmishra2002@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                    <FaPhone className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-300 text-sm">+91 93993 45242</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-300 text-sm">Shahdol, Madhya Pradesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <div className="text-center">
                <FaClock className="text-blue-400 text-3xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Quick Response</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We typically respond within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-semibold mb-4">Support Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
