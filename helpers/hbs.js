
const moment =  require('moment')
module.exports ={
    
    formatDate:(date, format)=>{
        return moment(date).format(format);
      },
      
     capitalizeFirst : (str) =>{
      return str.charAt(0).toUpperCase() + str.slice(1)  },
      
      eq:(arg1, arg2)=>{
        return (arg1 == arg2) ? true : false
      }
}