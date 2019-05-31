import axios from 'axios';
import { print } from 'graphql';

export const gqlHttp = async (query, variables = null) => {
  const data = { query: print(query) } as any;

  if (variables) {
    data.variables = variables;
  }

  const response = await axios({
    url: '/graphql',
    method: 'post',
    data,
  });

  return response.data.data;
};
