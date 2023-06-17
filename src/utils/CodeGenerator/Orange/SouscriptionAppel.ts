const SouscriptionAppel = (duration: string, amount: string): string => {
    let result: string = '#111*1*1'

    if (duration === 'JOUR') {
        result += '*1'

        switch (amount) {
            case '300 FCFA':
                result += '*1'
                break
            case '200 FCFA':
                result += '*2'
                break
            default:
                result += '*3'
                break
        }
    }

    if (duration === 'SEMAINE') {
        result += '*2'

        switch (amount) {
            case '1000 FCFA':
                result += '*1'
                break
            default:
                result += '*2'
                break
        }
    }

    if (duration === 'MOIS') {
        result += '*3'

        switch (amount) {
            case '20000 FCFA':
                result += '*1'
                break
            case '10000 FCFA':
                result += '*2'
                break
            case '5000 FCFA':
                result += '*3'
                break
            default:
                result += '*4'
                break
        }
    }

    return result + '#'
}

export default SouscriptionAppel
