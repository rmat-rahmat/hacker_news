/**
 * @format
 */

import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Details from '.';
import getNewsDetails from '../../api/getNewsDetails';

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

const mockComment = [
  {
    "by": "tester1",
    "id": 2,
    "kids": [],
    "parent": 1,
    "text": "this is comment 1",
    "time": 1314211127,
    "type": "comment"
  },
  {
    "by": "tester2",
    "id": 20,
    "kids": [3],
    "parent": 1,
    "text": "this is comment 2",
    "time": 1314211127,
    "type": "comment"
  }
];


it('fetch Comment', async () => {
  const makeFetchResponse = value => ({ json: async () => mockComment[value] })
  const mockFetch = jest.fn()
    .mockReturnValueOnce(makeFetchResponse(0))
    .mockReturnValueOnce(makeFetchResponse(1))
  global.fetch = mockFetch

  getNewsDetails(0).then(x => {
    expect(x.id).toEqualTo(2);
  })
  getNewsDetails(1).then(x => {
    expect(x.id).toEqualTo(20);
  })
  expect(mockFetch).toHaveBeenCalledTimes(2)
})


it('renders Details correctly', () => {
  const tree = renderer.create(
    <Details data={mockData} />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
});