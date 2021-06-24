const { compareImages } = require("resemblejs");
var assert = require('assert');
const { I } = inject();
const log = require('../config/logging').default;
module.exports = {
  
  async validateIfElementIsVisible(element,nameOfElement){
    log.info('Method Started : validateIfElementIsVisible')
    try{
      log.info('Checking if '+nameOfElement+'element is visible ....')
      await I.seeElement(element)
      log.info('Assertion Success ! . Element : '+nameOfElement+' is visible.')
    }
    catch(err){
      log.error(err)
      log.error('Method Failed : validateIfElementIsVisible')
      await assert.strictEqual(false,true,'Testcase failed when checking visibility of element '+nameOfElement)
    }
    log.info('Method Ended : validateIfElementIsVisible')
  },

  async validateIfElementIsNotVisible(element,nameOfElement){
    log.info('Method Started : validateIfElementIsNotVisible')
    try{
      log.info('Checking if '+nameOfElement+'element is not visible ....')
      await I.dontSeeElement(element)
      log.info('Assertion Success ! . Element : '+nameOfElement+' is not visible.')
    }
    catch(err){
      log.error(err)
      log.error('Method Failed : validateIfElementIsNotVisible')
      await assert.strictEqual(false,true,'Testcase failed when checking invisibilty of element '+nameOfElement)
    }
    log.info('Method Ended : validateIfElementIsNotVisible')
  },

  async validateTwoString(string1,string2){
    log.info('Method Started : validateTwoString')
    try{
      log.info('Comparing '+string1 +' and  '+ string2 +' ....')
      await assert.strictEqual(string1,string2,'Comparison error while comparing string')
      log.info('Assertion Success ! . String : '+string1+' is same as '+string2)
    }
    catch(err){
      log.error(err)
      log.error('Method Failed : validateTwoString')
      await assert.strictEqual(false,true,'Testcase failed when comparing 2 strings: '+string1+' ,'+string2)
    }
    log.info('Method Ended : validateTwoString')
  },

  async validateTwoDecimalValue(number1,number2,variance){
    log.info('Method Started : validateTwoDecimalValue')
    try{
      log.info('Comparing '+number1 +' and  '+ number2 +' with the variance of '+variance+' ....')
      let diff = Math.abs(number1-number2)
      let val = false
      if(diff <= variance){      
        val = true     
      }
      await assert.strictEqual(val,true)
      log.info('Assertion Success ! . Decimal Number : '+number1+' is within the variance of '+number2)
    }
    catch(err){
      log.error(err)
      log.error('Method Failed : validateTwoDecimalValue')
      await assert.strictEqual(false,true,'Testcase failed when comparing 2 decimals: '+number1+' ,'+number2 + ' with the variance = '+variance)
    }
    log.info('Method Ended : validateTwoDecimalValue')
  },

  async validateIfElementPresentInTheArray(element,...listOfElement){
    log.info('Method Started : validateIfElementPresentInTheArray')
    try{
      log.info('Checking whether '+element +' is present in the array ....')
      let flag = false
      for(let iteratorElement of listOfElement ){
        if(iteratorElement==element){
          flag= true
        }
      }
      await assert.strictEqual(flag,true)
      log.info('Assertion Success ! . Element: '+element+' is present in the array ')
    }
    
    catch(err){
      log.error(err)
      log.error('Method Failed : validateIfElementPresentInTheArray')
      await assert.strictEqual(false,true,'Testcase failed when validating element present in the array ')
    }

    log.info('Method Ended : validateIfElementPresentInTheArray')
  },
}