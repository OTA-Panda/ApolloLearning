import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { RemoveSelectedWidgetIdMutation } from './RemoveSelectedWidgetIdMutation'

export const ADD_SELECTED_WIDGET_ID_MUTATION = gql `
  mutation AddSelectedWidgetId($widget: ID) {
    addSelectedWidgetId(widgetId: $widgetId) @client
  }
`

export const AddSelectedWidgetIdMutation = props =>
  <Mutation mutation={ ADD_SELECTED_WIDGET_ID_MUTATION }>
    {mutateAddSelectedWidgetId =>
      <RemoveSelectedWidgetIdMutation {...props}
        onAddSelectedWidgetId={ widgetId =>
          mutateAddSelectedWidgetId({ variables: widgetId })
        }
      />
    }
  </Mutation>