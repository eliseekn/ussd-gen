import React from 'react'
import {View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {ParameterType} from '../../../../interfaces'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'

const FactureCIE: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<{}>(
        (state: RootState) => state.parameter,
    )

    const handleSetAccount = (value: string): void => {
        dispatch(setParameter({...parameter, account: value}))
    }

    const handleSetAmount = (value: string) => {
        dispatch(setParameter({...parameter, amount: value}))
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
                    value={parameter.account}
                    onChangeText={handleSetAccount}
                    maxLength={11}
                    keyboardType="number-pad"
                />
            </View>

            <View style={{marginTop: 15}}>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Montant du rechargement
                </Text>

                <TextInput
                    mode="outlined"
                    outlineStyle={{borderRadius: 30, borderWidth: 0.8}}
                    style={{backgroundColor: 'white'}}
                    value={parameter.amount}
                    onChangeText={handleSetAmount}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    )
}

export default FactureCIE
