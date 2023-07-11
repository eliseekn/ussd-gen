import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, Dialog, Portal, RadioButton, Text} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {AMOUNT_OPTIONS} from '../../../../const'
import {setParameter} from '../../../../services/redux/reducers/parameterReducer'
import {ParameterType} from '../../../../interfaces'
import {RootState} from '../../../../services/redux/store'

const PassJour: React.FC = () => {
    const dispatch = useAppDispatch()

    const parameter: ParameterType = useAppSelector<ParameterType>(
        (state: RootState) => state.parameter,
    )

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleSetAmount = (value: string) => {
        dispatch(setParameter({...parameter, amount: value}))
    }

    return (
        <View style={{marginTop: 15}}>
            <Text variant="bodyLarge" style={{marginBottom: 5}}>
                Sélectionnez un montant
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
                {parameter.amount}
            </Button>

            <Portal>
                <Dialog visible={modalVisible} onDismiss={toggleModal}>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={value => {
                                handleSetAmount(value)
                                toggleModal()
                            }}
                            value={parameter.amount as string}>
                            {AMOUNT_OPTIONS[0].ORANGE[0].APPEL[0].JOUR.map(
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
    )
}

export default PassJour
