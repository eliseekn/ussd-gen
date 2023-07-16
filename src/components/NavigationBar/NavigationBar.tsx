import React, {useState} from 'react'
import {
    Appbar,
    Dialog,
    Portal,
    Button,
    Text,
    MD3Colors,
    Menu,
} from 'react-native-paper'
import {getHeaderTitle} from '@react-navigation/elements'
import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useAppDispatch} from '../../services/redux/hooks'
import {setUSSDCode} from '../../services/redux/reducers/USSDCodeReducer'
import {STORAGE_KEY} from '../../const'
import {Platform, Linking} from 'react-native'

const NavigationBar = ({
    navigation,
    route,
    options,
    back,
}: NativeStackHeaderProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const title: string = getHeaderTitle(options, route.name)
    const [visible, setVisible] = useState<boolean>(false)
    const [menuVisible, setMenuVisible] = useState<boolean>(false)
    const [aboutModalVisible, setAboutModalVisible] = useState<boolean>(false)

    const toggleMenu = () => setMenuVisible(!menuVisible)
    const toggleModal = () => setVisible(!visible)
    const toggleAboutModal = () => setAboutModalVisible(!visible)

    const clearHistory = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY)
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
            {title === 'Historique' && (
                <Menu
                    visible={menuVisible}
                    onDismiss={toggleMenu}
                    anchor={
                        <Appbar.Action
                            icon={
                                Platform.OS === 'ios'
                                    ? 'dots-horizontal'
                                    : 'dots-vertical'
                            }
                            color={MD3Colors.primary40}
                            onPress={toggleMenu}
                        />
                    }>
                    <Menu.Item
                        leadingIcon="trash-can-outline"
                        onPress={(): void => {
                            toggleModal()
                        }}
                        title="Effacer l'historique"
                    />
                    <Menu.Item
                        leadingIcon="information-outline"
                        onPress={(): void => {
                            toggleAboutModal()
                            toggleMenu()
                        }}
                        title="A propos"
                    />
                </Menu>
            )}
            {title !== 'Nouveau' && title !== 'Historique' && (
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
                            Etes-vous sûr de vouloir éffacer l'historique ?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={toggleModal}>Annuler</Button>
                        <Button
                            onPress={() => {
                                clearHistory()
                                toggleModal()
                            }}>
                            Oui
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog
                    visible={aboutModalVisible}
                    onDismiss={toggleAboutModal}>
                    <Dialog.Title>USSDGen v0.1</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyLarge">
                            Générateur de codes USSD des opérateurs de
                            téléphonie mobile de Côte d'Ivoire.
                        </Text>
                        <Text variant="bodyMedium" style={{marginTop: 15}}>
                            Développé par eliseekn@gmail.com
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setAboutModalVisible(false)}>
                            OK
                        </Button>
                        <Button
                            onPress={() =>
                                Linking.openURL(
                                    'https://github.com/eliseekn/ussd-gen',
                                )
                            }>
                            Github
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Appbar.Header>
    )
}

export default NavigationBar
