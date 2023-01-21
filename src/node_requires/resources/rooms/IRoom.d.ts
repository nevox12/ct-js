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

declare interface ITileTemplate {
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

declare interface ITileLayerTemplate {
    depth: number;
    tiles: Array<ITileTemplate>,
    extends?: Record<string, unknown>
    hidden?: boolean;
}

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

declare interface IRoomUIElement {
    name: string,
    measurements: 'px' | '%',
    angle: number,
    alpha: number,
    skew: array2DPoint,

    // originPoint is the point inside the container from which an element is positioned.
    // Both size and originPoint use either in px or in %;
    // they can't use different measurement values.
    // Centering and other alignment is achieved by the regular element's anchor.
    anchor: array2DPoint,
    originPoint: array2DPoint,
    position: array2DPoint,

    size: array2DPoint,
    events: IScriptableEvent[],
    bindVisibilityExpression?: string,
    depth: number
}

declare interface IRoomUIText extends IRoomUIElement, IHasText {
    type: 'text'
}

declare interface IRoomUISprite extends IRoomUIElement {
    type: 'sprite',
    texture: assetRef;
    tint: number;
    animate: boolean;
    animationFramerate: number;
    bindTextureExpression?: string;
}

declare interface IRoomUIPanel extends IRoomUIElement {
    type: 'panel',
    texture: assetRef;
    tint: number;
}

declare interface IRoomUIButton extends IRoomUIElement, IHasText {
    type: 'button',
    texture: assetRef,
    tint: number,
    use9patch: boolean,
    settings9patch?: {
        leftWidth: number,
        rightWidth: number,
        topHeight: number,
        bottomHeight: number
    },
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

declare type roomUiElement = IRoomUIButton | IRoomUISprite | IRoomUIText | IRoomUIPanel;

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
