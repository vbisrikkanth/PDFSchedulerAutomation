const { event } = require('codeceptjs');
const log = require('../../config/logging').default;
const allure = codeceptjs.container.plugins('allure');
const fs = require('fs');
const path =require('path');
const schedulePage = require('../../pages/schedulesPage')
const webAction = require('../../utils/webUtils')
const validators = require('../../utils/validatorUtils')

Feature('Checking Validations');


var TestName;
var FeatureName;
var errorPresent =true

event.dispatcher.on(event.test.before, async(test) => {
	TestName = test.title;
	log.info('feature name : '+FeatureName)
	log.info('Starting test : '+TestName)
})

event.dispatcher.on(event.suite.before, async(suite) => {
	FeatureName = suite.title;
})

event.dispatcher.on(event.test.after, async(test) => {
	TestName = test.title;
	log.info('Completed test : '+TestName)
	log.info(TestName +' :Error present: '+ errorPresent)
})




Scenario('SampleTestCaseToCheckValidators_Error', async({I}) => {
	session('valqtestuserSession', async() => {
			let s1 = 24.9999
			let s2 = 23.9991
			let variance = 1
			await validators.validateTwoDecimalValue(s1,s2,variance)
			errorPresent = false				
	});
});

Scenario('SampleTestCaseToCheckValidators_Pass', async({I}) => {
	session('valqtestuserSession', async() => {
			let s1 = 24.9999
			let s2 = 23.9999
			let variance = 1
			await validators.validateTwoDecimalValue(s1,s2,variance)
			errorPresent = false				
	});
});


