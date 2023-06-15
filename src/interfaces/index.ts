export type USSDCodeType = {
    id: number
    mobileOperator: MobileOperatorType
    service: string
    value: string
    description: string
}

export type MobileOperatorType = 'ORANGE' | 'MOOV' | 'MTN'

export type RootStackParamList = {
    Home: undefined
    Service: undefined
    Generator: {mobileOperator: string; service: string}
}
