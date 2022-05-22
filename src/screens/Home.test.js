/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from './Home';
import getTopNews from "../api/getTopNews";

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([1, 10, 100, 1000, 10000, 100000]),
  })
);
beforeEach(() => {
  fetch.mockClear();
});

it('Fetch mock data', () => {
  getTopNews().then(x=>{
    expect(x).toHaveLength(6);;
  })
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('renders correctly', () => {
  const tree = renderer.create(
    <Home />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
