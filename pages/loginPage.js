// enable I and another page object
const { I } = inject();



module.exports = {

  fields: {
    userName: '#i0116',
    password: '#i0118'
  },
  submitButton: '#idSIButton9',
  singInBtn: 'Sign in',
  nextBtn: 'Next',
  yesBtn: 'Yes',
  editReport: '#editBtn',
  iFrame: '#pvExplorationHost iframe',
  moreOptions: '.overFlowIcon.pbi-office-icon.ng-star-inserted svg',
  //editOption: '//*[@id="mat-menu-panel-9"]/div/button[2]/span',
  editOption: '//*[contains(@class,"mat-menu-content")]//span[@title="Edit"]',


  // introducing methods
  async loginToPowerBI(email, pwd) {
    I.waitForText('SIGN IN');
    I.click('SIGN IN');
    I.waitForElement(this.fields.userName, 10);
    I.say('I Enter user name and password');
    I.fillField(this.fields.userName, email);
    I.click(this.nextBtn);
    I.wait(1);
    await I.waitForVisible(this.fields.password);
    await I.waitForElement(this.fields.password);
    await I.fillField(this.fields.password, secret(pwd));
    I.say('Click on submit button');
    I.click(this.singInBtn);
    I.wait(1);
    // I.saveScreenshot('LoginSuccessful.png');
    I.click(this.yesBtn);
    I.wait(5);
    I.waitForElement(this.editReport);

  },



}