import React from 'react'
import {View} from 'react-native'
import {MD3Colors, Text, TextInput} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {ParameterType} from '../../../../interfaces'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'

const ReabonnementCANAL: React.FC = () => {
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
                    N° abonnement
                </Text>

                <TextInput
                    placeholder="Entrez le numéro d'abonnement"
                    placeholderTextColor={MD3Colors.primary40}
                    mode="outlined"
                    dense={true}
                    outlineStyle={{borderRadius: 30}}
                    style={{
                        backgroundColor: 'white',
                        color: `${MD3Colors.primary40}`,
                    }}
                    value={parameter.account as string}
                    onChangeText={(value: string) => handleSetAccount(value)}
                    maxLength={14}
                    keyboardType="number-pad"
                    right={
                        <TextInput.Icon
                            icon="dialpad"
                            color={MD3Colors.primary40}
                        />
                    }
                />
            </View>
        </View>
    )
}

export default ReabonnementCANAL
