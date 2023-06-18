import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const USSCodeIdSlice = createSlice({
    name: 'USSDCodeId',
    initialState: 0,
    reducers: {
        incrementUSSDCodeId(state: number): number {
            return state + 1
        },
        setUSSCodeId(state: number, action: PayloadAction<number>): number {
            return action.payload
        },
    },
})

export const {incrementUSSDCodeId, setUSSCodeId} = USSCodeIdSlice.actions
export default USSCodeIdSlice.reducer
