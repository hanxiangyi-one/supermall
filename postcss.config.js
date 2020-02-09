module.exports = {
    plugins: {
        autoprefixer: {
            "postcss-px-to-viewport":{
                viewportWidth: 375,
                viewportHeight: 667,
                unitprecision: 5,
                viewportUnit: 'vw',
                selectorBlackList:['ignore','tab-bar'],
                minpixelValue:1,
                mediaQuery:false,
                exclude: [/TabBar/],
            }
        }
    }
}