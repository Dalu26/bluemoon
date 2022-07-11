import React from 'react';
import { UserProvider } from './UserContext';
import { ProductProvider } from './ProductContext';
import { combineComponents } from '../combineComponents';

const providers = [
    UserProvider,
    ProductProvider,
]

export const AppContextProvider = combineComponents(...providers);