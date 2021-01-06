import {Router} from 'express';
import authController from '../controllers/authController';

const router=Router();

router.get('/get-user/:id',authController.getUserById)
router.get('/get-user-email/:id',authController.getUserByEmail)
// router.get('/test',(req,res)=>{
//     res.send('test')
// })

export default router;