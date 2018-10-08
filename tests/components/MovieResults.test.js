import React from "react";
import renderer from "react-test-renderer";
import MovieResults from "../../src/components/MovieResults";



describe("MovieResults", () => {
  test("matches the snapshot", () => {
    const movieArr = [
      {
        imdbID: "aa",
        Year: 2017,
        Title: "We love testing",
        Poster: "xx"
      },
      {
        imdbID: "bb",
        Year: 2018,
        Title: "We love resting",
        Poster: "XXX"
      }
    ];
    const tree = renderer.create(<MovieResults movies={movieArr}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
