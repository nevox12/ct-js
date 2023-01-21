room-ui-elements.flexfix(class="{opts.class}")
    .flexfix-header(if="{opts.room.uiElements?.length}")
        select(
            value="{currentElementIndex}"
            onchange="{selectElement}"
        )
            option(
                each="{element, ind in opts.room.uiElements}"
                value="{ind}"
                selected="{ind === currentElementIndex}"
            )
                | {element.name}
    .flexfix-body(if="{selectedUiElt}")
        fieldset
            label.flexrow
                svg.feather.nogrow(title="{elementTypeProps[currentElement.type].title}")
                    use(xlink:href="#{elementTypeProps[currentElement.type].icon}")
                .aSpacer.nogrow
                input(
                    type="text"
                    pattern="[_a-zA-Z][_a-zA-Z0-9]*"
                    value="{currentElement.name}"
                    onchange="{wire('this.currentElement.name')}"
                )
        fieldset
            extensions-editor(
                entity="{currentElement}"
                compact="yea"
                customextends="{currentExtensions}"
            )
        button.wide(onclick="{openEventsEditor}")
            svg.feather
                use(xlink:href="#code-alt")
            span {voc.events}
    .flexfix-footer.relative
        button.wide(onclick="{openAddElementMenu}")
            svg.feather
                use(xlink:href="#plus")
            span {voc.addNewElement}
    context-menu(menu="{addElementMenu}" ref="addelementmenu" style="bottom: 100%; right: 0;")
    script.
        this.namespace = 'roomUi';
        this.mixin(window.riotVoc);
        this.mixin(window.riotWired);

        const uiDefaults = require('./data/node_requires/resources/rooms/defaultUiElements');

        [this.currentElement] = this.opts.room.uiElements;
        this.currentElementIndex = 0;
        this.selectElement = e => {
            this.currentElement = this.opts.room.uiElements[Number(e.target.value)];
        };

        const getExts = () => {
            if (!this.currentElement) {
                this.currentExtensions = [];
                return;
            }
            const {type} = this.currentElement;
            const propsMap = this.elementTypeProps;
            this.currentExtensions = [{
                name: this.voc.depth,
                type: 'number',
                default: 0,
                key: 'depth'
            }];
            if (propsMap[type].useText) {
                this.currentExtensions.push(...[{
                    type: 'h3',
                    name: this.voc.label,
                }, {
                    name: this.voc.text,
                    type: 'text',
                    default: '',
                    key: 'text'
                }, {
                    name: 'this.voc.overrideStyles',
                    type: 'checkbox',
                    key: 'overrideTextStyle',
                    default: false
                }, {
                    name: this.voc.textStyleOverrides,
                    type: 'group',
                    if: 'overrideTextStyle',
                    key: 'textStyleOverrides',
                    items: [{
                        name: window.languageJSON.styleView.fontSize,
                        type: 'number',
                        min: 4,
                        step: 1,
                        key: 'fontSize'
                    }, {
                        name: window.languageJSON.styleView.fill,
                        type: 'color',
                        default: '#FFFFFF',
                        key: 'color'
                    }]
                }]);
            }
            this.currentExtensions.push({
                type: 'h3',
                name: this.voc.appearance
            });
            // Texture, button, and tint controls are intermixxed.
            // Suffer the hyperoptimized spaghetti.
            if (propsMap[type].useTexture) {
                this.currentExtensions.push({
                    name: this.vocGlob.assetTypes.textures[0].slice(0, 1).toUpperCase() + this.vocGlob.assetTypes.textures[0].slice(1),
                    type: 'texture',
                    key: 'texture'
                });
            }
            if (propsMap[type].useButtonLogic) {
                const textureEntries = ['textureHover', 'texturePress', 'textureDisabled'].map(key => ({
                    name: this.voc[key],
                    type: 'texture',
                    key
                }));
                this.currentExtensions.push(...textureEntries);
                this.currentExtensions.push({
                    name: this.voc.use9patch,
                    type: 'checkbox',
                    key: 'use9patch'
                });
            }
            if (propsMap[type].useTint) {
                this.currentExtensions.push({
                    name: this.voc.tint,
                    type: 'color',
                    key: 'tint',
                    noalpha: true
                });
            }
            if (propsMap[type].useButtonLogic) {
                const tintEntries = ['tintHover', 'tintPress', 'tintDisabled'].map(key => ({
                    name: this.voc[key],
                    type: 'color',
                    noalpha: true,
                    key
                }));
                this.currentExtensions.push(...tintEntries);
                // Disable / enable button switch
                this.currentExtensions.push({
                    type: 'checkbox',
                    name: this.voc.disabled,
                    key: 'disabled',
                    default: false
                });
            }
            this.currentExtensions.push({
                name: this.voc.opacity,
                type: 'slider',
                default: 1,
                key: 'alpha',
                min: 0,
                max: 1,
                step: 0.01
            });
            if (propsMap[type].use)
            // Sound options for buttons
            if (propsMap[type].useButtonLogic) {
                this.currentExtensions.push({
                    type: 'h3',
                    name: this.vocGlob.assetTypes.sounds[2].slice(0, 1).toUpperCase() + this.vocGlob.assetTypes.sounds[2].slice(1)
                });
                const buttonSoundEntries = ['soundHover', 'soundPress', 'soundPressDisabled'].map(key => ({
                    name: this.voc[key],
                    type: 'sound',
                    key
                }));
                this.currentExtensions.push(...buttonSoundEntries);
            }
            this.currentExtensions.push(...[{
                type: 'h3',
                name: this.voc.position
            }, {
                name: this.voc.measurementsUnits,
                type: 'select',
                key: 'measurements',
                options: [{
                    value: 'px',
                    name: this.voc.units.pixels
                }, {
                    value: '%',
                    name: this.voc.units.percent
                }]
            }, {
                name: this.voc.originPoint,
                type: 'point2D',
                default: [0.5, 0.5],
                key: 'pivot', // TODO: not right
            }, {
                name: this.voc.size,
                type: 'point2D',
                default: [0.5, 0.5],
                key: 'size',
            }, {
                name: this.voc.anchor,
                type: 'point2D',
                default: [0.5, 0.5],
                key: 'anchor',
            }, {
                name: this.voc.position,
                type: 'point2D',
                default: [0, 0],
                key: 'position',
            }, {
                name: this.voc.angle,
                type: 'slider',
                default: 1,
                key: 'angle',
                min: 0,
                max: 360,
                step: 0.1
            }, {
                name: this.voc.skew,
                type: 'point2D',
                default: [0, 0],
                key: 'skew',
                step: 0.01
            }, {
                name: this.voc.dynamics,
                type: 'h3'
            }, {
                name: this.voc.visibilityCondition,
                type: 'codestring',
                languageIcon: 'javascript',
                default: '',
                key: bindVisibilityExpression
            }]);
            if (propsMap[type].bindTextExpression) {
                this.currentExtensions.push({
                    name: this.voc.textExpression,
                    type: 'codestring',
                    languageIcon: 'javascript',
                    default: '',
                    key: bindTextExpression
                });
            }
            if (propsMap[type].bindTextureExpression) {
                this.currentExtensions.push({
                    name: this.voc.textureExpression,
                    type: 'codestring',
                    languageIcon: 'javascript',
                    default: '',
                    key: bindTextureExpression
                });
            }
        };
        this.elementTypeProps = {
            button: {
                icon: 'button',
                title: this.voc.elementTypes.button,
                defaultGetter: uiDefaults.getButton,

                bindTextExpression: true,
                useText: true,
                useTexture: true,
                useButtonLogic: true,
                use9patch: true,
                useTint: true
            },
            text: {
                icon: 'font',
                title: this.voc.elementTypes.textLabel,
                defaultGetter: uiDefaults.getTextLabel,

                bindTextExpression: true,
                useText: true
            },
            panel: {
                icon: 'square',
                title: this.voc.elementTypes.panel,
                defaultGetter: uiDefaults.getPanel,

                useTexture: true,
                use9patch: true,
                useTint: true
            },
            sprite: {
                icon: 'texture',
                title: this.voc.elementTypes.sprite,
                defaultGetter: uiDefaults.getSprite,

                useTexture: true,
                bindTextureExpression: true,
                useAnimations: true,
                useTint: true
            }
        };

        this.addElementMenu = {
            opened: false,
            items: ['text', 'sprite', 'panel', 'button'].map(type => ({
                label: this.elementTypeProps[type].title,
                icon: this.elementTypeProps[type].icon,
                click: () => {
                    this.addElement(this.elementTypeProps[type].defaultGetter());
                }
            }))
        };
        this.openAddElementMenu = e => {
            this.refs.addelementmenu.popup(e.clientX, e.clientY);
        };
        this.addElement = template => {
            const elt = this.opts.pixieditor.addUiElement(template);
            this.selectedUiElt = elt;
            this.update();
        };
