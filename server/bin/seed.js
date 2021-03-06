const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Organisation = require("../models/organisation");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nelene", {
  useMongoClient: true
});

const admin = new User({
  name: "Elodie",
  email: "elodie.wanang@gmail.com",
  status: "entrepreneur",
  isAdmin: true
});

// const admin2 = new User({
// 	username: 'Liudmila',
// 	password: encryptedPass2,
// 	email: 'liudmyla.iefremova@gmail.com',
// 	status: 'entrepreneur',
// 	isAdmin: true,
// });

const incubators = [
  new Organisation({
    name: "Entrepreneur Incubator",
    description:
      "Business Development Service. For more information - check up web site ei.co.za",
    contact: "ayanda@em-solutions.co.za",
    address: "Unit 6C, North Block, 31 Brickfield Road, Woodstock, Salt River",
    country: "South Africa",
    city: "Cape Town",
    category: "incubator",
    status: "accepted",
    needs: ["recruitment", "location"],
    type: "tech",
    img:
      "http://res.cloudinary.com/hiwkem5s6/image/upload/v1509984516/ems_nwkk4c.png"
  }),
  new Organisation({
    name: "Nairobi Garage Ngong Road",
    description:
      "Fully serviced, coworking office space for startups, techies and entrepreneurs. For more information - check up web site https://nairobigarage.com/",
    contact: "ngongroad@nairobigarage.com",
    address: "8th Floor, Pinetree Plaza, Kaburu Drive, Off Ngong Rd 00100",
    country: "Kenya",
    city: "Nairobi",
    category: "incubator",
    status: "pending",
    location: { type: "Point", coordinates: [36.7908265, -1.2981487] },
    type: "tech"
  }),
  new Organisation({
    name: "La Fabrique",
    description:
      "La Fabrique is an incubator focused on social businesses mentoring in West Africa",
    contact: "contact@lafabrique-bf.com",
    address: "Ouagadougou 12 BP 4199 ",
    country: "Burkina Faso",
    city: "Ouagadougou",
    category: "incubator",
    status: "accepted",
    img: "/src/assets/logos/lafabrique.jpg",
    location: { type: "Point", coordinates: [36.805311, -1.2702478] }
  }),
  new Organisation({
    name: "Enspire Incubator",
    description:
      "A platform for facilitating the growth of viable technology businesses in Nigeria. For more information - check up web site http://enspire.org.ng/",
    contact: "info@enspire.org.ng",
    address: "3rd Floor, NEPZA HQ, No. 2 Zambesi Crescent, Maitama 900211",
    country: "Nigeria",
    city: "Abuja",
    category: "incubator",
    status: "pending",
    location: { type: "Point", coordinates: [7.4480174, 9.0389314] },
    type: "tech"
  })
];

const startups = [
  new Organisation({
    name: "Instabug",
    description:
      "Instabug is providing in-app feedback and bug reporting to mobile apps. It provides a seamless way for two-way communication with users, while providing detailed environment report for developers. For more information - check up web site instabug.org",
    contact: "info@instabug.com ",
    address: "63 Syria, Mit Akaba, Al Agouzah, Giza Governorate",
    country: "Egypt",
    city: "Giza",
    category: "startup",
    status: "accepted",
    location: { type: "Point", coordinates: [31.1914344, 30.0526922] },
    type: "tech"
  }),
  new Organisation({
    name: "Jamii Africa",
    description:
      "EdgePoint Digital Ltd. For more information - check up web site jamiiafrica.com",
    contact: "info@jamiiafrica.com ",
    address: "Plot 11 Ada Estate",
    country: "Tanzania",
    city: "Dar es Salaam",
    category: "startup",
    status: "accepted",
    location: { type: "Point", coordinates: [39.2655765, -6.7850744] },
    type: "tech"
  })
];

User.register(admin, "africa", (err, admin) => {
  if (err) return console.error(err);
  incubators.forEach(incubator => (incubator.ownerId = admin._id));
  startups.forEach(startup => (startup.ownerId = admin._id));

  return Promise.all([
    ...incubators.map(i => i.save()),
    ...startups.map(s => s.save())
  ])
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err));
});
