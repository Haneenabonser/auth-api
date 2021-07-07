'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.server);

process.env.SECRET='haneen'

let users = {
    admin: { username: 'admin', password: 'password',role:'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    user: { username: 'user', password: 'password', role: 'user' },
};

describe('sign-up sign-in test', () => {
    Object.keys(users).forEach(userType => {
        test('sign up', async () => {
            const response = await request.post('/signup').send(users[userType]);
            expect(response.status).toBe(201);
            expect(response.body.token).toBeDefined();
            expect(response.body.user._id).toBeDefined();
            expect(response.body.user.username).toEqual(users[userType].username);
               
        })
        test('sign in',async ()=>{
            const response = await request.post('/signin').auth(users[userType].username,users[userType].password);
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
            expect(response.body.user._id).toBeDefined();
            expect(response.body.user.username).toEqual(users[userType].username);
        })
       
    })

})