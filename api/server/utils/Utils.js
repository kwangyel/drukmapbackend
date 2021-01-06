export default class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }
  generateRando(length){
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*_-';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  setSuccess(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'true';
  }
  setFailure(statusCode,message){
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'false';
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  setData(data){
    this.data = data;
  }

  send(res) {
    const result = {
      success: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.data) {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      success: this.type,
      message: this.message,
    });
  }
}
