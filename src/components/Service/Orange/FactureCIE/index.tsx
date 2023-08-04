import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Dialog,
    MD3Colors,
    Portal,
    Text,
    TextInput,
} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {ParameterType} from '../../../../interfaces'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'

const FactureCIE: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<ParameterType>(
        (state: RootState) => state.parameter,
    )

    const [alert, setAlert] = useState<boolean>(false)
    const toggleAlert = () => setAlert(!alert)

    const handleSetAccount = (value: string): void => {
        dispatch(setParameter({...parameter, account: value}))
    }

    const handleSetAmount = (value: string) => {
        dispatch(setParameter({...parameter, amount: value}))
    }

    return (
        <View>
            <View>
                <Text
                    style={{
                        textAlign: 'right',
                        textDecorationLine: 'underline',
                        color: MD3Colors.primary40,
                    }}
                    onPress={toggleAlert}>
                    Comment ça marche?
                </Text>

                <Portal>
                    <Dialog visible={alert} onDismiss={toggleAlert}>
                        <Dialog.Content>
                            <Text variant="bodyLarge">
                                Inscrivez le montant du rechargement dans le cas
                                d'une facture prépayée. Dans le cas contraire,
                                laissez le champ vide.
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setAlert(false)}>
                                OK, j'ai compris
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>

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

            <View style={{marginTop: 15}}>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Montant (service prépayé)
                </Text>

                <TextInput
                    placeholder="Entrez le montant à payer"
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
            </View>
        </View>
    )
}

export default FactureCIE
