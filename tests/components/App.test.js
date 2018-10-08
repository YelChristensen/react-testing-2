import React from 'react';
import App from '../../src/components/App';
import { shallow } from 'enzyme';


global.fetch = require('jest-fetch-mock')



describe('App', () => {
    beforeEach(() => {
        fetch.resetMocks();
    }) 

    const BATMAN = {
        "Title": "Batman Begins",
        "Year": "2005",
        "imdbID": "tt0372784",
        "Type": "movie",
        "Poster": "..."
      };

  test('return empty array if the search query does not match any movies', async () => {
    fetch.mockResponseOnce(
        JSON.stringify({
            Response:"False",
            Error:"Movie not found!"
        })
    )
  
   const wrapper = shallow(<App/>)
   const instance = wrapper.instance()
   return instance.submitSearch('asdfg')
   .then(() => {
        expect(fetch).toHaveBeenCalledWith(
            `http://www.omdbapi.com/?s=asdfg&apikey=2cda7206`
        );
       const moviesState = wrapper.state('movies');
       expect(moviesState.length).toBe(0);
       expect(moviesState).toEqual([])
   })
})

    test('return movie array based on the search term', async () => {
    fetch.mockResponseOnce(
        JSON.stringify({Search: [BATMAN]})
    )
  
   const wrapper = shallow(<App/>)
   const instance = wrapper.instance()
   return instance.submitSearch('batman')
   .then(() => {
        expect(fetch).toHaveBeenCalledWith(
            `http://www.omdbapi.com/?s=batman&apikey=2cda7206`
        );
       const moviesState = wrapper.state('movies');
       expect(moviesState.length).toBeGreaterThan(0);
       expect(moviesState[0]).toEqual(BATMAN)
   })
})
});
