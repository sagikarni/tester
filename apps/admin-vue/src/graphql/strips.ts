import gql from 'graphql-tag';

export const LOAD_STRIPS = gql`
  {
    stripsMany {
      _id
      name
      groups {
        _id
        name
        items
      }
    }
  }
`;

export const UPSERT_STRIP = gql`
  mutation($collections: [JSON!]) {
    stripsUpdateOrCreate(collections: $collections) {
      _id
      name
      groups {
        name
        items
        _id
      }
    }
  }
`;
