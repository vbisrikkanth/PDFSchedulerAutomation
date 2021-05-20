// enable I and another page object
const { I } = inject();

module.exports = {
  newSchedulebtn: '//button[contains(text(),"New Schedule")]',
  editschedulename: '//h2[text()="Untitled"]//parent::div//following-sibling::div/div[@class="cursor-pointer"]',
  inputschedulename: '//input[@placeholder="Schedule Name"]',
  startcalendar: '//div[@title="Start Date Calendar"]',
  dateinput: '//abbr[@aria-label="May 20, 2021"]',
  addbulkrecipient: '//div[contains(text(),"+ Add Bulk Recipient")]',
  fileinput: '//input[@type="file"]',

  async addnewSchedule()
  {
        await I.click(this.newSchedulebtn);
        await I.waitForVisible(this.editschedulename,process.env.WAIT_LONG);
        await I.click(this.editschedulename);
        await I.fillField(this.inputschedulename,"Schedule_New");
        await I.click(this.startcalendar);
        await I.click(this.dateinput);
        await I.click(this.addbulkrecipient);
       
        await I.wait(5);        
        
        //Will work for only Input element File Upload
        await I.attachFile(this.fileinput,'./abc.csv');
        await I.wait(5);
        
        //Calling the method in Playwright helper file
        await I.clickbutton();
        await I.storescreenshot('BulkUpload');
    },


}