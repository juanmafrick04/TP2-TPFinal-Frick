import User from "./User.js";
import Stat from "./Stat.js";


User.hasOne(Stat,{
    foreignKey:"userId",
    as: "stat",
});
Stat.belongsTo(User,{
    foreignKey:"userId",
    as: "stat",
});


export {User, Stat};