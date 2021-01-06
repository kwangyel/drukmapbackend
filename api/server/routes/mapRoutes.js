import {Router} from 'express';
import mapController from '../controllers/mapController';
import Util from '../utils/Utils';
import crypto from 'crypto';

const util=new Util();
// import cache from '../utils/cache';

const router=Router();

//get boundary of all dzongkhag thromdes
// router.get('/getBuildingPoint/:zoneid',mapController.getBuildingPoint)
// router.get('/zone/:zoneid',mapController.getZone)
// router.post('/checkzone',mapController.checkPointInZone)
// router.post('/getaddress',mapController.getAddress)

//endpoint to get all zones


//endpoint to get particular zones????
router.get('/getzone/:zoneid',mapController.getzone)
//endpoint to search for address and return all possible matches
router.get('/searchaddress/:address',mapController.searchAddress)
router.post('/getpath',mapController.getpath);
// router.post('/social-login',)
//endpoint to get drection from point a to point b
//
router.get('/rando',(req,res)=>{
    var result = util.generateRando(18)
    res.send(result);
})

router.get('/sharo',(req,res)=>{
    res.send(crypto.createHash("sha256").update("test").digest("hex"))

})
router.get('/base64/:item',(req,res)=>{
    const {item} = req.params
    const timeStamp = Date.now()

    const string = item + timeStamp.toString()
    let buff = new Buffer(string)
    let base64data = buff.toString('base64')
    res.send(string +"://: " +base64data)
})
export default router;
