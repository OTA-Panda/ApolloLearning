import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { DeleteSelectedWidgetsMutation } from './DeleteSelectedWidgetsMutation'

export const DELETE_WIDGET_MUTATION = gql`
  mutation DeleteWidget($widgetId: ID) {
    deleteWidget(widgetId: $widgetId) {
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

// currently hardcoded into the table
export const DeleteWidgetMutation = props =>
  <Mutation mutation={DELETE_WIDGET_MUTATION}>
    {mutateDeleteWidget => {
      const deleteWidget = widgetId => {
        return mutateDeleteWidget({
          variables: { widgetId },
          refetchQueries: () => props.refetchQueries,
        });
      };
      //not necessarily best practice, but for example
      return <React.Fragment>
        {/* <WidgetTable widgets={data.widgets} onDeleteWidget={deleteWidget} />; */}
        <DeleteSelectedWidgetsMutation { ...props }
          onDeleteWidget={deleteWidget}
        />;
      </React.Fragment>
    }}
  </Mutation>;