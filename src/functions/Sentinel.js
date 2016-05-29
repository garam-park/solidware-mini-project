
let instance = null;

class Sentinel {

  constructor(db){
    this.db = db;
  }

  register(userInfo){
    let ret = this.db.collection('users').insertOne(userInfo);
    //   ,(err, result)=>{
    //   if(err){
    //     console.log(err);
    //   }else {
    //     console.log(result);
    //   }
    // });
    return ret;
  }

  login(userInfo){

    let ret = this.db.collection('users').findOne(userInfo,function(err,doc){
      if(err) throw err;
    })
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
