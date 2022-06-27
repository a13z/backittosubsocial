/** @type {import('next').NextConfig} */

const regexEqual = (x, y) => {
    return (
        x instanceof RegExp &&
        y instanceof RegExp &&
        x.source === y.source &&
        x.global === y.global &&
        x.ignoreCase === y.ignoreCase &&
        x.multiline === y.multiline
    )
}

module.exports = {
    reactStrictMode: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        const oneOf = config.module.rules.find(
            (rule) => typeof rule.oneOf === 'object'
        )

        if (oneOf) {
            // console.log(oneOf)
            const moduleCssRule = oneOf.oneOf.find(
                // (rule) => regexEqual(rule.test, /\.module\.css$/)
                (rule) => regexEqual(rule.test, /\.module\.(scss|sass)$/)
            )

            if (moduleCssRule) {
                const cssLoader = moduleCssRule.use.find(({ loader }) =>
                    loader.includes('css-loader')
                )
                if (cssLoader) {
                    cssLoader.options.modules.mode = 'local'
                }
            }

            const fixUse = (use) => {
                // console.log('FixUse use')
                // console.log(use)
                if (use.loader.indexOf('css-loader') >= 0 && use.options.modules) {
                    use.options.modules.mode = 'local'
                }
            }

            oneOf.oneOf.forEach((rule) => {
                // console.log('Rule: ')
                // console.log(rule)
                if (Array.isArray(rule.use)) {
                    // console.log(`rule.use: ${JSON.stringify(rule.use)}`)
                    fixUse(rule.use[1])
                } else if (rule.use && rule.use.loader) {
                    fixUse(rule.use)
                }
            })
        }

        if (!isServer) {
            config.resolve.fallback.fs = false
        }

        config.plugins = config.plugins || []

        return config
    },
}
