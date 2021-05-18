const Helper = require("@codeceptjs/helper");
const testcafe = require("testcafe");
const Selector = testcafe.Selector;

class Function extends Helper {
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

  async CheckVisualLoaded() {
    const { t } = this.helpers.TestCafe;
    await t
      .switchToIframe("#pvExplorationHost .visual-sandbox")
      .expect(
        Selector("#ibcsChart").nth(1).find("span").withText("8 073").textContent
      )
      .contains("8 073")
      .rightClick(
        Selector("#ibcsChart").nth(1).find("span").withText("France").nth(1)
      )
      .click(Selector("#ibcsChart").nth(1).find(".form-icon"))
      .expect(
        Selector("#ibcsChart").nth(1).find("span").withText("-350").textContent
      )
      .contains("-350")
      .expect(
        Selector("#ibcsChart").nth(1).find("span").withText("7 373").textContent
      )
      .contains("7 373");
  }
}

module.exports = Function;
