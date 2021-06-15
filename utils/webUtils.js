const { I } = inject();

module.exports = {
  
  async clickTheElement(elementSelector){
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.click(elementSelector)
  },

  async clearAndType(elementSelector,typeText){
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.fillField(elementSelector,typeText)
  },

  async typeText(elementSelector,typeText){
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.appendField(elementSelector,typeText)
  },

  async doubleClickElement(elementSelector){
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.doubleClick(elementSelector)
  },

  async selectRadioButton(elementSelector){
    await I.waitForClickable(elementSelector,process.env.WAIT_LOW)
    await I.selectRadioButton(elementSelector)
  },
  
  async getTotalTableRow(){

  },

  async getTotalTableColumn(){

  },

  async getCellDataFromTableUsingRowAndColumn(){

  },

  async getCellDataFromTableUsingRowAndColumnLabel(){

  },

  async getTextValueFromElement(element){
    await I.waitForVisible(element,process.env.WAIT_LOW)
    const text = await I.grabTextFrom(element)
    return text
  },

  async getAttributeValueFromElement(element){
    await I.waitForVisible(element,process.env.WAIT_LOW)
    const value = await I.grabAttributeFrom(element)
    return value
  },

  //File path relative to current codecept
  async attachFile(element,filepath){
    await I.waitForVisible(element,process.env.WAIT_LOW)
    await I.attachFile(element,filepath)
  },

  async getPageTitle(){
    const title = await I.grabTitle()
    return title
  },

  async moveCursorTo(element){
    await I.waitForElement(element,process.env.WAIT_LOW)
    await I.moveCursorTo(element)
  },
  
}