import React from 'react'
import {List} from 'react-native-paper'
import {USSDCodeType} from '../../interfaces'
import {TouchableOpacity, View} from 'react-native'

type Props = {
    data: USSDCodeType
}

const USSDCodeItem: React.FC<Props> = ({data}) => {
    return (
        <View>
            <List.Subheader style={{marginVertical: 0, paddingBottom: 0}}>
                {data.mobileOperator}
            </List.Subheader>
            <List.Item
                style={{borderBottomWidth: 0.5, paddingVertical: 15}}
                title={data.title}
                titleNumberOfLines={2}
                titleStyle={{marginBottom: 5, fontSize: 18}}
                description={data.value}
                left={props => (
                    <List.Icon
                        {...props}
                        icon="cellphone-text"
                        style={{marginHorizontal: 0}}
                    />
                )}
                right={props => {
                    return (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity>
                                <List.Icon
                                    {...props}
                                    icon="content-copy"
                                    style={{marginLeft: 1, marginRight: 0}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <List.Icon
                                    {...props}
                                    icon="pencil-outline"
                                    style={{marginHorizontal: 1}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <List.Icon
                                    {...props}
                                    icon="trash-can-outline"
                                    style={{marginLeft: 1, marginRight: 0}}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default USSDCodeItem
