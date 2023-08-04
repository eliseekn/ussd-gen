import {ParameterType} from '../../../interfaces'

const SouscriptionInternet = (parameter: ParameterType): string => {
    return parameter.mobileMoney
        ? SouscriptionMobileMoney(parameter)
        : SouscriptionClassique(parameter)
}

const SouscriptionClassique = (parameter: ParameterType): string => {
    let result: string = '#111*1*2'

    if (parameter.duration === 'JOUR') {
        result += '*2'

        switch (parameter.amount) {
            case '150':
                result += '*1'
                break
            case '200':
                result += '*2'
                break
            case '300':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    if (parameter.duration === 'SEMAINE') {
        result += '*3'

        switch (parameter.amount) {
            default:
                result += '*1'
                break
        }
    }

    if (parameter.duration === 'MOIS') {
        result += '*4'

        switch (parameter.amount) {
            case '2500':
                result += '*1'
                break
            case '5000':
                result += '*2'
                break
            case '10000':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    return result + `*1*1*${parameter.contact ? parameter.contact : '1'}#`
}

const SouscriptionMobileMoney = (parameter: ParameterType): string => {
    let result: string = '#144*2*1*2*1*1'

    if (parameter.duration === 'JOUR') {
        result += '*2'

        switch (parameter.amount) {
            case '150':
                result += '*1'
                break
            case '200':
                result += '*2'
                break
            case '300':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    if (parameter.duration === 'SEMAINE') {
        result += '*3'

        switch (parameter.amount) {
            default:
                result += '*1'
                break
        }
    }

    if (parameter.duration === 'MOIS') {
        result += '*4'

        switch (parameter.amount) {
            case '2500':
                result += '*1'
                break
            case '5000':
                result += '*2'
                break
            case '10000':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    return result + `*1*1*${parameter.contact ? parameter.contact : '1'}#`
}

export default SouscriptionInternet
