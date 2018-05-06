const expect = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8000/api';

/**
 * Tests for User model and controller.
 */

/** 
 * Function to find a user in a list of users
 * 
 * @param users the list of users
 * @param user the user to look for
 * @returns true if the user was found. Else, false.
 */
function findUser(users, user) {

    logs.array.forEach(element => {
        // check that the object we tried to insert is different to every object in the DB
        if (element.id === user.id &&
            element.department_major === user.department_major &&
            element.name === user.name &&
            element.photo_URL === user.photo_URL &&
            element.password === user.password) {

            return true;
        }
    });

    return false;
}

/**
 * Function to retrieve from the DB the password of a given user
 * 
 * @param userId the id of the user whose password is to be retrieved
 * @returns the password of the user stored in the DB
 */
function getUserPassword(userId){

    //TODO: Look how to query the DB inside a test
    return "TEST_VALUE-FIX_THE_FUNCTION_LOGIC: THIS SHOULD BE THE PASSWORD IN THE DB";
}

/**
 * Function to compare two strings
 * 
 * @param str1 the first string
 * @param str2 the second string
 * @returns true is the string are equal. Else, false.
 */
function areEqualStrings(str1, str2){

    return str1.equal(str2);
}

describe('User model', () => {

    // Create operation
    describe('Create: #create(' +
        'id, department_major, name, photo_URL, password) | ' +
        'body: id, department_major, name, photo_URL, password', () => {

            // complete and correct parameters, expects successful insertion
            it('valid request', (done) => {
                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC',
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(201); // if response is successful
                    let newUser = JSON.parse(body);

                    // Make get request to get the inserted object
                    request.get(URL + 'users/' + newUser.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        expect(newUser).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                    });

                    done();
                });
            });

            // empty department_major is passed as parameter, expects error in insertion
            it('empty department_major', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: '', //Empty department_major field
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newUser = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'users/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findUser(list, newUser);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // empty name is passed as parameter, expects error in insertion
            it('empty name', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC', 
                        name: '', //Empty name field
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newUser = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'users/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findUser(list, newUser);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // empty password is passed as parameter, expects error in insertion
            it('empty password', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC', 
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL', 
                        password: '' //Empty password field
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newUser = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'users/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findUser(list, newUser);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // Test to verify that a password was hashed
            it('password was hashed', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC',
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(201); // if response is successful
                    let newUser = JSON.parse(body);

                    // Make get request to get the inserted object
                    request.get(URL + 'users/' + newUser.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        //Compare the password passed by the POST in the body and the 
                        //password stored in the DB after the insertion of the user
                        let storedPassword = getUserPassword(newUser.id);
                        let areEqualPasswords = areEqualStrings(postOptions.password, storedPassword);
                        expect(areEqualPasswords).to.be.false;
                    });

                    done();
                });
            });
        });

    //Retrieve operation
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Successfully retrieve a user
        it('Retrieve an existent user', (done) => {
            
            let user = {

                id: 'A00000000',
                department_major: 'ITC',
                name: 'firstName lastName',
                photo_URL: 'photo_URL',
                //Should the password field be here as well?
            };

            request.get(URL + '/users/' + user.id, (error, response, body) => {

                expect(response.statusCode).to.be.equal(200); //If response is successful
                expect(JSON.parse(body)).to.be.deep(user);
            });
            
            done();
        });

        // Try to retrieve a user that does not exist
        it('Retrieve an non-existent user', (done) => {
            
            //Try to retrieve a user whose ID is 0 (fake id)
            request.get(URL + '/users/0', (error, response, body) => {

                expect(response.statusCode).to.be.equal(400); //If response failed
            });
            
            done();
        });
    });

    // Update operation
    describe('Update: #update(' +
        'id, department_major, name, photo_URL, password) | ' +
        'body: id, department_major, name, photo_URL, password', () => {

        // Try to update a user. Make the department_major field a non-existent value.
        it('Update a user with a non-existent department_major field', (done) => {
            
            request.get(URL + '/users/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newUser = {

                    id: body.id,
                    department_major: "NON_EXISTENT_VALUE", //non-existent value of a department_major
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let putOptions = {

                    url: URL + '/users',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the object was not inserted
                    request.get(URL + '/users', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUser(list, newUser);
                        expect(found1).to.be.false; //Check that the user was not updated

                        let found2 = findUser(list, oldUser);
                        expect(found2).to.be.true; //Check that the user with old values still exists
                    });

                    done();
                });                
            });
        });

        // Try to update a user. Make the name field an empty string.
        it('Update a user with an empty name field', (done) => {
            
            request.get(URL + '/users/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newUser = {

                    id: body.id,
                    department_major: body.department_major, 
                    name: '', //empty string for the name
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let putOptions = {

                    url: URL + '/users',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                }

                // Make put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the object was not inserted
                    request.get(URL + '/users', (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful

                        let list = JSON.parse(body);
                        let found1 = findUser(list, newUser);
                        expect(found1).to.be.false; //Check that the user was not updated

                        let found2 = findUser(list, oldUser);
                        expect(found2).to.be.true; //Check that the user with old values still exists
                    });

                    done();
                });                
            });
        });

        // Update the password and make sure it was hashed
        it('Update the password of a user. Make sure it was hashed.', (done) => {
            
            request.get(URL + '/users/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newUser = {

                    id: body.id,
                    department_major: body.department_major, 
                    name: body.name, 
                    photo_URL: body.photo_URL,
                    password: body.password + 'other characters' //new password
                };

                let putOptions = {

                    url: URL + '/users',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                }

                // Make the put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(400);

                    // Make a get request to verify that the password was hashed
                    request.get(URL + '/users/' + oldUser.id, (error, response, body) => {

                        expect(response.statusCode).to.be.equal(200); //If response is successful
                        let updatedUser = JSON.parse(body);    

                        //Compare the previously stored password and the currently stored password
                        let areEqualPasswords = areEqualStrings(updatedUser.password, oldUser.password);
                        //They must be different
                        expect(areEqualPasswords).to.be.false;
                    });

                    done();
                });                
            });
        });

        // Update some or all of the fields of a user. Make sure that the update was successful.
        it('Update some or all of the fields of a user. Make sure that the update was successful.', (done) => {
            
            request.get(URL + '/users/1', (error, response, body) => {

                expect(response.statusCode).to.be.equal(200);

                let oldUser = {

                    id: body.id,
                    department_major: body.department_major,
                    name: body.name,
                    photo_URL: body.photo_URL,
                    password: body.password
                };

                let newUser = {

                    id: body.id,
                    department_major: body.department_major, 
                    name: body.name + ' other characters',
                    photo_URL: body.photo_URL + '/photo/123',
                    password: body.password
                };

                let putOptions = {

                    url: URL + '/users',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                }

                // Make a put request
                request.put(putOptions, (error, response, body) => {

                    expect(response.statusCode).to.be.equal(200);

                    // Make a get request to verify that the object was successfully updated
                    request.get(URL + '/users', (error, response, body) => {

                        //If response is successful
                        expect(response.statusCode).to.be.equal(200); 

                        let list = JSON.parse(body);
                        let found1 = findUser(list, newUser);
                        //Check that the user was indeed updated
                        expect(found1).to.be.true; 

                        let found2 = findUser(list, oldUser);
                        //Check that the user with the old values does not exist anymore
                        expect(found2).to.be.false; 
                    });

                    done();
                });                
            });
        });
        
    });

    //Delete operation
    describe('Delete: #delete() | parameters: id', () => {

        // Delete an existent user, response: successful
        // Careful: Cascade deletion should be implemented and verified!
        it('Delete an existent user', (done) => {
            
            // Define POST request parameters and body
            let postOptions = {
                url: URL + '/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 'A99999999',
                    department_major: 'ITC',
                    name: 'firstName lastName',
                    photo_URL: 'foto_URL',
                    password: '12345'
                })
            };

            // Make post request to create a new user
            request.post(postOptions, (error, response, body) => {
                expect(response.statusCode).to.be.equal(201); // if response is successful
                let newUser = JSON.parse(body);

                // Make get request to get the inserted object
                request.get(URL + 'users/' + newUser.id, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(200); // if response is successful
                    expect(newUser).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                });
            });

            // Make delete request to delete the inserted user
            request.delete( URL + '/users/' + postOptions.id, (error, response, body) => {
                expect(response.statusCode).to.be.equal(200); // if response is successful
            });

            //Now verify that the items associated to this user (user_project, user_task) were also deleted in the DB

            // Query the instances of user_project of the user that was deleted
            // request.get();

            // Query the instances of user_task of the user that was deleted
            // request.get();

            done();
        });


        // Try to delete a non-existent user, response: unsuccesful
        it('Delete a non-existent user', (done) => {
            request.delete(URL + '/users/0', (error, response, body) => {
                expect(response.statusCode).to.be.equal(400); //response should be unsuccesful
            });
            done();
        });
    });
});