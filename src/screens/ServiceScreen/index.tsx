import React, {useState} from 'react'
import {styles} from '../styles'
import {SafeAreaView, View} from 'react-native'
import {Button, Text, Dialog, Portal, RadioButton} from 'react-native-paper'

const ServiceScreen: React.FC = () => {
    const [mobileOperatorModalVisible, setMobileOperatorModalVisible] =
        useState<boolean>(false)
    const [serviceModalVisible, setServiceModalVisible] =
        useState<boolean>(false)
    const [mobileOperator, setMobileOperator] = useState<string>('ORANGE')
    const [service, setService] = useState<string>('SOUSCRIPTION APPEL')

    const toggleMobileOperatorModal = () =>
        setMobileOperatorModalVisible(!mobileOperatorModalVisible)
    const toggleServiceModal = () =>
        setServiceModalVisible(!serviceModalVisible)

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Sélectionnez un opérateur mobile
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

            <View style={{marginTop: 15, marginBottom: 20}}>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Sélectionnez un service
                </Text>

                <Button
                    mode="outlined"
                    icon="arrow-down-drop-circle-outline"
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                    }}
                    onPress={toggleServiceModal}>
                    {service}
                </Button>

                <Portal>
                    <Dialog
                        visible={serviceModalVisible}
                        onDismiss={toggleServiceModal}>
                        <Dialog.Title>Service</Dialog.Title>
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={value => {
                                    setService(value)
                                    toggleServiceModal()
                                }}
                                value={service}>
                                <RadioButton.Item
                                    label="SOUSCRIPTION APPEL"
                                    value="SOUSCRIPTION APPEL"
                                />
                                <RadioButton.Item
                                    label="SOUSCRIPTION INTERNET"
                                    value="SOUSCRIPTION INTERNET"
                                />
                                <RadioButton.Item
                                    label="FACTURE CIE"
                                    value="FACTURE CIE"
                                />
                                <RadioButton.Item
                                    label="FACTURE SODECIE"
                                    value="FACTURE SODECIE"
                                />
                                <RadioButton.Item
                                    label="REABONNEMENT CANAL+"
                                    value="REABONNEMENT CANAL+"
                                />
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>

            <Button
                mode="contained"
                icon="arrow-right"
                contentStyle={{
                    flexDirection: 'row-reverse',
                }}
                uppercase={true}>
                Suivant
            </Button>
        </SafeAreaView>
    )
}

export default ServiceScreen
