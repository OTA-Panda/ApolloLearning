import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import { split, ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'
import './index.css';

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const cache = new InMemoryCache();

//function to manage widget Ids based on passed in function
const updateSelectedWidgetIds = selectedWidgetIdsFn =>
  (_, { widgetId }, { cache }) => {

    // since we're working with the client directly, we do no need to add @client
    const SELECTED_WIDGET_IDS_QUERY = gql `
      query SelectedWidgetIdsQuery {
        selectedWidgetIds
      }
    `
    const data = cache.readQuery ({ query: SELECTED_WIDGET_IDS_QUERY })
    const newData = {
      ...data,
      // this function doesn't know whether it's adding or removing, it's jus grabbing
      selectedWidgetIds: selectedWidgetIdsFn(data.selectedWidgetIds, widgetId),
    }
    // will actually write our value to our cache
    cache.writeQuery({ query: SELECTED_WIDGET_IDS_QUERY, data: newData })
  }

const clienStateLink = withClientState({
  cache,
  defaults: {
    toolName: 'Widget Tool',
    editWidgetId: '-1',
    selectedWidgetIds: [],
  },
  resolvers: {
    Mutation: {
      addSelectedWidgetId: updateSelectedWidgetIds(
        (widgetIds, widgetId) => widgetIds.concat(widgetId)
      ),
      removeSelectedWidgetId: updateSelectedWidgetIds(
        (widgetIds, widgetId) => widgetIds.filter(wId => wId !== widgetId)
      ),
    }
  },
})

const httpLink = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});

const webSocketLink = new WebSocketLink({
  uri: `ws://localhost:${GRAPHQL_PORT}/graphql`,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  ApolloLink.from([ clienStateLink, httpLink ])
);

const client = new ApolloClient({
  link, cache, connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
