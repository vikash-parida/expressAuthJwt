module.exports=(sequelize, DataType)=>{
    const User = sequelize.define("users",{
        name:{
            type:DataType.STRING,
            allowNull:false,
            unique:true
        },
        email:{
            type:DataType.STRING,
            allowNull:false
        },
        password:{
            type:DataType.STRING,
            allowNull:false
        },
        tc:{
            type:DataType.BOOLEAN,
            allowNull:false
        }
    });
  
    return User;
}