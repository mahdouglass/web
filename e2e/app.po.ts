import { browser, element, by } from 'protractor';

<<<<<<< HEAD
export class MiggyismsPage {
=======
export class ProjectPage {
>>>>>>> 89e5b1fea29880c0d4c5f3536181c463347b0d7a
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
