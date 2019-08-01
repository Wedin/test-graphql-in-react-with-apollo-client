import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// import { ApolloConsumer } from "react-apollo";
import RecipesList from "./components/RecipesList";
import AddRecipe from "./components/AddRecipe";

const starredRecipesStorage = {
  STORAGE_KEY: "starredRecipes",
  getAll: () => {
    const rawItems = localStorage.getItem(starredRecipesStorage.STORAGE_KEY) || [];
    return JSON.parse(rawItems);
  },
  set: starredRecipes => {
    localStorage.setItem(starredRecipesStorage.STORAGE_KEY, JSON.stringify(starredRecipes));
  },
};

const resolvers = {
  Recipe: {
    isStarred: parent => {
      const starredRecipes = starredRecipesStorage.getAll();
      return starredRecipes.includes(parent.id);
    },
  },
  Mutation: {
    updateRecipeStarred: (_, variables) => {
      const starredRecipes = starredRecipesStorage.getAll();
      if (variables.isStarred) {
        starredRecipes.push(variables.id);
        starredRecipesStorage.set(starredRecipes);
      } else {
        const filteredRecipes = starredRecipes.filter(recipeId => recipeId !== variables.id);
        starredRecipesStorage.set(filteredRecipes);
      }

      return {
        __typename: "Recipe",
        isStarred: variables.isStarred,
      };
    },
  },
};

const client = new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    resolvers: resolvers,
  },
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        {/* <ApolloConsumer>
          {client => {
            client
              .query({
                query: gql`
                  {
                    recipes {
                      id
                      title
                    }
                  }
                `,
              })
              .then(res => console.log(res));
            return null;
          }}
        </ApolloConsumer> */}
        <AddRecipe />
        <RecipesList />
      </ApolloProvider>
    </div>
  );
}

export default App;
