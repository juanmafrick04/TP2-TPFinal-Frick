import {DataTypes, Model} from "sequelize";
import bcrypt from "bcrypt";
import {dbConnection} from "../dbConnection/dbConnection.js";

class User extends Model{
    async validatePassword(password) {
        const result = await bcrypt.compare(password, this.password);
        return result
    }
}

User.init({
   userName: {
    type: DataTypes.STRING,
    allowNull: false
   },
   mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
   },
   password: {
    type: DataTypes.STRING,
    allowNull: false
   },
},
{
    sequelize:dbConnection,
    modelName:"User",
}
);


User.beforeCreate(async(user,options)=>{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
});

export default User;