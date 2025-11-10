import React, { useState } from "react";

const SmsForm = ({ onClose }) => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("https://auto-track-server.onrender.com/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, message }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setPhone("");
        setMessage("");
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      setStatus("❌ Failed to send: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📩 Send SMS
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+15551234567"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send SMS"}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div className="mt-4 text-center">
            <p
              className={`text-sm font-medium ${
                status.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
            <button
              onClick={onClose}
              className="mt-3 bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmsForm;
