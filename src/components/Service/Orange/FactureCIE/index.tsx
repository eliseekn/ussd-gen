import React, {useState} from 'react'
import {View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../../../../services/redux/hooks'
import {RootState} from '../../../../services/redux/store'
import {setDuration} from '../../../../services/redux/reducers/durationReducer'
import {setAmount} from '../../../../services/redux/reducers/amountReducer'

const FactureCIE: React.FC = () => {
    const dispatch = useAppDispatch()

    const duration: string = useAppSelector<string>(
        (state: RootState) => state.duration,
    )

    const [amount, setTmpAmount] = useState<string>('')

    const handleSetDuration = (value: string): void => {
        dispatch(setDuration(value))
    }

    const handleSetAmount = (value: string) => {
        setTmpAmount(value)
        dispatch(setAmount(value + ' FCFA'))
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
                    onChangeText={handleSetDuration}
                    maxLength={9}
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
                    value={amount}
                    onChangeText={handleSetAmount}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    )
}

export default FactureCIE
