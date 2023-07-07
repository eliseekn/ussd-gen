import {ParameterType} from '../../../interfaces'

const SouscriptionAppel = (parameter: ParameterType): string => {
    let result: string = '#111*1*1'

    if (parameter.duration === 'JOUR') {
        result += '*1'

        switch (parameter.amount) {
            case '300':
                result += '*1'
                break
            case '200':
                result += '*2'
                break
            default:
                result += '*3'
                break
        }
    }

    if (parameter.duration === 'SEMAINE') {
        result += '*2'

        switch (parameter.amount) {
            case '1000':
                result += '*1'
                break
            default:
                result += '*2'
                break
        }
    }

    if (parameter.duration === 'MOIS') {
        result += '*3'

        switch (parameter.amount) {
            case '20000':
                result += '*1'
                break
            case '10000':
                result += '*2'
                break
            case '5000':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    return result + '1*1*1#'
}

export default SouscriptionAppel
