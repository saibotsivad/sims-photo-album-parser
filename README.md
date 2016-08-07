# sims-photo-album-parser

Parse the XML from a Sims 2 Photo Album into a JSON object.

## install

The normal way:

```sh
npm install sims-photo-album-parser
```

## use

Just call it with a path to the XML file:

```js
var parse = require('sims-photo-album-parser')
var path_to_photo_album_xml_file = '/Users/saibotsivad/Games/Sims2/Neighborhood/N005/Storytelling/webentry_fe180f20.xml'

parse(path_to_photo_album_xml_file, function(err, photoAlbum) {
	console.log('Family Name:', photoAlbum.familyName)
})
```

## bugs and requests

If you find a bug in here, please file an [issue](https://github.com/tobiaslabs/sims-photo-album-parser/issues).

If possible, please include the XML content that is causing issues.

## license

[VOL](http://veryopenlicense.com)
