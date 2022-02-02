'use strict'

const separator = '_' 
const fileNameStart = 'XDRAdapterDSResponse'

async function populateKeyName(req) {
    
    return new Promise((resolve, reject) => {
        try {

            //const transId = req.headers.transaction_id
            //const uniqueKey = req.headers.unique_key
            const transId = 'DDP000000133939'
            const uniqueKey ='SD091048T_1000711626185602255'
            const fileExtension = process.env.dleftfileextn
            let uniqueKeyArray = uniqueKey.split('_');
            const folderName = uniqueKeyArray[0]
            const fileName = fileNameStart + separator + uniqueKey + separator + transId + separator + fileExtension
            console.log(`populateKeyName, FileName: ${fileName}`)
            const finalKeyNameInS3 = `${folderName}/${fileName}`
            console.log(`populateKeyName, finalKeyNameInS3: ${finalKeyNameInS3}`)

            resolve(finalKeyNameInS3)

        } catch(err){
            console.error(`err: ${err}`)
            reject(err)
        }
    })
}

module.exports = {
    populateKeyName,
};