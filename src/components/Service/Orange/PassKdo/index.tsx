import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, Dialog, Portal, RadioButton, Text} from 'react-native-paper'

const PassKdo: React.FC = () => {
    const [duration, setDuration] = useState<string>('300 FCFA (Mo)')
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    return (
        <View style={{marginTop: 15}}>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Sélectionnez un montant
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
                        <Dialog.Title>Montant</Dialog.Title>
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={value => {
                                    setDuration(value)
                                    toggleModal()
                                }}
                                value={duration}>
                                <RadioButton.Item
                                    label="300 FCFA (Mo)"
                                    value="300 FCFA (Mo)"
                                />
                                <RadioButton.Item
                                    label="300 FCFA (Min)"
                                    value="300 FCFA (Min)"
                                />
                                <RadioButton.Item
                                    label="600 FCFA"
                                    value="600 FCFA"
                                />
                                <RadioButton.Item
                                    label="1100 FCFA"
                                    value="1100 FCFA"
                                />

                                <RadioButton.Item
                                    label="200 FCFA (Points)"
                                    value="200 FCFA (Points)"
                                />
                                <RadioButton.Item
                                    label="1000 FCFA (Points)"
                                    value="1000 FCFA (Points)"
                                />
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        </View>
    )
}

export default PassKdo
