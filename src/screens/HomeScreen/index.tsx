import React, {useEffect} from 'react'
import {styles} from '../styles'
import {SafeAreaView, FlatList} from 'react-native'
import {USSDCodeType, RootStackParamList} from '../../interfaces'
import USSDCodeItem from '../../components/USSDCodeItem'
import {FAB} from 'react-native-paper'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {useAppDispatch, useAppSelector} from '../../services/redux/hooks'
import {RootState} from '../../services/redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {setUSSDCode} from '../../services/redux/reducers/USSDCodeReducer'
import {STORAGE_KEY} from '../../const'
import {setUSSCodeId} from '../../services/redux/reducers/USSDCodeIdReducer'

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MobileOperator'
>

const HomeScreen: React.FC = (): any => {
    const dispatch = useAppDispatch()
    const navigation: NavigationProp = useNavigation<NavigationProp>()

    const USSDCodes: USSDCodeType[] = useAppSelector<USSDCodeType[]>(
        (state: RootState) => state.USSDCode,
    )

    const getUSSDCodes = async (): Promise<USSDCodeType[] | undefined> => {
        try {
            const data: string | null = await AsyncStorage.getItem(STORAGE_KEY)

            if (data !== null) {
                const d: USSDCodeType[] = JSON.parse(data) as USSDCodeType[]
                dispatch(setUSSDCode(d))
                return d
            }
        } catch (err) {}
    }

    const getLastUSSDCodeId = (data: USSDCodeType[]): void => {
        const id: number = data.length === 0 ? 0 : data[0].id
        dispatch(setUSSCodeId(id + 1))
    }

    useEffect(() => {
        getUSSDCodes().then(data => getLastUSSDCodeId(data as USSDCodeType[]))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={USSDCodes}
                renderItem={({item}: {item: USSDCodeType}) => (
                    <USSDCodeItem data={item} />
                )}
                keyExtractor={item => 'key_' + item.id}
                initialNumToRender={5}
                showsVerticalScrollIndicator={false}
            />

            <FAB
                icon="plus"
                style={{position: 'absolute', margin: 16, right: 0, bottom: 0}}
                onPress={() => navigation.navigate('MobileOperator')}
            />
        </SafeAreaView>
    )
}

export default HomeScreen
