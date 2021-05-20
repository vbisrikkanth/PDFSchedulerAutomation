const Helper = require('@codeceptjs/helper');

class MyPlaywright extends Helper {

  // before/after hooks
  /**
   * @protected
   */
  _before() {
    // remove if not used
  }

  /**
   * @protected
   */
  _after() {
    // remove if not used
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']
  async fileupload()
  {
    const { page } = this.helpers.Playwright;
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('upload')
    ]);
    await fileChooser.setFiles('myfile.pdf');
  }
  async clickbutton()
  {
    const { page } = this.helpers.Playwright;
    await page.click('text=Add');
  }
 /*  async capturescreenshot(filename)
  {
    const { page } = this.helpers.Playwright;
    await page.screenshot({ path: filename })

  } */
}

module.exports = MyPlaywright;
