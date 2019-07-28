import gql from 'graphql-tag';

export const LOAD_PLANS = gql`
  {
    planMany {
      _id
      name
      category
      recommended
      defaultUrl
      level
      licenses {
        value
        min
        max
      }
      price {
        currency
        figure
      }
    }
  }
`;
