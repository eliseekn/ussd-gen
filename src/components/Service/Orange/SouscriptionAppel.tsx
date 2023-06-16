import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, Text, Dialog, Portal, RadioButton} from 'react-native-paper'
import PassMix from './PassMix'
import PassKdo from './PassKdo'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../../../interfaces'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Service'>

const SouscriptionAppel: React.FC = () => {
    const navigation = useNavigation<NavigationProp>()
    const [pass, setPass] = useState<string>('MIX')
    const [passVisible, setPassModalVisible] = useState<boolean>(false)

    const togglePassModal = () => setPassModalVisible(!passVisible)

    return (
        <View>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Sélectionnez un PASS
                </Text>

                <Button
                    mode="outlined"
                    icon="arrow-down-drop-circle-outline"
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                    }}
                    onPress={togglePassModal}>
                    {pass}
                </Button>

                <Portal>
                    <Dialog visible={passVisible} onDismiss={togglePassModal}>
                        <Dialog.Title>PASS</Dialog.Title>
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={value => {
                                    setPass(value)
                                    togglePassModal()
                                }}
                                value={pass}>
                                <RadioButton.Item label="MIX" value="MIX" />
                                <RadioButton.Item label="KDO" value="KDO" />
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>

            {pass === 'MIX' && <PassMix />}
            {pass === 'KDO' && <PassKdo />}

            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <Button
                    style={{width: 180}}
                    mode="contained"
                    icon="arrow-left"
                    uppercase={true}
                    onPress={() => navigation.navigate('MobileOperator')}>
                    Précédent
                </Button>

                <Button
                    style={{width: 180}}
                    mode="contained"
                    icon="content-save"
                    uppercase={true}
                    onPress={() => {}}>
                    Générer
                </Button>
            </View>
        </View>
    )
}

export default SouscriptionAppel
