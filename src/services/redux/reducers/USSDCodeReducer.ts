import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {USSDCodeType} from '../../../interfaces'

export const USSDCode = createSlice({
    name: 'USSDCode',
    initialState: [],
    reducers: {
        addUSSDCode(
            state: USSDCodeType[],
            action: PayloadAction<USSDCodeType>,
        ) {
            state.push(action.payload)
        },
        removeUSSDCode(state, action: PayloadAction<number>) {
            return state.filter(
                (state: USSDCodeType) => state.id !== action.payload,
            )
        },
    },
})

export const {addUSSDCode, removeUSSDCode} = USSDCode.actions
export default USSDCode.reducer
