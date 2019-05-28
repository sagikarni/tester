import gql from 'graphql-tag';

export const LOAD_DOMAINS = gql`
  {
    activityTypeMany {
      _id
      name
      domain {
        name
        _id
      }
    }

    domainMany {
      _id
      name
    }
  }
`;
