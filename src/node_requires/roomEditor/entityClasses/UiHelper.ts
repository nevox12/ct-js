import {getPixiSwatch} from '../../themes';
import {RoomEditor} from '..';
import {IPixiUIElement} from './ui';

export class UiHelper extends PIXI.Graphics {
    editor: RoomEditor;
    target?: IPixiUIElement;
    constructor(editor: RoomEditor) {
        super();
        this.editor = editor;
        this.redrawFrame();
    }

    redrawFrame(): void {
        if (!this.target) {
            this.visible = false;
            return;
        }
        this.visible = true;
    }
}

