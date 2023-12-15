//app.test.js

import { render, screen } from '@testing-library/react';
import App from './App';
// 밑에두갠 테스트때메 추가 
import { Provider } from 'react-redux';
import { store } from './redux/store';

// axios 전체 모듈에 대한 mock 생성
jest.mock('axios');


test('renders learn react link', () => {
  render(
  <Provider store={store}>
      <App />
  </Provider>
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
