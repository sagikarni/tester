import gql from 'graphql-tag';

export const LOAD_ARTICULATIONS = gql`
  {
    articulationMany {
      _id
      name
      display
      title
      description
      notes
      sound
      category
      updated_at
      created_at
      metadata {
        syllable {
          text
          type
          emphasis
          location
          syllable
          isolate
          _id
          media {
            _id
            name
          }
          audio {
            _id
            name
          }
        }
        blend {
          text
          type
          blend
          isolate
          _id
          media {
            _id
            name
          }
          audio {
            _id
            name
          }
        }
      }
    }
  }
`;

export const UPSERT_ARTICULATION = gql`
  mutation($collections: [JSON!]) {
    articulationUpdateOrCreate(collections: $collections) {
      _id
      name
      display
      title
      description
      notes
      category
      sound
      updated_at
      created_at
      metadata {
        syllable {
          text
          type
          emphasis
          location
          syllable
          isolate
          _id
        }
        blend {
          text
          type
          blend
          isolate
          _id
        }
      }
    }
  }
`;
