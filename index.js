const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
} = require("@whiskeysockets/baileys");
const {Boom} = require('@hapi/boom');
// const fs = require('fs')
const pino = require("pino");
const path = require("path");
require("./config");
const { error } = require('console');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL, listAll, getMetadata  } = require('firebase/storage');
const fs = require('fs-extra')

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

async function connectToWhatsapp() {




  
// utility function to help save the auth state in a single folder
// this function serves as a good guide to help write auth & key states for SQL/no-SQL databases, which I would recommend in any production grade system
const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

    const sky7 = makeWASocket({
        // can provide additional config here
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        browser: ["SKY7 BOT", "Safari", "3.O"],
        auth: state,
    })

    // store.bind(sky7.ev);


    sky7.ev.on('messages.upsert', async (chatUpadate) => {
      // console.log(JSON.stringify(chatUpadate, undefined, 2))
      let mess = chatUpadate.messages[0];
      // console.log(mess);
      


   require("./main")(sky7, chatUpadate, mess, storage, store);


 
  })




      //Connection Brandwidth Updates
      sky7.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
          let reason = lastDisconnect.error
            ? lastDisconnect?.error?.output.statusCode
            : 0;
          if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Delete Session and Scan Again`);
            process.exit();
          } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            connectToWhatsapp();
          } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            connectToWhatsapp();
          } else if (reason === DisconnectReason.connectionReplaced) {
            console.log(
              "Connection Replaced, Another New Session Opened, Please Close Current Session First"
            );
            process.exit();
          } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
            process.exit();
          } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            connectToWhatsapp();
          } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            connectToWhatsapp();
          } else {
            console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
          }
        }
        console.log('Connected...', update)
      });
    
     sky7.ev.on("creds.update", saveCreds);

  // Get firebase authentication
// Initialize Firebase

  const app = initializeApp(global.firebase);
const storage = getStorage(app);
  /*
// Create a reference under which you want to list
const listFoldersRef = ref(storage, 'papers');
// Find all the prefixes and items.
//Array to save items
let itemsArray = []
let fileArray = []
//Get file reference
listAll(listFoldersRef)
  .then((res) => {
    res.prefixes.forEach((foldersRef) => {
        let filePath = foldersRef._location.path_;
        let splitArrayFiles = filePath.split('/')
        fileArray.push(splitArrayFiles[1])
        //get items path
          let itemsPathRef = ref(storage, `papers/${splitArrayFiles[1]}`);
          listAll(itemsPathRef).then((res) => {
            res.items.forEach((itemList) => {
              let itempath = itemList._location.path_;
              let splitArrayItems = itempath.split('/')
            itemsArray.push({
                       file_type: splitArrayFiles[1],
                       file_name: splitArrayItems[2],
                       file_path: itempath
            })
            writeData(itemsArray);
            writeData1(fileArray);
            })
          })
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      console.log(itemRef)
    });
  }).catch((error) => {
    sky7.sendMessage(fromId, {text:error}, {quoted:messageTag})
    console.log(error)
  });
  function writeData(dataRef) {
    fs.writeJson('./firebase_data/file_names.json', dataRef , err => {
      if (err) return console.error(err)
    })
  }

  function writeData1(dataRef) {
    fs.writeJson('./firebase_data/funtion_names.json', dataRef , err => {
      if (err) return console.error(err)
    })
  } 
 */
}

connectToWhatsapp();
