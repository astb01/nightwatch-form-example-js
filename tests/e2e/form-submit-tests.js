module.exports = {
    beforeEach: function(browser){
        browser
            .url(browser.globals.base_app_url)
            .waitForElementVisible('body', 500)
            .click(browser.globals.about_child_tab_id)
            .pause(3000);
    },
    after: function(browser){
        console.log('Closing browser');
        browser.end();
    },
    "When all required fields are entered and form is submitted a success message is displayed": function(browser){
        browser
            .useCss()
            .setValue('#surname', 'Doe')
            .setValue('#othernames', 'John')
            .setValue('#dob', '09/08/1970')
            .click('#sexM')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500)
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', 'L1 2ED')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click(browser.globals.additional_info_tab_id)
            .pause(500)
            .setValue('#email', 'john.doe@test.com')
            .click('#submitBtn');

        browser.assert.visible('.submit_success');
        browser.assert.visible('.app_id');
        browser.expect.element('.email_conf').text.to.equal('john.doe@test.com');

        browser.saveScreenshot(browser.globals.screenshots_folder + 'form-submit-success.png');
    },
    "When form successfully submitted and 'New Application' clicked, user is presented with new form": function(browser){
        browser
            .useCss()
            .setValue('#surname', 'Doe')
            .setValue('#othernames', 'John')
            .setValue('#dob', '09/08/1970')
            .click('#sexM')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500)
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', 'L1 2ED')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click(browser.globals.additional_info_tab_id)
            .pause(500)
            .setValue('#email', 'john.doe@test.com')
            .click('#submitBtn')
            .pause(2000);

        browser.expect.element('#new_application').to.be.visible;
        
        browser
            .click('#new_application')
            .pause(500)
            .assert.containsText('h2', 'About the child');

        browser.expect.element('#surname').to.have.value.that.equals('');
        browser.expect.element('#othernames').to.have.value.that.equals('');

        browser.saveScreenshot(browser.globals.screenshots_folder + 'form-submit-new-application.png');

    }
}