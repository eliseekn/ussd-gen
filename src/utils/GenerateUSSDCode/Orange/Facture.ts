const Facture = (service: string, account: string, amount: string): string => {
    return service === 'FACTURE CIE'
        ? '#144*4*1*1*8*1*5*' + amount + '*' + account + '*CODE_SECRET#'
        : '#144*4*1*2*1*' + account + '*1*1*CODE_SECRET#'
}

export default Facture
