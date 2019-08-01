import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;

const RecipesList = ({ recipes }) => {
  return (
    <>
      <h3>Recipes:</h3>
      <ul>
        {recipes.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
};

export default () => {
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  return (
    <>
      <label>
        Only vegetarian
        <input type="checkbox" checked={vegetarianOnly} onChange={event => setVegetarianOnly(event.target.checked)} />
      </label>

      <Query query={recipesQuery} variables={{ vegetarian: vegetarianOnly }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Something went wrong</p>;
          }
          return <RecipesList recipes={data.recipes} />;
        }}
      </Query>
    </>
  );
};
