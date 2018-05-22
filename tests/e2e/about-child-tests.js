module.exports = {
    beforeEach: function(browser){
        browser
            .url(browser.globals.base_app_url)
            .waitForElementVisible('body', 500)
            .pause(3000);

        browser.expect.element('#surname').to.be.visible;
        browser.expect.element('#othernames').to.be.visible;
        browser.expect.element('#dob').to.be.visible;
        browser.expect.element('#sexM').to.be.visible;
        browser.expect.element('#sexF').to.be.visible;
    },
    after: function(browser){
        console.log('Closing browser');
        browser.end();
    },
    "All required fields populated without errors": function(browser){
        browser
            .useCss()
            .setValue('#surname', 'Doe')
            .setValue('#othernames', 'John')
            .setValue('#dob', '09/08/1970')
            .click('#sexM')
            .click('#submitBtn');
        
        browser
            .assert.visible('#about-child-tab-ok')
            .expect.element('#about-child-tab-errors').to.not.be.present;

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-tests-1.png');
    }
    /*,
    "When 'Surname' not populated an error should be displayed": function(browser){
        browser
            .useCss()
            .setValue('#othernames', 'John')
            .setValue('#dob', '09/08/1970')
            .click('#sexM')
            .click('#submitBtn')
            .pause(3000);

        browser
            .expect.element('#about-child-tab-ok').to.not.be.present;

        browser
            .assert.visible('#about-child-tab-errors')
            .assert.visible('.surname_error');

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-tests-surname_error.png');    
    },
    "When 'Other names' not populated an error should be displayed": function(browser) {
        browser
            .useCss()
            .setValue('#surname', 'Doe')
            .setValue('#dob', '09/08/1970')
            .click('#sexM')
            .click('#submitBtn');

        browser
            .expect.element('#about-child-tab-ok').to.not.be.present;

        browser
            .assert.visible('#about-child-tab-errors')
            .assert.visible('.othernames_error');

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-tests-othernames_error.png');
    },
    "When 'Date of Birth' not populated an error should be displayed": function(browser) {
        browser
            .useCss()
            .setValue('#othernames', 'John')
            .setValue('#surname', 'Doe')
            .click('#sexM')
            .click('#submitBtn');

        browser
            .expect.element('#about-child-tab-ok').to.not.be.present;

        browser
            .assert.visible('#about-child-tab-errors')
            .assert.visible('.dob_error');

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-tests-dob_error.png');
    },
    "When 'Sex' not specified an error should be displayed": function(browser) {
        browser
            .useCss()
            .setValue('#othernames', 'John')
            .setValue('#surname', 'Doe')
            .setValue('#dob', '09/08/1970')
            .click('#submitBtn');

        browser
            .expect.element('#about-child-tab-ok').to.not.be.present;

        browser
            .assert.visible('#about-child-tab-errors')
            .assert.visible('.sex_error');

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-tests-sex_error.png');
    },
    "'Child Reference' error displayed when not populated correctly": function(browser){
        browser
            .useCss()
            .setValue('#othernames', 'John')
            .setValue('#surname', 'Doe')
            .setValue('#dob', '09/08/1970')
            .click('#sexM')
            .setValue('#childref1', '1')
            .click('#submitBtn')
            .pause(5000);

        browser
            .expect.element('#about-child-tab-ok').to.not.be.present;
        
        browser
            .assert.visible('#about-child-tab-errors')
            .assert.visible('.childref_error');

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-tests-childref_error.png');
    },
    "'Date of Birth' is validated properly": function(browser){
        browser
            .useCss()
            .setValue('#othernames', 'John')
            .setValue('#surname', 'Doe')
            .setValue('#dob', 'ASFGDGH')
            .click('#submitBtn')
            .pause(5000);

        browser
            .expect.element('#about-child-tab-ok').to.not.be.present;

        browser
            .assert.visible('#about-child-tab-errors')
            .assert.visible('.dob_error')
            .assert.containsText('.dob_error', 'Date of Birth is not valid. Please enter as DD/MM/YYYY');  

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-tests-dob-validated.png');    
    }*/
}