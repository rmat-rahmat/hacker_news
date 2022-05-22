/**
 * @format
 */

import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Comment from '.';

describe('Test Comment screen', () => {


const mockComment =
  {
    "by": "tester2",
    "id": 20,
    "kids": [3],
    "parent": 1,
    "text": "this is comment 2",
    "time": 1314211127,
    "type": "comment"
  }

it('renders Comment correctly', () => {
  const tree = renderer.create(
    <Comment data={mockComment} />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
});