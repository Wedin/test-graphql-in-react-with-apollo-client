import React from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import "./App.css";
import { ApolloProvider, ApolloConsumer } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000",
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <ApolloConsumer>
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
        </ApolloConsumer>
      </ApolloProvider>
    </div>
  );
}

export default App;
