import * as React from 'react';

type Action = {type: 'update_inventory', payload: any} | {type: 'clear_inventory', payload?: any} | {type: 'set_inventory', payload: any}
type Dispatch = (action: Action) => void
type State = {inventory: []}
type ProductProviderProps = {children: React.ReactNode}

const ProductStateContext = React.createContext<
  {state: State; productDispatch: Dispatch} | undefined
>(undefined!)

function productReducer(state: State, action: Action) {
  switch (action.type) {
    case 'set_inventory': {
        return {inventory: action.payload}
    }
    case 'update_inventory': {
      return {inventory: [...state.inventory, action.payload]}
    }
    case 'clear_inventory': {
        return {inventory: []}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function ProductProvider({children}: ProductProviderProps) {
    const [state, productDispatch] = React.useReducer(productReducer, {inventory: []})
    const value = {state, productDispatch}

  return (
    <ProductStateContext.Provider value={value}>
      {children}
    </ProductStateContext.Provider>
  )
}

function useProduct() {
  const context = React.useContext(ProductStateContext);
  console.log(context, 'context from products')
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}

export { useProduct, ProductProvider, productReducer, ProductStateContext }