import SouscriptionAppel from './Orange/SouscriptionAppel'
import SouscriptionInternet from './Orange/SouscriptionInternet'
import Facture from './Orange/Facture'
import ReabonnementCANAL from './Orange/ReabonnementCANAL'

const generateUSSDCode = (
    mobileOperator: string,
    service: string,
    amount?: string,
    duration?: string,
): string => {
    if (mobileOperator === 'ORANGE') {
        switch (service) {
            case 'SOUSCRIPTION APPEL':
                return SouscriptionAppel(duration as string, amount as string)
            case 'SOUSCRIPTION INTERNET':
                return SouscriptionInternet(
                    duration as string,
                    amount as string,
                )
            case 'FACTURE CIE':
            case 'FACTURE SODECIE':
                return Facture(service, duration as string, amount as string)
            case 'REABONNEMENT CANAL+':
                return ReabonnementCANAL(duration as string)
        }
    }

    return ''
}

export default generateUSSDCode
