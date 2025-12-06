const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Appointment = require("./models/Appointment");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    console.log("🔥 Eski veriler temizleniyor...");
    await Appointment.deleteMany();
    await User.deleteMany();

    console.log("🔒 Şifreler oluşturuluyor...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("StrongPassword123!", salt); // Şifre: 123

    console.log("🌱 Kullanıcılar oluşturuluyor...");

    // --- 1. Verified Doctors (Real Turkish Names) ---
    const verifiedDoctorNames = [
      { name: "Dr. Ahmet Yılmaz", sex: "male" },
      { name: "Dr. Zeynep Demir", sex: "female" },
      { name: "Dr. Mehmet Kaya", sex: "male" },
      { name: "Dr. Elif Çelik", sex: "female" },
      { name: "Dr. Mustafa Şahin", sex: "male" },
      { name: "Dr. Ayşe Yıldız", sex: "female" },
      { name: "Dr. Emre Öztürk", sex: "male" },
      { name: "Dr. Burcu Arslan", sex: "female" },
      { name: "Dr. Volkan Polat", sex: "male" },
      { name: "Dr. Hande Erçel", sex: "female" },
    ];

    const verifiedDoctorsData = verifiedDoctorNames.map((doc, index) => ({
      name: doc.name,
      email: `doktor${index + 1}@hastane.com`,
      password: hashedPassword,
      role: "doctor",
      sex: doc.sex,
      isVerified: true, // ✅ ONAYLI
      school: "İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi",
      profilePicture: `https://i.pravatar.cc/150?img=${index + 10}`,
    }));

    const createdVerifiedDocs = await User.insertMany(verifiedDoctorsData);

    // --- 2. Unverified Doctors (For Demo Purposes) ---
    const unverifiedDoctorNames = [
      { name: "Dr. Caner Erkin", sex: "male" },
      { name: "Dr. Gamze Durmaz", sex: "female" },
      { name: "Dr. Ozan Tufan", sex: "male" },
    ];

    const unverifiedDoctorsData = unverifiedDoctorNames.map((doc, index) => ({
      name: doc.name,
      email: `yeni${index + 1}@hastane.com`,
      password: hashedPassword,
      role: "doctor",
      sex: doc.sex,
      isVerified: false, // ❌ ONAYSIZ (Lock Screen Demo)
      school: "Hacettepe Tıp Fakültesi",
      profilePicture: `https://i.pravatar.cc/150?img=${index + 30}`,
    }));

    await User.insertMany(unverifiedDoctorsData);

    // --- 3. Patients (Real Turkish Names) ---
    const patientNames = [
      { name: "Ali Vural", sex: "male" },
      { name: "Selin Aksoy", sex: "female" },
      { name: "Mert Koç", sex: "male" },
      { name: "Ceren Yılmaz", sex: "female" },
      { name: "Kerem Bursin", sex: "male" },
      { name: "Leyla Tanlar", sex: "female" },
      { name: "Murat Boz", sex: "male" },
      { name: "Hadise Açıkgöz", sex: "female" },
      { name: "Acun Ilıcalı", sex: "male" },
      { name: "Seda Sayan", sex: "female" },
    ];

    const patientsData = patientNames.map((p, index) => ({
      name: p.name,
      email: `hasta${index + 1}@test.com`,
      password: hashedPassword,
      role: "patient",
      sex: p.sex,
      age: 20 + index + 5,
    }));

    await User.insertMany(patientsData);

    console.log(
      "🌱 Randevular oluşturuluyor (Sadece Onaylı Doktorlar İçin)..."
    );

    // --- 4. Create Slots ONLY for Verified Doctors ---
    const appointments = [];
    const today = new Date();
    today.setHours(9, 0, 0, 0); // Start at 9:00 AM

    for (const doc of createdVerifiedDocs) {
      // Create 5 slots for each verified doctor
      // Slot 1: Today 09:00
      // Slot 2: Today 14:00
      // Slot 3: Tomorrow 10:00
      // Slot 4: Tomorrow 15:00
      // Slot 5: Day After Tomorrow 11:00

      const timeOffsets = [
        { days: 0, hour: 9 },
        { days: 0, hour: 14 },
        { days: 1, hour: 10 },
        { days: 1, hour: 15 },
        { days: 2, hour: 11 },
      ];

      for (const time of timeOffsets) {
        const slotDate = new Date(today);
        slotDate.setDate(today.getDate() + time.days);
        slotDate.setHours(time.hour, 0, 0, 0);

        appointments.push({
          doctorId: doc._id,
          date: slotDate,
          status: "available",
        });
      }
    }

    await Appointment.insertMany(appointments);

    console.log("---------------------------------------");
    console.log(`✅ Veritabanı Başarıyla Hazırlandı!`);
    console.log(
      `👨‍⚕️ Onaylı Doktorlar: 10 (Giriş: doktor1@hastane.com ... doktor10@hastane.com)`
    );
    console.log(
      `🕵️ Onaysız Doktorlar: 3 (Giriş: yeni1@hastane.com ... yeni3@hastane.com)`
    );
    console.log(
      `🤒 Hastalar: 10 (Giriş: hasta1@test.com ... hasta10@test.com)`
    );
    console.log(`📅 Oluşturulan Randevu Slotu: ${appointments.length}`);
    console.log(`🔑 Ortak Şifre: StrongPassword123!`);
    console.log("---------------------------------------");

    process.exit();
  } catch (error) {
    console.error(`❌ Hata: ${error.message}`);
    process.exit(1);
  }
};

seedData();
