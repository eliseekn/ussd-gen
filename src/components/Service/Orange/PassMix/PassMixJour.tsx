import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, Dialog, Portal, RadioButton, Text} from 'react-native-paper'

const PassMixJour: React.FC = () => {
    const [amount, setAmount] = useState<string>('150 FCFA')
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    return (
        <View style={{marginTop: 15}}>
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
                {amount}
            </Button>

            <Portal>
                <Dialog visible={modalVisible} onDismiss={toggleModal}>
                    <Dialog.Title>Montant</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={value => {
                                setAmount(value)
                                toggleModal()
                            }}
                            value={amount}>
                            <RadioButton.Item
                                label="150 FCFA"
                                value="150 FCFA"
                            />
                            <RadioButton.Item
                                label="200 FCFA"
                                value="200 FCFA"
                            />
                            <RadioButton.Item
                                label="300 FCFA"
                                value="300 FCFA"
                            />
                        </RadioButton.Group>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}

export default PassMixJour
