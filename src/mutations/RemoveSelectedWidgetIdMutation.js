import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { WidgetTable } from '../components'

export const REMOVE_SELECTED_WIDGET_ID_MUTATION = gql `
  mutation RemoveSelectedWidgetId($widgetId: ID) {
    removeSelectedWidgetId(widgetId: $widgetId) @client
  }
`

export const RemoveSelectedWidgetIdMutation = props =>
  <Mutation mutation={ REMOVE_SELECTED_WIDGET_ID_MUTATION }>
    {mutateRemoveSelectedWidgetId =>
      <WidgetTable {...props}
        onRemoveSelectedWidgetId={ widgetId =>
          mutateRemoveSelectedWidgetId({ variables: { widgetId } })
        }
      />
    }
  </Mutation>