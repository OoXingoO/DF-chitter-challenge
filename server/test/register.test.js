import User from "../models/user.model.js";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import testData from './testData/sampleData.js';
import server from '../server.js';

chai.use(chaiHttp);
const testUserData = testData.users;

describe(`/Register route tests`, () => {

    const testServer = chai.request(server).keepOpen();

    beforeEach(async () => {

        try {
            await User.deleteMany();
            console.log(`User collection cleared`);
        } catch (error) {
            console.log(`Error clearing user collection: ${error.message}`);
            throw new Error();
        };

        try {
            await User.insertMany(testUserData);
            console.log(`Database populated with test users`);
        } catch (error) {
            console.log(`Error inserting into user collection: ${error.message}`);
            throw new Error();
        };

    });

    describe(`/POST users`, () => {

        const mockUser = {
            name: "testUser03",
            username: "",
            email: "",
            password: "password12"
        }

        it(`should not create a register if any input field is missing`, async () => {

            const res = await testServer
                .post(`/register`)
                .send(mockUser);

            expect(res).to.have.status(422);
            expect(res.text).to.be.eql(`Invalid register data`)
        });

        it(`should create a new register user if all input field are formed properly`, async () => {
            const mockUser = {
                name: "testUser04",
                username: "testUsername04",
                email: "testUser04@email.com",
                password: "password1"
            }

            const res = await testServer
                .post('/register')
                .send(mockUser);

            expect(res.body).to.have.property(`message`, `Registration successful`)
        })

        it(`should not add existing users`, async () => {

            const res = await testServer
                .post(`/register`)
                .send(testUserData[0]);

            expect(res.body).to.have.property(`message`, `User already exists`)
        })
    })
})