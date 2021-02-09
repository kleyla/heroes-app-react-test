import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { heroes } from "../../data/heroes";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  //   console.log(location.search);
  //   console.log(queryString.parse(location.search));
  const { q = "" } = queryString.parse(location.search);

  const [values, handleInputChange] = useForm({
    searchText: q,
  });
  const { searchText } = values;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
    console.log("ii");
  };

  return (
    <div>
      <h1>SearchScreen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="find hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />

            <button type="submit" className="btn mt-2 btn-block btn-primary">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {q === "" && <div className="alert alert-info">Search a hero</div>}

          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">There is not a hero with {q}</div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
