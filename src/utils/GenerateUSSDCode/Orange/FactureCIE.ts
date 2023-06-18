const FactureCIE = (duration: string, amount: string): string => {
    let result: string = '#144*4*1*1'

    if (duration === 'SERVICE POSTPAYE') {
        result += '*1*' + amount + '1'
    } else {
        result += '*8*1*5' + amount + '1'
    }

    return result + '#'
}

export default FactureCIE
