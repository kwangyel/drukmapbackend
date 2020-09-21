import {Router} from 'express';
import mapController from '../controllers/mapController';
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
//endpoint to get drection from point a to point b
//
export default router;
