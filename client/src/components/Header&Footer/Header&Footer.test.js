import { render, screen } from '@testing-library/react';
import Header from './Header';
import Footer from './Footer';

test(`Header matches snapshot`, () => {
    const headerComponent = render(<Header />);

    expect(headerComponent).toMatchSnapshot();
});

test(`Footer matches snapshot`, () => {
    const footerComponent = render(<Footer />);

    expect(footerComponent).toMatchSnapshot();
});