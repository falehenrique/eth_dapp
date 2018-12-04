let ipfs
let db

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

// Returns a promise that resolves to a handle of the DB.
function openDb() {
  return new Promise(function(resolve, reject) {
    try {
      // Create IPFS instance
      ipfs = new Ipfs(ipfsOptions)

      ipfs.on('ready', async () => {

        // Create OrbitDB instance
        const orbitdb = new OrbitDB(ipfs)

        const access = {
          // Give write access to everyone
          write: ['*'],
        }

        // Load the DB.
        db = await orbitdb.keyvalue('GBC', access)
        await db.load()

        console.log(`database string: ${db.address.toString()}`)
        console.log(`db public key: ${db.key.getPublic('hex')}`)

        // React when the database is updated.
        db.events.on('replicated', () => {
          console.log(`Databse replicated. Check for new prices.`)
        })

        return resolve(db);
      })

    } catch(err) {
      return reject(err);
    }
  })
}