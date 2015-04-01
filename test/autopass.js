var vows = require('vows'),
    assert = require('assert');

vows.describe('Sample Test').addBatch({
    'Context 1': {
        topic: 0,
        'case 1': function(topic) {
            assert.equal(topic, 0);
        }
    }
}).export(module);
