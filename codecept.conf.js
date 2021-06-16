const { setHeadlessWhen } = require('@codeceptjs/configure');
const { setWindowSize } = require('@codeceptjs/configure')
require('ts-node/register');
require('dotenv').config();
const log = require('./config/logging').default;
const { isMainThread } = require('worker_threads');
var assert = require('assert');

async function startServer() {
  // implement starting server logic here
}
async function stopServer() {
  // and stop server too
}

async function addDBRecords(){
  
  let requestDatas = await updateValQTestUser()
  const getres = (requestDatas) =>
		new Promise((resolve, reject) => {
			request(requestDatas, function (error, response) {
				if (error) {throw new Error(error) 
				reject('IncompleteResponse')}
				else{
					log.info('successful response body : '+response.body)
					//console.log('Actual file created')
					resolve('DONE')}                
			})
		});  
	log.info('Starting API Call ....')  
	const result = await getres(requestDatas)
	log.info('response from API is ======>'+result)
	if (result === 'DONE') {
		log.info("Updated DB Records Successfully ....")
	} 
  else {
		log.error("Updation failed !")
    assert.strictEqual(true,false,'Test failed since DB connection failed ')
	}
}

async function updateValQTestUser(){
  var request = {
    'method': 'POST',
		'url': 'http://localhost:12000/v1/backdoor/tenant/',
    'headers': {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInNjb3BlIjp7ImJhY2tkb29yIjp0cnVlfSwicm9sZXMiOltdLCJpc0JhY2tEb29yIjp0cnVlLCJpYXQiOjE2MDkxNjQyNjUsImV4cCI6MjQ3MzE2NDI2NX0.O5Jdy-j_9tEdLQXgUDrhyVfboevLfHSWl313oTZXC3s',
      'Content-Type' : 'application/json'
    },
    "name": "ValQ Test User",
    "domain": "visualbi.com",
    "adminEmail": "valqTestUser@visualbi.com",
    "billingEmail": "valqTestUser@visualbi.com",
    "adminFullName": "ValQ Test User",
    "billingFullName": "ValQ Test User",
    "licenseMeta": {}
  }
  return request
}

const host = 'http://localhost/#/login';

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
//setHeadlessWhen(true);
//setWindowSize(1366,784);
//setWindowSize('maximize',1200);
exports.config = {
 tests: 'Tests/DemoCheck/*.js',
 multiple: {
  parallel: {
    chunks: 2,
    browsers: ['chromium']
  }
},
  //bootstrapAll:"./bootstrap.js" ,
  async bootstrapAll() {
    await startServer();
    if(process.env.AD_DB_Records=='Y'){
      log.info('Inside bootstrap')
      await addDBRecords();
    }    
  },

  async bootstrap() {
    // start a server only if we are not in worker
    if (isMainThread) return startServer();
  },

  async teardown() {
    // start a server only if we are not in worker
    if (isMainThread) return stopServer();
  },

  async teardownAll() {
    await stopServer();
  },
  output: './output/',
  helpers: {
    Playwright: {
      url: host,
      show: true,
      browser: 'chromium',
      disableScreenshots: false,
      fullPageScreenshots: true,
      waitForNavigation:'networkidle0' ,
      waitForAction: 1000,
      chromium: {
        headless: false,
        args: [
            `--window-size=1280,609`,
            '--ignore-certificate-errors',
        ],
    }
    },
    MyPlaywright: {
      require: './helpers/myplaywright_helper.js',
    },
    // AssertWrapper: {
    //   "require": "codeceptjs-assert"
    // },
    // ResembleHelper: {
    //   "require": "codeceptjs-resemblehelper",
    //   "screenshotFolder": "./tests/output/",
    //   "baseFolder": "./tests/screenshots/base/",
    //   "diffFolder": "./tests/screenshots/diff/"
    // },
    
  },
  include: {
    I: './steps_file.js',    
    loginPage: "./pages/loginPage.js",  
    schedulesPage: "./pages/schedulesPage.js",  
    //assertions: "./pages/assertions.js",

  },
  bootstrap: null,
  mocha: {},
  name: 'xViz Performance Suite',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: false
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true
    },
    stepByStepReport: {
      //enabled: true,
      //screenshotsForAllureReport: true,
    },
    
    autoDelay: {
        enabled: true,
        delayBefore:'500'
    },
   
  }
  
}