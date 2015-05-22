## Synopsis

The repository for http://tjallingt.com/
This website was build to practice writing clean and readable php, javascript and css, using modern webdevelopment techniques.
I would love some help, if you see possible improvements please file an issue or pull request.

## Dependencies

The frameworks/libraries that this project uses with can be downloaded with:
* Composer
* npm

This project is build with:
* Slimframework (php)
* Mustache (php/js)
* jQuery (js)
* Sass (css)

Building this project is done using:
* Gulp
	* Gulp-jshint
	* Gulp-uglify
	* Gulp-sass
* Del

## Building

To start building the website install the package managers [composer](https://getcomposer.org/doc/00-intro.md) and [npm](https://docs.npmjs.com/getting-started/installing-node).
Install all dependencies with the following commands:
In the top directory of this repository run:
```
# install node dependencies
npm install

# move to source directory
cd src 

# install php dependencies
composer install

# move back up on folder
cd ..

# build the website with gulp
gulp

```

The website will be built to the ```dist/``` folder, you can upload the contents of this folder to the base directory of any Apache server with php installed.

## ToDo

Work is still needed on:
* using flexbox for formatting (instead of current margin: auto;)
* exploring removing mustache.js in favour of rendering the templates server side.
	* mustache templates to the ``` templates/ ``` folder and ajax data becomes html.
* removing jQuery in favour of pure javascript.
	* afterwards upgrading javascript to es6 (babel.js?).
* ...

## License

MIT License