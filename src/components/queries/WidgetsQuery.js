import gql from 'graphql-tag'

export const WIDGETS_QUERY = gql`
  query WidgetsQuery {
    widgets {
      id
      name
      description
      color
      size
      price
      quantity
    }
  }
`;
