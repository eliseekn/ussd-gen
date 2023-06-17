import React from 'react'
import {styles} from '../styles'
import {SafeAreaView, FlatList} from 'react-native'
import {USSDCodeType, RootStackParamList} from '../../interfaces'
import USSDCodeItem from '../../components/USSDCodeItem'
import {FAB} from 'react-native-paper'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '../../services/redux/hooks'
import {RootState} from '../../services/redux/store'

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MobileOperator'
>

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>()
    const data = useAppSelector<USSDCodeType[]>(
        (state: RootState) => state.USSDCode,
    )

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}: {item: USSDCodeType}) => (
                    <USSDCodeItem data={item} />
                )}
                keyExtractor={item => 'key' + item.id}
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
