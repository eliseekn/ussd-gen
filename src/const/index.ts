const STORAGE_KEY: string = 'USSDGEN_CODES'
const DURATION_OPTIONS: string[] = ['JOUR', 'SEMAINE', 'MOIS']

type DataProps = {
    JOUR: string[]
    SEMAINE: string[]
    MOIS: string[]
}

type Props = {
    APPEL: DataProps[]
    INTERNET: DataProps[]
}

const AMOUNT_OPTIONS: Props[] = [
    {
        APPEL: [
            {
                JOUR: ['150 FCFA', '200 FCFA', '300 FCFA'],
                SEMAINE: ['500 FCFA', '1000 FCFA'],
                MOIS: ['3000 FCFA', '5000 FCFA', '10000 FCFA', '20000 FCFA'],
            },
        ],

        INTERNET: [
            {
                JOUR: ['150 FCFA', '200 FCFA', '300 FCFA', '500 FCFA'],
                SEMAINE: ['1000 FCFA'],
                MOIS: ['2500 FCFA', '5000 FCFA', '10000 FCFA', '20000 FCFA'],
            },
        ],
    },
]

const MOBILE_OPERATOR_OPTIONS: string[] = ['ORANGE', 'MTN', 'MOOV']
const SERVICE_OPTIONS: string[] = [
    'SOUSCRIPTION APPEL',
    'SOUSCRIPTION INTERNET',
    'FACTURE CIE',
    'FACTURE SODECIE',
    'REABONNEMENT CANAL+',
]

export {
    STORAGE_KEY,
    DURATION_OPTIONS,
    AMOUNT_OPTIONS,
    MOBILE_OPERATOR_OPTIONS,
    SERVICE_OPTIONS,
}
