module.exports = {
    beforeEach: function(browser){
        browser
            .url(browser.globals.base_app_url)
            .waitForElementVisible('body', 500)
            .click(browser.globals.child_illnesses_tab_id)
            .pause(3000);

        browser.expect.element('#illness1').to.be.visible;
        browser.expect.element('#illness1-duration').to.be.visible;
        browser.expect.element('#illness1-treatment').to.be.visible;
        browser.expect.element('#illness1-dosage').to.be.visible;
    },
    after: function(browser){
        console.log('Closing browser');
        browser.end();
    },
    "Should allow illnesses to be entered": function(browser){
        browser
            .useCss()
            .setValue('#illness1', 'Chest Infection')
            .setValue('#illness1-duration', '4 days')
            .setValue('#illness1-treatment', 'Linctus')
            .setValue('#illness1-dosage', 'twice a day')
            .click('#submitBtn')
            .click(browser.globals.child_illnesses_tab_id)
            .pause(500);
        
        browser
            .assert.visible('#child-illnesses-tab-ok')
            .expect.element('#child-illnesses-tab-errors').to.not.be.present;
    }
}