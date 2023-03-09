import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Trip Calculator App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Trip Calculator masthead', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Trip Calculator');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
