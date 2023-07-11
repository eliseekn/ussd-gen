const STORAGE_KEY: string = 'USSDGEN_CODES'
const DURATION_OPTIONS: string[] = ['JOUR', 'SEMAINE', 'MOIS']

type DataChildProps = {
    JOUR: string[]
    SEMAINE: string[]
    MOIS: string[]
}

type DataProps = {
    APPEL: DataChildProps[]
    INTERNET: DataChildProps[]
}

type Props = {
    ORANGE: DataProps[]
}

const AMOUNT_OPTIONS: Props[] = [
    {
        ORANGE: [
            {
                APPEL: [
                    {
                        JOUR: ['150', '200', '300'],
                        SEMAINE: ['500', '1000'],
                        MOIS: ['3000', '5000', '10000', '20000'],
                    },
                ],

                INTERNET: [
                    {
                        JOUR: ['150', '200', '300', '500'],
                        SEMAINE: ['1000'],
                        MOIS: ['2500', '5000', '10000', '20000'],
                    },
                ],
            },
        ],
    },
]

const MOBILE_OPERATOR_OPTIONS: string[] = ['ORANGE' /*, 'MTN', 'MOOV'*/]

const SERVICE_OPTIONS: string[] = [
    'SOUSCRIPTION APPEL',
    'SOUSCRIPTION INTERNET',
    'FACTURE CIE',
    'FACTURE SODECIE',
    'REABONNEMENT CANAL',
]

export {
    STORAGE_KEY,
    DURATION_OPTIONS,
    AMOUNT_OPTIONS,
    MOBILE_OPERATOR_OPTIONS,
    SERVICE_OPTIONS,
}
