import generateUSSDCode from './GenerateUSSDCode'
import {Linking} from 'react-native'

const copyCodeToPhone = async (code: string): Promise<void> =>
    await Linking.openURL(`tel:${encodeURIComponent(code)}`)

export {generateUSSDCode, copyCodeToPhone}
