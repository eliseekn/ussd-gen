const PassKdo = (amount: string): string => {
    let result: string = '#111*1*1*4'

    switch (amount) {
        case '300 FCFA (Mo)':
            result += '*3'
            break
        case '300 FCFA (Min)':
            result += '*1'
            break
        case '600 FCFA':
            result += '*4'
            break
        case '1100 FCFA':
            result += '*2'
            break
        case '200 FCFA (Points)':
            result += '*5'
            break
        default:
            result += '*6'
            break
    }

    return result + '#'
}

export default PassKdo
