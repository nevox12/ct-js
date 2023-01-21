import {constructorMixin, destructorMixin, IPixiUIElement} from '.';
import {RoomEditor} from '../..';

import {getPixiTexture, getTextureFromId} from '../../../resources/textures';

const defaultTexture = PIXI.Texture.from('data/img/defaultButton.png');

export class UIButton extends PIXI.NineSlicePlane implements IPixiUIElement {
    settings: IRoomUIButton;
    editor: RoomEditor;
    room: RoomEditor['ctRoom'];
    disabledTexture: PIXI.Texture | null;
    normalTexture: PIXI.Texture | null;
    // eslint-disable-next-line max-params
    constructor(
        serialized: IRoomUIButton,
        editor: RoomEditor
    ) {
        const pixiTexture = serialized.texture === -1 ?
            defaultTexture :
            getPixiTexture(serialized.texture, 0);
        let ctTexture: ITexture | undefined;
        let leftWidth, rightWidth, topHeight, bottomHeight;
        if (serialized.use9patch) {
            ({leftWidth, rightWidth, topHeight, bottomHeight} = serialized.settings9patch);
        } else {
            leftWidth = rightWidth = topHeight = bottomHeight = 0;
        }
        super(
            pixiTexture,
            leftWidth, rightWidth, topHeight, bottomHeight
        );
        this.normalTexture = pixiTexture;
        // eslint-disable-next-line prefer-rest-params
        constructorMixin.apply(this, arguments);
        this.updateProps();
    }
    reposition(): void {
        this.x = this.settings.originPoint[0] * this.room.width + this.settings.position[0];
        this.y = this.settings.originPoint[1] * this.room.height + this.settings.position[1];
    }
    updateProps(): void {
        this.tint = this.settings.tint;
        if (this.settings.textureDisabled !== -1) {
            this.disabledTexture = getPixiTexture(this.settings.textureDisabled, 0);
            if (this.settings.disabled) {
                this.texture = this.disabledTexture;
            }
        }
    }
    destroy(options?: { children?: boolean; }): void {
        destructorMixin.apply(this);
        super.destroy(options);
    }
}
