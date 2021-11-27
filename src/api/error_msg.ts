const errorMsg = {
    // 'path pattern': { 'status code': () => 'error msg' }
} as {
    [key: string]: {[key: string]: Function}
}

export function getRequestErrorMsg(path: string, statusCode: number, ...args: any[]): string {
    const key = Object.keys(errorMsg).find(
        it => path.match(RegExp(it)));
    if (!key) return '未知错误';
    const errorMessageGetter = errorMsg[key]?.[statusCode.toString()];
    return errorMessageGetter?.call(null, args) ?? '未知错误';
}