USE feedback

INSERT INTO category (catId, catDesc) VALUES 
(101, "Hostel"),
(102, "Mess"),
(103, "Sports (Indoor)"),
(104, "Sports (Outdoor)");

INSERT INTO subcategory (subcatId, catId, subcatDesc) VALUES 
(10101, 101, "Light"),
(10102, 101, "Bathroom"),
(10103, 101, "Night Light"),
(10104, 101, "Fan"),
(10105, 101, "Bed"),
(10106, 101, "Cleaning"),
(10107, 101, "Lift"),
(10201, 102, "Food"),
(10202, 102, "Workers"),
(10203, 102, "Chairs"),
(10204, 102, "Tables"),
(10205, 102, "TV");
