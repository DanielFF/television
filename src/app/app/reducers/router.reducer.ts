export interface State {
  state: {
    url: string,
    params: object,
    queryParams: object
  }
  navigationId: number
};

export const routerReducerKey = 'router';