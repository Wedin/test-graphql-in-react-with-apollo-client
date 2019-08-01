import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { recipesQuery } from "../queries";

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

const RecipesList = ({ recipes }) => {
  return (
    <>
      <h3>Recipes:</h3>
      <ul>
        {recipes.map(({ id, title, isStarred }) => (
          <li key={id}>
            {title}
            <Mutation
              mutation={updateRecipeStarredMutation}
              refetchQueries={[
                {
                  query: recipesQuery,
                  variables: { vegetarian: true },
                },
                {
                  query: recipesQuery,
                  variables: { vegetarian: false },
                },
              ]}
              awaitRefetchQueries={true}
            >
              {(updateRecipeStarred, { loading, error }) => {
                return (
                  <button
                    type="button"
                    className="button-reset"
                    onClick={() => {
                      updateRecipeStarred({
                        variables: {
                          id,
                          isStarred: !isStarred,
                        },
                      });
                    }}
                  >
                    <span
                      style={{ filter: isStarred ? "" : "grayscale(1)" }}
                      role="img"
                      aria-label={isStarred ? "starred" : "not starred"}
                    >
                      ⭐️
                    </span>
                    {error && "Failed up update"}
                  </button>
                );
              }}
            </Mutation>
          </li>
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

      <Query query={recipesQuery} variables={{ vegetarian: vegetarianOnly }} pollInterval={3000}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            console.log("error: ", error);
            return <p>Something went wrong</p>;
          }
          return (
            <>
              <RecipesList recipes={data.recipes} />
              <button type="button" onClick={() => refetch()}>
                Refetch Recipes
              </button>
            </>
          );
        }}
      </Query>
    </>
  );
};
