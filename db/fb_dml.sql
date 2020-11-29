USE feedback

INSERT INTO category (catId, catDesc) VALUES 
(101, "Hostel"),
(102, "Mess"),
(103, "Sports"),
-- (104, "Sports (Outdoor)"),
(104, "Other");

INSERT INTO subcategory (subcatId, catId, subcatDesc, subCatType) VALUES 
(10101, 101, "Light", 2),
(10102, 101, "Bathroom", 1),
(10103, 101, "Night Light", 2),
(10104, 101, "Fan", 2),
(10105, 101, "Bed", 2),
(10106, 101, "Room Cleaning", 2),
(10107, 101, "Lift", 1),
(10108, 101, "Floor Cleaning", 1),
(10201, 102, "Food", 1),
(10202, 102, "Workers", 1),
(10203, 102, "Chairs", 1),
(10204, 102, "Tables", 1),
(10205, 102, "TV", 1),
(10301, 103, "Indoor", 1),
(10302, 103, "Outdoor", 1),
(10401, 104, "Other", 1);

INSERT INTO role (roleId, roleDesc) VALUES
(1, "Students"),
(2, "Coordinators"),
(3, "Supervisor"),
(4, "Management");

INSERT INTO categorysupervisor (catRoleId, catId, catRoleEmail) VALUES 
(1, 101, "LIT2018007@iiitl.ac.in"),
(2, 101, "LIT2018002@iiitl.ac.in");