import axiosMock from 'axios';

import { addPeepData, getPeepData } from './externalDataHandlers';

jest.mock('axios');

describe(`External data tests`, () => {

    const testSetErrorStatus = jest.fn();
    const testSetPeepData = jest.fn();

    describe(`getPeepData tests`, () => {

        beforeEach(() => {
            axiosMock.get.mockResolvedValueOnce([{ peepMessage: 'testPeepMessage' }]);
            getPeepData(testSetPeepData, testSetErrorStatus);
        });

        it(`should make a get request via axios`, () => {
            expect(axiosMock.get).toHaveBeenCalledTimes(1);
        });

        it(`should call testSetPeepData when response returns valid data`, () => {
            expect(testSetPeepData).toHaveBeenCalledTimes(1);
        });
    });

    describe(`addPeepData tests`, () => {

        const getPeepData = jest.fn();
        const setErrorStatus = jest.fn();
        const testPeep = {
            peepMessage: "testing peep",
            date: new Date().toISOString()
        };
        const error = {
            message: "add peep failed"
        };

        describe(`Base request`, () => {

            beforeEach(() => {
                addPeepData(testPeep, getPeepData, setErrorStatus);
            });

            it(`should have made a post request to axios`, () => {
                expect(axiosMock.post).toHaveBeenCalledTimes(1);
            });
        });

        describe(`Successful POST request`, () => {
            beforeEach(() => {
                axiosMock.post.mockResolvedValueOnce({ status: 201 });
                addPeepData(testPeep, getPeepData, setErrorStatus);
            });

            it(`should call getPeepData when POST is successfully made`, () => {
                expect(getPeepData).toHaveBeenCalledTimes(1);
            });
        });

        describe(`Unsuccessful POST request`, () => {

            beforeEach(() => {
                axiosMock.post.mockRejectedValueOnce(error);
                addPeepData(testPeep, getPeepData, setErrorStatus);
            });

            it(`should call setErrorStatus with error.message when POST is unsuccessful`, () => {
                expect(setErrorStatus).toHaveBeenCalledTimes(1);
                expect(setErrorStatus).toHaveBeenCalledWith(error.message);
            })
        })
    })
})