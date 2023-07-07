import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, Text, Dialog, Portal, RadioButton} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import PassJour from './PassJour'
import PassSemaine from './PassSemaine'
import PassMois from './PassMois'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'
import {DURATION_OPTIONS} from '../../../../const'
import {ParameterType} from '../../../../interfaces'

const SouscriptionInternet: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<{}>(
        (state: RootState) => state.parameter,
    )

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleSetDuration = (value: string) => {
        dispatch(setParameter({...parameter, duration: value}))
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
        </View>
    )
}

export default SouscriptionInternet
