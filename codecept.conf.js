const { setHeadlessWhen } = require('@codeceptjs/configure');
const { setWindowSize } = require('@codeceptjs/configure')
require('ts-node/register');
require('dotenv').config();
const { isMainThread } = require('worker_threads');


async function startServer() {
  // implement starting server logic here
}
async function stopServer() {
  // and stop server too
}

const host = 'http://13.90.249.161/#/login';

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
//setHeadlessWhen(process.env.HEADLESS);
//setWindowSize(1366,784);
//setWindowSize('maximize',1200);
exports.config = {
 tests: 'Tests/17052021125150/smokeTest.js',
 multiple: {
  parallel: {
    chunks: 2,
    browsers: ['chromium']
  }
},
  //bootstrapAll:"./bootstrap.js" ,
  async bootstrapAll() {
    await startServer();
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