const db = require("./database");

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS salon_info`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Existing services table dropped successfully.");
    }
  });

  db.run(`DROP TABLE IF EXISTS features`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Existing services table dropped successfully.");
    }
  });

  db.run(`DROP TABLE IF EXISTS services`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Existing services table dropped successfully.");
    }
  });

  db.run(`DROP TABLE IF EXISTS hair_desc`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Existing hair_desc table dropped successfully");
    }
  });

  db.run(`DROP TABLE IF EXISTS pricing`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Existing pricing table dropped successfully");
    }
  });

  db.run(`DROP TABLE IF EXISTS locations`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Existing locations table dropped successfully");
    }
  });

  db.run(`DROP TABLE IF EXISTS about_schedule`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Existing about inf table dropped successfully");
    }
  });

  //Create Salon_info table
  db.run(
    `CREATE TABLE IF NOT EXISTS salon_info (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table salon_info created successfully");
      }
    }
  );

  // Insert initial data into salon_info
  db.run(
    `INSERT INTO salon_info (name, description) VALUES (?, ?)`,
    [
      "Sparkle",
      "Welcome to Sparkle Beauty Salon in Coral Springs, your go-to for exceptional hair care. We're committed to delivering unparalleled beauty services, ensuring satisfaction for all. Our unique approach to style creates a personalized elegance for every client. Your hair is more than an accessory - it's a statement. Whether you're seeking a fresh look or maintaining your style, our expert stylists are here to assist. Experience our luxury salon, where artistry meets innovation to bring out the best in your hair. Designed by us, worn beautifully by you.",
    ],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Initial data inserted successfully in to salon_info");
      }
    }
  );

  // Create Feature table
  db.run(
    `CREATE TABLE IF NOT EXISTS features (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      icon TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table features created successfully");
      }
    }
  );

  // Insert initial data into features
  db.run(
    `INSERT INTO features (title, description, icon) VALUES 
    (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
    [
      "Expert Hair Styling",
      "At Sparkle Beauty Salon in Coral Springs, our professional stylists provide    personalized haircuts and styling to enhance your natural beauty.",
      "icon-woman-hair-cut",
      "Luxury Hair Treatments",
      "Experience the transformation with our luxury hair treatments, designed to rejuvenate your hair and give it a healthy, radiant glow.",
      "icon-hairdryer-and-comb",
      "Professional Nail Services",
      "Discover the art of elegance with our professional nail services in Coral Springs, offering manicures, pedicures, and creative nail art designs.",
      "icon-nail-file",
      "Relaxing Nail Spa",
      "Indulge in our relaxing nail spa services, providing a serene environment for you to unwind while we pamper your nails to perfection.",
      "icon-nail",
    ],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Initial data inserted successfully in to features");
      }
    }
  );

  // Create Services table
  db.run(
    `CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      link TEXT,
      image TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table services created successfully");
      }
    }
  );

  // Insert initial data into services
  db.run(
    `INSERT INTO services (title, description, link, image) VALUES 
    (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
    [
      "Stunning Hair at Sparkle Salon!",
      "Book at Sparkle Salon: Your gateway to stunning hair!",
      "/hair",
      "cards__image--1",
      "Nail Perfection at Sparkle Salon!",
      "Experience top-notch nail care at Sparkle Salon. Book now!",
      "/nails",
      "cards__image--2",
      "Style Transformation at Sparkle!",
      "Sparkle Salon: Transforming your hair into a style statement!",
      "/about",
      "cards__image--3",
    ],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Initial data inserted successfully in to services");
      }
    }
  );

  // Create hair_desc table
  db.run(
    `CREATE TABLE IF NOT EXISTS hair_desc(
      id INTEGER PRIMARY KEY,
      description TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table hair_desc created successfully");
      }
    }
  );

  // Insert the introductory description into hair_desc
  const introDescription =
    "Meet our skilled team at Sparkle Salon, Coral Springs. With extensive training and experience, we're committed to bringing you the latest hair and beauty trends. Every visit promises a satisfying experience, tailored to your unique needs.";

  db.run(
    `INSERT INTO hair_desc (description) VALUES (?)`,
    [introDescription],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(
          "Introductory description inserted successfully into hair_desc"
        );
      }
    }
  );

  // Create pricing table
  db.run(
    `CREATE TABLE IF NOT EXISTS pricing(
      id INTEGER PRIMARY KEY,
      service TEXT,
      price TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table pricing created successfully.");
      }
    }
  );

  // Insert initial data into pricing table with parameterized queries
  const pricingData = [
    ["Women's hair cut", "$35"],
    ["Men's hair cut", "$25"],
    ["Deep Conditioner Treatment", "$25+"],
    ["Blow Dry", "$30+"],
    ["Hair Cut and Blow Dry", "$55+"],
    ["Single Process", "$60+"],
    ["Gloss", "$30+"],
    ["Partial Hi-Lights", "$75+"],
    ["Full Hi-Lights", "$125+"],
    ["Brazilian Blowout Treatment", "$120+"],
    ["Color Correction", "By Consultation Only"],
  ];

  const insertQuery = `INSERT INTO pricing (service, price) VALUES (?, ?)`;

  pricingData.forEach(([service, price]) => {
    db.run(insertQuery, [service, price], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Inserted service: ${service}, price: ${price}");
      }
    });
  });

  // Create about address table
  db.run(
    `CREATE TABLE IF NOT EXISTS locations(
      id INTEGER PRIMARY KEY, 
      location TEXT, 
      street TEXT,
      city TEXT, 
      phone TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table about address created successfully.");
      }
    }
  );

  db.run(
    `INSERT INTO locations (location, street, city, phone) VALUES (?, ?, ?, ?)`,
    [
      "Chevy Chase Plaza",
      "10912 Wiles Rd",
      "Coral Springs, FL 33076",
      "(954) 245-5619",
    ],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Initial data inserted successfully in to locations");
      }
    }
  );

  // Create about schedule table
  db.run(
    `CREATE TABLE IF NOT EXISTS about_schedule(
      id INTEGER PRIMARY KEY,
      day TEXT,
      hours TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table about info created successfully.");
      }
    }
  );

  // Insert initial data into about_schedule table with parameterized queries
  const scheduleData = [
    ["Monday", "Closed"],
    ["Tues, Wed, Thurs", "9:00am - 6:00pm"],
    ["Friday", "9:00am - 7:00pm"],
    ["Saturday", "9:00am - 5:00pm"],
    ["Sunday", "Closed"],
  ];

  const insertAboutData = `INSERT INTO about_schedule (day, hours) VALUES (?, ?)`;
  scheduleData.forEach(([day, hours]) => {
    db.run(insertAboutData, [day, hours], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Inserted salon schedule: ${day} and hours: ${hours}");
      }
    });
  });

  db.close();
});
