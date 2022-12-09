import Peep from '../models/peep.model.js';

import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import testPeepData from './testData/samplePeeps.js';
import server from '../server.js';

chai.use(chaiHttp);
const testData = testPeepData.peeps;

describe(`/peeps route tests`, () => {

    const testServer = chai.request(server).keepOpen();

    beforeEach(async () => {

        try {
            await Peep.deleteMany();
            console.log(`Peeps collection cleared`);
        } catch (error) {
            console.log(`Error clearing peeps collection`);
            throw new Error();
        };

        try {
            await Peep.insertMany(testData);
            console.log(`Database populated with test peeps`);
        } catch (error) {
            console.log(`Error inserting into peep collection`);
            throw new Error();
        };
    });

    describe(`/GET peeps`, () => {

        it(`should return all of the peeps as an array`, async () => {
            const res = await testServer
                .get(`/peeps`)
                .send();

            console.log(res.status);
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.equal(testData.length)
        })
    });

    // describe(`/POST peeps`, () => {

    //     it(`should should receive an error if no `)
    // })
})