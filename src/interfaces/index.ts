export type USSDCodeType = {
    id: number
    mobileOperator: MobileOperatorType
    title: string
    value: string
}

export type MobileOperatorType = 'ORANGE' | 'MOOV' | 'MTN'

export type RootStackParamList = {
    Home: undefined
    Service: undefined
    Generator: {mobileOperator: string; service: string}
}
