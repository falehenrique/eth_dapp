let ipfs
let db
let dbConectado = false
const idDB = "GBC";

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
const config = {
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        // Use local signal server
        // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      ]
    }
  }
}

function openOrbit() {
  return new Promise(function(resolve, reject) {
    try {
      // Create IPFS instance
      ipfs = new Ipfs(config)
      ipfs.on('ready', async () => {
     
        // Create OrbitDB instance
        const orbitdb = new OrbitDB(ipfs)

        const access = {
          // Give write access to everyone
          write: ['*'],
        }

        // Load the DB.
        db = await orbitdb.keyvalue('Museu02', access)
        await db.load()
        dbConectado = true

        console.log(`database string: ${db.address.toString()}`)
        console.log(`db public key: ${db.key.getPublic('hex')}`)

        // React when the database is updated.
        db.events.on('replicated', () => {
          console.log(`Databse replicated. Check for new prices.`)
        })

        console.info("vai tentar conectar em outra base de dados");
        const store = await orbitdb.keyvalue("/orbitdb/QmXxQuwmuRERejs71t6P8QFr2h6M553RikwUsLX38xyBuA/teste")
        await store.load()
      
        // console.log(store.get(hash))  
        console.info(store);

        return resolve(db);
      })

    } catch(err) {
      return reject(err);
    }
  })
}

async function iniciarOrbit() {
    db = await openOrbit();
}

iniciarOrbit();


async function adicionarObjeto() {
  try {

    let _nome = $('#_nomeObra').val();
    let _descricao = $('#_descricao').val();
    let _foto = "123";

    const dbValido = await verificarDB();
  
    if(!dbValido){
      return;
    } 
    const objeto = {
      nome: _nome,
      descricao: _descricao,
      foto: _foto,
      peer: idDB
    }

    let peers = db.get('peers')

    let objetos = db.get(idDB);

    objetos.push(objeto);

    await db.put(idDB, objetos);

    console.log(`Objeto adicionado ao DB!`)

  } catch(err) {
    console.error(`Erro ao adicionar objeto: `,err);
    throw err;
  }
}

async function consultarObra() {
  try {

    let _nome = $('#_nomeObra').val();
    let _listaObjetos = await db.get(idDB);
    console.info(_listaObjetos);
    _listaObjetos.forEach(function(objeto){
        console.info(objeto.nome);
        console.info(objeto.descricao);
        console.info(objeto.peer);
    });

  } catch(err) {
    console.error(`Erro ao adicionar objeto: `,err);
    throw err;
  }
}


async function verificarDB() {
  if(!dbConectado){
    console.info("dbConectado false");
    return false;
  }

  // Get the list of peers
  let peers = db.get('peers')

  // Handle a new DB.
  if(!peers) {
    peers = [idDB]
    await db.put('peers', peers);

  } else {
    if(peers.indexOf(idDB) === -1) {
      peers.push(idDB);
      await db.put('peers', peers);
    }
  }

  const dbMuseu = db.get(idDB);
  if(!dbMuseu) {
    // Create an empty array to store this users orders.
    await db.put(idDB, []);
  }  

  return true;
}

function criarCarteira() {


  
}