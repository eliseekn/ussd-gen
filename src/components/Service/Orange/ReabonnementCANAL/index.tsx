import React from 'react'
import {View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {ParameterType} from '../../../../interfaces'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'

const ReabonnementCANAL: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<{}>(
        (state: RootState) => state.parameter,
    )

    const handleSetAccount = (value: string): void => {
        dispatch(setParameter({...parameter, account: value}))
    }

    return (
        <View>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Numéro de carte
                </Text>

                <TextInput
                    mode="outlined"
                    outlineStyle={{borderRadius: 30, borderWidth: 0.8}}
                    style={{backgroundColor: 'white'}}
                    value={parameter.account as string}
                    onChangeText={(value: string) => handleSetAccount(value)}
                    maxLength={14}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    )
}

export default ReabonnementCANAL
