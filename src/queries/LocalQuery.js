import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { DeleteWidgetMutation } from '../mutations/DeleteWidgetMutation'

//this file makes it so we don't reset our applicaition state

//has to match key in clientStateLink
export const LOCAL_QUERY = gql `
  query LocalQuery {
    selectedWidgetIds @client 
  }
`

export const LocalQuery = props =>
  <Query query={ LOCAL_QUERY }>
    { ({loading, data, error}) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null
      
      return <DeleteWidgetMutation {...props} {...data} />
    }
  }
  </Query>