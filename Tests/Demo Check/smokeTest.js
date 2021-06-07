const { event } = require('codeceptjs');
const log = require('../../config/logging').default;
const allure = codeceptjs.container.plugins('allure');
const fs = require('fs');
const path =require('path');
const schedulePage = require('../../pages/schedulesPage')
const webAction = require('../../utils/webUtils')

Feature('Smoke_Demo');

BeforeSuite(async({
	I
}) => {

})


AfterSuite(async({
	I
}) => {

});

Before(async({
	I
}) => {


})
After(async({
	I
}) => {


})

var TestName;
var FeatureName;


event.dispatcher.on(event.test.before, async(test) => {
	TestName = test.title;
})

event.dispatcher.on(event.suite.before, async(suite) => {
	FeatureName = suite.title;
})


Scenario('TC01_Validate_Login', async({I}) => {
	session('valqtestuserSession', async() => {
		log.info('TC01_Validate_Login in valqtestuserSession started')
		log.info('Hi Hello Success')
		//await I.storescreenshot('SchedulePage')

	});
});

