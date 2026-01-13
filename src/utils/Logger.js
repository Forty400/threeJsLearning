/**
 * 日志工具类
 */
export class Logger {
    static log(message, ...args) {
        console.log(`[ThreeJS] ${message}`, ...args);
    }

    static warn(message, ...args) {
        console.warn(`[ThreeJS Warning] ${message}`, ...args);
    }

    static error(message, ...args) {
        console.error(`[ThreeJS Error] ${message}`, ...args);
    }

    static info(message, ...args) {
        console.info(`[ThreeJS Info] ${message}`, ...args);
    }
}
