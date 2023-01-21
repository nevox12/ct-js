const uiDefaults: IRoomUIElement = {
    name: 'newElement',
    alpha: 1,
    angle: 0,
    depth: 0,
    get events(): IScriptableEvent[] {
        return [];
    },
    get skew(): array2DPoint {
        return [0, 0];
    },
    get anchor(): array2DPoint {
        return [0, 0];
    },
    measurements: 'px',
    get originPoint(): array2DPoint {
        return [0.5, 0.5];
    },
    get position(): array2DPoint {
        return [0, 0];
    },
    get size(): array2DPoint {
        return [128, 64];
    },
    bindVisibilityExpression: ''
};

export const getButton = function (): IRoomUIButton {
    return Object.assign({}, uiDefaults, {
        type: 'button' as const,
        name: 'newButton',

        texture: -1 as assetRef,
        textureHover: -1 as assetRef,
        texturePress: -1 as assetRef,
        textureDisabled: -1 as assetRef,

        tint: 0xFFFFFF,
        tintHover: 0xFFFFFF,
        tintPress: 0xFFFFFF,
        tintDisabled: 0x999999,

        soundHover: -1 as assetRef,
        soundPress: -1 as assetRef,
        soundPressDisabled: -1 as assetRef,

        use9patch: false,
        settings9patch: {
            leftWidth: 16,
            rightWidth: 16,
            topHeight: 16,
            bottomHeight: 16
        },
        disabled: false,
        text: 'Lorem Catsum',
        textStyle: -1 as assetRef,
        overrideTextStyle: false,
        textStyleOverrides: {}
    });
};
export const getTextLabel = function (): IRoomUIText {
    return Object.assign({}, uiDefaults, {
        type: 'text' as const,
        name: 'newLabel',
        text: 'Lorem Catsum',
        textStyle: -1 as assetRef,
        overrideTextStyle: false,
        textStyleOverrides: {}
    });
};
export const getPanel = function (): IRoomUIPanel {
    return Object.assign({}, uiDefaults, {
        type: 'panel' as const,
        name: 'newPanel',
        texture: -1 as assetRef,
        tint: 0xFFFFFF
    });
};
export const getSprite = function (): IRoomUISprite {
    return Object.assign({}, uiDefaults, {
        type: 'sprite' as const,
        name: 'newSprite',
        texture: -1 as assetRef,
        tint: 0xFFFFFF,
        animate: false,
        animationFramerate: 30
    });
};
