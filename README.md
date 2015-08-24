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
* Mustache (php)
* Sass (css)

Building this project is done using:
* Gulp
	* Gulp-sourcemaps
	* Gulp-babel
	* Gulp-jshint
	* Gulp-uglify
	* Gulp-sass
* Del (just for clearing out the ```dist/``` directory when needed)

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
- [x] removing mustache.js in favour of rendering the templates server side.
	- [x] mustache templates to the ```templates/``` folder.
	- [x] ajax response will be html.
- [x] removing jQuery in favour of pure javascript.
	- [x] use es6 with babel.js.
- [ ] use the browserstorage to remember the last visited page
- [ ] improve page layout
	- [ ] css flexbox.
		- [ ] remove margin: auto; method.
		- [ ] browser compatibility?
- [ ] move server side code to node.js (and use digital ocean or something like that for hosting)
- [ ] adding pagination to the homepage.
- [ ] ...

## License

MIT License