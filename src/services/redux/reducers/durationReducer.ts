import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const durationSlice = createSlice({
    name: 'duration',
    initialState: '',
    reducers: {
        setDuration(state, action: PayloadAction<string>): string {
            return action.payload
        },
    },
})

export const {setDuration} = durationSlice.actions
export default durationSlice.reducer
