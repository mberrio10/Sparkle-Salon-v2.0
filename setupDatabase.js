const db = require("./database");

db.serialize(() => {
  //Create Salon_info table
  db.run(
    `
        CREATE TABLE IF NOT EXISTS salon_info (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT
    )
    `,
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
    `
        INSERT INTO salon_info (name, description)
        VALUES (?, ?) 
        `,
    [
      "Sparkle Salon",
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
    `
        CREATE TABLE IF NOT EXISTS features (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT
        )
    `,
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
    `
        INSERT INTO features (title, description) VALUES     
        ('Expert Hair Styling', 'At Sparkle Beauty Salon in Coral Springs, our professional stylists provide personalized haircuts and styling to enhance your natural beauty.'),
        ('Luxury Hair Treatments', 'Experience the transformation with our luxury hair treatments, designed to rejuvenate your hair and give it a healthy, radiant glow.'),
        ('Professional Nail Services', 'Discover the art of elegance with our professional nail services in Coral Springs, offering manicures, pedicures, and creative nail art designs.'),
        ('Relaxing Nail Spa', 'Indulge in our relaxing nail spa services, providing a serene environment for you to unwind while we pamper your nails to perfection.')
        `,
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
    `
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            link TEXT
        )
    `,
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
    `
            INSERT INTO services (title, description, link) VALUES
            ('Stunning Hair at Sparkle Salon!', 'Book at Sparkle Salon: Your gateway to stunning hair!', '/hair'),
            ('Nail Perfection at Sparkle Salon!', 'Experience top-notch nail care at Sparkle Salon. Book now!', '/nails'),
            ('Style Transformation at Sparkle!', 'Sparkle Salon: Transforming your hair into a style statement!', '/about')
        `,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Initial data inserted successfully in to services");
      }
    }
  );

  db.close();
});
