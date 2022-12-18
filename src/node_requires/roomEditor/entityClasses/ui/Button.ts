import {uiElementMixin, IUIElementDeserialized} from '.';
import {RoomEditor} from '../..';

const defaultTexture = PIXI.Texture.from('data/img/defaultButton.png');

class UIButton extends uiElementMixin(PIXI.NineSlicePlane) {
    constructor() {
        super(defaultTexture, 16, 16, 16, 16);
    }
}

// const UIButton = uiElementMixin(PIXI.NineSlicePlane);

