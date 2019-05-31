import gql from 'graphql-tag';

export const LOAD_CATEGORIES = gql`
  {
    categoryMany {
      name
      _id
    }

    subCategoryMany {
      name
      _id
      category {
        _id
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation($record: CreateOneCategoryInput!) {
    categoryCreateOne(record: $record) {
      record {
        _id
        name
      }
    }
  }
`;

export const ADD_SUBCATEGORY = gql`
  mutation($record: CreateOneSubCategoryInput!) {
    subCategoryCreateOne(record: $record) {
      record {
        _id
        name
        category {
          name
          _id
        }
      }
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation($id: MongoID!) {
    categoryRemoveOne(filter: { _id: $id }) {
      recordId
    }
  }
`;

export const REMOVE_SUBCATEGORY = gql`
  mutation($id: MongoID!) {
    subCategoryRemoveOne(filter: { _id: $id }) {
      recordId
    }
  }
`;
