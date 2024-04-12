import pino from "pino"

const getLogger = (prefix: string) => {
    return pino({
        msgPrefix: `[${prefix}] `,
        base: { pid: undefined, hostname: undefined },
    })
}

export default getLogger
