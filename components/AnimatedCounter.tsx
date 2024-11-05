"use client"
import CountUp from 'react-countup';

export const AnimatedCounter = (amount: { amount: number }) => {

    return (
        <CountUp
            prefix={"$"}
            // suffix={' USD'}
            decimals={2}
            separator={'.'}
            decimal={','}
            start={0}
            end={5000} />
    )
}