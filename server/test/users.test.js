import User from "../models/user.model.js";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import testData from './testData/sampleData.js';
import server from '../server.js';

chai.use(chaiHttp);
const testUserData = testData.users;

describe(`Users tests`, () => {

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
    });

    describe(`/Login route tests`, () => {

        const testServer = chai.request(server).keepOpen();

        beforeEach(async () => {
            try {
                await User.deleteMany();
                console.log(`Users collection cleared`);
            } catch (error) {
                console.log(`Error clearing users collection: ${error.message}`);
                throw new Error();
            };

            try {
                await User.insertMany(testUserData);
                console.log(`Database populated with test users`);
            } catch (error) {
                console.log(`Error inserting into user collection: ${error.message}`);
                throw new Error();
            };
        })

        describe(`/Post users`, () => {

            it(`should return login success if user is found in database`, async () => {

                const userLogin = {
                    username: testData.users[0].username,
                    password: testData.users[0].password
                }

                const res = await testServer
                    .post(`/login`)
                    .send(userLogin);

                expect(res.body).to.have.property(`message`, `Login success`);
            });

            it(`should return error message if login details do not match database`, async () => {
                const mockUser = {
                    username: "invalid user",
                    password: "invalid password"
                }

                const res = await testServer
                    .post(`/login`)
                    .send(mockUser);

                expect(res).to.have.status(404);
                expect(res.body).to.have.property(`message`, `Details not found`);
            });

            it(`should return status 422 if username field is missing`, async () => {
                const mockUser = {
                    password: "invalid password"
                }

                const res = await testServer
                    .post(`/login`)
                    .send(mockUser);

                expect(res).to.have.status(422);
                expect(res.text).to.be.eql(`Invalid login data`);
            })
        })
    })
})