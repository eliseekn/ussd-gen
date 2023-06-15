import React, {useState} from 'react'
import {List} from 'react-native-paper'
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
            <List.Subheader style={{marginVertical: 0, paddingBottom: 0}}>
                {data.mobileOperator}
            </List.Subheader>
            <List.Item
                style={{borderBottomWidth: 0.8, paddingVertical: 10}}
                title={data.title}
                titleNumberOfLines={2}
                titleStyle={{fontSize: 18}}
                description={data.value}
                descriptionStyle={{fontSize: 16}}
                left={props => <List.Icon {...props} icon="cellphone-text" />}
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
                                    />
                                </TouchableOpacity>
                            }>
                            <Menu.Item
                                leadingIcon="content-copy"
                                onPress={() => {}}
                                title="Copier"
                            />
                            <Menu.Item
                                leadingIcon="pencil-outline"
                                onPress={() => {}}
                                title="Modifier"
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
