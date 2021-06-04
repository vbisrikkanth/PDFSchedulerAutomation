const { I } = inject();

module.exports = {
  
  async clickTheElement(elementSelector){
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.click(elementSelector)
  },

  async clearAndType(elementSelector,typeText){
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.clearField(elementSelector)
    await I.fillField(elementSelector,typeText)
  },

  async typeText(elementSelector,typeText){
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.fillField(elementSelector,typeText)
  }
  
}