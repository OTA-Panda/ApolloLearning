import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { AddSelectedWidgetIdMutation } from './AddSelectedWidgetIdMutation'

//server side
export const DELETE_SELECTED_WIDGETS_MUTATION = gql `
  mutation DeleteSelectedWidgetsMutation($widgetIds: [ID]) {
    deleteWidgets(widgetIds: $widgetIds) {
      id
    }
  }
`

export const DeleteSelectedWidgetsMutation = props =>
  <Mutation mutation={DELETE_SELECTED_WIDGETS_MUTATION}>
    {mutateDeleteWidgets =>
      <AddSelectedWidgetIdMutation {...props}
        onDeleteSelectedWidgets={ widgetIds => 
          mutateDeleteWidgets({
            variables: { widgetIds },
            refetchQueries: props.refetchQueries,
          })
        }
      />
    }
  </Mutation>