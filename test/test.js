var test = require('tape')
var fs = require('fs')
var toJson = require('../')

var expectedJson = {
	id: '0x5d1c488d',
	familyName: 'Awesome',
	familyId: '12',
	neighborhoodName: 'Ivy Hills',
	lotId: '0x0000001a',
	lotName: 'Springfield',
	title: 'The Awesome Family',
	style: 'Album',
	entries: [{
		title: 'Random Title',
		thumbnailFilename: 'thumbnail_5d1c488d_dd1c50c9.jpg',
		snapshot: 'snapshot_5d1c488d_dd1c50c9.jpg',
		text: 'A descriptive text here.',
		timeStamp: '2014-03-27 21:48:00'
	},{
		title: null,
		thumbnailFilename: 'thumbnail_5d1c488d_dd1c528e.jpg',
		snapshot: 'snapshot_5d1c488d_dd1c528e.jpg',
		text: 'Another thing goes here.',
		timeStamp: '2015-03-20 21:48:00'
	},{
		title: null,
		thumbnailFilename: 'thumbnail_5d1c488d_fd1c5297.jpg',
		snapshot: 'snapshot_5d1c488d_fd1c5297.jpg',
		text: 'Some sample text.',
		timeStamp: '2015-01-27 21:48:00'
	}]
}

test('a sample photo album', function(t) {
	fs.readFile('./test/sample-good.xml', { encoding: 'utf8' }, function(err, xml) {
		t.notOk(err, 'no errors')
		t.ok(xml, 'xml exists')
		toJson(xml, function(err, photoAlbum) {
			t.notOk(err, 'no error')
			t.ok(photoAlbum, 'album exists')
			t.deepEqual(expectedJson, photoAlbum, 'should be identical')
			t.end()
		})
	})
})

test('a bad photo album', function(t) {
	fs.readFile('./test/sample-bad.xml', { encoding: 'utf8' }, function(err, xml) {
		t.notOk(err, 'no errors')
		t.ok(xml, 'xml exists')
		toJson(xml, function(err, photoAlbum) {
			t.ok(err, 'errors')
			t.ok(err.unknownXmlFormat, 'specific error')
			t.notOk(photoAlbum, 'album does not exist')
			t.end()
		})
	})
})
