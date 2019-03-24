//browser.ignoreSynchronization = true;
browser.waitForAngularEnabled(false);

/*
it('Click language button', async () => {
  element(by.css('btn btn-primary btn-lg-min-width')).click();
});
*/

it('Click language button', async () => {
  //element(by.id('language-button')).click();
  var button = await element(by.id('language-button'));
  button.click();
});

/*
it('Click language button', async () => {
  //element(by.id('language-button')).click();
  var input = await element(by.id('note_input'));
  button.click();
});
*/
