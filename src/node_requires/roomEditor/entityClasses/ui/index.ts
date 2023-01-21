import {RoomEditor} from '../..';

export interface IPixiUIElement extends PIXI.DisplayObject {
    settings: roomUiElement;
    editor: RoomEditor;
    room: RoomEditor['ctRoom'];
    reposition(): void;
    updateProps(): void;
}

export const constructorMixin = function (
    this: IPixiUIElement,
    serialized: roomUiElement,
    editor: RoomEditor
): void {
    this.editor = editor;
    this.room = editor.ctRoom;
    this.settings = serialized;
    editor.room.addChild(this);
    editor.uiElements.push(this);
    editor.uiElementToData.set(this, this.settings);
    editor.uiDataToElement.set(this.settings, this);
};
export const destructorMixin = function (this: IPixiUIElement): void {
    const i = this.editor.uiElements.indexOf(this);
    this.editor.uiElements.splice(i, 1);
    this.editor.uiDataToElement.delete(this.settings);
    this.editor.uiElementToData.delete(this);
};
