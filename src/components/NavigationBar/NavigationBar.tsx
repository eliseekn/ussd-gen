import React from 'react'
import {Appbar} from 'react-native-paper'
import {getHeaderTitle} from '@react-navigation/elements'
import {NativeStackHeaderProps} from '@react-navigation/native-stack'

const NavigationBar = ({
    navigation,
    route,
    options,
    back,
}: NativeStackHeaderProps): JSX.Element => {
    const title: string = getHeaderTitle(options, route.name)

    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}

export default NavigationBar
