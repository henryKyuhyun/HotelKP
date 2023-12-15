// client/tests/unit/components/join.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import JoinPage from "../../../pages/JoinPage";
import '../../../lang/i18n'
import { I18nextProvider } from "react-i18next";
import i18n from '../../../lang/i18n';
import axios from 'axios'; 

jest.mock('axios');  

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    },
    writable: true
  });
});

afterEach(() => {
  jest.clearAllMocks();
});



test('renders JoinPage and handles form submission', async () => {
  const successResponse = { data: { isSuccess: true }, status: 200 };
  // Use mocked axios post instead of join function
  axios.post.mockImplementation(() => new Promise(resolve => {
    process.nextTick(() => resolve(successResponse));
  }));
  const errorResponse = { response: { data: { isSuccess: false }, status: 400 } };
  
  // Use mocked axios post instead of join function
  axios.post.mockResolvedValueOnce(successResponse); 
  axios.post.mockRejectedValueOnce(errorResponse); 
  render(
    <MemoryRouter> 
      <I18nextProvider i18n={i18n}>
        <JoinPage/>
      </I18nextProvider>
    </MemoryRouter>
  );

  // simulate user input
  fireEvent.change(screen.getByLabelText(i18n.t('name')), { target: { value: '001123' } });
  fireEvent.change(screen.getByLabelText(i18n.t('id')), { target: { value: '001123' } });
  fireEvent.change(screen.getByLabelText(i18n.t('password')), { target: { value: '001123' } });
  fireEvent.change(screen.getByLabelText(i18n.t('role')), {
    target: {
      value: 'user',
    },
  });

  const submitButton = screen.getByRole('button', {
    name: i18n.t('submit'),
  });
  // Trigger the button click
  fireEvent.click(submitButton);

  // Wait for the post call to be made before proceeding with assertions.
    
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:4000/api/join',
    {
      name: '001123',
      id: '001123',
      password: '001123',
      role: 'user'
    });
});

test('renders JoinPage and handles form submission with empty fields', async () => {
  render(
    <MemoryRouter> 
      <I18nextProvider i18n={i18n}>
        <JoinPage/>
      </I18nextProvider>
    </MemoryRouter>
  );

  const submitButton = screen.getByRole('button', {
    name: i18n.t('submit'),
  });
  
  // Trigger the button click without filling any field
  fireEvent.click(submitButton);

  // Check if the post call was not made.
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(0));
});

test('renders JoinPage and handles form submission with existing account', async () => {
  
  const errorResponse = { response: { data: { isSuccess: false }, status: 409 } };
  
  axios.post.mockRejectedValueOnce(errorResponse); 

  render(
    <MemoryRouter> 
      <I18nextProvider i18n={i18n}>
        <JoinPage/>
      </I18nextProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(i18n.t('name')), { target: { value: 'existingUser' } });
  fireEvent.change(screen.getByLabelText(i18n.t('id')), { target: { value: 'existingId' } });
  fireEvent.change(screen.getByLabelText(i18n.t('password')), { target: { value: 'existingPassword' } });
  fireEvent.change(screen.getByLabelText(i18n.t('role')), {
    target: {
      value: 'user',
    },
  });

  const submitButton = screen.getByRole('button', {
    name: i18n.t('submit'),
    });

  fireEvent.click(submitButton);
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
});
