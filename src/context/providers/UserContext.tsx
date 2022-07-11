import React, { createContext, useReducer, useContext, memo, ReactNode } from 'react';

type Action = {type: 'update_user', payload: any} | {type: 'clear_user', payload?: any}
type Dispatch = (action: Action) => void
type State = {user: {}}
type UserProviderProps = {children: ReactNode}

const UserStateContext = createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined)

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case 'update_user': {
      return {user: action.payload}
    }
    case 'clear_user': {
        return {user: {}}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({children}: UserProviderProps) {
    const [state, dispatch] = useReducer(userReducer, {user: {}})
    const value = {state, dispatch}

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  )
}

function useUser() {
  const context = useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { useUser, UserProvider }