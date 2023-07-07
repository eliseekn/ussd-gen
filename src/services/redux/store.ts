import {configureStore} from '@reduxjs/toolkit'
import USSDCodeReducer from './reducers/USSDCodeReducer'
import USSDCodeIdReducer from './reducers/USSDCodeIdReducer'
import parameterReducer from './reducers/parameterReducer'

export const store = configureStore({
    reducer: {
        USSDCode: USSDCodeReducer,
        USSDCodeId: USSDCodeIdReducer,
        parameter: parameterReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
