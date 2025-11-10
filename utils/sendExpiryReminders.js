// utils/sendExpiryReminders.js
const Vehicle = require("../models/Vehicle");
const EmailList = require("../models/EmailList");
const PhoneList = require("../models/PhoneList");
const sendEmail = require("./mailer");
const sendWhatsapp = require("./sendWhatsapp");

const sendExpiryReminders = async () => {
  console.log("Running expiry check...");

  const today = new Date();
  const deadline = new Date(today);
  deadline.setDate(today.getDate() + 7);

  try {
    const vehicles = await Vehicle.find({oldVehicle: false});

    for (const vehicle of vehicles) {
      const userId = vehicle.createdBy;
      const upcomingExpiries = [];

      const expiryFields = {
        Insurance: vehicle.insuranceExpiry,
        Fitness: vehicle.fitnessExpiry,
        Permit: vehicle.permitExpiry,
        Pollution: vehicle.pollutionExpiry,
        Tax: vehicle.taxExpiry,
      };

      for (const [type, date] of Object.entries(expiryFields)) {
        if (date && date <= deadline && date >= today) {
          upcomingExpiries.push(`${type} - ${date.toDateString()}`);
        }
      }

      if (upcomingExpiries.length > 0) {
        const emails = await EmailList.find({ addedBy: userId });

        for (const entry of emails) {
          await sendEmail(
            entry.email,
            "Vehicle Document Expiry Alert",
            `Dear User,\n\nThe following documents for vehicle "${vehicle.vehicleNumber}" are expiring soon:\n\n${upcomingExpiries.join(
              "\n"
            )}\n\nPlease renew them to avoid penalties.\n\n- KG Vehicles`
          );
        }
        const phones = await PhoneList.find({ addedBy: userId });
        console.log("Phones ->",phones);
        for (const phone of phones) {
          // await sendWhatsapp(
          //   phone.phone, // format +91 i.e. code 
          //   `⚠️ *Reminder!* Your vehicle *${vehicle.vehicleNumber}* has document(s) expiring soon! 🗓️\n\n📄 *Expiring Documents:*\n${upcomingExpiries.join(
          //   "\n"
          //   )}\n\n✅ Please renew them *before the deadline* to avoid penalties and keep your vehicle running smoothly.\n\n🚗 Safe travels! — *KG Vehicles*`
          // );
          await sendWhatsapp(
            phone.phone,
            vehicle.vehicleNumber,
            upcomingExpiries
          );
        }
      }
    }

    console.log("Expiry reminders sent.");
  } catch (err) {
    console.error("Reminder failed:", err.message);
  }
};

module.exports = sendExpiryReminders;