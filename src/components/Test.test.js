import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Test from './Test';
import { act } from 'react-dom/test-utils';
let container = null

jest.useFakeTimers();

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

const getByTestId = (testId) => {
  return document.querySelector("[data-testid='" + testId + "']")
}
it('Renders Test component', () => {
  act(() => {
    render(<Test />, container);
  });
})

it('Increase counter onclick', () => {
  let onUpdate = jest.fn();
  act(() => {
    render(<Test onUpdate={onUpdate}/>, container)
  });
  const button = getByTestId('counter')


  act(() => {
    jest.advanceTimersByTime(100)
  })
  expect(button.textContent).toBe("0");
  expect(onUpdate).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(5000)
  })
  expect(button.textContent).toBe("1")
  expect(onUpdate).toHaveBeenCalledWith(1);

  for (let i = 0; i < 3; i++) {
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
  }
  expect(button.innerHTML).toBe("4")

});