type canvasPatternRepeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';

interface IRoomBackground {
    depth: number,
    texture: assetRef,
    parallaxX: number,
    parallaxY: number,
    shiftX: number,
    shiftY: number,
    movementX: number,
    movementY: number,
    scaleX: number,
    scaleY: number,
    repeat: canvasPatternRepeat
}

interface IRoomCopy {
    x: number,
    y: number,
    uid: string,
    scale: {
        x: number,
        y: number
    },
    rotation?: number,
    tint?: number,
    opacity?: number,
    exts: {
        [key: string]: unknown
    },
    customProperties: Record<string, unknown>
}

interface ITileTemplate {
    x: number;
    y: number;
    opacity: number;
    tint: number;
    frame: number;
    scale: {
        x: number,
        y: number
    };
    rotation: number;
    texture: string;
}

interface ITileLayerTemplate {
    depth: number;
    tiles: Array<ITileTemplate>,
    extends?: Record<string, unknown>
    hidden?: boolean;
}

declare type array2DPoint = [number, number];

interface IHasText {
    text: string,
    overrideTextStyle: boolean,
    textStyle: assetRef,
    textStyleOverrides: {
        fontSize?: number,
        color?: number,
    },
    bindTextExpression?: string
}

declare interface IUIElement {
    name: string,
    measurements: 'px' | '%',
    angle: number,
    alpha: number,
    skew: array2DPoint,
    pivot: array2DPoint,
    originPoint: array2DPoint,
    position: array2DPoint,
    size: array2DPoint,
    events: IScriptableEvent[],
    bindVisibilityExpression?: string,
    depth: number
}

declare interface IUIText extends IUIElement, IHasText {
    type: 'text'
}

declare interface IUISprite extends IUIElement {
    type: 'sprite',
    texture: assetRef;
    tint: number;
    animate: boolean;
    animationFramerate: number;
    bindTextureExpression?: string;
}

declare interface IUIPanel extends IUIElement {
    type: 'panel',
    texture: assetRef;
    tint: number;
}

declare interface IUIButton extends IUIElement, IHasText {
    type: 'button',
    texture: assetRef,
    tint: number,
    use9patch: boolean,
    bindDisabledExpression?: string,
    textureHover: assetRef,
    texturePress: assetRef,
    textureDisabled: assetRef,
    tintHover: number,
    tintPress: number,
    tintDisabled: number,
    disabled: boolean,
    soundHover: assetRef,
    soundPress: assetRef,
    soundPressDisabled: assetRef
}

declare type uiElement = IUIButton | IUISprite | IUIText | IUIPanel;

declare interface IRoom extends IScriptable {
    width: number;
    height: number;
    /** A CSS color */
    backgroundColor: string;
    backgrounds: Array<IRoomBackground>;
    copies: Array<IRoomCopy>;
    tiles: Array<ITileLayerTemplate>;
    gridX: number;
    gridY: number;
    diagonalGrid: boolean;
    simulate: boolean;
    restrictCamera?: boolean;
    restrictMinX?: number;
    restrictMinY?: number;
    restrictMaxX?: number;
    restrictMaxY?: number;
    follow: assetRef;
    isUi: boolean;
    extends: {
        [key: string]: unknown
    };
}
