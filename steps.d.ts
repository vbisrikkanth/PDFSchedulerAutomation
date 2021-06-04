/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type loginPage = typeof import('./pages/loginPage.js');
type schedulesPage = typeof import('./pages/schedulesPage.js');
type MyPlaywright = import('./helpers/myplaywright_helper.js');
type AssertWrapper = import('codeceptjs-assert');
type ResembleHelper = import('codeceptjs-resemblehelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, schedulesPage: schedulesPage }
  interface Methods extends Playwright, MyPlaywright, AssertWrapper, ResembleHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<MyPlaywright>, WithTranslation<AssertWrapper>, WithTranslation<ResembleHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
