const SouscriptionInternet = (duration: string, amount: string): string => {
    let result: string = '#111*1*2'

    if (duration === 'JOUR') {
        result += '*2'

        switch (amount) {
            case '150 FCFA':
                result += '*1'
                break
            case '200 FCFA':
                result += '*2'
                break
            case '300 FCFA':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    if (duration === 'SEMAINE') {
        result += '*3'

        switch (amount) {
            default:
                result += '*1'
                break
        }
    }

    if (duration === 'MOIS') {
        result += '*4'

        switch (amount) {
            case '2500 FCFA':
                result += '*1'
                break
            case '5000 FCFA':
                result += '*2'
                break
            case '10000 FCFA':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    return result + '#'
}

export default SouscriptionInternet
