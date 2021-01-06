import authService from '../services/authService';
import Util from '../utils/Utils';
import jwt from 'jsonwebtoken'

const util=new Util();

class authController{

    // domestic login
    static async login(req,res){
        const email = req.body.email
        const password = req.body.password
        util.setData(null)

        try{
            if(email && password){
                const isEmailValid = await authService.getUserByEmail(email)
                if(isEmailValid && isEmailValid['provider'] === "domestic"){
                    if(password == isEmailValid['password']){
                        let token = jwt.sign({email:email}, process.env.SECRET_KEY, {expiresIn: "24hr"})
                        util.setSuccess(200,"success")
                        util.setData({
                            token: token,
                            email: email,
                            id: isEmailValid['id']
                        })
                        return util.send(res)
                    }else{
                        util.setFailure(200,"email or password incorrect")
                        return util.send(res)
                    }
                }else{
                    util.setFailure(200,"email or password incorrect")
                    return util.send(res)
                }
            }
            util.setFailure(200,"email or password incorrect")
            return util.send(res)

        }catch(err){
            console.log(err)
            util.setError(400,"Error")
            return util.send(res)
        }
    }

    //Domestic registration
    static async registerUser(req,res){
        
    }

	static async saveSocialResponse(req,res){
        const data = req.body
        util.setData(null)


		try{
            //check if user already exists and refresh their token to log them in if they do else create new user
            const user = await authService.getUserByEmail(req.body.email);
            const userData = {}
            let result = null

            let plainvalidator = util.generateRando(18)
            let hashValidator = crypto.createHash("sha256").update(plainvalidator).digest("hex")

            if(user){
                // if user already exists just change the validator hash 
                if(user['tokenExpiry'] < Date.now()){
                    userData.id = user.id
                    userData.validator = hashValidator
                    result = await authService.updateUser(userData)
                }
            }else{
                let email = user['email']
                let timestamp = Date.now()
                let string = new Buffer(email+timestamp)
                let selector = string.toString('base64')
                userData = data 
                userData.selector = selector
                userData.validator = hashValidator
                result = await authService.createUser(userData)
            }

			if(result.length){
                util.setSuccess(200,'success');
                //this data will be used to set the local storage data 
				util.setData({
                    selector: selector,
                    validator: plainvalidator
                });
			}else{
				util.setFailure(200,'failure');
			}
			return util.send(res)
		}catch(error){
			util.setError(400,error)
			return util.send(res)
		}
    }

	static async getUserById(req,res){
        const {id} = req.params
        util.setData(null)
        
		try{
			const result = await authService.getUserById(id)
			if(result){
				util.setSuccess(200,'success');
				util.setData(result);
			}else{
				util.setFailure(200,'failure');
			}
			return util.send(res)
		}catch(error){
			util.setError(400,error)
			return util.send(res)
		}
    }

    static async getUserByEmail(req,res){
        const {id} =req.params
        util.setData(null)
        
		try{
			const result = await authService.getUserByEmail(id)
			if(result){
				util.setSuccess(200,'success');
				util.setData(result);
			}else{
				util.setFailure(200,'failure');
			}
			return util.send(res)
		}catch(error){
			util.setError(400,error)
			return util.send(res)
		}
    }

	static async getUserBySelector(req,res){
        const {selector} = req.params
        util.setData(null)

		try{
			const result = await authService.getUserBySelector(selector)
			if(result.length){
				util.setSuccess(200,'success');
				util.setData(result);
			}else{
				util.setFailure(200,'failure');
			}
			return util.send(res)
		}catch(error){
			util.setError(400,error)
			return util.send(res)
		}
    }

	static async deleteUser(req,res){
        const {id} = req.params
        util.setData(null)

		try{
			const result = await authService.deleteUser(id)
			if(result){
				util.setSuccess(200,'success');
			}else{
				util.setFailure(200,'failure');
			}
			return util.send(res)
		}catch(error){
			util.setError(400,error)
			return util.send(res)
		}
    }

	static async updateUser(req,res){
        const {id} = req.params
        util.setData(null)

		try{
			const result = await authService.updateUser(id)
			if(result){
				util.setSuccess(200,'success');
			}else{
				util.setFailure(200,'failure');
			}
			return util.send(res)
		}catch(error){
			util.setError(400,error)
			return util.send(res)
		}
    }
}
export default authController;