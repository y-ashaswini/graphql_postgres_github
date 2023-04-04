import { useState } from "react";
import AuthorList from "./Components/AuthorList";
import BookList from "./Components/BookList";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';


const client = new ApolloClient({
  uri : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

export default function App() {
  return (
  <ApolloProvider client = {client}>
    <div id="main">
      <h1>Welcome to The Library.</h1>
      <div className="window">
        <AuthorList/>
      </div>
      <div className="window">
        <BookList/>
      </div>
    </div>
  </ApolloProvider>
  );
}
