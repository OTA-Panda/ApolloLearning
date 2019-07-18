import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {
  WidgetForm,
} from './components';

import {
  WidgetInsertedSubscription,
  WidgetDeletedSubscription,
} from './subscriptions'

import {
  ToolNameQuery,
  WidgetsQuery,
  WIDGETS_QUERY,
} from './queries'

export const INSERT_WIDGET_MUTATION = gql`
  mutation InsertWidget($widget: InsertWidget) {
    insertWidget(widget: $widget) {
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

export class App extends React.Component {

  render() {
    return <React.Fragment>
      <WidgetInsertedSubscription />
      <WidgetDeletedSubscription />
      <ToolNameQuery />
      <WidgetsQuery refetchQueries={[{ query: WIDGETS_QUERY }]} />
      <Mutation mutation={INSERT_WIDGET_MUTATION}>
        {mutateInsertWidget => {

          const insertWidget = widget => {

            return mutateInsertWidget({
              variables: { widget },
              refetchQueries: () => ([
                { query: WIDGETS_QUERY },
              ]),
            });
          };

          return <WidgetForm buttonText="Add Widget" onSubmitWidget={insertWidget} />;
        }}
      </Mutation>
    </React.Fragment>;
  }
}
