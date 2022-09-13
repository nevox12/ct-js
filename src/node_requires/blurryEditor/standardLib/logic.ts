const ifBlock: IBlockCommandDeclaration = {
    type: 'command',
    icon: 'help-circle',
    name: 'If',
    i18nKey: 'if',
    pieces: [{
        type: 'argument',
        key: 'condition',
        typeHint: 'boolean',
        required: true
    }, {
        type: 'blocks',
        key: 'then'
    }, {
        type: 'icon',
        icon: 'slash'
    }, {
        type: 'label',
        name: 'else',
        i18nKey: 'else'
    }, {
        type: 'blocks',
        key: 'else'
    }],
    lib: 'core.logic',
    code: 'if',
    jsTemplate: (args) => {
        if (args.else) {
            return `if (${args.condition}) {
    ${args.then}
} else {
    ${args.else}
}`;
        }
        return `if (${args.condition}) {
${args.then}
}`;
    }
};

const whileBlock: IBlockCommandDeclaration = {
    type: 'command',
    icon: 'rotate-cw',
    name: 'While',
    i18nKey: 'while',
    pieces: [{
        type: 'argument',
        key: 'condition',
        typeHint: 'boolean',
        required: true
    }, {
        type: 'blocks',
        key: 'do'
    }],
    lib: 'core.logic',
    code: 'while',
    jsTemplate: (args) => `while (${args.condition}) {
    ${args.do}
}`
};

const forEachBlock: IBlockCommandDeclaration = {
    type: 'command',
    icon: 'rotate-cw',
    name: 'For each',
    i18nKey: 'forEach',
    pieces: [{
        type: 'argument',
        key: 'iterable',
        typeHint: 'wildcard',
        required: true
    }, {
        type: 'label',
        name: 'as',
        i18nKey: 'as'
    }, {
        type: 'argument',
        key: 'variable',
        typeHint: 'wildcard',
        required: true
    }, {
        type: 'blocks',
        key: 'do'
    }],
    lib: 'core.logic',
    code: 'forEach',
    jsTemplate: (args) => `for (${args.argument} of ${args.iterable}) {
    ${args.do}
}`
};

const withCopyBlock: IBlockCommandDeclaration = {
    type: 'command',
    icon: 'rotate-cw',
    name: 'With copy',
    i18nKey: 'withCopy',
    pieces: [{
        type: 'argument',
        key: 'target',
        typeHint: 'wildcard'
    }, {
        type: 'blocks',
        key: 'do'
    }],
    lib: 'core.logic',
    code: 'withCopy',
    jsTemplate: (args) => `(function () {
    ${args.do}
}).apply(${args.target}})`
};

const andComputed: IBlockComputedDeclaration = {
    type: 'computed',
    pieces: [{
        type: 'argument',
        typeHint: 'boolean',
        key: 'left'
    }, {
        type: 'label',
        name: 'and',
        i18nKey: 'and'
    }, {
        type: 'argument',
        typeHint: 'boolean',
        key: 'right'
    }],
    lib: 'core.logic',
    typeHint: 'boolean',
    code: 'and',
    jsTemplate: (args) => `(${args.left} || ${args.right})`
};

const orComputed: IBlockComputedDeclaration = {
    type: 'computed',
    pieces: [{
        type: 'argument',
        typeHint: 'boolean',
        key: 'left'
    }, {
        type: 'label',
        name: 'or',
        i18nKey: 'or'
    }, {
        type: 'argument',
        typeHint: 'boolean',
        key: 'right'
    }],
    typeHint: 'boolean',
    lib: 'core.logic',
    code: 'and',
    jsTemplate: (args) => `(${args.left} && ${args.right})`
};

export const blocks: blockDeclaration[] = [
    ifBlock,
    whileBlock,
    forEachBlock,
    withCopyBlock,
    andComputed,
    orComputed
];
