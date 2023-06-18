import React, {useState} from 'react'
import {List, MD3Colors} from 'react-native-paper'
import {USSDCodeType} from '../../interfaces'
import {TouchableOpacity, View} from 'react-native'
import {Menu} from 'react-native-paper'

type Props = {
    data: USSDCodeType
}

const USSDCodeItem: React.FC<Props> = ({data}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const toggleMenu = () => setVisible(!visible)

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
                style={{borderBottomWidth: 0.5, paddingVertical: 5}}
                title={data.service + ' - ' + data.description}
                titleNumberOfLines={2}
                left={props => (
                    <List.Icon
                        {...props}
                        icon="cellphone-text"
                        style={{margin: 0}}
                    />
                )}
                right={props => {
                    return (
                        <Menu
                            visible={visible}
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
                                onPress={() => {}}
                                title="Copier"
                            />
                            <Menu.Item
                                leadingIcon="trash-can-outline"
                                onPress={() => {}}
                                title="Supprimer"
                            />
                        </Menu>
                    )
                }}
            />
        </View>
    )
}

export default USSDCodeItem
