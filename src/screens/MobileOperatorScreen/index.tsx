import React, {useState} from 'react'
import {styles} from '../styles'
import {SafeAreaView, View, Alert} from 'react-native'
import {Button, Text, Dialog, Portal, RadioButton} from 'react-native-paper'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../../interfaces'
import {MOBILE_OPERATOR_OPTIONS, SERVICE_OPTIONS} from '../../const'
import {useAppDispatch} from '../../services/redux/hooks'
import {setParameter} from '../../services/redux/reducers/parameterReducer'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Service'>

const MobileOperatorScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>()
    const dispatch = useAppDispatch()

    const [mobileOperatorModalVisible, setMobileOperatorModalVisible] =
        useState<boolean>(false)
    const [serviceModalVisible, setServiceModalVisible] =
        useState<boolean>(false)
    const [mobileOperator, setMobileOperator] = useState<string>('')
    const [service, setService] = useState<string>('')

    const toggleMobileOperatorModal = () =>
        setMobileOperatorModalVisible(!mobileOperatorModalVisible)
    const toggleServiceModal = () =>
        setServiceModalVisible(!serviceModalVisible)

    const handleNavigateToServiceScreen = (): void => {
        if (mobileOperator === '') {
            return Alert.alert(
                '',
                'Vous devez sélectionnez un opérateur mobile.',
            )
        }

        if (service === '') {
            return Alert.alert('', 'Vous devez sélectionnez un service.')
        }

        dispatch(
            setParameter({
                amount: '',
                duration: '',
                account: '',
                contactNumber: '',
                contact: false,
                prepaidBill: false,
            }),
        )

        navigation.navigate('Service', {
            mobileOperator: mobileOperator,
            service: service,
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Opérateur mobile
                </Text>

                <Button
                    mode="outlined"
                    icon="arrow-down-drop-circle-outline"
                    style={{backgroundColor: 'white'}}
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                    }}
                    onPress={toggleMobileOperatorModal}>
                    {mobileOperator === ''
                        ? 'Sélectionnez un opérateur mobile'
                        : mobileOperator}
                </Button>

                <Portal>
                    <Dialog
                        visible={mobileOperatorModalVisible}
                        onDismiss={toggleMobileOperatorModal}>
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={(value: string) => {
                                    setMobileOperator(value)
                                    toggleMobileOperatorModal()
                                }}
                                value={mobileOperator}>
                                {MOBILE_OPERATOR_OPTIONS.map(
                                    (value: string, i: number) => {
                                        return (
                                            <RadioButton.Item
                                                key={i}
                                                label={value}
                                                value={value}
                                            />
                                        )
                                    },
                                )}
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>

            <View style={{marginTop: 15, marginBottom: 20}}>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Service
                </Text>

                <Button
                    mode="outlined"
                    icon="arrow-down-drop-circle-outline"
                    style={{backgroundColor: 'white'}}
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                    }}
                    onPress={toggleServiceModal}>
                    {service === '' ? 'Sélectionnez un service' : service}
                </Button>

                <Portal>
                    <Dialog
                        visible={serviceModalVisible}
                        onDismiss={toggleServiceModal}>
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={(value: string) => {
                                    setService(value)
                                    toggleServiceModal()
                                }}
                                value={service}>
                                {SERVICE_OPTIONS.map(
                                    (value: string, i: number) => {
                                        return (
                                            <RadioButton.Item
                                                key={i}
                                                label={value}
                                                value={value}
                                            />
                                        )
                                    },
                                )}
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>

            <Button
                mode="contained"
                icon="arrow-right"
                contentStyle={{flexDirection: 'row-reverse'}}
                uppercase={true}
                onPress={handleNavigateToServiceScreen}>
                Suivant
            </Button>
        </SafeAreaView>
    )
}

export default MobileOperatorScreen
