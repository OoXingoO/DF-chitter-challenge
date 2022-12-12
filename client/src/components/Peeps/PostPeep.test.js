import axiosMock from 'axios';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import samplePeeps from '../../mockPeep.json';

import PostPeep from './PostPeep';

jest.mock('axios');
window.alert = jest.fn();

const testPeep = {
    name: "testUser01",
    username: "testUsername01",
    peepMessage: "testPeepMessage",
    date: "2022-12-08T12:10:45.000Z"
}

describe(`PostPeep tests`, () => {

    const testUsername = samplePeeps.peeps[0].username;
    const mockGetPeeps = jest.fn();

    beforeEach(() => {
        render(<PostPeep user={testUsername} getPeepData={mockGetPeeps} />);
    });

    describe(`Render tests`, () => {

        it(`should render a textarea input`, () => {
            const result = screen.getByRole(/text/i);
            expect(result).toBeInTheDocument();
        });

        it(`should render a Peep! button`, () => {
            const result = screen.getByText(/Peep!/i)
            expect(result).toBeInTheDocument()
        });

    });

    describe(`Form input tests`, () => {
        it(`should render new peepMessage when typed`, () => {
            //Arrange
            const testPeep = "Just testing a peep";
            const peepInput = screen.getByRole(/text/i);
            //Act - simulate typing 
            userEvent.type(peepInput, testPeep);
            //Assert
            expect(peepInput).toHaveValue(testPeep);
        });
    });

    describe(`Form Submission tests`, () => {
        it(`should make a POST request`, async () => {

            axiosMock.post.mockResolvedValueOnce({ testPeep, data: { message: "alert message" } });
            delete testPeep._id;

            const peepMessageInput = screen.getByRole(/text/i);
            const peepButton = screen.getByText(/Peep!/i);

            userEvent.type(peepMessageInput, testPeep.peepMessage)
            await act(async () => userEvent.click(peepButton))

            expect(axiosMock.post).toHaveBeenCalledTimes(1)
        })
    })


})


