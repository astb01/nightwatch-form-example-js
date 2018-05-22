module.exports = {
    "Should Display 'About The Child' When Form First Opened": function(browser) {
        browser
            .url(browser.globals.base_app_url)
            .waitForElementVisible('body', 1000)
            .pause(500)
            .assert.containsText('h2', 'About the child')
            .end();
    }
}