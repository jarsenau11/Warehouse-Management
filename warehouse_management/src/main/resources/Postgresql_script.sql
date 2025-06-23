CREATE TABLE Warehouse (
  warehouse_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  capacity INTEGER NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip INTEGER NOT NULL
);

CREATE TABLE Product_Type (
  product_type_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Product (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  product_type_id INTEGER REFERENCES Product_Type(product_type_id),
  description VARCHAR(255),
  price NUMERIC(10, 2) NOT NULL,
  size INTEGER NOT NULL
);

CREATE TABLE Item (
  item_id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES Product(product_id),
  warehouse_id INTEGER REFERENCES Warehouse(warehouse_id)
);

INSERT INTO warehouse(name, capacity, street, city, state, zip) VALUES ('AZ Warehouse', 300, '123 First Street', 'Phoenix', 'Arizona', 83543);
INSERT INTO warehouse(name, capacity, street, city, state, zip) VALUES ('TX Warehouse', 300, '84 Grant Road', 'Dallas', 'Texas', 45745);
INSERT INTO warehouse(name, capacity, street, city, state, zip) VALUES ('NM Warehouse', 300, '45 Windy Lane', 'Albuquerque', 'New Mexico', 55321);

INSERT INTO product_type(name) VALUES ('Outdoors');
INSERT INTO product_type(name) VALUES ('Sporting Goods');
INSERT INTO product_type(name) VALUES ('Electronics');
INSERT INTO product_type(name) VALUES ('Appliances');
INSERT INTO product_type(name) VALUES ('Furniture');

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AdventurePro Hiking Backpack', 1, 'The AdventurePro Hiking Backpack is designed for the avid adventurer. It features a durable waterproof construction, multiple compartments for organizing gear, and a comfortable ergonomic design. Get ready to conquer the great outdoors with this backpack!', 89.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('TrailBlazer Camping Tent', 1, 'The TrailBlazer Camping Tent is your ultimate companion for outdoor camping trips. It offers easy setup, spacious interior, and weather-resistant materials. Stay protected from the elements and enjoy a comfortable camping experience with this tent.', 149.99, 5);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('TrekMaster Sleeping Bag', 1, 'The TrekMaster Sleeping Bag is perfect for a good night''s sleep under the stars. It''s made with high-quality insulation, providing warmth and comfort in various weather conditions. Sleep soundly on your outdoor adventures with this sleeping bag.', 79.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AdventureLite Portable Hammock', 1, 'The AdventureLite Portable Hammock is your ticket to relaxation in the wilderness. It''s lightweight, easy to set up, and made of durable materials. Unwind and enjoy a peaceful moment wherever you go with this hammock.', 49.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('ProTrek Trekking Poles', 1, 'ProTrek Trekking Poles are designed for stability and support on rugged terrains. These adjustable poles provide balance, reduce strain on joints, and enhance your hiking experience. Conquer challenging trails with these reliable trekking poles.', 39.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SummitGuard Waterproof Jacket', 1, 'The SummitGuard Waterproof Jacket is a must-have for outdoor enthusiasts. It offers excellent protection against rain and wind while remaining breathable. Stay dry and comfortable in any weather with this reliable jacket.', 129.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SolarTrail Portable Charger', 1, 'The SolarTrail Portable Charger is your power source on the go. Harness the sun''s energy to charge your devices while exploring the outdoors. With its compact design and multiple charging ports, you''ll never run out of battery again.', 59.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AdventureSeeker Binoculars', 1, 'AdventureSeeker Binoculars bring the world closer to you. With high-quality lenses and a durable build, these binoculars provide clear and crisp views of wildlife, landscapes, and more. Enhance your outdoor observation with these binoculars.', 69.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('TrailTracker GPS Watch', 1, 'The TrailTracker GPS Watch is your reliable navigation companion. It tracks your routes, distance, speed, and more, ensuring you never get lost in the wilderness. Stay on track and explore confidently with this GPS watch.', 199.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('BaseCamp Portable Grill', 1, 'The BaseCamp Portable Grill is perfect for outdoor cooking adventures. It features a large cooking surface, adjustable heat settings, and a compact design for easy transportation. Enjoy delicious grilled meals wherever your adventure takes you.', 149.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AdventureGlow LED Lantern', 1, 'The AdventureGlow LED Lantern illuminates your camping nights. With adjustable brightness and a long battery life, this lantern provides reliable lighting in the great outdoors. Light up your surroundings and create a cozy ambiance with this lantern.', 29.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AlpineClimb Climbing Harness', 1, 'The AlpineClimb Climbing Harness is engineered for safety and comfort during rock climbing and mountaineering. It features adjustable straps, padded waistbelt, and sturdy attachment points. Climb with confidence and security using this climbing harness.', 89.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('ExplorerPro Camping Cookware Set', 1, 'The ExplorerPro Camping Cookware Set equips you with everything you need for outdoor cooking. This compact and lightweight set includes pots, pans, utensils, and a portable stove. Prepare delicious meals in the wilderness with this cookware set.', 59.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('TrailRider Bike Helmet', 1, 'The TrailRider Bike Helmet combines style, comfort, and safety for cycling enthusiasts. It features a lightweight design, adjustable fit, and excellent ventilation. Ride with confidence and protection with this bike helmet.', 49.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AdventurePro Waterproof Dry Bag', 1, 'The AdventurePro Waterproof Dry Bag keeps your gear safe and dry on water-based adventures. It''s made with durable materials, features a roll-top closure, and comes in various sizes. Protect your belongings from water damage with this reliable dry bag.', 34.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('TrekTrax Portable Bluetooth Speaker', 1, 'The TrekTrax Portable Bluetooth Speaker provides a soundtrack for your outdoor escapades. It''s compact, water-resistant, and delivers high-quality sound. Enjoy your favorite music wherever you go with this portable speaker.', 79.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SummitView Camping Chair', 1, 'The SummitView Camping Chair offers comfort and convenience while relaxing outdoors. It features a sturdy frame, adjustable recline, and a built-in cooler pouch. Sit back, relax, and enjoy the views with this comfortable camping chair.', 49.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AdventureCapture Action Camera', 1, 'The AdventureCapture Action Camera captures your thrilling moments in high definition. It''s waterproof, shockproof, and comes with various mounting options. Record your outdoor adventures with stunning clarity using this action camera.', 119.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('TrailBlazer Portable Water Filter', 1, 'The TrailBlazer Portable Water Filter ensures clean and safe drinking water on your outdoor expeditions. It removes bacteria and protozoa, making water from natural sources safe to consume. Stay hydrated and healthy with this portable water filter.', 79.99, 1);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SummitPro Insulated Cooler', 1, 'The SummitPro Insulated Cooler keeps your food and drinks cool for extended outdoor trips. It features a durable construction, ample storage space, and insulation to maintain temperature. Keep your refreshments chilled and ready with this reliable cooler.', 99.99, 3);

INSERT INTO product(name, product_type_id, description, price, size) VALUES ('ProFit Running Shoes', 2, 'Lightweight and comfortable running shoes for athletes', 89.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('AllStar Basketball', 2, 'Official-size basketball for indoor and outdoor play', 29.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('PowerLift Weightlifting Barbell', 2, 'Heavy-duty barbell for strength training and weightlifting', 199.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SwiftStrike Soccer Cleats', 2, 'Professional-grade soccer cleats for optimal performance', 149.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('StrikeMaster Tennis Racket', 2, 'Graphite tennis racket for precision and power', 129.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('ProGrip Golf Club Set', 2, 'Complete golf club set for players of all levels', 499.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SpeedRacer Cycling Helmet', 2, 'Lightweight and aerodynamic helmet for cyclists', 79.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('XtremeFit Fitness Tracker', 2, 'Smart fitness tracker for activity monitoring and heart rate tracking', 79.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('ProForm Treadmill', 2, 'High-performance treadmill for home workouts', 999.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('BounceBack Volleyball', 2, 'Durable and responsive volleyball for competitive play', 39.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('FlexFit Yoga Mat', 2, 'Non-slip yoga mat for comfortable and stable practice', 29.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('DuraGlide Ice Skates', 2, 'Figure ice skates for smooth gliding and precise control', 89.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SwiftSwim Goggles', 2, 'Swimming goggles for clear vision and comfortable fit', 19.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('PowerDrive Baseball Bat', 2, 'High-performance baseball bat for power hitting', 149.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('FitGear Adjustable Dumbbells', 2, 'Space-saving adjustable dumbbells for versatile strength training', 249.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('QuickStrike Boxing Gloves', 2, 'Premium boxing gloves for protection and power', 79.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('TrailBlazer Hiking Boots', 2, 'Sturdy and waterproof hiking boots for outdoor adventures', 129.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('ProShot Basketball Hoop', 2, 'Durable basketball hoop for home or street use', 199.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('StrikeZone Baseball Glove', 2, 'High-quality baseball glove for fielding and catching', 59.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SprintPro Track Spikes', 2, 'Lightweight and sprint-focused track spikes for runners', 79.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SmartHome Security Camera', 3, 'Wireless security camera for home monitoring', 99.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('High-Definition TV', 3, 'Large screen HDTV for immersive viewing experience', 899.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Wireless Bluetooth Earphones', 3, 'In-ear wireless earphones for on-the-go listening', 59.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Gaming Console', 3, 'Powerful gaming console for immersive gaming sessions', 499.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SmartHome Thermostat', 3, 'Intelligent thermostat for home temperature control', 129.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Portable Bluetooth Speaker', 3, 'Compact speaker for wireless music streaming', 39.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Digital Camera', 3, 'High-resolution camera for capturing stunning photos', 299.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Wireless Gaming Headset', 3, 'Over-ear wireless headset for immersive gaming audio', 149.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Smartphone', 3, 'Cutting-edge smartphone with advanced features', 999.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Laptop Computer', 3, 'Portable and powerful laptop for work and entertainment', 1299.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Wireless Mouse', 3, 'Ergonomic wireless mouse for precise and comfortable control', 29.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Smart Watch', 3, 'Multifunctional smartwatch for fitness and notifications', 199.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Noise-Canceling Headphones', 3, 'Over-ear headphones for immersive audio and noise cancellation', 149.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Home Theater System', 3, 'Complete audio system for cinematic home entertainment', 699.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Wireless Router', 3, 'High-performance router for seamless internet connectivity', 79.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Portable Power Bank', 3, 'Compact power bank for on-the-go device charging', 49.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Wireless Keyboard', 3, 'Wireless keyboard for comfortable typing and control', 49.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Virtual Reality Headset', 3, 'Immersive VR headset for interactive virtual experiences', 299.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Digital Voice Recorder', 3, 'Compact recorder for high-quality audio recording', 79.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Wireless Charging Pad', 3, 'Convenient wireless charger for compatible devices', 29.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SmartHome Thermostat', 4, 'Intelligent thermostat for home temperature control', 129.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('UltraWash Dishwasher', 4, 'Efficient dishwasher for sparkling clean dishes', 599.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('PowerCool Air Conditioner', 4, 'Powerful air conditioner for cooling large spaces', 699.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SmartHome Security System', 4, 'Comprehensive security system for home protection', 299.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('UltraFreeze Chest Freezer', 4, 'Spacious chest freezer for long-term food storage', 449.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('QuickDry Clothes Dryer', 4, 'Efficient clothes dryer for fast and convenient laundry drying', 499.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('PowerSteam Iron', 4, 'Powerful steam iron for wrinkle-free clothes', 49.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('MultiCook Slow Cooker', 4, 'Versatile slow cooker for delicious home-cooked meals', 79.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('UltraSweep Robotic Vacuum', 4, 'Robotic vacuum cleaner for automated floor cleaning', 249.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('PowerSteam Garment Steamer', 4, 'Efficient garment steamer for removing wrinkles and refreshing clothes', 79.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('QuickBrew Coffee Maker', 4, 'Fast and convenient coffee maker for brewing delicious coffee', 59.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SmartHome Lighting Kit', 4, 'Wireless lighting kit for customizable home illumination', 149.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('UltraDry Electric Dryer', 4, 'High-capacity electric dryer for efficient laundry drying', 799.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('PowerBlend Blender', 4, 'Powerful blender for making smoothies and food preparation', 89.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SmartHome Doorbell', 4, 'Wireless doorbell with video and audio capabilities', 129.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('UltraCool Tower Fan', 4, 'Tower fan for powerful and quiet cooling', 69.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('QuickWash Washing Machine', 4, 'Efficient washing machine for fast and thorough laundry cleaning', 899.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('PowerSteam Clothes Steamer', 4, 'Versatile clothes steamer for removing wrinkles and refreshing fabrics', 69.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('UltraChill Refrigerator', 4, 'Spacious refrigerator for optimal food storage and freshness', 1299.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('SmartHome Plug', 4, 'Wireless plug for controlling and monitoring electronic devices', 39.99, 1);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Modern Sofa', 5, 'Stylish and comfortable sofa for your living room', 999.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Elegant Dining Table', 5, 'Beautiful dining table for family meals and gatherings', 699.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Cozy Armchair', 5, 'Plush armchair for relaxation and comfort', 499.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Contemporary Bed Frame', 5, 'Sleek bed frame for a modern bedroom aesthetic', 799.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Classic Coffee Table', 5, 'Timeless coffee table for your living room', 399.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Sturdy Bookshelf', 5, 'Durable bookshelf for organizing your books and decor', 299.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Versatile Storage Cabinet', 5, 'Functional storage cabinet for your belongings', 349.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Comfortable Recliner', 5, 'Plush recliner for ultimate relaxation', 599.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Sleek TV Stand', 5, 'Modern TV stand for your entertainment center', 499.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Ergonomic Office Chair', 5, 'Comfortable office chair for productive work sessions', 249.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Chic Nightstand', 5, 'Stylish nightstand for your bedside essentials', 199.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Durable Outdoor Table', 5, 'Weather-resistant table for outdoor dining and gatherings', 599.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Soft Ottoman', 5, 'Plush ottoman for added comfort and style', 199.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Classic Sideboard', 5, 'Timeless sideboard for extra storage and display space', 799.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Modern Desk', 5, 'Sleek desk for a contemporary workspace', 449.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Stylish Vanity Table', 5, 'Elegant vanity table for your beauty routine', 349.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Cozy Loveseat', 5, 'Comfortable loveseat for cozy seating', 799.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Versatile Side Table', 5, 'Functional side table for your living room or bedroom', 149.99, 3);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Rustic Bench', 5, 'Charming bench for your entryway or dining area', 299.99, 5);
INSERT INTO product(name, product_type_id, description, price, size) VALUES ('Elevating Bar Stool', 5, 'Adjustable bar stool for your kitchen counter or bar area', 149.99, 3);


INSERT INTO item(product_id, warehouse_id) VALUES (1, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (3, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (5, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (7, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (9, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (11, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (13, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (15, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (17, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (19, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (37, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (39, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (41, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (43, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (45, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (47, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (49, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (51, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (53, 1);
INSERT INTO item(product_id, warehouse_id) VALUES (55, 1);

INSERT INTO item(product_id, warehouse_id) VALUES (78, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (80, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (82, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (84, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (86, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (88, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (90, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (92, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (94, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (96, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (98, 2);
INSERT INTO item(product_id, warehouse_id) VALUES (100, 2);

INSERT INTO item(product_id, warehouse_id) VALUES (50, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (50, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (50, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (51, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (51, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (51, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (51, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (52, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (53, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (53, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (53, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (54, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (54, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (55, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (55, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (56, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (57, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (57, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (57, 3);
INSERT INTO item(product_id, warehouse_id) VALUES (58, 3);
