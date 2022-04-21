INSERT INTO public."Authorization" ("driverId", "vehicleId") VALUES (1, 1);

INSERT INTO public."Driver" (id, "licenseNumber", "userId", "licenseState") VALUES (1, '291969186', 1, 'NY');

INSERT INTO public."Drivers" ("driverId", "rideId") VALUES (1, 1);

INSERT INTO public."Location" (id, name, address, city, "zipCode", state) VALUES (1, 'Taylor', '236 W Reade Ave', 'Upland', 46989, 'IN');
INSERT INTO public."Location" (id, name, address, city, "zipCode", state) VALUES (2, 'Eli''s House', '1511 Five Mile Line Road', 'Penfield', 14526, 'NY');

INSERT INTO public."Passenger" ("userId", "rideId") VALUES (2, 1);

INSERT INTO public."Ride" (id, date, time, distance, "fuelPrice", fee, "vehicleId", "fromLocation", "toLocationId") VALUES (1, '2022-04-21', '2022-04-21 20:43:06.000000', 504, 7.29, 400, 1, 2, 1);

INSERT INTO public."State" (abbreviation, name) VALUES ('NY', 'New York');
INSERT INTO public."State" (abbreviation, name) VALUES ('IN', 'Indiana');

INSERT INTO public."User" (id, first_name, last_name, email, password, phone, "isAdmin") VALUES (1, 'Eli', 'Bassett', 'eli.bassett@gmail.com', 'JimmyJohn', '15856359400', true);
INSERT INTO public."User" (id, first_name, last_name, email, password, phone, "isAdmin") VALUES (2, 'Hershel', 'Licht', 'herschellicht18@cchsindy.org', 'FiveGuys', '1585208904', false);

INSERT INTO public."Vehicle" (id, make, model, color, capacity, mpg, "licensePlate", "vehicleTypeId", "licenseState") VALUES (1, 'Honda', 'Accord', 'Grey', 5, 90, 'GHC5114', 1, 'NY');

INSERT INTO public."Vehicle Type" (id, type) VALUES (1, 'Sedan');
