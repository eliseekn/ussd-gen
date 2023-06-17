import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Dialog,
    Divider,
    Portal,
    RadioButton,
    Text,
} from 'react-native-paper'
import PassMixJour from './PassMixJour'
import PassMixSemaine from './PassMixSemaine'
import PassMixMois from './PassMixMois'
import {useAppDispatch} from '../../../../services/redux/hooks'
import {setDuration} from '../../../../services/redux/reducers/durationReducer'

const PassMix: React.FC = () => {
    const dispatch = useAppDispatch()

    const [duration, setTmpDuration] = useState<string>('')
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleSetDuration = (value: string) => {
        setTmpDuration(value)
        dispatch(setDuration(value))
    }

    return (
        <View style={{marginTop: 15}}>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Sélectionnez une durée
                </Text>

                <Button
                    mode="outlined"
                    icon="arrow-down-drop-circle-outline"
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                    }}
                    onPress={toggleModal}>
                    {duration}
                </Button>

                <Portal>
                    <Dialog visible={modalVisible} onDismiss={toggleModal}>
                        <Dialog.Title>Durée</Dialog.Title>
                        <Divider />
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={value => {
                                    handleSetDuration(value)
                                    toggleModal()
                                }}
                                value={duration}>
                                <RadioButton.Item label="JOUR" value="JOUR" />
                                <RadioButton.Item
                                    label="SEMAINE"
                                    value="SEMAINE"
                                />
                                <RadioButton.Item label="MOIS" value="MOIS" />
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>

            {duration === 'JOUR' && <PassMixJour />}
            {duration === 'SEMAINE' && <PassMixSemaine />}
            {duration === 'MOIS' && <PassMixMois />}
        </View>
    )
}

export default PassMix
