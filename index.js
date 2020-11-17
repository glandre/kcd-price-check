const https = require('https')

const SNAPSHOT = `[
  {
    "slug": "basic-testing",
    "full_price": 67,
    "price": 67,
    "url": "https://egghead.io/api/v1/playlists/basic-testing"
  },
  {
    "slug": "pro-testing",
    "full_price": 332,
    "price": 332,
    "url": "https://egghead.io/api/v1/playlists/pro-testing"
  },
  {
    "slug": "standard-testing",
    "full_price": 136,
    "price": 136,
    "url": "https://egghead.io/api/v1/playlists/standard-testing"
  }
]`

const handleData = data => {
	const parsed = JSON.parse(data.toString())
	const stringified = JSON.stringify(parsed, null, 2)

	console.log('Is price the same?')
	if (stringified === SNAPSHOT) {
		console.log('yes...')
	} else {
		console.log('no!!!')
		console.log(stringified)
	}
}

// POST
// https://egghead.io/api/v1/sellable_purchases/prices
const postData = `{"sellables":[{"site":"pro_testing","sellable":"playlist","sellable_id":"basic-testing"},{"site":"pro_testing","sellable":"playlist","sellable_id":"pro-testing"},{"site":"pro_testing","sellable":"playlist","sellable_id":"standard-testing"}],"site":"pro_testing"}`
const options = {
	host: 'egghead.io',
	path: '/api/v1/sellable_purchases/prices',
	method: 'POST',
	headers: {
       'Content-Type': 'application/json',
       'Content-Length': postData.length
     }
}

// console.log('OPTIONS:', options)

const req = https.request(options, res => {
	// console.log('creating the request...')
	// console.log('statusCode:', res.statusCode)
	// console.log('headers:', res.headers)

	res.on('data', data => {
		// console.log('on data:', data)
		handleData(data)
	});
})

req.on('end', (...args) => {
	console.log('on end', args)
	// handleData(data)
})

req.on('error', err => {
	// console.log('Error! ===>', err.message)
	console.log(err)
})

console.log('Checking if prices changed...')

// console.log('writing the request!')
req.write(postData)

// console.log('ending the request!')
req.end()
