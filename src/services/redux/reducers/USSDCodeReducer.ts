import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {USSDCodeType} from '../../../interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {STORAGE_KEY} from '../../../const'

const handleStoreData = async (data: USSDCodeType[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (err) {}
}

export const USSDCode = createSlice({
    name: 'USSDCode',
    initialState: [] as USSDCodeType[],
    reducers: {
        setUSSDCode(
            state: USSDCodeType[],
            action: PayloadAction<USSDCodeType[]>,
        ): USSDCodeType[] {
            return action.payload
        },
        addUSSDCode(
            state: USSDCodeType[],
            action: PayloadAction<USSDCodeType>,
        ): void {
            state.unshift(action.payload)
            handleStoreData(state)
        },
        removeUSSDCode(state: USSDCodeType[], action: PayloadAction<number>) {
            const newState = state.filter(
                (value: USSDCodeType) => value.id !== action.payload,
            )

            handleStoreData(newState)
            return newState
        },
    },
})

export const {setUSSDCode, addUSSDCode, removeUSSDCode} = USSDCode.actions
export default USSDCode.reducer
