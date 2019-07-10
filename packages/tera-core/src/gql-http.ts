import axios from 'axios';
import { print } from 'graphql';
import { get } from 'lodash';

export const gqlHttp = async (
  query,
  variables = null,
  payload?: { headers }
) => {
  const data = { query: print(query) } as any;

  if (variables) {
    data.variables = variables;
  }

  let options = {};

  if (payload && payload.headers) {
    options = { ...options, headers: payload.headers };
  }

  const response = await axios({
    url: '/graphql',
    method: 'post',
    data,
    ...options,
  });

  const d = response.data;
  const err = get(d, 'errors[0]');
  if (err) throw err;

  return response.data.data;
};
