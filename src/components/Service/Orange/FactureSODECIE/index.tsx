import React from 'react'
import {View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'
import {ParameterType} from '../../../../interfaces'

const FactureSODECIE: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<ParameterType>(
        (state: RootState) => state.parameter,
    )

    const handleSetAccount = (value: string): void => {
        dispatch(setParameter({...parameter, account: value}))
    }

    return (
        <View>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Numéro de compteur
                </Text>

                <TextInput
                    mode="outlined"
                    outlineStyle={{borderRadius: 30, borderWidth: 0.8}}
                    style={{backgroundColor: 'white'}}
                    value={parameter.account as string}
                    onChangeText={(value: string) => handleSetAccount(value)}
                    maxLength={9}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    )
}

export default FactureSODECIE
