import { MiggyismsPage } from './app.po';

describe('miggyisms App', () => {
  let page: MiggyismsPage;

  beforeEach(() => {
    page = new MiggyismsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
