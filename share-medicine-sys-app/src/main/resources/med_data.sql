CREATE TABLE med_data
(
   id int PRIMARY KEY NOT NULL,
   email varchar(255) NOT NULL,
   created timestamp,
   medicine_name text,
   medicine_qty int,
   medicine_validity timestamp,
   expired bit
)
;
CREATE TABLE picked_med_data
(
   id int PRIMARY KEY NOT NULL,
   email varchar(255) NOT NULL,
   medicine_name longtext,
   medicine_qty int,
   medicine_validity timestamp,
   expired bit,
   msg longtext,
   send_to varchar(100),
   med_id int,
   deal bit
)
;
