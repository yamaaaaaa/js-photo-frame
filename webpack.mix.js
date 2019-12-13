const mix = require('laravel-mix');
const fs = require('fs-extra');

require('laravel-mix-polyfill')

//statid
const OUTPUT_DIR = 'dist/';
const WATCH_FILE_DIR = 'dist/**/*';

mix
    .polyfill()
    .options({
        processCssUrls: false
    })
    .js('resources/js/app.js', OUTPUT_DIR + 'js/')
    .sass('resources/sass/app.sass', OUTPUT_DIR + 'css/')
    .browserSync({
        // host: 'localhost',
        // port: 80,
        proxy: false,
        files: WATCH_FILE_DIR,
        server: OUTPUT_DIR
    });

