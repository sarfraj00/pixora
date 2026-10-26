import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/userSlice.js'
const store = configureStore({
    reducer:userSlice
});

export {store};