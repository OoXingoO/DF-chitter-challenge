import axiosMock from 'axios';
import { act, screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from './LoginPage';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
window.alert = jest.fn();

const testUserLogin = {
    username: "testUsername01",
    password: "password123"
}

describe(`LoginPage tests`, () => {
    const mockSetUser = jest.fn();

    beforeEach(() => {
        render(
            <MemoryRouter>
                <LoginPage setUser={mockSetUser} />
            </MemoryRouter>
        );
    });

    describe(`Render tests`, () => {

        it(`should render username input`, () => {
            const result = screen.getByPlaceholderText("Enter username...");

            expect(result).toBeInTheDocument();
        });

        it(`should render password input`, () => {
            const result = screen.getByPlaceholderText("Enter password...");

            expect(result).toBeInTheDocument();
        });

        it(`should render login button`, () => {
            const result = screen.getByRole(/button/i);

            expect(result).toBeInTheDocument();
        });
    })

    describe(`Form manipulation tests`, () => {

        it(`should render the values in all input fields when typed`, () => {

            const usernameInput = screen.getByPlaceholderText("Enter username...");
            const passwordInput = screen.getByPlaceholderText("Enter password...");

            userEvent.type(usernameInput, testUserLogin.username);
            userEvent.type(passwordInput, testUserLogin.password);

            expect(usernameInput).toHaveValue(testUserLogin.username);
            expect(passwordInput).toHaveValue(testUserLogin.password);
        })
    });

    describe(`Form submission tests`, () => {

        beforeEach(async () => {
            axiosMock.post.mockResolvedValueOnce({ testUserLogin, data: { message: "alert message" } })


            delete testUserLogin._id;

            const usernameInput = screen.getByPlaceholderText("Enter username...");
            const passwordInput = screen.getByPlaceholderText("Enter password...");
            const loginButton = screen.getByRole(/button/i)

            userEvent.type(usernameInput, testUserLogin.username);
            userEvent.type(passwordInput, testUserLogin.password);

            await act(async () => userEvent.click(loginButton));
        });

        it(`should make a POST request to /login route`, async () => {
            expect(axiosMock.post).toHaveBeenCalledTimes(1);
            expect(axiosMock.post).toHaveBeenCalledWith(`http://localhost:4000/login`, testUserLogin);
        })

        it(`should call alert() with response message`, async () => {
            expect(window.alert).toHaveBeenCalledWith("alert message");

        })
    })
})