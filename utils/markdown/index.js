// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import marked from 'marked';

import {convertEntityToCharacter} from 'utils/text_formatting.jsx';
import RemoveMarkdown from 'utils/markdown/remove_markdown';

import Renderer from './renderer';
const removeMarkdown = new RemoveMarkdown();

export function format(text, options = {}) {
    return formatWithRenderer(text, new Renderer(null, options), options);
}

export function formatWithRenderer(text, renderer, options) {
    const markdownOptions = {
        renderer,
        sanitize: true,
        gfm: true,
        tables: true,
        mangle: false,
    };

    let result = '';
    if (window.wasmSupported) {
        result = window.wasm.domarkdown('faces');//text, 'yourface');
    } else {
        result = marked(text, markdownOptions);
    }

    return result;
}

export function stripMarkdown(text) {
    if (typeof text === 'string' && text.length > 0) {
        return convertEntityToCharacter(formatWithRenderer(text, removeMarkdown)).trim();
    }

    return text;
}
