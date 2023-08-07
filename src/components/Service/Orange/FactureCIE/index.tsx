import React from 'react'
import {View} from 'react-native'
import {MD3Colors, RadioButton, Text, TextInput} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {ParameterType} from '../../../../interfaces'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'

const FactureCIE: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<ParameterType>(
        (state: RootState) => state.parameter,
    )

    const handleSetDisplayPrepaid = (value: boolean) => {
        dispatch(setParameter({...parameter, prepaidBill: value, amount: ''}))
    }

    const handleSetAccount = (value: string): void => {
        dispatch(setParameter({...parameter, account: value}))
    }

    const handleSetAmount = (value: string) => {
        dispatch(setParameter({...parameter, prepaidBill: true, amount: value}))
    }

    return (
        <View>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    N° compteur
                </Text>

                <TextInput
                    placeholder="Entrez le numéro du compteur"
                    placeholderTextColor={MD3Colors.primary40}
                    mode="outlined"
                    dense={true}
                    outlineStyle={{borderRadius: 30}}
                    style={{
                        backgroundColor: 'white',
                        color: `${MD3Colors.primary40}`,
                    }}
                    value={parameter.account}
                    onChangeText={handleSetAccount}
                    maxLength={11}
                    keyboardType="number-pad"
                    right={
                        <TextInput.Icon
                            icon="dialpad"
                            color={MD3Colors.primary40}
                        />
                    }
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <RadioButton.Item
                    label="Facture post-payée"
                    value="first"
                    status={!parameter?.prepaidBill ? 'checked' : 'unchecked'}
                    onPress={() => handleSetDisplayPrepaid(false)}
                    style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row-reverse',
                    }}
                />
                <RadioButton.Item
                    label="Facture pré-payée"
                    value="second"
                    status={parameter?.prepaidBill ? 'checked' : 'unchecked'}
                    onPress={() => handleSetDisplayPrepaid(true)}
                    style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row-reverse',
                    }}
                />
            </View>

            {parameter?.prepaidBill && (
                <>
                    <Text variant="bodyLarge" style={{marginBottom: 5}}>
                        Montant
                    </Text>

                    <TextInput
                        placeholder="Entrez le montant à payer"
                        placeholderTextColor={MD3Colors.primary40}
                        mode="outlined"
                        dense={true}
                        outlineStyle={{borderRadius: 30}}
                        style={{
                            backgroundColor: 'white',
                            color: `${MD3Colors.primary40}`,
                        }}
                        value={parameter.amount}
                        onChangeText={handleSetAmount}
                        keyboardType="number-pad"
                        right={
                            <TextInput.Icon
                                icon="dialpad"
                                color={MD3Colors.primary40}
                            />
                        }
                    />
                </>
            )}
        </View>
    )
}

export default FactureCIE
