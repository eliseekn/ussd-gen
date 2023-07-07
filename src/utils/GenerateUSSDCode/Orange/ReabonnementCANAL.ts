import {ParameterType} from '../../../interfaces'

const ReabonnementCANAL = (parameter: ParameterType): string => {
    return '#144*4*4*1*1*' + parameter.account + '#'
}

export default ReabonnementCANAL
