import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const recipesQuery = gql`
  {
    recipes {
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
  return (
    <Query query={recipesQuery}>
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
  );
};
