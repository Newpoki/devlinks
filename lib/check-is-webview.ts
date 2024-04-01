const rules = [
    // if it says it's a webview, let's go with that
    'WebView',
    // iOS webview will be the same as safari but missing "Safari"
    '(iPhone|iPod|iPad)(?!.*Safari)',
    // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
    // Android KitKat to Lollipop webview will put Version/X.X Chrome/{version}.0.0.0
    'Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})',
    // old chrome android webview agent
    'Linux; U; Android',
] as const

const webviewRegExp = new RegExp('(' + rules.join('|') + ')', 'ig')

/**
 * When sharing the app url to someone through a mobile app,
 * it may open browser within a webview instead of native browser app
 * which leads some provider, such as Google, to block authentication
 *
 * We need, on our side, to check if the app is opened within a webview
 * to avoid Google signin. It would be better if we could force authentication
 * to be opened in a real browser, but I didn't find any way to do it
 */
export const checkIsWebview = () => {
    const userAgent = window.navigator.userAgent

    return !!userAgent.match(webviewRegExp)
}
