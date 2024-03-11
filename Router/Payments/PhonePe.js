// const crypto =  require('crypto');
// const axios = require('axios');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();
// const salt_key = process.env.SALT_KEY;
// const merchant_id = process.env.MERCHANT_ID;
//  const newPayment = async (req, res) => {
//     try {
//         const merchantTransactionId = req.body.transactionId;
//         const data = {
//             merchantId: "PGTESTPAYUAT",
//             merchantTransactionId: merchantTransactionId,
//             merchantUserId: req.body.MUID,
//             name: req.body.name,
//             amount: req.body.amount * 100,
//             redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
//             redirectMode: 'POST',
//             mobileNumber: req.body.number,
//             paymentInstrument: {
//                 type: 'PAY_PAGE'
//             }
//         };
//         const payload = JSON.stringify(data);
//         const payloadMain = Buffer.from(payload).toString('base64');
//         const keyIndex = 1;
//         const string = payloadMain + '/pg/v1/pay' + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
//         const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//         const checksum = sha256 + '###' + keyIndex;

//         const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
//         const fake_url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
//         const options = {
//             method: 'POST',
//             url: fake_url,
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-VERIFY': checksum
//             },
//             data: {
//                 request: payloadMain
//             }
//         };

//         axios.request(options).then(function (response) {
//             console.log(response.data)
//             console.log(response.data.data.instrumentResponse.redirectInfo.url);
//             res.json({ redirectTo: response.data.data.instrumentResponse.redirectInfo.url });

//             res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
//         })
//         .catch(function (error) {
//             console.error(error);
//         });

//     } catch (error) {
//         res.status(500).send({
//             message: error.message,
//             success: false
//         })
//     }
// }

// const checkStatus = async(req, res) => {
//     const merchantTransactionId = res.req.body.transactionId
//     //const merchantTransactionId = req.params['txnId']
//     const merchantId = res.req.body.merchantId
//     //const merchantId = process.env.MERCHANT_ID

//     const keyIndex = 1;
//     const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
//     const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//     const checksum = sha256 + "###" + keyIndex;

//     //console.log("req res ----------------------------------", res.req.body)
//     const options = {
//     method: 'GET',
//     url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
//     headers: {
//         accept: 'application/json',
//         'Content-Type': 'application/json',
//         'X-VERIFY': checksum,
//         'X-MERCHANT-ID': `${merchantId}`
//     }
//     };
//     console.log(options)

//     // CHECK PAYMENT TATUS
//     axios.request(options).then(async(response) => {
//         if (response.data.success === true) {
//             const url = `http://localhost:3000/success`
//              console.log(res.data);

//             return res.redirect(url)
//         } else {
//             const url = `http://localhost:3000/failure`
//             // console.log(res.data);

//             return res.redirect(url)
//         }
//     })
//     .catch((error) => {
        
//         return res.status(400).json({
//             error: error.message
//         })
//     });
// };

// module.exports = {
//     newPayment,
//     checkStatus
// }



const crypto =  require('crypto');
const axios = require('axios');
const dotenv = require('dotenv');
const DJPortalModal = require('../../schema/DJPortalSchema');
const Payment = require('../../schema/PaymentSchema');


// Load environment variables from .env file
dotenv.config();
const salt_key = process.env.SALT_KEY;
const merchant_id = process.env.MERCHANT_ID;
 const newPayment = async (req, res) => {
    try {
        const {djId, SongReqList,transactionId, name, amount} = req.body;
        
        
        console.log("-------------------------")
        console.log("djId", djId);
        console.log("SongReq ", SongReqList)
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: "PGTESTPAYUAT",
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http:localhost:5000/pay/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const fake_url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        const options = {
            method: 'POST',
            url: fake_url,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };
           
        axios.request(options).then(function (response) {
            console.log(response.data)
            console.log(response.data.data.instrumentResponse.redirectInfo.url);
            res.json({ redirectTo: response.data.data.instrumentResponse.redirectInfo.url });

            res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
        })
        
        .catch(function (error) {
            console.error(error);
        });
        
         
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}
const checkStatus = async(req, res) => {
    const merchantTransactionId = req.params['txnId'] ;
    const merchantId = "PGTESTPAYUAT"
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;
   const options = {
    method: 'GET',
    url: `https:api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-VERIFY': checksum,
    'X-MERCHANT-ID': `${merchantId}`
    }
    };
   // CHECK PAYMENT STATUS
    axios.request(options).then(async(response) => {
    if (response.data.success === true) {
    //console.log(response.data)
    return res.status(200).send({success: true, message:"Payment Success"});
    } else {

    return res.status(400).send({success: false, message:"Payment Failure"});
    }
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send({msg: err.message});
    });
   };
module.exports = {
    newPayment,
    checkStatus
}