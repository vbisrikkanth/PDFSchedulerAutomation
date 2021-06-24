const { event } = require('codeceptjs');
const log = require('../../config/logging').default;
const allure = codeceptjs.container.plugins('allure');
const fs = require('fs');
const path =require('path');
const schedulePage = require('../../pages/schedulesPage')
const webAction = require('../../utils/webUtils')
const moment = require('moment')
Feature('Smoke_Demo');


var TestName;
var FeatureName;


event.dispatcher.on(event.test.before, async(test) => {
	TestName = test.title;
})

event.dispatcher.on(event.suite.before, async(suite) => {
	FeatureName = suite.title;
})




Scenario('demo_TC01_Validate_Login', async({I}) => {
	session('valqtestuserSession', async() => {

		if(process.env.AD_DB_Records == 'Y'){
			await schedulePage.addDBRecords()
		}
		
		log.info('TC01_Validate_Login in valqtestuserSession started')
		log.info('Hi Hello Success')
		await I.loginInPDFScheduler();
		
	});
});

