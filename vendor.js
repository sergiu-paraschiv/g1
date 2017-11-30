({
    baseUrl: '.',
    paths: {
        'react': 'node_modules/react/umd/react.development',
        'react-dom': 'node_modules/react-dom/umd/react-dom.development',
        'classnames': 'node_modules/classnames/index',
        'lodash': 'node_modules/lodash-amd/main',
        'three': 'node_modules/three/build/three'
    },
    include: [
        'react',
        'react-dom',
        'classnames',
        'lodash',
        'three'
    ],
    name: 'vendor',
    out: 'public/vendor.js',
    optimize: 'none',
    generateSourceMaps: false
})