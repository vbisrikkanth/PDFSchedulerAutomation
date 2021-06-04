// enable I and another page object
const { I } = inject();



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
      await I.amOnPage(process.env.BASE_URL);
      await I.wait(10);
      await I.waitForText('Sign in with Microsoft');
      await I.click(this.signInMicrosoftlabel);    
      await I.wait(5);
      await I.switchToNextTab();
      await I.waitForVisible(this.advancedbutton,process.env.WAIT_LONG);
      await I.click(this.advancedbutton);
      
      await I.click(this.proceedlink);
      await I.waitForVisible(this.inputemail,process.env.WAIT_LONG);
      await I.fillField(this.inputemail,process.env.ADMIN_USER);
      await I.click('Next');
      await I.wait(5);
      await I.waitForVisible(this.inputpassword,process.env.WAIT_LONG);
      await I.fillField(this.inputpassword,secret(process.env.ADMIN_PASSWORD));
      await I.click('Sign in');
      await I.wait(5);
      await I.click('Yes');
      await I.switchToPreviousTab();
      // await I.waitForVisible(this.newSchedule, process.env.WAIT_LONG); 
      // await I.storescreenshot('Login');
    },


}