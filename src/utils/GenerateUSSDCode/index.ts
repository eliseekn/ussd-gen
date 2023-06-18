import SouscriptionAppel from './Orange/SouscriptionAppel'
import SouscriptionInternet from './Orange/SouscriptionInternet'

const generateUSSDCode = (
    mobileOperator: string,
    service: string,
    amount: string,
    duration?: string,
): string => {
    if (mobileOperator === 'ORANGE') {
        switch (service) {
            case 'SOUSCRIPTION APPEL':
                return SouscriptionAppel(duration as string, amount)
            case 'SOUSCRIPTION INTERNET':
                return SouscriptionInternet(duration as string, amount)
        }
    }

    return ''
}

export default generateUSSDCode
