import React, {useState} from 'react'
import {
    Appbar,
    Dialog,
    Portal,
    Button,
    Text,
    MD3Colors,
} from 'react-native-paper'
import {getHeaderTitle} from '@react-navigation/elements'
import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useAppDispatch} from '../../services/redux/hooks'
import {setUSSDCode} from '../../services/redux/reducers/USSDCodeReducer'

const NavigationBar = ({
    navigation,
    route,
    options,
    back,
}: NativeStackHeaderProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const title: string = getHeaderTitle(options, route.name)
    const [visible, setVisible] = useState<boolean>(false)

    const toggleModal = () => setVisible(!visible)

    const clearHistory = async (): Promise<void> => {
        try {
            await AsyncStorage.clear()
            dispatch(setUSSDCode([]))
        } catch (e) {}
    }

    return (
        <Appbar.Header>
            {back ? (
                <Appbar.BackAction
                    onPress={navigation.goBack}
                    color={MD3Colors.primary40}
                />
            ) : null}
            <Appbar.Content title={title} />
            {title === 'Historique des codes USSD' && (
                <Appbar.Action
                    icon="trash-can-outline"
                    color={MD3Colors.primary40}
                    onPress={toggleModal}
                />
            )}
            {title === 'Générer un code USSD' && (
                <Appbar.Action
                    icon="history"
                    color={MD3Colors.primary40}
                    onPress={() => navigation.navigate('Home')}
                />
            )}

            <Portal>
                <Dialog visible={visible} onDismiss={toggleModal}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">
                            Etes-vous sûr de vouloir éffacer l'historique des
                            codes USSD ?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={toggleModal}>Annuler</Button>
                        <Button
                            onPress={() => {
                                clearHistory()
                                toggleModal()
                            }}>
                            Oui, tout éffacer
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Appbar.Header>
    )
}

export default NavigationBar
