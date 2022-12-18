//
    @attribute target (IRoom|IUIElement)
    @attribute entitytype ('room'|'button'|'text'|'panel'|'sprite')
    @attribute name (string)
    @attribute onsave (riot function)
room-events-editor.aView.flexrow.pad
    .tall.flexfix.aPanel.pad.room-events-editor-Properties.nogrow
        .flexfix-header
            h3
                svg.feather
                    use(xlink:href="#{entityTypeToIcon[opts.entitytype]}")
                |
                |
                span {opts.name}
            .aSpacer
        .flexfix-body
            event-list-scriptable.tall(
                events="{target.events}"
                entitytype="{opts.entitytype}"
                onchanged="{changeCodeTab}"
                currentevent="{currentSheet}"
            )
        .flexfix-footer
            .aSpacer
            button.wide(onclick="{saveEvents}" title="Shift+Control+S" data-hotkey="Shift+Control+S")
                svg.feather
                    use(xlink:href="#check")
                span {voc.done}
    .tabwrap.tall(style="position: relative")
        code-editor-scriptable(event="{currentSheet}" entitytype="{opts.entitytype}" ref="codeeditor")
    script.
        this.namespace = 'roomView';
        this.mixin(window.riotVoc);

        this.entityTypeToIcon = {
            room: 'room',
            button: 'button',
            text: 'font',
            panel: 'square',
            sprite: 'texture'
        };

        this.target = this.opts.target;
        [this.currentSheet] = this.target.events; // can be undefined, this is ok

        this.focusEditor = () => {
            this.refs.codeeditor.codeEditor.focus();
        };
        window.signals.on('roomsFocus', this.focusEditor);
        this.on('unmount', () => {
            window.signals.off('roomsFocus', this.focusEditor);
        });

        this.changeCodeTab = scriptableEvent => {
            this.currentSheet = scriptableEvent;
            this.update();
        };

        this.saveEvents = () => {
            this.opts.onsave();
        };
