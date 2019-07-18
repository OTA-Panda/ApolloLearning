import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { DeleteWidgetMutation } from '../mutations'

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

export const WidgetsQuery = () =>
  <Query query={ WIDGETS_QUERY }>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null
      
      return <DeleteWidgetMutation widgets={data.widgets} />
    }}
  </Query>
