import generateUSSDCode from './GenerateUSSDCode'
import Clipboard from '@react-native-clipboard/clipboard'

const copyToClipboard = (text: string) => Clipboard.setString(text)

export {generateUSSDCode, copyToClipboard}
