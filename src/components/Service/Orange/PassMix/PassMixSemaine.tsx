import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, Dialog, Portal, RadioButton, Text} from 'react-native-paper'

const PassMixSemaine: React.FC = () => {
    const [amount, setAmount] = useState<string>('500 FCFA')
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
                                label="500 FCFA"
                                value="500 FCFA"
                            />
                            <RadioButton.Item
                                label="1000 FCFA"
                                value="1000 FCFA"
                            />
                        </RadioButton.Group>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}

export default PassMixSemaine
