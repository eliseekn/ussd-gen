import React, {useState} from 'react'
import {styles} from '../styles'
import {SafeAreaView, FlatList} from 'react-native'
import {USSDCodeType, RootStackParamList} from '../../interfaces'
import USSDCodeItem from '../../components/USSDCodeItem'
import {FAB} from 'react-native-paper'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MobileOperator'>

const history: USSDCodeType[] = [
    {
        id: 1,
        mobileOperator: 'ORANGE',
        service: 'SOUSCRIPTION APPEL',
        value: '#144*3*4*3432*542543*445*4454#',
        description: 'Lorem ipsum dolor sit amet',
    },

    {
        id: 2,
        mobileOperator: 'MTN',
        service: 'FACTURE CIE',
        value: '#144*3*4*3432*542543*445*4454#',
        description: 'Lorem ipsum dolor sit amet',
    },

    {
        id: 3,
        mobileOperator: 'MOOV',
        service: 'FACTURE SODECIE',
        value: '#144*3*4*3432*542543*445*4454#',
        description: 'Lorem ipsum dolor sit amet',
    },

    {
        id: 4,
        mobileOperator: 'ORANGE',
        service: 'REABONNEMENT CANAL+',
        value: '#144*3*4*3432*542543*445*4454#',
        description: 'Lorem ipsum dolor sit amet',
    },

    {
        id: 5,
        mobileOperator: 'ORANGE',
        service: 'SOUSCRIPTION INTERNET',
        value: '#144*3*4*3432*542543*445*4454#',
        description: 'Lorem ipsum dolor sit amet',
    },
]

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>()
    const [data, setData] = useState<USSDCodeType[]>(history)

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
