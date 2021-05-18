const Helper = require('@codeceptjs/helper')
const testcafe = require('testcafe')
const Selector = testcafe.Selector
let loginPage = require('../pages/loginPage');
const ClientFunction = testcafe.ClientFunction;

let resemble=require('resemblejs')
let path=require('path')
let mergeImg=require('merge-img')
const fs=require('fs');
const { assert } = require('console');
var imageDifferentPercentage

const waitForIframeLoad = ClientFunction((iframeSelector) => new Promise((resolve, reject) => {
  var i = 0;
  var intervalId = null;

  intervalId = window.setInterval(() => {
       var iframeElement = document.querySelector(iframeSelector);
       if (iframeElement
            && iframeElement.contentWindow
            && iframeElement.contentWindow.location.href !== 'about:blank'
            && iframeElement.contentDocument) {
            window.clearInterval(intervalId);
            resolve();
       }
       if (i > 60) {
            window.clearInterval(intervalId);
            reject(new Error('Iframe content loading timeout'))
       }
       i++;
  }, 1000);
}));


if(process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  dotenv.config()
}

class Testcafe extends Helper {
  
  // before/after hooks
  /**
   * @protected
   */
  _before() {
    // remove if not used
    console.log('Test Started')
  }

  /**
   * @protected
   */
  _after() {
    // remove if not used
    console.log('Test Closed')
  }

  async LoggedInToPowerBI() {
    const { t } = this.helpers.TestCafe;
    await t
      .click(Selector("a").withText("SIGN IN"))
      .typeText("#i0116", process.env.PRO_USER)
      .click("#idSIButton9")
      .typeText("#i0118", process.env.PRO_PASSWORD)
      .pressKey("enter")
      .click("#idSIButton9");
  }

  async LoginAsUser(){loginPage.loginAsProUser()}
  async LoginAsProUser(){loginPage.loginAsProUser()}
  async switchToIframe() {
    const { t } = this.helpers.TestCafe;
    const iframeSelector = 'iframe.visual-sandbox';
    await waitForIframeLoad(iframeSelector);
    await t.switchToIframe(Selector('.visual-sandbox[name="visual-sandbox"]')).wait(6000)
}
  
async assertCSSProperty(sourceElement,Value){
  const {t} = this.helpers.TestCafe;
  
}

async clickOnSpecificArea(sourceElement){
  const { t } = this.helpers.TestCafe;
  
  await t.click(Selector(sourceElement),{
    offsetX: -5,
    offsetY: -10
})
}


  async gettime()
  {
    var currentdate = new Date(); 
    var datetime =  currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds()+":"
                    + currentdate.getMilliseconds();
                    console.log(datetime); 
                   // return datetime;  
  }

    async capturescreenshot(testName,input){
      const { t } = this.helpers.TestCafe;
      const actpath=path
      .join(__dirname,"/../screenshots/","actual",testName,`${input}.png`)
      .normalize();
      // take actual screenshot
      // The screen shot file will be created in the output/actual/<<Test>>/<<FileName>>.png
      const actualScreenshotAbsolutePath = path         
      .join("actual",testName,`${input}.png`)
      .normalize()

      if(fs.existsSync(actpath)===true)
      {
        fs.unlinkSync(actpath)
      }
      await t
      .switchToMainWindow()
      .takeElementScreenshot(Selector('.visualContainerHost'), actualScreenshotAbsolutePath)
      .switchToIframe(Selector('.visual-sandbox[name="visual-sandbox"]')).wait(1000)
      //copy that created file to screenshots/actual/<<Test>>/<<FileName>>.png
      const actualcreatedpath=path
      .join(__dirname,"/../output/","actual",testName,`${input}.png`)
      .normalize();

      const isActualScreenshotTaken = fs.existsSync(actualcreatedpath);        
      if (isActualScreenshotTaken)
      {
         //Check if the Test Folder exists under screenshots/actual
            //Else create it
            const actualtestfolder=path
            .join(__dirname,"/../screenshots/","actual",testName)
            .normalize();

            if(fs.existsSync(actualtestfolder)===false)
            fs.mkdirSync(actualtestfolder)

            fs.copyFileSync(actualcreatedpath,actpath);
      }

    }

    async doVisualRegression(testName, input) {
      
      let res='pass'
      const { t } = this.helpers.TestCafe;
          let diffScreenshotAbsolutePath;
          
          const basepath=path
          .join(__dirname,"/../screenshots/","base",testName,`${input}.png`)
          .normalize();
          
          const actpath=path
              .join(__dirname,"/../screenshots/","actual",testName,`${input}.png`)
              .normalize();
            
          
          //If Base file does not exists, then it creates the Base file
          if(fs.existsSync(basepath)===false)
          {
            //create base image file
            const baseScreenshotAbsolutePath = path           
            .join("base",testName,`${input}.png`)
            .normalize();
            
            // take base screenshot.
            // The screen shot file will be created in the output/base/<<Test>>/<<FileName>>.png
            await t
            .switchToMainWindow()
            .takeElementScreenshot(Selector('.visualContainerHost'),baseScreenshotAbsolutePath)
            
            //copy that created file to screenshots/base/<<Test>>/<<FileName>>.png
            const basecreatedpath=path
            .join(__dirname,"/../output/","base",testName,`${input}.png`)
            .normalize();
           
             const isBaseScreenshotTaken = fs.existsSync(basecreatedpath);        
              if (isBaseScreenshotTaken)
              { 
                //Check if the Test Folder exists under screenshots/base
                //Else create it
                const basetestfolder=path
                .join(__dirname,"/../screenshots/","base",testName)
                .normalize();

                if(fs.existsSync(basetestfolder)===false)
                fs.mkdirSync(basetestfolder)

                fs.copyFileSync(basecreatedpath,basepath);
              }
          }
        
          // take actual screenshot
          // The screen shot file will be created in the output/actual/<<Test>>/<<FileName>>.png
          const actualScreenshotAbsolutePath = path         
          .join("actual",testName,`${input}.png`)
          .normalize();
              
          if(fs.existsSync(actpath)===true)
          {
            fs.unlinkSync(actpath)
          }
          await t
          .switchToMainWindow()
          .takeElementScreenshot(Selector('.visualContainerHost'), actualScreenshotAbsolutePath)
         
          //copy that created file to screenshots/actual/<<Test>>/<<FileName>>.png
          const actualcreatedpath=path
          .join(__dirname,"/../output/","actual",testName,`${input}.png`)
          .normalize();

          const isActualScreenshotTaken = fs.existsSync(actualcreatedpath);        
          if (isActualScreenshotTaken)
          {
             //Check if the Test Folder exists under screenshots/actual
                //Else create it
                const actualtestfolder=path
                .join(__dirname,"/../screenshots/","actual",testName)
                .normalize();

                if(fs.existsSync(actualtestfolder)===false)
                fs.mkdirSync(actualtestfolder)

                fs.copyFileSync(actualcreatedpath,actpath);
          }

          const box = {
            left: 320,
            top: 100,
            right: 1400,
            bottom: 750
        };
        
          //Image Comparison
         
           if(fs.existsSync(basepath)===true)
           {
            if(fs.existsSync(actpath)===true)
            {    
            await resemble(basepath)
              .compareTo(actpath)
              .scaleToSameSize()
              .outputSettings({
                errorColor: {
                  red: 255,
                  green: 0,
                  blue: 0
                },
                errorType: "movementDifferenceIntensity",
                transparency: 0.5,
                largeImageThreshold: 1200,
                useCrossOrigin: false,
                outputDiff: true,
                boundingBox: box
              })
              .onComplete(async data => {
                imageDifferentPercentage=data.rawMisMatchPercentage
               console.log(`image differene Percentage  `+path.join("actual", testName, `${input}.png`) +`  :: ${imageDifferentPercentage}`)
                if (imageDifferentPercentage> 0.3){
                  res='Image difference found'
                  // write a diff image
                    diffScreenshotAbsolutePath = path.join(
                    path.dirname(actpath),
                    `${path.basename(
                      actpath,
                      path.extname(actpath)
                    )}-diff.png`
                  )
                  
                  if(fs.existsSync(diffScreenshotAbsolutePath))
                  fs.unlinkSync(diffScreenshotAbsolutePath)

                  fs.writeFileSync(
                    diffScreenshotAbsolutePath,
                    data.getBuffer()
                  );
                 mergeImg([base, diffScreenshotAbsolutePath])
                .then((img) => {
                  // Save image as file
                  img.write(diffScreenshotAbsolutePath, () => console.log('Difference image generated'),log.error(`Difference Image generated:  ${imageDifferentPercentage}`)); 
                })
                .catch(err => console.error(err) );
                    // fail test
                  throw new Error(
                    console.log(`Visual mismatch detected in test: ${testName}/${input}. Please investigate.`),
                    //log.err(err)
                    console.log(err)                      
                  );
                }
                else {
                 console.log("Less than 3%")
                }
              });
            }
            else
            {
             // log.debug("Actual file not available")            
             console.log("Actual file not available")
             res='Actual file not available'
            }
          }
          else {
            //log.debug("Base file not available")
            console.log("Base file not available")
            res='Base file not available'
          }
          await t.switchToIframe(Selector('.visual-sandbox[name="visual-sandbox"]')).wait(1000)
          console.log('###### image comparison completed ######')
          console.log(res)
          if(res!='pass')
          await t.expect(true,false,'image comparison failed')
        }
      
}

module.exports = Testcafe;
