var moment = require('moment')
var parseXml = require('xml2js').parseString

var dateFormatInXml = 'MM/DD/YYYY HH:mm:ss'
var dateFormatOutput = 'YYYY-MM-DD HH:mm:ss'

module.exports = function(xmlString, cb) {
	parseXml(xmlString, function(err, xml) {
		if (err) {
			cb({ parseXml: err })
		} else if (!xml.StoryCreator || !xml.StoryCreator.ExchangeMetadata || !xml.StoryCreator.ExchangeMetadata[0].Album) {
			cb({ unknownXmlFormat: xml })
		} else {
			var album = xml.StoryCreator.ExchangeMetadata[0].Album[0]
			var json = {
				id: firstOfOrNull(album.ID),
				familyName: firstOfOrNull(album.FamilyName),
				familyId: firstOfOrNull(album.FamilyId),
				neighborhoodName: firstOfOrNull(album.NeighborhoodName),
				lotId: firstOfOrNull(album.LotID),
				lotName: firstOfOrNull(album.LotName),
				title: firstOfOrNull(album.Title),
				style: firstOfOrNull(album.Style)
			}
			if (album.Entry) {
				json.entries = album.Entry.map(function(entry) {
					var albumEntry = {
						title: firstOfOrNull(entry.Title),
						thumbnailFilename: firstOfOrNull(entry.ThumbnailFilename),
						snapshot: firstOfOrNull(entry.Snapshot),
						text: firstOfOrNull(entry.Text)
					}
					if (entry.TimeStamp) {
						albumEntry.timeStamp = moment(entry.TimeStamp[0], dateFormatInXml).format(dateFormatOutput)
					}
					return albumEntry
				})
			}
			cb(null, json)
		}
	})
}

function firstOfOrNull(obj) {
	return obj && obj[0] ? obj[0] : null
}
