import gql from 'graphql-tag';

export const LOAD_BOARDS = gql`
  {
    boardMany {
      _id
      name
    }
  }
`;
