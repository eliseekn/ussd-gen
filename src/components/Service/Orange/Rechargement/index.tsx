import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Dialog,
    MD3Colors,
    Portal,
    RadioButton,
    Text,
    TextInput,
} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {ParameterType} from '../../../../interfaces'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'

const Rechargement: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<ParameterType>(
        (state: RootState) => state.parameter,
    )

    const [contact, setContact] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)

    const toggleAlert = () => setAlert(!alert)

    const handleSetDisplayContact = (value: boolean) => {
        setContact(value)

        if (!value) {
            dispatch(
                setParameter({...parameter, contact: false, contactNumber: ''}),
            )
        }
    }

    const handleSetAmount = (value: string): void => {
        dispatch(setParameter({...parameter, amount: value}))
    }

    const handleSetContact = (value: string) => {
        dispatch(
            setParameter({...parameter, contact: true, contactNumber: value}),
        )
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
                    Comment ça marche ?
                </Text>

                <Portal>
                    <Dialog visible={alert} onDismiss={toggleAlert}>
                        <Dialog.Content>
                            <Text variant="bodyLarge">
                                Entrez le montant à payer pour acheter du crédit
                                de communication via Mobile Money pour vous ou
                                un contact.
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setAlert(false)}>
                                D'accord, j'ai compris
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
            <View>
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
                    value={parameter.amount as string}
                    onChangeText={(value: string) => handleSetAmount(value)}
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

            <View style={{marginTop: 5}}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <RadioButton.Item
                        label="Pour moi-même"
                        value="first"
                        status={!contact ? 'checked' : 'unchecked'}
                        onPress={() => handleSetDisplayContact(false)}
                        style={{
                            paddingHorizontal: 10,
                            flexDirection: 'row-reverse',
                        }}
                    />
                    <RadioButton.Item
                        label="Pour un contact"
                        value="second"
                        status={contact ? 'checked' : 'unchecked'}
                        onPress={() => handleSetDisplayContact(true)}
                        style={{
                            paddingHorizontal: 10,
                            flexDirection: 'row-reverse',
                        }}
                    />
                </View>

                {contact && (
                    <>
                        <Text variant="bodyLarge" style={{marginBottom: 5}}>
                            Recharger un contact
                        </Text>

                        <TextInput
                            placeholder="Numéro de téléphone"
                            placeholderTextColor={MD3Colors.primary40}
                            mode="outlined"
                            dense={true}
                            outlineStyle={{borderRadius: 30}}
                            style={{
                                backgroundColor: 'white',
                                color: `${MD3Colors.primary40}`,
                            }}
                            value={parameter.contactNumber as string}
                            onChangeText={(value: string) =>
                                handleSetContact(value)
                            }
                            maxLength={10}
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
        </View>
    )
}

export default Rechargement
