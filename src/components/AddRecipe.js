import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { recipesQuery } from "../queries";

const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;

export default () => {
  const [title, setTitle] = useState("");
  const [isVegetarian, setIsVegetarian] = useState("");

  function onSubmit(event, addRecipe) {
    event.preventDefault();

    addRecipe({
      variables: {
        recipe: {
          title: title,
          vegetarian: isVegetarian,
        },
      },
    });

    resetFields();
  }

  function resetFields() {
    setTitle("");
    setIsVegetarian(false);
  }

  return (
    <Mutation
      mutation={addRecipeMutation}
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
      {(addRecipe, { loading, error }) => {
        return (
          <form onSubmit={evt => onSubmit(evt, addRecipe)}>
            <p>
              <label htmlFor="recipe-title">Title:</label>
              <input type="text" id="recipe-title" value={title} onChange={event => setTitle(event.target.value)} />
            </p>

            <div>
              <label>
                Only vegetarian
                <input
                  type="checkbox"
                  checked={isVegetarian}
                  onChange={event => setIsVegetarian(event.target.checked)}
                />
              </label>
            </div>

            <div>
              <button type="submit">Add recipe</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && (
              <p>
                Error
                <span role="img" aria-label="light">
                  🚨
                </span>
              </p>
            )}
            <hr></hr>
          </form>
        );
      }}
    </Mutation>
  );
};
