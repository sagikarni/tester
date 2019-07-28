import gql from 'graphql-tag';

export const LOAD_ACTIVITIES = gql`
  {
    activityMany {
      _id
      name
      type
      level
      description
      free
      printable
      editorial
      notes
      orientation
      mediaType
      category
      subCategory
      status
      audience
      isolate
      updated_at
      created_at
      metadata {
        slideCategories
        slides {
          media {
            name
            _id
          }
          phrases
          category
          size
          audio {
            name
            _id
          }
          mediaIndex
          _id
        }
      }
    }
  }
`;

export const UPSERT_ACTIVITY = gql`
  mutation($collections: [JSON!]) {
    activityUpdateOrCreate(collections: $collections) {
      _id
      name
      type
      description
      free
      printable
      editorial
      notes
      level
      orientation
      mediaType
      category
      subCategory
      status
      audience
      isolate
      updated_at
      created_at
      metadata {
        slideCategories
        slides {
          media {
            name
            _id
          }
          phrases
          category
          size
          audio {
            name
            _id
          }
          mediaIndex
          _id
        }
      }
    }
  }
`;

export const REMOVE_ACTIVITY = gql`
  mutation($id: MongoID!) {
    activityRemoveOne(filter: { _id: $id }) {
      recordId
    }
  }
`;

export const FILTER_ACTIVITIES = gql`
  query($filter: FilterFindManyActivityInput!, $perPage: Int!, $page: Int!) {
    activityPagination(filter: $filter, perPage: $perPage, page: $page) {
      items {
        _id
        name
        type
        level
        description
        free
        printable
        editorial
        notes
        orientation
        mediaType
        category
        subCategory
        status
        audience
        isolate
        updated_at
        created_at
        metadata {
          slideCategories
          slides {
            media {
              name
              _id
            }
            phrases
            category
            size
            audio {
              name
              _id
            }
            mediaIndex
            _id
          }
        }
      }
      count
      pageInfo {
        currentPage
        perPage
        itemCount
        pageCount
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;
