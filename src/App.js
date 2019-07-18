import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {
  WidgetForm,
} from './components';

import {
  // SubscriptionInfoNotification,
  WidgetInsertedSubscription,
  WidgetDeletedSubscription,
} from './subscriptions'

import {
  ToolNameQuery,
  WidgetsQuery,
  // TOOL_NAME_QUERY,
  WIDGETS_QUERY,
} from './queries'

// const APP_QUERY = gql`
//   query App {
//     widgets {
//       id
//       name
//       description
//       color
//       size
//       price
//       quantity
//     }
//   }
// `;

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

// MOVE to ../mutations
// const DELETE_WIDGET_MUTATION = gql`
//   mutation DeleteWidget($widgetId: ID) {
//     deleteWidget(widgetId: $widgetId) {
//       id
//       name
//       description
//       color
//       size
//       price
//       quantity
//     }
//   }
// `;

export class App extends React.Component {

  render() {
    return <React.Fragment>
      <WidgetInsertedSubscription />
      <WidgetDeletedSubscription />
      <ToolNameQuery />
      {/* <Query query={APP_QUERY}>
        {({ loading, error, data }) => {

          if (loading) return 'Loading...';
          if (error) return 'Error...';

          return <Mutation mutation={DELETE_WIDGET_MUTATION}>
            {mutateDeleteWidget => {

              const deleteWidget = widgetId => {
                return mutateDeleteWidget({
                  variables: { widgetId },
                  refetchQueries: () => ([
                    { query: APP_QUERY },
                  ]),
                });
              };
              //not necessarily best practice, but for example
              return <React.Fragment>
                <WidgetTable widgets={data.widgets} onDeleteWidget={deleteWidget} />;
              </React.Fragment>
            }}
          </Mutation>;
        }}
      </Query> */}
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
