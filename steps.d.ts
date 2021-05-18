/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type loginPage = typeof import('./pages/loginPage.js');
type appURL = typeof import('./pages/appURL.js');
type toolBar = typeof import('./pages/toolBar.js');
type matrixContent = typeof import('./pages/matrixContent.js');
type homepage = typeof import('./pages/homePage.js');
type cellLevel = typeof import('./steps_cellLevel.js');
type rowLevel = typeof import('./steps_rowLevel.js');
type columnLevel = typeof import('./steps_columnLevel.js');
type MyPlaywright = import('./helpers/myplaywright_helper.js');
type Function = import('./helpers/function_helper.js');
type AssertWrapper = import('codeceptjs-assert');
type ResembleHelper = import('codeceptjs-resemblehelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, appURL: appURL, toolBar: toolBar, matrixContent: matrixContent, homepage: homepage, cellLevel: cellLevel, rowLevel: rowLevel, columnLevel: columnLevel }
  interface Methods extends Playwright, MyPlaywright, Function, AssertWrapper, ResembleHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<MyPlaywright>, WithTranslation<Function>, WithTranslation<AssertWrapper>, WithTranslation<ResembleHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
