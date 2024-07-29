// src/services/graphqlService.ts
import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject, DocumentNode } from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index', // 'https://your-graphql-endpoint.com/graphql',
  cache: new InMemoryCache(),
});

interface FetchDataResponse<T> {
  data: T;
}

export const fetchData = async <T>(query: string | DocumentNode, variables: Record<string, any> = {}): Promise<T> => {
  try {
    const response: FetchDataResponse<T> = await client.query({
      query: typeof query === 'string' ? gql`${query}` : query,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`GraphQL query failed: ${error.message}`);
  }
};

interface MutateDataResponse<T> {
  data: T;
}

export const mutateData = async <T>(mutation: string | DocumentNode, variables: Record<string, any> = {}): Promise<T> => {
  try {
    const response: MutateDataResponse<T> = await client.mutate({
      mutation: typeof mutation === 'string' ? gql`${mutation}` : mutation,
      variables,
    });
    return response.data;
  } catch (error) {
    throw new Error(`GraphQL mutation failed: ${error.message}`);
  }
};
