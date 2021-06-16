const { I } = inject();
const log = require('../config/logging').default;
var assert = require('assert');
module.exports = {
  
  async clickTheElement(elementSelector){
    log.info('Method Started : clickTheElement')
    try{
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.click(elementSelector)
    log.info('Click Success ! . Element : '+elementSelector)
    }
    catch(err){
    log.error(err)
    log.error('Method Failed : clickTheElement')
    await assert.strictEqual(false,true,'Testcase failed when clicking element: '+elementSelector)
  }
    log.info('Method Ended : clickTheElement')
  },

  async clearAndType(elementSelector,typeText){
    log.info('Method Started : clearAndType')
    try{
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.fillField(elementSelector,typeText)
    log.info('Clear and type Success ! . Element : '+elementSelector +' text : '+typeText)
    }
    catch(err){
    log.error(err)
    log.error('Method Failed : clearAndType')
    await assert.strictEqual(false,true,'Testcase failed when clearing and typing element: '+elementSelector +' with text '+typeText)
  }
    log.info('Method Ended : clearAndType')
  },

  async typeText(elementSelector,typeText){
    log.info('Method Started : typeText')
    try{
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.appendField(elementSelector,typeText)
    log.info('Append Success ! . Element : '+elementSelector +' text : '+typeText)
    }
    catch(err){
    log.error(err)
    log.error('Method Failed : typeText')
    await assert.strictEqual(false,true,'Testcase failed when typing element: '+elementSelector +' with text '+typeText)
  }
    log.info('Method Ended : typeText')
  },

  async doubleClickElement(elementSelector){
    log.info('Method Started : doubleClickElement')
    try{
    await I.waitForVisible(elementSelector,process.env.WAIT_LOW)
    await I.doubleClick(elementSelector)
    log.info('Double click Success ! . Element : '+elementSelector )
    }
  catch(err){
    log.error(err)
    log.error('Method Failed : doubleClickElement')
    await assert.strictEqual(false,true,'Testcase failed when doubleclicking element: '+elementSelector)
  }
  log.info('Method Ended : doubleClickElement')
  },

  async selectRadioButton(elementSelector){
    log.info('Method Started : selectRadioButton')
    try{
    await I.waitForClickable(elementSelector,process.env.WAIT_LOW)
    await I.selectRadioButton(elementSelector)
    log.info('Select Radio Button Success ! . Element : '+elementSelector )
  }
  catch(err){
    log.error(err)
    log.error('Method Failed : selectRadioButton')
    await assert.strictEqual(false,true,'Testcase failed when selectRadioButton element: '+elementSelector)
  }
    log.info('Method Ended : selectRadioButton')
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
    log.info('Method Started : getTextValueFromElement')
    try{
    await I.waitForVisible(element,process.env.WAIT_LOW)
    const text = await I.grabTextFrom(element)
    log.info('Grab Text Success ! . Element : '+element + ' text :'+text)
    return text
    }
  catch(err){
    log.error(err)
    log.error('Method Failed : getTextValueFromElement')
    await assert.strictEqual(false,true,'Testcase failed when getTextValueFromElement element: '+element)
  }
    log.info('Method Ended : getTextValueFromElement')
  },

  async getAttributeValueFromElement(element){
    log.info('Method Started : getAttributeValueFromElement')
    try{
    await I.waitForVisible(element,process.env.WAIT_LOW)
    const value = await I.grabAttributeFrom(element)
    log.info('Grab Attribute Success ! . Element : '+element + ' Value :'+value)
    return value
  }
  catch(err){
    log.error(err)
    log.error('Method Failed : getAttributeValueFromElement')
    await assert.strictEqual(false,true,'Testcase failed when getAttributeValueFromElement element: '+element)
  }
    log.info('Method Ended : getAttributeValueFromElement')
  },

  //File path relative to current codecept config direcrtory
  async attachFile(element,filepath){
    log.info('Method Started : attachFile')
    try{
    await I.waitForVisible(element,process.env.WAIT_LOW)
    await I.attachFile(element,filepath)
    log.info('Attach file Success ! . Element : '+element + ' from filePath :'+filepath)
    }
  catch(err){
    log.error(err)
    log.error('Method Failed : attachFile')
    await assert.strictEqual(false,true,'Testcase failed when attachFile element in the: '+filepath)
  }
    log.info('Method Ended : attachFile')
  },

  async getPageTitle(){
    log.info('Method Started : getPageTitle')
    try{
    const title = await I.grabTitle()
    log.info('Grab Page Title Success ! title :::'+title)
    return title
    }
  catch(err){
    log.error(err)
    log.error('Method Failed : getPageTitle')
    await assert.strictEqual(false,true,'Testcase failed when getPageTitle ')
  }
    log.info('Method Ended : getPageTitle')
  },

  async moveCursorTo(element){
    log.info('Method Started : moveCursorTo')
    try{
    await I.waitForElement(element,process.env.WAIT_LOW)
    await I.moveCursorTo(element)
    log.info('Hover Success ! . Element : '+element)
  }
  catch(err){
    log.error(err)
    log.error('Method Failed : moveCursorTo')
    await assert.strictEqual(false,true,'Testcase failed when moveCursorTo '+element)
  }
    log.info('Method Ended : moveCursorTo')
  },
  
}