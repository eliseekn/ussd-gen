import {ParameterType} from '../../../interfaces'

const Rechargement = (parameter: ParameterType): string => {
    return !parameter.contact
        ? '#144*2*1*1*' + parameter.amount + '*1#'
        : '#144*2*2*1*' +
              parameter.contactNumber +
              '*' +
              parameter.amount +
              '*1#'
}

export default Rechargement
