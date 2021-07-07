'use strict';

require('dotenv').config();

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.server);

describe('unauthenticated routes', () => {
    let id;
    test('post method', async () => {
        const response = await request.post('/api/v1/food').send({
            name: "Apple",
            calories: 85,
            type: "fruit"
        });
        id = response.body._id;
        expect(response.status).toBe(201);
        expect(response.body.name).toBeDefined();
        expect(response.body.name).toBe("Apple");
        expect(response.body.type).toEqual("FRUIT");

    })
    test('get no id method', async () => {
        const response = await request.get('/api/v1/food');
        expect(response.status).toBe(200);
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].name).toBe("Apple");
        expect(response.body[0].type).toEqual("FRUIT");

    })
    test('get with id method', async () => {
        const response = await request.get(`/api/v1/food/${id}`)
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(id);
        expect(response.body.name).toBe("Apple");
        expect(response.body.type).toEqual("FRUIT");

    })
    test('put method', async () => {
        const response = await request.put(`/api/v1/food/${id}`).send({
            name: "fish",
            calories: 500,
            type: "protien"
        })
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(id);
        expect(response.body.name).toBe("fish");
        expect(response.body.type).toEqual("PROTIEN");

    })
    test('delete method', async () => {
        const response = await request.delete(`/api/v1/food/${id}`);
        expect(response.status).toBe(200);
        const response1 = await request.get(`/api/v1/food/${id}`);
        expect(response1.status).toBe(200);
        expect(response1.body).toBe(null);

    })
});