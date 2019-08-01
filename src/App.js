import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// import { ApolloConsumer } from "react-apollo";
import RecipesList from "./components/RecipesList";
import AddRecipe from "./components/AddRecipe";

const client = new ApolloClient({
  uri: "http://localhost:4000",
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
