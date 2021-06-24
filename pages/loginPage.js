// enable I and another page object
const { I } = inject();
const {decrypt } = require('../crypto');

const hash = {
  iv: 'eda4cb51651f32bb4ce19e2c1a69fe62',
  content: '4bc970d61fe26f3dc9b7ce4aa7fdf93f'
};

module.exports = {
  signInMicrosoftlabel: '//span[contains(text(),"Sign in with Microsoft")]',
  advancedbutton: '//button[contains(text(),"Advanced")]',
  proceedlink: '//a[@id="proceed-link"]',
  inputemail: '//input[@type="email"]',
  inputpassword: '//input[@type="password"]',
  newSchedule: '//button[contains(text(),"New Schedule")]',  

  async loginInPDFScheduler()
    {
      
      await I.say('I navigate to application base URL');
      if(process.env.DOCKER == 'Y') {
        await I.amOnPage(process.env.BASE_URL);
      }
      else {
        await I.amOnPage('http://13.90.249.161/#/login')
      }
      let url = await I.grabCurrentUrl();
      console.log(`Current URL 1 is [${url}]`);
      await I.wait(10);
      await I.waitForText('Sign in with Microsoft');
      await I.click(this.signInMicrosoftlabel);    
      await I.wait(5);
      await I.switchToNextTab(1);
      url = await I.grabCurrentUrl();
      console.log(`Current URL2 is [${url}]`);
     // await I.wait(10)
      //const result = await tryTo(() => I.see(this.advancedbutton));
      //console.log(result)
      
      //if(result==true){
        //await I.waitForVisible(this.advancedbutton,process.env.WAIT_LONG);
        // await I.click(this.advancedbutton);
        // await I.click(this.proceedlink);
      //}   
      url = await I.grabCurrentUrl();
      console.log(`Current URL3 is [${url}]`);
      await I.waitForVisible(this.inputemail,process.env.WAIT_LONG);
      await I.fillField(this.inputemail,process.env.ADMIN_USER);
      await I.click('Next');
      await I.wait(5);
      await I.waitForVisible(this.inputpassword,process.env.WAIT_LONG);
      await I.fillField(this.inputpassword,secret(await decrypt(hash)));
      await I.click('Sign in');
      await I.wait(5);
      await I.click('Yes');
      await I.switchToPreviousTab();
      // await I.waitForVisible(this.newSchedule, process.env.WAIT_LONG); 
      // await I.storescreenshot('Login');
    },


}