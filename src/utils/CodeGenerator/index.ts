import PassMix from './Orange/PassMix'
import PassKdo from './Orange/PassKdo'

const CodeGenerator = (
    mobileOperator: string,
    service: string,
    amount: string,
    duration?: string,
): string => {
    if (mobileOperator === 'ORANGE') {
        return service === 'MIX'
            ? PassMix(duration as string, amount)
            : PassKdo(amount)
    }

    return ''
}

export default CodeGenerator
