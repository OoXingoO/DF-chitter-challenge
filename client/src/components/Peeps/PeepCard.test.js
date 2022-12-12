import { render, screen } from '@testing-library/react';
import PeepCard from './PeepCard';
import sampleData from '../../mockPeep.json'

describe(`PeepCard tests`, () => {

    beforeEach(() => {
        render(<PeepCard peep={sampleData.peeps[0]} />);
    });

    it(`should display name on screen`, () => {
        const testName = screen.getByText(/Lady Gaga/i);

        expect(testName).toBeInTheDocument();
    })

    it(`should display username on screen`, () => {
        const testUsername = screen.getByText(/Gagaga/i);

        expect(testUsername).toBeInTheDocument();
    });

    it(`should display peepMessage on screen`, () => {

        const testPeepMessage = screen.getByText("Poker face :|");

        expect(testPeepMessage).toBeInTheDocument();
    });

    it(`should display date in locale format on screen`, () => {

        const testDate = screen.getByText("29/11/2022·11:30:00");

        expect(testDate).toBeInTheDocument();
    })
})