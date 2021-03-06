const pool = require('../config/database');


module.exports.adminDetails = (callback) =>{
  const qry = "select firstName, lastName,email,password,address,mobileNo from admin where adminID=1";
  pool.query(qry, (err,result) =>{
    if (err){
      return callback(err,null);
    }
    if(result){
      return callback(null,result[0]);
    }
  });
}

module.exports.editAdmin = (firstName,lastName,email,password,address,mobileNo, callback) => {

  const qry = "update admin set firstName=?,lastName=?,password=?,address=?,mobileNo=? where adminID=1 ";

  pool.query(qry,[firstName,lastName,password,address,mobileNo],(err,result) => {
    if (err){
      return callback(err,null);
    }
    else{
      return callback(null,true);
    }
  });
}

module.exports.catagoryList = (callback) =>{
  const qry = "select catagoryID,catagoryName from catagory";
  pool.query(qry, (err,result) =>{
    if (err){
      return callback(err,null);
    }else{
      return callback(null,result);
    }
  });
}

module.exports.saveCatagory = (catagoryName, callback) => {

  const qry1 = "select catagoryID from catagory where catagoryName=? ";
  const qry2 = "insert into catagory(catagoryName) values(?)"

  pool.query(qry1,[catagoryName],(err,result1) => {
    if (err){
      return callback(err,null);
    }
    if(result1[0]==null){
      pool.query(qry2,[catagoryName],(err,result2) => {
        if (err){
          return callback(err,null);
        }else{
          return callback(null,true); //catagory added succesfully
        }
      });

    }else{
        return callback(null,false); //catagory already exist
    }
  });
}

module.exports.productList = (catagoryID,callback) =>{
  const qry = "select productID,productName,price,qtyAvailable,purchaseAmount,description,imgDetail from product where catagoryID=?";
  pool.query(qry,[catagoryID], (err,result) =>{
    if (err){
      return callback(err,null);
    }else{
      return callback(null,result);
    }
  });
}

module.exports.saveProduct = (catagoryID,productName,price,qtyAvailable,description, callback) => {

  const qry1 = "select productID from product where productName=? ";
  const qry2 = "insert into product(catagoryID,productName,price,qtyAvailable,description) values(?,?,?,?,?)"

  pool.query(qry1,[productName],(err,result1) => {
    if (err){
      return callback(err,null);
    }
    if(result1[0]==null){
      pool.query(qry2,[catagoryID,productName,price,qtyAvailable,description],(err,result2) => {
        if (err){
          return callback(err,null);
        }else{
          return callback(null,true); //product added succesfully
        }
      });

    }else{
        return callback(null,false); //product already exist
    }
  });
}

module.exports.saveImage = (imgDetail,productID, callback) => {

  const qry = "update product set imgDetail=? where productID=? ";

  pool.query(qry,[imgDetail,productID],(err,result) => {
    if (err){
      return callback(err,null);
    }
    else{
      return callback(null,true);
    }
  });
}

module.exports.getProduct = (productID, callback) =>{
  const qry = "select productName,price,description from product where productID=?";
  pool.query(qry,[productID], (err,result) =>{
    if (err){
      return callback(err,null);
    }
    if(result){
      return callback(null,result[0]);
    }
  });
}

module.exports.editProduct = (productID,addQty,productName,price,description, callback) => {

  const qry = "update product set qtyAvailable=qtyAvailable +?,productName=?,price=?,description=? where productID=? ";

  pool.query(qry,[addQty,productName,price,description,productID],(err,result) => {
    if (err){
      return callback(err,null);
    }
    else{
      console.log(result);
      return callback(null,true);
    }
  });
}

module.exports.feedbacks = (productID, callback) =>{
  const qry = "select * from feedback where productID=?";
  pool.query(qry,[productID], (err,result) =>{
    if (err){

      return callback(err,null);
    }else{
      return callback(null,result);
    }
  });
}

module.exports.deleteProduct = (productID, callback) =>{
  const qry1 = "delete from feedback where productID=?";
  const qry2 = "delete from product where productID=?";
  pool.query(qry1,[productID], (err,result1) =>{
    if (err){
      return callback(err,null);
    }else{
      pool.query(qry2,[productID], (err,result2) =>{
        if (err){
          return callback(err,null);
        }else{
          //console.log(result2)
          return callback(null,true);
        }
      });

    }
  });
}
