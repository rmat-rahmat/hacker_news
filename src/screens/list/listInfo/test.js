/**
 * @format
 */

import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ListInfo from '.';


describe('Test Details screen', () => {

const mockData = {
  "by": "Tester",
  "descendants": 71,
  "id": 1,
  "kids": [2, 20],
  "score": 111,
  "time": 1175714200,
  "title": "This is test story",
  "type": "story",
  "url": "http://www.getdropbox.com/u/2/screencast.html"
}


it('renders ListInfo correctly', () => {
  const tree = renderer.create(
    <ListInfo data={mockData} />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
});