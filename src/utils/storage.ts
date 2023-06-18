import AsyncStorage from '@react-native-async-storage/async-storage'
import {USSDCodeType} from '../interfaces'

const storeData = async (value: string): Promise<void | any> => {
    try {
        const json: string = JSON.stringify(value)
        await AsyncStorage.setItem('USSDGen_Codes', json)
    } catch (e: any) {
        return e
    }
}

const readData = async (): Promise<USSDCodeType[] | []> => {
    try {
        const jsonValue: string | null = await AsyncStorage.getItem(
            'USSDGen_Codes',
        )

        if (jsonValue === null) {
            return []
        }

        return JSON.parse(jsonValue) as USSDCodeType[]
    } catch (e: any) {
        return e
    }
}

export {storeData, readData}
