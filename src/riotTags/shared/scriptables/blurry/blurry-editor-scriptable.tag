blurry-editor-scriptable
    .flexrow.tall
        blurry-palette.tall
        .blurry-editor-scriptable-aCanvas
            blurry-block(each="{block in event.blocks.coreBlocks}")
    script.
        this.namespace = 'scriptables';
        this.mixin(window.riotVoc);

        const eventsAPI = require('./data/node_requires/events');
        this.allEvents = eventsAPI.events;
