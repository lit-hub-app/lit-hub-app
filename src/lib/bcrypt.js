import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;

bcrypt.genSalt(saltRounds, function(saltError, salt) {
    if (saltError) {
        throw error;
    } else {
        bcrypt.hash(password, salt, function(hashError, hash) {
            if (hashError) {
                throw error;
            } else {
                console.log(hash);
            }
        })
    }
})