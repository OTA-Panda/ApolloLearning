import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { DeleteWidgetMutation } from './DeleteWidgetMutation'

export const REPLACE_WIDGET_MUTATION = gql`
  mutation ReplaceWidget($widget: ReplaceWidget) {
    replaceWidget(widget: $widget) {
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
export const ReplaceWidgetMutation = props =>
  <Mutation mutation={REPLACE_WIDGET_MUTATION}>
    {mutateReplaceWidget => {
      const replaceWidget = widget => {
        return mutateReplaceWidget({
          variables: { widget },
          refetchQueries: () => props.refetchQueries,
          update: (store) => {
            //better to refactor, but just for demo
            store.writeQuery({
              query: gql`query EditWidgetIdQuery { editWidgetId @client }`,
              data: { editWidgetId: '-1' },
            })
          }
        });
      };
      //not necessarily best practice, but for example
      return <DeleteWidgetMutation { ...props }
        onSaveWidget={replaceWidget}
      />;
    }}
  </Mutation>;