import {CountUp} from 'countup.js';

export const AnimatedCounter = (totalCurrentBalance: { totalCurrentBalance: number }) => {
    const numAnim = new CountUp('myTarget', totalCurrentBalance);

    return (
        <div className={"w-full"}>{numAnim.start()}</div>
    )
}