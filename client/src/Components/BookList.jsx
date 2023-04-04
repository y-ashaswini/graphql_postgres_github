import { gql, useQuery } from "@apollo/client";

const GET_BOOKS_QUERY = gql`
    query BooksAll {
      booksall {
      id
      name
      genre
    }
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("DATA: ",data);

  return data.booksall.map(({ id, name, genre})=> (
    <ul>
      <li>{id}</li>
      <li>{name}</li>
      <li>{genre}</li>
    </ul>
  ))
}

// export default graphql(getBooksQuery)(BookList);