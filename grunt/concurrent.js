module.exports = {
    server: [
        'compass:server',
        'jade:server',
        'copy:styles'
    ],
    test: [
        'copy:styles'
    ],
    stg: [
        'compass:stg',
        'copy:styles',
        'jade:stg'
    ],
    dist: [
        'compass:dist',
        'copy:styles',
        'jade:dist',
        'imagemin',
        'svgmin'
    ]
};
