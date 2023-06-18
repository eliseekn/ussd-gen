import generateUSSDCode from './GenerateUSSDCode'
import Clipboard from '@react-native-clipboard/clipboard'
import {storeData, readData} from './storage'

const copyToClipboard = (text: string) => Clipboard.setString(text)

export {generateUSSDCode, copyToClipboard, storeData, readData}
