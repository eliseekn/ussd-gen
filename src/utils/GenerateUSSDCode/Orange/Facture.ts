const Facture = (service: string, account: string, amount: string): string => {
    return service === 'FACTURE CIE'
        ? '#144*4*1*1*8*1*5*' +
              amount.replace(' FCFA', '') +
              '*' +
              account +
              '#'
        : '#144*4*1*2*1*' + account + '*1*1#'
}

export default Facture
