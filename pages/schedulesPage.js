// enable I and another page object
const {
  I
} = inject();
const log = require('../config/logging').default;
const webAction = require('../utils/webUtils')
var assert = require('assert');
module.exports = {
  newSchedulebtn: '//button[contains(text(),"New Schedule")]',
  editschedulename: '//h2[text()="Untitled"]//parent::div//following-sibling::div/div[@class="cursor-pointer"]',
  inputschedulename: '//input[@placeholder="Schedule Name"]',
  startcalendar: '//div[@title="Start Date Calendar"]',
  dateinput: '//abbr[@aria-label="May 22, 2021"]',
  addbulkrecipient: '//div[contains(text(),"+ Add Bulk Recipient")]',
  fileinput: '//input[@type="file"]',
  pdfSchedulerWS: "//div[@title='PDF Scheduler']",
  selectWorkspace: locate('div').withText('Select Workspace'),
  scheduleTitle: "h2[title='Schedules']",
  profileIcon: "div[class='flex-2 items-center']",
  listOfMemberHeader: "div[ref='eCenterContainer']",
  endCalendar: '//div[@title="End Date Calendar"]',
  hourDiv: '//div[@class="flex-1 w-full mt-1 space-y-1"]',
  minDiv: locate('//div[@class="flex-1 mt-1 space-y-1"]').at(1),
  amPmDiv: locate('//div[@class="flex-1 mt-1 space-y-1"]').at(2),
  emailInput: {xpath: '//div[text()="Enter with comma separated email"]'},
  firstRowOfSchedulerPage: "//div[@ref='eCenterContainer'] //child::div[@role='row' and @row-index='1']",
  secondRowOfSchedulerPage: "//div[@ref='eCenterContainer'] //child::div[@role='row' and @row-index='2']",
  thirdRowOfSchedulerPage: "//div[@ref='eCenterContainer'] //child::div[@role='row' and @row-index='3']",
  placeholderInput :{css:".prefix__input input[type='text']"},
  emailSubject:{css:"#emailSubject"},
  emailBody:{css:"#emailBody"},
  scheduleTitleh2:{css:"h2[title='Schedules']"},
  jobTitleh2:{css:"h2[title='Runs']"},
  userTitleh2:{css:"h2[title='Users']"},
  async chooseDate(date, type) {
    //const dateBtn = locate('button').withChild('abbr').withAttr({ 'aria-label': date })
    if (type == 'start') {
      await webAction.clickTheElement(this.startcalendar)
    } else if (type == 'end') {
      await webAction.clickTheElement(this.endCalendar)
    }
    const dateBtn = locate('button').withChild("//abbr[@aria-label='" + date + "']")
    await webAction.clickTheElement(dateBtn)

  },

  //enter input in double digit 
  async chooseTime(hour, minute, pm_am) {

    await webAction.clickTheElement(this.hourDiv)
    const hrList = locate("li[id='listbox-option-0']").withAttr({
      title: hour
    })
    await webAction.clickTheElement(hrList)
    await webAction.clickTheElement(this.minDiv)
    const minList = locate("li[id='listbox-option-0']").withAttr({
      title: minute
    })
    await webAction.clickTheElement(minList)
    await webAction.clickTheElement(this.amPmDiv)
    const ampmList = locate("li[id='listbox-option-0']").withAttr({
      title: pm_am
    })
    await webAction.clickTheElement(ampmList)
  },

  async chooseFromSideMenuInDashboard(text) {
    const sidebutton = locate('a').withDescendant('h3').withText(text)
    await webAction.clickTheElement(sidebutton)
  },

  /**
   * 
   * @param {*} titleName NAME,REPORT,OWNER,NEXT JOB,LAST JOB,STATUS,ACTION
   */
  async clickTableTitles(titleName) {
    const titleSelector = locate('span').withText(titleName)
    await webAction.clickTheElement(titleSelector)
  },

  /**
   * 
   * @param {*} fieldToCheck NAME ,OWNER , STATUS
   * @param {*} sortType ascending,descending
   */
  async checkForSorting(fieldToCheck, sortType) {

    let firstRow = ''
    let secondRow = ''
    let thirdRow = ''

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    if (fieldToCheck == 'NAME') {
      firstRow = this.firstRowOfSchedulerPage + "//child::div[@col-id='name']"
      secondRow = this.secondRowOfSchedulerPage + "//child::div[@col-id='name']"
      thirdRow = this.thirdRowOfSchedulerPage + "//child::div[@col-id='name']"
      let arrayBeforeSort = []
      let firstRowName = await I.grabTextFrom(firstRow);
      let secondRowName = await I.grabTextFrom(secondRow);
      let thirdRowName = await I.grabTextFrom(thirdRow);
      arrayBeforeSort.push(firstRowName, secondRowName, thirdRowName)
      let arrayAfterSort = [...arrayBeforeSort]
      arrayAfterSort.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      if (sortType == 'descending') {

        arrayAfterSort.reverse()
      }
      log.debug('Before :' + sortType + '::::' + arrayBeforeSort)
      log.debug('After :' + sortType + '::::' + arrayAfterSort)
      let val = await equals(arrayBeforeSort, arrayAfterSort);
      log.debug(val)
      await assert.strictEqual(val, true)
    } else if (fieldToCheck == 'OWNER') {
      firstRow = this.firstRowOfSchedulerPage + "//child::div[@col-id='createdBy']"
      secondRow = this.secondRowOfSchedulerPage + "//child::div[@col-id='createdBy']"
      thirdRow = this.thirdRowOfSchedulerPage + "//child::div[@col-id='createdBy']"
      let arrayBeforeSort = []
      let firstRowName = await I.grabTextFrom(firstRow);
      let secondRowName = await I.grabTextFrom(secondRow);
      let thirdRowName = await I.grabTextFrom(thirdRow);
      arrayBeforeSort.push(firstRowName, secondRowName, thirdRowName)
      let arrayAfterSort = [...arrayBeforeSort]
      arrayAfterSort.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      if (sortType == 'descending') {
        arrayAfterSort.reverse()
      }
      log.debug('Before Owner :' + sortType + '::::' + arrayBeforeSort)
      log.debug('After Owner:' + sortType + '::::' + arrayAfterSort)
      let val = await equals(arrayBeforeSort, arrayAfterSort);
      log.debug(val)
      await assert.strictEqual(val, true)
    } else if (fieldToCheck == 'status') {
      firstRow = this.firstRowOfSchedulerPage + "//child::div[@col-id='status']"
      secondRow = this.secondRowOfSchedulerPage + "//child::div[@col-id='status']"
      thirdRow = this.thirdRowOfSchedulerPage + "//child::div[@col-id='status']"
      let arrayBeforeSort = []
      let firstRowName = await I.grabTextFrom(firstRow);
      let secondRowName = await I.grabTextFrom(secondRow);
      let thirdRowName = await I.grabTextFrom(thirdRow);
      arrayBeforeSort.push(firstRowName, secondRowName, thirdRowName)
      let arrayAfterSort = [...arrayBeforeSort]
      arrayAfterSort.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      if (sortType == 'descending') {
        arrayAfterSort.reverse()
      }
      log.debug('Before Status :' + sortType + '::::' + arrayBeforeSort)
      log.debug('After Status:' + sortType + '::::' + arrayAfterSort)
      let val = await equals(arrayBeforeSort, arrayAfterSort);
      log.debug(val)
      await assert.strictEqual(val, true)
    }

  },

  async enterEmailInPlaceholder(...emailIds) {
    //await I.click(this.emailInput)
    //await webAction.clickTheElement(this.emailInput)
    await I.moveCursorTo(this.placeholderInput)
    await I.doubleClick(this.emailInput)    
    for (let emailId of emailIds) {
      log.debug(emailId+':::Result')
      await I.fillField(this.placeholderInput, emailId)
      await I.wait(2)
      await I.pressKey('Enter')
    }

  },

  async enterEmailSubject(subject){
    await I.click(this.emailSubject)
    await I.fillField(this.emailSubject,subject)
    await I.pressKey('Enter')
  },

  async enterEmailBody(body){
    await I.click(this.emailBody)
    await I.fillField(this.emailBody,body)
    await I.pressKey('Enter')
  },

  async addnewSchedule(scheduleName) {
    
    await I.click(this.newSchedulebtn);
    await I.waitForVisible(this.editschedulename, process.env.WAIT_LONG);
    await I.click(this.editschedulename);
    await I.fillField(this.inputschedulename, scheduleName);
    
    // //await I.click(this.dateinput);
    // await I.click(this.addbulkrecipient);

    // await I.wait(5);        

    // //Will work for only Input element File Upload
    // await I.attachFile(this.fileinput,'./abc.csv');
    // await I.wait(5);

    // //Calling the method in Playwright helper file
    // await I.clickbutton();
    // await I.storescreenshot('BulkUpload');
  },


}