// const loginPage = require('../pages/loginPage');
// const { loginAsUser } = require('../pages/loginPage');
// const loginPage = require('../pages/loginPage');
// const pageURL = require('../pages/appURL');
// const { appURL } = require('../pages/appURL');

const { I } = inject();
// const assert = require('assert');
const assert = require('codeceptjs-assert');


if(process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  dotenv.config()
}


const sourceString = ' font-style: normal; font-size: 14px; line-height: 24px; height: 24px; font-family: "Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif; font-weight: bold; overflow: hidden; color: rgb(51, 51, 51); white-space: pre; text-overflow: ellipsis; width: 100%; display: block;';

Feature("XPS Demo");

Scenario("xViz Performance Suite Demo", async ({ I }) => {
//   const { t } = this.helpers.TestCafe;

  I.say('I navigate to application base URL');
 I.assertStringIncludes(sourceString,'font-weight: normal');
  // I.assertOk(sourceString,'font-weight: normal')

 

//  I.say('hi there: '+ assert.match(sourceString, /font-weight: bold/,'Font Weight Not matched'));

});
