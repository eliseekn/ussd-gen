import {configureStore} from '@reduxjs/toolkit'
import durationReducer from './reducers/durationReducer'
import amountReducer from './reducers/amountReducer'
import USSDCodeReducer from './reducers/USSDCodeReducer'
import USSDCodeIdReducer from './reducers/USSDCodeIdReducer'

export const store = configureStore({
    reducer: {
        duration: durationReducer,
        amount: amountReducer,
        USSDCode: USSDCodeReducer,
        USSDCodeId: USSDCodeIdReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
