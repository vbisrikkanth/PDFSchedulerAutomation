// in this file you can append custom step methods to 'I' object
const assert = require('codeceptjs-assert');
const log = require('./config/logging').default;
const { helper } = require("codeceptjs");
//Below 2 lines added for POC by Saravana 
const allure = codeceptjs.container.plugins('allure');
const loginPage = require('./pages/loginPage');
const schedulePage = require('./pages/schedulesPage');
const fs = require('fs');
const path =require('path');
//const assertions = require("./pages/assertions");
//*********************************************************** */


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}


module.exports = function () {
  return actor({
    async loginInPDFScheduler()
    {
      await loginPage.loginInPDFScheduler();
    },
    async addNewSchedule()
    {
      await schedulePage.addnewSchedule();
    },
   
    async storescreenshot(filename){
      const cwd = process.cwd();
      const filePathAttachment = path.join(cwd, '/output/', filename+'.png');
      await this.saveScreenshot(filename+'.png');
      var bufferData = await fs.readFileSync(filePathAttachment);
      await allure.addAttachment(filename,bufferData,'image/png'); 
     },
     async demoforcodecept(){
       
     }  
    });

}
