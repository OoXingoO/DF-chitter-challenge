import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PostPeep from './PostPeep';

describe(`PostPeep tests`, () => {

    const mockPeepHandler = jest.fn();

    beforeEach(() => {
        render(<PostPeep peepHandler={mockPeepHandler} />);
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
        })
    })

    describe(`Submit tests`, () => {
        it(`should make a call to mockPeepHandler when Peep! is clicked`, () => {
            //Arrange
            const testPeep = {
                peepMessage: "testings peep",
                date: new Date().toISOString()
            };
            const peepInput = screen.getByRole(/text/i);
            const addPeepButton = screen.getByRole(/button/i);
            //Act
            userEvent.type(peepInput, testPeep.peepMessage);
            userEvent.click(addPeepButton);
            //Assert
            expect(mockPeepHandler).toHaveBeenCalledTimes(1);
        })
    })

})