import React, {useState} from 'react'
import {styles} from '../styles'
import {SafeAreaView, FlatList} from 'react-native'
import {USSDCodeType} from '../../interfaces'
import USSDCodeItem from '../../components/USSDCodeItem'
import {FAB, Text} from 'react-native-paper'

const history: USSDCodeType[] = [
    {
        id: 1,
        mobileOperator: 'ORANGE',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 2,
        mobileOperator: 'MTN',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 3,
        mobileOperator: 'MOOV',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 4,
        mobileOperator: 'ORANGE',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 5,
        mobileOperator: 'ORANGE',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 6,
        mobileOperator: 'MOOV',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 7,
        mobileOperator: 'ORANGE',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 8,
        mobileOperator: 'MTN',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 9,
        mobileOperator: 'ORANGE',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },

    {
        id: 10,
        mobileOperator: 'ORANGE',
        title: 'Paiement facture CIE',
        value: '#144*3*4*3432*542543*445*4454#',
    },
]

const HomeScreen: React.FC = () => {
    const [data, setData] = useState<USSDCodeType[]>(history)

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="titleLarge" style={{marginBottom: 20}}>
                Historique des codes USSD
            </Text>

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
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                }}
                onPress={() => console.log('Pressed')}
            />
        </SafeAreaView>
    )
}

export default HomeScreen
