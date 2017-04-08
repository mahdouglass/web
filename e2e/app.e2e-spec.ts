<<<<<<< HEAD
import { MiggyismsPage } from './app.po';

describe('miggyisms App', () => {
  let page: MiggyismsPage;

  beforeEach(() => {
    page = new MiggyismsPage();
=======
import { ProjectPage } from './app.po';

describe('project App', function() {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
>>>>>>> 89e5b1fea29880c0d4c5f3536181c463347b0d7a
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
