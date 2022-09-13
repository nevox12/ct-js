const createCopy: IBlockCommandDeclaration = {
    type: 'command',
    icon: 'template',
    name: 'Create a copy of template',
    i18nKey: 'createCopy',
    pieces: [{
        type: 'argument',
        key: 'template',
        typeHint: 'string',
        required: true
    }, {
        type: 'label',
        name: 'at',
        i18nKey: 'atPlace'
    }, {
        type: 'label',
        name: 'x:'
    }, {
        type: 'argument',
        key: 'x',
        typeHint: 'number',
        defaultConstant: '0'
    }, {
        type: 'label',
        name: 'y:'
    }, {
        type: 'argument',
        key: 'y',
        typeHint: 'number',
        defaultConstant: '0'
    }],
    jsTemplate(args) {
        return `ct.templates.copy(${args.template}, ${args.x}, ${args.y});`;
    },
    lib: 'core.templates',
    code: 'copy'
};

const createCopyIntoRoom: IBlockCommandDeclaration = {
    type: 'command',
    icon: 'template',
    name: 'Create a copy of template',
    i18nKey: 'createCopy',
    pieces: [{
        type: 'argument',
        key: 'template',
        typeHint: 'string',
        required: true
    }, {
        type: 'label',
        name: 'at',
        i18nKey: 'atPlace'
    }, {
        type: 'label',
        name: 'x:'
    }, {
        type: 'argument',
        key: 'x',
        typeHint: 'number',
        defaultConstant: '0'
    }, {
        type: 'label',
        name: 'y:'
    }, {
        type: 'argument',
        key: 'y',
        typeHint: 'number',
        defaultConstant: '0'
    }, {
        type: 'label',
        name: 'inside',
        i18nKey: 'inside'
    }, {
        type: 'argument',
        key: 'parent',
        typeHint: 'wildcard',
        required: true
    }],
    jsTemplate(args) {
        return `ct.templates.copyIntoRoom(${args.template}, ${args.x}, ${args.y}, ${args.parent});`;
    },
    lib: 'core.templates',
    code: 'copyIntoRoom'
};

const killCopy: IBlockCommandDeclaration = {
    type: 'command',
    icon: 'trash',
    name: 'Destroy this copy',
    i18nKey: 'killCopy',
    jsTemplate() {
        return 'this.kill = true;';
    },
    lib: 'core.templates',
    code: 'killCopy'
};

const templatesList: IBlockComputedDeclaration = {
    type: 'computed',
    pieces: [{
        type: 'label',
        name: 'all copies of template',
        i18nKey: 'templatesList'
    }, {
        type: 'argument',
        typeHint: 'string',
        required: true,
        key: 'template'
    }],
    jsTemplate(args) {
        return `ct.templates.list(${args.template});`;
    },
    typeHint: 'wildcard',
    lib: 'core.templates',
    code: 'templatesList'
};

const isCopy: IBlockComputedDeclaration = {
    type: 'computed',
    pieces: [{
        type: 'label',
        name: 'is',
        i18nKey: 'isCopyIs'
    }, {
        type: 'argument',
        typeHint: 'wildcard',
        required: true,
        key: 'obj'
    }, {
        type: 'label',
        name: 'a copy',
        i18nKey: 'isCopyCopy'
    }],
    jsTemplate(args) {
        return `ct.templates.isCopy(${args.obj});`;
    },
    typeHint: 'boolean',
    lib: 'core.templates',
    code: 'isCopy'
};

const valid: IBlockComputedDeclaration = {
    type: 'computed',
    pieces: [{
        type: 'label',
        name: 'is',
        i18nKey: 'isValidIs'
    }, {
        type: 'argument',
        typeHint: 'wildcard',
        required: true,
        key: 'obj'
    }, {
        type: 'label',
        name: 'valid?',
        i18nKey: 'isValidValid'
    }],
    jsTemplate(args) {
        return `ct.templates.valid(${args.obj});`;
    },
    typeHint: 'boolean',
    lib: 'core.templates',
    code: 'valid'
};

export const blocks = [
    createCopy,
    createCopyIntoRoom,
    killCopy,
    templatesList,
    isCopy,
    valid
];
