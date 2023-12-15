import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../../../lang/i18n';
import LoginPage from '../../../pages/LoginPage';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

jest.mock('axios'); //Jest로 axios 모킹하기

beforeAll(()=>{
  // Error: Not implemented: window.alert 에러가 발생해서
  window.alert = jest.fn(); //winodw Mocking

  Object.defineProperty(window, 'localStorage', {
    value:{
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear:jest.fn()
    },
    writable: true
  });
});

afterEach(()=>{
  jest.clearAllMocks(); //mock 호출정보를 초기화
});

test('render LoginPage and handles from submissions', async()=>{  // 유저가 아이디와 비번 입력 후 로그인 버튼 클릭
  const successResponse = {data:{isSuccess:true}, status:200};
  const errorResponse = { response:{ data:{ isSuccess:false}, status :401}};
  axios.post.mockRejectedValueOnce(errorResponse);
  // Mock the axios.post method
  axios.post.mockResolvedValueOnce(successResponse);

  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </I18nextProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('아이디:'), { target: { value: '999' } });
  fireEvent.change(screen.getByLabelText('비밀번호:'), { target: { value: '000' } });

  const submitButton = screen.getByRole('button', {
    name:'로그인',
  });

  fireEvent.click(submitButton);
  // Wait for the axios.post call to complete
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

})


test('renders LoginPage and handles form submission with empty fields', async () => { //아무것도입력없이
  const errorMessage = 'Please fill in all field';
  const errorResponse = { response:{ data:{ message:errorMessage, isSuccess:false}, status :401}}; 
  axios.post.mockRejectedValueOnce(errorResponse);
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </I18nextProvider>
    </MemoryRouter>
  );
  
  const submitButton = screen.getByRole('button', {
  name:'로그인',
  });
  
  fireEvent.click(submitButton);
  
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

  // Check if window.alert was called 
  expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });
  
  test('renders LoginPage and handles form submission with wrong account info', async () => { //잘못된정보
    const errorMessage = 'Invalid account information';
    const errorResponse = { response:{ data:{ message:errorMessage, isSuccess:false}, status :401}};
    axios.post.mockRejectedValueOnce(errorResponse);
  
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </I18nextProvider>
    </MemoryRouter>
  );
  
  
  fireEvent.change(screen.getByLabelText("아이디:"),{target:{value:'wrongId'}});
  fireEvent.change(screen.getByLabelText("비밀번호:"),{target:{value:'wrongPassword'}});
  
  
  const submitButton = screen.getByRole('button', {
  name:'로그인',
  });
  
  fireEvent.click(submitButton);
  
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  expect(window.alert).toHaveBeenCalledWith(errorMessage);

  });