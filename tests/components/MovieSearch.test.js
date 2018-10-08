import React from 'react';
import renderer from 'react-test-renderer';
import MovieSearch from '../../src/components/MovieSearch';
import { shallow } from 'enzyme';




describe('MovieSearch', () => {
  test('matches the snapshot', () => {
    const tree = renderer.create(<MovieSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('handleSumbit gets called when the form is submitted', () => {
    const event = {
        preventDefault: jest.fn()
    }
    const handleSumbit = jest.fn()
    const wrapper = shallow(
        <MovieSearch 
            movieString={'Gone with the wind'} 
            submitSearch={handleSumbit} 
        />)
    wrapper.find('form').simulate('submit', event);
    expect(handleSumbit.mock.calls).toEqual([['Gone with the wind']])
})
});

