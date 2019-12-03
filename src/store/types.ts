import { ActionType, StateType } from 'typesafe-actions';

// Import the combination of all reducer types
type RootReducer = typeof import('./root').rootReducer;

// Import all action types
type AuthActions = typeof import('./auth/actions');
type RoutingActions = typeof import('./routing/actions');

/// ----- Global Store Types ----- ///

// Root state tree
export type RootState = StateType<RootReducer>;

// Union of all action objects
export type RootAction = ActionType<AuthActions | RoutingActions>;

// Extend internal types of `typesafe-action` to
// enable type-free syntax with `createReducer`
declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
