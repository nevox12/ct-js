import {blocks as ctTemplateBlocks} from './standardLib/templates';
import {blocks as jsLogicBlocks} from './standardLib/logic';

// TODO: appearance
// TODO: motion
// TODO: sound
// TODO: vars and properties
// TODO: math
// TODO: string manipulation
// TODO: array manipulation

export const getAllBlocks = (): Record<string, Record<string, blockDeclaration>> => {
    const blockLibs: Record<string, Record<string, blockDeclaration>> = {};
    for (const block of [
        ...ctTemplateBlocks,
        ...jsLogicBlocks
    ]) {
        if (!(block.lib in blockLibs)) {
            blockLibs[block.lib] = {};
        }
        blockLibs[block.lib][block.code] = block;
    }
    return blockLibs;
};

export const getToolbar = (): blockMenu => ({
    name: 'blocks',
    items: [{
        name: 'Templates and copies',
        i18nKey: 'templatesCopies',
        opened: false,
        items: ctTemplateBlocks
    }, {
        name: 'Logic and Flow Control',
        i18nKey: 'logicFlowControl',
        opened: false,
        items: jsLogicBlocks
    }],
    opened: true
});
