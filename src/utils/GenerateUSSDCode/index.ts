import SouscriptionAppel from './Orange/SouscriptionAppel'
import SouscriptionInternet from './Orange/SouscriptionInternet'
import Facture from './Orange/Facture'
import ReabonnementCANAL from './Orange/ReabonnementCANAL'
import {ParameterType} from '../../interfaces'

const generateUSSDCode = (
    mobileOperator: string,
    service: string,
    parameter: ParameterType,
): string => {
    if (mobileOperator === 'ORANGE') {
        switch (service) {
            case 'SOUSCRIPTION APPEL':
                return SouscriptionAppel(parameter)
            case 'SOUSCRIPTION INTERNET':
                return SouscriptionInternet(parameter)
            case 'FACTURE CIE':
            case 'FACTURE SODECIE':
                return Facture(service, parameter)
            case 'REABONNEMENT CANAL+':
                return ReabonnementCANAL(parameter)
        }
    }

    return ''
}

export default generateUSSDCode
