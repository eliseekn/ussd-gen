import React, {useState} from 'react'
import {View} from 'react-native'
import {
    Button,
    Text,
    Dialog,
    Portal,
    RadioButton,
    TextInput,
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

    const parameter: ParameterType = useAppSelector<{}>(
        (state: RootState) => state.parameter,
    )

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleSetDuration = (value: string) => {
        dispatch(setParameter({...parameter, duration: value}))
    }

    const handleSetContact = (value: string) => {
        dispatch(setParameter({...parameter, contact: value}))
    }

    return (
        <View>
            <View>
                <Text variant="bodyLarge" style={{marginBottom: 5}}>
                    Sélectionnez une durée
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
                    {parameter.duration}
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
                <View style={{marginTop: 15}}>
                    <Text variant="bodyLarge" style={{marginBottom: 5}}>
                        Souscrire pour un contact
                    </Text>

                    <TextInput
                        mode="outlined"
                        placeholder="Numéro de de téléphone"
                        outlineStyle={{borderRadius: 30, borderWidth: 0.8}}
                        style={{backgroundColor: 'white'}}
                        value={parameter.contact as string}
                        onChangeText={(value: string) =>
                            handleSetContact(value)
                        }
                        maxLength={10}
                        keyboardType="number-pad"
                    />
                </View>
            )}
        </View>
    )
}

export default SouscriptionAppel
