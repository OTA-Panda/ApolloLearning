import React from 'react';
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import { WidgetTable } from '../components'

export const EditWidgetMutation = props => {

  return <ApolloConsumer>
    {client => {
      const editWidget = widgetId => {
        client.writeQuery({
          query: gql`query EditWidgetIdQuery { editWidgetId @client }`,
          data: { editWidgetId: widgetId },
        })
      }

      const cancelWidget = () => editWidget(-1)
      return <WidgetTable {...props} onCancelWidget={cancelWidget}/>

    }}
  </ApolloConsumer>

}