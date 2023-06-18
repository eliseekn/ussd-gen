const FactureCIE = (account: string, amount: string): string => {
    return '#144*4*1*1*8*1*5*' + amount + '*' + account + '*CODE_SECRET#'
}

export default FactureCIE
