
module.exports = (name,message,code)=>{
    const err = new Error();
    err.name = name
    err.message=message
    err.code=code
    return err
}