module.exports = {
    beforeEach: function(browser){
        browser
            .url(browser.globals.base_app_url)
            .waitForElementVisible('body', 500)
            .click(browser.globals.additional_info_tab_id)
            .pause(3000);

        browser.expect.element('#additionalinfo').to.be.visible;
        browser.expect.element('#email').to.be.visible;
    },
    after: function(browser){
        console.log('Closing browser');
        browser.end();
    },
   "Should allow user to enter additional information": function(browser){
        var text = Math.random().toString(36).replace(/[^a-z\\s]+/g, '').substr(0, 200);

        browser
            .useCss()
            .setValue('#additionalinfo', text)
            .setValue('#email', 'a@test.com')
            .click('#submitBtn')
            .click(browser.globals.additional_info_tab_id)
            .pause(500);

        browser
            .assert.visible('#additional-info-tab-ok')
            .expect.element('#additional-info-tab-errors').to.not.be.present;

        browser.saveScreenshot(browser.globals.screenshots_folder + 'additional-info-additionaltext.png');
    },
    "When 'Email' not provided then error is displayed": function(browser){
        var text = Math.random().toString(36).replace(/[^a-z\\s]+/g, '').substr(0, 200);
        
        browser
            .useCss()
            .setValue('#additionalinfo', text)
            .click('#submitBtn')
            .click(browser.globals.additional_info_tab_id)
            .pause(500);

        browser
            .assert.visible('#additional-info-tab-errors')
            .assert.visible('.email_error')
            .assert.containsText('.email_error', 'Email for confirmation is required')
            .expect.element('#additional-info-tab-ok').to.not.be.present;

        browser.saveScreenshot(browser.globals.screenshots_folder + 'additional-info-email-missing.png');
    },
    "When valid 'Email' entered then no errors": function(browser){
        var text = Math.random().toString(36).replace(/[^a-z\\s]+/g, '').substr(0, 200);

        browser
            .useCss()
            .setValue('#additionalinfo', text)
            .setValue('#email', 'john.doe@test.com')
            .click('#submitBtn')
            .click(browser.globals.additional_info_tab_id)
            .pause(500);

        browser
            .assert.visible('#additional-info-tab-ok')
            .expect.element('#additional-info-tab-errors').to.not.be.present;

        browser.saveScreenshot(browser.globals.screenshots_folder + 'additional-info-email-valid.png');
    },
    "When invalid 'Email' entered then error displayed": function(browser){
        var text = Math.random().toString(36).replace(/[^a-z\\s]+/g, '').substr(0, 200);
        
        browser
            .useCss()
            .setValue('#additionalinfo', text)
            .setValue('#email', 'john.doe')
            .click('#submitBtn')
            .click(browser.globals.additional_info_tab_id)
            .pause(5000);

        browser
            .assert.visible('#additional-info-tab-errors')
            .expect.element('#additional-info-tab-ok').to.not.be.present;

        browser.saveScreenshot(browser.globals.screenshots_folder + 'additional-info-email-invalid.png');
    }
}