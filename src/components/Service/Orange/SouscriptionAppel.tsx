import React from 'react'
import {View} from 'react-native'
import {Button, Text, Dialog, Portal, RadioButton} from 'react-native-paper'

const SouscriptionAppel: React.FC = () => {
    return (
        <View>
            <Text variant="bodyLarge" style={{marginBottom: 5}}>
                Sélectionnez un pass
            </Text>

            <Button
                mode="outlined"
                icon="arrow-down-drop-circle-outline"
                contentStyle={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                }}
                onPress={toggleMobileOperatorModal}>
                {mobileOperator}
            </Button>

            <Portal>
                <Dialog
                    visible={mobileOperatorModalVisible}
                    onDismiss={toggleMobileOperatorModal}>
                    <Dialog.Title>Opérateur mobile</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={value => {
                                setMobileOperator(value)
                                toggleMobileOperatorModal()
                            }}
                            value={mobileOperator}>
                            <RadioButton.Item
                                label="ORANGE"
                                value="ORANGE"
                            />
                            <RadioButton.Item label="MTN" value="MTN" />
                            <RadioButton.Item label="MOOV" value="MOOV" />
                        </RadioButton.Group>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}

export default SouscriptionAppel
