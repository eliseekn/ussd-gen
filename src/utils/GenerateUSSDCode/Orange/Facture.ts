import {ParameterType} from '../../../interfaces'

const Facture = (service: string, parameter: ParameterType): string => {
    if (service === 'FACTURE CIE') {
        return parameter.amount
            ? '#144*4*1*1*8*1*5*' +
                  parameter.amount +
                  '*' +
                  parameter.account +
                  '#'
            : '#144*4*1*1*1*1' + parameter.account + '*1*1#'
    }

    return '#144*4*1*2*1*' + parameter.account + '*1*1#'
}

export default Facture
