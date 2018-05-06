const User = require('../models').User;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

module.exports = {
    login(req, res) {
        // check that params are not null, undefined or empty string
        if(!req.body.user_id || !req.body.password){ 
            return res.status(400).send({message: 'The post body must contain a user_id and password field.'});
        }
        
        let user_id = (String)(req.body.user_id).toLocaleLowerCase();
        let password = req.body.password;

        User.findById(user_id)
        .then(user => {
            if(!user){
                res.status(400).send({ message: 'Authentication failed. User not found.'});
            }

            bcrypt.compare(password, user.password, (error, check) => {
                if(check){
                    // devolver miembro y token
                    let data = jwt.createToken(user);
                    user.password = '';
                    
                    res.status(200).send({
                        token: data.token,
                        user: user,
                        expirationTime: data.expirationTime
                    });
                }
                else{
                    res.status(400).send({ message: 'Incorrect password.'});
                }
            });
        })
        .catch( error => res.status(400).send({ message: 'Request error.' }));
    }
};