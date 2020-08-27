import {gql} from '@apollo/client';
const CHECK_USER = gql`
  query($username: String, $password: String) {
    Users(where: {username: {_eq: $username}, password: {_eq: $password}}) {
      id
      username
      password
    }
  }
`;
const CREATE_USER = gql`
  mutation($username: String, $password: String) {
    insert_Users(objects: {username: $username, password: $password}) {
      returning {
        id
        username
        password
      }
    }
  }
`;
export {CHECK_USER, CREATE_USER};
