export enum CountActionType {
  INCREMENT = 'increment',
  DECREMENT = 'decrement'
}

interface CountAction {
  type: CountActionType;
  payload: number;
}

interface CountState {
  count: number
}

export function reducer(state: CountState, action: CountAction): CountState {
  switch (action.type) {
    case CountActionType.INCREMENT:
      return { count: state.count + action.payload };
    case CountActionType.DECREMENT:
      return { count: state.count - action.payload };
    default:
      return { ...state };
  }
}
