const FactureSODECIE = (account: string): string => {
    return '#144*4*1*2*1*' + account + '*1*1*CODE_SECRET#'
}

export default FactureSODECIE
