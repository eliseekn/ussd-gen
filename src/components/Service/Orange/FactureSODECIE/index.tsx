import React from 'react'
import {View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {setDuration} from '../../../../services/redux/reducers/durationReducer'
import {setAmount} from '../../../../services/redux/reducers/amountReducer'

const FactureSODECIE: React.FC = () => {
    const dispatch = useAppDispatch()

    const duration: string = useAppSelector<string>(
        (state: RootState) => state.duration,
    )

    const handleSetDuration = (value: string): void => {
        dispatch(setDuration(value))
    }

    const handleSetAmount = (): void => {
        dispatch(setAmount(''))
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
                    value={duration}
                    onChangeText={(value: string) => {
                        handleSetDuration(value)
                        handleSetAmount()
                    }}
                    maxLength={9}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    )
}

export default FactureSODECIE
