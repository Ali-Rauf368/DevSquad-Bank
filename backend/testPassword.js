/* import bcrypt from 'bcrypt';

// The plain password you want to check
const plainPassword = 'aqa123';

// The hashed password retrieved from MongoDB
const hashedPasswordFromMongo = '$2b$10$cbOovhLLdFaUE4TLLjqpeeYJ7YBTK0thR3kicaT1XsCGi.CbBZMcW';

bcrypt.compare(plainPassword, hashedPasswordFromMongo)
  .then((match) => {
    if (match) {
      console.log('Password matches!');
    } else {
      console.log('Password does not match!');
    }
  })
  .catch((error) => {
    console.error('Error comparing passwords:', error);
  });

   */
  
/*   import bcrypt from 'bcrypt';

const plainPassword = 'aqa123';

bcrypt.hash(plainPassword, 10)
  .then((hashedPassword) => {
    console.log('Hashed Password:', hashedPassword);
  })
  .catch((error) => {
    console.error('Error hashing password:', error);
  });
 */


  import bcrypt from 'bcryptjs';

  const password = 'aqa123'; // The password you are testing
  const hashedPasswordFromDB = '$2b$10$oXUAtrvhGtRlUEIDMUbbmesIYr6IqKw0uSW4iRZr8mgAGqVN0fX32'; // Replace this with the hash stored in the DB
  
  // Manually hash the entered password
  bcrypt.hash(password, 10, (err, hashedInputPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
    } else {
      console.log('Hashed Input Password:', hashedInputPassword);
      console.log('Stored Hashed Password:', hashedPasswordFromDB);
  
      // Compare the manually hashed password with the stored one
      bcrypt.compare(password, hashedPasswordFromDB, (err, isMatch) => {
        if (err) {
          console.error('Error comparing password:', err);
        } else {
          console.log('Password match:', isMatch); // It should log true if both passwords match
        }
      });
    }
  });
  