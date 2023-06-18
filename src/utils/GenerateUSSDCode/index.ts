import SouscriptionAppel from './Orange/SouscriptionAppel'
import SouscriptionInternet from './Orange/SouscriptionInternet'
import FactureCIE from './Orange/FactureCIE'
import FactureSODECIE from './Orange/FactureSODECIE'

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
                return FactureCIE(duration as string, amount as string)
            case 'FACTURE SODECIE':
                return FactureSODECIE(duration as string)
        }
    }

    return ''
}

export default generateUSSDCode
