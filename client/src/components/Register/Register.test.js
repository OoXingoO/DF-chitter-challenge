import axiosMock from 'axios';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';

import mockUser from '../../mockUsers.json';
import Register from './Register';

jest.mock('axios');
window.alert = jest.fn();

describe(`Register tests`, () => {

    beforeEach(() => {
        render(<MemoryRouter>
            <Register />
        </MemoryRouter>)
    });

    describe(`Render tests`, () => {

        it(`should render name input`, () => {
            const result = screen.getByPlaceholderText("Enter name...")

            expect(result).toBeInTheDocument();
        });

        it(`should render username input`, () => {
            const result = screen.getByPlaceholderText("Enter username...")

            expect(result).toBeInTheDocument();
        });

        it(`should render email input`, () => {
            const result = screen.getByPlaceholderText("Enter email...")

            expect(result).toBeInTheDocument();
        });

        it(`should render password input`, () => {
            const result = screen.getByPlaceholderText("Enter password...")

            expect(result).toBeInTheDocument();
        });

    })

    describe(`Form manipulation tests`, () => {

        it(`should render the values in all input fields when typed`, () => {

            const testUser = {
                name: "testUser01",
                username: "testUsername01",
                email: "testUser01@email.com",
                password: "password123"
            }

            const nameInput = screen.getByPlaceholderText("Enter name...");
            const usernameInput = screen.getByPlaceholderText("Enter username...");
            const emailInput = screen.getByPlaceholderText("Enter email...");
            const passwordInput = screen.getByPlaceholderText("Enter password...");

            userEvent.type(nameInput, testUser.name);
            userEvent.type(usernameInput, testUser.username);
            userEvent.type(emailInput, testUser.email);
            userEvent.type(passwordInput, testUser.password);

            expect(nameInput).toHaveValue(testUser.name);
            expect(usernameInput).toHaveValue(testUser.username);
            expect(emailInput).toHaveValue(testUser.email);
            expect(passwordInput).toHaveValue(testUser.password);
        });
    })

    describe('Form Submission tests', () => {
        const testUser = mockUser[0]

        beforeEach(async () => {
            axiosMock.post.mockResolvedValueOnce({ testUser, data: { message: "alert message" } });

            delete testUser._id;

            const nameInput = screen.getByPlaceholderText("Enter name...");
            const usernameInput = screen.getByPlaceholderText("Enter username...");
            const emailInput = screen.getByPlaceholderText("Enter email...");
            const passwordInput = screen.getByPlaceholderText("Enter password...");
            const registerButton = screen.getByRole(/button/i)

            userEvent.type(nameInput, testUser.name);
            userEvent.type(usernameInput, testUser.username);
            userEvent.type(emailInput, testUser.email);
            userEvent.type(passwordInput, testUser.password);

            await act(async () => userEvent.click(registerButton))
        });

        it(`should make a POST request to the /register route with the inputted contents`, async () => {
            expect(axiosMock.post).toHaveBeenCalledWith(`http://localhost:4000/register`, testUser);
        })

        it(`should call alert() with response message`, async () => {
            expect(window.alert).toHaveBeenCalledWith("alert message");
        })
    })
})