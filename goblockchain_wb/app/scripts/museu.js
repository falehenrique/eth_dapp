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
/**
 * Cria conexão com o IPFS e cria banco de dados no orbit
 */
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
        db = await orbitdb.keyvalue('Museu03', access)
        await db.load()
        dbConectado = true

        console.log(`database string: ${db.address.toString()}`)
        console.log(`db public key: ${db.key.getPublic('hex')}`)

        // React when the database is updated.
        db.events.on('replicated', () => {
          console.log(`Databse replicated. Check for new prices.`)
        })

        // console.info("vai tentar conectar em outra base de dados");
        // const store = await orbitdb.keyvalue("/orbitdb/QmarhXWgqJhK4bukipU9AbE3AEeD3cGhaMwU95BbFUs6qL/teste123")
        // await store.load()
        
        
        // console.log(store.get(hash))  
        // console.info(store);

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
      museu: idDB
    }

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
        console.info(objeto.museu);
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
  let peers = db.get('museus')

  // Handle a new DB.
  if(!peers) {
    peers = [idDB]
    await db.put('museus', peers);

  } else {
    if(peers.indexOf(idDB) === -1) {
      peers.push(idDB);
      await db.put('museus', peers);
    }
  }

  const dbMuseu = db.get(idDB);
  if(!dbMuseu) {
    // cria objeto vazio
    await db.put(idDB, []);
    console.info("Vai criar a conta corrente do museu");
  }  
  return true;
}

if ($("#enderecoConta").text() == "") {
  criarContaCorrente();
}

function upload() {
  const reader = new FileReader();
  reader.onloadend = function() {
    const buf = buffer.Buffer(reader.result) // converter image to buffer
    ipfs.files.add(buf, (err, result) => {
      if(err) {
        console.error(err)
        return
      }
      let url = `https://ipfs.io/ipfs/${result[0].hash}`
      console.log(`Url --> ${url}`)
    })
  }
  const photo = document.getElementById("foto");
  reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
}

function criarCarteira() {
  
}

// const uport = new window.uportconnect('Aula GBC 3', {network: 'rinkeby'})

// uport.requestDisclosure({
//   requested: ['name','country', 'address'],
//   notifications: true
// })


// uport.onResponse('disclosureReq').then(response => {
//   // const address = payload.address
//   console.info(response.payload.name);
//   console.info(response.payload.country);
// })