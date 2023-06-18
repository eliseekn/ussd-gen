import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const amountSlice = createSlice({
    name: 'amount',
    initialState: '',
    reducers: {
        setAmount(state, action: PayloadAction<string>): string {
            return action.payload
        },
    },
})

export const {setAmount} = amountSlice.actions
export default amountSlice.reducer
