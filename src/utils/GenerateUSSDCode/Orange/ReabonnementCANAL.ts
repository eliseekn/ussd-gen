const ReabonnementCANAL = (account: string): string => {
    return '#144*4*4*1*1*' + account + '*CODE_SECRET#'
}

export default ReabonnementCANAL
