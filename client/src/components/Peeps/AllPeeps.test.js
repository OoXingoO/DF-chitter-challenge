import { render, screen } from '@testing-library/react';
import samplePeeps from '../../mockPeep.json';
import AllPeeps from './AllPeeps';

jest.mock("../Peeps/PeepCard", () => {
    return function mockPeepCard() {
        return <span data-testid="mockPeep">All Peep Component</span>
    }
})

describe(`AllPeeps tests`, () => {
    it(`should render same number of PeepCard component as in the samplePeep array`, () => {

        const samplePeepCard = samplePeeps.peeps;

        render(<AllPeeps peepData={samplePeeps.peeps} />)

        const result = screen.getAllByTestId("mockPeep")

        expect(result.length).toBe(samplePeepCard.length);
    })
})