import gql from 'graphql-tag';

export const LOAD_BOARDS = gql`
  {
    boardMany {
      _id
      name
      user
      items
      updated_at
      created_at
    }
  }
`;

export const BOARD_CREATE_ONE = gql`
  mutation($name: String!) {
    boardCreateOne(name: $name) {
      _id
      name
      user
      updated_at
      created_at
    }
  }
`;

export const BOARD_CREATE_ITEM_ONE = gql`
  mutation($id: String!, $item: String!) {
    boardCreateItemOne(id: $id, item: $item) {
      _id
      name
      user
      items
      updated_at
      created_at
    }
  }
`;

export const BOARD_RENAME_ONE = gql`
  mutation($id: String!, $name: String!) {
    boardRenameOne(id: $id, name: $name) {
      _id
      name
      user
      items
      updated_at
      created_at
    }
  }
`;

export const BOARD_REMOVE_ONE = gql`
  mutation($id: String!) {
    boardRemoveOne(id: $id)
  }
`;

export const BOARD_REMOVE_ITEM_ONE = gql`
  mutation($id: String!, $item: String!) {
    boardRemoveItemOne(id: $id, item: $item) {
      _id
      name
      user
      items
      updated_at
      created_at
    }
  }
`;
