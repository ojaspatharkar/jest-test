import React from 'react';
// import { render } from '@testing-library/react';
import App from './App';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

jest.mock('./Phone', () => {
  return function DummyPhone(props) {
    return (
      <div data-testid='phone'>123</div>
    )
  }
})

let container = null;
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container);
})

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

const getByTestId = (testId)=>{
  return document.querySelector("[data-testid='"+testId+"']")
}

it("renders component with or without name", () => {
  act(() => {
    render(<App />, container)
  })
  // expect(container.textContent).toBe('Hey stranger');

})

it("renders users data", async () => {
  const mockUser = {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockUser)
    })
  );


  await act(async () => {
    render(<App id={1} />, container)
  })
  expect(getByTestId('name').textContent).toBe("Hey " + mockUser.name);
  expect(getByTestId('email').textContent).toBe(mockUser.email);
  expect(getByTestId('phone').textContent).toBe("123");

  let sampleText = getByTestId('sampleText')
  sampleText.value = "Ojas"
  expect(sampleText.value).toBe("Ojas");
  
  global.fetch.mockRestore();
});