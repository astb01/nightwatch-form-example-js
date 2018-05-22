module.exports = {
    beforeEach: function(browser){
        browser
            .url(browser.globals.base_app_url)
            .waitForElementVisible('body', 3000)
            .click(browser.globals.about_child_lives_tab_id)
            .pause(3000);

        browser.expect.element('#street').to.be.visible;
        browser.expect.element('#city').to.be.visible;
        browser.expect.element('#postcode').to.be.visible;
        browser.expect.element('#nationality').to.be.visible;
        browser.expect.element('#claimingY').to.be.visible;
        browser.expect.element('#claimingN').to.be.visible;
        browser.expect.element('#uklivingY').to.be.visible;
        browser.expect.element('#uklivingN').to.be.visible;
        browser.expect.element('#abroad4weeksY').to.be.visible;
        browser.expect.element('#abroad4weeksN').to.be.visible;
    },
    after: function(browser){
        console.log('Closing browser');
        browser.end();
    },
    "When all required fields populated no errors displayed": function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', 'L1 2ED')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);

        browser
            .assert.visible('#about-child-lives-tab-ok')
            .expect.element('#about-child-lives-tab-errors').to.not.be.present;    

        browser.saveScreenshot(browser.globals.screenshots_folder + 'about-child-lives-all-required.png');
    },
    "When 'Street' not provided then error is displayed": function(browser){
        browser
            .useCss()
            .setValue('#city', 'London')
            .setValue('#postcode', 'L1 2ED')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);

        browser
            .assert.visible('#about-child-lives-tab-errors')
            .assert.visible('.street_error')
            .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    },
    "When 'City/Town' not provided then error is displayed" : function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#postcode', 'L1 2ED')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);

        browser
            .assert.visible('#about-child-lives-tab-errors')
            .assert.visible('.city_error')
            .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    },
    "When 'Post Code' not provided then error is displayed" : function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);
        
        browser
            .assert.visible('#about-child-lives-tab-errors')
            .assert.visible('.postcode_error')
            .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    },
    "When 'Post Code' not valid then error is displayed" : function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', '1234569')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);
            
        browser
            .assert.visible('#about-child-lives-tab-errors')
            .assert.visible('.postcode_error')
            .assert.containsText('.postcode_error', 'Post Code must be a valid UK postal code')
            .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    },
    "When 'Nationality' not provided then error is displayed" : function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', '1234569')
            .click('#claimingY')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);
            
        browser
            .assert.visible('#about-child-lives-tab-errors')
            .assert.visible('.nationality_error')
            .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    },
    "When 'Claiming' option not provided then error is displayed": function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', '1234569')
            .click('#uklivingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);
        
    browser
        .assert.visible('#about-child-lives-tab-errors')
        .assert.visible('.claiming_error')
        .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    },
    "When 'Uk Living' option not provided then error is displayed": function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', '1234569')
            .setValue('#nationality', 'British')
            .click('#claimingY')
            .click('#abroad4weeksN')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);
            
        browser
            .assert.visible('#about-child-lives-tab-errors')
            .assert.visible('.ukliving_error')
            .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    },
    "When 'Abroad for 4 weeks' option not provided then error is displayed": function(browser){
        browser
            .useCss()
            .setValue('#street', 'Test Street')
            .setValue('#city', 'Liverpool')
            .setValue('#postcode', '1234569')
            .setValue('#nationality', 'British')
            .click('#uklivingY')
            .click('#claimingY')
            .click('#submitBtn')
            .click(browser.globals.about_child_lives_tab_id)
            .pause(500);
        
        browser
            .assert.visible('#about-child-lives-tab-errors')
            .assert.visible('.abroad4weeks_error')
            .expect.element('#about-child-lives-tab-ok').to.not.be.present;
    }
}