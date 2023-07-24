import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ParameterType} from '../../../interfaces'

export const parameter = createSlice({
    name: 'parameter',
    initialState: {mobileMoney: false} as ParameterType,
    reducers: {
        setParameter(
            state,
            action: PayloadAction<ParameterType>,
        ): ParameterType {
            return action.payload
        },
    },
})

export const {setParameter} = parameter.actions
export default parameter.reducer
