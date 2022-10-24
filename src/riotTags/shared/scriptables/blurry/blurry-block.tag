blurry-block(class="{opts.class} {declaration.type}")
    svg.feather(if="{declaration.icon}")
        use(xlink:href="#{declaration.icon}")
    virtual(each="{piece in declaration.pieces}")
        svg.feather(if="{piece.type === 'icon'}")
            use(xlink:href="#{piece.icon}")
        span.blurry-block-aLabel(if="{piece.type === 'label'}") {piece.label}
        // TODO: make a code editor integration
        span.anEmptyArgument(
            if="{piece.type === 'argument' && !opts.block.values[piece.key]}"
            class="{piece.typeHint}"
        )
        blurry-block(
            if="{piece.type === 'argument' && opts.block.values[piece.key]}"
            class="{piece.typeHint}"
            block="{opts.block.values[piece.key]}"
            draggable="draggable"
        )
        textarea.wide(
            if="{piece.type === 'textbox'}"
            value="{opts.block.values[piece.key] || piece.default}"
        )
        .blurry-block-Blocks(
            if="{piece.type === 'blocks'}"
        )
            blurry-block(
                each="{block in opts.block.values[piece.key]}"
                block="{block}"
                draggable="draggable"
            )

    script.
        // TODO: add `declaration` property
