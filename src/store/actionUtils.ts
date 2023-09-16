export const createAction = (type: string, payload?: any) => ({ type, payload });
export const createSetAction = (setActionType: string) => (payload: any) => createAction(setActionType, payload);
export const createResetAction = (resetActionType: string) => () => createAction(resetActionType);
