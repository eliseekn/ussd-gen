import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Text,
    Dialog,
    Portal,
    RadioButton,
    TextInput,
    MD3Colors,
} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import PassJour from './PassJour'
import PassSemaine from './PassSemaine'
import PassMois from './PassMois'
import {DURATION_OPTIONS} from '../../../../const'
import {ParameterType} from '../../../../interfaces'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'

const SouscriptionAppel: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<ParameterType>(
        (state: RootState) => state.parameter,
    )

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleSetDisplayContact = (value: boolean) => {
        dispatch(
            setParameter({...parameter, contact: value, contactNumber: ''}),
        )
    }

    const handleSetDuration = (value: string) => {
        dispatch(setParameter({...parameter, duration: value}))
    }

    const handleSetContact = (value: string) => {
        dispatch(
            setParameter({...parameter, contact: true, contactNumber: value}),
        )
    }

    return (
        <View>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Durée
                </Text>

                <Button
                    mode="outlined"
                    icon="arrow-down-drop-circle-outline"
                    style={{backgroundColor: 'white'}}
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                    }}
                    onPress={toggleModal}>
                    {parameter.duration === ''
                        ? 'Sélectionnez une durée'
                        : parameter.duration}
                </Button>

                <Portal>
                    <Dialog visible={modalVisible} onDismiss={toggleModal}>
                        <Dialog.Content>
                            <RadioButton.Group
                                onValueChange={(value: string) => {
                                    handleSetDuration(value)
                                    toggleModal()
                                }}
                                value={parameter.duration as string}>
                                {DURATION_OPTIONS.map(
                                    (value: string, i: number) => {
                                        return (
                                            <RadioButton.Item
                                                key={i}
                                                label={value}
                                                value={value}
                                            />
                                        )
                                    },
                                )}
                            </RadioButton.Group>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>

            {parameter.duration === 'JOUR' && <PassJour />}
            {parameter.duration === 'SEMAINE' && <PassSemaine />}
            {parameter.duration === 'MOIS' && <PassMois />}

            {parameter.duration && (
                <View style={{marginTop: 5}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <RadioButton.Item
                            label="Pour moi-même"
                            value="first"
                            status={
                                !parameter?.contact ? 'checked' : 'unchecked'
                            }
                            onPress={() => handleSetDisplayContact(false)}
                            style={{
                                paddingHorizontal: 10,
                                flexDirection: 'row-reverse',
                            }}
                        />
                        <RadioButton.Item
                            label="Pour un contact"
                            value="second"
                            status={
                                parameter?.contact ? 'checked' : 'unchecked'
                            }
                            onPress={() => handleSetDisplayContact(true)}
                            style={{
                                paddingHorizontal: 10,
                                flexDirection: 'row-reverse',
                            }}
                        />
                    </View>

                    {parameter?.contact && (
                        <>
                            <Text variant="bodyLarge" style={{marginBottom: 5}}>
                                Souscrire pour un contact
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
            )}
        </View>
    )
}

export default SouscriptionAppel
