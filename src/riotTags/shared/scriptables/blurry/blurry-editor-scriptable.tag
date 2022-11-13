blurry-editor-scriptable
    script.
        this.namespace = 'scriptables';
        this.mixin(window.riotVoc);

        const eventsAPI = require('./data/node_requires/events');
        this.allEvents = eventsAPI.events;
