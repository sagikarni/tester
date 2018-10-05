import Vue from 'vue';

export const getActivity = (activity: any) => {
  return (Vue as any).http.get('/api/v1/activity'); //new Promise((res, req) => { res(x); });
};

export const pinActivity = (activity: string, isPinned: boolean) => {
  return new Promise((res, req) => {});
};
