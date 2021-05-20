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
setHeadlessWhen(process.env.HEADLESS);
//setWindowSize(1366,784);
//setWindowSize('maximize',1200);
exports.config = {
  //tests: 'Tests/*_test.js',
 // tests: 'Tests/HomeStyle_test.js',
 // tests: 'Tests/HomeFormat_test.js',
 //tests: 'Tests/HomeVisualization_test.js',
 //tests: 'Tests/12032021173355/*_test.js',
 //tests: 'Tests/16042021164200/*_test.js',
// tests: 'Tests/17042021203218/*_test.js',
//tests: 'Tests/17042021203218/Feature_8_Scenario_8_test.js',
 //tests: 'Tests/20042021220453/Feature_6_Scenario_6_test.js',//
 //tests: 'Tests/14052021004331/Feature_1_Scenario_1_test.js',
 //tests: 'Tests/15052021130602/*_test.js',
 tests: 'Tests/17052021125150/login_test.js',
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
    },
    MyPlaywright: {
      require: './helpers/myplaywright_helper.js',
    },
   /*  CustomTestcafe: {
      require: './helpers/testcafe_helper.js',
    }, */
    Function: {
      require: './helpers/function_helper.js',
    },
    AssertWrapper: {
      "require": "codeceptjs-assert"
    },
    ResembleHelper: {
      "require": "codeceptjs-resemblehelper",
      "screenshotFolder": "./tests/output/",
      "baseFolder": "./tests/screenshots/base/",
      "diffFolder": "./tests/screenshots/diff/"
    },
    
  },
  include: {
    I: './steps_file.js',    
    loginPage: "./pages/loginPage.js",  
    schedulesPage: "./pages/schedulesPage.js",  
    appURL: "./pages/appURL.js",
    toolBar: "./pages/toolBar.js",
    matrixContent: './pages/matrixContent.js',
    homepage: './pages/homePage.js',
    cellLevel: './steps_cellLevel.js',
    rowLevel: './steps_rowLevel.js',
    columnLevel: './steps_columnLevel.js',
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
   
  }
  
}