CREATE TABLE med_data
(
   id INT AUTO_INCREMENT PRIMARY KEY,
   email VARCHAR(255) NOT NULL,
   created date,
   medicine_name VARCHAR (1000),
   medicine_qty INT,
   medicine_validity date
)
;