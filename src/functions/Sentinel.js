
let instance = null;

class Sentinel {

  constructor(db){
    this.db = db;
  }

  register(userInfo){
    let ret = this.db.collection('users').insertOne(userInfo);
    return ret;
  }

  login(userInfo){
    let ret = this.db.collection('users').
    findOne(userInfo,
      {
        fields:{
          password:0
        }
      }
    )
    return ret
  }

  authenticate(userInfo){
    console.log(userInfo);
  }

  static newInstance (db) {
    if(!instance){
      instance = new Sentinel(db)
    }
      instance.db = db;
    return instance;
  }

  static getInstance () {
    return instance;
  }
}

export default Sentinel;
