const {  MessageType, MessageOptions, Mimetype } = require('@whiskeysockets/baileys');
const { getStorage, ref, uploadBytes, getDownloadURL, listAll, getMetadata  } = require('firebase/storage');
const { text } = require('express');
require("./config");
const fs = require('fs-extra')





module.exports = sky7 = async (sky7, chatUpadate, mess, storage, store) => {

 try {   
    let body = mess.message.conversation
    let userNumber  = body.split('') 
    const prefi = global.prefix;
    const isCmd = body.startsWith(prefi);
    const command = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''
    const fromId = mess.key.remoteJid;
    const messageTag = mess;
    const args = body.trim().split(/ +/).slice(1)

    // https://i.ibb.co/LrdvmZX/sky7-bot-logo03.png
    // https://i.ibb.co/n1HxqQ8/sky7-bot-logo02.jpg
    // https://i.ibb.co/N9H1jqT/ruki-main.jpg


    switch (command) {
     
        case 'alive' :
         const aliveMsg = "\n \n```Hellow I'm online now!```\n \n```You can get mathematics papers using < .papers > command.```\n \n```Devoloper - *Eshan Chathuranga*```\n"
            sky7.sendMessage(fromId, {image:{url:'https://i.ibb.co/LrdvmZX/sky7-bot-logo03.png'}, caption:aliveMsg}, { quoted: messageTag } )

            // sky7.sendMessage(fromId, {
            //    document:{url:'https://firebasestorage.googleapis.com/v0/b/loginformsky7.appspot.com/o/2023%2F2023-OL-maths-sinhala.pdf?alt=media&token=91ccecda-3465-47b0-b981-71e9d6952288'},
            //    caption:'test1',
            //    fileName:'Paper 2023'
            // })



           break;





           case 'get':
             fs.readJson('./firebase_data/file_names.json').then(obj => {
               getDownloadURL(ref(storage, obj[args].file_path))
  .then((url) => {
   let SendFileName = obj[args].file_name
   sky7.sendMessage(fromId, {text:'```Uploading Document.........!```'}, {quoted:messageTag})
   sky7.sendMessage(fromId, {
      document:{url: url},
      caption: SendFileName,
      fileName: SendFileName
   }, {quoted:messageTag})
  })
  .catch((error) => {
    sky7.sendMessage(fromId, {text:error}, {quoted:messageTag})
  });
             })


break;

case 'papers':
   fs.readJson('./firebase_data/funtion_names.json').then(object => {
      let fileType = ``
      fileData = ``
       object.forEach(fileEle => {
        fs.readJson('./firebase_data/file_names.json').then(packageObj => {
          
             packageObj.forEach(element => {
              if (element.file_type === fileEle){
                fileData +=  packageObj.indexOf(element)+ '  ---  ' + element.file_name + '\n' + '\n' 
              }
             });
            //  console.log(fileData)
            sky7.sendMessage(fromId, {text:fileData}, {quoted:messageTag})

        })

      })
     
    })

break;






































    }   

    


 }catch (err) {
    console.log(err);



 }



}









