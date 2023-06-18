import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {USSDCodeType} from '../../../interfaces'

export const USSDCode = createSlice({
    name: 'USSDCode',
    initialState: [] as USSDCodeType[],
    reducers: {
        setUSSDCode(
            state: USSDCodeType[],
            action: PayloadAction<USSDCodeType[]>,
        ) {
            return action.payload
        },
        addUSSDCode(
            state: USSDCodeType[],
            action: PayloadAction<USSDCodeType>,
        ) {
            state.push(action.payload)
        },
        removeUSSDCode(state, action: PayloadAction<number>) {
            return state.filter(
                (value: USSDCodeType) => value.id !== action.payload,
            )
        },
    },
})

export const {setUSSDCode, addUSSDCode, removeUSSDCode} = USSDCode.actions
export default USSDCode.reducer
