import Peep from '../models/peep.model.js';

import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import testData from './testData/sampleData.js';
import server from '../server.js';

chai.use(chaiHttp);
const testPeepData = testData.peeps;

describe(`/peeps route tests`, () => {

    const testServer = chai.request(server).keepOpen();

    beforeEach(async () => {
        try {
            await Peep.deleteMany();
            console.log(`Peeps collection cleared`);
        } catch (error) {
            console.log(`Error clearing peeps collection: ${error.message}`);
            throw new Error();
        };

        try {
            await Peep.insertMany(testPeepData);
            console.log(`Database populated with test peeps`);
        } catch (error) {
            console.log(`Error inserting into peep collection: ${error.message}`);
            throw new Error();
        };
    });

    describe(`/GET peeps`, () => {

        it(`should return all of the peeps as an array`, async () => {
            const res = await testServer
                .get(`/peeps`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.equal(testPeepData.length);
        })
    });

    describe(`/POST peeps`, () => {

        it(`should create a new peep that is properly formed`, async () => {
            const newPeep = {
                name: "testUser04",
                username: "testUsername04",
                peepMessage: "Just testing a peep here!",
                date: new Date().toISOString()
            }

            const res = await testServer
                .post(`/peeps`)
                .send(newPeep);

            expect(res).to.have.status(201);
            expect(res.body).to.be.an(`object`);
            expect(res.body).to.have.property(`peep`, `Peep added successfully`);
        })
    })
})