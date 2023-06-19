import React, {useState} from 'react'
import {Button, Dialog, List, MD3Colors, Portal, Text} from 'react-native-paper'
import {USSDCodeType} from '../../interfaces'
import {TouchableOpacity, View} from 'react-native'
import {Menu} from 'react-native-paper'
import {copyToClipboard} from '../../utils'
import {useAppDispatch} from '../../services/redux/hooks'
import {removeUSSDCode} from '../../services/redux/reducers/USSDCodeReducer'

type Props = {
    data: USSDCodeType
}

const USSDCodeItem: React.FC<Props> = ({data}) => {
    const dispatch = useAppDispatch()

    const [alert, setAlert] = useState<boolean>(false)
    const [menuVisible, setMenuVisible] = useState<boolean>(false)

    const toggleMenu = () => setMenuVisible(!menuVisible)
    const toggleAlert = () => setAlert(!alert)

    const handleCopyToClipboard = (): void => copyToClipboard(data.value)

    const handleDeleteUSSDCode = (id: number): void => {
        dispatch(removeUSSDCode(id))
    }

    return (
        <View>
            <List.Subheader
                style={{
                    marginVertical: 0,
                    paddingBottom: 0,
                    color: `${MD3Colors.primary40}`,
                }}>
                {data.mobileOperator}
            </List.Subheader>
            <List.Item
                style={{
                    borderBottomWidth: 0.5,
                    paddingVertical: 5,
                    borderBottomColor: `${MD3Colors.primary40}`,
                }}
                title={data.service + '\n' + data.description}
                titleNumberOfLines={2}
                left={props => (
                    <List.Icon {...props} icon="dialpad" style={{margin: 0}} />
                )}
                right={props => {
                    return (
                        <Menu
                            visible={menuVisible}
                            onDismiss={toggleMenu}
                            anchor={
                                <TouchableOpacity onPress={toggleMenu}>
                                    <List.Icon
                                        {...props}
                                        icon="dots-vertical"
                                        color={MD3Colors.primary40}
                                    />
                                </TouchableOpacity>
                            }>
                            <Menu.Item
                                leadingIcon="content-copy"
                                onPress={() => {
                                    handleCopyToClipboard()
                                    toggleMenu()
                                }}
                                title="Copier"
                            />
                            <Menu.Item
                                leadingIcon="trash-can-outline"
                                onPress={() => {
                                    toggleAlert()
                                    toggleMenu()
                                }}
                                title="Supprimer"
                            />
                        </Menu>
                    )
                }}
            />

            <Portal>
                <Dialog visible={alert} onDismiss={toggleAlert}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">
                            Etes-vous sûr de vouloir supprimer ce code USSD ?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={toggleAlert}>Annuler</Button>
                        <Button
                            onPress={() => {
                                toggleAlert()
                                handleDeleteUSSDCode(data.id)
                            }}>
                            Oui, supprimer
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default USSDCodeItem
