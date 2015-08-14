(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * RGUI      Regular UI库
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var RGUI = {}

/**
 * base
 */
RGUI.Regular = require('regularjs');
RGUI.Component = require('./base/component.js');
RGUI._ = require('./base/util.js');
RGUI.request = require('./base/request.js');

/**
 * jsUnit
 */
// 导航类
RGUI.Dropdown = require('./unit/dropdown.js');
RGUI.Menu = require('./unit/menu.js');

// 表单类
RGUI.Input2 = require('./unit/input2.js');
RGUI.NumberInput = require('./unit/numberInput.js');
RGUI.Check2 = require('./unit/check2.js');
RGUI.CheckGroup = require('./unit/checkGroup.js');
RGUI.Check2Group = require('./unit/check2Group.js');
RGUI.RadioGroup = require('./unit/radioGroup.js');
RGUI.Radio2Group = require('./unit/radio2Group.js');
RGUI.Select2 = require('./unit/select2.js');
RGUI.TreeSelect = require('./unit/treeSelect.js');
RGUI.Suggest = require('./unit/suggest.js');
RGUI.Uploader = require('./unit/uploader.js');

// 日期类
RGUI.DatePicker = require('./unit/datePicker.js');
RGUI.TimePicker = require('./unit/timePicker.js');
RGUI.DateTimePicker = require('./unit/dateTimePicker.js');

// 其他
RGUI.Progress = require('./unit/progress.js');
RGUI.Gotop = require('./unit/gotop.js');

/**
 * jsModule
 */
// 导航类
RGUI.Tab = require('./module/tab.js');
RGUI.Accordion = require('./module/accordion.js');
RGUI.Pager = require('./module/pager.js');
RGUI.Menubar = require('./module/menubar.js');

// 窗口类
RGUI.Notify = require('./module/notify.js');
RGUI.Modal = require('./module/modal.js');

// 数据类
RGUI.ListView = require('./module/listView.js');
RGUI.GridView = require('./module/gridView.js');
RGUI.TreeView = require('./module/treeView.js');
RGUI.TableView = require('./module/tableView.js');

// 日期类
RGUI.Calendar = require('./module/calendar.js');

// 上传类
//

// 编辑器类
RGUI.Editor = require('./module/editor.js');
RGUI.HTMLEditor = require('./module/htmlEditor.js');
RGUI.MarkEditor = require('./module/markEditor.js');

module.exports = window.RGUI = RGUI;
},{"./base/component.js":32,"./base/request.js":34,"./base/util.js":36,"./module/accordion.js":39,"./module/calendar.js":42,"./module/editor.js":44,"./module/gridView.js":46,"./module/htmlEditor.js":48,"./module/listView.js":50,"./module/markEditor.js":52,"./module/menubar.js":54,"./module/modal.js":56,"./module/notify.js":58,"./module/pager.js":60,"./module/tab.js":62,"./module/tableView.js":64,"./module/treeView.js":66,"./unit/check2.js":69,"./unit/check2Group.js":71,"./unit/checkGroup.js":73,"./unit/datePicker.js":75,"./unit/dateTimePicker.js":77,"./unit/dropdown.js":79,"./unit/gotop.js":81,"./unit/input2.js":83,"./unit/menu.js":85,"./unit/numberInput.js":88,"./unit/progress.js":90,"./unit/radio2Group.js":92,"./unit/radioGroup.js":94,"./unit/select2.js":96,"./unit/suggest.js":98,"./unit/timePicker.js":99,"./unit/treeSelect.js":101,"./unit/uploader.js":103,"regularjs":23}],2:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9tYXJrZWQvbGliL21hcmtlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtYXJrZWQgLSBhIG1hcmtkb3duIHBhcnNlclxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTQsIENocmlzdG9waGVyIEplZmZyZXkuIChNSVQgTGljZW5zZWQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWRcbiAqL1xuXG47KGZ1bmN0aW9uKCkge1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xuXG52YXIgYmxvY2sgPSB7XG4gIG5ld2xpbmU6IC9eXFxuKy8sXG4gIGNvZGU6IC9eKCB7NH1bXlxcbl0rXFxuKikrLyxcbiAgZmVuY2VzOiBub29wLFxuICBocjogL14oICpbLSpfXSl7Myx9ICooPzpcXG4rfCQpLyxcbiAgaGVhZGluZzogL14gKigjezEsNn0pICooW15cXG5dKz8pICojKiAqKD86XFxuK3wkKS8sXG4gIG5wdGFibGU6IG5vb3AsXG4gIGxoZWFkaW5nOiAvXihbXlxcbl0rKVxcbiAqKD18LSl7Mix9ICooPzpcXG4rfCQpLyxcbiAgYmxvY2txdW90ZTogL14oICo+W15cXG5dKyhcXG4oPyFkZWYpW15cXG5dKykqXFxuKikrLyxcbiAgbGlzdDogL14oICopKGJ1bGwpIFtcXHNcXFNdKz8oPzpocnxkZWZ8XFxuezIsfSg/ISApKD8hXFwxYnVsbCApXFxuKnxcXHMqJCkvLFxuICBodG1sOiAvXiAqKD86Y29tbWVudCAqKD86XFxufFxccyokKXxjbG9zZWQgKig/OlxcbnsyLH18XFxzKiQpfGNsb3NpbmcgKig/OlxcbnsyLH18XFxzKiQpKS8sXG4gIGRlZjogL14gKlxcWyhbXlxcXV0rKVxcXTogKjw/KFteXFxzPl0rKT4/KD86ICtbXCIoXShbXlxcbl0rKVtcIildKT8gKig/Olxcbit8JCkvLFxuICB0YWJsZTogbm9vcCxcbiAgcGFyYWdyYXBoOiAvXigoPzpbXlxcbl0rXFxuPyg/IWhyfGhlYWRpbmd8bGhlYWRpbmd8YmxvY2txdW90ZXx0YWd8ZGVmKSkrKVxcbiovLFxuICB0ZXh0OiAvXlteXFxuXSsvXG59O1xuXG5ibG9jay5idWxsZXQgPSAvKD86WyorLV18XFxkK1xcLikvO1xuYmxvY2suaXRlbSA9IC9eKCAqKShidWxsKSBbXlxcbl0qKD86XFxuKD8hXFwxYnVsbCApW15cXG5dKikqLztcbmJsb2NrLml0ZW0gPSByZXBsYWNlKGJsb2NrLml0ZW0sICdnbScpXG4gICgvYnVsbC9nLCBibG9jay5idWxsZXQpXG4gICgpO1xuXG5ibG9jay5saXN0ID0gcmVwbGFjZShibG9jay5saXN0KVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoJ2hyJywgJ1xcXFxuKyg/PVxcXFwxPyg/OlstKl9dICopezMsfSg/OlxcXFxuK3wkKSknKVxuICAoJ2RlZicsICdcXFxcbisoPz0nICsgYmxvY2suZGVmLnNvdXJjZSArICcpJylcbiAgKCk7XG5cbmJsb2NrLmJsb2NrcXVvdGUgPSByZXBsYWNlKGJsb2NrLmJsb2NrcXVvdGUpXG4gICgnZGVmJywgYmxvY2suZGVmKVxuICAoKTtcblxuYmxvY2suX3RhZyA9ICcoPyEoPzonXG4gICsgJ2F8ZW18c3Ryb25nfHNtYWxsfHN8Y2l0ZXxxfGRmbnxhYmJyfGRhdGF8dGltZXxjb2RlJ1xuICArICd8dmFyfHNhbXB8a2JkfHN1YnxzdXB8aXxifHV8bWFya3xydWJ5fHJ0fHJwfGJkaXxiZG8nXG4gICsgJ3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZylcXFxcYilcXFxcdysoPyE6L3xbXlxcXFx3XFxcXHNAXSpAKVxcXFxiJztcblxuYmxvY2suaHRtbCA9IHJlcGxhY2UoYmxvY2suaHRtbClcbiAgKCdjb21tZW50JywgLzwhLS1bXFxzXFxTXSo/LS0+LylcbiAgKCdjbG9zZWQnLCAvPCh0YWcpW1xcc1xcU10rPzxcXC9cXDE+LylcbiAgKCdjbG9zaW5nJywgLzx0YWcoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vKVxuICAoL3RhZy9nLCBibG9jay5fdGFnKVxuICAoKTtcblxuYmxvY2sucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnaHInLCBibG9jay5ocilcbiAgKCdoZWFkaW5nJywgYmxvY2suaGVhZGluZylcbiAgKCdsaGVhZGluZycsIGJsb2NrLmxoZWFkaW5nKVxuICAoJ2Jsb2NrcXVvdGUnLCBibG9jay5ibG9ja3F1b3RlKVxuICAoJ3RhZycsICc8JyArIGJsb2NrLl90YWcpXG4gICgnZGVmJywgYmxvY2suZGVmKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLm5vcm1hbCA9IG1lcmdlKHt9LCBibG9jayk7XG5cbi8qKlxuICogR0ZNIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5nZm0gPSBtZXJnZSh7fSwgYmxvY2subm9ybWFsLCB7XG4gIGZlbmNlczogL14gKihgezMsfXx+ezMsfSlbIFxcLl0qKFxcUyspPyAqXFxuKFtcXHNcXFNdKj8pXFxzKlxcMSAqKD86XFxuK3wkKS8sXG4gIHBhcmFncmFwaDogL14vLFxuICBoZWFkaW5nOiAvXiAqKCN7MSw2fSkgKyhbXlxcbl0rPykgKiMqICooPzpcXG4rfCQpL1xufSk7XG5cbmJsb2NrLmdmbS5wYXJhZ3JhcGggPSByZXBsYWNlKGJsb2NrLnBhcmFncmFwaClcbiAgKCcoPyEnLCAnKD8hJ1xuICAgICsgYmxvY2suZ2ZtLmZlbmNlcy5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDInKSArICd8J1xuICAgICsgYmxvY2subGlzdC5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDMnKSArICd8JylcbiAgKCk7XG5cbi8qKlxuICogR0ZNICsgVGFibGVzIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay50YWJsZXMgPSBtZXJnZSh7fSwgYmxvY2suZ2ZtLCB7XG4gIG5wdGFibGU6IC9eICooXFxTLipcXHwuKilcXG4gKihbLTpdKyAqXFx8Wy18IDpdKilcXG4oKD86LipcXHwuKig/OlxcbnwkKSkqKVxcbiovLFxuICB0YWJsZTogL14gKlxcfCguKylcXG4gKlxcfCggKlstOl0rWy18IDpdKilcXG4oKD86ICpcXHwuKig/OlxcbnwkKSkqKVxcbiovXG59KTtcblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG5cbmZ1bmN0aW9uIExleGVyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbnMubGlua3MgPSB7fTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMucnVsZXMgPSBibG9jay5ub3JtYWw7XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhYmxlcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLnRhYmxlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLmdmbTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgQmxvY2sgUnVsZXNcbiAqL1xuXG5MZXhlci5ydWxlcyA9IGJsb2NrO1xuXG4vKipcbiAqIFN0YXRpYyBMZXggTWV0aG9kXG4gKi9cblxuTGV4ZXIubGV4ID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zKSB7XG4gIHZhciBsZXhlciA9IG5ldyBMZXhlcihvcHRpb25zKTtcbiAgcmV0dXJuIGxleGVyLmxleChzcmMpO1xufTtcblxuLyoqXG4gKiBQcmVwcm9jZXNzaW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLmxleCA9IGZ1bmN0aW9uKHNyYykge1xuICBzcmMgPSBzcmNcbiAgICAucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJylcbiAgICAucmVwbGFjZSgvXFx0L2csICcgICAgJylcbiAgICAucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpXG4gICAgLnJlcGxhY2UoL1xcdTI0MjQvZywgJ1xcbicpO1xuXG4gIHJldHVybiB0aGlzLnRva2VuKHNyYywgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIExleGluZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS50b2tlbiA9IGZ1bmN0aW9uKHNyYywgdG9wLCBicSkge1xuICB2YXIgc3JjID0gc3JjLnJlcGxhY2UoL14gKyQvZ20sICcnKVxuICAgICwgbmV4dFxuICAgICwgbG9vc2VcbiAgICAsIGNhcFxuICAgICwgYnVsbFxuICAgICwgYlxuICAgICwgaXRlbVxuICAgICwgc3BhY2VcbiAgICAsIGlcbiAgICAsIGw7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIG5ld2xpbmVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5uZXdsaW5lLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChjYXBbMF0ubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnc3BhY2UnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvZGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGNhcCA9IGNhcFswXS5yZXBsYWNlKC9eIHs0fS9nbSwgJycpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdjb2RlJyxcbiAgICAgICAgdGV4dDogIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICAgID8gY2FwLnJlcGxhY2UoL1xcbiskLywgJycpXG4gICAgICAgICAgOiBjYXBcbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZmVuY2VzIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZmVuY2VzLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIGxhbmc6IGNhcFsyXSxcbiAgICAgICAgdGV4dDogY2FwWzNdIHx8ICcnXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGhlYWRpbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMV0ubGVuZ3RoLFxuICAgICAgICB0ZXh0OiBjYXBbMl1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFibGUgbm8gbGVhZGluZyBwaXBlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy5ucHRhYmxlLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogY2FwWzFdLnJlcGxhY2UoL14gKnwgKlxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgYWxpZ246IGNhcFsyXS5yZXBsYWNlKC9eICp8XFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBjZWxsczogY2FwWzNdLnJlcGxhY2UoL1xcbiQvLCAnJykuc3BsaXQoJ1xcbicpXG4gICAgICB9O1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5hbGlnbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoL14gKi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAncmlnaHQnO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdjZW50ZXInO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSsgKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW0uY2VsbHNbaV0gPSBpdGVtLmNlbGxzW2ldLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goaXRlbSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGhlYWRpbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgZGVwdGg6IGNhcFsyXSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgIHRleHQ6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoclxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmhyLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaHInXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJsb2NrcXVvdGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ibG9ja3F1b3RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdibG9ja3F1b3RlX3N0YXJ0J1xuICAgICAgfSk7XG5cbiAgICAgIGNhcCA9IGNhcFswXS5yZXBsYWNlKC9eICo+ID8vZ20sICcnKTtcblxuICAgICAgLy8gUGFzcyBgdG9wYCB0byBrZWVwIHRoZSBjdXJyZW50XG4gICAgICAvLyBcInRvcGxldmVsXCIgc3RhdGUuIFRoaXMgaXMgZXhhY3RseVxuICAgICAgLy8gaG93IG1hcmtkb3duLnBsIHdvcmtzLlxuICAgICAgdGhpcy50b2tlbihjYXAsIHRvcCwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGlzdFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxpc3QuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgYnVsbCA9IGNhcFsyXTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaXN0X3N0YXJ0JyxcbiAgICAgICAgb3JkZXJlZDogYnVsbC5sZW5ndGggPiAxXG4gICAgICB9KTtcblxuICAgICAgLy8gR2V0IGVhY2ggdG9wLWxldmVsIGl0ZW0uXG4gICAgICBjYXAgPSBjYXBbMF0ubWF0Y2godGhpcy5ydWxlcy5pdGVtKTtcblxuICAgICAgbmV4dCA9IGZhbHNlO1xuICAgICAgbCA9IGNhcC5sZW5ndGg7XG4gICAgICBpID0gMDtcblxuICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGNhcFtpXTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGxpc3QgaXRlbSdzIGJ1bGxldFxuICAgICAgICAvLyBzbyBpdCBpcyBzZWVuIGFzIHRoZSBuZXh0IHRva2VuLlxuICAgICAgICBzcGFjZSA9IGl0ZW0ubGVuZ3RoO1xuICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC9eICooWyorLV18XFxkK1xcLikgKy8sICcnKTtcblxuICAgICAgICAvLyBPdXRkZW50IHdoYXRldmVyIHRoZVxuICAgICAgICAvLyBsaXN0IGl0ZW0gY29udGFpbnMuIEhhY2t5LlxuICAgICAgICBpZiAofml0ZW0uaW5kZXhPZignXFxuICcpKSB7XG4gICAgICAgICAgc3BhY2UgLT0gaXRlbS5sZW5ndGg7XG4gICAgICAgICAgaXRlbSA9ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICAgID8gaXRlbS5yZXBsYWNlKG5ldyBSZWdFeHAoJ14gezEsJyArIHNwYWNlICsgJ30nLCAnZ20nKSwgJycpXG4gICAgICAgICAgICA6IGl0ZW0ucmVwbGFjZSgvXiB7MSw0fS9nbSwgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG5leHQgbGlzdCBpdGVtIGJlbG9uZ3MgaGVyZS5cbiAgICAgICAgLy8gQmFja3BlZGFsIGlmIGl0IGRvZXMgbm90IGJlbG9uZyBpbiB0aGlzIGxpc3QuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc21hcnRMaXN0cyAmJiBpICE9PSBsIC0gMSkge1xuICAgICAgICAgIGIgPSBibG9jay5idWxsZXQuZXhlYyhjYXBbaSArIDFdKVswXTtcbiAgICAgICAgICBpZiAoYnVsbCAhPT0gYiAmJiAhKGJ1bGwubGVuZ3RoID4gMSAmJiBiLmxlbmd0aCA+IDEpKSB7XG4gICAgICAgICAgICBzcmMgPSBjYXAuc2xpY2UoaSArIDEpLmpvaW4oJ1xcbicpICsgc3JjO1xuICAgICAgICAgICAgaSA9IGwgLSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIGl0ZW0gaXMgbG9vc2Ugb3Igbm90LlxuICAgICAgICAvLyBVc2U6IC8oXnxcXG4pKD8hIClbXlxcbl0rXFxuXFxuKD8hXFxzKiQpL1xuICAgICAgICAvLyBmb3IgZGlzY291bnQgYmVoYXZpb3IuXG4gICAgICAgIGxvb3NlID0gbmV4dCB8fCAvXFxuXFxuKD8hXFxzKiQpLy50ZXN0KGl0ZW0pO1xuICAgICAgICBpZiAoaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBuZXh0ID0gaXRlbS5jaGFyQXQoaXRlbS5sZW5ndGggLSAxKSA9PT0gJ1xcbic7XG4gICAgICAgICAgaWYgKCFsb29zZSkgbG9vc2UgPSBuZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogbG9vc2VcbiAgICAgICAgICAgID8gJ2xvb3NlX2l0ZW1fc3RhcnQnXG4gICAgICAgICAgICA6ICdsaXN0X2l0ZW1fc3RhcnQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlY3Vyc2UuXG4gICAgICAgIHRoaXMudG9rZW4oaXRlbSwgZmFsc2UsIGJxKTtcblxuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnbGlzdF9pdGVtX2VuZCdcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHRtbFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmh0bWwuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICAgID8gJ3BhcmFncmFwaCdcbiAgICAgICAgICA6ICdodG1sJyxcbiAgICAgICAgcHJlOiAhdGhpcy5vcHRpb25zLnNhbml0aXplclxuICAgICAgICAgICYmIChjYXBbMV0gPT09ICdwcmUnIHx8IGNhcFsxXSA9PT0gJ3NjcmlwdCcgfHwgY2FwWzFdID09PSAnc3R5bGUnKSxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlZlxuICAgIGlmICgoIWJxICYmIHRvcCkgJiYgKGNhcCA9IHRoaXMucnVsZXMuZGVmLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5saW5rc1tjYXBbMV0udG9Mb3dlckNhc2UoKV0gPSB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy50YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC8oPzogKlxcfCAqKT9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXVxuICAgICAgICAgIC5yZXBsYWNlKC9eICpcXHwgKnwgKlxcfCAqJC9nLCAnJylcbiAgICAgICAgICAuc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdG9wLWxldmVsIHBhcmFncmFwaFxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMucGFyYWdyYXBoLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3BhcmFncmFwaCcsXG4gICAgICAgIHRleHQ6IGNhcFsxXS5jaGFyQXQoY2FwWzFdLmxlbmd0aCAtIDEpID09PSAnXFxuJ1xuICAgICAgICAgID8gY2FwWzFdLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgLy8gVG9wLWxldmVsIHNob3VsZCBuZXZlciByZWFjaCBoZXJlLlxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcy50b2tlbnM7XG59O1xuXG4vKipcbiAqIElubGluZS1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoW1xcXFxgKnt9XFxbXFxdKCkjK1xcLS4hXz5dKS8sXG4gIGF1dG9saW5rOiAvXjwoW14gPl0rKEB8OlxcLylbXiA+XSspPi8sXG4gIHVybDogbm9vcCxcbiAgdGFnOiAvXjwhLS1bXFxzXFxTXSo/LS0+fF48XFwvP1xcdysoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vLFxuICBsaW5rOiAvXiE/XFxbKGluc2lkZSlcXF1cXChocmVmXFwpLyxcbiAgcmVmbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFxzKlxcWyhbXlxcXV0qKVxcXS8sXG4gIG5vbGluazogL14hP1xcWygoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKVxcXS8sXG4gIHN0cm9uZzogL15fXyhbXFxzXFxTXSs/KV9fKD8hXyl8XlxcKlxcKihbXFxzXFxTXSs/KVxcKlxcKig/IVxcKikvLFxuICBlbTogL15cXGJfKCg/OlteX118X18pKz8pX1xcYnxeXFwqKCg/OlxcKlxcKnxbXFxzXFxTXSkrPylcXCooPyFcXCopLyxcbiAgY29kZTogL14oYCspXFxzKihbXFxzXFxTXSo/W15gXSlcXHMqXFwxKD8hYCkvLFxuICBicjogL14gezIsfVxcbig/IVxccyokKS8sXG4gIGRlbDogbm9vcCxcbiAgdGV4dDogL15bXFxzXFxTXSs/KD89W1xcXFw8IVxcW18qYF18IHsyLH1cXG58JCkvXG59O1xuXG5pbmxpbmUuX2luc2lkZSA9IC8oPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXXxcXF0oPz1bXlxcW10qXFxdKSkqLztcbmlubGluZS5faHJlZiA9IC9cXHMqPD8oW1xcc1xcU10qPyk+Pyg/OlxccytbJ1wiXShbXFxzXFxTXSo/KVsnXCJdKT9cXHMqLztcblxuaW5saW5lLmxpbmsgPSByZXBsYWNlKGlubGluZS5saW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoJ2hyZWYnLCBpbmxpbmUuX2hyZWYpXG4gICgpO1xuXG5pbmxpbmUucmVmbGluayA9IHJlcGxhY2UoaW5saW5lLnJlZmxpbmspXG4gICgnaW5zaWRlJywgaW5saW5lLl9pbnNpZGUpXG4gICgpO1xuXG4vKipcbiAqIE5vcm1hbCBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5ub3JtYWwgPSBtZXJnZSh7fSwgaW5saW5lKTtcblxuLyoqXG4gKiBQZWRhbnRpYyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5wZWRhbnRpYyA9IG1lcmdlKHt9LCBpbmxpbmUubm9ybWFsLCB7XG4gIHN0cm9uZzogL15fXyg/PVxcUykoW1xcc1xcU10qP1xcUylfXyg/IV8pfF5cXCpcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqXFwqKD8hXFwqKS8sXG4gIGVtOiAvXl8oPz1cXFMpKFtcXHNcXFNdKj9cXFMpXyg/IV8pfF5cXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqKD8hXFwqKS9cbn0pO1xuXG4vKipcbiAqIEdGTSBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5nZm0gPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBlc2NhcGU6IHJlcGxhY2UoaW5saW5lLmVzY2FwZSkoJ10pJywgJ358XSknKSgpLFxuICB1cmw6IC9eKGh0dHBzPzpcXC9cXC9bXlxcczxdK1tePC4sOjtcIicpXFxdXFxzXSkvLFxuICBkZWw6IC9efn4oPz1cXFMpKFtcXHNcXFNdKj9cXFMpfn4vLFxuICB0ZXh0OiByZXBsYWNlKGlubGluZS50ZXh0KVxuICAgICgnXXwnLCAnfl18JylcbiAgICAoJ3wnLCAnfGh0dHBzPzovL3wnKVxuICAgICgpXG59KTtcblxuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5icmVha3MgPSBtZXJnZSh7fSwgaW5saW5lLmdmbSwge1xuICBicjogcmVwbGFjZShpbmxpbmUuYnIpKCd7Mix9JywgJyonKSgpLFxuICB0ZXh0OiByZXBsYWNlKGlubGluZS5nZm0udGV4dCkoJ3syLH0nLCAnKicpKClcbn0pO1xuXG4vKipcbiAqIElubGluZSBMZXhlciAmIENvbXBpbGVyXG4gKi9cblxuZnVuY3Rpb24gSW5saW5lTGV4ZXIobGlua3MsIG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMubGlua3MgPSBsaW5rcztcbiAgdGhpcy5ydWxlcyA9IGlubGluZS5ub3JtYWw7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgaWYgKCF0aGlzLmxpbmtzKSB7XG4gICAgdGhyb3cgbmV3XG4gICAgICBFcnJvcignVG9rZW5zIGFycmF5IHJlcXVpcmVzIGEgYGxpbmtzYCBwcm9wZXJ0eS4nKTtcbiAgfVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5icmVha3MpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuYnJlYWtzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmdmbTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgdGhpcy5ydWxlcyA9IGlubGluZS5wZWRhbnRpYztcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBJbmxpbmUgUnVsZXNcbiAqL1xuXG5JbmxpbmVMZXhlci5ydWxlcyA9IGlubGluZTtcblxuLyoqXG4gKiBTdGF0aWMgTGV4aW5nL0NvbXBpbGluZyBNZXRob2RcbiAqL1xuXG5JbmxpbmVMZXhlci5vdXRwdXQgPSBmdW5jdGlvbihzcmMsIGxpbmtzLCBvcHRpb25zKSB7XG4gIHZhciBpbmxpbmUgPSBuZXcgSW5saW5lTGV4ZXIobGlua3MsIG9wdGlvbnMpO1xuICByZXR1cm4gaW5saW5lLm91dHB1dChzcmMpO1xufTtcblxuLyoqXG4gKiBMZXhpbmcvQ29tcGlsaW5nXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm91dHB1dCA9IGZ1bmN0aW9uKHNyYykge1xuICB2YXIgb3V0ID0gJydcbiAgICAsIGxpbmtcbiAgICAsIHRleHRcbiAgICAsIGhyZWZcbiAgICAsIGNhcDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gZXNjYXBlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZXNjYXBlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBjYXBbMV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBhdXRvbGlua1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmF1dG9saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChjYXBbMl0gPT09ICdAJykge1xuICAgICAgICB0ZXh0ID0gY2FwWzFdLmNoYXJBdCg2KSA9PT0gJzonXG4gICAgICAgICAgPyB0aGlzLm1hbmdsZShjYXBbMV0uc3Vic3RyaW5nKDcpKVxuICAgICAgICAgIDogdGhpcy5tYW5nbGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRoaXMubWFuZ2xlKCdtYWlsdG86JykgKyB0ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZShjYXBbMV0pO1xuICAgICAgICBocmVmID0gdGV4dDtcbiAgICAgIH1cbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgbnVsbCwgdGV4dCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB1cmwgKGdmbSlcbiAgICBpZiAoIXRoaXMuaW5MaW5rICYmIChjYXAgPSB0aGlzLnJ1bGVzLnVybC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGV4dCA9IGVzY2FwZShjYXBbMV0pO1xuICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFnXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGFnLmV4ZWMoc3JjKSkge1xuICAgICAgaWYgKCF0aGlzLmluTGluayAmJiAvXjxhIC9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5MaW5rICYmIC9ePFxcL2E+L2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXJcbiAgICAgICAgICA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKVxuICAgICAgICAgIDogZXNjYXBlKGNhcFswXSlcbiAgICAgICAgOiBjYXBbMF1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLnJlZmxpbmsuZXhlYyhzcmMpKVxuICAgICAgICB8fCAoY2FwID0gdGhpcy5ydWxlcy5ub2xpbmsuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGxpbmsgPSAoY2FwWzJdIHx8IGNhcFsxXSkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgbGluayA9IHRoaXMubGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluayB8fCAhbGluay5ocmVmKSB7XG4gICAgICAgIG91dCArPSBjYXBbMF0uY2hhckF0KDApO1xuICAgICAgICBzcmMgPSBjYXBbMF0uc3Vic3RyaW5nKDEpICsgc3JjO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCBsaW5rKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBzdHJvbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5zdHJvbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuc3Ryb25nKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGVtXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZW0uZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuZW0odGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuY29kZXNwYW4oZXNjYXBlKGNhcFsyXSwgdHJ1ZSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYnJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ici5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5icigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVsIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZGVsLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmRlbCh0aGlzLm91dHB1dChjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLnRleHQoZXNjYXBlKHRoaXMuc21hcnR5cGFudHMoY2FwWzBdKSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29tcGlsZSBMaW5rXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm91dHB1dExpbmsgPSBmdW5jdGlvbihjYXAsIGxpbmspIHtcbiAgdmFyIGhyZWYgPSBlc2NhcGUobGluay5ocmVmKVxuICAgICwgdGl0bGUgPSBsaW5rLnRpdGxlID8gZXNjYXBlKGxpbmsudGl0bGUpIDogbnVsbDtcblxuICByZXR1cm4gY2FwWzBdLmNoYXJBdCgwKSAhPT0gJyEnXG4gICAgPyB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgdGl0bGUsIHRoaXMub3V0cHV0KGNhcFsxXSkpXG4gICAgOiB0aGlzLnJlbmRlcmVyLmltYWdlKGhyZWYsIHRpdGxlLCBlc2NhcGUoY2FwWzFdKSk7XG59O1xuXG4vKipcbiAqIFNtYXJ0eXBhbnRzIFRyYW5zZm9ybWF0aW9uc1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5zbWFydHlwYW50cyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKCF0aGlzLm9wdGlvbnMuc21hcnR5cGFudHMpIHJldHVybiB0ZXh0O1xuICByZXR1cm4gdGV4dFxuICAgIC8vIGVtLWRhc2hlc1xuICAgIC5yZXBsYWNlKC8tLS0vZywgJ1xcdTIwMTQnKVxuICAgIC8vIGVuLWRhc2hlc1xuICAgIC5yZXBsYWNlKC8tLS9nLCAnXFx1MjAxMycpXG4gICAgLy8gb3BlbmluZyBzaW5nbGVzXG4gICAgLnJlcGxhY2UoLyhefFstXFx1MjAxNC8oXFxbe1wiXFxzXSknL2csICckMVxcdTIwMTgnKVxuICAgIC8vIGNsb3Npbmcgc2luZ2xlcyAmIGFwb3N0cm9waGVzXG4gICAgLnJlcGxhY2UoLycvZywgJ1xcdTIwMTknKVxuICAgIC8vIG9wZW5pbmcgZG91Ymxlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcXHUyMDE4XFxzXSlcIi9nLCAnJDFcXHUyMDFjJylcbiAgICAvLyBjbG9zaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvXCIvZywgJ1xcdTIwMWQnKVxuICAgIC8vIGVsbGlwc2VzXG4gICAgLnJlcGxhY2UoL1xcLnszfS9nLCAnXFx1MjAyNicpO1xufTtcblxuLyoqXG4gKiBNYW5nbGUgTGlua3NcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUubWFuZ2xlID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAoIXRoaXMub3B0aW9ucy5tYW5nbGUpIHJldHVybiB0ZXh0O1xuICB2YXIgb3V0ID0gJydcbiAgICAsIGwgPSB0ZXh0Lmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIGNoO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgY2ggPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIGNoID0gJ3gnICsgY2gudG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgICBvdXQgKz0gJyYjJyArIGNoICsgJzsnO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmVuZGVyZXJcbiAqL1xuXG5mdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG59XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2RlID0gZnVuY3Rpb24oY29kZSwgbGFuZywgZXNjYXBlZCkge1xuICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCkge1xuICAgIHZhciBvdXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KGNvZGUsIGxhbmcpO1xuICAgIGlmIChvdXQgIT0gbnVsbCAmJiBvdXQgIT09IGNvZGUpIHtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgY29kZSA9IG91dDtcbiAgICB9XG4gIH1cblxuICBpZiAoIWxhbmcpIHtcbiAgICByZXR1cm4gJzxwcmU+PGNvZGU+J1xuICAgICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUoY29kZSwgdHJ1ZSkpXG4gICAgICArICdcXG48L2NvZGU+PC9wcmU+JztcbiAgfVxuXG4gIHJldHVybiAnPHByZT48Y29kZSBjbGFzcz1cIidcbiAgICArIHRoaXMub3B0aW9ucy5sYW5nUHJlZml4XG4gICAgKyBlc2NhcGUobGFuZywgdHJ1ZSlcbiAgICArICdcIj4nXG4gICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUoY29kZSwgdHJ1ZSkpXG4gICAgKyAnXFxuPC9jb2RlPjwvcHJlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuYmxvY2txdW90ZSA9IGZ1bmN0aW9uKHF1b3RlKSB7XG4gIHJldHVybiAnPGJsb2NrcXVvdGU+XFxuJyArIHF1b3RlICsgJzwvYmxvY2txdW90ZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbihodG1sKSB7XG4gIHJldHVybiBodG1sO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmhlYWRpbmcgPSBmdW5jdGlvbih0ZXh0LCBsZXZlbCwgcmF3KSB7XG4gIHJldHVybiAnPGgnXG4gICAgKyBsZXZlbFxuICAgICsgJyBpZD1cIidcbiAgICArIHRoaXMub3B0aW9ucy5oZWFkZXJQcmVmaXhcbiAgICArIHJhdy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teXFx3XSsvZywgJy0nKVxuICAgICsgJ1wiPidcbiAgICArIHRleHRcbiAgICArICc8L2gnXG4gICAgKyBsZXZlbFxuICAgICsgJz5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmhyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbihib2R5LCBvcmRlcmVkKSB7XG4gIHZhciB0eXBlID0gb3JkZXJlZCA/ICdvbCcgOiAndWwnO1xuICByZXR1cm4gJzwnICsgdHlwZSArICc+XFxuJyArIGJvZHkgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0aXRlbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8bGk+JyArIHRleHQgKyAnPC9saT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnBhcmFncmFwaCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8cD4nICsgdGV4dCArICc8L3A+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZSA9IGZ1bmN0aW9uKGhlYWRlciwgYm9keSkge1xuICByZXR1cm4gJzx0YWJsZT5cXG4nXG4gICAgKyAnPHRoZWFkPlxcbidcbiAgICArIGhlYWRlclxuICAgICsgJzwvdGhlYWQ+XFxuJ1xuICAgICsgJzx0Ym9keT5cXG4nXG4gICAgKyBib2R5XG4gICAgKyAnPC90Ym9keT5cXG4nXG4gICAgKyAnPC90YWJsZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlcm93ID0gZnVuY3Rpb24oY29udGVudCkge1xuICByZXR1cm4gJzx0cj5cXG4nICsgY29udGVudCArICc8L3RyPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGVjZWxsID0gZnVuY3Rpb24oY29udGVudCwgZmxhZ3MpIHtcbiAgdmFyIHR5cGUgPSBmbGFncy5oZWFkZXIgPyAndGgnIDogJ3RkJztcbiAgdmFyIHRhZyA9IGZsYWdzLmFsaWduXG4gICAgPyAnPCcgKyB0eXBlICsgJyBzdHlsZT1cInRleHQtYWxpZ246JyArIGZsYWdzLmFsaWduICsgJ1wiPidcbiAgICA6ICc8JyArIHR5cGUgKyAnPic7XG4gIHJldHVybiB0YWcgKyBjb250ZW50ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG4vLyBzcGFuIGxldmVsIHJlbmRlcmVyXG5SZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxzdHJvbmc+JyArIHRleHQgKyAnPC9zdHJvbmc+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5lbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZW0+JyArIHRleHQgKyAnPC9lbT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmNvZGVzcGFuID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxjb2RlPicgKyB0ZXh0ICsgJzwvY29kZT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGJyLz4nIDogJzxicj4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmRlbCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZGVsPicgKyB0ZXh0ICsgJzwvZGVsPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHByb3QgPSBkZWNvZGVVUklDb21wb25lbnQodW5lc2NhcGUoaHJlZikpXG4gICAgICAgIC5yZXBsYWNlKC9bXlxcdzpdL2csICcnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChwcm90LmluZGV4T2YoJ2phdmFzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCd2YnNjcmlwdDonKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICB2YXIgb3V0ID0gJzxhIGhyZWY9XCInICsgaHJlZiArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIHZhciBvdXQgPSAnPGltZyBzcmM9XCInICsgaHJlZiArICdcIiBhbHQ9XCInICsgdGV4dCArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gdGhpcy5vcHRpb25zLnhodG1sID8gJy8+JyA6ICc+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gdGV4dDtcbn07XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG5cbmZ1bmN0aW9uIFBhcnNlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW4gPSBudWxsO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xufVxuXG4vKipcbiAqIFN0YXRpYyBQYXJzZSBNZXRob2RcbiAqL1xuXG5QYXJzZXIucGFyc2UgPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMsIHJlbmRlcmVyKSB7XG4gIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMsIHJlbmRlcmVyKTtcbiAgcmV0dXJuIHBhcnNlci5wYXJzZShzcmMpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMb29wXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHNyYykge1xuICB0aGlzLmlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihzcmMubGlua3MsIHRoaXMub3B0aW9ucywgdGhpcy5yZW5kZXJlcik7XG4gIHRoaXMudG9rZW5zID0gc3JjLnJldmVyc2UoKTtcblxuICB2YXIgb3V0ID0gJyc7XG4gIHdoaWxlICh0aGlzLm5leHQoKSkge1xuICAgIG91dCArPSB0aGlzLnRvaygpO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbiA9IHRoaXMudG9rZW5zLnBvcCgpO1xufTtcblxuLyoqXG4gKiBQcmV2aWV3IE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMudG9rZW5zLmxlbmd0aCAtIDFdIHx8IDA7XG59O1xuXG4vKipcbiAqIFBhcnNlIFRleHQgVG9rZW5zXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvZHkgPSB0aGlzLnRva2VuLnRleHQ7XG5cbiAgd2hpbGUgKHRoaXMucGVlaygpLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgIGJvZHkgKz0gJ1xcbicgKyB0aGlzLm5leHQoKS50ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuaW5saW5lLm91dHB1dChib2R5KTtcbn07XG5cbi8qKlxuICogUGFyc2UgQ3VycmVudCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUudG9rID0gZnVuY3Rpb24oKSB7XG4gIHN3aXRjaCAodGhpcy50b2tlbi50eXBlKSB7XG4gICAgY2FzZSAnc3BhY2UnOiB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNhc2UgJ2hyJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHIoKTtcbiAgICB9XG4gICAgY2FzZSAnaGVhZGluZyc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhlYWRpbmcoXG4gICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpLFxuICAgICAgICB0aGlzLnRva2VuLmRlcHRoLFxuICAgICAgICB0aGlzLnRva2VuLnRleHQpO1xuICAgIH1cbiAgICBjYXNlICdjb2RlJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuY29kZSh0aGlzLnRva2VuLnRleHQsXG4gICAgICAgIHRoaXMudG9rZW4ubGFuZyxcbiAgICAgICAgdGhpcy50b2tlbi5lc2NhcGVkKTtcbiAgICB9XG4gICAgY2FzZSAndGFibGUnOiB7XG4gICAgICB2YXIgaGVhZGVyID0gJydcbiAgICAgICAgLCBib2R5ID0gJydcbiAgICAgICAgLCBpXG4gICAgICAgICwgcm93XG4gICAgICAgICwgY2VsbFxuICAgICAgICAsIGZsYWdzXG4gICAgICAgICwgajtcblxuICAgICAgLy8gaGVhZGVyXG4gICAgICBjZWxsID0gJyc7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5oZWFkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZmxhZ3MgPSB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfTtcbiAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi5oZWFkZXJbaV0pLFxuICAgICAgICAgIHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBoZWFkZXIgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm93ID0gdGhpcy50b2tlbi5jZWxsc1tpXTtcblxuICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHJvd1tqXSksXG4gICAgICAgICAgICB7IGhlYWRlcjogZmFsc2UsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2pdIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keSArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnYmxvY2txdW90ZV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnYmxvY2txdW90ZV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuYmxvY2txdW90ZShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJydcbiAgICAgICAgLCBvcmRlcmVkID0gdGhpcy50b2tlbi5vcmRlcmVkO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3QoYm9keSwgb3JkZXJlZCk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3RfaXRlbV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9pdGVtX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRva2VuLnR5cGUgPT09ICd0ZXh0J1xuICAgICAgICAgID8gdGhpcy5wYXJzZVRleHQoKVxuICAgICAgICAgIDogdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xvb3NlX2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2h0bWwnOiB7XG4gICAgICB2YXIgaHRtbCA9ICF0aGlzLnRva2VuLnByZSAmJiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgID8gdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dClcbiAgICAgICAgOiB0aGlzLnRva2VuLnRleHQ7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5odG1sKGh0bWwpO1xuICAgIH1cbiAgICBjYXNlICdwYXJhZ3JhcGgnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCkpO1xuICAgIH1cbiAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VUZXh0KCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGh0bWwsIGVuY29kZSkge1xuICByZXR1cm4gaHRtbFxuICAgIC5yZXBsYWNlKCFlbmNvZGUgPyAvJig/ISM/XFx3KzspL2cgOiAvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZShodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoLyYoWyNcXHddKyk7L2csIGZ1bmN0aW9uKF8sIG4pIHtcbiAgICBuID0gbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChuID09PSAnY29sb24nKSByZXR1cm4gJzonO1xuICAgIGlmIChuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICByZXR1cm4gbi5jaGFyQXQoMSkgPT09ICd4J1xuICAgICAgICA/IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobi5zdWJzdHJpbmcoMiksIDE2KSlcbiAgICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKCtuLnN1YnN0cmluZygxKSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb24gc2VsZihuYW1lLCB2YWwpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LCBvcHQpO1xuICAgIHZhbCA9IHZhbC5zb3VyY2UgfHwgdmFsO1xuICAgIHZhbCA9IHZhbC5yZXBsYWNlKC8oXnxbXlxcW10pXFxeL2csICckMScpO1xuICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbm5vb3AuZXhlYyA9IG5vb3A7XG5cbmZ1bmN0aW9uIG1lcmdlKG9iaikge1xuICB2YXIgaSA9IDFcbiAgICAsIHRhcmdldFxuICAgICwga2V5O1xuXG4gIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAoa2V5IGluIHRhcmdldCkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSB0YXJnZXRba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5cbi8qKlxuICogTWFya2VkXG4gKi9cblxuZnVuY3Rpb24gbWFya2VkKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgfHwgdHlwZW9mIG9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0O1xuICAgICAgb3B0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQgfHwge30pO1xuXG4gICAgdmFyIGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHRcbiAgICAgICwgdG9rZW5zXG4gICAgICAsIHBlbmRpbmdcbiAgICAgICwgaSA9IDA7XG5cbiAgICB0cnkge1xuICAgICAgdG9rZW5zID0gTGV4ZXIubGV4KHNyYywgb3B0KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICB9XG5cbiAgICBwZW5kaW5nID0gdG9rZW5zLmxlbmd0aDtcblxuICAgIHZhciBkb25lID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb3V0O1xuXG4gICAgICB0cnkge1xuICAgICAgICBvdXQgPSBQYXJzZXIucGFyc2UodG9rZW5zLCBvcHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnIgPSBlO1xuICAgICAgfVxuXG4gICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuXG4gICAgICByZXR1cm4gZXJyXG4gICAgICAgID8gY2FsbGJhY2soZXJyKVxuICAgICAgICA6IGNhbGxiYWNrKG51bGwsIG91dCk7XG4gICAgfTtcblxuICAgIGlmICghaGlnaGxpZ2h0IHx8IGhpZ2hsaWdodC5sZW5ndGggPCAzKSB7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH1cblxuICAgIGRlbGV0ZSBvcHQuaGlnaGxpZ2h0O1xuXG4gICAgaWYgKCFwZW5kaW5nKSByZXR1cm4gZG9uZSgpO1xuXG4gICAgZm9yICg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIChmdW5jdGlvbih0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gJ2NvZGUnKSB7XG4gICAgICAgICAgcmV0dXJuIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhpZ2hsaWdodCh0b2tlbi50ZXh0LCB0b2tlbi5sYW5nLCBmdW5jdGlvbihlcnIsIGNvZGUpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgIGlmIChjb2RlID09IG51bGwgfHwgY29kZSA9PT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRva2VuLnRleHQgPSBjb2RlO1xuICAgICAgICAgIHRva2VuLmVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkodG9rZW5zW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAob3B0KSBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICAgIHJldHVybiBQYXJzZXIucGFyc2UoTGV4ZXIubGV4KHNyYywgb3B0KSwgb3B0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUubWVzc2FnZSArPSAnXFxuUGxlYXNlIHJlcG9ydCB0aGlzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZC4nO1xuICAgIGlmICgob3B0IHx8IG1hcmtlZC5kZWZhdWx0cykuc2lsZW50KSB7XG4gICAgICByZXR1cm4gJzxwPkFuIGVycm9yIG9jY3VyZWQ6PC9wPjxwcmU+J1xuICAgICAgICArIGVzY2FwZShlLm1lc3NhZ2UgKyAnJywgdHJ1ZSlcbiAgICAgICAgKyAnPC9wcmU+JztcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG4vKipcbiAqIE9wdGlvbnNcbiAqL1xuXG5tYXJrZWQub3B0aW9ucyA9XG5tYXJrZWQuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdCkge1xuICBtZXJnZShtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gIHJldHVybiBtYXJrZWQ7XG59O1xuXG5tYXJrZWQuZGVmYXVsdHMgPSB7XG4gIGdmbTogdHJ1ZSxcbiAgdGFibGVzOiB0cnVlLFxuICBicmVha3M6IGZhbHNlLFxuICBwZWRhbnRpYzogZmFsc2UsXG4gIHNhbml0aXplOiBmYWxzZSxcbiAgc2FuaXRpemVyOiBudWxsLFxuICBtYW5nbGU6IHRydWUsXG4gIHNtYXJ0TGlzdHM6IGZhbHNlLFxuICBzaWxlbnQ6IGZhbHNlLFxuICBoaWdobGlnaHQ6IG51bGwsXG4gIGxhbmdQcmVmaXg6ICdsYW5nLScsXG4gIHNtYXJ0eXBhbnRzOiBmYWxzZSxcbiAgaGVhZGVyUHJlZml4OiAnJyxcbiAgcmVuZGVyZXI6IG5ldyBSZW5kZXJlcixcbiAgeGh0bWw6IGZhbHNlXG59O1xuXG4vKipcbiAqIEV4cG9zZVxuICovXG5cbm1hcmtlZC5QYXJzZXIgPSBQYXJzZXI7XG5tYXJrZWQucGFyc2VyID0gUGFyc2VyLnBhcnNlO1xuXG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcblxubWFya2VkLkxleGVyID0gTGV4ZXI7XG5tYXJrZWQubGV4ZXIgPSBMZXhlci5sZXg7XG5cbm1hcmtlZC5JbmxpbmVMZXhlciA9IElubGluZUxleGVyO1xubWFya2VkLmlubGluZUxleGVyID0gSW5saW5lTGV4ZXIub3V0cHV0O1xuXG5tYXJrZWQucGFyc2UgPSBtYXJrZWQ7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBtYXJrZWQ7XG59IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBtYXJrZWQ7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy5tYXJrZWQgPSBtYXJrZWQ7XG59XG5cbn0pLmNhbGwoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCk7XG59KCkpO1xuIl19
},{}],3:[function(require,module,exports){

var env = require('./env.js');
var Lexer = require("./parser/Lexer.js");
var Parser = require("./parser/Parser.js");
var config = require("./config.js");
var _ = require('./util');
var extend = require('./helper/extend.js');
if(env.browser){
  var combine = require('./helper/combine.js');
  var dom = require("./dom.js");
  var walkers = require('./walkers.js');
  var Group = require('./group.js');
}
var events = require('./helper/event.js');
var Watcher = require('./helper/watcher.js');
var parse = require('./helper/parse.js');
var filter = require('./helper/filter.js');
var doc = dom.doc;


/**
* `Regular` is regularjs's NameSpace and BaseClass. Every Component is inherited from it
* 
* @class Regular
* @module Regular
* @constructor
* @param {Object} options specification of the component
*/
var Regular = function(definition, options){
  var prevRunning = env.isRunning;
  env.isRunning = true;
  var node, template;

  definition = definition || {};
  options = options || {};

  definition.data = definition.data || {};
  definition.computed = definition.computed || {};
  definition.events = definition.events || {};
  if(this.data) _.extend(definition.data, this.data);
  if(this.computed) _.extend(definition.computed, this.computed);
  if(this.events) _.extend(definition.events, this.events);

  _.extend(this, definition, true);
  if(this.$parent){
     this.$parent._append(this);
  }
  this._children = [];
  this.$refs = {};

  template = this.template;

  // template is a string (len < 16). we will find it container first
  if((typeof template === 'string' && template.length < 16) && (node = dom.find(template))) {
    template = node.innerHTML;
  }
  // if template is a xml
  if(template && template.nodeType) template = template.innerHTML;
  if(typeof template === 'string') this.template = new Parser(template).parse();

  this.computed = handleComputed(this.computed);
  this.$root = this.$root || this;
  // if have events
  if(this.events){
    this.$on(this.events);
  }
  this.$emit("$config");
  this.config && this.config(this.data);
  if(this._body && this._body.length){
    this.$body = _.getCompileFn(this._body, this.$parent, {
      outer: this,
      namespace: options.namespace,
      extra: options.extra,
      record: true
    })
    this._body = null;
  }
  // handle computed
  if(template){
    this.group = this.$compile(this.template, {namespace: options.namespace});
    combine.node(this);
  }


  if(!this.$parent) this.$update();
  this.$ready = true;
  this.$emit("$init");
  if( this.init ) this.init(this.data);

  // @TODO: remove, maybe , there is no need to update after init; 
  // if(this.$root === this) this.$update();
  env.isRunning = prevRunning;

  // children is not required;
}


walkers && (walkers.Regular = Regular);


// description
// -------------------------
// 1. Regular and derived Class use same filter
_.extend(Regular, {
  // private data stuff
  _directives: { __regexp__:[] },
  _plugins: {},
  _protoInheritCache: [ 'directive', 'use'] ,
  __after__: function(supr, o) {

    var template;
    this.__after__ = supr.__after__;

    // use name make the component global.
    if(o.name) Regular.component(o.name, this);
    // this.prototype.template = dom.initTemplate(o)
    if(template = o.template){
      var node, name;
      if( typeof template === 'string' && template.length < 16 && ( node = dom.find( template )) ){
        template = node.innerHTML;
        if(name = dom.attr(node, 'name')) Regular.component(name, this);
      }

      if(template.nodeType) template = template.innerHTML;

      if(typeof template === 'string'){
        this.prototype.template = new Parser(template).parse();
      }
    }

    if(o.computed) this.prototype.computed = handleComputed(o.computed);
    // inherit directive and other config from supr
    Regular._inheritConfig(this, supr);

  },
  /**
   * Define a directive
   *
   * @method directive
   * @return {Object} Copy of ...
   */  
  directive: function(name, cfg){

    if(_.typeOf(name) === "object"){
      for(var k in name){
        if(name.hasOwnProperty(k)) this.directive(k, name[k]);
      }
      return this;
    }
    var type = _.typeOf(name);
    var directives = this._directives, directive;
    if(cfg == null){
      if( type === "string" && (directive = directives[name]) ) return directive;
      else{
        var regexp = directives.__regexp__;
        for(var i = 0, len = regexp.length; i < len ; i++){
          directive = regexp[i];
          var test = directive.regexp.test(name);
          if(test) return directive;
        }
      }
      return undefined;
    }
    if(typeof cfg === 'function') cfg = { link: cfg } 
    if(type === 'string') directives[name] = cfg;
    else if(type === 'regexp'){
      cfg.regexp = name;
      directives.__regexp__.push(cfg)
    }
    return this
  },
  plugin: function(name, fn){
    var plugins = this._plugins;
    if(fn == null) return plugins[name];
    plugins[name] = fn;
    return this;
  },
  use: function(fn){
    if(typeof fn === "string") fn = Regular.plugin(fn);
    if(typeof fn !== "function") return this;
    fn(this, Regular);
    return this;
  },
  // config the Regularjs's global
  config: function(name, value){
    var needGenLexer = false;
    if(typeof name === "object"){
      for(var i in name){
        // if you config
        if( i ==="END" || i==='BEGIN' )  needGenLexer = true;
        config[i] = name[i];
      }
    }
    if(needGenLexer) Lexer.setup();
  },
  expression: parse.expression,
  Parser: Parser,
  Lexer: Lexer,
  _addProtoInheritCache: function(name, transform){
    if( Array.isArray( name ) ){
      return name.forEach(Regular._addProtoInheritCache);
    }
    var cacheKey = "_" + name + "s"
    Regular._protoInheritCache.push(name)
    Regular[cacheKey] = {};
    if(Regular[name]) return;
    Regular[name] = function(key, cfg){
      var cache = this[cacheKey];

      if(typeof key === "object"){
        for(var i in key){
          if(key.hasOwnProperty(i)) this[name](i, key[i]);
        }
        return this;
      }
      if(cfg == null) return cache[key];
      cache[key] = transform? transform(cfg) : cfg;
      return this;
    }
  },
  _inheritConfig: function(self, supr){

    // prototype inherit some Regular property
    // so every Component will have own container to serve directive, filter etc..
    var defs = Regular._protoInheritCache;
    var keys = _.slice(defs);
    keys.forEach(function(key){
      self[key] = supr[key];
      var cacheKey = '_' + key + 's';
      if(supr[cacheKey]) self[cacheKey] = _.createObject(supr[cacheKey]);
    })
    return self;
  }

});

extend(Regular);

Regular._addProtoInheritCache("component")

Regular._addProtoInheritCache("filter", function(cfg){
  return typeof cfg === "function"? {get: cfg}: cfg;
})


events.mixTo(Regular);
Watcher.mixTo(Regular);

Regular.implement({
  init: function(){},
  config: function(){},
  destroy: function(){
    // destroy event wont propgation;
    this.$emit("$destroy");
    this.group && this.group.destroy(true);
    this.group = null;
    this.parentNode = null;
    this._watchers = null;
    this._children = [];
    var parent = this.$parent;
    if(parent){
      var index = parent._children.indexOf(this);
      parent._children.splice(index,1);
    }
    this.$parent = null;
    this.$root = null;
    this._handles = null;
    this.$refs = null;
  },

  /**
   * compile a block ast ; return a group;
   * @param  {Array} parsed ast
   * @param  {[type]} record
   * @return {[type]}
   */
  $compile: function(ast, options){
    options = options || {};
    if(typeof ast === 'string'){
      ast = new Parser(ast).parse()
    }
    var preExt = this.__ext__,
      record = options.record, 
      records;

    if(options.extra) this.__ext__ = options.extra;

    if(record) this._record();
    var group = this._walk(ast, options);
    if(record){
      records = this._release();
      var self = this;
      if(records.length){
        // auto destroy all wather;
        group.ondestroy = function(){ self.$unwatch(records); }
      }
    }
    if(options.extra) this.__ext__ = preExt;
    return group;
  },


  /**
   * create two-way binding with another component;
   * *warn*: 
   *   expr1 and expr2 must can operate set&get, for example: the 'a.b' or 'a[b + 1]' is set-able, but 'a.b + 1' is not, 
   *   beacuse Regular dont know how to inverse set through the expression;
   *   
   *   if before $bind, two component's state is not sync, the component(passed param) will sync with the called component;
   *
   * *example: *
   *
   * ```javascript
   * // in this example, we need to link two pager component
   * var pager = new Pager({}) // pager compoennt
   * var pager2 = new Pager({}) // another pager component
   * pager.$bind(pager2, 'current'); // two way bind throw two component
   * pager.$bind(pager2, 'total');   // 
   * // or just
   * pager.$bind(pager2, {"current": "current", "total": "total"}) 
   * ```
   * 
   * @param  {Regular} component the
   * @param  {String|Expression} expr1     required, self expr1 to operate binding
   * @param  {String|Expression} expr2     optional, other component's expr to bind with, if not passed, the expr2 will use the expr1;
   * @return          this;
   */
  $bind: function(component, expr1, expr2){
    var type = _.typeOf(expr1);
    if( expr1.type === 'expression' || type === 'string' ){
      this._bind(component, expr1, expr2)
    }else if( type === "array" ){ // multiply same path binding through array
      for(var i = 0, len = expr1.length; i < len; i++){
        this._bind(component, expr1[i]);
      }
    }else if(type === "object"){
      for(var i in expr1) if(expr1.hasOwnProperty(i)){
        this._bind(component, i, expr1[i]);
      }
    }
    // digest
    component.$update();
    return this;
  },
  /**
   * unbind one component( see $bind also)
   *
   * unbind will unbind all relation between two component
   * 
   * @param  {Regular} component [descriptionegular
   * @return {This}    this
   */
  $unbind: function(){
    // todo
  },
  $inject: combine.inject,
  $mute: function(isMute){

    isMute = !!isMute;

    var needupdate = isMute === false && this._mute;

    this._mute = !!isMute;

    if(needupdate) this.$update();
    return this;
  },
  // private bind logic
  _bind: function(component, expr1, expr2){

    var self = this;
    // basic binding

    if(!component || !(component instanceof Regular)) throw "$bind() should pass Regular component as first argument";
    if(!expr1) throw "$bind() should  pass as least one expression to bind";

    if(!expr2) expr2 = expr1;

    expr1 = parse.expression( expr1 );
    expr2 = parse.expression( expr2 );

    // set is need to operate setting ;
    if(expr2.set){
      var wid1 = this.$watch( expr1, function(value){
        component.$update(expr2, value)
      });
      component.$on('$destroy', function(){
        self.$unwatch(wid1)
      })
    }
    if(expr1.set){
      var wid2 = component.$watch(expr2, function(value){
        self.$update(expr1, value)
      });
      // when brother destroy, we unlink this watcher
      this.$on('$destroy', component.$unwatch.bind(component,wid2))
    }
    // sync the component's state to called's state
    expr2.set(component, expr1.get(this));
  },
  _walk: function(ast, arg1){
    if( _.typeOf(ast) === 'array' ){
      var res = [];

      for(var i = 0, len = ast.length; i < len; i++){
        res.push( this._walk(ast[i], arg1) );
      }

      return new Group(res);
    }
    if(typeof ast === 'string') return doc.createTextNode(ast)
    return walkers[ast.type || "default"].call(this, ast, arg1);
  },
  _append: function(component){
    this._children.push(component);
    component.$parent = this;
  },
  _handleEvent: function(elem, type, value, attrs){
    var Component = this.constructor,
      fire = typeof value !== "function"? _.handleEvent.call( this, value, type ) : value,
      handler = Component.event(type), destroy;

    if ( handler ) {
      destroy = handler.call(this, elem, fire, attrs);
    } else {
      dom.on(elem, type, fire);
    }
    return handler ? destroy : function() {
      dom.off(elem, type, fire);
    }
  },
  // 1. 用来处理exprBody -> Function
  // 2. list里的循环
  _touchExpr: function(expr){
    var  rawget, ext = this.__ext__, touched = {};
    if(expr.type !== 'expression' || expr.touched) return expr;
    rawget = expr.get || (expr.get = new Function(_.ctxName, _.extName , _.prefix+ "return (" + expr.body + ")"));
    touched.get = !ext? rawget: function(context){
      return rawget(context, ext)
    }

    if(expr.setbody && !expr.set){
      var setbody = expr.setbody;
      expr.set = function(ctx, value, ext){
        expr.set = new Function(_.ctxName, _.setName , _.extName, _.prefix + setbody);          
        return expr.set(ctx, value, ext);
      }
      expr.setbody = null;
    }
    if(expr.set){
      touched.set = !ext? expr.set : function(ctx, value){
        return expr.set(ctx, value, ext);
      }
    }
    _.extend(touched, {
      type: 'expression',
      touched: true,
      once: expr.once || expr.constant
    })
    return touched
  },
  // find filter
  _f_: function(name){
    var Component = this.constructor;
    var filter = Component.filter(name);
    if(!filter) throw Error('filter ' + name + ' is undefined');
    return filter;
  },
  // simple accessor get
  _sg_:function(path, defaults, ext){
    if(typeof ext !== 'undefined'){
      // if(path === "demos")  debugger
      var computed = this.computed,
        computedProperty = computed[path];
      if(computedProperty){
        if(computedProperty.type==='expression' && !computedProperty.get) this._touchExpr(computedProperty);
        if(computedProperty.get)  return computedProperty.get(this);
        else _.log("the computed '" + path + "' don't define the get function,  get data."+path + " altnately", "error")
      }
  }
    if(typeof defaults === "undefined" || typeof path == "undefined" ){
      return undefined;
    }
    return (ext && typeof ext[path] !== 'undefined')? ext[path]: defaults[path];

  },
  // simple accessor set
  _ss_:function(path, value, data , op, computed){
    var computed = this.computed,
      op = op || "=", prev, 
      computedProperty = computed? computed[path]:null;

    if(op !== '='){
      prev = computedProperty? computedProperty.get(this): data[path];
      switch(op){
        case "+=":
          value = prev + value;
          break;
        case "-=":
          value = prev - value;
          break;
        case "*=":
          value = prev * value;
          break;
        case "/=":
          value = prev / value;
          break;
        case "%=":
          value = prev % value;
          break;
      }
    }
    if(computedProperty) {
      if(computedProperty.set) return computedProperty.set(this, value);
      else _.log("the computed '" + path + "' don't define the set function,  assign data."+path + " altnately", "error" )
    }
    data[path] = value;
    return value;
  }
});

Regular.prototype.inject = function(){
  _.log("use $inject instead of inject", "error");
  return this.$inject.apply(this, arguments);
}


// only one builtin filter

Regular.filter(filter);

module.exports = Regular;



var handleComputed = (function(){
  // wrap the computed getter;
  function wrapGet(get){
    return function(context){
      return get.call(context, context.data );
    }
  }
  // wrap the computed setter;
  function wrapSet(set){
    return function(context, value){
      set.call( context, value, context.data );
      return value;
    }
  }

  return function(computed){
    if(!computed) return;
    var parsedComputed = {}, handle, pair, type;
    for(var i in computed){
      handle = computed[i]
      type = typeof handle;

      if(handle.type === 'expression'){
        parsedComputed[i] = handle;
        continue;
      }
      if( type === "string" ){
        parsedComputed[i] = parse.expression(handle)
      }else{
        pair = parsedComputed[i] = {type: 'expression'};
        if(type === "function" ){
          pair.get = wrapGet(handle);
        }else{
          if(handle.get) pair.get = wrapGet(handle.get);
          if(handle.set) pair.set = wrapSet(handle.set);
        }
      } 
    }
    return parsedComputed;
  }
})();

},{"./config.js":4,"./dom.js":10,"./env.js":11,"./group.js":12,"./helper/combine.js":15,"./helper/event.js":17,"./helper/extend.js":18,"./helper/filter.js":19,"./helper/parse.js":20,"./helper/watcher.js":22,"./parser/Lexer.js":25,"./parser/Parser.js":26,"./util":28,"./walkers.js":29}],4:[function(require,module,exports){

module.exports = {
  'BEGIN': '{',
  'END': '}'
}
},{}],5:[function(require,module,exports){
module.exports = {
  'COMPONENT_TYPE': 1,
  'ELEMENT_TYPE': 2
}
},{}],6:[function(require,module,exports){
var // packages
  _ = require("../util.js"),
 animate = require("../helper/animate.js"),
 dom = require("../dom.js"),
 Regular = require("../Regular.js");


var // variables
  rClassName = /^[-\w]+(\s[-\w]+)*$/,
  rCommaSep = /[\r\n\f ]*,[\r\n\f ]*(?=\w+\:)/, //  dont split comma in  Expression
  rStyles = /^\{.*\}$/, //  for Simpilfy
  rSpace = /\s+/, //  for Simpilfy
  WHEN_COMMAND = "when",
  EVENT_COMMAND = "on",
  THEN_COMMAND = "then";

/**
 * Animation Plugin
 * @param {Component} Component 
 */


function createSeed(type){

  var steps = [], current = 0, callback = _.noop;
  var key;

  var out = {
    type: type,
    start: function(cb){
      key = _.uid();
      if(typeof cb === "function") callback = cb;
      if(current> 0 ){
        current = 0 ;
      }else{
        out.step();
      }
      return out.compelete;
    },
    compelete: function(){
      key = null;
      callback && callback();
      callback = _.noop;
      current = 0;
    },
    step: function(){
      if(steps[current]) steps[current ]( out.done.bind(out, key) );
    },
    done: function(pkey){
      if(pkey !== key) return; // means the loop is down
      if( current < steps.length - 1 ) {
        current++;
        out.step();
      }else{
        out.compelete();
      }
    },
    push: function(step){
      steps.push(step)
    }
  }

  return out;
}

Regular._addProtoInheritCache("animation")


// builtin animation
Regular.animation({
  "wait": function( step ){
    var timeout = parseInt( step.param ) || 0
    return function(done){
      // _.log("delay " + timeout)
      setTimeout( done, timeout );
    }
  },
  "class": function(step){
    var tmp = step.param.split(","),
      className = tmp[0] || "",
      mode = parseInt(tmp[1]) || 1;

    return function(done){
      // _.log(className)
      animate.startClassAnimate( step.element, className , done, mode );
    }
  },
  "call": function(step){
    var fn = this.$expression(step.param).get, self = this;
    return function(done){
      // _.log(step.param, 'call')
      fn(self);
      self.$update();
      done()
    }
  },
  "emit": function(step){
    var param = step.param;
    var tmp = param.split(","),
      evt = tmp[0] || "",
      args = tmp[1]? this.$expression(tmp[1]).get: null;

    if(!evt) throw Error("you shoud specified a eventname in emit command");

    var self = this;
    return function(done){
      self.$emit(evt, args? args(self) : undefined);
      done();
    }
  },
  // style: left {10}px,
  style: function(step){
    var styles = {}, 
      param = step.param,
      pairs = param.split(","), valid;
    pairs.forEach(function(pair){
      pair = pair.trim();
      if(pair){
        var tmp = pair.split( rSpace ),
          name = tmp.shift(),
          value = tmp.join(" ");

        if( !name || !value ) throw Error("invalid style in command: style");
        styles[name] = value;
        valid = true;
      }
    })

    return function(done){
      if(valid){
        animate.startStyleAnimate(step.element, styles, done);
      }else{
        done();
      }
    }
  }
})



// hancdle the r-animation directive
// el : the element to process
// value: the directive value
function processAnimate( element, value ){
  var Component = this.constructor;
  value = value.trim();

  var composites = value.split(";"), 
    composite, context = this, seeds = [], seed, destroies = [], destroy,
    command, param , current = 0, tmp, animator, self = this;

  function reset( type ){
    seed && seeds.push( seed )
    seed = createSeed( type );
  }

  function whenCallback(start, value){
    if( !!value ) start()
  }

  function animationDestroy(element){
    return function(){
      delete element.onenter;
      delete element.onleave;
    } 
  }

  for( var i = 0, len = composites.length; i < len; i++ ){

    composite = composites[i];
    tmp = composite.split(":");
    command = tmp[0] && tmp[0].trim();
    param = tmp[1] && tmp[1].trim();

    if( !command ) continue;

    if( command === WHEN_COMMAND ){
      reset("when");
      this.$watch(param, whenCallback.bind( this, seed.start ) );
      continue;
    }

    if( command === EVENT_COMMAND){
      reset(param);
      if( param === "leave" ){
        element.onleave = seed.start;
        destroies.push( animationDestroy(element) );
      }else if( param === "enter" ){
        element.onenter = seed.start;
        destroies.push( animationDestroy(element) );
      }else{
        if( ("on" + param) in element){ // if dom have the event , we use dom event
          destroies.push(this._handleEvent( element, param, seed.start ));
        }else{ // otherwise, we use component event
          this.$on(param, seed.start);
          destroies.push(this.$off.bind(this, param, seed.start));
        }
      }
      continue
    }

    var animator =  Component.animation(command) 
    if( animator && seed ){
      seed.push(
        animator.call(this,{
          element: element,
          done: seed.done,
          param: param 
        })
      )
    }else{
      throw Error( animator? "you should start with `on` or `event` in animation" : ("undefined animator 【" + command +"】" ));
    }
  }

  if(destroies.length){
    return function(){
      destroies.forEach(function(destroy){
        destroy();
      })
    }
  }
}


Regular.directive( "r-animation", processAnimate)
Regular.directive( "r-anim", processAnimate)


},{"../Regular.js":3,"../dom.js":10,"../helper/animate.js":13,"../util.js":28}],7:[function(require,module,exports){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var animate = require("../helper/animate.js");
var Regular = require("../Regular.js");
var consts = require("../const");



require("./event.js");
require("./form.js");


module.exports = {
// **warn**: class inteplation will override this directive 
  'r-class': function(elem, value){
    if(typeof value=== 'string'){
      value = _.fixObjStr(value)
    }
    this.$watch(value, function(nvalue){
      var className = ' '+ elem.className.replace(/\s+/g, ' ') +' ';
      for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
        className = className.replace(' ' + i + ' ',' ');
        if(nvalue[i] === true){
          className += i+' ';
        }
      }
      elem.className = className.trim();
    },true);
  },
  // **warn**: style inteplation will override this directive 
  'r-style': function(elem, value){
    if(typeof value=== 'string'){
      value = _.fixObjStr(value)
    }
    this.$watch(value, function(nvalue){
      for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
        dom.css(elem, i, nvalue[i]);
      }
    },true);
  },
  // when expression is evaluate to true, the elem will add display:none
  // Example: <div r-hide={{items.length > 0}}></div>
  'r-hide': function(elem, value){
    var preBool = null, compelete;
    this.$watch(value, function(nvalue){
      var bool = !!nvalue;
      if(bool === preBool) return; 
      preBool = bool;
      if(bool){
        if(elem.onleave){
          compelete = elem.onleave(function(){
            elem.style.display = "none"
            compelete = null;
          })
        }else{
          elem.style.display = "none"
        }
        
      }else{
        if(compelete) compelete();
        elem.style.display = "";
        if(elem.onenter){
          elem.onenter();
        }
      }
    });
  },
  'r-html': function(elem, value){
    this.$watch(value, function(nvalue){
      nvalue = nvalue || "";
      dom.html(elem, nvalue)
    }, {force: true});
  },
  'ref': {
    accept: consts.COMPONENT_TYPE + consts.ELEMENT_TYPE,
    link: function( elem, value ){
      var refs = this.$refs || (this.$refs = {});
      var cval;
      if(_.isExpr(value)){
        this.$watch(value, function(nval, oval){
          cval = nval;
          if(refs[oval] === elem) refs[oval] = null;
          if(cval) refs[cval] = elem;
        })
      }else{
        refs[cval = value] = elem;
      }
      return function(){
        refs[cval] = null;
      }
    }
  }
}

Regular.directive(module.exports);











},{"../Regular.js":3,"../const":5,"../dom.js":10,"../helper/animate.js":13,"../util.js":28,"./event.js":8,"./form.js":9}],8:[function(require,module,exports){
/**
 * event directive  bundle
 *
 */
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");

Regular._addProtoInheritCache("event");

Regular.directive( /^on-\w+$/, function( elem, value, name , attrs) {
  if ( !name || !value ) return;
  var type = name.split("-")[1];
  return this._handleEvent( elem, type, value, attrs );
});
// TODO.
/**
- $('dx').delegate()
*/
Regular.directive( /^(delegate|de)-\w+$/, function( elem, value, name ) {
  var root = this.$root;
  var _delegates = root._delegates || ( root._delegates = {} );
  if ( !name || !value ) return;
  var type = name.split("-")[1];
  var fire = _.handleEvent.call(this, value, type);

  function delegateEvent(ev){
    matchParent(ev, _delegates[type], root.parentNode);
  }

  if( !_delegates[type] ){
    _delegates[type] = [];

    if(root.parentNode){
      dom.on(root.parentNode, type, delegateEvent);
    }else{
      root.$on( "$inject", function( newParent ){
        var preParent = this.parentNode;
        if( preParent ){
          dom.off(preParent, type, delegateEvent);
        }
        dom.on(newParent, type, delegateEvent);
      })
    }
    root.$on("$destroy", function(){
      if(root.parentNode) dom.off(root.parentNode, type, delegateEvent)
      _delegates[type] = null;
    })
  }
  var delegate = {
    element: elem,
    fire: fire
  }
  _delegates[type].push( delegate );

  return function(){
    var delegates = _delegates[type];
    if(!delegates || !delegates.length) return;
    for( var i = 0, len = delegates.length; i < len; i++ ){
      if( delegates[i] === delegate ) delegates.splice(i, 1);
    }
  }

});


function matchParent(ev , delegates, stop){
  if(!stop) return;
  var target = ev.target, pair;
  while(target && target !== stop){
    for( var i = 0, len = delegates.length; i < len; i++ ){
      pair = delegates[i];
      if(pair && pair.element === target){
        pair.fire(ev)
      }
    }
    target = target.parentNode;
  }
}
},{"../Regular.js":3,"../dom.js":10,"../util.js":28}],9:[function(require,module,exports){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");

var modelHandlers = {
  "text": initText,
  "select": initSelect,
  "checkbox": initCheckBox,
  "radio": initRadio
}


// @TODO


// two-way binding with r-model
// works on input, textarea, checkbox, radio, select

Regular.directive("r-model", function(elem, value){
  var tag = elem.tagName.toLowerCase();
  var sign = tag;
  if(sign === "input") sign = elem.type || "text";
  else if(sign === "textarea") sign = "text";
  if(typeof value === "string") value = this.$expression(value);

  if( modelHandlers[sign] ) return modelHandlers[sign].call(this, elem, value);
  else if(tag === "input"){
    return modelHandlers.text.call(this, elem, value);
  }
});



// binding <select>

function initSelect( elem, parsed){
  var self = this;
  var wc =this.$watch(parsed, function(newValue){
    var children = _.slice(elem.getElementsByTagName('option'))
    children.forEach(function(node, index){
      if(node.value == newValue){
        elem.selectedIndex = index;
      }
    })
  });

  function handler(){
    parsed.set(self, this.value);
    wc.last = this.value;
    self.$update();
  }

  dom.on(elem, "change", handler);
  
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function destroy(){
    dom.off(elem, "change", handler);
  }
}

// input,textarea binding

function initText(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function(newValue){
    if(elem.value !== newValue) elem.value = newValue == null? "": "" + newValue;
  });

  // @TODO to fixed event
  var handler = function (ev){
    var that = this;
    if(ev.type==='cut' || ev.type==='paste'){
      _.nextTick(function(){
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
      })
    }else{
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
    }
  };

  if(dom.msie !== 9 && "oninput" in dom.tNode ){
    elem.addEventListener("input", handler );
  }else{
    dom.on(elem, "paste", handler)
    dom.on(elem, "keyup", handler)
    dom.on(elem, "cut", handler)
    dom.on(elem, "change", handler)
  }
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function (){
    if(dom.msie !== 9 && "oninput" in dom.tNode ){
      elem.removeEventListener("input", handler );
    }else{
      dom.off(elem, "paste", handler)
      dom.off(elem, "keyup", handler)
      dom.off(elem, "cut", handler)
      dom.off(elem, "change", handler)
    }
  }
}


// input:checkbox  binding

function initCheckBox(elem, parsed){
  var self = this;
  var watcher = this.$watch(parsed, function(newValue){
    dom.attr(elem, 'checked', !!newValue);
  });

  var handler = function handler(){
    var value = this.checked;
    parsed.set(self, value);
    watcher.last = value;
    self.$update();
  }
  if(parsed.set) dom.on(elem, "change", handler)

  if(parsed.get(self) === undefined){
    parsed.set(self, !!elem.checked);
  }

  return function destroy(){
    if(parsed.set) dom.off(elem, "change", handler)
  }
}


// input:radio binding

function initRadio(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function( newValue ){
    if(newValue == elem.value) elem.checked = true;
    else elem.checked = false;
  });


  var handler = function handler(){
    var value = this.value;
    parsed.set(self, value);
    self.$update();
  }
  if(parsed.set) dom.on(elem, "change", handler)
  // beacuse only after compile(init), the dom structrue is exsit. 
  if(parsed.get(self) === undefined){
    if(elem.checked) {
      parsed.set(self, elem.value);
    }
  }

  return function destroy(){
    if(parsed.set) dom.off(elem, "change", handler)
  }
}

},{"../Regular.js":3,"../dom.js":10,"../util.js":28}],10:[function(require,module,exports){

// thanks for angular && mootools for some concise&cross-platform  implemention
// =====================================

// The MIT License
// Copyright (c) 2010-2014 Google, Inc. http://angularjs.org

// ---
// license: MIT-style license. http://mootools.net


var dom = module.exports;
var env = require("./env.js");
var _ = require("./util");
var tNode = document.createElement('div')
var addEvent, removeEvent;
var noop = function(){}

var namespaces = {
  html: "http://www.w3.org/1999/xhtml",
  svg: "http://www.w3.org/2000/svg"
}

dom.body = document.body;

dom.doc = document;

// camelCase
function camelCase(str){
  return ("" + str).replace(/-\D/g, function(match){
    return match.charAt(1).toUpperCase();
  });
}


dom.tNode = tNode;

if(tNode.addEventListener){
  addEvent = function(node, type, fn) {
    node.addEventListener(type, fn, false);
  }
  removeEvent = function(node, type, fn) {
    node.removeEventListener(type, fn, false) 
  }
}else{
  addEvent = function(node, type, fn) {
    node.attachEvent('on' + type, fn);
  }
  removeEvent = function(node, type, fn) {
    node.detachEvent('on' + type, fn); 
  }
}


dom.msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
if (isNaN(dom.msie)) {
  dom.msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
}

dom.find = function(sl){
  if(document.querySelector) {
    try{
      return document.querySelector(sl);
    }catch(e){

    }
  }
  if(sl.indexOf('#')!==-1) return document.getElementById( sl.slice(1) );
}

dom.inject = function(node, refer, position){

  position = position || 'bottom';
  if(!node) return ;
  if(Array.isArray(node)){
    var tmp = node;
    node = dom.fragment();
    for(var i = 0,len = tmp.length; i < len ;i++){
      node.appendChild(tmp[i])
    }
  }

  var firstChild, next;
  switch(position){
    case 'bottom':
      refer.appendChild( node );
      break;
    case 'top':
      if( firstChild = refer.firstChild ){
        refer.insertBefore( node, refer.firstChild );
      }else{
        refer.appendChild( node );
      }
      break;
    case 'after':
      if( next = refer.nextSibling ){
        next.parentNode.insertBefore( node, next );
      }else{
        refer.parentNode.appendChild( node );
      }
      break;
    case 'before':
      refer.parentNode.insertBefore( node, refer );
  }
}


dom.id = function(id){
  return document.getElementById(id);
}

// createElement 
dom.create = function(type, ns, attrs){
  if(ns === 'svg'){
    if(!env.svg) throw Error('the env need svg support')
    ns = namespaces.svg;
  }
  return !ns? document.createElement(type): document.createElementNS(ns, type);
}

// documentFragment
dom.fragment = function(){
  return document.createDocumentFragment();
}



var specialAttr = {
  'class': function(node, value){
    ('className' in node && (node.namespaceURI === namespaces.html || !node.namespaceURI)) ?
      node.className = (value || '') : node.setAttribute('class', value);
  },
  'for': function(node, value){
    ('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
  },
  'style': function(node, value){
    (node.style) ? node.style.cssText = value : node.setAttribute('style', value);
  },
  'value': function(node, value){
    node.value = (value != null) ? value : '';
  }
}


// attribute Setter & Getter
dom.attr = function(node, name, value){
  if (_.isBooleanAttr(name)) {
    if (typeof value !== 'undefined') {
      if (!!value) {
        node[name] = true;
        node.setAttribute(name, name);
        // lt ie7 . the javascript checked setting is in valid
        //http://bytes.com/topic/javascript/insights/799167-browser-quirk-dynamically-appended-checked-checkbox-does-not-appear-checked-ie
        if(dom.msie && dom.msie <=7 ) node.defaultChecked = true
      } else {
        node[name] = false;
        node.removeAttribute(name);
      }
    } else {
      return (node[name] ||
               (node.attributes.getNamedItem(name)|| noop).specified) ? name : undefined;
    }
  } else if (typeof (value) !== 'undefined') {
    // if in specialAttr;
    if(specialAttr[name]) specialAttr[name](node, value);
    else if(value === null) node.removeAttribute(name)
    else node.setAttribute(name, value);
  } else if (node.getAttribute) {
    // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
    // some elements (e.g. Document) don't have get attribute, so return undefined
    var ret = node.getAttribute(name, 2);
    // normalize non-existing attributes to undefined (as jQuery)
    return ret === null ? undefined : ret;
  }
}


dom.on = function(node, type, handler){
  var types = type.split(' ');
  handler.real = function(ev){
    var $event = new Event(ev);
    $event.origin = node;
    handler.call(node, $event);
  }
  types.forEach(function(type){
    type = fixEventName(node, type);
    addEvent(node, type, handler.real);
  });
}
dom.off = function(node, type, handler){
  var types = type.split(' ');
  handler = handler.real || handler;
  types.forEach(function(type){
    type = fixEventName(node, type);
    removeEvent(node, type, handler);
  })
}


dom.text = (function (){
  var map = {};
  if (dom.msie && dom.msie < 9) {
    map[1] = 'innerText';    
    map[3] = 'nodeValue';    
  } else {
    map[1] = map[3] = 'textContent';
  }
  
  return function (node, value) {
    var textProp = map[node.nodeType];
    if (value == null) {
      return textProp ? node[textProp] : '';
    }
    node[textProp] = value;
  }
})();


dom.html = function( node, html ){
  if(typeof html === "undefined"){
    return node.innerHTML;
  }else{
    node.innerHTML = html;
  }
}

dom.replace = function(node, replaced){
  if(replaced.parentNode) replaced.parentNode.replaceChild(node, replaced);
}

dom.remove = function(node){
  if(node.parentNode) node.parentNode.removeChild(node);
}

// css Settle & Getter from angular
// =================================
// it isnt computed style 
dom.css = function(node, name, value){
  if( _.typeOf(name) === "object" ){
    for(var i in name){
      if( name.hasOwnProperty(i) ){
        dom.css( node, i, name[i] );
      }
    }
    return;
  }
  if ( typeof value !== "undefined" ) {

    name = camelCase(name);
    if(name) node.style[name] = value;

  } else {

    var val;
    if (dom.msie <= 8) {
      // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
      val = node.currentStyle && node.currentStyle[name];
      if (val === '') val = 'auto';
    }
    val = val || node.style[name];
    if (dom.msie <= 8) {
      val = val === '' ? undefined : val;
    }
    return  val;
  }
}

dom.addClass = function(node, className){
  var current = node.className || "";
  if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
    node.className = current? ( current + " " + className ) : className;
  }
}

dom.delClass = function(node, className){
  var current = node.className || "";
  node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
}

dom.hasClass = function(node, className){
  var current = node.className || "";
  return (" " + current + " ").indexOf(" " + className + " ") !== -1;
}



// simple Event wrap

//http://stackoverflow.com/questions/11068196/ie8-ie7-onchange-event-is-emited-only-after-repeated-selection
function fixEventName(elem, name){
  return (name === 'change'  &&  dom.msie < 9 && 
      (elem && elem.tagName && elem.tagName.toLowerCase()==='input' && 
        (elem.type === 'checkbox' || elem.type === 'radio')
      )
    )? 'click': name;
}

var rMouseEvent = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/
var doc = document;
doc = (!doc.compatMode || doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
function Event(ev){
  ev = ev || window.event;
  if(ev._fixed) return ev;
  this.event = ev;
  this.target = ev.target || ev.srcElement;

  var type = this.type = ev.type;
  var button = this.button = ev.button;

  // if is mouse event patch pageX
  if(rMouseEvent.test(type)){ //fix pageX
    this.pageX = (ev.pageX != null) ? ev.pageX : ev.clientX + doc.scrollLeft;
    this.pageY = (ev.pageX != null) ? ev.pageY : ev.clientY + doc.scrollTop;
    if (type === 'mouseover' || type === 'mouseout'){// fix relatedTarget
      var related = ev.relatedTarget || ev[(type === 'mouseover' ? 'from' : 'to') + 'Element'];
      while (related && related.nodeType === 3) related = related.parentNode;
      this.relatedTarget = related;
    }
  }
  // if is mousescroll
  if (type === 'DOMMouseScroll' || type === 'mousewheel'){
    // ff ev.detail: 3    other ev.wheelDelta: -120
    this.wheelDelta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
  }
  
  // fix which
  this.which = ev.which || ev.keyCode;
  if( !this.which && button !== undefined){
    // http://api.jquery.com/event.which/ use which
    this.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
  }
  this._fixed = true;
}

_.extend(Event.prototype, {
  immediateStop: _.isFalse,
  stop: function(){
    this.preventDefault().stopPropagation();
  },
  preventDefault: function(){
    if (this.event.preventDefault) this.event.preventDefault();
    else this.event.returnValue = false;
    return this;
  },
  stopPropagation: function(){
    if (this.event.stopPropagation) this.event.stopPropagation();
    else this.event.cancelBubble = true;
    return this;
  },
  stopImmediatePropagation: function(){
    if(this.event.stopImmediatePropagation) this.event.stopImmediatePropagation();
  }
})


dom.nextFrame = (function(){
    var request = window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame|| 
                  function(callback){
                    setTimeout(callback, 16)
                  }

    var cancel = window.cancelAnimationFrame ||
                 window.webkitCancelAnimationFrame ||
                 window.mozCancelAnimationFrame ||
                 window.webkitCancelRequestAnimationFrame ||
                 function(tid){
                    clearTimeout(tid)
                 }
  
  return function(callback){
    var id = request(callback);
    return function(){ cancel(id); }
  }
})();

// 3ks for angular's raf  service
var k;
dom.nextReflow = dom.msie? function(callback){
  return dom.nextFrame(function(){
    k = document.body.offsetWidth;
    callback();
  })
}: dom.nextFrame;




},{"./env.js":11,"./util":28}],11:[function(require,module,exports){
// some fixture test;
// ---------------
var _ = require('./util');
exports.svg = (function(){
  return typeof document !== "undefined" && document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
})();


exports.browser = typeof document !== "undefined" && document.nodeType;
// whether have component in initializing
exports.exprCache = _.cache(1000);
exports.isRunning = false;

},{"./util":28}],12:[function(require,module,exports){
var _ = require('./util');
var combine = require('./helper/combine')

function Group(list){
  this.children = list || [];
}


var o = _.extend(Group.prototype, {
  destroy: function(first){
    combine.destroy(this.children, first);
    if(this.ondestroy) this.ondestroy();
    this.children = null;
  },
  get: function(i){
    return this.children[i]
  },
  push: function(item){
    this.children.push( item );
  }
})
o.inject = o.$inject = combine.inject



module.exports = Group;



},{"./helper/combine":15,"./util":28}],13:[function(require,module,exports){
var _ = require("../util");
var dom  = require("../dom.js");
var animate = {};
var env = require("../env.js");


var 
  transitionEnd = 'transitionend', 
  animationEnd = 'animationend', 
  transitionProperty = 'transition', 
  animationProperty = 'animation';

if(!('ontransitionend' in window)){
  if('onwebkittransitionend' in window) {
    
    // Chrome/Saf (+ Mobile Saf)/Android
    transitionEnd += ' webkitTransitionEnd';
    transitionProperty = 'webkitTransition'
  } else if('onotransitionend' in dom.tNode || navigator.appName === 'Opera') {

    // Opera
    transitionEnd += ' oTransitionEnd';
    transitionProperty = 'oTransition';
  }
}
if(!('onanimationend' in window)){
  if ('onwebkitanimationend' in window){
    // Chrome/Saf (+ Mobile Saf)/Android
    animationEnd += ' webkitAnimationEnd';
    animationProperty = 'webkitAnimation';

  }else if ('onoanimationend' in dom.tNode){
    // Opera
    animationEnd += ' oAnimationEnd';
    animationProperty = 'oAnimation';
  }
}

/**
 * inject node with animation
 * @param  {[type]} node      [description]
 * @param  {[type]} refer     [description]
 * @param  {[type]} direction [description]
 * @return {[type]}           [description]
 */
animate.inject = function( node, refer ,direction, callback ){
  callback = callback || _.noop;
  if( Array.isArray(node) ){
    var fragment = dom.fragment();
    var count=0;

    for(var i = 0,len = node.length;i < len; i++ ){
      fragment.appendChild(node[i]); 
    }
    dom.inject(fragment, refer, direction);

    // if all nodes is done, we call the callback
    var enterCallback = function (){
      count++;
      if( count === len ) callback();
    }
    if(len === count) callback();
    for( i = 0; i < len; i++ ){
      if(node[i].onenter){
        node[i].onenter(enterCallback);
      }else{
        enterCallback();
      }
    }
  }else{
    dom.inject( node, refer, direction );
    if(node.onenter){
      node.onenter(callback)
    }else{
      callback();
    }
  }
}

/**
 * remove node with animation
 * @param  {[type]}   node     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
animate.remove = function(node, callback){
  if(!node) throw new Error('node to be removed is undefined')
  var count = 0;
  function loop(){
    count++;
    if(count === len) callback && callback()
  }
  if(Array.isArray(node)){
    for(var i = 0, len = node.length; i < len ; i++){
      animate.remove(node[i], loop)
    }
    return node;
  }
  if(node.onleave){
    node.onleave(function(){
      removeDone(node, callback)
    })
  }else{
    removeDone(node, callback)
  }
}

var removeDone = function (node, callback){
    dom.remove(node);
    callback && callback();
}



animate.startClassAnimate = function ( node, className,  callback, mode ){
  var activeClassName, timeout, tid, onceAnim;
  if( (!animationEnd && !transitionEnd) || env.isRunning ){
    return callback();
  }

  if(mode !== 4){
    onceAnim = _.once(function onAnimateEnd(){
      if(tid) clearTimeout(tid);

      if(mode === 2) {
        dom.delClass(node, activeClassName);
      }
      if(mode !== 3){ // mode hold the class
        dom.delClass(node, className);
      }
      dom.off(node, animationEnd, onceAnim)
      dom.off(node, transitionEnd, onceAnim)

      callback();

    });
  }else{
    onceAnim = _.once(function onAnimateEnd(){
      if(tid) clearTimeout(tid);
      callback();
    });
  }
  if(mode === 2){ // auto removed
    dom.addClass( node, className );

    activeClassName = className.split(/\s+/).map(function(name){
       return name + '-active';
    }).join(" ");

    dom.nextReflow(function(){
      dom.addClass( node, activeClassName );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }else if(mode===4){
    dom.nextReflow(function(){
      dom.delClass( node, className );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }else{
    dom.nextReflow(function(){
      dom.addClass( node, className );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });
  }



  dom.on( node, animationEnd, onceAnim )
  dom.on( node, transitionEnd, onceAnim )
  return onceAnim;
}


animate.startStyleAnimate = function(node, styles, callback){
  var timeout, onceAnim, tid;

  dom.nextReflow(function(){
    dom.css( node, styles );
    timeout = getMaxTimeout( node );
    tid = setTimeout( onceAnim, timeout );
  });


  onceAnim = _.once(function onAnimateEnd(){
    if(tid) clearTimeout(tid);

    dom.off(node, animationEnd, onceAnim)
    dom.off(node, transitionEnd, onceAnim)

    callback();

  });

  dom.on( node, animationEnd, onceAnim )
  dom.on( node, transitionEnd, onceAnim )

  return onceAnim;
}


/**
 * get maxtimeout
 * @param  {Node} node 
 * @return {[type]}   [description]
 */
function getMaxTimeout(node){
  var timeout = 0,
    tDuration = 0,
    tDelay = 0,
    aDuration = 0,
    aDelay = 0,
    ratio = 5 / 3,
    styles ;

  if(window.getComputedStyle){

    styles = window.getComputedStyle(node),
    tDuration = getMaxTime( styles[transitionProperty + 'Duration']) || tDuration;
    tDelay = getMaxTime( styles[transitionProperty + 'Delay']) || tDelay;
    aDuration = getMaxTime( styles[animationProperty + 'Duration']) || aDuration;
    aDelay = getMaxTime( styles[animationProperty + 'Delay']) || aDelay;
    timeout = Math.max( tDuration+tDelay, aDuration + aDelay );

  }
  return timeout * 1000 * ratio;
}

function getMaxTime(str){

  var maxTimeout = 0, time;

  if(!str) return 0;

  str.split(",").forEach(function(str){

    time = parseFloat(str);
    if( time > maxTimeout ) maxTimeout = time;

  });

  return maxTimeout;
}

module.exports = animate;
},{"../dom.js":10,"../env.js":11,"../util":28}],14:[function(require,module,exports){

function simpleDiff(now, old){
  var nlen = now.length;
  var olen = old.length;
  if(nlen !== olen){
    return true;
  }
  for(var i = 0; i < nlen ; i++){
    if(now[i] !== old[i]) return  true;
  }
  return false

}

function equals(a,b){
  return a === b;
}
function ld(array1, array2){
  var n = array1.length;
  var m = array2.length;
  var matrix = [];
  for(var i = 0; i <= n; i++){
    matrix.push([i]);
  }
  for(var j=1;j<=m;j++){
    matrix[0][j]=j;
  }
  for(var i = 1; i <= n; i++){
    for(var j = 1; j <= m; j++){
      if(equals(array1[i-1], array2[j-1])){
        matrix[i][j] = matrix[i-1][j-1];
      }else{
        matrix[i][j] = Math.min(
          matrix[i-1][j]+1, //delete
          matrix[i][j-1]+1//add
          )
      }
    }
  }
  return matrix;
}
function whole(arr2, arr1, indexTrack) {
  if(indexTrack) return simpleDiff(arr2, arr1);
  var matrix = ld(arr1, arr2)
  var n = arr1.length;
  var i = n;
  var m = arr2.length;
  var j = m;
  var edits = [];
  var current = matrix[i][j];
  while(i>0 || j>0){
  // the last line
    if (i === 0) {
      edits.unshift(3);
      j--;
      continue;
    }
    // the last col
    if (j === 0) {
      edits.unshift(2);
      i--;
      continue;
    }
    var northWest = matrix[i - 1][j - 1];
    var west = matrix[i - 1][j];
    var north = matrix[i][j - 1];

    var min = Math.min(north, west, northWest);

    if (min === west) {
      edits.unshift(2); //delete
      i--;
      current = west;
    } else if (min === northWest ) {
      if (northWest === current) {
        edits.unshift(0); //no change
      } else {
        edits.unshift(1); //update
        current = northWest;
      }
      i--;
      j--;
    } else {
      edits.unshift(3); //add
      j--;
      current = north;
    }
  }
  var LEAVE = 0;
  var ADD = 3;
  var DELELE = 2;
  var UPDATE = 1;
  var n = 0;m=0;
  var steps = [];
  var step = {index: null, add:0, removed:[]};

  for(var i=0;i<edits.length;i++){
    if(edits[i] > 0 ){ // NOT LEAVE
      if(step.index === null){
        step.index = m;
      }
    } else { //LEAVE
      if(step.index != null){
        steps.push(step)
        step = {index: null, add:0, removed:[]};
      }
    }
    switch(edits[i]){
      case LEAVE:
        n++;
        m++;
        break;
      case ADD:
        step.add++;
        m++;
        break;
      case DELELE:
        step.removed.push(arr1[n])
        n++;
        break;
      case UPDATE:
        step.add++;
        step.removed.push(arr1[n])
        n++;
        m++;
        break;
    }
  }
  if(step.index != null){
    steps.push(step)
  }
  return steps
}
module.exports = whole;
},{}],15:[function(require,module,exports){
// some nested  operation in ast 
// --------------------------------

var dom = require("../dom.js");
var animate = require("./animate.js");

var combine = module.exports = {

  // get the initial dom in object
  node: function(item){
    var children,node, nodes;
    if(!item) return;
    if(item.element) return item.element;
    if(typeof item.node === "function") return item.node();
    if(typeof item.nodeType === "number") return item;
    if(item.group) return combine.node(item.group)
    if(children = item.children){
      if(children.length === 1){
        return combine.node(children[0]);
      }
      nodes = [];
      for(var i = 0, len = children.length; i < len; i++ ){
        node = combine.node(children[i]);
        if(Array.isArray(node)){
          nodes.push.apply(nodes, node)
        }else if(node) {
          nodes.push(node)
        }
      }
      return nodes;
    }
  },
  // @TODO remove _gragContainer
  inject: function(node, pos ){
    var group = this;
    var fragment = combine.node(group.group || group);
    if(node === false) {
      animate.remove(fragment)
      return group;
    }else{
      if(!fragment) return group;
      if(typeof node === 'string') node = dom.find(node);
      if(!node) throw Error('injected node is not found');
      // use animate to animate firstchildren
      animate.inject(fragment, node, pos);
    }
    // if it is a component
    if(group.$emit) {
      group.$emit("$inject", node, pos);
      group.parentNode = (pos ==='after' || pos === 'before')? node.parentNode : node;
    }
    return group;
  },

  // get the last dom in object(for insertion operation)
  last: function(item){
    var children = item.children;

    if(typeof item.last === "function") return item.last();
    if(typeof item.nodeType === "number") return item;

    if(children && children.length) return combine.last(children[children.length - 1]);
    if(item.group) return combine.last(item.group);

  },

  destroy: function(item, first){
    if(!item) return;
    if(Array.isArray(item)){
      for(var i = 0, len = item.length; i < len; i++ ){
        combine.destroy(item[i], first);
      }
    }
    var children = item.children;
    if(typeof item.destroy === "function") return item.destroy(first);
    if(typeof item.nodeType === "number" && first)  dom.remove(item);
    if(children && children.length){
      combine.destroy(children, true);
      item.children = null;
    }
  }

}
},{"../dom.js":10,"./animate.js":13}],16:[function(require,module,exports){
// http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
var entities = {
  'quot':34, 
  'amp':38, 
  'apos':39, 
  'lt':60, 
  'gt':62, 
  'nbsp':160, 
  'iexcl':161, 
  'cent':162, 
  'pound':163, 
  'curren':164, 
  'yen':165, 
  'brvbar':166, 
  'sect':167, 
  'uml':168, 
  'copy':169, 
  'ordf':170, 
  'laquo':171, 
  'not':172, 
  'shy':173, 
  'reg':174, 
  'macr':175, 
  'deg':176, 
  'plusmn':177, 
  'sup2':178, 
  'sup3':179, 
  'acute':180, 
  'micro':181, 
  'para':182, 
  'middot':183, 
  'cedil':184, 
  'sup1':185, 
  'ordm':186, 
  'raquo':187, 
  'frac14':188, 
  'frac12':189, 
  'frac34':190, 
  'iquest':191, 
  'Agrave':192, 
  'Aacute':193, 
  'Acirc':194, 
  'Atilde':195, 
  'Auml':196, 
  'Aring':197, 
  'AElig':198, 
  'Ccedil':199, 
  'Egrave':200, 
  'Eacute':201, 
  'Ecirc':202, 
  'Euml':203, 
  'Igrave':204, 
  'Iacute':205, 
  'Icirc':206, 
  'Iuml':207, 
  'ETH':208, 
  'Ntilde':209, 
  'Ograve':210, 
  'Oacute':211, 
  'Ocirc':212, 
  'Otilde':213, 
  'Ouml':214, 
  'times':215, 
  'Oslash':216, 
  'Ugrave':217, 
  'Uacute':218, 
  'Ucirc':219, 
  'Uuml':220, 
  'Yacute':221, 
  'THORN':222, 
  'szlig':223, 
  'agrave':224, 
  'aacute':225, 
  'acirc':226, 
  'atilde':227, 
  'auml':228, 
  'aring':229, 
  'aelig':230, 
  'ccedil':231, 
  'egrave':232, 
  'eacute':233, 
  'ecirc':234, 
  'euml':235, 
  'igrave':236, 
  'iacute':237, 
  'icirc':238, 
  'iuml':239, 
  'eth':240, 
  'ntilde':241, 
  'ograve':242, 
  'oacute':243, 
  'ocirc':244, 
  'otilde':245, 
  'ouml':246, 
  'divide':247, 
  'oslash':248, 
  'ugrave':249, 
  'uacute':250, 
  'ucirc':251, 
  'uuml':252, 
  'yacute':253, 
  'thorn':254, 
  'yuml':255, 
  'fnof':402, 
  'Alpha':913, 
  'Beta':914, 
  'Gamma':915, 
  'Delta':916, 
  'Epsilon':917, 
  'Zeta':918, 
  'Eta':919, 
  'Theta':920, 
  'Iota':921, 
  'Kappa':922, 
  'Lambda':923, 
  'Mu':924, 
  'Nu':925, 
  'Xi':926, 
  'Omicron':927, 
  'Pi':928, 
  'Rho':929, 
  'Sigma':931, 
  'Tau':932, 
  'Upsilon':933, 
  'Phi':934, 
  'Chi':935, 
  'Psi':936, 
  'Omega':937, 
  'alpha':945, 
  'beta':946, 
  'gamma':947, 
  'delta':948, 
  'epsilon':949, 
  'zeta':950, 
  'eta':951, 
  'theta':952, 
  'iota':953, 
  'kappa':954, 
  'lambda':955, 
  'mu':956, 
  'nu':957, 
  'xi':958, 
  'omicron':959, 
  'pi':960, 
  'rho':961, 
  'sigmaf':962, 
  'sigma':963, 
  'tau':964, 
  'upsilon':965, 
  'phi':966, 
  'chi':967, 
  'psi':968, 
  'omega':969, 
  'thetasym':977, 
  'upsih':978, 
  'piv':982, 
  'bull':8226, 
  'hellip':8230, 
  'prime':8242, 
  'Prime':8243, 
  'oline':8254, 
  'frasl':8260, 
  'weierp':8472, 
  'image':8465, 
  'real':8476, 
  'trade':8482, 
  'alefsym':8501, 
  'larr':8592, 
  'uarr':8593, 
  'rarr':8594, 
  'darr':8595, 
  'harr':8596, 
  'crarr':8629, 
  'lArr':8656, 
  'uArr':8657, 
  'rArr':8658, 
  'dArr':8659, 
  'hArr':8660, 
  'forall':8704, 
  'part':8706, 
  'exist':8707, 
  'empty':8709, 
  'nabla':8711, 
  'isin':8712, 
  'notin':8713, 
  'ni':8715, 
  'prod':8719, 
  'sum':8721, 
  'minus':8722, 
  'lowast':8727, 
  'radic':8730, 
  'prop':8733, 
  'infin':8734, 
  'ang':8736, 
  'and':8743, 
  'or':8744, 
  'cap':8745, 
  'cup':8746, 
  'int':8747, 
  'there4':8756, 
  'sim':8764, 
  'cong':8773, 
  'asymp':8776, 
  'ne':8800, 
  'equiv':8801, 
  'le':8804, 
  'ge':8805, 
  'sub':8834, 
  'sup':8835, 
  'nsub':8836, 
  'sube':8838, 
  'supe':8839, 
  'oplus':8853, 
  'otimes':8855, 
  'perp':8869, 
  'sdot':8901, 
  'lceil':8968, 
  'rceil':8969, 
  'lfloor':8970, 
  'rfloor':8971, 
  'lang':9001, 
  'rang':9002, 
  'loz':9674, 
  'spades':9824, 
  'clubs':9827, 
  'hearts':9829, 
  'diams':9830, 
  'OElig':338, 
  'oelig':339, 
  'Scaron':352, 
  'scaron':353, 
  'Yuml':376, 
  'circ':710, 
  'tilde':732, 
  'ensp':8194, 
  'emsp':8195, 
  'thinsp':8201, 
  'zwnj':8204, 
  'zwj':8205, 
  'lrm':8206, 
  'rlm':8207, 
  'ndash':8211, 
  'mdash':8212, 
  'lsquo':8216, 
  'rsquo':8217, 
  'sbquo':8218, 
  'ldquo':8220, 
  'rdquo':8221, 
  'bdquo':8222, 
  'dagger':8224, 
  'Dagger':8225, 
  'permil':8240, 
  'lsaquo':8249, 
  'rsaquo':8250, 
  'euro':8364
}



module.exports  = entities;
},{}],17:[function(require,module,exports){
// simplest event emitter 60 lines
// ===============================
var slice = [].slice, _ = require("../util.js");
var API = {
  $on: function(event, fn) {
    if(typeof event === "object"){
      for (var i in event) {
        this.$on(i, event[i]);
      }
    }else{
      // @patch: for list
      var context = this;
      var handles = context._handles || (context._handles = {}),
        calls = handles[event] || (handles[event] = []);
      calls.push(fn);
    }
    return this;
  },
  $off: function(event, fn) {
    var context = this;
    if(!context._handles) return;
    if(!event) this._handles = {};
    var handles = context._handles,
      calls;

    if (calls = handles[event]) {
      if (!fn) {
        handles[event] = [];
        return context;
      }
      for (var i = 0, len = calls.length; i < len; i++) {
        if (fn === calls[i]) {
          calls.splice(i, 1);
          return context;
        }
      }
    }
    return context;
  },
  // bubble event
  $emit: function(event){
    // @patch: for list
    var context = this;
    var handles = context._handles, calls, args, type;
    if(!event) return;
    var args = slice.call(arguments, 1);
    var type = event;

    if(!handles) return context;
    if(calls = handles[type.slice(1)]){
      for (var j = 0, len = calls.length; j < len; j++) {
        calls[j].apply(context, args)
      }
    }
    if (!(calls = handles[type])) return context;
    for (var i = 0, len = calls.length; i < len; i++) {
      calls[i].apply(context, args)
    }
    // if(calls.length) context.$update();
    return context;
  },
  // capture  event
  $one: function(){
    
}
}
// container class
function Event() {}
_.extend(Event.prototype, API)

Event.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  _.extend(obj, API)
}
module.exports = Event;
},{"../util.js":28}],18:[function(require,module,exports){
// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org

// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
  
// inspired by backbone's extend and klass
var _ = require("../util.js"),
  fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
  isFn = function(o){return typeof o === "function"};


function wrap(k, fn, supro) {
  return function () {
    var tmp = this.supr;
    this.supr = supro[k];
    var ret = fn.apply(this, arguments);
    this.supr = tmp;
    return ret;
  }
}

function process( what, o, supro ) {
  for ( var k in o ) {
    if (o.hasOwnProperty(k)) {

      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
    }
  }
}

// if the property is ["events", "data", "computed"] , we should merge them
var merged = ["events", "data", "computed"], mlen = merged.length;
module.exports = function extend(o){
  o = o || {};
  var supr = this, proto,
    supro = supr && supr.prototype || {};

  if(typeof o === 'function'){
    proto = o.prototype;
    o.implement = implement;
    o.extend = extend;
    return o;
  } 
  
  function fn() {
    supr.apply(this, arguments);
  }

  proto = _.createProto(fn, supro);

  function implement(o){
    // we need merge the merged property
    var len = mlen;
    for(;len--;){
      var prop = merged[len];
      if(o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
        _.extend(proto[prop], o[prop], true) 
        delete o[prop];
      }
    }


    process(proto, o, supro); 
    return this;
  }



  fn.implement = implement
  fn.implement(o)
  if(supr.__after__) supr.__after__.call(fn, supr, o);
  fn.extend = extend;
  return fn;
}


},{"../util.js":28}],19:[function(require,module,exports){

var f = module.exports = {};

// json:  two way 
//  - get: JSON.stringify
//  - set: JSON.parse
//  - example: `{ title|json }`
f.json = {
  get: function( value ){
    return typeof JSON !== 'undefined'? JSON.stringify(value): value;
  },
  set: function( value ){
    return typeof JSON !== 'undefined'? JSON.parse(value) : value;
  }
}

// last: one-way
//  - get: return the last item in list
//  - example: `{ list|last }`
f.last = function(arr){
  return arr && arr[arr.length - 1];
}

// average: one-way
//  - get: copute the average of the list
//  - example: `{ list| average: "score" }`
f.average = function(array, key){
  array = array || [];
  return array.length? f.total(array, key)/ array.length : 0;
}


// total: one-way
//  - get: copute the total of the list
//  - example: `{ list| average: "score" }`
f.total = function(array, key){
  var total = 0;
  if(!array) return;
  array.forEach(function( item ){
    total += key? item[key] : item;
  })
  return total;
}

// var basicSortFn = function(a, b){return b - a}

// f.sort = function(array, key, reverse){
//   var type = typeof key, sortFn; 
//   switch(type){
//     case 'function': sortFn = key; break;
//     case 'string': sortFn = function(a, b){};break;
//     default:
//       sortFn = basicSortFn;
//   }
//   // need other refernce.
//   return array.slice().sort(function(a,b){
//     return reverse? -sortFn(a, b): sortFn(a, b);
//   })
//   return array
// }



},{}],20:[function(require,module,exports){
var exprCache = require('../env').exprCache;
var _ = require("../util");
var Parser = require("../parser/Parser.js");
module.exports = {
  expression: function(expr, simple){
    // @TODO cache
    if( typeof expr === 'string' && ( expr = expr.trim() ) ){
      expr = exprCache.get( expr ) || exprCache.set( expr, new Parser( expr, { mode: 2, expression: true } ).expression() )
    }
    if(expr) return expr;
  },
  parse: function(template){
    return new Parser(template).parse();
  }
}


},{"../env":11,"../parser/Parser.js":26,"../util":28}],21:[function(require,module,exports){
// shim for es5
var slice = [].slice;
var tstr = ({}).toString;

function extend(o1, o2 ){
  for(var i in o2) if( o1[i] === undefined){
    o1[i] = o2[i]
  }
  return o2;
}

module.exports = function(){
  // String proto ;
  extend(String.prototype, {
    trim: function(){
      return this.replace(/^\s+|\s+$/g, '');
    }
  });


  // Array proto;
  extend(Array.prototype, {
    indexOf: function(obj, from){
      from = from || 0;
      for (var i = from, len = this.length; i < len; i++) {
        if (this[i] === obj) return i;
      }
      return -1;
    },
    forEach: function(callback, context){
      for (var i = 0, len = this.length; i < len; i++) {
        callback.call(context, this[i], i, this);
      }
    },
    filter: function(callback, context){
      var res = [];
      for (var i = 0, length = this.length; i < length; i++) {
        var pass = callback.call(context, this[i], i, this);
        if(pass) res.push(this[i]);
      }
      return res;
    },
    map: function(callback, context){
      var res = [];
      for (var i = 0, length = this.length; i < length; i++) {
        res.push(callback.call(context, this[i], i, this));
      }
      return res;
    }
  });

  // Function proto;
  extend(Function.prototype, {
    bind: function(context){
      var fn = this;
      var preArgs = slice.call(arguments, 1);
      return function(){
        var args = preArgs.concat(slice.call(arguments));
        return fn.apply(context, args);
      }
    }
  })
  
  // Array
  extend(Array, {
    isArray: function(arr){
      return tstr.call(arr) === "[object Array]";
    }
  })
}


},{}],22:[function(require,module,exports){
var _ = require('../util.js');
var parseExpression = require('./parse.js').expression;
var diffArray = require('./arrayDiff.js');

function Watcher(){}

var methods = {
  $watch: function(expr, fn, options){
    var get, once, test, rlen, extra = this.__ext__; //records length
    if(!this._watchers) this._watchers = [];

    options = options || {};
    if(options === true){
       options = { deep: true }
    }
    var uid = _.uid('w_');
    if(Array.isArray(expr)){
      var tests = [];
      for(var i = 0,len = expr.length; i < len; i++){
          tests.push(this.$expression(expr[i]).get)
      }
      var prev = [];
      test = function(context){
        var equal = true;
        for(var i =0, len = tests.length; i < len; i++){
          var splice = tests[i](context, extra);
          if(!_.equals(splice, prev[i])){
             equal = false;
             prev[i] = _.clone(splice);
          }
        }
        return equal? false: prev;
      }
    }else{
      if(typeof expr === 'function'){
        get = expr.bind(this);      
      }else{
        expr = this._touchExpr( parseExpression(expr) );
        get = expr.get;
        once = expr.once;
      }
    }

    var watcher = {
      id: uid, 
      get: get, 
      fn: fn, 
      once: once, 
      force: options.force,
      // don't use ld to resolve array diff
      notld: options.indexTrack,
      test: test,
      deep: options.deep,
      last: options.sync? get(this): options.last
    }
    
    this._watchers.push( watcher );

    rlen = this._records && this._records.length;
    if(rlen) this._records[rlen-1].push(uid)
    // init state.
    if(options.init === true){
      var prephase = this.$phase;
      this.$phase = 'digest';
      this._checkSingleWatch( watcher, this._watchers.length-1 );
      this.$phase = prephase;
    }
    return watcher;
  },
  $unwatch: function(uid){
    uid = uid.uid || uid;
    if(!this._watchers) this._watchers = [];
    if(Array.isArray(uid)){
      for(var i =0, len = uid.length; i < len; i++){
        this.$unwatch(uid[i]);
      }
    }else{
      var watchers = this._watchers, watcher, wlen;
      if(!uid || !watchers || !(wlen = watchers.length)) return;
      for(;wlen--;){
        watcher = watchers[wlen];
        if(watcher && watcher.id === uid ){
          watchers.splice(wlen, 1);
        }
      }
    }
  },
  $expression: function(value){
    return this._touchExpr(parseExpression(value))
  },
  /**
   * the whole digest loop ,just like angular, it just a dirty-check loop;
   * @param  {String} path  now regular process a pure dirty-check loop, but in parse phase, 
   *                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
   * @return {Void}   
   */

  $digest: function(){
    if(this.$phase === 'digest' || this._mute) return;
    this.$phase = 'digest';
    var dirty = false, n =0;
    while(dirty = this._digest()){

      if((++n) > 20){ // max loop
        throw Error('there may a circular dependencies reaches')
      }
    }
    if( n > 0 && this.$emit) this.$emit("$update");
    this.$phase = null;
  },
  // private digest logic
  _digest: function(){
    // if(this.context) return this.context.$digest();
    // if(this.$emit) this.$emit('digest');
    var watchers = this._watchers;
    var dirty = false, children, watcher, watcherDirty;
    if(watchers && watchers.length){
      for(var i = 0, len = watchers.length;i < len; i++){
        watcher = watchers[i];
        watcherDirty = this._checkSingleWatch(watcher, i);
        if(watcherDirty) dirty = true;
      }
    }
    // check children's dirty.
    children = this._children;
    if(children && children.length){
      for(var m = 0, mlen = children.length; m < mlen; m++){
        if(children[m] && children[m]._digest()) dirty = true;
      }
    }
    return dirty;
  },
  // check a single one watcher 
  _checkSingleWatch: function(watcher, i){
    var dirty = false;
    if(!watcher) return;

    var now, last, tlast, tnow,  eq, diff;

    if(!watcher.test){

      now = watcher.get(this);
      last = watcher.last;
      tlast = _.typeOf(last);
      tnow = _.typeOf(now);
      eq = true, diff;

      // !Object
      if( !(tnow === 'object' && tlast==='object' && watcher.deep) ){
        // Array
        if( tnow === 'array' && ( tlast=='undefined' || tlast === 'array') ){
          diff = diffArray(now, watcher.last || [], watcher.notld)
          if( tlast !== 'array' || diff === true || diff.length ) dirty = true;
        }else{
          eq = _.equals( now, last );
          if( !eq || watcher.force ){
            watcher.force = null;
            dirty = true; 
          }
        }
      }else{
        for(var j in now){
          if(last[j] !== now[j]){
            dirty = true;
            break;
          }
        }
        if(dirty !== true){
          for(var n in last){
            if(last[n] !== now[n]){
              dirty = true;
              break;
            }
          }
        }
      }
    } else{
      // @TODO 是否把多重改掉
      var result = watcher.test(this);
      if(result){
        dirty = true;
        watcher.fn.apply(this, result)
      }
    }
    if(dirty && !watcher.test){
      if(tnow === 'object' && watcher.deep || tnow === 'array'){
        watcher.last = _.clone(now);
      }else{
        watcher.last = now;
      }
      watcher.fn.call(this, now, last, diff)
      if(watcher.once) this._watchers.splice(i, 1);
    }

    return dirty;
  },

  /**
   * **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
   * 
   * @param  {Function|String|Expression} path  
   * @param  {Whatever} value optional, when path is Function, the value is ignored
   * @return {this}     this 
   */
  $set: function(path, value){
    if(path != null){
      var type = _.typeOf(path);
      if( type === 'string' || path.type === 'expression' ){
        path = this.$expression(path);
        path.set(this, value);
      }else if(type === 'function'){
        path.call(this, this.data);
      }else{
        for(var i in path) {
          this.$set(i, path[i])
        }
      }
    }
  },
  // 1. expr canbe string or a Expression
  // 2. detect: if true, if expr is a string will directly return;
  $get: function(expr, detect)  {
    if(detect && typeof expr === 'string') return expr;
    return this.$expression(expr).get(this);
  },
  $update: function(){
    this.$set.apply(this, arguments);
    var rootParent = this;

    do{
      if(rootParent.data.isolate || !rootParent.$parent) break;
      rootParent = rootParent.$parent;
    } while(rootParent)

    rootParent.$digest();
  },
  // auto collect watchers for logic-control.
  _record: function(){
    if(!this._records) this._records = [];
    this._records.push([]);
  },
  _release: function(){
    return this._records.pop();
  }
}


_.extend(Watcher.prototype, methods)


Watcher.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  return _.extend(obj, methods)
}

module.exports = Watcher;
},{"../util.js":28,"./arrayDiff.js":14,"./parse.js":20}],23:[function(require,module,exports){
var env =  require("./env.js");
var config = require("./config"); 
var Regular = module.exports = require("./Regular.js");
var Parser = Regular.Parser;
var Lexer = Regular.Lexer;

if(env.browser){
    require("./directive/base.js");
    require("./directive/animation.js");
    require("./module/timeout.js");
    Regular.dom = require("./dom.js");
}
Regular.env = env;
Regular.util = require("./util.js");
Regular.parse = function(str, options){
  options = options || {};

  if(options.BEGIN || options.END){
    if(options.BEGIN) config.BEGIN = options.BEGIN;
    if(options.END) config.END = options.END;
    Lexer.setup();
  }
  var ast = new Parser(str).parse();
  return !options.stringify? ast : JSON.stringify(ast);
}


},{"./Regular.js":3,"./config":4,"./directive/animation.js":6,"./directive/base.js":7,"./dom.js":10,"./env.js":11,"./module/timeout.js":24,"./util.js":28}],24:[function(require,module,exports){
var Regular = require("../Regular.js");

/**
 * Timeout Module
 * @param {Component} Component 
 */
function TimeoutModule(Component){

  Component.implement({
    /**
     * just like setTimeout, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   delay 
     * @return {Number}   timeoutid
     */
    $timeout: function(fn, delay){
      delay = delay || 0;
      return setTimeout(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), delay);
    },
    /**
     * just like setInterval, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   interval 
     * @return {Number}   intervalid
     */
    $interval: function(fn, interval){
      interval = interval || 1000/60;
      return setInterval(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), interval);
    }
  });
}


Regular.plugin('timeout', TimeoutModule);
Regular.plugin('$timeout', TimeoutModule);
},{"../Regular.js":3}],25:[function(require,module,exports){
var _ = require("../util.js");
var config = require("../config.js");

// some custom tag  will conflict with the Lexer progress
var conflictTag = {"}": "{", "]": "["}, map1, map2;
// some macro for lexer
var macro = {
  'NAME': /(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,
  'IDENT': /[\$_A-Za-z][_0-9A-Za-z\$]*/,
  'SPACE': /[\r\n\f ]/
}


var test = /a|(b)/.exec("a");
var testSubCapure = test && test[1] === undefined? 
  function(str){ return str !== undefined }
  :function(str){return !!str};

function wrapHander(handler){
  return function(all){
    return {type: handler, value: all }
  }
}

function Lexer(input, opts){
  if(conflictTag[config.END]){
    this.markStart = conflictTag[config.END];
    this.markEnd = config.END;
  }

  this.input = (input||"").trim();
  this.opts = opts || {};
  this.map = this.opts.mode !== 2?  map1: map2;
  this.states = ["INIT"];
  if(opts && opts.expression){
     this.states.push("JST");
     this.expression = true;
  }
}

var lo = Lexer.prototype


lo.lex = function(str){
  str = (str || this.input).trim();
  var tokens = [], split, test,mlen, token, state;
  this.input = str, 
  this.marks = 0;
  // init the pos index
  this.index=0;
  var i = 0;
  while(str){
    i++
    state = this.state();
    split = this.map[state] 
    test = split.TRUNK.exec(str);
    if(!test){
      this.error('Unrecoginized Token');
    }
    mlen = test[0].length;
    str = str.slice(mlen)
    token = this._process.call(this, test, split, str)
    if(token) tokens.push(token)
    this.index += mlen;
    // if(state == 'TAG' || state == 'JST') str = this.skipspace(str);
  }

  tokens.push({type: 'EOF'});

  return tokens;
}

lo.error = function(msg){
  throw  Error("Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, this.index));
}

lo._process = function(args, split,str){
  // console.log(args.join(","), this.state())
  var links = split.links, marched = false, token;

  for(var len = links.length, i=0;i<len ;i++){
    var link = links[i],
      handler = link[2],
      index = link[0];
    // if(args[6] === '>' && index === 6) console.log('haha')
    if(testSubCapure(args[index])) {
      marched = true;
      if(handler){
        token = handler.apply(this, args.slice(index, index + link[1]))
        if(token)  token.pos = this.index;
      }
      break;
    }
  }
  if(!marched){ // in ie lt8 . sub capture is "" but ont 
    switch(str.charAt(0)){
      case "<":
        this.enter("TAG");
        break;
      default:
        this.enter("JST");
        break;
    }
  }
  return token;
}
lo.enter = function(state){
  this.states.push(state)
  return this;
}

lo.state = function(){
  var states = this.states;
  return states[states.length-1];
}

lo.leave = function(state){
  var states = this.states;
  if(!state || states[states.length-1] === state) states.pop()
}


Lexer.setup = function(){
  macro.END = config.END;
  macro.BEGIN = config.BEGIN;
  //
  map1 = genMap([
    // INIT
    rules.ENTER_JST,
    rules.ENTER_TAG,
    rules.TEXT,

    //TAG
    rules.TAG_NAME,
    rules.TAG_OPEN,
    rules.TAG_CLOSE,
    rules.TAG_PUNCHOR,
    rules.TAG_ENTER_JST,
    rules.TAG_UNQ_VALUE,
    rules.TAG_STRING,
    rules.TAG_SPACE,
    rules.TAG_COMMENT,

    // JST
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_COMMENT,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])

  // ignored the tag-relative token
  map2 = genMap([
    // INIT no < restrict
    rules.ENTER_JST2,
    rules.TEXT,
    // JST
    rules.JST_COMMENT,
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])
}


function genMap(rules){
  var rule, map = {}, sign;
  for(var i = 0, len = rules.length; i < len ; i++){
    rule = rules[i];
    sign = rule[2] || 'INIT';
    ( map[sign] || (map[sign] = {rules:[], links:[]}) ).rules.push(rule);
  }
  return setup(map);
}

function setup(map){
  var split, rules, trunks, handler, reg, retain, rule;
  function replaceFn(all, one){
    return typeof macro[one] === 'string'? 
      _.escapeRegExp(macro[one]) 
      : String(macro[one]).slice(1,-1);
  }

  for(var i in map){

    split = map[i];
    split.curIndex = 1;
    rules = split.rules;
    trunks = [];

    for(var j = 0,len = rules.length; j<len; j++){
      rule = rules[j]; 
      reg = rule[0];
      handler = rule[1];

      if(typeof handler === 'string'){
        handler = wrapHander(handler);
      }
      if(_.typeOf(reg) === 'regexp') reg = reg.toString().slice(1, -1);

      reg = reg.replace(/\{(\w+)\}/g, replaceFn)
      retain = _.findSubCapture(reg) + 1; 
      split.links.push([split.curIndex, retain, handler]); 
      split.curIndex += retain;
      trunks.push(reg);
    }
    split.TRUNK = new RegExp("^(?:(" + trunks.join(")|(") + "))")
  }
  return map;
}

var rules = {

  // 1. INIT
  // ---------------

  // mode1's JST ENTER RULE
  ENTER_JST: [/[^\x00<]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) return {type: 'TEXT', value: all}
  }],

  // mode2's JST ENTER RULE
  ENTER_JST2: [/[^\x00]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) return {type: 'TEXT', value: all}
  }],

  ENTER_TAG: [/[^\x00<>]*?(?=<)/, function(all){ 
    this.enter('TAG');
    if(all) return {type: 'TEXT', value: all}
  }],

  TEXT: [/[^\x00]+/, 'TEXT'],

  // 2. TAG
  // --------------------
  TAG_NAME: [/{NAME}/, 'NAME', 'TAG'],
  TAG_UNQ_VALUE: [/[^\{}&"'=><`\r\n\f ]+/, 'UNQ', 'TAG'],

  TAG_OPEN: [/<({NAME})\s*/, function(all, one){ //"
    return {type: 'TAG_OPEN', value: one}
  }, 'TAG'],
  TAG_CLOSE: [/<\/({NAME})[\r\n\f ]*>/, function(all, one){
    this.leave();
    return {type: 'TAG_CLOSE', value: one }
  }, 'TAG'],

    // mode2's JST ENTER RULE
  TAG_ENTER_JST: [/(?={BEGIN})/, function(){
    this.enter('JST');
  }, 'TAG'],


  TAG_PUNCHOR: [/[\>\/=&]/, function(all){
    if(all === '>') this.leave();
    return {type: all, value: all }
  }, 'TAG'],
  TAG_STRING:  [ /'([^']*)'|"([^"]*)\"/, /*'*/  function(all, one, two){ 
    var value = one || two || "";

    return {type: 'STRING', value: value}
  }, 'TAG'],

  TAG_SPACE: [/{SPACE}+/, null, 'TAG'],
  TAG_COMMENT: [/<\!--([^\x00]*?)--\>/, function(all){
    this.leave()
    // this.leave('TAG')
  } ,'TAG'],

  // 3. JST
  // -------------------

  JST_OPEN: ['{BEGIN}#{SPACE}*({IDENT})', function(all, name){
    return {
      type: 'OPEN',
      value: name
    }
  }, 'JST'],
  JST_LEAVE: [/{END}/, function(all){
    if(this.markEnd === all && this.expression) return {type: this.markEnd, value: this.markEnd};
    if(!this.markEnd || !this.marks ){
      this.firstEnterStart = false;
      this.leave('JST');
      return {type: 'END'}
    }else{
      this.marks--;
      return {type: this.markEnd, value: this.markEnd}
    }
  }, 'JST'],
  JST_CLOSE: [/{BEGIN}\s*\/({IDENT})\s*{END}/, function(all, one){
    this.leave('JST');
    return {
      type: 'CLOSE',
      value: one
    }
  }, 'JST'],
  JST_COMMENT: [/{BEGIN}\!([^\x00]*?)\!{END}/, function(){
    this.leave();
  }, 'JST'],
  JST_EXPR_OPEN: ['{BEGIN}',function(all, one){
    if(all === this.markStart){
      if(this.expression) return { type: this.markStart, value: this.markStart };
      if(this.firstEnterStart || this.marks){
        this.marks++
        this.firstEnterStart = false;
        return { type: this.markStart, value: this.markStart };
      }else{
        this.firstEnterStart = true;
      }
    }
    return {
      type: 'EXPR_OPEN',
      escape: false
    }

  }, 'JST'],
  JST_IDENT: ['{IDENT}', 'IDENT', 'JST'],
  JST_SPACE: [/[ \r\n\f]+/, null, 'JST'],
  JST_PUNCHOR: [/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/, function(all){
    return { type: all, value: all }
  },'JST'],

  JST_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
    return {type: 'STRING', value: one || two || ""}
  }, 'JST'],
  JST_NUMBER: [/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/, function(all){
    return {type: 'NUMBER', value: parseFloat(all, 10)};
  }, 'JST']
}


// setup when first config
Lexer.setup();



module.exports = Lexer;

},{"../config.js":4,"../util.js":28}],26:[function(require,module,exports){
var _ = require("../util.js");

var config = require("../config.js");
var node = require("./node.js");
var Lexer = require("./Lexer.js");
var varName = _.varName;
var ctxName = _.ctxName;
var extName = _.extName;
var isPath = _.makePredicate("STRING IDENT NUMBER");
var isKeyWord = _.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object");




function Parser(input, opts){
  opts = opts || {};

  this.input = input;
  this.tokens = new Lexer(input, opts).lex();
  this.pos = 0;
  this.length = this.tokens.length;
}


var op = Parser.prototype;


op.parse = function(){
  this.pos = 0;
  var res= this.program();
  if(this.ll().type === 'TAG_CLOSE'){
    this.error("You may got a unclosed Tag")
  }
  return res;
}

op.ll =  function(k){
  k = k || 1;
  if(k < 0) k = k + 1;
  var pos = this.pos + k - 1;
  if(pos > this.length - 1){
      return this.tokens[this.length-1];
  }
  return this.tokens[pos];
}
  // lookahead
op.la = function(k){
  return (this.ll(k) || '').type;
}

op.match = function(type, value){
  var ll;
  if(!(ll = this.eat(type, value))){
    ll  = this.ll();
    this.error('expect [' + type + (value == null? '':':'+ value) + ']" -> got "[' + ll.type + (value==null? '':':'+ll.value) + ']', ll.pos)
  }else{
    return ll;
  }
}

op.error = function(msg, pos){
  msg =  "\n【 parse failed 】 " + msg +  ':\n\n' + _.trackErrorPos(this.input, typeof pos === 'number'? pos: this.ll().pos||0);
  throw new Error(msg);
}

op.next = function(k){
  k = k || 1;
  this.pos += k;
}
op.eat = function(type, value){
  var ll = this.ll();
  if(typeof type !== 'string'){
    for(var len = type.length ; len--;){
      if(ll.type === type[len]) {
        this.next();
        return ll;
      }
    }
  }else{
    if( ll.type === type && (typeof value === 'undefined' || ll.value === value) ){
       this.next();
       return ll;
    }
  }
  return false;
}

// program
//  :EOF
//  | (statement)* EOF
op.program = function(){
  var statements = [],  ll = this.ll();
  while(ll.type !== 'EOF' && ll.type !=='TAG_CLOSE'){

    statements.push(this.statement());
    ll = this.ll();
  }
  // if(ll.type === 'TAG_CLOSE') this.error("You may have unmatched Tag")
  return statements;
}

// statement
//  : xml
//  | jst
//  | text
op.statement = function(){
  var ll = this.ll();
  switch(ll.type){
    case 'NAME':
    case 'TEXT':
      var text = ll.value;
      this.next();
      while(ll = this.eat(['NAME', 'TEXT'])){
        text += ll.value;
      }
      return node.text(text);
    case 'TAG_OPEN':
      return this.xml();
    case 'OPEN': 
      return this.directive();
    case 'EXPR_OPEN':
      return this.interplation();
    default:
      this.error('Unexpected token: '+ this.la())
  }
}

// xml 
// stag statement* TAG_CLOSE?(if self-closed tag)
op.xml = function(){
  var name, attrs, children, selfClosed;
  name = this.match('TAG_OPEN').value;
  attrs = this.attrs();
  selfClosed = this.eat('/')
  this.match('>');
  if( !selfClosed && !_.isVoidTag(name) ){
    children = this.program();
    if(!this.eat('TAG_CLOSE', name)) this.error('expect </'+name+'> got'+ 'no matched closeTag')
  }
  return node.element(name, attrs, children);
}

// xentity
//  -rule(wrap attribute)
//  -attribute
//
// __example__
//  name = 1 |  
//  ng-hide |
//  on-click={{}} | 
//  {{#if name}}on-click={{xx}}{{#else}}on-tap={{}}{{/if}}

op.xentity = function(ll){
  var name = ll.value, value, modifier;
  if(ll.type === 'NAME'){
    //@ only for test
    if(~name.indexOf('.')){
      var tmp = name.split('.');
      name = tmp[0];
      modifier = tmp[1]

    }
    if( this.eat("=") ) value = this.attvalue(modifier);
    return node.attribute( name, value, modifier );
  }else{
    if( name !== 'if') this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #" + name + ' is invalid');
    return this['if'](true);
  }

}

// stag     ::=    '<' Name (S attr)* S? '>'  
// attr    ::=     Name Eq attvalue
op.attrs = function(isAttribute){
  var eat
  if(!isAttribute){
    eat = ["NAME", "OPEN"]
  }else{
    eat = ["NAME"]
  }

  var attrs = [], ll;
  while (ll = this.eat(eat)){
    attrs.push(this.xentity( ll ))
  }
  return attrs;
}

// attvalue
//  : STRING  
//  | NAME
op.attvalue = function(mdf){
  var ll = this.ll();
  switch(ll.type){
    case "NAME":
    case "UNQ":
    case "STRING":
      this.next();
      var value = ll.value;
      if(~value.indexOf(config.BEGIN) && ~value.indexOf(config.END) && mdf!=='cmpl'){
        var constant = true;
        var parsed = new Parser(value, { mode: 2 }).parse();
        // if(parsed.length === 1 && parsed[0].type === 'expression') return parsed[0];
        var body = [];
        parsed.forEach(function(item){
          if(!item.constant) constant=false;
          // silent the mutiple inteplation
            body.push(item.body || "'" + item.text.replace(/'/g, "\\'") + "'");        
        });
        body = "[" + body.join(",") + "].join('')";
        value = node.expression(body, null, constant);
      }
      return value;
    case "EXPR_OPEN":
      return this.interplation();
    // case "OPEN":
    //   if(ll.value === 'inc' || ll.value === 'include'){
    //     this.next();
    //     return this.inc();
    //   }else{
    //     this.error('attribute value only support inteplation and {#inc} statement')
    //   }
    //   break;
    default:
      this.error('Unexpected token: '+ this.la())
  }
}


// {{#}}
op.directive = function(){
  var name = this.ll().value;
  this.next();
  if(typeof this[name] === 'function'){
    return this[name]()
  }else{
    this.error('Undefined directive['+ name +']');
  }
}


// {{}}
op.interplation = function(){
  this.match('EXPR_OPEN');
  var res = this.expression(true);
  this.match('END');
  return res;
}

// {{~}}
op.inc = op.include = function(){
  var content = this.expression();
  this.match('END');
  return node.template(content);
}

// {{#if}}
op["if"] = function(tag){
  var test = this.expression();
  var consequent = [], alternate=[];

  var container = consequent;
  var statement = !tag? "statement" : "attrs";

  this.match('END');

  var ll, close;
  while( ! (close = this.eat('CLOSE')) ){
    ll = this.ll();
    if( ll.type === 'OPEN' ){
      switch( ll.value ){
        case 'else':
          container = alternate;
          this.next();
          this.match( 'END' );
          break;
        case 'elseif':
          this.next();
          alternate.push( this["if"](tag) );
          return node['if']( test, consequent, alternate );
        default:
          container.push( this[statement](true) );
      }
    }else{
      container.push(this[statement](true));
    }
  }
  // if statement not matched
  if(close.value !== "if") this.error('Unmatched if directive')
  return node["if"](test, consequent, alternate);
}


// @mark   mustache syntax have natrure dis, canot with expression
// {{#list}}
op.list = function(){
  // sequence can be a list or hash
  var sequence = this.expression(), variable, ll, track;
  var consequent = [], alternate=[];
  var container = consequent;

  this.match('IDENT', 'as');

  variable = this.match('IDENT').value;

  if(this.eat('IDENT', 'by')){
    if(this.eat('IDENT',variable + '_index')){
      track = true;
    }else{
      track = this.expression();
      if(track.constant){
        // true is means constant, we handle it just like xxx_index.
        track = true;
      }
    }
  }

  this.match('END');

  while( !(ll = this.eat('CLOSE')) ){
    if(this.eat('OPEN', 'else')){
      container =  alternate;
      this.match('END');
    }else{
      container.push(this.statement());
    }
  }
  
  if(ll.value !== 'list') this.error('expect ' + 'list got ' + '/' + ll.value + ' ', ll.pos );
  return node.list(sequence, variable, consequent, alternate, track);
}


op.expression = function(){
  var expression;
  if(this.eat('@(')){ //once bind
    expression = this.expr();
    expression.once = true;
    this.match(')')
  }else{
    expression = this.expr();
  }
  return expression;
}

op.expr = function(){
  this.depend = [];

  var buffer = this.filter()

  var body = buffer.get || buffer;
  var setbody = buffer.set;
  return node.expression(body, setbody, !this.depend.length);
}


// filter
// assign ('|' filtername[':' args]) * 
op.filter = function(){
  var left = this.assign();
  var ll = this.eat('|');
  var buffer = [], setBuffer, prefix,
    attr = "t", 
    set = left.set, get, 
    tmp = "";

  if(ll){
    if(set) setBuffer = [];

    prefix = "(function(" + attr + "){";

    do{
      tmp = attr + " = " + ctxName + "._f_('" + this.match('IDENT').value+ "' ).get.call( "+_.ctxName +"," + attr ;
      if(this.eat(':')){
        tmp +=", "+ this.arguments("|").join(",") + ");"
      }else{
        tmp += ');'
      }
      buffer.push(tmp);
      setBuffer && setBuffer.unshift( tmp.replace(" ).get.call", " ).set.call") );

    }while(ll = this.eat('|'));
    buffer.push("return " + attr );
    setBuffer && setBuffer.push("return " + attr);

    get =  prefix + buffer.join("") + "})("+left.get+")";
    // we call back to value.
    if(setBuffer){
      // change _ss__(name, _p_) to _s__(name, filterFn(_p_));
      set = set.replace(_.setName, 
        prefix + setBuffer.join("") + "})("+　_.setName　+")" );

    }
    // the set function is depend on the filter definition. if it have set method, the set will work
    return this.getset(get, set);
  }
  return left;
}

// assign
// left-hand-expr = condition
op.assign = function(){
  var left = this.condition(), ll;
  if(ll = this.eat(['=', '+=', '-=', '*=', '/=', '%='])){
    if(!left.set) this.error('invalid lefthand expression in assignment expression');
    return this.getset( left.set.replace( "," + _.setName, "," + this.condition().get ).replace("'='", "'"+ll.type+"'"), left.set);
    // return this.getset('(' + left.get + ll.type  + this.condition().get + ')', left.set);
  }
  return left;
}

// or
// or ? assign : assign
op.condition = function(){

  var test = this.or();
  if(this.eat('?')){
    return this.getset([test.get + "?", 
      this.assign().get, 
      this.match(":").type, 
      this.assign().get].join(""));
  }

  return test;
}

// and
// and && or
op.or = function(){

  var left = this.and();

  if(this.eat('||')){
    return this.getset(left.get + '||' + this.or().get);
  }

  return left;
}
// equal
// equal && and
op.and = function(){

  var left = this.equal();

  if(this.eat('&&')){
    return this.getset(left.get + '&&' + this.and().get);
  }
  return left;
}
// relation
// 
// equal == relation
// equal != relation
// equal === relation
// equal !== relation
op.equal = function(){
  var left = this.relation(), ll;
  // @perf;
  if( ll = this.eat(['==','!=', '===', '!=='])){
    return this.getset(left.get + ll.type + this.equal().get);
  }
  return left
}
// relation < additive
// relation > additive
// relation <= additive
// relation >= additive
// relation in additive
op.relation = function(){
  var left = this.additive(), ll;
  // @perf
  if(ll = (this.eat(['<', '>', '>=', '<=']) || this.eat('IDENT', 'in') )){
    return this.getset(left.get + ll.value + this.relation().get);
  }
  return left
}
// additive :
// multive
// additive + multive
// additive - multive
op.additive = function(){
  var left = this.multive() ,ll;
  if(ll= this.eat(['+','-']) ){
    return this.getset(left.get + ll.value + this.additive().get);
  }
  return left
}
// multive :
// unary
// multive * unary
// multive / unary
// multive % unary
op.multive = function(){
  var left = this.range() ,ll;
  if( ll = this.eat(['*', '/' ,'%']) ){
    return this.getset(left.get + ll.type + this.multive().get);
  }
  return left;
}

op.range = function(){
  var left = this.unary(), ll, right;

  if(ll = this.eat('..')){
    right = this.unary();
    var body = 
      "(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+left.get+","+right.get+")"
    return this.getset(body);
  }

  return left;
}



// lefthand
// + unary
// - unary
// ~ unary
// ! unary
op.unary = function(){
  var ll;
  if(ll = this.eat(['+','-','~', '!'])){
    return this.getset('(' + ll.type + this.unary().get + ')') ;
  }else{
    return this.member()
  }
}

// call[lefthand] :
// member args
// member [ expression ]
// member . ident  

op.member = function(base, last, pathes, prevBase){
  var ll, path, extValue;


  var onlySimpleAccessor = false;
  if(!base){ //first
    path = this.primary();
    var type = typeof path;
    if(type === 'string'){ 
      pathes = [];
      pathes.push( path );
      last = path;
      extValue = extName + "." + path
      base = ctxName + "._sg_('" + path + "', " + varName + ", " + extName + ")";
      onlySimpleAccessor = true;
    }else{ //Primative Type
      if(path.get === 'this'){
        base = ctxName;
        pathes = ['this'];
      }else{
        pathes = null;
        base = path.get;
      }
    }
  }else{ // not first enter
    if(typeof last === 'string' && isPath( last) ){ // is valid path
      pathes.push(last);
    }else{
      if(pathes && pathes.length) this.depend.push(pathes);
      pathes = null;
    }
  }
  if(ll = this.eat(['[', '.', '('])){
    switch(ll.type){
      case '.':
          // member(object, property, computed)
        var tmpName = this.match('IDENT').value;
        prevBase = base;
        if( this.la() !== "(" ){ 
          base = ctxName + "._sg_('" + tmpName + "', " + base + ")";
        }else{
          base += "['" + tmpName + "']";
        }
        return this.member( base, tmpName, pathes,  prevBase);
      case '[':
          // member(object, property, computed)
        path = this.assign();
        prevBase = base;
        if( this.la() !== "(" ){ 
        // means function call, we need throw undefined error when call function
        // and confirm that the function call wont lose its context
          base = ctxName + "._sg_(" + path.get + ", " + base + ")";
        }else{
          base += "[" + path.get + "]";
        }
        this.match(']')
        return this.member(base, path, pathes, prevBase);
      case '(':
        // call(callee, args)
        var args = this.arguments().join(',');
        base =  base+"(" + args +")";
        this.match(')')
        return this.member(base, null, pathes);
    }
  }
  if( pathes && pathes.length ) this.depend.push( pathes );
  var res =  {get: base};
  if(last){
    res.set = ctxName + "._ss_(" + 
        (last.get? last.get : "'"+ last + "'") + 
        ","+ _.setName + ","+ 
        (prevBase?prevBase:_.varName) + 
        ", '=', "+ ( onlySimpleAccessor? 1 : 0 ) + ")";
  
  }
  return res;
}

/**
 * 
 */
op.arguments = function(end){
  end = end || ')'
  var args = [];
  do{
    if(this.la() !== end){
      args.push(this.assign().get)
    }
  }while( this.eat(','));
  return args
}


// primary :
// this 
// ident
// literal
// array
// object
// ( expression )

op.primary = function(){
  var ll = this.ll();
  switch(ll.type){
    case "{":
      return this.object();
    case "[":
      return this.array();
    case "(":
      return this.paren();
    // literal or ident
    case 'STRING':
      this.next();
      return this.getset("'" + ll.value + "'")
    case 'NUMBER':
      this.next();
      return this.getset(""+ll.value);
    case "IDENT":
      this.next();
      if(isKeyWord(ll.value)){
        return this.getset( ll.value );
      }
      return ll.value;
    default: 
      this.error('Unexpected Token: ' + ll.type);
  }
}

// object
//  {propAssign [, propAssign] * [,]}

// propAssign
//  prop : assign

// prop
//  STRING
//  IDENT
//  NUMBER

op.object = function(){
  var code = [this.match('{').type];

  var ll = this.eat( ['STRING', 'IDENT', 'NUMBER'] );
  while(ll){
    code.push("'" + ll.value + "'" + this.match(':').type);
    var get = this.assign().get;
    code.push(get);
    ll = null;
    if(this.eat(",") && (ll = this.eat(['STRING', 'IDENT', 'NUMBER'])) ) code.push(",");
  }
  code.push(this.match('}').type);
  return {get: code.join("")}
}

// array
// [ assign[,assign]*]
op.array = function(){
  var code = [this.match('[').type], item;
  if( this.eat("]") ){

     code.push("]");
  } else {
    while(item = this.assign()){
      code.push(item.get);
      if(this.eat(',')) code.push(",");
      else break;
    }
    code.push(this.match(']').type);
  }
  return {get: code.join("")};
}

// '(' expression ')'
op.paren = function(){
  this.match('(');
  var res = this.filter()
  res.get = '(' + res.get + ')';
  this.match(')');
  return res;
}

op.getset = function(get, set){
  return {
    get: get,
    set: set
  }
}



module.exports = Parser;

},{"../config.js":4,"../util.js":28,"./Lexer.js":25,"./node.js":27}],27:[function(require,module,exports){
module.exports = {
  element: function(name, attrs, children){
    return {
      type: 'element',
      tag: name,
      attrs: attrs,
      children: children
    }
  },
  attribute: function(name, value, mdf){
    return {
      type: 'attribute',
      name: name,
      value: value,
      mdf: mdf
    }
  },
  "if": function(test, consequent, alternate){
    return {
      type: 'if',
      test: test,
      consequent: consequent,
      alternate: alternate
    }
  },
  list: function(sequence, variable, body, alternate, track){
    return {
      type: 'list',
      sequence: sequence,
      alternate: alternate,
      variable: variable,
      body: body,
      track: track
    }
  },
  expression: function( body, setbody, constant ){
    return {
      type: "expression",
      body: body,
      constant: constant || false,
      setbody: setbody || false
    }
  },
  text: function(text){
    return {
      type: "text",
      text: text
    }
  },
  template: function(template){
    return {
      type: 'template',
      content: template
    }
  }
}

},{}],28:[function(require,module,exports){
(function (global){
require('./helper/shim.js')();
var _  = module.exports;
var entities = require('./helper/entities.js');
var slice = [].slice;
var o2str = ({}).toString;
var win = typeof window !=='undefined'? window: global;


_.noop = function(){};
_.uid = (function(){
  var _uid=0;
  return function(){
    return _uid++;
  }
})();

_.extend = function( o1, o2, override ){
  // if(_.typeOf(override) === 'array'){
  //  for(var i = 0, len = override.length; i < len; i++ ){
  //   var key = override[i];
  //   o1[key] = o2[key];
  //  } 
  // }else{
  for(var i in o2){
    if( typeof o1[i] === "undefined" || override === true ){
      o1[i] = o2[i]
    }
  }
  // }
  return o1;
}

_.keys = function(obj){
  if(Object.keys) return Object.keys(obj);
  var res = [];
  for(var i in obj) if(obj.hasOwnProperty(i)){
    res.push(i);
  }
  return res;
}

_.varName = 'd';
_.setName = 'p_';
_.ctxName = 'c';
_.extName = 'e';

_.rWord = /^[\$\w]+$/;
_.rSimpleAccessor = /^[\$\w]+(\.[\$\w]+)*$/;

_.nextTick = typeof setImmediate === 'function'? 
  setImmediate.bind(win) : 
  function(callback) {
    setTimeout(callback, 0) 
  }



_.prefix = "var " + _.varName + "=" + _.ctxName + ".data;" +  _.extName  + "=" + _.extName + "||'';";


_.slice = function(obj, start, end){
  var res = [];
  for(var i = start || 0, len = end || obj.length; i < len; i++){
    var item = obj[i];
    res.push(item)
  }
  return res;
}

_.typeOf = function (o) {
  return o == null ? String(o) :o2str.call(o).slice(8, -1).toLowerCase();
}


_.makePredicate = function makePredicate(words, prefix) {
    if (typeof words === "string") {
        words = words.split(" ");
    }
    var f = "",
    cats = [];
    out: for (var i = 0; i < words.length; ++i) {
        for (var j = 0; j < cats.length; ++j){
          if (cats[j][0].length === words[i].length) {
              cats[j].push(words[i]);
              continue out;
          }
        }
        cats.push([words[i]]);
    }
    function compareTo(arr) {
        if (arr.length === 1) return f += "return str === '" + arr[0] + "';";
        f += "switch(str){";
        for (var i = 0; i < arr.length; ++i){
           f += "case '" + arr[i] + "':";
        }
        f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.
    if (cats.length > 3) {
        cats.sort(function(a, b) {
            return b.length - a.length;
        });
        f += "switch(str.length){";
        for (var i = 0; i < cats.length; ++i) {
            var cat = cats[i];
            f += "case " + cat[0].length + ":";
            compareTo(cat);
        }
        f += "}";

        // Otherwise, simply generate a flat `switch` statement.
    } else {
        compareTo(words);
    }
    return new Function("str", f);
}


_.trackErrorPos = (function (){
  // linebreak
  var lb = /\r\n|[\n\r\u2028\u2029]/g;
  var minRange = 20, maxRange = 20;
  function findLine(lines, pos){
    var tmpLen = 0;
    for(var i = 0,len = lines.length; i < len; i++){
      var lineLen = (lines[i] || "").length;

      if(tmpLen + lineLen > pos) {
        return {num: i, line: lines[i], start: pos - i - tmpLen , prev:lines[i-1], next: lines[i+1] };
      }
      // 1 is for the linebreak
      tmpLen = tmpLen + lineLen ;
    }
  }
  function formatLine(str,  start, num, target){
    var len = str.length;
    var min = start - minRange;
    if(min < 0) min = 0;
    var max = start + maxRange;
    if(max > len) max = len;

    var remain = str.slice(min, max);
    var prefix = "[" +(num+1) + "] " + (min > 0? ".." : "")
    var postfix = max < len ? "..": "";
    var res = prefix + remain + postfix;
    if(target) res += "\n" + new Array(start-min + prefix.length + 1).join(" ") + "^^^";
    return res;
  }
  return function(input, pos){
    if(pos > input.length-1) pos = input.length-1;
    lb.lastIndex = 0;
    var lines = input.split(lb);
    var line = findLine(lines,pos);
    var start = line.start, num = line.num;

    return (line.prev? formatLine(line.prev, start, num-1 ) + '\n': '' ) + 
      formatLine(line.line, start, num, true) + '\n' + 
      (line.next? formatLine(line.next, start, num+1 ) + '\n': '' );

  }
})();


var ignoredRef = /\((\?\!|\?\:|\?\=)/g;
_.findSubCapture = function (regStr) {
  var left = 0,
    right = 0,
    len = regStr.length,
    ignored = regStr.match(ignoredRef); // ignored uncapture
  if(ignored) ignored = ignored.length
  else ignored = 0;
  for (; len--;) {
    var letter = regStr.charAt(len);
    if (len === 0 || regStr.charAt(len - 1) !== "\\" ) { 
      if (letter === "(") left++;
      if (letter === ")") right++;
    }
  }
  if (left !== right) throw "RegExp: "+ regStr + "'s bracket is not marched";
  else return left - ignored;
};


_.escapeRegExp = function( str){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
  return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
    return '\\' + match;
  });
};


var rEntity = new RegExp("&(" + _.keys(entities).join('|') + ');', 'gi');

_.convertEntity = function(chr){

  return ("" + chr).replace(rEntity, function(all, capture){
    return String.fromCharCode(entities[capture])
  });

}


// simple get accessor

_.createObject = function(o, props){
    function Foo() {}
    Foo.prototype = o;
    var res = new Foo;
    if(props) _.extend(res, props);
    return res;
}

_.createProto = function(fn, o){
    function Foo() { this.constructor = fn;}
    Foo.prototype = o;
    return (fn.prototype = new Foo());
}



/**
clone
*/
_.clone = function clone(obj){
    var type = _.typeOf(obj);
    if(type === 'array'){
      var cloned = [];
      for(var i=0,len = obj.length; i< len;i++){
        cloned[i] = obj[i]
      }
      return cloned;
    }
    if(type === 'object'){
      var cloned = {};
      for(var i in obj) if(obj.hasOwnProperty(i)){
        cloned[i] = obj[i];
      }
      return cloned;
    }
    return obj;
  }

_.equals = function(now, old){
  var type = typeof now;
  if(type === 'number' && typeof old === 'number'&& isNaN(now) && isNaN(old)) return true
  return now === old;
}

var dash = /-([a-z])/g;
_.camelCase = function(str){
  return str.replace(dash, function(all, capture){
    return capture.toUpperCase();
  })
}



_.throttle = function throttle(func, wait){
  var wait = wait || 100;
  var context, args, result;
  var timeout = null;
  var previous = 0;
  var later = function() {
    previous = +new Date;
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function() {
    var now = + new Date;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// hogan escape
// ==============
_.escape = (function(){
  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  return function(str) {
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }
})();

_.cache = function(max){
  max = max || 1000;
  var keys = [],
      cache = {};
  return {
    set: function(key, value) {
      if (keys.length > this.max) {
        cache[keys.shift()] = undefined;
      }
      // 
      if(cache[key] === undefined){
        keys.push(key);
      }
      cache[key] = value;
      return value;
    },
    get: function(key) {
      if (key === undefined) return cache;
      return cache[key];
    },
    max: max,
    len:function(){
      return keys.length;
    }
  };
}

// // setup the raw Expression
// _.touchExpression = function(expr){
//   if(expr.type === 'expression'){
//   }
//   return expr;
// }


// handle the same logic on component's `on-*` and element's `on-*`
// return the fire object
_.handleEvent = function(value, type ){
  var self = this, evaluate;
  if(value.type === 'expression'){ // if is expression, go evaluated way
    evaluate = value.get;
  }
  if(evaluate){
    return function fire(obj){
      self.data.$event = obj;
      var res = evaluate(self);
      if(res === false && obj && obj.preventDefault) obj.preventDefault();
      self.data.$event = undefined;
      self.$update();
    }
  }else{
    return function fire(){
      var args = slice.call(arguments)      
      args.unshift(value);
      self.$emit.apply(self, args);
      self.$update();
    }
  }
}

// only call once
_.once = function(fn){
  var time = 0;
  return function(){
    if( time++ === 0) fn.apply(this, arguments);
  }
}

_.fixObjStr = function(str){
  if(str.trim().indexOf('{') !== 0){
    return '{' + str + '}';
  }
  return str;
}



_.log = function(msg, type){
  if(typeof console !== "undefined")  console[type || "log"](msg);
}




//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
_.isVoidTag = _.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content");
_.isBooleanAttr = _.makePredicate('selected checked disabled readOnly required open autofocus controls autoplay compact loop defer multiple');

_.isFalse - function(){return false}
_.isTrue - function(){return true}

_.isExpr = function(expr){
  return expr && expr.type === 'expression';
}
// @TODO: make it more strict
_.isGroup = function(group){
  return group.inject || group.$inject;
}

_.getCompileFn = function(source, ctx, options){
  return ctx.$compile.bind(ctx,source, options)
}



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi9oZWxwZXIvc2hpbS5qcycpKCk7XG52YXIgXyAgPSBtb2R1bGUuZXhwb3J0cztcbnZhciBlbnRpdGllcyA9IHJlcXVpcmUoJy4vaGVscGVyL2VudGl0aWVzLmpzJyk7XG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBvMnN0ciA9ICh7fSkudG9TdHJpbmc7XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0ndW5kZWZpbmVkJz8gd2luZG93OiBnbG9iYWw7XG5cblxuXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXy51aWQgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIF91aWQ9MDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF91aWQrKztcbiAgfVxufSkoKTtcblxuXy5leHRlbmQgPSBmdW5jdGlvbiggbzEsIG8yLCBvdmVycmlkZSApe1xuICAvLyBpZihfLnR5cGVPZihvdmVycmlkZSkgPT09ICdhcnJheScpe1xuICAvLyAgZm9yKHZhciBpID0gMCwgbGVuID0gb3ZlcnJpZGUubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgLy8gICB2YXIga2V5ID0gb3ZlcnJpZGVbaV07XG4gIC8vICAgbzFba2V5XSA9IG8yW2tleV07XG4gIC8vICB9IFxuICAvLyB9ZWxzZXtcbiAgZm9yKHZhciBpIGluIG8yKXtcbiAgICBpZiggdHlwZW9mIG8xW2ldID09PSBcInVuZGVmaW5lZFwiIHx8IG92ZXJyaWRlID09PSB0cnVlICl7XG4gICAgICBvMVtpXSA9IG8yW2ldXG4gICAgfVxuICB9XG4gIC8vIH1cbiAgcmV0dXJuIG8xO1xufVxuXG5fLmtleXMgPSBmdW5jdGlvbihvYmope1xuICBpZihPYmplY3Qua2V5cykgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yKHZhciBpIGluIG9iaikgaWYob2JqLmhhc093blByb3BlcnR5KGkpKXtcbiAgICByZXMucHVzaChpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5fLnZhck5hbWUgPSAnZCc7XG5fLnNldE5hbWUgPSAncF8nO1xuXy5jdHhOYW1lID0gJ2MnO1xuXy5leHROYW1lID0gJ2UnO1xuXG5fLnJXb3JkID0gL15bXFwkXFx3XSskLztcbl8uclNpbXBsZUFjY2Vzc29yID0gL15bXFwkXFx3XSsoXFwuW1xcJFxcd10rKSokLztcblxuXy5uZXh0VGljayA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbic/IFxuICBzZXRJbW1lZGlhdGUuYmluZCh3aW4pIDogXG4gIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgMCkgXG4gIH1cblxuXG5cbl8ucHJlZml4ID0gXCJ2YXIgXCIgKyBfLnZhck5hbWUgKyBcIj1cIiArIF8uY3R4TmFtZSArIFwiLmRhdGE7XCIgKyAgXy5leHROYW1lICArIFwiPVwiICsgXy5leHROYW1lICsgXCJ8fCcnO1wiO1xuXG5cbl8uc2xpY2UgPSBmdW5jdGlvbihvYmosIHN0YXJ0LCBlbmQpe1xuICB2YXIgcmVzID0gW107XG4gIGZvcih2YXIgaSA9IHN0YXJ0IHx8IDAsIGxlbiA9IGVuZCB8fCBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIHZhciBpdGVtID0gb2JqW2ldO1xuICAgIHJlcy5wdXNoKGl0ZW0pXG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuXy50eXBlT2YgPSBmdW5jdGlvbiAobykge1xuICByZXR1cm4gbyA9PSBudWxsID8gU3RyaW5nKG8pIDpvMnN0ci5jYWxsKG8pLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5cbl8ubWFrZVByZWRpY2F0ZSA9IGZ1bmN0aW9uIG1ha2VQcmVkaWNhdGUod29yZHMsIHByZWZpeCkge1xuICAgIGlmICh0eXBlb2Ygd29yZHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgd29yZHMgPSB3b3Jkcy5zcGxpdChcIiBcIik7XG4gICAgfVxuICAgIHZhciBmID0gXCJcIixcbiAgICBjYXRzID0gW107XG4gICAgb3V0OiBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2F0cy5sZW5ndGg7ICsrail7XG4gICAgICAgICAgaWYgKGNhdHNbal1bMF0ubGVuZ3RoID09PSB3b3Jkc1tpXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2F0c1tqXS5wdXNoKHdvcmRzW2ldKTtcbiAgICAgICAgICAgICAgY29udGludWUgb3V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRzLnB1c2goW3dvcmRzW2ldXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmVUbyhhcnIpIHtcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDEpIHJldHVybiBmICs9IFwicmV0dXJuIHN0ciA9PT0gJ1wiICsgYXJyWzBdICsgXCInO1wiO1xuICAgICAgICBmICs9IFwic3dpdGNoKHN0cil7XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgZiArPSBcImNhc2UgJ1wiICsgYXJyW2ldICsgXCInOlwiO1xuICAgICAgICB9XG4gICAgICAgIGYgKz0gXCJyZXR1cm4gdHJ1ZX1yZXR1cm4gZmFsc2U7XCI7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGVyZSBhcmUgbW9yZSB0aGFuIHRocmVlIGxlbmd0aCBjYXRlZ29yaWVzLCBhbiBvdXRlclxuICAgIC8vIHN3aXRjaCBmaXJzdCBkaXNwYXRjaGVzIG9uIHRoZSBsZW5ndGhzLCB0byBzYXZlIG9uIGNvbXBhcmlzb25zLlxuICAgIGlmIChjYXRzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgY2F0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgZiArPSBcInN3aXRjaChzdHIubGVuZ3RoKXtcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2F0ID0gY2F0c1tpXTtcbiAgICAgICAgICAgIGYgKz0gXCJjYXNlIFwiICsgY2F0WzBdLmxlbmd0aCArIFwiOlwiO1xuICAgICAgICAgICAgY29tcGFyZVRvKGNhdCk7XG4gICAgICAgIH1cbiAgICAgICAgZiArPSBcIn1cIjtcblxuICAgICAgICAvLyBPdGhlcndpc2UsIHNpbXBseSBnZW5lcmF0ZSBhIGZsYXQgYHN3aXRjaGAgc3RhdGVtZW50LlxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBhcmVUbyh3b3Jkcyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJzdHJcIiwgZik7XG59XG5cblxuXy50cmFja0Vycm9yUG9zID0gKGZ1bmN0aW9uICgpe1xuICAvLyBsaW5lYnJlYWtcbiAgdmFyIGxiID0gL1xcclxcbnxbXFxuXFxyXFx1MjAyOFxcdTIwMjldL2c7XG4gIHZhciBtaW5SYW5nZSA9IDIwLCBtYXhSYW5nZSA9IDIwO1xuICBmdW5jdGlvbiBmaW5kTGluZShsaW5lcywgcG9zKXtcbiAgICB2YXIgdG1wTGVuID0gMDtcbiAgICBmb3IodmFyIGkgPSAwLGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHZhciBsaW5lTGVuID0gKGxpbmVzW2ldIHx8IFwiXCIpLmxlbmd0aDtcblxuICAgICAgaWYodG1wTGVuICsgbGluZUxlbiA+IHBvcykge1xuICAgICAgICByZXR1cm4ge251bTogaSwgbGluZTogbGluZXNbaV0sIHN0YXJ0OiBwb3MgLSBpIC0gdG1wTGVuICwgcHJldjpsaW5lc1tpLTFdLCBuZXh0OiBsaW5lc1tpKzFdIH07XG4gICAgICB9XG4gICAgICAvLyAxIGlzIGZvciB0aGUgbGluZWJyZWFrXG4gICAgICB0bXBMZW4gPSB0bXBMZW4gKyBsaW5lTGVuIDtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZm9ybWF0TGluZShzdHIsICBzdGFydCwgbnVtLCB0YXJnZXQpe1xuICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuICAgIHZhciBtaW4gPSBzdGFydCAtIG1pblJhbmdlO1xuICAgIGlmKG1pbiA8IDApIG1pbiA9IDA7XG4gICAgdmFyIG1heCA9IHN0YXJ0ICsgbWF4UmFuZ2U7XG4gICAgaWYobWF4ID4gbGVuKSBtYXggPSBsZW47XG5cbiAgICB2YXIgcmVtYWluID0gc3RyLnNsaWNlKG1pbiwgbWF4KTtcbiAgICB2YXIgcHJlZml4ID0gXCJbXCIgKyhudW0rMSkgKyBcIl0gXCIgKyAobWluID4gMD8gXCIuLlwiIDogXCJcIilcbiAgICB2YXIgcG9zdGZpeCA9IG1heCA8IGxlbiA/IFwiLi5cIjogXCJcIjtcbiAgICB2YXIgcmVzID0gcHJlZml4ICsgcmVtYWluICsgcG9zdGZpeDtcbiAgICBpZih0YXJnZXQpIHJlcyArPSBcIlxcblwiICsgbmV3IEFycmF5KHN0YXJ0LW1pbiArIHByZWZpeC5sZW5ndGggKyAxKS5qb2luKFwiIFwiKSArIFwiXl5eXCI7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQsIHBvcyl7XG4gICAgaWYocG9zID4gaW5wdXQubGVuZ3RoLTEpIHBvcyA9IGlucHV0Lmxlbmd0aC0xO1xuICAgIGxiLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIGxpbmVzID0gaW5wdXQuc3BsaXQobGIpO1xuICAgIHZhciBsaW5lID0gZmluZExpbmUobGluZXMscG9zKTtcbiAgICB2YXIgc3RhcnQgPSBsaW5lLnN0YXJ0LCBudW0gPSBsaW5lLm51bTtcblxuICAgIHJldHVybiAobGluZS5wcmV2PyBmb3JtYXRMaW5lKGxpbmUucHJldiwgc3RhcnQsIG51bS0xICkgKyAnXFxuJzogJycgKSArIFxuICAgICAgZm9ybWF0TGluZShsaW5lLmxpbmUsIHN0YXJ0LCBudW0sIHRydWUpICsgJ1xcbicgKyBcbiAgICAgIChsaW5lLm5leHQ/IGZvcm1hdExpbmUobGluZS5uZXh0LCBzdGFydCwgbnVtKzEgKSArICdcXG4nOiAnJyApO1xuXG4gIH1cbn0pKCk7XG5cblxudmFyIGlnbm9yZWRSZWYgPSAvXFwoKFxcP1xcIXxcXD9cXDp8XFw/XFw9KS9nO1xuXy5maW5kU3ViQ2FwdHVyZSA9IGZ1bmN0aW9uIChyZWdTdHIpIHtcbiAgdmFyIGxlZnQgPSAwLFxuICAgIHJpZ2h0ID0gMCxcbiAgICBsZW4gPSByZWdTdHIubGVuZ3RoLFxuICAgIGlnbm9yZWQgPSByZWdTdHIubWF0Y2goaWdub3JlZFJlZik7IC8vIGlnbm9yZWQgdW5jYXB0dXJlXG4gIGlmKGlnbm9yZWQpIGlnbm9yZWQgPSBpZ25vcmVkLmxlbmd0aFxuICBlbHNlIGlnbm9yZWQgPSAwO1xuICBmb3IgKDsgbGVuLS07KSB7XG4gICAgdmFyIGxldHRlciA9IHJlZ1N0ci5jaGFyQXQobGVuKTtcbiAgICBpZiAobGVuID09PSAwIHx8IHJlZ1N0ci5jaGFyQXQobGVuIC0gMSkgIT09IFwiXFxcXFwiICkgeyBcbiAgICAgIGlmIChsZXR0ZXIgPT09IFwiKFwiKSBsZWZ0Kys7XG4gICAgICBpZiAobGV0dGVyID09PSBcIilcIikgcmlnaHQrKztcbiAgICB9XG4gIH1cbiAgaWYgKGxlZnQgIT09IHJpZ2h0KSB0aHJvdyBcIlJlZ0V4cDogXCIrIHJlZ1N0ciArIFwiJ3MgYnJhY2tldCBpcyBub3QgbWFyY2hlZFwiO1xuICBlbHNlIHJldHVybiBsZWZ0IC0gaWdub3JlZDtcbn07XG5cblxuXy5lc2NhcGVSZWdFeHAgPSBmdW5jdGlvbiggc3RyKXsvLyBDcmVkaXQ6IFhSZWdFeHAgMC42LjEgKGMpIDIwMDctMjAwOCBTdGV2ZW4gTGV2aXRoYW4gPGh0dHA6Ly9zdGV2ZW5sZXZpdGhhbi5jb20vcmVnZXgveHJlZ2V4cC8+IE1JVCBMaWNlbnNlXG4gIHJldHVybiBzdHIucmVwbGFjZSgvWy1bXFxde30oKSorPy5cXFxcXiR8LCNcXHNdL2csIGZ1bmN0aW9uKG1hdGNoKXtcbiAgICByZXR1cm4gJ1xcXFwnICsgbWF0Y2g7XG4gIH0pO1xufTtcblxuXG52YXIgckVudGl0eSA9IG5ldyBSZWdFeHAoXCImKFwiICsgXy5rZXlzKGVudGl0aWVzKS5qb2luKCd8JykgKyAnKTsnLCAnZ2knKTtcblxuXy5jb252ZXJ0RW50aXR5ID0gZnVuY3Rpb24oY2hyKXtcblxuICByZXR1cm4gKFwiXCIgKyBjaHIpLnJlcGxhY2UockVudGl0eSwgZnVuY3Rpb24oYWxsLCBjYXB0dXJlKXtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlbnRpdGllc1tjYXB0dXJlXSlcbiAgfSk7XG5cbn1cblxuXG4vLyBzaW1wbGUgZ2V0IGFjY2Vzc29yXG5cbl8uY3JlYXRlT2JqZWN0ID0gZnVuY3Rpb24obywgcHJvcHMpe1xuICAgIGZ1bmN0aW9uIEZvbygpIHt9XG4gICAgRm9vLnByb3RvdHlwZSA9IG87XG4gICAgdmFyIHJlcyA9IG5ldyBGb287XG4gICAgaWYocHJvcHMpIF8uZXh0ZW5kKHJlcywgcHJvcHMpO1xuICAgIHJldHVybiByZXM7XG59XG5cbl8uY3JlYXRlUHJvdG8gPSBmdW5jdGlvbihmbiwgbyl7XG4gICAgZnVuY3Rpb24gRm9vKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZm47fVxuICAgIEZvby5wcm90b3R5cGUgPSBvO1xuICAgIHJldHVybiAoZm4ucHJvdG90eXBlID0gbmV3IEZvbygpKTtcbn1cblxuXG5cbi8qKlxuY2xvbmVcbiovXG5fLmNsb25lID0gZnVuY3Rpb24gY2xvbmUob2JqKXtcbiAgICB2YXIgdHlwZSA9IF8udHlwZU9mKG9iaik7XG4gICAgaWYodHlwZSA9PT0gJ2FycmF5Jyl7XG4gICAgICB2YXIgY2xvbmVkID0gW107XG4gICAgICBmb3IodmFyIGk9MCxsZW4gPSBvYmoubGVuZ3RoOyBpPCBsZW47aSsrKXtcbiAgICAgICAgY2xvbmVkW2ldID0gb2JqW2ldXG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cbiAgICBpZih0eXBlID09PSAnb2JqZWN0Jyl7XG4gICAgICB2YXIgY2xvbmVkID0ge307XG4gICAgICBmb3IodmFyIGkgaW4gb2JqKSBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgICBjbG9uZWRbaV0gPSBvYmpbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbl8uZXF1YWxzID0gZnVuY3Rpb24obm93LCBvbGQpe1xuICB2YXIgdHlwZSA9IHR5cGVvZiBub3c7XG4gIGlmKHR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvbGQgPT09ICdudW1iZXInJiYgaXNOYU4obm93KSAmJiBpc05hTihvbGQpKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gbm93ID09PSBvbGQ7XG59XG5cbnZhciBkYXNoID0gLy0oW2Etel0pL2c7XG5fLmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZShkYXNoLCBmdW5jdGlvbihhbGwsIGNhcHR1cmUpe1xuICAgIHJldHVybiBjYXB0dXJlLnRvVXBwZXJDYXNlKCk7XG4gIH0pXG59XG5cblxuXG5fLnRocm90dGxlID0gZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCl7XG4gIHZhciB3YWl0ID0gd2FpdCB8fCAxMDA7XG4gIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgdmFyIHByZXZpb3VzID0gMDtcbiAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcHJldmlvdXMgPSArbmV3IERhdGU7XG4gICAgdGltZW91dCA9IG51bGw7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbm93ID0gKyBuZXcgRGF0ZTtcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgY29udGV4dCA9IHRoaXM7XG4gICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG4vLyBob2dhbiBlc2NhcGVcbi8vID09PT09PT09PT09PT09XG5fLmVzY2FwZSA9IChmdW5jdGlvbigpe1xuICB2YXIgckFtcCA9IC8mL2csXG4gICAgICByTHQgPSAvPC9nLFxuICAgICAgckd0ID0gLz4vZyxcbiAgICAgIHJBcG9zID0gL1xcJy9nLFxuICAgICAgclF1b3QgPSAvXFxcIi9nLFxuICAgICAgaENoYXJzID0gL1smPD5cXFwiXFwnXS87XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBoQ2hhcnMudGVzdChzdHIpID9cbiAgICAgIHN0clxuICAgICAgICAucmVwbGFjZShyQW1wLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZShyTHQsICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2Uockd0LCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKHJBcG9zLCAnJiMzOTsnKVxuICAgICAgICAucmVwbGFjZShyUXVvdCwgJyZxdW90OycpIDpcbiAgICAgIHN0cjtcbiAgfVxufSkoKTtcblxuXy5jYWNoZSA9IGZ1bmN0aW9uKG1heCl7XG4gIG1heCA9IG1heCB8fCAxMDAwO1xuICB2YXIga2V5cyA9IFtdLFxuICAgICAgY2FjaGUgPSB7fTtcbiAgcmV0dXJuIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgIGNhY2hlW2tleXMuc2hpZnQoKV0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICAvLyBcbiAgICAgIGlmKGNhY2hlW2tleV0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgICAgY2FjaGVba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNhY2hlO1xuICAgICAgcmV0dXJuIGNhY2hlW2tleV07XG4gICAgfSxcbiAgICBtYXg6IG1heCxcbiAgICBsZW46ZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBrZXlzLmxlbmd0aDtcbiAgICB9XG4gIH07XG59XG5cbi8vIC8vIHNldHVwIHRoZSByYXcgRXhwcmVzc2lvblxuLy8gXy50b3VjaEV4cHJlc3Npb24gPSBmdW5jdGlvbihleHByKXtcbi8vICAgaWYoZXhwci50eXBlID09PSAnZXhwcmVzc2lvbicpe1xuLy8gICB9XG4vLyAgIHJldHVybiBleHByO1xuLy8gfVxuXG5cbi8vIGhhbmRsZSB0aGUgc2FtZSBsb2dpYyBvbiBjb21wb25lbnQncyBgb24tKmAgYW5kIGVsZW1lbnQncyBgb24tKmBcbi8vIHJldHVybiB0aGUgZmlyZSBvYmplY3Rcbl8uaGFuZGxlRXZlbnQgPSBmdW5jdGlvbih2YWx1ZSwgdHlwZSApe1xuICB2YXIgc2VsZiA9IHRoaXMsIGV2YWx1YXRlO1xuICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicpeyAvLyBpZiBpcyBleHByZXNzaW9uLCBnbyBldmFsdWF0ZWQgd2F5XG4gICAgZXZhbHVhdGUgPSB2YWx1ZS5nZXQ7XG4gIH1cbiAgaWYoZXZhbHVhdGUpe1xuICAgIHJldHVybiBmdW5jdGlvbiBmaXJlKG9iail7XG4gICAgICBzZWxmLmRhdGEuJGV2ZW50ID0gb2JqO1xuICAgICAgdmFyIHJlcyA9IGV2YWx1YXRlKHNlbGYpO1xuICAgICAgaWYocmVzID09PSBmYWxzZSAmJiBvYmogJiYgb2JqLnByZXZlbnREZWZhdWx0KSBvYmoucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNlbGYuZGF0YS4kZXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH1lbHNle1xuICAgIHJldHVybiBmdW5jdGlvbiBmaXJlKCl7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSAgICAgIFxuICAgICAgYXJncy51bnNoaWZ0KHZhbHVlKTtcbiAgICAgIHNlbGYuJGVtaXQuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gb25seSBjYWxsIG9uY2Vcbl8ub25jZSA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHRpbWUgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBpZiggdGltZSsrID09PSAwKSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbl8uZml4T2JqU3RyID0gZnVuY3Rpb24oc3RyKXtcbiAgaWYoc3RyLnRyaW0oKS5pbmRleE9mKCd7JykgIT09IDApe1xuICAgIHJldHVybiAneycgKyBzdHIgKyAnfSc7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5cbl8ubG9nID0gZnVuY3Rpb24obXNnLCB0eXBlKXtcbiAgaWYodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpICBjb25zb2xlW3R5cGUgfHwgXCJsb2dcIl0obXNnKTtcbn1cblxuXG5cblxuLy9odHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9zaW5nbGUtcGFnZS5odG1sI3ZvaWQtZWxlbWVudHNcbl8uaXNWb2lkVGFnID0gXy5tYWtlUHJlZGljYXRlKFwiYXJlYSBiYXNlIGJyIGNvbCBlbWJlZCBociBpbWcgaW5wdXQga2V5Z2VuIGxpbmsgbWVudWl0ZW0gbWV0YSBwYXJhbSBzb3VyY2UgdHJhY2sgd2JyIHItY29udGVudFwiKTtcbl8uaXNCb29sZWFuQXR0ciA9IF8ubWFrZVByZWRpY2F0ZSgnc2VsZWN0ZWQgY2hlY2tlZCBkaXNhYmxlZCByZWFkT25seSByZXF1aXJlZCBvcGVuIGF1dG9mb2N1cyBjb250cm9scyBhdXRvcGxheSBjb21wYWN0IGxvb3AgZGVmZXIgbXVsdGlwbGUnKTtcblxuXy5pc0ZhbHNlIC0gZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2V9XG5fLmlzVHJ1ZSAtIGZ1bmN0aW9uKCl7cmV0dXJuIHRydWV9XG5cbl8uaXNFeHByID0gZnVuY3Rpb24oZXhwcil7XG4gIHJldHVybiBleHByICYmIGV4cHIudHlwZSA9PT0gJ2V4cHJlc3Npb24nO1xufVxuLy8gQFRPRE86IG1ha2UgaXQgbW9yZSBzdHJpY3Rcbl8uaXNHcm91cCA9IGZ1bmN0aW9uKGdyb3VwKXtcbiAgcmV0dXJuIGdyb3VwLmluamVjdCB8fCBncm91cC4kaW5qZWN0O1xufVxuXG5fLmdldENvbXBpbGVGbiA9IGZ1bmN0aW9uKHNvdXJjZSwgY3R4LCBvcHRpb25zKXtcbiAgcmV0dXJuIGN0eC4kY29tcGlsZS5iaW5kKGN0eCxzb3VyY2UsIG9wdGlvbnMpXG59XG5cblxuIl19
},{"./helper/entities.js":16,"./helper/shim.js":21}],29:[function(require,module,exports){
var diffArray = require('./helper/arrayDiff.js');
var combine = require('./helper/combine.js');
var animate = require("./helper/animate.js");
var node = require("./parser/node.js");
var Group = require('./group.js');
var dom = require("./dom.js");
var _ = require('./util');


var walkers = module.exports = {};

walkers.list = function(ast, options){

  var Regular = walkers.Regular;  
  var placeholder = document.createComment("Regular list"),
    namespace = options.namespace,
    extra = options.extra;
  var self = this;
  var group = new Group([placeholder]);
  var indexName = ast.variable + '_index';
  var variable = ast.variable;
  var alternate = ast.alternate;
  var track = ast.track, keyOf, extraObj;
  if( track && track !== true ){
    track = this._touchExpr(track);
    extraObj = _.createObject(extra);
    keyOf = function( item, index ){
      extraObj[ variable ] = item;
      extraObj[ indexName ] = index;
      return track.get( self, extraObj );
    }
  }
  function removeRange(index, rlen){
    for(var j = 0; j< rlen; j++){ //removed
      var removed = group.children.splice( index + 1, 1)[0];
      removed.destroy(true);
    }
  }
  function addRange(index, end, newValue){
    for(var o = index; o < end; o++){ //add
      // prototype inherit
      var item = newValue[o];
      var data = {};
      data[indexName] = o;
      data[variable] = item;

      data = _.createObject(extra, data);
      var section = self.$compile(ast.body, {
        extra: data,
        namespace:namespace,
        record: true,
        outer: options.outer
      })
      section.data = data;
      // autolink
      var insert =  combine.last(group.get(o));
      if(insert.parentNode){
        animate.inject(combine.node(section),insert, 'after');
      }
      // insert.parentNode.insertBefore(combine.node(section), insert.nextSibling);
      group.children.splice( o + 1 , 0, section);
    }
  }

  function updateRange(start, end, newValue){
    for(var k = start; k < end; k++){ // no change
      var sect = group.get( k + 1 );
      sect.data[ indexName ] = k;
      sect.data[ variable ] = newValue[k];
    }
  }

  function updateLD(newValue, oldValue, splices){
    if(!newValue) {
      newValue = [];
      splices = diffArray(newValue, oldValue);
    }
     
    if(!splices || !splices.length) return;
    var cur = placeholder;
    var m = 0, len = newValue.length;
      
    for(var i = 0; i < splices.length; i++){ //init
      var splice = splices[i];
      var index = splice.index; // beacuse we use a comment for placeholder
      var removed = splice.removed;
      var add = splice.add;
      var rlen = removed.length;
      // for track
      if( track && rlen && add ){
        var minar = Math.min(rlen, add);
        var tIndex = 0;
        while(tIndex < minar){
          if( keyOf(newValue[index], index) !== keyOf( removed[0], index ) ){
            removeRange(index, 1)
            addRange(index, index+1, newValue)
          }
          removed.shift();
          add--;
          index++;
          tIndex++;
        }
        rlen = removed.length;
      }
      // update
      updateRange(m, index, newValue);
      removeRange( index ,rlen)

      addRange(index, index+add, newValue)

      m = index + add - rlen;
      m  = m < 0? 0 : m;

    }
    if(m < len){
      for(var i = m; i < len; i++){
        var pair = group.get(i + 1);
        pair.data[indexName] = i;
      }
    }
  }

  // if the track is constant test.
  function updateSimple(newValue, oldValue){
    newValue = newValue || [];
    oldValue  = oldValue || [];

    var nlen = newValue.length || 0;
    var olen = oldValue.length || 0;
    var mlen = Math.min(nlen, olen);


    updateRange(0, mlen, newValue)
    if(nlen < olen){ //need add
      removeRange(nlen, olen-nlen);
    }else if(nlen > olen){
      addRange(olen, nlen, newValue);
    }
  }

  function update(newValue, oldValue, splices){
    var nlen = newValue && newValue.length;
    var olen = oldValue && oldValue.length;
    if( !olen && nlen && group.get(1)){
      var altGroup = group.children.pop();
      if(altGroup.destroy)  altGroup.destroy(true);
    }

    if(track === true){
      updateSimple(newValue, oldValue, splices)
    }else{
      updateLD(newValue, oldValue, splices)
    }

    // @ {#list} {#else}
    if( !nlen && alternate && alternate.length){
      var section = self.$compile(alternate, {
        extra: extra,
        record: true,
        outer: options.outer,
        namespace: namespace
      })
      group.children.push(section);
      if(placeholder.parentNode){
        animate.inject(combine.node(section), placeholder, 'after');
      }
    }
  }
  this.$watch(ast.sequence, update, { init: true, indexTrack: track === true });
  return group;
}
// {#include } or {#inc template}
walkers.template = function(ast, options){
  var content = ast.content, compiled;
  var placeholder = document.createComment('inlcude');
  var compiled, namespace = options.namespace, extra = options.extra;
  var group = new Group([placeholder]);
  if(content){
    var self = this;
    this.$watch(content, function(value){
      if( compiled = group.get(1)){
        compiled.destroy(true); 
        group.children.pop();
      }
      group.push( compiled = (typeof value === 'function') ? value(): self.$compile(value, {record: true, outer: options.outer,namespace: namespace, extra: extra}) ); 
      if(placeholder.parentNode) {
        compiled.$inject(placeholder, 'before')
      }
    }, {
      init: true
    });
  }
  return group;
};


// how to resolve this problem
var ii = 0;
walkers['if'] = function(ast, options){
  var self = this, consequent, alternate, extra = options.extra;
  if(options && options.element){ // attribute inteplation
    var update = function(nvalue){
      if(!!nvalue){
        if(alternate) combine.destroy(alternate)
        if(ast.consequent) consequent = self.$compile(ast.consequent, {record: true, element: options.element , extra:extra});
      }else{
        if(consequent) combine.destroy(consequent)
        if(ast.alternate) alternate = self.$compile(ast.alternate, {record: true, element: options.element, extra: extra});
      }
    }
    this.$watch(ast.test, update, { force: true });
    return {
      destroy: function(){
        if(consequent) combine.destroy(consequent);
        else if(alternate) combine.destroy(alternate);
      }
    }
  }

  var test, consequent, alternate, node;
  var placeholder = document.createComment("Regular if" + ii++);
  var group = new Group();
  group.push(placeholder);
  var preValue = null, namespace= options.namespace;


  var update = function (nvalue, old){
    var value = !!nvalue;
    if(value === preValue) return;
    preValue = value;
    if(group.children[1]){
      group.children[1].destroy(true);
      group.children.pop();
    }
    if(value){ //true
      if(ast.consequent && ast.consequent.length){
        consequent = self.$compile( ast.consequent , {record:true, outer: options.outer,namespace: namespace, extra:extra })
        // placeholder.parentNode && placeholder.parentNode.insertBefore( node, placeholder );
        group.push(consequent);
        if(placeholder.parentNode){
          animate.inject(combine.node(consequent), placeholder, 'before');
        }
      }
    }else{ //false
      if(ast.alternate && ast.alternate.length){
        alternate = self.$compile(ast.alternate, {record:true, outer: options.outer,namespace: namespace, extra:extra});
        group.push(alternate);
        if(placeholder.parentNode){
          animate.inject(combine.node(alternate), placeholder, 'before');
        }
      }
    }
  }
  this.$watch(ast.test, update, {force: true, init: true});

  return group;
}


walkers.expression = function(ast, options){
  var node = document.createTextNode("");
  this.$watch(ast, function(newval){
    dom.text(node, "" + (newval == null? "": "" + newval) );
  })
  return node;
}
walkers.text = function(ast, options){
  var node = document.createTextNode(_.convertEntity(ast.text));
  return node;
}



var eventReg = /^on-(.+)$/

/**
 * walkers element (contains component)
 */
walkers.element = function(ast, options){
  var attrs = ast.attrs, self = this,
    Constructor = this.constructor,
    children = ast.children,
    namespace = options.namespace, 
    extra = options.extra,
    tag = ast.tag,
    Component = Constructor.component(tag),
    ref, group, element;

  if( tag === 'r-content' ){
    // _.log('r-content is deprecated, use {#inc this.$body} instead (`{#include}` as same)', 'error');
    return this.$body && this.$body();
  } 

  if(Component || tag === 'r-component'){
    options.Component = Component;
    return walkers.component.call(this, ast, options)
  }

  if(tag === 'svg') namespace = "svg";
  // @Deprecated: may be removed in next version, use {#inc } instead
  
  if( children && children.length ){
    group = this.$compile(children, {outer: options.outer,namespace: namespace, extra: extra });
  }

  element = dom.create(tag, namespace, attrs);

  if(group && !_.isVoidTag(tag)){
    dom.inject( combine.node(group) , element)
  }

  // sort before
  if(!ast.touched){
    attrs.sort(function(a1, a2){
      var d1 = Constructor.directive(a1.name),
        d2 = Constructor.directive(a2.name);
      if( d1 && d2 ) return (d2.priority || 1) - (d1.priority || 1);
      if(d1) return 1;
      if(d2) return -1;
      if(a2.name === "type") return 1;
      return -1;
    })
    ast.touched = true;
  }
  // may distinct with if else
  var destroies = walkAttributes.call(this, attrs, element, extra);

  return {
    type: "element",
    group: group,
    node: function(){
      return element;
    },
    last: function(){
      return element;
    },
    destroy: function(first){
      if( first ){
        animate.remove( element, group? group.destroy.bind( group ): _.noop );
      }else if(group) {
        group.destroy();
      }
      // destroy ref
      if( destroies.length ) {
        destroies.forEach(function( destroy ){
          if( destroy ){
            if( typeof destroy.destroy === 'function' ){
              destroy.destroy()
            }else{
              destroy();
            }
          }
        })
      }
    }
  }
}

walkers.component = function(ast, options){
  var attrs = ast.attrs, 
    Component = options.Component,
    Constructor = this.constructor,
    isolate, 
    extra = options.extra,
    namespace = options.namespace,
    ref, self = this, is;

  var data = {}, events;

  for(var i = 0, len = attrs.length; i < len; i++){
    var attr = attrs[i];
    // consider disabled   equlasto  disabled={true}
    var value = this._touchExpr(attr.value === undefined? true: attr.value);
    if(value.constant) value = attr.value = value.get(this);
    if(attr.value && attr.value.constant === true){
      value = value.get(this);
    }
    var name = attr.name;
    if(!attr.event){
      var etest = name.match(eventReg);
      // event: 'nav'
      if(etest) attr.event = etest[1];
    }

    // @compile modifier
    if(attr.mdf === 'cmpl'){
      value = _.getCompileFn(value, this, {
        record: true, 
        namespace:namespace, 
        extra: extra, 
        outer: options.outer
      })
    }
    
    // @if is r-component . we need to find the target Component
    if(name === 'is' && !Component){
      is = value;
      var componentName = this.$get(value, true);
      Component = Constructor.component(componentName)
      if(typeof Component !== 'function') throw new Error("component " + componentName + " has not registed!");
    }
    // bind event proxy
    var eventName;
    if(eventName = attr.event){
      events = events || {};
      events[eventName] = _.handleEvent.call(this, value, eventName);
      continue;
    }else {
      name = attr.name = _.camelCase(name);
    }

    if(value.type !== 'expression'){
      data[name] = value;
    }else{
      data[name] = value.get(self); 
    }
    if( name === 'ref'  && value != null){
      ref = value
    }
    if( name === 'isolate'){
      // 1: stop: composite -> parent
      // 2. stop: composite <- parent
      // 3. stop 1 and 2: composite <-> parent
      // 0. stop nothing (defualt)
      isolate = value.type === 'expression'? value.get(self): parseInt(value === true? 3: value, 10);
      data.isolate = isolate;
    }
  }

  var definition = { 
    data: data, 
    events: events, 
    $parent: this,
    $root: this.$root,
    $outer: options.outer,
    _body: ast.children
  }
  var options = {
    namespace: namespace, 
    extra: options.extra
  }


  var component = new Component(definition, options), reflink;


  if(ref && this.$refs){
    reflink = Component.directive('ref').link
    this.$on('$destroy', reflink.call(this, component, ref) )
  }
  if(ref &&  self.$refs) self.$refs[ref] = component;
  for(var i = 0, len = attrs.length; i < len; i++){
    var attr = attrs[i];
    var value = attr.value||true;
    var name = attr.name;
    // need compiled
    if(value.type === 'expression' && !attr.event){
      value = self._touchExpr(value);
      // use bit operate to control scope
      if( !(isolate & 2) ) 
        this.$watch(value, component.$update.bind(component, name))
      if( value.set && !(isolate & 1 ) ) 
        // sync the data. it force the component don't trigger attr.name's first dirty echeck
        component.$watch(name, self.$update.bind(self, value), {sync: true});
    }
  }
  if(is && is.type === 'expression'  ){
    var group = new Group();
    group.push(component);
    this.$watch(is, function(value){
      // found the new component
      var Component = Constructor.component(value);
      if(!Component) throw new Error("component " + value + " has not registed!");
      var ncomponent = new Component(definition);
      var component = group.children.pop();
      group.push(ncomponent);
      ncomponent.$inject(combine.last(component), 'after')
      component.destroy();
      // @TODO  if component changed , we need update ref
      if(ref){
        self.$refs[ref] = ncomponent;
      }
    }, {sync: true})
    return group;
  }
  return component;
}

function walkAttributes(attrs, element, extra){
  var bindings = []
  for(var i = 0, len = attrs.length; i < len; i++){
    var binding = this._walk(attrs[i], {element: element, fromElement: true, attrs: attrs, extra: extra})
    if(binding) bindings.push(binding);
  }
  return bindings;
}

walkers.attribute = function(ast ,options){

  var attr = ast;
  var name = attr.name;
  var value = attr.value || "";
  var constant = value.constant;
  var Component = this.constructor;
  var directive = Component.directive(name);
  var element = options.element;
  var self = this;


  value = this._touchExpr(value);

  if(constant) value = value.get(this);

  if(directive && directive.link){
    var binding = directive.link.call(self, element, value, name, options.attrs);
    if(typeof binding === 'function') binding = {destroy: binding}; 
    return binding;
  } else{
    if(value.type === 'expression' ){
      this.$watch(value, function(nvalue, old){
        dom.attr(element, name, nvalue);
      }, {init: true});
    }else{
      if(_.isBooleanAttr(name)){
        dom.attr(element, name, true);
      }else{
        dom.attr(element, name, value);
      }
    }
    if(!options.fromElement){
      return {
        destroy: function(){
          dom.attr(element, name, null);
        }
      }
    }
  }

}


},{"./dom.js":10,"./group.js":12,"./helper/animate.js":13,"./helper/arrayDiff.js":14,"./helper/combine.js":15,"./parser/node.js":27,"./util":28}],30:[function(require,module,exports){
/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2014
  * https://github.com/ded/reqwest
  */

!function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
}('reqwest', this, function () {

  var win = window
    , doc = document
    , httpsRe = /^http/
    , protocolRe = /(^\w+):\/\//
    , twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
    , byTag = 'getElementsByTagName'
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , requestedWith = 'X-Requested-With'
    , head = doc[byTag]('head')[0]
    , uniqid = 0
    , callbackPrefix = 'reqwest_' + (+new Date())
    , lastValue // data stored by the most recent JSONP callback
    , xmlHttpRequest = 'XMLHttpRequest'
    , xDomainRequest = 'XDomainRequest'
    , noop = function () {}

    , isArray = typeof Array.isArray == 'function'
        ? Array.isArray
        : function (a) {
            return a instanceof Array
          }

    , defaultHeaders = {
          'contentType': 'application/x-www-form-urlencoded'
        , 'requestedWith': xmlHttpRequest
        , 'accept': {
              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
            , 'xml':  'application/xml, text/xml'
            , 'html': 'text/html'
            , 'text': 'text/plain'
            , 'json': 'application/json, text/javascript'
            , 'js':   'application/javascript, text/javascript'
          }
      }

    , xhr = function(o) {
        // is it x-domain
        if (o['crossOrigin'] === true) {
          var xhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null
          if (xhr && 'withCredentials' in xhr) {
            return xhr
          } else if (win[xDomainRequest]) {
            return new XDomainRequest()
          } else {
            throw new Error('Browser does not support cross-origin requests')
          }
        } else if (win[xmlHttpRequest]) {
          return new XMLHttpRequest()
        } else {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      }
    , globalSetupOptions = {
        dataFilter: function (data) {
          return data
        }
      }

  function succeed(r) {
    var protocol = protocolRe.exec(r.url);
    protocol = (protocol && protocol[1]) || window.location.protocol;
    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response;
  }

  function handleReadyState(r, success, error) {
    return function () {
      // use _aborted to mitigate against IE err c00c023f
      // (can't read props on aborted request objects)
      if (r._aborted) return error(r.request)
      if (r._timedOut) return error(r.request, 'Request is aborted: timeout')
      if (r.request && r.request[readyState] == 4) {
        r.request.onreadystatechange = noop
        if (succeed(r)) success(r.request)
        else
          error(r.request)
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o['headers'] || {}
      , h

    headers['Accept'] = headers['Accept']
      || defaultHeaders['accept'][o['type']]
      || defaultHeaders['accept']['*']

    var isAFormData = typeof FormData === 'function' && (o['data'] instanceof FormData);
    // breaks cross-origin requests with legacy browsers
    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith']
    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType']
    for (h in headers)
      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
  }

  function setCredentials(http, o) {
    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
      http.withCredentials = !!o['withCredentials']
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend (url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
      , cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId)
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0
      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    win[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
      // need this for IE due to out-of-order onreadystatechange(), binding script
      // execution to an event listener gives us control over when the script
      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
      script.htmlFor = script.id = '_reqwest_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      fn(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)

    // Enable JSONP timeout
    return {
      abort: function () {
        script.onload = script.onreadystatechange = null
        err({}, 'Request is aborted: timeout', {})
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }
    }
  }

  function getRequest(fn, err) {
    var o = this.o
      , method = (o['method'] || 'GET').toUpperCase()
      , url = typeof o === 'string' ? o : o['url']
      // convert non-string objects to query-string form unless o['processData'] is false
      , data = (o['processData'] !== false && o['data'] && typeof o['data'] !== 'string')
        ? reqwest.toQueryString(o['data'])
        : (o['data'] || null)
      , http
      , sendWait = false

    // if we're working on a GET request and we have data then we should append
    // query string to end of URL and not post data
    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
      url = urlappend(url, data)
      data = null
    }

    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url)

    // get the xhr from the factory if passed
    // if the factory returns null, fall-back to ours
    http = (o.xhr && o.xhr(o)) || xhr(o)

    http.open(method, url, o['async'] === false ? false : true)
    setHeaders(http, o)
    setCredentials(http, o)
    if (win[xDomainRequest] && http instanceof win[xDomainRequest]) {
        http.onload = fn
        http.onerror = err
        // NOTE: see
        // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
        http.onprogress = function() {}
        sendWait = true
    } else {
      http.onreadystatechange = handleReadyState(this, fn, err)
    }
    o['before'] && o['before'](http)
    if (sendWait) {
      setTimeout(function () {
        http.send(data)
      }, 200)
    } else {
      http.send(data)
    }
    return http
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn

    init.apply(this, arguments)
  }

  function setType(header) {
    // json, javascript, text/plain, text/html, xml
    if (header.match('json')) return 'json'
    if (header.match('javascript')) return 'js'
    if (header.match('text')) return 'html'
    if (header.match('xml')) return 'xml'
  }

  function init(o, fn) {

    this.url = typeof o == 'string' ? o : o['url']
    this.timeout = null

    // whether request has been fulfilled for purpose
    // of tracking the Promises
    this._fulfilled = false
    // success handlers
    this._successHandler = function(){}
    this._fulfillmentHandlers = []
    // error handlers
    this._errorHandlers = []
    // complete (both success and fail) handlers
    this._completeHandlers = []
    this._erred = false
    this._responseArgs = {}

    var self = this

    fn = fn || function () {}

    if (o['timeout']) {
      this.timeout = setTimeout(function () {
        timedOut()
      }, o['timeout'])
    }

    if (o['success']) {
      this._successHandler = function () {
        o['success'].apply(o, arguments)
      }
    }

    if (o['error']) {
      this._errorHandlers.push(function () {
        o['error'].apply(o, arguments)
      })
    }

    if (o['complete']) {
      this._completeHandlers.push(function () {
        o['complete'].apply(o, arguments)
      })
    }

    function complete (resp) {
      o['timeout'] && clearTimeout(self.timeout)
      self.timeout = null
      while (self._completeHandlers.length > 0) {
        self._completeHandlers.shift()(resp)
      }
    }

    function success (resp) {
      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')) // resp can be undefined in IE
      resp = (type !== 'jsonp') ? self.request : resp
      // use global data filter on response text
      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
        , r = filteredResponse
      try {
        resp.responseText = r
      } catch (e) {
        // can't assign this in IE<=8, just ignore
      }
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break
        case 'js':
          resp = eval(r)
          break
        case 'html':
          resp = r
          break
        case 'xml':
          resp = resp.responseXML
              && resp.responseXML.parseError // IE trololo
              && resp.responseXML.parseError.errorCode
              && resp.responseXML.parseError.reason
            ? null
            : resp.responseXML
          break
        }
      }

      self._responseArgs.resp = resp
      self._fulfilled = true
      fn(resp)
      self._successHandler(resp)
      while (self._fulfillmentHandlers.length > 0) {
        resp = self._fulfillmentHandlers.shift()(resp)
      }

      complete(resp)
    }

    function timedOut() {
      self._timedOut = true
      self.request.abort()      
    }

    function error(resp, msg, t) {
      resp = self.request
      self._responseArgs.resp = resp
      self._responseArgs.msg = msg
      self._responseArgs.t = t
      self._erred = true
      while (self._errorHandlers.length > 0) {
        self._errorHandlers.shift()(resp, msg, t)
      }
      complete(resp)
    }

    this.request = getRequest.call(this, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this._aborted = true
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }

    /**
     * Small deviation from the Promises A CommonJs specification
     * http://wiki.commonjs.org/wiki/Promises/A
     */

    /**
     * `then` will execute upon successful requests
     */
  , then: function (success, fail) {
      success = success || function () {}
      fail = fail || function () {}
      if (this._fulfilled) {
        this._responseArgs.resp = success(this._responseArgs.resp)
      } else if (this._erred) {
        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._fulfillmentHandlers.push(success)
        this._errorHandlers.push(fail)
      }
      return this
    }

    /**
     * `always` will execute whether the request succeeds or fails
     */
  , always: function (fn) {
      if (this._fulfilled || this._erred) {
        fn(this._responseArgs.resp)
      } else {
        this._completeHandlers.push(fn)
      }
      return this
    }

    /**
     * `fail` will execute when the request fails
     */
  , fail: function (fn) {
      if (this._erred) {
        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._errorHandlers.push(fn)
      }
      return this
    }
  , 'catch': function (fn) {
      return this.fail(fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  // normalize newline variants according to spec -> CRLF
  function normalize(s) {
    return s ? s.replace(/\r?\n/g, '\r\n') : ''
  }

  function serial(el, cb) {
    var n = el.name
      , t = el.tagName.toLowerCase()
      , optCb = function (o) {
          // IE gives value="" even where there is no value attribute
          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
          if (o && !o['disabled'])
            cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']))
        }
      , ch, ra, val, i

    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) return

    switch (t) {
    case 'input':
      if (!/reset|button|image|file/i.test(el.type)) {
        ch = /checkbox/i.test(el.type)
        ra = /radio/i.test(el.type)
        val = el.value
        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
        ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
      }
      break
    case 'textarea':
      cb(n, normalize(el.value))
      break
    case 'select':
      if (el.type.toLowerCase() === 'select-one') {
        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
      } else {
        for (i = 0; el.length && i < el.length; i++) {
          el.options[i].selected && optCb(el.options[i])
        }
      }
      break
    }
  }

  // collect up all form elements found from the passed argument elements all
  // the way down to child elements; pass a '<form>' or form fields.
  // called with 'this'=callback to use for serial() on each element
  function eachFormElement() {
    var cb = this
      , e, i
      , serializeSubtags = function (e, tags) {
          var i, j, fa
          for (i = 0; i < tags.length; i++) {
            fa = e[byTag](tags[i])
            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
          }
        }

    for (i = 0; i < arguments.length; i++) {
      e = arguments[i]
      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
    }
  }

  // standard query string style serialization
  function serializeQueryString() {
    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
  }

  // { 'name': 'value', ... } style serialization
  function serializeHash() {
    var hash = {}
    eachFormElement.apply(function (name, value) {
      if (name in hash) {
        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
        hash[name].push(value)
      } else hash[name] = value
    }, arguments)
    return hash
  }

  // [ { name: 'name', value: 'value' }, ... ] style serialization
  reqwest.serializeArray = function () {
    var arr = []
    eachFormElement.apply(function (name, value) {
      arr.push({name: name, value: value})
    }, arguments)
    return arr
  }

  reqwest.serialize = function () {
    if (arguments.length === 0) return ''
    var opt, fn
      , args = Array.prototype.slice.call(arguments, 0)

    opt = args.pop()
    opt && opt.nodeType && args.push(opt) && (opt = null)
    opt && (opt = opt.type)

    if (opt == 'map') fn = serializeHash
    else if (opt == 'array') fn = reqwest.serializeArray
    else fn = serializeQueryString

    return fn.apply(null, args)
  }

  reqwest.toQueryString = function (o, trad) {
    var prefix, i
      , traditional = trad || false
      , s = []
      , enc = encodeURIComponent
      , add = function (key, value) {
          // If value is a function, invoke it and return its value
          value = ('function' === typeof value) ? value() : (value == null ? '' : value)
          s[s.length] = enc(key) + '=' + enc(value)
        }
    // If an array was passed in, assume that it is an array of form elements.
    if (isArray(o)) {
      for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value'])
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in o) {
        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add)
      }
    }

    // spaces should be + according to spec
    return s.join('&').replace(/%20/g, '+')
  }

  function buildParams(prefix, obj, traditional, add) {
    var name, i, v
      , rbracket = /\[\]$/

    if (isArray(obj)) {
      // Serialize array item.
      for (i = 0; obj && i < obj.length; i++) {
        v = obj[i]
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v)
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
        }
      }
    } else if (obj && obj.toString() === '[object Object]') {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
      }

    } else {
      // Serialize scalar item.
      add(prefix, obj)
    }
  }

  reqwest.getcallbackPrefix = function () {
    return callbackPrefix
  }

  // jQuery and Zepto compatibility, differences can be remapped here so you can call
  // .ajax.compat(options, callback)
  reqwest.compat = function (o, fn) {
    if (o) {
      o['type'] && (o['method'] = o['type']) && delete o['type']
      o['dataType'] && (o['type'] = o['dataType'])
      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback']
      o['jsonp'] && (o['jsonpCallback'] = o['jsonp'])
    }
    return new Reqwest(o, fn)
  }

  reqwest.ajaxSetup = function (options) {
    options = options || {}
    for (var k in options) {
      globalSetupOptions[k] = options[k]
    }
  }

  return reqwest
});

},{}],31:[function(require,module,exports){
/*!
 * Copyright (c) 2015 Chris O'Hara <cohara87@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function (name, definition) {
    if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
})('validator', function (validator) {

    'use strict';

    validator = { version: '4.0.2' };

    var emailUser = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~])+)*)|"(\s*(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e])|(\\[\x01-\x09\x0b\x0c\x0d-\x7f])))*\s*")$/i;

    var emailUserUtf8 = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|"(\s*(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*\s*")$/i;

    var displayName = /^(?:[a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~\.]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(?:[a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~\.]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\s)*<(.+)>$/i;

    var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

    var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

    var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/
      , isbn13Maybe = /^(?:[0-9]{13})$/;

    var ipv4Maybe = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
      , ipv6Block = /^[0-9A-F]{1,4}$/i;

    var uuid = {
        '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
      , '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      , '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      , all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    };

    var alpha = /^[A-Z]+$/i
      , alphanumeric = /^[0-9A-Z]+$/i
      , numeric = /^[-+]?[0-9]+$/
      , int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/
      , float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
      , hexadecimal = /^[0-9A-F]+$/i
      , decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/
      , hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

    var ascii = /^[\x00-\x7F]+$/
      , multibyte = /[^\x00-\x7F]/
      , fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/
      , halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

    var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

    var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

    var phones = {
      'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
      'en-ZA': /^(\+?27|0)\d{9}$/,
      'en-AU': /^(\+?61|0)4\d{8}$/,
      'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
      'fr-FR': /^(\+?33|0)[67]\d{8}$/,
      'pt-PT': /^(\+351)?9[1236]\d{7}$/,
      'el-GR': /^(\+30)?((2\d{9})|(69\d{8}))$/,
      'en-GB': /^(\+?44|0)7\d{9}$/,
      'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
      'en-ZM': /^(\+26)?09[567]\d{7}$/,
      'ru-RU': /^(\+?7|8)?9\d{9}$/
    };

    // from http://goo.gl/0ejHHW
    var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

    validator.extend = function (name, fn) {
        validator[name] = function () {
            var args = Array.prototype.slice.call(arguments);
            args[0] = validator.toString(args[0]);
            return fn.apply(validator, args);
        };
    };

    //Right before exporting the validator object, pass each of the builtins
    //through extend() so that their first argument is coerced to a string
    validator.init = function () {
        for (var name in validator) {
            if (typeof validator[name] !== 'function' || name === 'toString' ||
                    name === 'toDate' || name === 'extend' || name === 'init') {
                continue;
            }
            validator.extend(name, validator[name]);
        }
    };

    validator.toString = function (input) {
        if (typeof input === 'object' && input !== null && input.toString) {
            input = input.toString();
        } else if (input === null || typeof input === 'undefined' || (isNaN(input) && !input.length)) {
            input = '';
        } else if (typeof input !== 'string') {
            input += '';
        }
        return input;
    };

    validator.toDate = function (date) {
        if (Object.prototype.toString.call(date) === '[object Date]') {
            return date;
        }
        date = Date.parse(date);
        return !isNaN(date) ? new Date(date) : null;
    };

    validator.toFloat = function (str) {
        return parseFloat(str);
    };

    validator.toInt = function (str, radix) {
        return parseInt(str, radix || 10);
    };

    validator.toBoolean = function (str, strict) {
        if (strict) {
            return str === '1' || str === 'true';
        }
        return str !== '0' && str !== 'false' && str !== '';
    };

    validator.equals = function (str, comparison) {
        return str === validator.toString(comparison);
    };

    validator.contains = function (str, elem) {
        return str.indexOf(validator.toString(elem)) >= 0;
    };

    validator.matches = function (str, pattern, modifiers) {
        if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
            pattern = new RegExp(pattern, modifiers);
        }
        return pattern.test(str);
    };

    var default_email_options = {
        allow_display_name: false,
        allow_utf8_local_part: true,
        require_tld: true
    };

    validator.isEmail = function (str, options) {
        options = merge(options, default_email_options);

        if (options.allow_display_name) {
            var display_email = str.match(displayName);
            if (display_email) {
                str = display_email[1];
            }
        }

        var parts = str.split('@')
          , domain = parts.pop()
          , user = parts.join('@');

        var lower_domain = domain.toLowerCase();
        if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
            user = user.replace(/\./g, '').toLowerCase();
        }

        if (!validator.isByteLength(user, 0, 64) ||
                !validator.isByteLength(domain, 0, 256)) {
            return false;
        }

        if (!validator.isFQDN(domain, {require_tld: options.require_tld})) {
            return false;
        }

        return options.allow_utf8_local_part ?
            emailUserUtf8.test(user) :
            emailUser.test(user);
    };

    var default_url_options = {
        protocols: [ 'http', 'https', 'ftp' ]
      , require_tld: true
      , require_protocol: false
      , require_valid_protocol: true
      , allow_underscores: false
      , allow_trailing_dot: false
      , allow_protocol_relative_urls: false
    };

    validator.isURL = function (url, options) {
        if (!url || url.length >= 2083 || /\s/.test(url)) {
            return false;
        }
        if (url.indexOf('mailto:') === 0) {
            return false;
        }
        options = merge(options, default_url_options);
        var protocol, auth, host, hostname, port,
            port_str, split;
        split = url.split('://');
        if (split.length > 1) {
            protocol = split.shift();
            if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
                return false;
            }
        } else if (options.require_protocol) {
            return false;
        }  else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
            split[0] = url.substr(2);
        }
        url = split.join('://');
        split = url.split('#');
        url = split.shift();

        split = url.split('?');
        url = split.shift();

        split = url.split('/');
        url = split.shift();
        split = url.split('@');
        if (split.length > 1) {
            auth = split.shift();
            if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
                return false;
            }
        }
        hostname = split.join('@');
        split = hostname.split(':');
        host = split.shift();
        if (split.length) {
            port_str = split.join(':');
            port = parseInt(port_str, 10);
            if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
                return false;
            }
        }
        if (!validator.isIP(host) && !validator.isFQDN(host, options) &&
                host !== 'localhost') {
            return false;
        }
        if (options.host_whitelist &&
                options.host_whitelist.indexOf(host) === -1) {
            return false;
        }
        if (options.host_blacklist &&
                options.host_blacklist.indexOf(host) !== -1) {
            return false;
        }
        return true;
    };

    validator.isIP = function (str, version) {
        version = validator.toString(version);
        if (!version) {
            return validator.isIP(str, 4) || validator.isIP(str, 6);
        } else if (version === '4') {
            if (!ipv4Maybe.test(str)) {
                return false;
            }
            var parts = str.split('.').sort(function (a, b) {
                return a - b;
            });
            return parts[3] <= 255;
        } else if (version === '6') {
            var blocks = str.split(':');
            var foundOmissionBlock = false; // marker to indicate ::

            // At least some OS accept the last 32 bits of an IPv6 address
            // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
            // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
            // and '::a.b.c.d' is deprecated, but also valid.
            var foundIPv4TransitionBlock = validator.isIP(blocks[blocks.length - 1], 4);
            var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

            if (blocks.length > expectedNumberOfBlocks)
                return false;

            // initial or final ::
            if (str === '::') {
                return true;
            } else if (str.substr(0, 2) === '::') {
                blocks.shift();
                blocks.shift();
                foundOmissionBlock = true;
            } else if (str.substr(str.length - 2) === '::') {
                blocks.pop();
                blocks.pop();
                foundOmissionBlock = true;
            }

            for (var i = 0; i < blocks.length; ++i) {
                // test for a :: which can not be at the string start/end
                // since those cases have been handled above
                if (blocks[i] === '' && i > 0 && i < blocks.length -1) {
                    if (foundOmissionBlock)
                        return false; // multiple :: in address
                    foundOmissionBlock = true;
                } else if (foundIPv4TransitionBlock && i == blocks.length - 1) {
                    // it has been checked before that the last
                    // block is a valid IPv4 address
                } else if (!ipv6Block.test(blocks[i])) {
                    return false;
                }
            }

            if (foundOmissionBlock) {
                return blocks.length >= 1;
            } else {
                return blocks.length === expectedNumberOfBlocks;
            }
        }
        return false;
    };

    var default_fqdn_options = {
        require_tld: true
      , allow_underscores: false
      , allow_trailing_dot: false
    };

    validator.isFQDN = function (str, options) {
        options = merge(options, default_fqdn_options);

        /* Remove the optional trailing dot before checking validity */
        if (options.allow_trailing_dot && str[str.length - 1] === '.') {
            str = str.substring(0, str.length - 1);
        }
        var parts = str.split('.');
        if (options.require_tld) {
            var tld = parts.pop();
            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                return false;
            }
        }
        for (var part, i = 0; i < parts.length; i++) {
            part = parts[i];
            if (options.allow_underscores) {
                if (part.indexOf('__') >= 0) {
                    return false;
                }
                part = part.replace(/_/g, '');
            }
            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
            }
            if (/[\uff01-\uff5e]/.test(part)) {
                // disallow full-width chars
                return false;
            }
            if (part[0] === '-' || part[part.length - 1] === '-' ||
                    part.indexOf('---') >= 0) {
                return false;
            }
        }
        return true;
    };

    validator.isBoolean = function(str) {
        return (['true', 'false', '1', '0'].indexOf(str) >= 0);
    };

    validator.isAlpha = function (str) {
        return alpha.test(str);
    };

    validator.isAlphanumeric = function (str) {
        return alphanumeric.test(str);
    };

    validator.isNumeric = function (str) {
        return numeric.test(str);
    };

    validator.isDecimal = function (str) {
        return str !== '' && decimal.test(str);
    };

    validator.isHexadecimal = function (str) {
        return hexadecimal.test(str);
    };

    validator.isHexColor = function (str) {
        return hexcolor.test(str);
    };

    validator.isLowercase = function (str) {
        return str === str.toLowerCase();
    };

    validator.isUppercase = function (str) {
        return str === str.toUpperCase();
    };

    validator.isInt = function (str, options) {
        options = options || {};
        return int.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
    };

    validator.isFloat = function (str, options) {
        options = options || {};
        return str !== '' && float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
    };

    validator.isDivisibleBy = function (str, num) {
        return validator.toFloat(str) % validator.toInt(num) === 0;
    };

    validator.isNull = function (str) {
        return str.length === 0;
    };

    validator.isLength = function (str, min, max) {
        var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        var len = str.length - surrogatePairs.length;
        return len >= min && (typeof max === 'undefined' || len <= max);
    };

    validator.isByteLength = function (str, min, max) {
        var len = encodeURI(str).split(/%..|./).length - 1;
        return len >= min && (typeof max === 'undefined' || len <= max);
    };

    validator.isUUID = function (str, version) {
        var pattern = uuid[version ? version : 'all'];
        return pattern && pattern.test(str);
    };

    validator.isDate = function (str) {
        return !isNaN(Date.parse(str));
    };

    validator.isAfter = function (str, date) {
        var comparison = validator.toDate(date || new Date())
          , original = validator.toDate(str);
        return !!(original && comparison && original > comparison);
    };

    validator.isBefore = function (str, date) {
        var comparison = validator.toDate(date || new Date())
          , original = validator.toDate(str);
        return original && comparison && original < comparison;
    };

    validator.isIn = function (str, options) {
        var i;
        if (Object.prototype.toString.call(options) === '[object Array]') {
            var array = [];
            for (i in options) {
                array[i] = validator.toString(options[i]);
            }
            return array.indexOf(str) >= 0;
        } else if (typeof options === 'object') {
            return options.hasOwnProperty(str);
        } else if (options && typeof options.indexOf === 'function') {
            return options.indexOf(str) >= 0;
        }
        return false;
    };

    validator.isCreditCard = function (str) {
        var sanitized = str.replace(/[^0-9]+/g, '');
        if (!creditCard.test(sanitized)) {
            return false;
        }
        var sum = 0, digit, tmpNum, shouldDouble;
        for (var i = sanitized.length - 1; i >= 0; i--) {
            digit = sanitized.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += ((tmpNum % 10) + 1);
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }
        return !!((sum % 10) === 0 ? sanitized : false);
    };

    validator.isISIN = function (str) {
        if (!isin.test(str)) {
            return false;
        }

        var checksumStr = str.replace(/[A-Z]/g, function(character) {
            return parseInt(character, 36);
        });

        var sum = 0, digit, tmpNum, shouldDouble = true;
        for (var i = checksumStr.length - 2; i >= 0; i--) {
            digit = checksumStr.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += tmpNum + 1;
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }

        return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
    };

    validator.isISBN = function (str, version) {
        version = validator.toString(version);
        if (!version) {
            return validator.isISBN(str, 10) || validator.isISBN(str, 13);
        }
        var sanitized = str.replace(/[\s-]+/g, '')
          , checksum = 0, i;
        if (version === '10') {
            if (!isbn10Maybe.test(sanitized)) {
                return false;
            }
            for (i = 0; i < 9; i++) {
                checksum += (i + 1) * sanitized.charAt(i);
            }
            if (sanitized.charAt(9) === 'X') {
                checksum += 10 * 10;
            } else {
                checksum += 10 * sanitized.charAt(9);
            }
            if ((checksum % 11) === 0) {
                return !!sanitized;
            }
        } else  if (version === '13') {
            if (!isbn13Maybe.test(sanitized)) {
                return false;
            }
            var factor = [ 1, 3 ];
            for (i = 0; i < 12; i++) {
                checksum += factor[i % 2] * sanitized.charAt(i);
            }
            if (sanitized.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {
                return !!sanitized;
            }
        }
        return false;
    };

    validator.isMobilePhone = function(str, locale) {
        if (locale in phones) {
            return phones[locale].test(str);
        }
        return false;
    };

    var default_currency_options = {
        symbol: '$'
      , require_symbol: false
      , allow_space_after_symbol: false
      , symbol_after_digits: false
      , allow_negatives: true
      , parens_for_negatives: false
      , negative_sign_before_digits: false
      , negative_sign_after_digits: false
      , allow_negative_sign_placeholder: false
      , thousands_separator: ','
      , decimal_separator: '.'
      , allow_space_after_digits: false
    };

    validator.isCurrency = function (str, options) {
        options = merge(options, default_currency_options);

        return currencyRegex(options).test(str);
    };

    validator.isJSON = function (str) {
        try {
            var obj = JSON.parse(str);
            return !!obj && typeof obj === 'object';
        } catch (e) {}
        return false;
    };

    validator.isMultibyte = function (str) {
        return multibyte.test(str);
    };

    validator.isAscii = function (str) {
        return ascii.test(str);
    };

    validator.isFullWidth = function (str) {
        return fullWidth.test(str);
    };

    validator.isHalfWidth = function (str) {
        return halfWidth.test(str);
    };

    validator.isVariableWidth = function (str) {
        return fullWidth.test(str) && halfWidth.test(str);
    };

    validator.isSurrogatePair = function (str) {
        return surrogatePair.test(str);
    };

    validator.isBase64 = function (str) {
        return base64.test(str);
    };

    validator.isMongoId = function (str) {
        return validator.isHexadecimal(str) && str.length === 24;
    };

    validator.isISO8601 = function (str) {
        return iso8601.test(str);
    };

    validator.ltrim = function (str, chars) {
        var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
        return str.replace(pattern, '');
    };

    validator.rtrim = function (str, chars) {
        var pattern = chars ? new RegExp('[' + chars + ']+$', 'g') : /\s+$/g;
        return str.replace(pattern, '');
    };

    validator.trim = function (str, chars) {
        var pattern = chars ? new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g') : /^\s+|\s+$/g;
        return str.replace(pattern, '');
    };

    validator.escape = function (str) {
        return (str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g, '&#x2F;')
            .replace(/\`/g, '&#96;'));
    };

    validator.stripLow = function (str, keep_new_lines) {
        var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
        return validator.blacklist(str, chars);
    };

    validator.whitelist = function (str, chars) {
        return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
    };

    validator.blacklist = function (str, chars) {
        return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
    };

    var default_normalize_email_options = {
        lowercase: true
    };

    validator.normalizeEmail = function (email, options) {
        options = merge(options, default_normalize_email_options);
        if (!validator.isEmail(email)) {
            return false;
        }
        var parts = email.split('@', 2);
        parts[1] = parts[1].toLowerCase();
        if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
            parts[0] = parts[0].toLowerCase().replace(/\./g, '');
            if (parts[0][0] === '+') {
                return false;
            }
            parts[0] = parts[0].split('+')[0];
            parts[1] = 'gmail.com';
        } else if (options.lowercase) {
            parts[0] = parts[0].toLowerCase();
        }
        return parts.join('@');
    };

    function merge(obj, defaults) {
        obj = obj || {};
        for (var key in defaults) {
            if (typeof obj[key] === 'undefined') {
                obj[key] = defaults[key];
            }
        }
        return obj;
    }

    function currencyRegex(options) {
        var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?')
            , negative = '-?'
            , whole_dollar_amount_without_sep = '[1-9]\\d*'
            , whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*'
            , valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep]
            , whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?'
            , decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
        var pattern = whole_dollar_amount + decimal_amount;
        // default is negative sign before symbol, but there are two other options (besides parens)
        if (options.allow_negatives && !options.parens_for_negatives) {
            if (options.negative_sign_after_digits) {
                pattern += negative;
            }
            else if (options.negative_sign_before_digits) {
                pattern = negative + pattern;
            }
        }
        // South African Rand, for example, uses R 123 (space) and R-123 (no space)
        if (options.allow_negative_sign_placeholder) {
            pattern = '( (?!\\-))?' + pattern;
        }
        else if (options.allow_space_after_symbol) {
            pattern = ' ?' + pattern;
        }
        else if (options.allow_space_after_digits) {
            pattern += '( (?!$))?';
        }
        if (options.symbol_after_digits) {
            pattern += symbol;
        } else {
            pattern = symbol + pattern;
        }
        if (options.allow_negatives) {
            if (options.parens_for_negatives) {
                pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
            }
            else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
                pattern = negative + pattern;
            }
        }
        return new RegExp(
            '^' +
            // ensure there's a dollar and/or decimal amount, and that it doesn't start with a space or a negative sign followed by a space
            '(?!-? )(?=.*\\d)' +
            pattern +
            '$'
        );
    }

    validator.init();

    return validator;

});

},{}],32:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Regular = require('regularjs');
var _ = require('./util.js');
var filter = require('./filter.js');

/**
 * @class Component
 * @extend Regular
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Component = Regular.extend({
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            readonly: false,
            disabled: false,
            visible: true,
            'class': ''
        });
        this.supr();
    }
})
.filter(filter)
.directive({

})

module.exports = Component;
},{"./filter.js":33,"./util.js":36,"regularjs":23}],33:[function(require,module,exports){
'use strict';

var filter = {};

filter.format = function() {
    function fix(str) {
        str = '' + (String(str) || '');
        return str.length <= 1? '0' + str : str;
    }
    var maps = {
        'yyyy': function(date){return date.getFullYear()},
        'MM': function(date){return fix(date.getMonth() + 1); },
        'dd': function(date){ return fix(date.getDate()) },
        'HH': function(date){return fix(date.getHours()) },
        'mm': function(date){ return fix(date.getMinutes())},
        'ss': function(date){ return fix(date.getSeconds())}
    }

    var trunk = new RegExp(Object.keys(maps).join('|'),'g');
    return function(value, format){
        if(!value){return '';}
        format = format || 'yyyy-MM-dd HH:mm';
        value = new Date(value);

        return format.replace(trunk, function(capture){
            return maps[capture]? maps[capture](value): '';
        });
    }
}();

filter.average = function(array, key) {
    array = array || [];
    return array.length? filter.total(array, key) / array.length : 0;
}
filter.total = function(array, key) {
    var total = 0;
    if(!array) return;
    array.forEach(function( item ){
        total += key? item[key] : item;
    })
    return total;
}

filter.filter = function(array, filterFn) {
    if(!array || !array.length) return;
    return array.filter(function(item, index){
        return filterFn(item, index);
    })
}

module.exports = filter;
},{}],34:[function(require,module,exports){
'use strict';

var reqwest = require('reqwest');
var ajax = {};
// var eventEmitter = new require('events').EventEmitter();
// var ajax = {
//     $on: eventEmitter.on,
//     $off: eventEmitter.removeListener,
//     $emit: eventEmitter.emit
// };

var Notify = require('../module/notify.js');

ajax.request = function(opt) {
    var noop = function(){};
    var oldError = opt.error || noop,
        oldSuccess = opt.success || noop,
        oldComplete = opt.complete || noop;

    opt.data = opt.data || {};

    if(!opt.contentType && opt.method && opt.method.toLowerCase() !== 'get')
        opt.contentType = 'application/json';
    else
        opt.data.timestamp = +new Date;

    if(opt.contentType === 'application/json') {
        opt.data = JSON.stringify(opt.data);
    }

    //ajax.$emit('start', opt);
    opt.success = function(data) {
        //ajax.$emit('success', data);

        if(data.code !== 200) {
            Notify.error(data.msg);
            oldError(data.result, data);
            return;
        }
        
        oldSuccess(data.result, data);
    }

    opt.error = function(data) {
        //ajax.$emit('error', data);
        oldError(data.result, data);
    }

    opt.complete = function(data) {
        //ajax.$emit('complete', data);
        oldComplete(data.result, data);
    }

    reqwest(opt);
}

module.exports = ajax;
},{"../module/notify.js":58,"reqwest":30}],35:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * SourceComponent 数据组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('./component.js');
var _ = require('./util.js');

/**
 * @class SourceComponent
 * @extend Component
 * @param {object[]=[]}             options.data.source             数据源
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var SourceComponent = Component.extend({
    service: null,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: []
        });

        if(this.data.service)
            this.service = this.data.service;

        if(this.service)
            this.$updateSource();

        this.supr();
    },
    /**
     * @method getParams 返回请求时需要的参数
     * @protected
     * @return {object}
     */
    getParams: function() {
        return {};
    },
    /**
     * @method $updateSource() 从service中更新数据源
     * @public
     * @return {SourceComponent} this
     */
    $updateSource: function() {
        this.service.getList(this.getParams(), function(result) {
            this.$update('source', result);
        }.bind(this));
        return this;
    }
});

module.exports = SourceComponent;
},{"./component.js":32,"./util.js":36}],36:[function(require,module,exports){
'use strict';

var Regular = require('regularjs');

var _ = {
    extend: function(o1, o2, override) {
        for(var i in o2)
            if(override || o1[i] === undefined)
                o1[i] = o2[i]
        return o1;
    },
    dom: Regular.dom,
    multiline: function(func) {
        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
        return reg.exec(func)[1];
    }
}

module.exports = _;
},{"regularjs":23}],37:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Validator 表单验证
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var vali = require('validator');
var validator = {}

/**
 * 235235
rules = [
    {type: 'isRequired', min: 2, max: 5
]
*/

validator.validate = function(value, rules) {
    var result = {
        success: true,
        message: ''
    }

    rules.forEach(function(rule) {
        rule.success = true;

        if(rule.type === 'is') {
            rule.success = rule.reg.test(value);
        } else if(rule.type === 'isRequired') {
            rule.success = !!value;
        } else if(rule.type === 'isFilled') {
            rule.success = !!value && value.trim();
        } else if(rule.type === 'isEmail') {
            rule.success = vali.isEmail(value);
        } else if(rule.type === 'isURL') {
            rule.success = vali.isURL(value);
        } else if(rule.type === 'isNumber') {
            rule.success = vali.isInt(value);
        } else if(rule.type === 'isInt') {
            rule.success = vali.isInt(value);
        } else if(rule.type === 'isFloat') {
            rule.success = vali.isFloat(value);
        } else if(rule.type === 'isLength') {
            rule.success = vali.isLength(value, rule.min, rule.max);
        } else {
            rule.success = rule.method(value);
        }

        if(!rule.success && result.success) {
            result.success = false;
            result.message = rule.message;
        }
    });

    return result;
}

validator.validateForm = function(data, fields) {
    var conclusion = {
        results: {},
        success: true,
        message: ''
    }
    
    for(var key in fields) {
        var rules = fields[key];
        if(!rules)
            continue;
        var value = data[key];

        conclusion.results[key] = validator.validate(value, rules);
    }

    return conclusion;
}

module.exports = validator;
},{"validator":31}],38:[function(require,module,exports){
module.exports="<div class=\"m-accordion {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <r-content /></div>"
},{}],39:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Accordion       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./accordion.html');
var itemTemplate = require('./accordionPane.html');
var _ = require('../base/util.js');

/**
 * @class Accordion
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Accordion = Component.extend({
    name: 'accordion',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: []
        });
        this.supr();
    }
});

var AccordionPane = Component.extend({
    name: 'accordionPane',
    template: itemTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            open: false
        });
        this.supr();

        if(this.$outer) {
            var source = this.$outer.data.source;
            var item = {
                name: this.data.name,
                open: open,
                disabled: this.data.disabled,
                accordion: this
            };
            source.push(item);
        }
    },
    toggle: function(open) {
        this.data.open = open;
    }
});

module.exports = Accordion;
},{"../base/component.js":32,"../base/util.js":36,"./accordion.html":38,"./accordionPane.html":40}],40:[function(require,module,exports){
module.exports="<div class=\"accordion_pane\">    <div class=\"accordion_pane_hd\" on-click={this.toggle(!open)}>{name}</div>    <div class=\"accordion_pane_bd\" r-hide={!open}>        {#include this.$body}    </div></div>"
},{}],41:[function(require,module,exports){
module.exports="<div class=\"u-calendar {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <div class=\"calendar_hd\">        <span class=\"calendar_prev\">            <span class=\"calendar_item\" on-click={this.addYear(-1)}><i class=\"u-icon u-icon-angle-double-left\"></i></span>            <span class=\"calendar_item\" on-click={this.addMonth(-1)}><i class=\"u-icon u-icon-angle-left\"></i></span>        </span>        <span>{date | format: \'yyyy-MM\'}</span>        <span class=\"calendar_next\">            <span class=\"calendar_item\" on-click={this.addMonth(1)}><i class=\"u-icon u-icon-angle-right\"></i></span>            <span class=\"calendar_item\" on-click={this.addYear(1)}><i class=\"u-icon u-icon-angle-double-right\"></i></span>        </span>    </div>    <div class=\"calendar_bd\">        <div class=\"calendar_week\"><span class=\"calendar_item\">日</span><span class=\"calendar_item\">一</span><span class=\"calendar_item\">二</span><span class=\"calendar_item\">三</span><span class=\"calendar_item\">四</span><span class=\"calendar_item\">五</span><span class=\"calendar_item\">六</span></div>        <div class=\"calendar_day\">{#list _days as day}<span class=\"calendar_item\" r-class={ {\'z-sel\': date.toDateString() === day.toDateString(), \'z-muted\': date.getMonth() !== day.getMonth(), \'z-dis\': this.isDisabledDay(day)} } on-click={this.select(day)}>{day | format: \'dd\'}</span>{/list}</div>    </div></div>"
},{}],42:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Calendar  日历
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./calendar.html');
var _ = require('../base/util.js');

/**
 * @class Calendar
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {Date=null}               options.data.date               当前选择的日期
 * @param {Date=null}               options.data.minDate            最小日期，如果为空则不限制
 * @param {Date=null}               options.data.maxDate            最大日期，如果为空则不限制
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Calendar = Component.extend({
    name: 'calendar',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            date: null,
            minDate: null,
            maxDate: null,
            _days: []
        });
        this.supr();

        this.$watch('date', function(newValue, oldValue) {
            if(newValue && oldValue && newValue.getFullYear() === oldValue.getFullYear() && newValue.getMonth() === oldValue.getMonth())
                return;

            this.update();
        });

        if(!this.data.date)
            this.goToday();
    },
    /**
     * @method update() 日期改变后更新日历
     * @private
     * @return {void}
     */
    update: function() {
        this.data._days = [];
        
        var date = this.data.date;
        var month = date.getMonth();
        var mfirst = new Date(date); mfirst.setDate(1);
        var mfirstTime = mfirst.getTime();
        var nfirst = new Date(mfirst); nfirst.setMonth(month + 1); nfirst.setDate(1);
        var nfirstTime = nfirst.getTime();
        var lastTime = nfirstTime + ((7 - nfirst.getDay())%7 - 1)*24*3600*1000;
        var num = - mfirst.getDay();
        var tmpTime, tmp;
        do {
            tmpTime = mfirstTime + (num++)*24*3600*1000;
            tmp = new Date(tmpTime);
            this.data._days.push(tmp);
        } while(tmpTime < lastTime);
    },
    /**
     * @method addYear(year) 调整年份
     * @public
     * @param  {number=0} year 加/减的年份
     * @return {void}
     */
    addYear: function(year) {
        if(this.data.readonly || this.data.disabled || !year)
            return;

        var date = new Date(this.data.date);
        date.setFullYear(date.getFullYear() + year);
        this.data.date = date;
    },
    /**
     * @method addMonth(month) 调整月份
     * @public
     * @param  {number=0} month 加/减的月份
     * @return {void}
     */
    addMonth: function(month) {
        if(this.data.readonly || this.data.disabled || !month)
            return;

        var date = new Date(this.data.date);
        date.setMonth(date.getMonth() + month);
        this.data.date = date;
    },
    /**
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date=null} date 选择的日期
     * @return {void}
     */
    select: function(date) {
        if(this.data.readonly || this.data.disabled || this.isDisabledDay(date))
            return;

        this.data.date = new Date(date);

        /**
         * @event select 选择某一个日期时触发
         * @property {object} date 当前选择的日期
         */
        this.$emit('select', {
            date: date
        });
    },
    /**
     * @method goToday() 回到今天
     * @public
     * @return {void}
     */
    goToday: function() {
        this.data.date = new Date((new Date().getTime()/(24*3600*1000)>>0)*(24*3600*1000));
    },
    /**
     * @method isDisabledDay 是否禁用某一天
     * @param {Date} day 某一天
     * @return {void}
     */
    isDisabledDay: function(day) {
        var minDate = this.data.minDate ? new Date((this.data.minDate.getTime()/(24*3600*1000)>>0)*(24*3600*1000)) : null;
        var maxDate = this.data.maxDate ? new Date((this.data.maxDate.getTime()/(24*3600*1000)>>0)*(24*3600*1000)) : null;

        return (minDate && day < minDate) || (maxDate && day > maxDate);
    }
});

module.exports = Calendar;
},{"../base/component.js":32,"../base/util.js":36,"./calendar.html":41}],43:[function(require,module,exports){
module.exports=""
},{}],44:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Editor    编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./editor.html');
var _ = require('../base/util.js');

/**
 * @class Editor
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {string=''}               options.data.content            对话框内容
 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {function}                options.ok                      当点击确定的时候执行
 * @param {function}                options.cancel                  当点击取消的时候执行
 */
var Editor = Component.extend({
    name: 'modal',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '提示',
            content: '',
            okButton: true,
            cancelButton: false,
            width: null
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method close(result) 关闭模态对话框
     * @public
     * @param  {boolean} result 点击确定还是取消
     * @return {void}
     */
    close: function(result) {
        /**
         * @event close 关闭对话框时触发
         * @property {boolean} result 点击了确定还是取消
         */
        this.$emit('close', {
            result: result
        });
        result ? this.ok() : this.cancel();
        this.destroy();
    },
    /**
     * @override
     */
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');
    },
    /**
     * @override
     */
    cancel: function() {
        /**
         * @event close 取消对话框时触发
         */
        this.$emit('cancel');
    }
});

module.exports = Editor;

},{"../base/component.js":32,"../base/util.js":36,"./editor.html":43}],45:[function(require,module,exports){
module.exports="<div class=\"m-gridview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    {#list source as item}    <div class=\"gridview_item\" r-class={ {\'z-sel\': selected === item} }>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>    {/list}</div>"
},{}],46:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * GridView  网格视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./gridView.html');
var _ = require('../base/util.js');

/**
 * @class GridView
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var GridView = SourceComponent.extend({
    name: 'gridView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: []
        });
        this.supr();
    }
});

module.exports = GridView;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./gridView.html":45}],47:[function(require,module,exports){
module.exports="<div class=\"m-editor {@(class)}\" r-hide={!visible}>    <div class=\"editor_preview\" r-html={html}></div>    <ul class=\"m-toolbar editor_toolbar\">        <li><a title=\"加粗\" on-click={this.bold()}><i class=\"u-icon u-icon-bold\"></i></a></li>        <li><a title=\"斜体\" on-click={this.italic()}><i class=\"u-icon u-icon-italic\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"引用\" on-click={this.quote()}><i class=\"u-icon u-icon-quote\"></i></a></li>        <li><a title=\"无序列表\" on-click={this.ul()}><i class=\"u-icon u-icon-list-ul\"></i></a></li>        <li><a title=\"有序列表\" on-click={this.ol()}><i class=\"u-icon u-icon-list-ol\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"链接\" on-click={this.link()}><i class=\"u-icon u-icon-link\"></i></a></li>        <li><a title=\"图片\" on-click={this.image()}><i class=\"u-icon u-icon-image\"></i></a></li>    </ul>    <textarea class=\"editor_textarea\" r-model={content} ref=\"textarea\" {#if readonly}readonly{/if}></textarea></div><uploader visible={false} url={imageUrl} extensions={extensions} ref=\"uploader\" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />"
},{}],48:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * HTMLEditor 编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./htmlEditor.html');
var _ = require('../base/util.js');

/**
 * @class HTMLEditor
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {function}                options.cancel                  当点击取消的时候执行
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 */
var HTMLEditor = Component.extend({
    name: 'htmlEditor',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            content: ''
        });
        this.supr();
    },
    computed: {
        html: function() {
            return this.data.content;
        }
    },
    bold: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '**' + rangeData.text + '**';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    italic: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '*' + rangeData.text + '*';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    quote: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '> ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ul: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '- ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ol: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '1. ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    link: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '[链接](http://)';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    image: function() {
        this.$refs.uploader.upload();
    },
    latex: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '$$a^2 + b^2 = c^2$$';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderSuccess: function(data) {
        var rangeData = this.getCursorPosition();
        rangeData.text = '\n![](~/' + data.result + ')';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderError: function(e) {
        Notify.error(e);
    },
    getCursorPosition: function() {
        var textarea = this.$refs.textarea;

        var rangeData = {text: '', start: 0, end: 0 };
            textarea.focus();
        if (textarea.setSelectionRange) { // W3C
            rangeData.start= textarea.selectionStart;
            rangeData.end = textarea.selectionEnd;
            rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): '';
        } else if (document.selection) { // IE
            var i,
                oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
            oR.moveToElementText(textarea);

            rangeData.text = oS.text;
            rangeData.bookmark = oS.getBookmark();

            // object.moveStart(sUnit [, iCount])
            // Return Value: Integer that returns the number of units moved.
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart('character', -1) !== 0; i ++) {
                // Why? You can alert(textarea.value.length)
                if (textarea.value.charAt(i) == '\n') {
                    i ++;
                }
            }
            rangeData.start = i;
            rangeData.end = rangeData.text.length + rangeData.start;
        }

        return rangeData;
    },
    setCursorPosition: function(rangeData) {
        if(!rangeData) {
            alert("You must get cursor position first.")
        }
        var textarea = this.$refs.textarea;

        var oldValue = textarea.value;
        textarea.value = oldValue.substring(0, rangeData.start) + rangeData.text + oldValue.substring(rangeData.end, oldValue.length);
        rangeData.end = rangeData.start + rangeData.text.length;
        if (textarea.setSelectionRange) { // W3C
            textarea.focus();
            textarea.setSelectionRange(rangeData.start, rangeData.end);
        } else if (textarea.createTextRange) { // IE
            var oR = textarea.createTextRange();
            // Fixbug :
            // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
            if(textarea.value.length === rangeData.start) {
                oR.collapse(false)
                oR.select();
            } else {
                oR.moveToBookmark(rangeData.bookmark);
                oR.select();
            }
        }
    }
});

module.exports = HTMLEditor;

},{"../base/component.js":32,"../base/util.js":36,"./htmlEditor.html":47}],49:[function(require,module,exports){
module.exports="<ul class=\"m-listview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    {#list source as item}    <li r-class={ {\'z-sel\': selected === item, \'z-dis\': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>    {/list}</ul>"
},{}],50:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./listView.html');
var _ = require('../base/util.js');

/**
 * @class ListView
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var ListView = SourceComponent.extend({
    name: 'listView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            itemTemplate: null
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled || item.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

module.exports = ListView;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./listView.html":49}],51:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],52:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * MarkEditor 编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./markEditor.html');
var _ = require('../base/util.js');

var marked = require('marked');

/**
 * @class MarkEditor
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {function}                options.cancel                  当点击取消的时候执行
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 */
var MarkEditor = Component.extend({
    name: 'markEditor',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            content: ''
        });
        this.supr();
    },
    computed: {
        html: function() {
            return marked(this.data.content);
        }
    },
    bold: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '**' + rangeData.text + '**';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    italic: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '*' + rangeData.text + '*';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    quote: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '> ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ul: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '- ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ol: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '1. ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    link: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '[链接](http://)';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    image: function() {
        this.$refs.uploader.upload();
    },
    latex: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '$$a^2 + b^2 = c^2$$';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderSuccess: function(data) {
        var rangeData = this.getCursorPosition();
        rangeData.text = '\n![](~/' + data.result + ')';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderError: function(e) {
        Notify.error(e);
    },
    getCursorPosition: function() {
        var textarea = this.$refs.textarea;

        var rangeData = {text: '', start: 0, end: 0 };
            textarea.focus();
        if (textarea.setSelectionRange) { // W3C
            rangeData.start= textarea.selectionStart;
            rangeData.end = textarea.selectionEnd;
            rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): '';
        } else if (document.selection) { // IE
            var i,
                oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
            oR.moveToElementText(textarea);

            rangeData.text = oS.text;
            rangeData.bookmark = oS.getBookmark();

            // object.moveStart(sUnit [, iCount])
            // Return Value: Integer that returns the number of units moved.
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart('character', -1) !== 0; i ++) {
                // Why? You can alert(textarea.value.length)
                if (textarea.value.charAt(i) == '\n') {
                    i ++;
                }
            }
            rangeData.start = i;
            rangeData.end = rangeData.text.length + rangeData.start;
        }

        return rangeData;
    },
    setCursorPosition: function(rangeData) {
        if(!rangeData) {
            alert("You must get cursor position first.")
        }
        var textarea = this.$refs.textarea;

        var oldValue = textarea.value;
        textarea.value = oldValue.substring(0, rangeData.start) + rangeData.text + oldValue.substring(rangeData.end, oldValue.length);
        rangeData.end = rangeData.start + rangeData.text.length;
        if (textarea.setSelectionRange) { // W3C
            textarea.focus();
            textarea.setSelectionRange(rangeData.start, rangeData.end);
        } else if (textarea.createTextRange) { // IE
            var oR = textarea.createTextRange();
            // Fixbug :
            // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
            if(textarea.value.length === rangeData.start) {
                oR.collapse(false)
                oR.select();
            } else {
                oR.moveToBookmark(rangeData.bookmark);
                oR.select();
            }
        }
    }
});

module.exports = MarkEditor;

},{"../base/component.js":32,"../base/util.js":36,"./markEditor.html":51,"marked":2}],53:[function(require,module,exports){
module.exports="<div>    {#list source as item}    <menu name={item.name} source={item.children} />    {/list}</div>"
},{}],54:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Menubar  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./menubar.html');
var _ = require('../base/util.js');
var Menu = require('../unit/menu.js');

/**
 * @class Menubar
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Menubar = SourceComponent.extend({
    name: 'menubar',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null
        });
        this.supr();
    }
});

module.exports = Menubar;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"../unit/menu.js":85,"./menubar.html":53}],55:[function(require,module,exports){
module.exports="<div class=\"m-modal {@(class)}\" on-keyup={this.keyup($event)} r-hide={!visible}>    <div class=\"modal_dialog\" {#if width}style=\"width: {width}px\"{/if}>        <div class=\"modal_hd\">            <a class=\"modal_close\" on-click={this.close(!cancelButton)}><i class=\"u-icon u-icon-close\"></i></a>            <h3 class=\"modal_title\">{title}</h3>        </div>        <div class=\"modal_bd\">            {#if contentTemplate}{#include @(contentTemplate)}{#else}{content}{/if}        </div>        <div class=\"modal_ft\">            {#if okButton}            <button class=\"u-btn u-btn-primary\" on-click={this.close(true)}>{okButton === true ? \'确定\' : okButton}</button>            {/if}            {#if cancelButton}            <button class=\"u-btn\" on-click={this.close(false)}>{cancelButton === true ? \'取消\' : cancelButton}</button>            {/if}        </div>    </div></div>"
},{}],56:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Modal     模态对话框
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./modal.html');
var _ = require('../base/util.js');

/**
 * @class Modal
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {string=''}               options.data.content            对话框内容
 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {string=''}               options.data.class              补充class
 */
var Modal = Component.extend({
    name: 'modal',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '提示',
            content: '',
            okButton: true,
            cancelButton: false,
            width: null
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method close(result) 关闭模态对话框
     * @public
     * @param  {boolean} result 点击确定还是取消
     * @return {void}
     */
    close: function(result) {
        /**
         * @event close 关闭对话框时触发
         * @property {boolean} result 点击了确定还是取消
         */
        this.$emit('close', {
            result: result
        });
        result ? this.ok() : this.cancel();
        this.destroy();
    },
    /**
     * @override
     */
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');

        this.destroy();
    },
    /**
     * @override
     */
    cancel: function() {
        /**
         * @event cancel 取消对话框时触发
         */
        this.$emit('cancel');

        this.destroy();
    },
    keyup: function($event) {
        if($event.which == 13)
            this.ok();
    }
});

/**
 * @method alert(content[,title]) 弹出一个alert对话框。关闭时始终触发确定事件。
 * @static
 * @public
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.alert = function(content, title, okButton) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            okButton: okButton
        }
    });
    return modal;
}

/**
 * @method confirm(content[,title]) 弹出一个confirm对话框
 * @static
 * @public
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.confirm = function(content, title, okButton, cancelButton) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            okButton: okButton,
            cancelButton: cancelButton || true
        }
    });
    return modal;
}

module.exports = Modal;

},{"../base/component.js":32,"../base/util.js":36,"./modal.html":55}],57:[function(require,module,exports){
module.exports="<div class=\"m-notify m-notify-{@(position)} {@(class)}\" r-hide={!visible}>    {#list messages as message}    <div class=\"notify_message notify_message-{@(message.type)}\" r-animation=\"on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;\">        <a class=\"notify_close\" on-click={this.close(message)}><i class=\"u-icon u-icon-close\"></i></a>        <div class=\"notify_text\"><i class=\"u-icon u-icon-{@(message.type)}-circle\" r-hide={@(!message.type)}></i> {@(message.text)}</div>    </div>    {/list}</div>"
},{}],58:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Notify    通知
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./notify.html');
var _ = require('../base/util.js');

/**
 * @class Notify
 * @extend Component
 * @param {object}                  options.data                    监听数据
 * @param {string='topcenter'}      options.data.position           通知的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
 * @param {number=2000}             options.data.duration           每条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Notify = Component.extend({
    name: 'notify',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            messages: [],
            position: 'topcenter',
            duration: 2000
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method show(text[,type][,duration]) 弹出一个消息
     * @public
     * @param  {string=''} text 消息内容
     * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
     * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
     * @return {void}
     */
    show: function(text, type, duration) {
        var message = {
            text: text,
            type: type,
            duration: duration >= 0 ? duration : this.data.duration
        };
        this.data.messages.unshift(message);
        this.$update();

        if(message.duration)
            this.$timeout(this.close.bind(this, message), message.duration);

        /**
         * @event show 弹出一个消息时触发
         * @property {object} message 弹出的消息对象
         */
        this.$emit('show', {
            message: message
        });
    },
    /**
     * @method close(message) 关闭某条消息
     * @public
     * @param  {object} message 需要关闭的消息对象
     * @return {void}
     */
    close: function(message) {
        var index = this.data.messages.indexOf(message);
        this.data.messages.splice(index, 1);
        this.$update();
        /**
         * @event close 关闭某条消息时触发
         * @property {object} message 关闭了的消息对象
         */
        this.$emit('close', {
            message: message
        });
    },
    /**
     * @method closeAll() 关闭所有消息
     * @public
     * @return {void}
     */
    closeAll: function() {
        this.$update('messages', []);
    }
}).use('$timeout');


/**
 * 直接初始化一个实例
 * @type {Notify}
 */
var notify = new Notify();
Notify.notify = notify;

/**
 * @method show(text[,type][,duration]) 弹出一个消息
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
 * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @return {void}
 */
Notify.show = function() {
    notify.show.apply(notify, arguments);
}
/**
 * @method [info|success|warning|error](text) 弹出特殊类型的消息
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @return {void}
 */
var types = ['success', 'warning', 'info', 'error'];
types.forEach(function(type) {
    Notify[type] = function(text) {
        Notify.show(text, type);
    }
});
/**
 * @method close(message) 关闭某条消息
 * @static
 * @public
 * @param  {object} message 需要关闭的消息对象
 * @return {void}
 */
Notify.close = function() {
    notify.close.apply(notify, arguments);
}
/**
 * @method closeAll() 关闭所有消息
 * @static
 * @public
 * @return {void}
 */
Notify.closeAll = function() {
    notify.closeAll.apply(notify, arguments);
}

module.exports = Notify;
},{"../base/component.js":32,"../base/util.js":36,"./notify.html":57}],59:[function(require,module,exports){
module.exports="<ul class=\"m-pager m-pager-{@(position)} {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <li class=\"pager_prev\" r-class={ {\'z-dis\' : current <= 1} } on-click={this.select(current - 1)}><a>上一页</a></li>    {#if total - middle > side * 2 + 1}        {#list 1..side as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _start > side + 1}<li>...</li>{/if}        {#list _start.._end as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _end < total - side}<li>...</li>{/if}        {#list (total - side + 1)..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {#else}        {#list 1..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {/if}    <li class=\"pager_next\" r-class={ {\'z-dis\' : current >= total} } on-click={this.select(current + 1)}><a>下一页</a></li></ul>"
},{}],60:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Pager     分页
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./pager.html');
var _ = require('../base/util.js');

/**
 * @class Pager
 * @extend Component
 * @param {object}                  options.data                    监听数据
 * @param {number=1}                options.data.current            当前页
 * @param {total=11}                options.data.total              总页数
 * @param {string='center'}         options.data.position           分页的位置，可选参数：`center`、`left`、`right`
 * @param {middle=5}                options.data.middle             当页数较多时，中间显示的页数
 * @param {side=2}                  options.data.side               当页数较多时，两端显示的页数
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Pager = Component.extend({
    name: 'pager',
    template: template,
    config: function() {
        _.extend(this.data, {
            current: 1,
            total: 11,
            position: 'center',
            middle: 5,
            side: 2,
            _start: 1,
            _end: 5
        });
        this.supr();

        this.$watch(['current', 'total'], function(current, total) {
            var show = this.data.middle>>1;
            var side = this.data.side;

            this.data._start = current - show;
            this.data._end = current + show;
            if(this.data._start < side + 1)
                this.data._start = side + 1;
            if(this.data._end > total - side)
                this.data._end = total - side;
            if(current - this.data._start < show)
                this.data._end += this.data._start - current + show;
            if(this.data._end - current < show)
                this.data._start += this.data._end - current - show;
        });
    },
    /**
     * @method select(page) 选择某一页
     * @public
     * @param  {object} page 选择页
     * @return {void}
     */
    select: function(page) {
        if(this.data.readonly || this.data.disabled)
            return;

        if(page < 1) return;
        if(page > this.data.total) return;
        if(page == this.data.current) return;

        this.data.current = page;
        /**
         * @event select 选择某一页时触发
         * @property {object} current 当前选择页
         */
        this.$emit('select', {
            current: this.data.current
        });
    }
});

module.exports = Pager;
},{"../base/component.js":32,"../base/util.js":36,"./pager.html":59}],61:[function(require,module,exports){
module.exports="<div class=\"m-tab {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <ul class=\"tab_hd\">        {#list source as item}        <li r-class={ {\'z-crt\': item == selected, \'z-dis\': item.disabled} } on-click={this.select(item)}>{item.name}</li>        {/list}    </ul>    <div class=\"tab_bd\">        <r-content />    </div></div>"
},{}],62:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Tab       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./tab.html');
var _ = require('../base/util.js');

/**
 * @class Tab
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Tab = Component.extend({
    name: 'tab',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(item.disabled || this.data.readonly || this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

var TabPane = Component.extend({
    name: 'tabPane',
    template: '<div r-hide={this.$outer.data.selected.tab != this}>{#include this.$body}</div>',
    /**
     * @protected
     */
    config: function() { 
        if(this.$outer) {
            var source = this.$outer.data.source;
            var item = {
                name: this.data.name,
                disabled: this.data.disabled,
                tab: this
            };
            source.push(item);

            if(!this.$outer.data.selected)
                this.$outer.data.selected = item;
        }
    }
});

module.exports = Tab;
},{"../base/component.js":32,"../base/util.js":36,"./tab.html":61}],63:[function(require,module,exports){
module.exports="<table class=\"m-table m-tableview {@(class)}\" r-class={ {\'m-table-striped\': striped, \'m-table-hover\': hover} } r-hide={!visible}>    <thead>        <tr>            {#list fields as field}            <th r-class={ {\'tableview_sortable\': field.sortable} } on-click={this.sort(field)}>                {field.name || field.key}                {#if field.sortable}                    <i class=\"u-icon {order.by === field.key ? (order.desc ? \'u-icon-sort-desc\' : \'u-icon-sort-asc\') : \'u-icon-sort\'}\"></i>                {/if}            </th>            {/list}        </tr>    </thead>    <tbody>        {#list source as item}        <tr>            {#list fields as field}            <td>{item[field.key]}</td>            {/list}        </tr>        {/list}    </tbody></table>"
},{}],64:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TableView 表格视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./tableView.html');
var _ = require('../base/util.js');

/**
 * @class TableView
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object[]=[]}             options.data.field              字段集
 * @param {string}                  options.data.field[].key        每个字段的key
 * @param {string}                  options.data.field[].name       每个字段在表头显示的文字，如果没有则显示key
 * @param {boolean=false}           options.data.striped            是否显示条纹
 * @param {boolean=false}           options.data.hover              是否每行在hover时显示样式
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TableView = SourceComponent.extend({
    name: 'tableView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            fields: [],
            striped: false,
            hover: false,
            // TODO: 暂不考虑多字段排序
            order: {
                by: null,
                desc: false
            }
        });
        this.supr();
    },
    /**
     * @method sort(field) 按照某个字段排序
     * @public
     * @param  {object} field 排序字段
     * @return {void}
     */
    sort: function(field) {
        if(!field.sortable)
            return;

        var order = this.data.order;

        if(order.by === field.key)
            order.desc = !order.desc;
        else {
            order.by = field.key;
            order.desc = false;
        }

        if(this.service)
            this.$updateSource();
        else {
            this.data.source.sort(function(a, b) {
                if(order.desc)
                    return a[order.by] < b[order.by];
                else
                    return a[order.by] > b[order.by];
            });
        }
        /**
         * @event sort 按照某个字段排序时触发
         * @property {object} field 排序字段
         */
        this.$emit('sort', {
            field: field
        });
    }
});

module.exports = TableView;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./tableView.html":63}],65:[function(require,module,exports){
module.exports="<div class=\"m-treeview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <treeViewList source={source} visible={true} /></div>"
},{}],66:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TreeView  树型视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./treeView.html');
var hierarchicalTemplate = require('./treeViewList.html');
var _ = require('../base/util.js');

/**
 * @class TreeView
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {boolean=false}           options.data.hierarchical       是否分级动态加载，需要service
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TreeView = SourceComponent.extend({
    name: 'treeView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            multiple: false,
            hierarchical: false
        });
        this.supr();

        this.$ancestor = this;
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled || item.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.data.readonly || this.data.disabled || item.disabled)
            return;

        item.open = !item.open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} item 展开收起项
         * @property {boolean} open 展开还是收起
         */
        this.$emit('toggle', {
            item: item,
            open: item.open
        });
    }
});

var TreeViewList = SourceComponent.extend({
    name: 'treeViewList',
    template: hierarchicalTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            visible: false
        });
        this.supr();

        this.$ancestor = this.$parent.$ancestor;
        this.service = this.$ancestor.service;
        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
        this.data.hierarchical = this.$ancestor.data.hierarchical;

        this.$watch('visible', function(newValue) {
            if(!this.data.hierarchical)
                return;

            if(!newValue || this.$parent.name !== 'treeViewList')
                return;

            this.$updateSource(function() {
                this.data.hierarchical = false;
            });
        });
    },
    /**
     * @override
     */
    getParams: function() {
        if(this.data.parent)
            return _.extend({parentId: this.data.parent.id}, this.$ancestor.getParams());
    },
    $updateSource: function() {
        this.service.getList(this.getParams(), function(result) {
            // 给每个节点item添加parent
            result.forEach(function(item) {
                item.parent = this.data.parent;
            }.bind(this));

            this.$update('source', result);

            this.$emit('updateSource', {
                result: result
            });
        }.bind(this));
        return this;
    },
    /**
     * @method select(item) 选择某一项
     * @private
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$ancestor.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        this.$ancestor.toggle(item);
    }
});

module.exports = TreeView;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./treeView.html":65,"./treeViewList.html":67}],67:[function(require,module,exports){
module.exports="<ul class=\"treeview_list\" r-hide={!visible}>    {#list source as item}    <li>        <div class=\"treeview_item\">            {#if item.childrenCount || (item.children && item.children.length)}            <i class=\"u-icon\" r-class={ {\'u-icon-caret-right\': !item.open, \'u-icon-caret-down\': item.open}} on-click={this.toggle(item)}></i>            {/if}            <div class=\"treeview_itemname\" r-class={ {\'z-sel\': this.$ancestor.data.selected === item, \'z-dis\': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>        </div>        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}    </li>    {/list}</ul>"
},{}],68:[function(require,module,exports){
module.exports="<label class=\"u-check2 {@(class)}\" r-class={ {\'z-dis\': disabled, \'z-chk\': checked, \'z-part\': checked === null, \'u-check2-block\': block} } r-hide={!visible} title={name} on-click={this.check(!checked)}><div class=\"check2_box\"><i class=\"u-icon u-icon-check\"></i></div> {name}</label>"
},{}],69:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Check2   多选按钮
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./check2.html');
var _ = require('../base/util.js');

/**
 * @class Check2
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.name               多选按钮的文字
 * @param {object=null}             options.data.checked            多选按钮的选择状态
 * @param {boolean=false}           options.data.block              是否以block方式显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Check2 = Component.extend({
    name: 'check2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            checked: false,
            block: false
        });
        this.supr();
    },
    /**
     * @method check(checked) 改变选中状态
     * @public
     * @param  {boolean} checked 选中状态
     * @return {void}
     */
    check: function(checked) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.checked = checked;
        /**
         * @event check 改变选中状态时触发
         * @property {boolean} checked 选中状态
         */
        this.$emit('check', {
            checked: checked
        });
    }
});

module.exports = Check2;
},{"../base/component.js":32,"../base/util.js":36,"./check2.html":68}],70:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <check2 name={item.name} checked={item.checked} disabled={disabled} block={block} />    {/list}</div>"
},{}],71:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Check2Group 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var CheckGroup = require('./checkGroup.js');
var template = require('./check2Group.html');
var _ = require('../base/util.js');
var Check2 = require('./check2.js');

/**
 * @class Check2Group
 * @extend CheckGroup
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Check2Group = CheckGroup.extend({
    name: 'check2Group',
    template: template
});

module.exports = Check2Group;
},{"../base/util.js":36,"./check2.js":69,"./check2Group.html":70,"./checkGroup.js":73}],72:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-check2\" r-class={ {\'z-dis\': disabled, \'u-check2-block\': block} } title={item.name}><input type=\"checkbox\" class=\"u-check\" r-model={item.checked} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],73:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * CheckGroup 多选组
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./checkGroup.html');
var _ = require('../base/util.js');

/**
 * @class CheckGroup
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var CheckGroup = SourceComponent.extend({
    name: 'checkGroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            block: false
        });
        this.supr();
    },
    /**
     * @method checkAll(checked) 改变所有多选的选中状态
     * @public
     * @param  {object} checked 选中状态
     * @return {void}
     */
    checkAll: function(checked) {
        this.data.source.forEach(function(item) {
            item.checked = checked;
        });
        this.$update();
        /**
         * @event checkAll 改变所有多选的选中状态时触发
         * @property {object} checked 选中状态
         */
        this.$emit('checkAll', {
            checked: checked
        });
    }
});

module.exports = CheckGroup;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./checkGroup.html":72}],74:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={date} minDate={minDate} maxDate={maxDate} on-select={this.select($event.date)} />    </div></div>"
},{}],75:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * DatePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var template = require('./datePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');
var Calendar = require('../module/calendar.js');

/**
 * @class DatePicker
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {Date=null}               options.data.minDate            最小日期，如果为空则不限制
 * @param {Date=null}               options.data.maxDate            最大日期，如果为空则不限制
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var DatePicker = Dropdown.extend({
    name: 'datePicker',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            placeholder: '请输入'
        });
        this.supr();
    },
    /**
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date=null} date 选择的日期
     * @return {void}
     */
    select: function(date) {
        /**
         * @event select 选择某一项时触发
         * @property {object} date 当前选择项
         */
        this.$emit('select', {
            date: date
        });
        this.toggle(false);
    },
    change: function($event) {
        var date = new Date($event.target.value);
        if(date != 'Invalid Date')
            this.data.date = date;
    }
});

module.exports = DatePicker;
},{"../base/filter.js":33,"../base/util.js":36,"../module/calendar.js":42,"./datePicker.html":74,"./dropdown.js":79}],76:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest u-dropdown-datetimepicker {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd HH:mm\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={selectedDate} on-select={this.select($event.date)} />        <ul class=\"m-listview\">            {#list source as item}            <li on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],77:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * DateTimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var DatePicker = require('./datePicker.js');
var template = require('./dateTimePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');

/**
 * @class DateTimePicker
 * @extend DatePicker
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var DateTimePicker = DatePicker.extend({
    name: 'dateTimePicker',
    template: template,
    config: function() {
        var source = [];
        for(var i = 0; i < 10; i++) {
            source.push({name: '0' + i + ':00'});
            source.push({name: '0' + i + ':30'});
        }
        for(var i = 10; i < 24; i++) {
            source.push({name: i + ':00'});
            source.push({name: i + ':30'});
        }
        
        _.extend(this.data, {
            source: source,
            // @inherited source: [],
            // @inherited open: false,
            // @inherited placeholder: '请输入',
            selectedDate: new Date(),
            selectedTime: ''
        });
        this.supr();

        // this.$watch('selected', function(newValue, oldValue) {
        //     newValue = newValue || new Date();
        //     this.$refs.calendar.data.selected = newValue;

        //     var time =  filter.format(newValue, newValue.getMinutes()%30 === 0 ? 'HH:mm' : 'HH:00');
        //     for(var i = 0; i < this.data.source.length; i++) {
        //         var item = this.data.source[i];   
        //         if(time === item.name) {
        //             this.data.selectedTime = item;
        //             break;
        //         }
        //     }
        // });

        this.$watch(['selectedDate', 'selectedTime'], function(selectedDate, selectedTime) {
            if(selectedDate && selectedTime) {
                var date = new Date(this.data.selectedDate);
                var time = this.data.selectedTime.split(':');

                date.setHours(time[0]);
                date.setMinutes(time[1]);
                date.setSeconds(0);
                date.setMilliseconds(0);
                
                this.data.date = date;
            } else
                this.data.date = null;
        });
    },
    select: function(item) {
        /**
         * @event select 选择某一项时触发
         * @property {object} date 当前选择项
         */
        // this.$emit('select', {
        //     date: item
        // });

        if(!(item instanceof Date))
            this.data.selectedTime = item.name;

        if(!(item instanceof Date) || this.data.selectedTime)
            this.toggle(false);
    },
    change: function($event) {
        var value = $event.target.value;
        var date = new Date(value);
        if(date != 'Invalid Date') {
            // this.data.date = date;
            this.data.selectedDate = date;
            this.data.selectedTime = value.split(' ')[1];
        }
    }
});

module.exports = DateTimePicker;
},{"../base/filter.js":33,"../base/util.js":36,"./datePicker.js":75,"./dateTimePicker.html":76}],78:[function(require,module,exports){
module.exports="<div class=\"u-dropdown {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        {#if this.$body}            {#inc this.$body}        {#else}            <a class=\"u-btn\">{title || \'下拉菜单\'} <i class=\"u-icon u-icon-caret-down\"></i></a>        {/if}    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#list source as item}            <li r-class={ {\'z-dis\': item.disabled, \'dropdown_divider\': item.divider} } on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>            {/list}        </ul>    </div></div>"
},{}],79:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Dropdown  下拉菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./dropdown.html');
var _ = require('../base/util.js');

/**
 * @class Dropdown
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.source[].disabled  禁用此项
 * @param {boolean=false}           options.data.source[].divider   设置此项分隔线
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Dropdown = SourceComponent.extend({
    name: 'dropdown',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            open: false
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.disabled || item.disabled || item.divider)
            return;

        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    /**
     * @method toggle(open) 在展开/收起状态之间切换
     * @public
     * @param  {boolean} open 展开/收起
     * @return {void}
     */
    toggle: function(open) {
        if(this.data.disabled)
            return;
        
        this.data.open = open;

        // 根据状态在Dropdown.opens列表中添加/删除管理项
        var index = Dropdown.opens.indexOf(this);
        if(open && index < 0)
            Dropdown.opens.push(this);
        else if(!open && index >= 0)
            Dropdown.opens.splice(index, 1);
    }
});

// 处理点击dropdown之外的地方后的收起事件。
Dropdown.opens = [];

_.dom.on(document.body, 'click', function(e) {
    Dropdown.opens.forEach(function(dropdown) {
        // 这个地方不能用stopPropagation来处理，因为展开一个dropdown的同时要收起其他dropdown
        var element = dropdown.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        dropdown.toggle(false);
        dropdown.$update();
    });
});

module.exports = Dropdown;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./dropdown.html":78}],80:[function(require,module,exports){
module.exports="<a class=\"u-btn\" on-click={this.gotop()}>回到顶部</a>"
},{}],81:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Gotop  回到顶部
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./gotop.html');
var _ = require('../base/util.js');

/**
 * @class Gotop
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Gotop = Component.extend({
    name: 'gotop',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {

        });
        this.supr();
    },
    /**
     * @method gotop() 回到顶部
     * @public
     * @return {void}
     */
    gotop: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        document.body.scrollTop = 0;
    }
});

module.exports = Gotop;
},{"../base/component.js":32,"../base/util.js":36,"./gotop.html":80}],82:[function(require,module,exports){
module.exports="<label class=\"u-input2 {@(class)}\" r-hide={!visible}>    <input class=\"u-input u-input-{type}\" r-model={value} placeholder={placeholder} disabled={disabled} {#if readonly}readonly{/if} on-keyup={this.validate(value, rules)}></label><span class=\"u-tip u-tip-{type}\">{tip}</span>"
},{}],83:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Input2   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./input2.html');
var _ = require('../base/util.js');
var validator = require('../base/validator.js');

/**
 * @class Input2
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.value              输入框的值
 * @param {string=''}               options.data.type               输入框的类型
 * @param {string=''}               options.data.placeholder        占位符
 * @param {object[]=[]}             options.data.rules              验证规则
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Input2 = Component.extend({
    name: 'input2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: '',
            type: '',
            placeholder: '',
            rules: []
        });
        this.supr();
    },
    validate: function(value, rules) {
        var result = validator.validate(value, rules);
        
        this.data.type = result.success ? 'success' : 'error';
        this.data.tip = result.message;
    }
});

module.exports = Input2;
},{"../base/component.js":32,"../base/util.js":36,"../base/validator.js":37,"./input2.html":82}],84:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-menu {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        {#if this.$body}            {#inc this.$body}        {#else}            <a class=\"u-btn\">{title || \'多级菜单\'} <i class=\"u-icon u-icon-caret-down\"></i></a>        {/if}    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <menuList source={source} visible={true} />    </div></div>"
},{}],85:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Menu      多级菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var SourceComponent = require('../base/sourceComponent.js');
var template = require('./menu.html');
var hierarchicalTemplate = require('./menuList.html');
var _ = require('../base/util.js');

/**
 * @class  Menu
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.source[].disabled  禁用此项
 * @param {boolean=false}           options.data.source[].divider   设置此项分隔线
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Menu = Dropdown.extend({
    name: 'menu',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            open: false
        });
        this.supr();

        this.$ancestor = this;
    }
});

var MenuList = SourceComponent.extend({
    name: 'menuList',
    template: hierarchicalTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            // visible: false
        });
        this.supr();

        this.$ancestor = this.$parent.$ancestor;
        this.service = this.$ancestor.service;
        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
    },
    /**
     * @method select(item) 选择某一项
     * @private
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.$ancestor.data.disabled || item.disabled || item.divider)
            return;

        this.$ancestor.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.$ancestor.data.disabled)
            return;

        item.open = !item.open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @private
         * @property {object} item 展开收起项
         * @property {boolean} open 展开还是收起
         */
        this.$ancestor.$emit('toggle', {
            item: item,
            open: item.open
        });
    }
})

module.exports = Menu;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./dropdown.js":79,"./menu.html":84,"./menuList.html":86}],86:[function(require,module,exports){
module.exports="<ul class=\"m-listview menu_list\" r-hide={!visible}>    {#list source as item}    <li r-class={ {\'z-dis\': item.disabled, \'dropdown_divider\': item.divider} }>        <div class=\"menu_item\">            {#if item.childrenCount || (item.children && item.children.length)}            <i class=\"u-icon u-icon-caret-right\"></i>            {/if}            <div class=\"menu_itemname\" title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>        </div>        {#if item.childrenCount || (item.children && item.children.length)}<menuList source={item.children} visible={item.open} parent={item} />{/if}    </li>    {/list}</ul>"
},{}],87:[function(require,module,exports){
module.exports="<label class=\"u-input2 u-input2-numberinput {@(class)}\" r-hide={!visible}>    <input class=\"u-input u-input-{type}\" r-model={value | number} placeholder={placeholder} disabled={disabled} {#if readonly}readonly{/if} on-keyup={this.validate(value)}>    <a class=\"u-btn\" on-click={this.increase()}><i class=\"u-icon u-icon-caret-up\"></i></a>    <a class=\"u-btn\" on-click={this.decrease()}><i class=\"u-icon u-icon-caret-down\"></i></a></label><span class=\"u-tip u-tip-{type}\">{tip}</span>"
},{}],88:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * NumberInput 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Input2 = require('./input2.js');
var template = require('./numberInput.html');
var _ = require('../base/util.js');

/**
 * @class NumberInput
 * @extend Input2
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.value              输入框的值
 * @param {string=''}               options.data.type               输入框的类型
 * @param {string=''}               options.data.placeholder        占位符
 * @param {number=null}             options.data.min                最小值
 * @param {number=null}             options.data.max                最大值
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var NumberInput = Input2.extend({
    name: 'numberInput',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: 0,
            // @inherited type: '',
            // @inherited placeholder: '',
            min: null,
            max: null
        });
        this.supr();

        this.$watch('value', function(newValue, oldValue) {
            if(this.data.max !== null && this.data.value > this.data.max)
                this.data.value = this.data.max;
            if(this.data.min !== null && this.data.value < this.data.min)
                this.data.value = this.data.min;
        });
    },
    increase: function() {
        this.data.value++;
    },
    decrease: function() {
        this.data.value--;
    }
}).filter({
    number: {
        get: function(value) {
            return '' + (value || 0);
        },
        set: function(value) {
            return +value || 0;
            // return +(value.replace(/[^\d\.\-]/g, '')) || 0;
        }
    }
});

module.exports = NumberInput;
},{"../base/util.js":36,"./input2.js":83,"./numberInput.html":87}],89:[function(require,module,exports){
module.exports="<div class=\"u-progress u-progress-{@(size)} u-progress-{@(type)} {@(class)}\" r-class={ {\'u-progress-striped\': striped, \'z-act\': active} } r-hide={!visible}>    <div class=\"progress_bar\" style=\"width: {percent}%;\">{text ? (text === true ? percent + \'%\' : text) : \'\'}</div></div>"
},{}],90:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Progress  进度条
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./progress.html');
var _ = require('../base/util.js');

/**
 * @class Progress
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {number=36}               options.data.percent            百分比
 * @param {string|boolean=true}     options.data.text               在进度条中是否显示百分比。值为`string`时显示该段文字。
 * @param {string=null}             options.data.size               进度条的尺寸
 * @param {string=null}             options.data.type               进度条的类型，改变显示颜色
 * @param {boolean=false}           options.data.striped            是否显示条纹
 * @param {boolean=false}           options.data.active             进度条是否为激活状态，当`striped`为`true`时，进度条显示动画
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Progress = Component.extend({
    name: 'progress',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            percent: 36,
            text: true,
            size: null,
            type: null,
            striped: false,
            active: false
        });
        this.supr();
    }
});

module.exports = Progress;
},{"../base/component.js":32,"../base/util.js":36,"./progress.html":89}],91:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-radio2\" r-class={ {\'z-dis\': disabled, \'z-sel\': item === selected, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><div class=\"radio2_box\"><i class=\"u-icon u-icon-radio\"></i></div> {item.name}</label>    {/list}</div>"
},{}],92:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Radio2Group 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var RadioGroup = require('./radioGroup.js');
var template = require('./radio2Group.html');
var _ = require('../base/util.js');

/**
 * @class Radio2Group
 * @extend RadioGroup
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.seleced            当前选择项
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Radio2Group = RadioGroup.extend({
    name: 'radio2Group',
    template: template
});

module.exports = Radio2Group;
},{"../base/util.js":36,"./radio2Group.html":91,"./radioGroup.js":94}],93:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-radio2\" r-class={ {\'z-dis\': disabled, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><input type=\"radio\" class=\"u-radio\" name={_radioGroupId} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],94:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * RadioGroup 单选组
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./radioGroup.html');
var _ = require('../base/util.js');

/**
 * @class RadioGroup
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.seleced            当前选择项
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var RadioGroup = SourceComponent.extend({
    name: 'radioGroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            _radioGroupId: new Date()
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

module.exports = RadioGroup;
},{"../base/sourceComponent.js":35,"../base/util.js":36,"./radioGroup.html":93}],95:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-select2 {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <span>{selected ? selected.name : placeholder}</span>        <i class=\"u-icon u-icon-caret-down\"></i>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#if placeholder}<li r-class={ {\'z-sel\': selected === null} } on-click={this.select(null)}>{placeholder}</li>{/if}            {#list source as item}            <li r-class={ {\'z-sel\': selected === item} } on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],96:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Select2  选择扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('./dropdown.js');
var template = require('./select2.html');
var _ = require('../base/util.js');

/**
 * @class Select2
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Select2 = Dropdown.extend({
    name: 'select2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false
            selected: null,
            placeholder: '请选择'
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$update('selected', item);
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
});

module.exports = Select2;
},{"../base/util.js":36,"./dropdown.js":79,"./select2.html":95}],97:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} r-model={value} on-focus={this.input($event)} on-keyup={this.input($event)} on-blur={this.uninput($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#list source as item}            {#if this.filter(item)}                <li on-click={this.select(item)}>{item.name}</li>            {/if}            {/list}        </ul>    </div></div>"
},{}],98:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Suggest   自动提示
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('./dropdown.js');
var template = require('./suggest.html');
var _ = require('../base/util.js');
var ListView = require('../module/listView.js');

/**
 * @class Suggest
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=''}               options.data.value              文本框中的值
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {number=0}                options.data.minLength          最小提示长度。当输入长度>=该值后开始提示
 * @param {string='all'}            options.data.matchType          匹配方式，`all`表示匹配全局，`start`表示只匹配开头，`end`表示只匹配结尾
 * @param {boolean=false}           options.data.strict             是否为严格模式。当为严格模式时，`value`属性必须在source中选择，否则为空。
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Suggest = Dropdown.extend({
    name: 'suggest',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            selected: null,
            value: '',
            placeholder: '请输入',
            minLength: 0,
            delay: 300,
            matchType: 'all',
            strict: false
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$update('selected', item);
        this.data.value = item.name;
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    /**
     * @method toggle(open)  在展开状态和收起状态之间切换
     * @public
     * @param  {boolean} open 展开还是收起
     * @return {void}
     */
    toggle: function(open, _isInput) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.open = open;

        /**
         * @event toggle 展开或收起状态改变时触发
         * @property {boolean} open 展开还是收起
         */
        this.$emit('toggle', {
            open: open
        });

        var index = Dropdown.opens.indexOf(this);
        if(open && index < 0)
            Dropdown.opens.push(this);
        else if(!open && index >= 0) {
            Dropdown.opens.splice(index, 1);

            if(!_isInput && this.data.strict)
               this.data.value = this.data.selected ? this.data.selected.name : '';
        }
    },
    // 输入时
    input: function($event) {
        var value = this.data.value;

        if(value.length >= this.data.minLength)
            this.toggle(true);
        else
            this.toggle(false, true);
    },
    uninput: function($event) {

    },
    filter: function(item) {
        var value = this.data.value;

        if(!value && this.data.minLength)
            return false;

        if(this.data.matchType == 'all')
            return item.name.indexOf(value) >= 0;
        else if(this.data.matchType == 'start')
            return item.name.slice(0, value.length) == value;
        else if(this.data.matchType == 'end')
            return item.name.slice(-value.length) == value;
    }
});

module.exports = Suggest;
},{"../base/util.js":36,"../module/listView.js":50,"./dropdown.js":79,"./suggest.html":97}],99:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Suggest = require('./suggest.js');
var _ = require('../base/util.js');

/**
 * @class TimePicker
 * @extend Suggest
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.value              文本框中的值
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var TimePicker = Suggest.extend({
    name: 'timePicker',
    /**
     * @protected
     */
    config: function() {
        var source = [];
        for(var i = 0; i < 10; i++) {
            source.push({name: '0' + i + ':00'});
            source.push({name: '0' + i + ':30'});
        }
        for(var i = 10; i < 24; i++) {
            source.push({name: i + ':00'});
            source.push({name: i + ':30'});
        }

        _.extend(this.data, {
            source: source,
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited value: '',
            // @inherited placeholder: '请输入',
            // @inherited minLength: 0,
            // @inherited delay: 300,
            matchType: 'start'
            // @inherited strict: false
        });
        this.supr();
    },
    filter: function(item) {
        return true;
    }
});

module.exports = TimePicker;
},{"../base/util.js":36,"./suggest.js":98}],100:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-select2 {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <i class=\"u-icon u-icon-caret-down\"></i>        <span>{selected ? selected.name : placeholder}</span>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <treeView source={source} on-select={this.select($event.selected)} />    </div></div>"
},{}],101:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Select2 = require('./select2.js');
var template = require('./treeSelect.html');
var _ = require('../base/util.js');
var Treeview = require('../module/treeView.js');

/**
 * @class TreeSelect
 * @extend Select2
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TreeSelect = Select2.extend({
    name: 'treeSelect',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited placeholder: '请选择'
        });
        this.supr();
    }
});

module.exports = TreeSelect;
},{"../base/util.js":36,"../module/treeView.js":66,"./select2.js":96,"./treeSelect.html":100}],102:[function(require,module,exports){
module.exports="<div class=\"u-uploader {@(class)}\" r-hide={!visible}>    <a class=\"u-btn\" on-click={this.upload()}>{name || \'上传\'}</a>    <form method=\"POST\" action={url} target=\"iframe{_id}\" enctype={contentType} ref=\"form\">        <input type=\"file\" name=\"file\" ref=\"file\" on-change={this.submit()}>        {#list Object.keys(data) as key}        <input type=\"hidden\" name={key} value={data[key]}>        {/list}    </form>    <iframe name=\"iframe{_id}\" on-load={this.cbUpload()} ref=\"iframe\">    </iframe></div>"
},{}],103:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Uploader  上传
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./uploader.html');
var _ = require('../base/util.js');

/**
 * @class Uploader
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.name               按钮文字
 * @param {string=''}               options.data.url                上传路径
 * @param {string='json'}           options.data.dataType           数据类型
 * @param {object}                  options.data.data               附加数据
 * @param {string[]=null}           options.data.extensions         可上传的扩展名，如果为空，则表示可上传任何文件类型
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Uploader = Component.extend({
    name: 'uploader',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            url: '',
            contentType: 'multipart/form-data',
            dataType: 'json',
            data: {},
            extensions: null,
            _id: new Date().getTime()
        });
        this.supr();
    },
    /**
     * @method upload() 弹出文件对话框并且上传文件
     * @public
     * @return {void}
     */
    upload: function() {
        this.$refs.file.click();
    },
    /**
     * @method submit() 提交表单
     * @private
     * @return {void}
     */
    submit: function() {
        if(this.data.extensions) {
            var fileName = this.$refs.file.value;
            var ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();

            if(this.data.extensions.indexOf(ext) === -1)
                return this.$emit('error', this.extensionError());
        }

        this.$emit('sending', this.data.data);

        this.$refs.form.submit();
    },
    cbUpload: function() {
        var iframe = this.$refs.iframe;

        var xml = {};
        try {
            if(iframe.contentWindow) {
                xml.responseText = iframe.contentWindow.document.body ? iframe.contentWindow.document.body.innerHTML : null;
                xml.responseXML = iframe.contentWindow.document.XMLDocument ? iframe.contentWindow.document.XMLDocument : iframe.contentWindow.document;
            } else if(iframe.contentDocument) {
                xml.responseText = iframe.contentDocument.document.body?iframe.contentDocument.document.body.innerHTML : null;
                xml.responseXML = iframe.contentDocument.document.XMLDocument?iframe.contentDocument.document.XMLDocument : iframe.contentDocument.document;
            }
        } catch(e) {
            console.log(e);
        }

        if(!xml.responseText)
            return;

        function uploadHttpData(r, type) {
            var data = (type == 'xml' || !type) ? r.responseXML : r.responseText;
            // If the type is 'script', eval it in global context
            if (type === 'json') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    var text = /<pre.*?>(.*?)<\/pre>/.exec(data);
                    text = text ? text[1] : data;
                    data = JSON.parse(text);
                }
            }
            return data;
        }

        this.$emit('success', uploadHttpData(xml, this.data.dataType));
        this.$emit('complete', xml);

        this.$refs.file.value = '';
    },
    extensionError:　function() {
        return '只能上传' + this.data.extensions.join(', ')　+ '类型的文件！';
    },
});

module.exports = Uploader;
},{"../base/component.js":32,"../base/util.js":36,"./uploader.html":102}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWFya2VkL2xpYi9tYXJrZWQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9SZWd1bGFyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvY29uc3QuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9kaXJlY3RpdmUvYW5pbWF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9kaXJlY3RpdmUvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9kaXJlY3RpdmUvZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2RvbS5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2Vudi5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2dyb3VwLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2FuaW1hdGUuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvYXJyYXlEaWZmLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2NvbWJpbmUuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXh0ZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2ZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9zaGltLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL3dhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL21vZHVsZS90aW1lb3V0LmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL0xleGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3BhcnNlci9ub2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3dhbGtlcnMuanMiLCJub2RlX21vZHVsZXMvcmVxd2VzdC9yZXF3ZXN0LmpzIiwibm9kZV9tb2R1bGVzL3ZhbGlkYXRvci92YWxpZGF0b3IuanMiLCJzcmMvanMvYmFzZS9jb21wb25lbnQuanMiLCJzcmMvanMvYmFzZS9maWx0ZXIuanMiLCJzcmMvanMvYmFzZS9yZXF1ZXN0LmpzIiwic3JjL2pzL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzIiwic3JjL2pzL2Jhc2UvdXRpbC5qcyIsInNyYy9qcy9iYXNlL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9tb2R1bGUvYWNjb3JkaW9uLmh0bWwiLCJzcmMvanMvbW9kdWxlL2FjY29yZGlvbi5qcyIsInNyYy9qcy9tb2R1bGUvYWNjb3JkaW9uUGFuZS5odG1sIiwic3JjL2pzL21vZHVsZS9jYWxlbmRhci5odG1sIiwic3JjL2pzL21vZHVsZS9jYWxlbmRhci5qcyIsInNyYy9qcy9tb2R1bGUvZWRpdG9yLmh0bWwiLCJzcmMvanMvbW9kdWxlL2VkaXRvci5qcyIsInNyYy9qcy9tb2R1bGUvZ3JpZFZpZXcuaHRtbCIsInNyYy9qcy9tb2R1bGUvZ3JpZFZpZXcuanMiLCJzcmMvanMvbW9kdWxlL2h0bWxFZGl0b3IuaHRtbCIsInNyYy9qcy9tb2R1bGUvaHRtbEVkaXRvci5qcyIsInNyYy9qcy9tb2R1bGUvbGlzdFZpZXcuaHRtbCIsInNyYy9qcy9tb2R1bGUvbGlzdFZpZXcuanMiLCJzcmMvanMvbW9kdWxlL21hcmtFZGl0b3IuanMiLCJzcmMvanMvbW9kdWxlL21lbnViYXIuaHRtbCIsInNyYy9qcy9tb2R1bGUvbWVudWJhci5qcyIsInNyYy9qcy9tb2R1bGUvbW9kYWwuaHRtbCIsInNyYy9qcy9tb2R1bGUvbW9kYWwuanMiLCJzcmMvanMvbW9kdWxlL25vdGlmeS5odG1sIiwic3JjL2pzL21vZHVsZS9ub3RpZnkuanMiLCJzcmMvanMvbW9kdWxlL3BhZ2VyLmh0bWwiLCJzcmMvanMvbW9kdWxlL3BhZ2VyLmpzIiwic3JjL2pzL21vZHVsZS90YWIuaHRtbCIsInNyYy9qcy9tb2R1bGUvdGFiLmpzIiwic3JjL2pzL21vZHVsZS90YWJsZVZpZXcuaHRtbCIsInNyYy9qcy9tb2R1bGUvdGFibGVWaWV3LmpzIiwic3JjL2pzL21vZHVsZS90cmVlVmlldy5odG1sIiwic3JjL2pzL21vZHVsZS90cmVlVmlldy5qcyIsInNyYy9qcy9tb2R1bGUvdHJlZVZpZXdMaXN0Lmh0bWwiLCJzcmMvanMvdW5pdC9jaGVjazIuaHRtbCIsInNyYy9qcy91bml0L2NoZWNrMi5qcyIsInNyYy9qcy91bml0L2NoZWNrMkdyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9jaGVjazJHcm91cC5qcyIsInNyYy9qcy91bml0L2NoZWNrR3JvdXAuaHRtbCIsInNyYy9qcy91bml0L2NoZWNrR3JvdXAuanMiLCJzcmMvanMvdW5pdC9kYXRlUGlja2VyLmh0bWwiLCJzcmMvanMvdW5pdC9kYXRlUGlja2VyLmpzIiwic3JjL2pzL3VuaXQvZGF0ZVRpbWVQaWNrZXIuaHRtbCIsInNyYy9qcy91bml0L2RhdGVUaW1lUGlja2VyLmpzIiwic3JjL2pzL3VuaXQvZHJvcGRvd24uaHRtbCIsInNyYy9qcy91bml0L2Ryb3Bkb3duLmpzIiwic3JjL2pzL3VuaXQvZ290b3AuaHRtbCIsInNyYy9qcy91bml0L2dvdG9wLmpzIiwic3JjL2pzL3VuaXQvaW5wdXQyLmh0bWwiLCJzcmMvanMvdW5pdC9pbnB1dDIuanMiLCJzcmMvanMvdW5pdC9tZW51Lmh0bWwiLCJzcmMvanMvdW5pdC9tZW51LmpzIiwic3JjL2pzL3VuaXQvbWVudUxpc3QuaHRtbCIsInNyYy9qcy91bml0L251bWJlcklucHV0Lmh0bWwiLCJzcmMvanMvdW5pdC9udW1iZXJJbnB1dC5qcyIsInNyYy9qcy91bml0L3Byb2dyZXNzLmh0bWwiLCJzcmMvanMvdW5pdC9wcm9ncmVzcy5qcyIsInNyYy9qcy91bml0L3JhZGlvMkdyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9yYWRpbzJHcm91cC5qcyIsInNyYy9qcy91bml0L3JhZGlvR3JvdXAuaHRtbCIsInNyYy9qcy91bml0L3JhZGlvR3JvdXAuanMiLCJzcmMvanMvdW5pdC9zZWxlY3QyLmh0bWwiLCJzcmMvanMvdW5pdC9zZWxlY3QyLmpzIiwic3JjL2pzL3VuaXQvc3VnZ2VzdC5odG1sIiwic3JjL2pzL3VuaXQvc3VnZ2VzdC5qcyIsInNyYy9qcy91bml0L3RpbWVQaWNrZXIuanMiLCJzcmMvanMvdW5pdC90cmVlU2VsZWN0Lmh0bWwiLCJzcmMvanMvdW5pdC90cmVlU2VsZWN0LmpzIiwic3JjL2pzL3VuaXQvdXBsb2FkZXIuaHRtbCIsInNyYy9qcy91bml0L3VwbG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNydEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1aEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckxBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xLQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJHVUkgICAgICBSZWd1bGFyIFVJ5bqTXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkdVSSA9IHt9XG5cbi8qKlxuICogYmFzZVxuICovXG5SR1VJLlJlZ3VsYXIgPSByZXF1aXJlKCdyZWd1bGFyanMnKTtcblJHVUkuQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9iYXNlL2NvbXBvbmVudC5qcycpO1xuUkdVSS5fID0gcmVxdWlyZSgnLi9iYXNlL3V0aWwuanMnKTtcblJHVUkucmVxdWVzdCA9IHJlcXVpcmUoJy4vYmFzZS9yZXF1ZXN0LmpzJyk7XG5cbi8qKlxuICoganNVbml0XG4gKi9cbi8vIOWvvOiIquexu1xuUkdVSS5Ecm9wZG93biA9IHJlcXVpcmUoJy4vdW5pdC9kcm9wZG93bi5qcycpO1xuUkdVSS5NZW51ID0gcmVxdWlyZSgnLi91bml0L21lbnUuanMnKTtcblxuLy8g6KGo5Y2V57G7XG5SR1VJLklucHV0MiA9IHJlcXVpcmUoJy4vdW5pdC9pbnB1dDIuanMnKTtcblJHVUkuTnVtYmVySW5wdXQgPSByZXF1aXJlKCcuL3VuaXQvbnVtYmVySW5wdXQuanMnKTtcblJHVUkuQ2hlY2syID0gcmVxdWlyZSgnLi91bml0L2NoZWNrMi5qcycpO1xuUkdVSS5DaGVja0dyb3VwID0gcmVxdWlyZSgnLi91bml0L2NoZWNrR3JvdXAuanMnKTtcblJHVUkuQ2hlY2syR3JvdXAgPSByZXF1aXJlKCcuL3VuaXQvY2hlY2syR3JvdXAuanMnKTtcblJHVUkuUmFkaW9Hcm91cCA9IHJlcXVpcmUoJy4vdW5pdC9yYWRpb0dyb3VwLmpzJyk7XG5SR1VJLlJhZGlvMkdyb3VwID0gcmVxdWlyZSgnLi91bml0L3JhZGlvMkdyb3VwLmpzJyk7XG5SR1VJLlNlbGVjdDIgPSByZXF1aXJlKCcuL3VuaXQvc2VsZWN0Mi5qcycpO1xuUkdVSS5UcmVlU2VsZWN0ID0gcmVxdWlyZSgnLi91bml0L3RyZWVTZWxlY3QuanMnKTtcblJHVUkuU3VnZ2VzdCA9IHJlcXVpcmUoJy4vdW5pdC9zdWdnZXN0LmpzJyk7XG5SR1VJLlVwbG9hZGVyID0gcmVxdWlyZSgnLi91bml0L3VwbG9hZGVyLmpzJyk7XG5cbi8vIOaXpeacn+exu1xuUkdVSS5EYXRlUGlja2VyID0gcmVxdWlyZSgnLi91bml0L2RhdGVQaWNrZXIuanMnKTtcblJHVUkuVGltZVBpY2tlciA9IHJlcXVpcmUoJy4vdW5pdC90aW1lUGlja2VyLmpzJyk7XG5SR1VJLkRhdGVUaW1lUGlja2VyID0gcmVxdWlyZSgnLi91bml0L2RhdGVUaW1lUGlja2VyLmpzJyk7XG5cbi8vIOWFtuS7llxuUkdVSS5Qcm9ncmVzcyA9IHJlcXVpcmUoJy4vdW5pdC9wcm9ncmVzcy5qcycpO1xuUkdVSS5Hb3RvcCA9IHJlcXVpcmUoJy4vdW5pdC9nb3RvcC5qcycpO1xuXG4vKipcbiAqIGpzTW9kdWxlXG4gKi9cbi8vIOWvvOiIquexu1xuUkdVSS5UYWIgPSByZXF1aXJlKCcuL21vZHVsZS90YWIuanMnKTtcblJHVUkuQWNjb3JkaW9uID0gcmVxdWlyZSgnLi9tb2R1bGUvYWNjb3JkaW9uLmpzJyk7XG5SR1VJLlBhZ2VyID0gcmVxdWlyZSgnLi9tb2R1bGUvcGFnZXIuanMnKTtcblJHVUkuTWVudWJhciA9IHJlcXVpcmUoJy4vbW9kdWxlL21lbnViYXIuanMnKTtcblxuLy8g56qX5Y+j57G7XG5SR1VJLk5vdGlmeSA9IHJlcXVpcmUoJy4vbW9kdWxlL25vdGlmeS5qcycpO1xuUkdVSS5Nb2RhbCA9IHJlcXVpcmUoJy4vbW9kdWxlL21vZGFsLmpzJyk7XG5cbi8vIOaVsOaNruexu1xuUkdVSS5MaXN0VmlldyA9IHJlcXVpcmUoJy4vbW9kdWxlL2xpc3RWaWV3LmpzJyk7XG5SR1VJLkdyaWRWaWV3ID0gcmVxdWlyZSgnLi9tb2R1bGUvZ3JpZFZpZXcuanMnKTtcblJHVUkuVHJlZVZpZXcgPSByZXF1aXJlKCcuL21vZHVsZS90cmVlVmlldy5qcycpO1xuUkdVSS5UYWJsZVZpZXcgPSByZXF1aXJlKCcuL21vZHVsZS90YWJsZVZpZXcuanMnKTtcblxuLy8g5pel5pyf57G7XG5SR1VJLkNhbGVuZGFyID0gcmVxdWlyZSgnLi9tb2R1bGUvY2FsZW5kYXIuanMnKTtcblxuLy8g5LiK5Lyg57G7XG4vL1xuXG4vLyDnvJbovpHlmajnsbtcblJHVUkuRWRpdG9yID0gcmVxdWlyZSgnLi9tb2R1bGUvZWRpdG9yLmpzJyk7XG5SR1VJLkhUTUxFZGl0b3IgPSByZXF1aXJlKCcuL21vZHVsZS9odG1sRWRpdG9yLmpzJyk7XG5SR1VJLk1hcmtFZGl0b3IgPSByZXF1aXJlKCcuL21vZHVsZS9tYXJrRWRpdG9yLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LlJHVUkgPSBSR1VJOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qKlxuICogbWFya2VkIC0gYSBtYXJrZG93biBwYXJzZXJcbiAqIENvcHlyaWdodCAoYykgMjAxMS0yMDE0LCBDaHJpc3RvcGhlciBKZWZmcmV5LiAoTUlUIExpY2Vuc2VkKVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkXG4gKi9cblxuOyhmdW5jdGlvbigpIHtcblxuLyoqXG4gKiBCbG9jay1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXlxcbisvLFxuICBjb2RlOiAvXiggezR9W15cXG5dK1xcbiopKy8sXG4gIGZlbmNlczogbm9vcCxcbiAgaHI6IC9eKCAqWy0qX10pezMsfSAqKD86XFxuK3wkKS8sXG4gIGhlYWRpbmc6IC9eICooI3sxLDZ9KSAqKFteXFxuXSs/KSAqIyogKig/Olxcbit8JCkvLFxuICBucHRhYmxlOiBub29wLFxuICBsaGVhZGluZzogL14oW15cXG5dKylcXG4gKig9fC0pezIsfSAqKD86XFxuK3wkKS8sXG4gIGJsb2NrcXVvdGU6IC9eKCAqPlteXFxuXSsoXFxuKD8hZGVmKVteXFxuXSspKlxcbiopKy8sXG4gIGxpc3Q6IC9eKCAqKShidWxsKSBbXFxzXFxTXSs/KD86aHJ8ZGVmfFxcbnsyLH0oPyEgKSg/IVxcMWJ1bGwgKVxcbip8XFxzKiQpLyxcbiAgaHRtbDogL14gKig/OmNvbW1lbnQgKig/OlxcbnxcXHMqJCl8Y2xvc2VkICooPzpcXG57Mix9fFxccyokKXxjbG9zaW5nICooPzpcXG57Mix9fFxccyokKSkvLFxuICBkZWY6IC9eICpcXFsoW15cXF1dKylcXF06ICo8PyhbXlxccz5dKyk+Pyg/OiArW1wiKF0oW15cXG5dKylbXCIpXSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3AsXG4gIHBhcmFncmFwaDogL14oKD86W15cXG5dK1xcbj8oPyFocnxoZWFkaW5nfGxoZWFkaW5nfGJsb2NrcXVvdGV8dGFnfGRlZikpKylcXG4qLyxcbiAgdGV4dDogL15bXlxcbl0rL1xufTtcblxuYmxvY2suYnVsbGV0ID0gLyg/OlsqKy1dfFxcZCtcXC4pLztcbmJsb2NrLml0ZW0gPSAvXiggKikoYnVsbCkgW15cXG5dKig/Olxcbig/IVxcMWJ1bGwgKVteXFxuXSopKi87XG5ibG9jay5pdGVtID0gcmVwbGFjZShibG9jay5pdGVtLCAnZ20nKVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoKTtcblxuYmxvY2subGlzdCA9IHJlcGxhY2UoYmxvY2subGlzdClcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCdocicsICdcXFxcbisoPz1cXFxcMT8oPzpbLSpfXSAqKXszLH0oPzpcXFxcbit8JCkpJylcbiAgKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpXG4gICgpO1xuXG5ibG9jay5ibG9ja3F1b3RlID0gcmVwbGFjZShibG9jay5ibG9ja3F1b3RlKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbmJsb2NrLl90YWcgPSAnKD8hKD86J1xuICArICdhfGVtfHN0cm9uZ3xzbWFsbHxzfGNpdGV8cXxkZm58YWJicnxkYXRhfHRpbWV8Y29kZSdcbiAgKyAnfHZhcnxzYW1wfGtiZHxzdWJ8c3VwfGl8Ynx1fG1hcmt8cnVieXxydHxycHxiZGl8YmRvJ1xuICArICd8c3Bhbnxicnx3YnJ8aW5zfGRlbHxpbWcpXFxcXGIpXFxcXHcrKD8hOi98W15cXFxcd1xcXFxzQF0qQClcXFxcYic7XG5cbmJsb2NrLmh0bWwgPSByZXBsYWNlKGJsb2NrLmh0bWwpXG4gICgnY29tbWVudCcsIC88IS0tW1xcc1xcU10qPy0tPi8pXG4gICgnY2xvc2VkJywgLzwodGFnKVtcXHNcXFNdKz88XFwvXFwxPi8pXG4gICgnY2xvc2luZycsIC88dGFnKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LylcbiAgKC90YWcvZywgYmxvY2suX3RhZylcbiAgKCk7XG5cbmJsb2NrLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJ2hyJywgYmxvY2suaHIpXG4gICgnaGVhZGluZycsIGJsb2NrLmhlYWRpbmcpXG4gICgnbGhlYWRpbmcnLCBibG9jay5saGVhZGluZylcbiAgKCdibG9ja3F1b3RlJywgYmxvY2suYmxvY2txdW90ZSlcbiAgKCd0YWcnLCAnPCcgKyBibG9jay5fdGFnKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBtZXJnZSh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gbWVyZ2Uoe30sIGJsb2NrLm5vcm1hbCwge1xuICBmZW5jZXM6IC9eICooYHszLH18fnszLH0pWyBcXC5dKihcXFMrKT8gKlxcbihbXFxzXFxTXSo/KVxccypcXDEgKig/Olxcbit8JCkvLFxuICBwYXJhZ3JhcGg6IC9eLyxcbiAgaGVhZGluZzogL14gKigjezEsNn0pICsoW15cXG5dKz8pICojKiAqKD86XFxuK3wkKS9cbn0pO1xuXG5ibG9jay5nZm0ucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnKD8hJywgJyg/ISdcbiAgICArIGJsb2NrLmdmbS5mZW5jZXMuc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwyJykgKyAnfCdcbiAgICArIGJsb2NrLmxpc3Quc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwzJykgKyAnfCcpXG4gICgpO1xuXG4vKipcbiAqIEdGTSArIFRhYmxlcyBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2sudGFibGVzID0gbWVyZ2Uoe30sIGJsb2NrLmdmbSwge1xuICBucHRhYmxlOiAvXiAqKFxcUy4qXFx8LiopXFxuICooWy06XSsgKlxcfFstfCA6XSopXFxuKCg/Oi4qXFx8LiooPzpcXG58JCkpKilcXG4qLyxcbiAgdGFibGU6IC9eICpcXHwoLispXFxuICpcXHwoICpbLTpdK1stfCA6XSopXFxuKCg/OiAqXFx8LiooPzpcXG58JCkpKilcXG4qL1xufSk7XG5cbi8qKlxuICogQmxvY2sgTGV4ZXJcbiAqL1xuXG5mdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW5zLmxpbmtzID0ge307XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLnJ1bGVzID0gYmxvY2subm9ybWFsO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50YWJsZXMpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay50YWJsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay5nZm07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIEJsb2NrIFJ1bGVzXG4gKi9cblxuTGV4ZXIucnVsZXMgPSBibG9jaztcblxuLyoqXG4gKiBTdGF0aWMgTGV4IE1ldGhvZFxuICovXG5cbkxleGVyLmxleCA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucykge1xuICB2YXIgbGV4ZXIgPSBuZXcgTGV4ZXIob3B0aW9ucyk7XG4gIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbn07XG5cbi8qKlxuICogUHJlcHJvY2Vzc2luZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS5sZXggPSBmdW5jdGlvbihzcmMpIHtcbiAgc3JjID0gc3JjXG4gICAgLnJlcGxhY2UoL1xcclxcbnxcXHIvZywgJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpXG4gICAgLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHUyNDI0L2csICdcXG4nKTtcblxuICByZXR1cm4gdGhpcy50b2tlbihzcmMsIHRydWUpO1xufTtcblxuLyoqXG4gKiBMZXhpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUudG9rZW4gPSBmdW5jdGlvbihzcmMsIHRvcCwgYnEpIHtcbiAgdmFyIHNyYyA9IHNyYy5yZXBsYWNlKC9eICskL2dtLCAnJylcbiAgICAsIG5leHRcbiAgICAsIGxvb3NlXG4gICAgLCBjYXBcbiAgICAsIGJ1bGxcbiAgICAsIGJcbiAgICAsIGl0ZW1cbiAgICAsIHNwYWNlXG4gICAgLCBpXG4gICAgLCBsO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBuZXdsaW5lXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubmV3bGluZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzBdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ3NwYWNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiB7NH0vZ20sICcnKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICA/IGNhcC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuICAgICAgICAgIDogY2FwXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGZlbmNlcyAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmZlbmNlcy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICBsYW5nOiBjYXBbMl0sXG4gICAgICAgIHRleHQ6IGNhcFszXSB8fCAnJ1xuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzFdLmxlbmd0aCxcbiAgICAgICAgdGV4dDogY2FwWzJdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIG5vIGxlYWRpbmcgcGlwZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMubnB0YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXS5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxoZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMl0gPT09ICc9JyA/IDEgOiAyLFxuICAgICAgICB0ZXh0OiBjYXBbMV1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oci5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hyJ1xuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBibG9ja3F1b3RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYmxvY2txdW90ZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9zdGFydCdcbiAgICAgIH0pO1xuXG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiAqPiA/L2dtLCAnJyk7XG5cbiAgICAgIC8vIFBhc3MgYHRvcGAgdG8ga2VlcCB0aGUgY3VycmVudFxuICAgICAgLy8gXCJ0b3BsZXZlbFwiIHN0YXRlLiBUaGlzIGlzIGV4YWN0bHlcbiAgICAgIC8vIGhvdyBtYXJrZG93bi5wbCB3b3Jrcy5cbiAgICAgIHRoaXMudG9rZW4oY2FwLCB0b3AsIHRydWUpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpc3RcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saXN0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGJ1bGwgPSBjYXBbMl07XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9zdGFydCcsXG4gICAgICAgIG9yZGVyZWQ6IGJ1bGwubGVuZ3RoID4gMVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEdldCBlYWNoIHRvcC1sZXZlbCBpdGVtLlxuICAgICAgY2FwID0gY2FwWzBdLm1hdGNoKHRoaXMucnVsZXMuaXRlbSk7XG5cbiAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgIGwgPSBjYXAubGVuZ3RoO1xuICAgICAgaSA9IDA7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBjYXBbaV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0IGl0ZW0ncyBidWxsZXRcbiAgICAgICAgLy8gc28gaXQgaXMgc2VlbiBhcyB0aGUgbmV4dCB0b2tlbi5cbiAgICAgICAgc3BhY2UgPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXiAqKFsqKy1dfFxcZCtcXC4pICsvLCAnJyk7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGF0ZXZlciB0aGVcbiAgICAgICAgLy8gbGlzdCBpdGVtIGNvbnRhaW5zLiBIYWNreS5cbiAgICAgICAgaWYgKH5pdGVtLmluZGV4T2YoJ1xcbiAnKSkge1xuICAgICAgICAgIHNwYWNlIC09IGl0ZW0ubGVuZ3RoO1xuICAgICAgICAgIGl0ZW0gPSAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgICA/IGl0ZW0ucmVwbGFjZShuZXcgUmVnRXhwKCdeIHsxLCcgKyBzcGFjZSArICd9JywgJ2dtJyksICcnKVxuICAgICAgICAgICAgOiBpdGVtLnJlcGxhY2UoL14gezEsNH0vZ20sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXh0IGxpc3QgaXRlbSBiZWxvbmdzIGhlcmUuXG4gICAgICAgIC8vIEJhY2twZWRhbCBpZiBpdCBkb2VzIG5vdCBiZWxvbmcgaW4gdGhpcyBsaXN0LlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0TGlzdHMgJiYgaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBiID0gYmxvY2suYnVsbGV0LmV4ZWMoY2FwW2kgKyAxXSlbMF07XG4gICAgICAgICAgaWYgKGJ1bGwgIT09IGIgJiYgIShidWxsLmxlbmd0aCA+IDEgJiYgYi5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgc3JjID0gY2FwLnNsaWNlKGkgKyAxKS5qb2luKCdcXG4nKSArIHNyYztcbiAgICAgICAgICAgIGkgPSBsIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBpdGVtIGlzIGxvb3NlIG9yIG5vdC5cbiAgICAgICAgLy8gVXNlOiAvKF58XFxuKSg/ISApW15cXG5dK1xcblxcbig/IVxccyokKS9cbiAgICAgICAgLy8gZm9yIGRpc2NvdW50IGJlaGF2aW9yLlxuICAgICAgICBsb29zZSA9IG5leHQgfHwgL1xcblxcbig/IVxccyokKS8udGVzdChpdGVtKTtcbiAgICAgICAgaWYgKGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGl0ZW0uY2hhckF0KGl0ZW0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nO1xuICAgICAgICAgIGlmICghbG9vc2UpIGxvb3NlID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGxvb3NlXG4gICAgICAgICAgICA/ICdsb29zZV9pdGVtX3N0YXJ0J1xuICAgICAgICAgICAgOiAnbGlzdF9pdGVtX3N0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWN1cnNlLlxuICAgICAgICB0aGlzLnRva2VuKGl0ZW0sIGZhbHNlLCBicSk7XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2xpc3RfaXRlbV9lbmQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3RfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGh0bWxcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5odG1sLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgICA/ICdwYXJhZ3JhcGgnXG4gICAgICAgICAgOiAnaHRtbCcsXG4gICAgICAgIHByZTogIXRoaXMub3B0aW9ucy5zYW5pdGl6ZXJcbiAgICAgICAgICAmJiAoY2FwWzFdID09PSAncHJlJyB8fCBjYXBbMV0gPT09ICdzY3JpcHQnIHx8IGNhcFsxXSA9PT0gJ3N0eWxlJyksXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBkZWZcbiAgICBpZiAoKCFicSAmJiB0b3ApICYmIChjYXAgPSB0aGlzLnJ1bGVzLmRlZi5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMubGlua3NbY2FwWzFdLnRvTG93ZXJDYXNlKCldID0ge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWJsZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMudGFibGUuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBjYXBbMV0ucmVwbGFjZSgvXiAqfCAqXFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvKD86ICpcXHwgKik/XFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKyAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV1cbiAgICAgICAgICAucmVwbGFjZSgvXiAqXFx8ICp8ICpcXHwgKiQvZywgJycpXG4gICAgICAgICAgLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goaXRlbSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnBhcmFncmFwaC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICB0ZXh0OiBjYXBbMV0uY2hhckF0KGNhcFsxXS5sZW5ndGggLSAxKSA9PT0gJ1xcbidcbiAgICAgICAgICA/IGNhcFsxXS5zbGljZSgwLCAtMSlcbiAgICAgICAgICA6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIC8vIFRvcC1sZXZlbCBzaG91bGQgbmV2ZXIgcmVhY2ggaGVyZS5cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMudG9rZW5zO1xufTtcblxuLyoqXG4gKiBJbmxpbmUtTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBpbmxpbmUgPSB7XG4gIGVzY2FwZTogL15cXFxcKFtcXFxcYCp7fVxcW1xcXSgpIytcXC0uIV8+XSkvLFxuICBhdXRvbGluazogL148KFteID5dKyhAfDpcXC8pW14gPl0rKT4vLFxuICB1cmw6IG5vb3AsXG4gIHRhZzogL148IS0tW1xcc1xcU10qPy0tPnxePFxcLz9cXHcrKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LyxcbiAgbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFwoaHJlZlxcKS8sXG4gIHJlZmxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxccypcXFsoW15cXF1dKilcXF0vLFxuICBub2xpbms6IC9eIT9cXFsoKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV0pKilcXF0vLFxuICBzdHJvbmc6IC9eX18oW1xcc1xcU10rPylfXyg/IV8pfF5cXCpcXCooW1xcc1xcU10rPylcXCpcXCooPyFcXCopLyxcbiAgZW06IC9eXFxiXygoPzpbXl9dfF9fKSs/KV9cXGJ8XlxcKigoPzpcXCpcXCp8W1xcc1xcU10pKz8pXFwqKD8hXFwqKS8sXG4gIGNvZGU6IC9eKGArKVxccyooW1xcc1xcU10qP1teYF0pXFxzKlxcMSg/IWApLyxcbiAgYnI6IC9eIHsyLH1cXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3AsXG4gIHRleHQ6IC9eW1xcc1xcU10rPyg/PVtcXFxcPCFcXFtfKmBdfCB7Mix9XFxufCQpL1xufTtcblxuaW5saW5lLl9pbnNpZGUgPSAvKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV18XFxdKD89W15cXFtdKlxcXSkpKi87XG5pbmxpbmUuX2hyZWYgPSAvXFxzKjw/KFtcXHNcXFNdKj8pPj8oPzpcXHMrWydcIl0oW1xcc1xcU10qPylbJ1wiXSk/XFxzKi87XG5cbmlubGluZS5saW5rID0gcmVwbGFjZShpbmxpbmUubGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCdocmVmJywgaW5saW5lLl9ocmVmKVxuICAoKTtcblxuaW5saW5lLnJlZmxpbmsgPSByZXBsYWNlKGlubGluZS5yZWZsaW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gbWVyZ2Uoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IC9eX18oPz1cXFMpKFtcXHNcXFNdKj9cXFMpX18oPyFfKXxeXFwqXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKlxcKig/IVxcKikvLFxuICBlbTogL15fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKXxeXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKig/IVxcKikvXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiByZXBsYWNlKGlubGluZS5lc2NhcGUpKCddKScsICd+fF0pJykoKSxcbiAgdXJsOiAvXihodHRwcz86XFwvXFwvW15cXHM8XStbXjwuLDo7XCInKVxcXVxcc10pLyxcbiAgZGVsOiAvXn5+KD89XFxTKShbXFxzXFxTXSo/XFxTKX5+LyxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUudGV4dClcbiAgICAoJ118JywgJ35dfCcpXG4gICAgKCd8JywgJ3xodHRwcz86Ly98JylcbiAgICAoKVxufSk7XG5cbi8qKlxuICogR0ZNICsgTGluZSBCcmVha3MgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuYnJlYWtzID0gbWVyZ2Uoe30sIGlubGluZS5nZm0sIHtcbiAgYnI6IHJlcGxhY2UoaW5saW5lLmJyKSgnezIsfScsICcqJykoKSxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUuZ2ZtLnRleHQpKCd7Mix9JywgJyonKSgpXG59KTtcblxuLyoqXG4gKiBJbmxpbmUgTGV4ZXIgJiBDb21waWxlclxuICovXG5cbmZ1bmN0aW9uIElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLmxpbmtzID0gbGlua3M7XG4gIHRoaXMucnVsZXMgPSBpbmxpbmUubm9ybWFsO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmICghdGhpcy5saW5rcykge1xuICAgIHRocm93IG5ld1xuICAgICAgRXJyb3IoJ1Rva2VucyBhcnJheSByZXF1aXJlcyBhIGBsaW5rc2AgcHJvcGVydHkuJyk7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmJyZWFrcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5nZm07XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgIHRoaXMucnVsZXMgPSBpbmxpbmUucGVkYW50aWM7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgSW5saW5lIFJ1bGVzXG4gKi9cblxuSW5saW5lTGV4ZXIucnVsZXMgPSBpbmxpbmU7XG5cbi8qKlxuICogU3RhdGljIExleGluZy9Db21waWxpbmcgTWV0aG9kXG4gKi9cblxuSW5saW5lTGV4ZXIub3V0cHV0ID0gZnVuY3Rpb24oc3JjLCBsaW5rcywgb3B0aW9ucykge1xuICB2YXIgaW5saW5lID0gbmV3IElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGlubGluZS5vdXRwdXQoc3JjKTtcbn07XG5cbi8qKlxuICogTGV4aW5nL0NvbXBpbGluZ1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXQgPSBmdW5jdGlvbihzcmMpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsaW5rXG4gICAgLCB0ZXh0XG4gICAgLCBocmVmXG4gICAgLCBjYXA7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIGVzY2FwZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVzY2FwZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gY2FwWzFdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYXV0b2xpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5hdXRvbGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGNhcFsxXS5jaGFyQXQoNikgPT09ICc6J1xuICAgICAgICAgID8gdGhpcy5tYW5nbGUoY2FwWzFdLnN1YnN0cmluZyg3KSlcbiAgICAgICAgICA6IHRoaXMubWFuZ2xlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0aGlzLm1hbmdsZSgnbWFpbHRvOicpICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdXJsIChnZm0pXG4gICAgaWYgKCF0aGlzLmluTGluayAmJiAoY2FwID0gdGhpcy5ydWxlcy51cmwuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRhZy5leGVjKHNyYykpIHtcbiAgICAgIGlmICghdGhpcy5pbkxpbmsgJiYgL148YSAvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmluTGluayAmJiAvXjxcXC9hPi9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgPyB0aGlzLm9wdGlvbnMuc2FuaXRpemVyXG4gICAgICAgICAgPyB0aGlzLm9wdGlvbnMuc2FuaXRpemVyKGNhcFswXSlcbiAgICAgICAgICA6IGVzY2FwZShjYXBbMF0pXG4gICAgICAgIDogY2FwWzBdXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaW5rXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHJlZmxpbmssIG5vbGlua1xuICAgIGlmICgoY2FwID0gdGhpcy5ydWxlcy5yZWZsaW5rLmV4ZWMoc3JjKSlcbiAgICAgICAgfHwgKGNhcCA9IHRoaXMucnVsZXMubm9saW5rLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBsaW5rID0gKGNhcFsyXSB8fCBjYXBbMV0pLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbiAgICAgIGxpbmsgPSB0aGlzLmxpbmtzW2xpbmsudG9Mb3dlckNhc2UoKV07XG4gICAgICBpZiAoIWxpbmsgfHwgIWxpbmsuaHJlZikge1xuICAgICAgICBvdXQgKz0gY2FwWzBdLmNoYXJBdCgwKTtcbiAgICAgICAgc3JjID0gY2FwWzBdLnN1YnN0cmluZygxKSArIHNyYztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwgbGluayk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gc3Ryb25nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuc3Ryb25nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLnN0cm9uZyh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBlbVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVtLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmVtKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGNvZGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmNvZGVzcGFuKGVzY2FwZShjYXBbMl0sIHRydWUpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJyXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYnIuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuYnIoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlbCAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmRlbC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5kZWwodGhpcy5vdXRwdXQoY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci50ZXh0KGVzY2FwZSh0aGlzLnNtYXJ0eXBhbnRzKGNhcFswXSkpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIHRocm93IG5ld1xuICAgICAgICBFcnJvcignSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvbXBpbGUgTGlua1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXRMaW5rID0gZnVuY3Rpb24oY2FwLCBsaW5rKSB7XG4gIHZhciBocmVmID0gZXNjYXBlKGxpbmsuaHJlZilcbiAgICAsIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG5cbiAgcmV0dXJuIGNhcFswXS5jaGFyQXQoMCkgIT09ICchJ1xuICAgID8gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIHRpdGxlLCB0aGlzLm91dHB1dChjYXBbMV0pKVxuICAgIDogdGhpcy5yZW5kZXJlci5pbWFnZShocmVmLCB0aXRsZSwgZXNjYXBlKGNhcFsxXSkpO1xufTtcblxuLyoqXG4gKiBTbWFydHlwYW50cyBUcmFuc2Zvcm1hdGlvbnNcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUuc21hcnR5cGFudHMgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICghdGhpcy5vcHRpb25zLnNtYXJ0eXBhbnRzKSByZXR1cm4gdGV4dDtcbiAgcmV0dXJuIHRleHRcbiAgICAvLyBlbS1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0tL2csICdcXHUyMDE0JylcbiAgICAvLyBlbi1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0vZywgJ1xcdTIwMTMnKVxuICAgIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcIlxcc10pJy9nLCAnJDFcXHUyMDE4JylcbiAgICAvLyBjbG9zaW5nIHNpbmdsZXMgJiBhcG9zdHJvcGhlc1xuICAgIC5yZXBsYWNlKC8nL2csICdcXHUyMDE5JylcbiAgICAvLyBvcGVuaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgJyQxXFx1MjAxYycpXG4gICAgLy8gY2xvc2luZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoL1wiL2csICdcXHUyMDFkJylcbiAgICAvLyBlbGxpcHNlc1xuICAgIC5yZXBsYWNlKC9cXC57M30vZywgJ1xcdTIwMjYnKTtcbn07XG5cbi8qKlxuICogTWFuZ2xlIExpbmtzXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm1hbmdsZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKCF0aGlzLm9wdGlvbnMubWFuZ2xlKSByZXR1cm4gdGV4dDtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsID0gdGV4dC5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBjaDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIGNoID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaCA9ICd4JyArIGNoLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgb3V0ICs9ICcmIycgKyBjaCArICc7JztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJlbmRlcmVyXG4gKi9cblxuZnVuY3Rpb24gUmVuZGVyZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcsIGVzY2FwZWQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodChjb2RlLCBsYW5nKTtcbiAgICBpZiAob3V0ICE9IG51bGwgJiYgb3V0ICE9PSBjb2RlKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBvdXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFsYW5nKSB7XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbiAgICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICAgKyAnXFxuPC9jb2RlPjwvcHJlPic7XG4gIH1cblxuICByZXR1cm4gJzxwcmU+PGNvZGUgY2xhc3M9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuICAgICsgZXNjYXBlKGxhbmcsIHRydWUpXG4gICAgKyAnXCI+J1xuICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICsgJ1xcbjwvY29kZT48L3ByZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrcXVvdGUgPSBmdW5jdGlvbihxdW90ZSkge1xuICByZXR1cm4gJzxibG9ja3F1b3RlPlxcbicgKyBxdW90ZSArICc8L2Jsb2NrcXVvdGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICByZXR1cm4gaHRtbDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gZnVuY3Rpb24odGV4dCwgbGV2ZWwsIHJhdykge1xuICByZXR1cm4gJzxoJ1xuICAgICsgbGV2ZWxcbiAgICArICcgaWQ9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4XG4gICAgKyByYXcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXlxcd10rL2csICctJylcbiAgICArICdcIj4nXG4gICAgKyB0ZXh0XG4gICAgKyAnPC9oJ1xuICAgICsgbGV2ZWxcbiAgICArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ociA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxoci8+XFxuJyA6ICc8aHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oYm9keSwgb3JkZXJlZCkge1xuICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJztcbiAgcmV0dXJuICc8JyArIHR5cGUgKyAnPlxcbicgKyBib2R5ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdGl0ZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGxpPicgKyB0ZXh0ICsgJzwvbGk+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGggPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHA+JyArIHRleHQgKyAnPC9wPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbihoZWFkZXIsIGJvZHkpIHtcbiAgcmV0dXJuICc8dGFibGU+XFxuJ1xuICAgICsgJzx0aGVhZD5cXG4nXG4gICAgKyBoZWFkZXJcbiAgICArICc8L3RoZWFkPlxcbidcbiAgICArICc8dGJvZHk+XFxuJ1xuICAgICsgYm9keVxuICAgICsgJzwvdGJvZHk+XFxuJ1xuICAgICsgJzwvdGFibGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZXJvdyA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgcmV0dXJuICc8dHI+XFxuJyArIGNvbnRlbnQgKyAnPC90cj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlY2VsbCA9IGZ1bmN0aW9uKGNvbnRlbnQsIGZsYWdzKSB7XG4gIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gIHZhciB0YWcgPSBmbGFncy5hbGlnblxuICAgID8gJzwnICsgdHlwZSArICcgc3R5bGU9XCJ0ZXh0LWFsaWduOicgKyBmbGFncy5hbGlnbiArICdcIj4nXG4gICAgOiAnPCcgKyB0eXBlICsgJz4nO1xuICByZXR1cm4gdGFnICsgY29udGVudCArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuLy8gc3BhbiBsZXZlbCByZW5kZXJlclxuUmVuZGVyZXIucHJvdG90eXBlLnN0cm9uZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8c3Ryb25nPicgKyB0ZXh0ICsgJzwvc3Ryb25nPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGVtPicgKyB0ZXh0ICsgJzwvZW0+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2Rlc3BhbiA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8Y29kZT4nICsgdGV4dCArICc8L2NvZGU+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5iciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxici8+JyA6ICc8YnI+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGRlbD4nICsgdGV4dCArICc8L2RlbD4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKVxuICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9ICc+JyArIHRleHQgKyAnPC9hPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaW1hZ2UgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICB2YXIgb3V0ID0gJzxpbWcgc3JjPVwiJyArIGhyZWYgKyAnXCIgYWx0PVwiJyArIHRleHQgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9IHRoaXMub3B0aW9ucy54aHRtbCA/ICcvPicgOiAnPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuIHRleHQ7XG59O1xuXG4vKipcbiAqIFBhcnNpbmcgJiBDb21waWxpbmdcbiAqL1xuXG5mdW5jdGlvbiBQYXJzZXIob3B0aW9ucykge1xuICB0aGlzLnRva2VucyA9IFtdO1xuICB0aGlzLnRva2VuID0gbnVsbDtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMub3B0aW9ucy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbn1cblxuLyoqXG4gKiBTdGF0aWMgUGFyc2UgTWV0aG9kXG4gKi9cblxuUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zLCByZW5kZXJlcikge1xuICB2YXIgcGFyc2VyID0gbmV3IFBhcnNlcihvcHRpb25zLCByZW5kZXJlcik7XG4gIHJldHVybiBwYXJzZXIucGFyc2Uoc3JjKTtcbn07XG5cbi8qKlxuICogUGFyc2UgTG9vcFxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihzcmMpIHtcbiAgdGhpcy5pbmxpbmUgPSBuZXcgSW5saW5lTGV4ZXIoc3JjLmxpbmtzLCB0aGlzLm9wdGlvbnMsIHRoaXMucmVuZGVyZXIpO1xuICB0aGlzLnRva2VucyA9IHNyYy5yZXZlcnNlKCk7XG5cbiAgdmFyIG91dCA9ICcnO1xuICB3aGlsZSAodGhpcy5uZXh0KCkpIHtcbiAgICBvdXQgKz0gdGhpcy50b2soKTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW4gPSB0aGlzLnRva2Vucy5wb3AoKTtcbn07XG5cbi8qKlxuICogUHJldmlldyBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLnRva2Vucy5sZW5ndGggLSAxXSB8fCAwO1xufTtcblxuLyoqXG4gKiBQYXJzZSBUZXh0IFRva2Vuc1xuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2VUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib2R5ID0gdGhpcy50b2tlbi50ZXh0O1xuXG4gIHdoaWxlICh0aGlzLnBlZWsoKS50eXBlID09PSAndGV4dCcpIHtcbiAgICBib2R5ICs9ICdcXG4nICsgdGhpcy5uZXh0KCkudGV4dDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmlubGluZS5vdXRwdXQoYm9keSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIEN1cnJlbnQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnRvayA9IGZ1bmN0aW9uKCkge1xuICBzd2l0Y2ggKHRoaXMudG9rZW4udHlwZSkge1xuICAgIGNhc2UgJ3NwYWNlJzoge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjYXNlICdocic6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgfVxuICAgIGNhc2UgJ2hlYWRpbmcnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5oZWFkaW5nKFxuICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KSxcbiAgICAgICAgdGhpcy50b2tlbi5kZXB0aCxcbiAgICAgICAgdGhpcy50b2tlbi50ZXh0KTtcbiAgICB9XG4gICAgY2FzZSAnY29kZSc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmNvZGUodGhpcy50b2tlbi50ZXh0LFxuICAgICAgICB0aGlzLnRva2VuLmxhbmcsXG4gICAgICAgIHRoaXMudG9rZW4uZXNjYXBlZCk7XG4gICAgfVxuICAgIGNhc2UgJ3RhYmxlJzoge1xuICAgICAgdmFyIGhlYWRlciA9ICcnXG4gICAgICAgICwgYm9keSA9ICcnXG4gICAgICAgICwgaVxuICAgICAgICAsIHJvd1xuICAgICAgICAsIGNlbGxcbiAgICAgICAgLCBmbGFnc1xuICAgICAgICAsIGo7XG5cbiAgICAgIC8vIGhlYWRlclxuICAgICAgY2VsbCA9ICcnO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZsYWdzID0geyBoZWFkZXI6IHRydWUsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2ldIH07XG4gICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4uaGVhZGVyW2ldKSxcbiAgICAgICAgICB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdyA9IHRoaXMudG9rZW4uY2VsbHNbaV07XG5cbiAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dChyb3dbal0pLFxuICAgICAgICAgICAgeyBoZWFkZXI6IGZhbHNlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltqXSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnRhYmxlKGhlYWRlciwgYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2Jsb2NrcXVvdGVfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2Jsb2NrcXVvdGVfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmJsb2NrcXVvdGUoYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3Rfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnXG4gICAgICAgICwgb3JkZXJlZCA9IHRoaXMudG9rZW4ub3JkZXJlZDtcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0KGJvZHksIG9yZGVyZWQpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2tlbi50eXBlID09PSAndGV4dCdcbiAgICAgICAgICA/IHRoaXMucGFyc2VUZXh0KClcbiAgICAgICAgICA6IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsb29zZV9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdodG1sJzoge1xuICAgICAgdmFyIGh0bWwgPSAhdGhpcy50b2tlbi5wcmUgJiYgIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICA/IHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpXG4gICAgICAgIDogdGhpcy50b2tlbi50ZXh0O1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHRtbChodG1sKTtcbiAgICB9XG4gICAgY2FzZSAncGFyYWdyYXBoJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpKTtcbiAgICB9XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLnBhcnNlVGV4dCgpKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShodG1sLCBlbmNvZGUpIHtcbiAgcmV0dXJuIGh0bWxcbiAgICAucmVwbGFjZSghZW5jb2RlID8gLyYoPyEjP1xcdys7KS9nIDogLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGUoaHRtbCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKC8mKFsjXFx3XSspOy9nLCBmdW5jdGlvbihfLCBuKSB7XG4gICAgbiA9IG4udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobiA9PT0gJ2NvbG9uJykgcmV0dXJuICc6JztcbiAgICBpZiAobi5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgcmV0dXJuIG4uY2hhckF0KDEpID09PSAneCdcbiAgICAgICAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG4uc3Vic3RyaW5nKDIpLCAxNikpXG4gICAgICAgIDogU3RyaW5nLmZyb21DaGFyQ29kZSgrbi5zdWJzdHJpbmcoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlKHJlZ2V4LCBvcHQpIHtcbiAgcmVnZXggPSByZWdleC5zb3VyY2U7XG4gIG9wdCA9IG9wdCB8fCAnJztcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGYobmFtZSwgdmFsKSB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCwgb3B0KTtcbiAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvKF58W15cXFtdKVxcXi9nLCAnJDEnKTtcbiAgICByZWdleCA9IHJlZ2V4LnJlcGxhY2UobmFtZSwgdmFsKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5ub29wLmV4ZWMgPSBub29wO1xuXG5mdW5jdGlvbiBtZXJnZShvYmopIHtcbiAgdmFyIGkgPSAxXG4gICAgLCB0YXJnZXRcbiAgICAsIGtleTtcblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gdGFyZ2V0W2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuXG4vKipcbiAqIE1hcmtlZFxuICovXG5cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrIHx8IHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0IHx8IHt9KTtcblxuICAgIHZhciBoaWdobGlnaHQgPSBvcHQuaGlnaGxpZ2h0XG4gICAgICAsIHRva2Vuc1xuICAgICAgLCBwZW5kaW5nXG4gICAgICAsIGkgPSAwO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRva2VucyA9IExleGVyLmxleChzcmMsIG9wdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuXG4gICAgcGVuZGluZyA9IHRva2Vucy5sZW5ndGg7XG5cbiAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG91dDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgb3V0ID0gUGFyc2VyLnBhcnNlKHRva2Vucywgb3B0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyID0gZTtcbiAgICAgIH1cblxuICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxuICAgICAgcmV0dXJuIGVyclxuICAgICAgICA/IGNhbGxiYWNrKGVycilcbiAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvdXQpO1xuICAgIH07XG5cbiAgICBpZiAoIWhpZ2hsaWdodCB8fCBoaWdobGlnaHQubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBkZWxldGUgb3B0LmhpZ2hsaWdodDtcblxuICAgIGlmICghcGVuZGluZykgcmV0dXJuIGRvbmUoKTtcblxuICAgIGZvciAoOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoaWdobGlnaHQodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgZnVuY3Rpb24oZXJyLCBjb2RlKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICBpZiAoY29kZSA9PSBudWxsIHx8IGNvZGUgPT09IHRva2VuLnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b2tlbi50ZXh0ID0gY29kZTtcbiAgICAgICAgICB0b2tlbi5lc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKHRva2Vuc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdCkgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgICByZXR1cm4gUGFyc2VyLnBhcnNlKExleGVyLmxleChzcmMsIG9wdCksIG9wdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWQuJztcbiAgICBpZiAoKG9wdCB8fCBtYXJrZWQuZGVmYXVsdHMpLnNpbGVudCkge1xuICAgICAgcmV0dXJuICc8cD5BbiBlcnJvciBvY2N1cmVkOjwvcD48cHJlPidcbiAgICAgICAgKyBlc2NhcGUoZS5tZXNzYWdlICsgJycsIHRydWUpXG4gICAgICAgICsgJzwvcHJlPic7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLyoqXG4gKiBPcHRpb25zXG4gKi9cblxubWFya2VkLm9wdGlvbnMgPVxubWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHQpIHtcbiAgbWVyZ2UobWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICByZXR1cm4gbWFya2VkO1xufTtcblxubWFya2VkLmRlZmF1bHRzID0ge1xuICBnZm06IHRydWUsXG4gIHRhYmxlczogdHJ1ZSxcbiAgYnJlYWtzOiBmYWxzZSxcbiAgcGVkYW50aWM6IGZhbHNlLFxuICBzYW5pdGl6ZTogZmFsc2UsXG4gIHNhbml0aXplcjogbnVsbCxcbiAgbWFuZ2xlOiB0cnVlLFxuICBzbWFydExpc3RzOiBmYWxzZSxcbiAgc2lsZW50OiBmYWxzZSxcbiAgaGlnaGxpZ2h0OiBudWxsLFxuICBsYW5nUHJlZml4OiAnbGFuZy0nLFxuICBzbWFydHlwYW50czogZmFsc2UsXG4gIGhlYWRlclByZWZpeDogJycsXG4gIHJlbmRlcmVyOiBuZXcgUmVuZGVyZXIsXG4gIHhodG1sOiBmYWxzZVxufTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xuXG5tYXJrZWQuUGFyc2VyID0gUGFyc2VyO1xubWFya2VkLnBhcnNlciA9IFBhcnNlci5wYXJzZTtcblxubWFya2VkLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5cbm1hcmtlZC5MZXhlciA9IExleGVyO1xubWFya2VkLmxleGVyID0gTGV4ZXIubGV4O1xuXG5tYXJrZWQuSW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlcjtcbm1hcmtlZC5pbmxpbmVMZXhlciA9IElubGluZUxleGVyLm91dHB1dDtcblxubWFya2VkLnBhcnNlID0gbWFya2VkO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbWFya2VkO1xufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbWFya2VkOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMubWFya2VkID0gbWFya2VkO1xufVxuXG59KS5jYWxsKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpO1xufSgpKTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5dFlYSnJaV1F2YkdsaUwyMWhjbXRsWkM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5b3FYRzRnS2lCdFlYSnJaV1FnTFNCaElHMWhjbXRrYjNkdUlIQmhjbk5sY2x4dUlDb2dRMjl3ZVhKcFoyaDBJQ2hqS1NBeU1ERXhMVEl3TVRRc0lFTm9jbWx6ZEc5d2FHVnlJRXBsWm1aeVpYa3VJQ2hOU1ZRZ1RHbGpaVzV6WldRcFhHNGdLaUJvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2WTJocWFpOXRZWEpyWldSY2JpQXFMMXh1WEc0N0tHWjFibU4wYVc5dUtDa2dlMXh1WEc0dktpcGNiaUFxSUVKc2IyTnJMVXhsZG1Wc0lFZHlZVzF0WVhKY2JpQXFMMXh1WEc1MllYSWdZbXh2WTJzZ1BTQjdYRzRnSUc1bGQyeHBibVU2SUM5ZVhGeHVLeThzWEc0Z0lHTnZaR1U2SUM5ZUtDQjdOSDFiWGx4Y2JsMHJYRnh1S2lrckx5eGNiaUFnWm1WdVkyVnpPaUJ1YjI5d0xGeHVJQ0JvY2pvZ0wxNG9JQ3BiTFNwZlhTbDdNeXg5SUNvb1B6cGNYRzRyZkNRcEx5eGNiaUFnYUdWaFpHbHVaem9nTDE0Z0tpZ2plekVzTm4wcElDb29XMTVjWEc1ZEt6OHBJQ29qS2lBcUtEODZYRnh1SzN3a0tTOHNYRzRnSUc1d2RHRmliR1U2SUc1dmIzQXNYRzRnSUd4b1pXRmthVzVuT2lBdlhpaGJYbHhjYmwwcktWeGNiaUFxS0QxOExTbDdNaXg5SUNvb1B6cGNYRzRyZkNRcEx5eGNiaUFnWW14dlkydHhkVzkwWlRvZ0wxNG9JQ28rVzE1Y1hHNWRLeWhjWEc0b1B5RmtaV1lwVzE1Y1hHNWRLeWtxWEZ4dUtpa3JMeXhjYmlBZ2JHbHpkRG9nTDE0b0lDb3BLR0oxYkd3cElGdGNYSE5jWEZOZEt6OG9QenBvY254a1pXWjhYRnh1ZXpJc2ZTZy9JU0FwS0Q4aFhGd3hZblZzYkNBcFhGeHVLbnhjWEhNcUpDa3ZMRnh1SUNCb2RHMXNPaUF2WGlBcUtEODZZMjl0YldWdWRDQXFLRDg2WEZ4dWZGeGNjeW9rS1h4amJHOXpaV1FnS2lnL09seGNibnN5TEgxOFhGeHpLaVFwZkdOc2IzTnBibWNnS2lnL09seGNibnN5TEgxOFhGeHpLaVFwS1M4c1hHNGdJR1JsWmpvZ0wxNGdLbHhjV3loYlhseGNYVjByS1Z4Y1hUb2dLancvS0Z0ZVhGeHpQbDByS1Q0L0tEODZJQ3RiWENJb1hTaGJYbHhjYmwwcktWdGNJaWxkS1Q4Z0tpZy9PbHhjYml0OEpDa3ZMRnh1SUNCMFlXSnNaVG9nYm05dmNDeGNiaUFnY0dGeVlXZHlZWEJvT2lBdlhpZ29QenBiWGx4Y2JsMHJYRnh1UHlnL0lXaHlmR2hsWVdScGJtZDhiR2hsWVdScGJtZDhZbXh2WTJ0eGRXOTBaWHgwWVdkOFpHVm1LU2tyS1Z4Y2Jpb3ZMRnh1SUNCMFpYaDBPaUF2WGx0ZVhGeHVYU3N2WEc1OU8xeHVYRzVpYkc5amF5NWlkV3hzWlhRZ1BTQXZLRDg2V3lvckxWMThYRnhrSzF4Y0xpa3ZPMXh1WW14dlkyc3VhWFJsYlNBOUlDOWVLQ0FxS1NoaWRXeHNLU0JiWGx4Y2JsMHFLRDg2WEZ4dUtEOGhYRnd4WW5Wc2JDQXBXMTVjWEc1ZEtpa3FMenRjYm1Kc2IyTnJMbWwwWlcwZ1BTQnlaWEJzWVdObEtHSnNiMk5yTG1sMFpXMHNJQ2RuYlNjcFhHNGdJQ2d2WW5Wc2JDOW5MQ0JpYkc5amF5NWlkV3hzWlhRcFhHNGdJQ2dwTzF4dVhHNWliRzlqYXk1c2FYTjBJRDBnY21Wd2JHRmpaU2hpYkc5amF5NXNhWE4wS1Z4dUlDQW9MMkoxYkd3dlp5d2dZbXh2WTJzdVluVnNiR1YwS1Z4dUlDQW9KMmh5Snl3Z0oxeGNYRnh1S3lnL1BWeGNYRnd4UHlnL09sc3RLbDlkSUNvcGV6TXNmU2cvT2x4Y1hGeHVLM3drS1NrbktWeHVJQ0FvSjJSbFppY3NJQ2RjWEZ4Y2Jpc29QejBuSUNzZ1lteHZZMnN1WkdWbUxuTnZkWEpqWlNBcklDY3BKeWxjYmlBZ0tDazdYRzVjYm1Kc2IyTnJMbUpzYjJOcmNYVnZkR1VnUFNCeVpYQnNZV05sS0dKc2IyTnJMbUpzYjJOcmNYVnZkR1VwWEc0Z0lDZ25aR1ZtSnl3Z1lteHZZMnN1WkdWbUtWeHVJQ0FvS1R0Y2JseHVZbXh2WTJzdVgzUmhaeUE5SUNjb1B5RW9Qem9uWEc0Z0lDc2dKMkY4WlcxOGMzUnliMjVuZkhOdFlXeHNmSE44WTJsMFpYeHhmR1JtYm54aFltSnlmR1JoZEdGOGRHbHRaWHhqYjJSbEoxeHVJQ0FySUNkOGRtRnlmSE5oYlhCOGEySmtmSE4xWW54emRYQjhhWHhpZkhWOGJXRnlhM3h5ZFdKNWZISjBmSEp3ZkdKa2FYeGlaRzhuWEc0Z0lDc2dKM3h6Y0dGdWZHSnlmSGRpY254cGJuTjhaR1ZzZkdsdFp5bGNYRnhjWWlsY1hGeGNkeXNvUHlFNkwzeGJYbHhjWEZ4M1hGeGNYSE5BWFNwQUtWeGNYRnhpSnp0Y2JseHVZbXh2WTJzdWFIUnRiQ0E5SUhKbGNHeGhZMlVvWW14dlkyc3VhSFJ0YkNsY2JpQWdLQ2RqYjIxdFpXNTBKeXdnTHp3aExTMWJYRnh6WEZ4VFhTby9MUzArTHlsY2JpQWdLQ2RqYkc5elpXUW5MQ0F2UENoMFlXY3BXMXhjYzF4Y1UxMHJQenhjWEM5Y1hERStMeWxjYmlBZ0tDZGpiRzl6YVc1bkp5d2dMengwWVdjb1B6cGNJbHRlWENKZEtsd2lmQ2RiWGlkZEtpZDhXMTRuWENJK1hTa3FQejR2S1Z4dUlDQW9MM1JoWnk5bkxDQmliRzlqYXk1ZmRHRm5LVnh1SUNBb0tUdGNibHh1WW14dlkyc3VjR0Z5WVdkeVlYQm9JRDBnY21Wd2JHRmpaU2hpYkc5amF5NXdZWEpoWjNKaGNHZ3BYRzRnSUNnbmFISW5MQ0JpYkc5amF5NW9jaWxjYmlBZ0tDZG9aV0ZrYVc1bkp5d2dZbXh2WTJzdWFHVmhaR2x1WnlsY2JpQWdLQ2RzYUdWaFpHbHVaeWNzSUdKc2IyTnJMbXhvWldGa2FXNW5LVnh1SUNBb0oySnNiMk5yY1hWdmRHVW5MQ0JpYkc5amF5NWliRzlqYTNGMWIzUmxLVnh1SUNBb0ozUmhaeWNzSUNjOEp5QXJJR0pzYjJOckxsOTBZV2NwWEc0Z0lDZ25aR1ZtSnl3Z1lteHZZMnN1WkdWbUtWeHVJQ0FvS1R0Y2JseHVMeW9xWEc0Z0tpQk9iM0p0WVd3Z1FteHZZMnNnUjNKaGJXMWhjbHh1SUNvdlhHNWNibUpzYjJOckxtNXZjbTFoYkNBOUlHMWxjbWRsS0h0OUxDQmliRzlqYXlrN1hHNWNiaThxS2x4dUlDb2dSMFpOSUVKc2IyTnJJRWR5WVcxdFlYSmNiaUFxTDF4dVhHNWliRzlqYXk1blptMGdQU0J0WlhKblpTaDdmU3dnWW14dlkyc3VibTl5YldGc0xDQjdYRzRnSUdabGJtTmxjem9nTDE0Z0tpaGdlek1zZlh4K2V6TXNmU2xiSUZ4Y0xsMHFLRnhjVXlzcFB5QXFYRnh1S0Z0Y1hITmNYRk5kS2o4cFhGeHpLbHhjTVNBcUtEODZYRnh1SzN3a0tTOHNYRzRnSUhCaGNtRm5jbUZ3YURvZ0wxNHZMRnh1SUNCb1pXRmthVzVuT2lBdlhpQXFLQ043TVN3MmZTa2dLeWhiWGx4Y2JsMHJQeWtnS2lNcUlDb29QenBjWEc0cmZDUXBMMXh1ZlNrN1hHNWNibUpzYjJOckxtZG1iUzV3WVhKaFozSmhjR2dnUFNCeVpYQnNZV05sS0dKc2IyTnJMbkJoY21GbmNtRndhQ2xjYmlBZ0tDY29QeUVuTENBbktEOGhKMXh1SUNBZ0lDc2dZbXh2WTJzdVoyWnRMbVpsYm1ObGN5NXpiM1Z5WTJVdWNtVndiR0ZqWlNnblhGeGNYREVuTENBblhGeGNYREluS1NBcklDZDhKMXh1SUNBZ0lDc2dZbXh2WTJzdWJHbHpkQzV6YjNWeVkyVXVjbVZ3YkdGalpTZ25YRnhjWERFbkxDQW5YRnhjWERNbktTQXJJQ2Q4SnlsY2JpQWdLQ2s3WEc1Y2JpOHFLbHh1SUNvZ1IwWk5JQ3NnVkdGaWJHVnpJRUpzYjJOcklFZHlZVzF0WVhKY2JpQXFMMXh1WEc1aWJHOWpheTUwWVdKc1pYTWdQU0J0WlhKblpTaDdmU3dnWW14dlkyc3VaMlp0TENCN1hHNGdJRzV3ZEdGaWJHVTZJQzllSUNvb1hGeFRMaXBjWEh3dUtpbGNYRzRnS2loYkxUcGRLeUFxWEZ4OFd5MThJRHBkS2lsY1hHNG9LRDg2TGlwY1hId3VLaWcvT2x4Y2Jud2tLU2txS1Z4Y2Jpb3ZMRnh1SUNCMFlXSnNaVG9nTDE0Z0tseGNmQ2d1S3lsY1hHNGdLbHhjZkNnZ0tsc3RPbDByV3kxOElEcGRLaWxjWEc0b0tEODZJQ3BjWEh3dUtpZy9PbHhjYm53a0tTa3FLVnhjYmlvdlhHNTlLVHRjYmx4dUx5b3FYRzRnS2lCQ2JHOWpheUJNWlhobGNseHVJQ292WEc1Y2JtWjFibU4wYVc5dUlFeGxlR1Z5S0c5d2RHbHZibk1wSUh0Y2JpQWdkR2hwY3k1MGIydGxibk1nUFNCYlhUdGNiaUFnZEdocGN5NTBiMnRsYm5NdWJHbHVhM01nUFNCN2ZUdGNiaUFnZEdocGN5NXZjSFJwYjI1eklEMGdiM0IwYVc5dWN5QjhmQ0J0WVhKclpXUXVaR1ZtWVhWc2RITTdYRzRnSUhSb2FYTXVjblZzWlhNZ1BTQmliRzlqYXk1dWIzSnRZV3c3WEc1Y2JpQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NW5abTBwSUh0Y2JpQWdJQ0JwWmlBb2RHaHBjeTV2Y0hScGIyNXpMblJoWW14bGN5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1eWRXeGxjeUE5SUdKc2IyTnJMblJoWW14bGN6dGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnZEdocGN5NXlkV3hsY3lBOUlHSnNiMk5yTG1kbWJUdGNiaUFnSUNCOVhHNGdJSDFjYm4xY2JseHVMeW9xWEc0Z0tpQkZlSEJ2YzJVZ1FteHZZMnNnVW5Wc1pYTmNiaUFxTDF4dVhHNU1aWGhsY2k1eWRXeGxjeUE5SUdKc2IyTnJPMXh1WEc0dktpcGNiaUFxSUZOMFlYUnBZeUJNWlhnZ1RXVjBhRzlrWEc0Z0tpOWNibHh1VEdWNFpYSXViR1Y0SUQwZ1puVnVZM1JwYjI0b2MzSmpMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lIWmhjaUJzWlhobGNpQTlJRzVsZHlCTVpYaGxjaWh2Y0hScGIyNXpLVHRjYmlBZ2NtVjBkWEp1SUd4bGVHVnlMbXhsZUNoemNtTXBPMXh1ZlR0Y2JseHVMeW9xWEc0Z0tpQlFjbVZ3Y205alpYTnphVzVuWEc0Z0tpOWNibHh1VEdWNFpYSXVjSEp2ZEc5MGVYQmxMbXhsZUNBOUlHWjFibU4wYVc5dUtITnlZeWtnZTF4dUlDQnpjbU1nUFNCemNtTmNiaUFnSUNBdWNtVndiR0ZqWlNndlhGeHlYRnh1ZkZ4Y2NpOW5MQ0FuWEZ4dUp5bGNiaUFnSUNBdWNtVndiR0ZqWlNndlhGeDBMMmNzSUNjZ0lDQWdKeWxjYmlBZ0lDQXVjbVZ3YkdGalpTZ3ZYRngxTURCaE1DOW5MQ0FuSUNjcFhHNGdJQ0FnTG5KbGNHeGhZMlVvTDF4Y2RUSTBNalF2Wnl3Z0oxeGNiaWNwTzF4dVhHNGdJSEpsZEhWeWJpQjBhR2x6TG5SdmEyVnVLSE55WXl3Z2RISjFaU2s3WEc1OU8xeHVYRzR2S2lwY2JpQXFJRXhsZUdsdVoxeHVJQ292WEc1Y2JreGxlR1Z5TG5CeWIzUnZkSGx3WlM1MGIydGxiaUE5SUdaMWJtTjBhVzl1S0hOeVl5d2dkRzl3TENCaWNTa2dlMXh1SUNCMllYSWdjM0pqSUQwZ2MzSmpMbkpsY0d4aFkyVW9MMTRnS3lRdloyMHNJQ2NuS1Z4dUlDQWdJQ3dnYm1WNGRGeHVJQ0FnSUN3Z2JHOXZjMlZjYmlBZ0lDQXNJR05oY0Z4dUlDQWdJQ3dnWW5Wc2JGeHVJQ0FnSUN3Z1lseHVJQ0FnSUN3Z2FYUmxiVnh1SUNBZ0lDd2djM0JoWTJWY2JpQWdJQ0FzSUdsY2JpQWdJQ0FzSUd3N1hHNWNiaUFnZDJocGJHVWdLSE55WXlrZ2UxeHVJQ0FnSUM4dklHNWxkMnhwYm1WY2JpQWdJQ0JwWmlBb1kyRndJRDBnZEdocGN5NXlkV3hsY3k1dVpYZHNhVzVsTG1WNFpXTW9jM0pqS1NrZ2UxeHVJQ0FnSUNBZ2MzSmpJRDBnYzNKakxuTjFZbk4wY21sdVp5aGpZWEJiTUYwdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUdsbUlDaGpZWEJiTUYwdWJHVnVaM1JvSUQ0Z01Ta2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuUnZhMlZ1Y3k1d2RYTm9LSHRjYmlBZ0lDQWdJQ0FnSUNCMGVYQmxPaUFuYzNCaFkyVW5YRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUdOdlpHVmNiaUFnSUNCcFppQW9ZMkZ3SUQwZ2RHaHBjeTV5ZFd4bGN5NWpiMlJsTG1WNFpXTW9jM0pqS1NrZ2UxeHVJQ0FnSUNBZ2MzSmpJRDBnYzNKakxuTjFZbk4wY21sdVp5aGpZWEJiTUYwdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUdOaGNDQTlJR05oY0Zzd1hTNXlaWEJzWVdObEtDOWVJSHMwZlM5bmJTd2dKeWNwTzF4dUlDQWdJQ0FnZEdocGN5NTBiMnRsYm5NdWNIVnphQ2g3WEc0Z0lDQWdJQ0FnSUhSNWNHVTZJQ2RqYjJSbEp5eGNiaUFnSUNBZ0lDQWdkR1Y0ZERvZ0lYUm9hWE11YjNCMGFXOXVjeTV3WldSaGJuUnBZMXh1SUNBZ0lDQWdJQ0FnSUQ4Z1kyRndMbkpsY0d4aFkyVW9MMXhjYmlza0x5d2dKeWNwWEc0Z0lDQWdJQ0FnSUNBZ09pQmpZWEJjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnWTI5dWRHbHVkV1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnWm1WdVkyVnpJQ2huWm0wcFhHNGdJQ0FnYVdZZ0tHTmhjQ0E5SUhSb2FYTXVjblZzWlhNdVptVnVZMlZ6TG1WNFpXTW9jM0pqS1NrZ2UxeHVJQ0FnSUNBZ2MzSmpJRDBnYzNKakxuTjFZbk4wY21sdVp5aGpZWEJiTUYwdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUhSb2FYTXVkRzlyWlc1ekxuQjFjMmdvZTF4dUlDQWdJQ0FnSUNCMGVYQmxPaUFuWTI5a1pTY3NYRzRnSUNBZ0lDQWdJR3hoYm1jNklHTmhjRnN5WFN4Y2JpQWdJQ0FnSUNBZ2RHVjRkRG9nWTJGd1d6TmRJSHg4SUNjblhHNGdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lHTnZiblJwYm5WbE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklHaGxZV1JwYm1kY2JpQWdJQ0JwWmlBb1kyRndJRDBnZEdocGN5NXlkV3hsY3k1b1pXRmthVzVuTG1WNFpXTW9jM0pqS1NrZ2UxeHVJQ0FnSUNBZ2MzSmpJRDBnYzNKakxuTjFZbk4wY21sdVp5aGpZWEJiTUYwdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUhSb2FYTXVkRzlyWlc1ekxuQjFjMmdvZTF4dUlDQWdJQ0FnSUNCMGVYQmxPaUFuYUdWaFpHbHVaeWNzWEc0Z0lDQWdJQ0FnSUdSbGNIUm9PaUJqWVhCYk1WMHViR1Z1WjNSb0xGeHVJQ0FnSUNBZ0lDQjBaWGgwT2lCallYQmJNbDFjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnWTI5dWRHbHVkV1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnZEdGaWJHVWdibThnYkdWaFpHbHVaeUJ3YVhCbElDaG5abTBwWEc0Z0lDQWdhV1lnS0hSdmNDQW1KaUFvWTJGd0lEMGdkR2hwY3k1eWRXeGxjeTV1Y0hSaFlteGxMbVY0WldNb2MzSmpLU2twSUh0Y2JpQWdJQ0FnSUhOeVl5QTlJSE55WXk1emRXSnpkSEpwYm1jb1kyRndXekJkTG14bGJtZDBhQ2s3WEc1Y2JpQWdJQ0FnSUdsMFpXMGdQU0I3WEc0Z0lDQWdJQ0FnSUhSNWNHVTZJQ2QwWVdKc1pTY3NYRzRnSUNBZ0lDQWdJR2hsWVdSbGNqb2dZMkZ3V3pGZExuSmxjR3hoWTJVb0wxNGdLbndnS2x4Y2ZDQXFKQzluTENBbkp5a3VjM0JzYVhRb0x5QXFYRng4SUNvdktTeGNiaUFnSUNBZ0lDQWdZV3hwWjI0NklHTmhjRnN5WFM1eVpYQnNZV05sS0M5ZUlDcDhYRng4SUNva0wyY3NJQ2NuS1M1emNHeHBkQ2d2SUNwY1hId2dLaThwTEZ4dUlDQWdJQ0FnSUNCalpXeHNjem9nWTJGd1d6TmRMbkpsY0d4aFkyVW9MMXhjYmlRdkxDQW5KeWt1YzNCc2FYUW9KMXhjYmljcFhHNGdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2FYUmxiUzVoYkdsbmJpNXNaVzVuZEdnN0lHa3JLeWtnZTF4dUlDQWdJQ0FnSUNCcFppQW9MMTRnS2kwck9pQXFKQzh1ZEdWemRDaHBkR1Z0TG1Gc2FXZHVXMmxkS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJR2wwWlcwdVlXeHBaMjViYVYwZ1BTQW5jbWxuYUhRbk8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLQzllSUNvNkxTczZJQ29rTHk1MFpYTjBLR2wwWlcwdVlXeHBaMjViYVYwcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnYVhSbGJTNWhiR2xuYmx0cFhTQTlJQ2RqWlc1MFpYSW5PMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0M5ZUlDbzZMU3NnS2lRdkxuUmxjM1FvYVhSbGJTNWhiR2xuYmx0cFhTa3BJSHRjYmlBZ0lDQWdJQ0FnSUNCcGRHVnRMbUZzYVdkdVcybGRJRDBnSjJ4bFpuUW5PMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUdsMFpXMHVZV3hwWjI1YmFWMGdQU0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR1p2Y2lBb2FTQTlJREE3SUdrZ1BDQnBkR1Z0TG1ObGJHeHpMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lHbDBaVzB1WTJWc2JITmJhVjBnUFNCcGRHVnRMbU5sYkd4elcybGRMbk53YkdsMEtDOGdLbHhjZkNBcUx5azdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSFJvYVhNdWRHOXJaVzV6TG5CMWMyZ29hWFJsYlNrN1hHNWNiaUFnSUNBZ0lHTnZiblJwYm5WbE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklHeG9aV0ZrYVc1blhHNGdJQ0FnYVdZZ0tHTmhjQ0E5SUhSb2FYTXVjblZzWlhNdWJHaGxZV1JwYm1jdVpYaGxZeWh6Y21NcEtTQjdYRzRnSUNBZ0lDQnpjbU1nUFNCemNtTXVjM1ZpYzNSeWFXNW5LR05oY0Zzd1hTNXNaVzVuZEdncE8xeHVJQ0FnSUNBZ2RHaHBjeTUwYjJ0bGJuTXVjSFZ6YUNoN1hHNGdJQ0FnSUNBZ0lIUjVjR1U2SUNkb1pXRmthVzVuSnl4Y2JpQWdJQ0FnSUNBZ1pHVndkR2c2SUdOaGNGc3lYU0E5UFQwZ0p6MG5JRDhnTVNBNklESXNYRzRnSUNBZ0lDQWdJSFJsZUhRNklHTmhjRnN4WFZ4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCamIyNTBhVzUxWlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCb2NseHVJQ0FnSUdsbUlDaGpZWEFnUFNCMGFHbHpMbkoxYkdWekxtaHlMbVY0WldNb2MzSmpLU2tnZTF4dUlDQWdJQ0FnYzNKaklEMGdjM0pqTG5OMVluTjBjbWx1WnloallYQmJNRjB1YkdWdVozUm9LVHRjYmlBZ0lDQWdJSFJvYVhNdWRHOXJaVzV6TG5CMWMyZ29lMXh1SUNBZ0lDQWdJQ0IwZVhCbE9pQW5hSEluWEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUdOdmJuUnBiblZsTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUdKc2IyTnJjWFZ2ZEdWY2JpQWdJQ0JwWmlBb1kyRndJRDBnZEdocGN5NXlkV3hsY3k1aWJHOWphM0YxYjNSbExtVjRaV01vYzNKaktTa2dlMXh1SUNBZ0lDQWdjM0pqSUQwZ2MzSmpMbk4xWW5OMGNtbHVaeWhqWVhCYk1GMHViR1Z1WjNSb0tUdGNibHh1SUNBZ0lDQWdkR2hwY3k1MGIydGxibk11Y0hWemFDaDdYRzRnSUNBZ0lDQWdJSFI1Y0dVNklDZGliRzlqYTNGMWIzUmxYM04wWVhKMEoxeHVJQ0FnSUNBZ2ZTazdYRzVjYmlBZ0lDQWdJR05oY0NBOUlHTmhjRnN3WFM1eVpYQnNZV05sS0M5ZUlDbytJRDh2WjIwc0lDY25LVHRjYmx4dUlDQWdJQ0FnTHk4Z1VHRnpjeUJnZEc5d1lDQjBieUJyWldWd0lIUm9aU0JqZFhKeVpXNTBYRzRnSUNBZ0lDQXZMeUJjSW5SdmNHeGxkbVZzWENJZ2MzUmhkR1V1SUZSb2FYTWdhWE1nWlhoaFkzUnNlVnh1SUNBZ0lDQWdMeThnYUc5M0lHMWhjbXRrYjNkdUxuQnNJSGR2Y210ekxseHVJQ0FnSUNBZ2RHaHBjeTUwYjJ0bGJpaGpZWEFzSUhSdmNDd2dkSEoxWlNrN1hHNWNiaUFnSUNBZ0lIUm9hWE11ZEc5clpXNXpMbkIxYzJnb2UxeHVJQ0FnSUNBZ0lDQjBlWEJsT2lBbllteHZZMnR4ZFc5MFpWOWxibVFuWEc0Z0lDQWdJQ0I5S1R0Y2JseHVJQ0FnSUNBZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z2JHbHpkRnh1SUNBZ0lHbG1JQ2hqWVhBZ1BTQjBhR2x6TG5KMWJHVnpMbXhwYzNRdVpYaGxZeWh6Y21NcEtTQjdYRzRnSUNBZ0lDQnpjbU1nUFNCemNtTXVjM1ZpYzNSeWFXNW5LR05oY0Zzd1hTNXNaVzVuZEdncE8xeHVJQ0FnSUNBZ1luVnNiQ0E5SUdOaGNGc3lYVHRjYmx4dUlDQWdJQ0FnZEdocGN5NTBiMnRsYm5NdWNIVnphQ2g3WEc0Z0lDQWdJQ0FnSUhSNWNHVTZJQ2RzYVhOMFgzTjBZWEowSnl4Y2JpQWdJQ0FnSUNBZ2IzSmtaWEpsWkRvZ1luVnNiQzVzWlc1bmRHZ2dQaUF4WEc0Z0lDQWdJQ0I5S1R0Y2JseHVJQ0FnSUNBZ0x5OGdSMlYwSUdWaFkyZ2dkRzl3TFd4bGRtVnNJR2wwWlcwdVhHNGdJQ0FnSUNCallYQWdQU0JqWVhCYk1GMHViV0YwWTJnb2RHaHBjeTV5ZFd4bGN5NXBkR1Z0S1R0Y2JseHVJQ0FnSUNBZ2JtVjRkQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdiQ0E5SUdOaGNDNXNaVzVuZEdnN1hHNGdJQ0FnSUNCcElEMGdNRHRjYmx4dUlDQWdJQ0FnWm05eUlDZzdJR2tnUENCc095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ2FYUmxiU0E5SUdOaGNGdHBYVHRjYmx4dUlDQWdJQ0FnSUNBdkx5QlNaVzF2ZG1VZ2RHaGxJR3hwYzNRZ2FYUmxiU2R6SUdKMWJHeGxkRnh1SUNBZ0lDQWdJQ0F2THlCemJ5QnBkQ0JwY3lCelpXVnVJR0Z6SUhSb1pTQnVaWGgwSUhSdmEyVnVMbHh1SUNBZ0lDQWdJQ0J6Y0dGalpTQTlJR2wwWlcwdWJHVnVaM1JvTzF4dUlDQWdJQ0FnSUNCcGRHVnRJRDBnYVhSbGJTNXlaWEJzWVdObEtDOWVJQ29vV3lvckxWMThYRnhrSzF4Y0xpa2dLeThzSUNjbktUdGNibHh1SUNBZ0lDQWdJQ0F2THlCUGRYUmtaVzUwSUhkb1lYUmxkbVZ5SUhSb1pWeHVJQ0FnSUNBZ0lDQXZMeUJzYVhOMElHbDBaVzBnWTI5dWRHRnBibk11SUVoaFkydDVMbHh1SUNBZ0lDQWdJQ0JwWmlBb2ZtbDBaVzB1YVc1a1pYaFBaaWduWEZ4dUlDY3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2MzQmhZMlVnTFQwZ2FYUmxiUzVzWlc1bmRHZzdYRzRnSUNBZ0lDQWdJQ0FnYVhSbGJTQTlJQ0YwYUdsekxtOXdkR2x2Ym5NdWNHVmtZVzUwYVdOY2JpQWdJQ0FnSUNBZ0lDQWdJRDhnYVhSbGJTNXlaWEJzWVdObEtHNWxkeUJTWldkRmVIQW9KMTRnZXpFc0p5QXJJSE53WVdObElDc2dKMzBuTENBbloyMG5LU3dnSnljcFhHNGdJQ0FnSUNBZ0lDQWdJQ0E2SUdsMFpXMHVjbVZ3YkdGalpTZ3ZYaUI3TVN3MGZTOW5iU3dnSnljcE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnTHk4Z1JHVjBaWEp0YVc1bElIZG9aWFJvWlhJZ2RHaGxJRzVsZUhRZ2JHbHpkQ0JwZEdWdElHSmxiRzl1WjNNZ2FHVnlaUzVjYmlBZ0lDQWdJQ0FnTHk4Z1FtRmphM0JsWkdGc0lHbG1JR2wwSUdSdlpYTWdibTkwSUdKbGJHOXVaeUJwYmlCMGFHbHpJR3hwYzNRdVhHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxtOXdkR2x2Ym5NdWMyMWhjblJNYVhOMGN5QW1KaUJwSUNFOVBTQnNJQzBnTVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJR0lnUFNCaWJHOWpheTVpZFd4c1pYUXVaWGhsWXloallYQmJhU0FySURGZEtWc3dYVHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9ZblZzYkNBaFBUMGdZaUFtSmlBaEtHSjFiR3d1YkdWdVozUm9JRDRnTVNBbUppQmlMbXhsYm1kMGFDQStJREVwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6Y21NZ1BTQmpZWEF1YzJ4cFkyVW9hU0FySURFcExtcHZhVzRvSjF4Y2JpY3BJQ3NnYzNKak8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVNBOUlHd2dMU0F4TzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUM4dklFUmxkR1Z5YldsdVpTQjNhR1YwYUdWeUlHbDBaVzBnYVhNZ2JHOXZjMlVnYjNJZ2JtOTBMbHh1SUNBZ0lDQWdJQ0F2THlCVmMyVTZJQzhvWG54Y1hHNHBLRDhoSUNsYlhseGNibDByWEZ4dVhGeHVLRDhoWEZ4ektpUXBMMXh1SUNBZ0lDQWdJQ0F2THlCbWIzSWdaR2x6WTI5MWJuUWdZbVZvWVhacGIzSXVYRzRnSUNBZ0lDQWdJR3h2YjNObElEMGdibVY0ZENCOGZDQXZYRnh1WEZ4dUtEOGhYRnh6S2lRcEx5NTBaWE4wS0dsMFpXMHBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2FTQWhQVDBnYkNBdElERXBJSHRjYmlBZ0lDQWdJQ0FnSUNCdVpYaDBJRDBnYVhSbGJTNWphR0Z5UVhRb2FYUmxiUzVzWlc1bmRHZ2dMU0F4S1NBOVBUMGdKMXhjYmljN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0NGc2IyOXpaU2tnYkc5dmMyVWdQU0J1WlhoME8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnZEdocGN5NTBiMnRsYm5NdWNIVnphQ2g3WEc0Z0lDQWdJQ0FnSUNBZ2RIbHdaVG9nYkc5dmMyVmNiaUFnSUNBZ0lDQWdJQ0FnSUQ4Z0oyeHZiM05sWDJsMFpXMWZjM1JoY25RblhHNGdJQ0FnSUNBZ0lDQWdJQ0E2SUNkc2FYTjBYMmwwWlcxZmMzUmhjblFuWEc0Z0lDQWdJQ0FnSUgwcE8xeHVYRzRnSUNBZ0lDQWdJQzh2SUZKbFkzVnljMlV1WEc0Z0lDQWdJQ0FnSUhSb2FYTXVkRzlyWlc0b2FYUmxiU3dnWm1Gc2MyVXNJR0p4S1R0Y2JseHVJQ0FnSUNBZ0lDQjBhR2x6TG5SdmEyVnVjeTV3ZFhOb0tIdGNiaUFnSUNBZ0lDQWdJQ0IwZVhCbE9pQW5iR2x6ZEY5cGRHVnRYMlZ1WkNkY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSFJvYVhNdWRHOXJaVzV6TG5CMWMyZ29lMXh1SUNBZ0lDQWdJQ0IwZVhCbE9pQW5iR2x6ZEY5bGJtUW5YRzRnSUNBZ0lDQjlLVHRjYmx4dUlDQWdJQ0FnWTI5dWRHbHVkV1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnYUhSdGJGeHVJQ0FnSUdsbUlDaGpZWEFnUFNCMGFHbHpMbkoxYkdWekxtaDBiV3d1WlhobFl5aHpjbU1wS1NCN1hHNGdJQ0FnSUNCemNtTWdQU0J6Y21NdWMzVmljM1J5YVc1bktHTmhjRnN3WFM1c1pXNW5kR2dwTzF4dUlDQWdJQ0FnZEdocGN5NTBiMnRsYm5NdWNIVnphQ2g3WEc0Z0lDQWdJQ0FnSUhSNWNHVTZJSFJvYVhNdWIzQjBhVzl1Y3k1ellXNXBkR2w2WlZ4dUlDQWdJQ0FnSUNBZ0lEOGdKM0JoY21GbmNtRndhQ2RjYmlBZ0lDQWdJQ0FnSUNBNklDZG9kRzFzSnl4Y2JpQWdJQ0FnSUNBZ2NISmxPaUFoZEdocGN5NXZjSFJwYjI1ekxuTmhibWwwYVhwbGNseHVJQ0FnSUNBZ0lDQWdJQ1ltSUNoallYQmJNVjBnUFQwOUlDZHdjbVVuSUh4OElHTmhjRnN4WFNBOVBUMGdKM05qY21sd2RDY2dmSHdnWTJGd1d6RmRJRDA5UFNBbmMzUjViR1VuS1N4Y2JpQWdJQ0FnSUNBZ2RHVjRkRG9nWTJGd1d6QmRYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQWdJR052Ym5ScGJuVmxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJR1JsWmx4dUlDQWdJR2xtSUNnb0lXSnhJQ1ltSUhSdmNDa2dKaVlnS0dOaGNDQTlJSFJvYVhNdWNuVnNaWE11WkdWbUxtVjRaV01vYzNKaktTa3BJSHRjYmlBZ0lDQWdJSE55WXlBOUlITnlZeTV6ZFdKemRISnBibWNvWTJGd1d6QmRMbXhsYm1kMGFDazdYRzRnSUNBZ0lDQjBhR2x6TG5SdmEyVnVjeTVzYVc1cmMxdGpZWEJiTVYwdWRHOU1iM2RsY2tOaGMyVW9LVjBnUFNCN1hHNGdJQ0FnSUNBZ0lHaHlaV1k2SUdOaGNGc3lYU3hjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJR05oY0ZzelhWeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lHTnZiblJwYm5WbE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklIUmhZbXhsSUNoblptMHBYRzRnSUNBZ2FXWWdLSFJ2Y0NBbUppQW9ZMkZ3SUQwZ2RHaHBjeTV5ZFd4bGN5NTBZV0pzWlM1bGVHVmpLSE55WXlrcEtTQjdYRzRnSUNBZ0lDQnpjbU1nUFNCemNtTXVjM1ZpYzNSeWFXNW5LR05oY0Zzd1hTNXNaVzVuZEdncE8xeHVYRzRnSUNBZ0lDQnBkR1Z0SUQwZ2UxeHVJQ0FnSUNBZ0lDQjBlWEJsT2lBbmRHRmliR1VuTEZ4dUlDQWdJQ0FnSUNCb1pXRmtaWEk2SUdOaGNGc3hYUzV5WlhCc1lXTmxLQzllSUNwOElDcGNYSHdnS2lRdlp5d2dKeWNwTG5Od2JHbDBLQzhnS2x4Y2ZDQXFMeWtzWEc0Z0lDQWdJQ0FnSUdGc2FXZHVPaUJqWVhCYk1sMHVjbVZ3YkdGalpTZ3ZYaUFxZkZ4Y2ZDQXFKQzluTENBbkp5a3VjM0JzYVhRb0x5QXFYRng4SUNvdktTeGNiaUFnSUNBZ0lDQWdZMlZzYkhNNklHTmhjRnN6WFM1eVpYQnNZV05sS0M4b1B6b2dLbHhjZkNBcUtUOWNYRzRrTHl3Z0p5Y3BMbk53YkdsMEtDZGNYRzRuS1Z4dUlDQWdJQ0FnZlR0Y2JseHVJQ0FnSUNBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUdsMFpXMHVZV3hwWjI0dWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tDOWVJQ290S3pvZ0tpUXZMblJsYzNRb2FYUmxiUzVoYkdsbmJsdHBYU2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQnBkR1Z0TG1Gc2FXZHVXMmxkSUQwZ0ozSnBaMmgwSnp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDZ3ZYaUFxT2kwck9pQXFKQzh1ZEdWemRDaHBkR1Z0TG1Gc2FXZHVXMmxkS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJR2wwWlcwdVlXeHBaMjViYVYwZ1BTQW5ZMlZ1ZEdWeUp6dGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2d2WGlBcU9pMHJJQ29rTHk1MFpYTjBLR2wwWlcwdVlXeHBaMjViYVYwcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnYVhSbGJTNWhiR2xuYmx0cFhTQTlJQ2RzWldaMEp6dGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0JwZEdWdExtRnNhV2R1VzJsZElEMGdiblZzYkR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2FYUmxiUzVqWld4c2N5NXNaVzVuZEdnN0lHa3JLeWtnZTF4dUlDQWdJQ0FnSUNCcGRHVnRMbU5sYkd4elcybGRJRDBnYVhSbGJTNWpaV3hzYzF0cFhWeHVJQ0FnSUNBZ0lDQWdJQzV5WlhCc1lXTmxLQzllSUNwY1hId2dLbndnS2x4Y2ZDQXFKQzluTENBbkp5bGNiaUFnSUNBZ0lDQWdJQ0F1YzNCc2FYUW9MeUFxWEZ4OElDb3ZLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnZEdocGN5NTBiMnRsYm5NdWNIVnphQ2hwZEdWdEtUdGNibHh1SUNBZ0lDQWdZMjl1ZEdsdWRXVTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdkRzl3TFd4bGRtVnNJSEJoY21GbmNtRndhRnh1SUNBZ0lHbG1JQ2gwYjNBZ0ppWWdLR05oY0NBOUlIUm9hWE11Y25Wc1pYTXVjR0Z5WVdkeVlYQm9MbVY0WldNb2MzSmpLU2twSUh0Y2JpQWdJQ0FnSUhOeVl5QTlJSE55WXk1emRXSnpkSEpwYm1jb1kyRndXekJkTG14bGJtZDBhQ2s3WEc0Z0lDQWdJQ0IwYUdsekxuUnZhMlZ1Y3k1d2RYTm9LSHRjYmlBZ0lDQWdJQ0FnZEhsd1pUb2dKM0JoY21GbmNtRndhQ2NzWEc0Z0lDQWdJQ0FnSUhSbGVIUTZJR05oY0ZzeFhTNWphR0Z5UVhRb1kyRndXekZkTG14bGJtZDBhQ0F0SURFcElEMDlQU0FuWEZ4dUoxeHVJQ0FnSUNBZ0lDQWdJRDhnWTJGd1d6RmRMbk5zYVdObEtEQXNJQzB4S1Z4dUlDQWdJQ0FnSUNBZ0lEb2dZMkZ3V3pGZFhHNGdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lHTnZiblJwYm5WbE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklIUmxlSFJjYmlBZ0lDQnBaaUFvWTJGd0lEMGdkR2hwY3k1eWRXeGxjeTUwWlhoMExtVjRaV01vYzNKaktTa2dlMXh1SUNBZ0lDQWdMeThnVkc5d0xXeGxkbVZzSUhOb2IzVnNaQ0J1WlhabGNpQnlaV0ZqYUNCb1pYSmxMbHh1SUNBZ0lDQWdjM0pqSUQwZ2MzSmpMbk4xWW5OMGNtbHVaeWhqWVhCYk1GMHViR1Z1WjNSb0tUdGNiaUFnSUNBZ0lIUm9hWE11ZEc5clpXNXpMbkIxYzJnb2UxeHVJQ0FnSUNBZ0lDQjBlWEJsT2lBbmRHVjRkQ2NzWEc0Z0lDQWdJQ0FnSUhSbGVIUTZJR05oY0Zzd1hWeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQmpiMjUwYVc1MVpUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9jM0pqS1NCN1hHNGdJQ0FnSUNCMGFISnZkeUJ1WlhkY2JpQWdJQ0FnSUNBZ1JYSnliM0lvSjBsdVptbHVhWFJsSUd4dmIzQWdiMjRnWW5sMFpUb2dKeUFySUhOeVl5NWphR0Z5UTI5a1pVRjBLREFwS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnZEdocGN5NTBiMnRsYm5NN1hHNTlPMXh1WEc0dktpcGNiaUFxSUVsdWJHbHVaUzFNWlhabGJDQkhjbUZ0YldGeVhHNGdLaTljYmx4dWRtRnlJR2x1YkdsdVpTQTlJSHRjYmlBZ1pYTmpZWEJsT2lBdlhseGNYRndvVzF4Y1hGeGdLbnQ5WEZ4YlhGeGRLQ2tqSzF4Y0xTNGhYejVkS1M4c1hHNGdJR0YxZEc5c2FXNXJPaUF2WGp3b1cxNGdQbDByS0VCOE9seGNMeWxiWGlBK1hTc3BQaThzWEc0Z0lIVnliRG9nYm05dmNDeGNiaUFnZEdGbk9pQXZYandoTFMxYlhGeHpYRnhUWFNvL0xTMCtmRjQ4WEZ3dlAxeGNkeXNvUHpwY0lsdGVYQ0pkS2x3aWZDZGJYaWRkS2lkOFcxNG5YQ0krWFNrcVB6NHZMRnh1SUNCc2FXNXJPaUF2WGlFL1hGeGJLR2x1YzJsa1pTbGNYRjFjWENob2NtVm1YRndwTHl4Y2JpQWdjbVZtYkdsdWF6b2dMMTRoUDF4Y1d5aHBibk5wWkdVcFhGeGRYRnh6S2x4Y1d5aGJYbHhjWFYwcUtWeGNYUzhzWEc0Z0lHNXZiR2x1YXpvZ0wxNGhQMXhjV3lnb1B6cGNYRnRiWGx4Y1hWMHFYRnhkZkZ0ZVhGeGJYRnhkWFNrcUtWeGNYUzhzWEc0Z0lITjBjbTl1WnpvZ0wxNWZYeWhiWEZ4elhGeFRYU3MvS1Y5ZktEOGhYeWw4WGx4Y0tseGNLaWhiWEZ4elhGeFRYU3MvS1Z4Y0tseGNLaWcvSVZ4Y0tpa3ZMRnh1SUNCbGJUb2dMMTVjWEdKZktDZy9PbHRlWDExOFgxOHBLejhwWDF4Y1lueGVYRndxS0NnL09seGNLbHhjS254YlhGeHpYRnhUWFNrclB5bGNYQ29vUHlGY1hDb3BMeXhjYmlBZ1kyOWtaVG9nTDE0b1lDc3BYRnh6S2loYlhGeHpYRnhUWFNvL1cxNWdYU2xjWEhNcVhGd3hLRDhoWUNrdkxGeHVJQ0JpY2pvZ0wxNGdleklzZlZ4Y2JpZy9JVnhjY3lva0tTOHNYRzRnSUdSbGJEb2dibTl2Y0N4Y2JpQWdkR1Y0ZERvZ0wxNWJYRnh6WEZ4VFhTcy9LRDg5VzF4Y1hGdzhJVnhjVzE4cVlGMThJSHN5TEgxY1hHNThKQ2t2WEc1OU8xeHVYRzVwYm14cGJtVXVYMmx1YzJsa1pTQTlJQzhvUHpwY1hGdGJYbHhjWFYwcVhGeGRmRnRlWEZ4YlhGeGRYWHhjWEYwb1B6MWJYbHhjVzEwcVhGeGRLU2txTHp0Y2JtbHViR2x1WlM1ZmFISmxaaUE5SUM5Y1hITXFQRDhvVzF4Y2MxeGNVMTBxUHlrK1B5Zy9PbHhjY3l0Ykoxd2lYU2hiWEZ4elhGeFRYU28vS1ZzblhDSmRLVDljWEhNcUx6dGNibHh1YVc1c2FXNWxMbXhwYm1zZ1BTQnlaWEJzWVdObEtHbHViR2x1WlM1c2FXNXJLVnh1SUNBb0oybHVjMmxrWlNjc0lHbHViR2x1WlM1ZmFXNXphV1JsS1Z4dUlDQW9KMmh5WldZbkxDQnBibXhwYm1VdVgyaHlaV1lwWEc0Z0lDZ3BPMXh1WEc1cGJteHBibVV1Y21WbWJHbHVheUE5SUhKbGNHeGhZMlVvYVc1c2FXNWxMbkpsWm14cGJtc3BYRzRnSUNnbmFXNXphV1JsSnl3Z2FXNXNhVzVsTGw5cGJuTnBaR1VwWEc0Z0lDZ3BPMXh1WEc0dktpcGNiaUFxSUU1dmNtMWhiQ0JKYm14cGJtVWdSM0poYlcxaGNseHVJQ292WEc1Y2JtbHViR2x1WlM1dWIzSnRZV3dnUFNCdFpYSm5aU2g3ZlN3Z2FXNXNhVzVsS1R0Y2JseHVMeW9xWEc0Z0tpQlFaV1JoYm5ScFl5QkpibXhwYm1VZ1IzSmhiVzFoY2x4dUlDb3ZYRzVjYm1sdWJHbHVaUzV3WldSaGJuUnBZeUE5SUcxbGNtZGxLSHQ5TENCcGJteHBibVV1Ym05eWJXRnNMQ0I3WEc0Z0lITjBjbTl1WnpvZ0wxNWZYeWcvUFZ4Y1V5a29XMXhjYzF4Y1UxMHFQMXhjVXlsZlh5Zy9JVjhwZkY1Y1hDcGNYQ29vUHoxY1hGTXBLRnRjWEhOY1hGTmRLajljWEZNcFhGd3FYRndxS0Q4aFhGd3FLUzhzWEc0Z0lHVnRPaUF2WGw4b1B6MWNYRk1wS0Z0Y1hITmNYRk5kS2o5Y1hGTXBYeWcvSVY4cGZGNWNYQ29vUHoxY1hGTXBLRnRjWEhOY1hGTmRLajljWEZNcFhGd3FLRDhoWEZ3cUtTOWNibjBwTzF4dVhHNHZLaXBjYmlBcUlFZEdUU0JKYm14cGJtVWdSM0poYlcxaGNseHVJQ292WEc1Y2JtbHViR2x1WlM1blptMGdQU0J0WlhKblpTaDdmU3dnYVc1c2FXNWxMbTV2Y20xaGJDd2dlMXh1SUNCbGMyTmhjR1U2SUhKbGNHeGhZMlVvYVc1c2FXNWxMbVZ6WTJGd1pTa29KMTBwSnl3Z0ozNThYU2tuS1NncExGeHVJQ0IxY213NklDOWVLR2gwZEhCelB6cGNYQzljWEM5YlhseGNjenhkSzF0ZVBDNHNPanRjSWljcFhGeGRYRnh6WFNrdkxGeHVJQ0JrWld3NklDOWVmbjRvUHoxY1hGTXBLRnRjWEhOY1hGTmRLajljWEZNcGZuNHZMRnh1SUNCMFpYaDBPaUJ5WlhCc1lXTmxLR2x1YkdsdVpTNTBaWGgwS1Z4dUlDQWdJQ2duWFh3bkxDQW5mbDE4SnlsY2JpQWdJQ0FvSjN3bkxDQW5mR2gwZEhCelB6b3ZMM3duS1Z4dUlDQWdJQ2dwWEc1OUtUdGNibHh1THlvcVhHNGdLaUJIUmswZ0t5Qk1hVzVsSUVKeVpXRnJjeUJKYm14cGJtVWdSM0poYlcxaGNseHVJQ292WEc1Y2JtbHViR2x1WlM1aWNtVmhhM01nUFNCdFpYSm5aU2g3ZlN3Z2FXNXNhVzVsTG1kbWJTd2dlMXh1SUNCaWNqb2djbVZ3YkdGalpTaHBibXhwYm1VdVluSXBLQ2Q3TWl4OUp5d2dKeW9uS1NncExGeHVJQ0IwWlhoME9pQnlaWEJzWVdObEtHbHViR2x1WlM1blptMHVkR1Y0ZENrb0ozc3lMSDBuTENBbktpY3BLQ2xjYm4wcE8xeHVYRzR2S2lwY2JpQXFJRWx1YkdsdVpTQk1aWGhsY2lBbUlFTnZiWEJwYkdWeVhHNGdLaTljYmx4dVpuVnVZM1JwYjI0Z1NXNXNhVzVsVEdWNFpYSW9iR2x1YTNNc0lHOXdkR2x2Ym5NcElIdGNiaUFnZEdocGN5NXZjSFJwYjI1eklEMGdiM0IwYVc5dWN5QjhmQ0J0WVhKclpXUXVaR1ZtWVhWc2RITTdYRzRnSUhSb2FYTXViR2x1YTNNZ1BTQnNhVzVyY3p0Y2JpQWdkR2hwY3k1eWRXeGxjeUE5SUdsdWJHbHVaUzV1YjNKdFlXdzdYRzRnSUhSb2FYTXVjbVZ1WkdWeVpYSWdQU0IwYUdsekxtOXdkR2x2Ym5NdWNtVnVaR1Z5WlhJZ2ZId2dibVYzSUZKbGJtUmxjbVZ5TzF4dUlDQjBhR2x6TG5KbGJtUmxjbVZ5TG05d2RHbHZibk1nUFNCMGFHbHpMbTl3ZEdsdmJuTTdYRzVjYmlBZ2FXWWdLQ0YwYUdsekxteHBibXR6S1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzWEc0Z0lDQWdJQ0JGY25KdmNpZ25WRzlyWlc1eklHRnljbUY1SUhKbGNYVnBjbVZ6SUdFZ1lHeHBibXR6WUNCd2NtOXdaWEowZVM0bktUdGNiaUFnZlZ4dVhHNGdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXVaMlp0S1NCN1hHNGdJQ0FnYVdZZ0tIUm9hWE11YjNCMGFXOXVjeTVpY21WaGEzTXBJSHRjYmlBZ0lDQWdJSFJvYVhNdWNuVnNaWE1nUFNCcGJteHBibVV1WW5KbFlXdHpPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMGFHbHpMbkoxYkdWeklEMGdhVzVzYVc1bExtZG1iVHRjYmlBZ0lDQjlYRzRnSUgwZ1pXeHpaU0JwWmlBb2RHaHBjeTV2Y0hScGIyNXpMbkJsWkdGdWRHbGpLU0I3WEc0Z0lDQWdkR2hwY3k1eWRXeGxjeUE5SUdsdWJHbHVaUzV3WldSaGJuUnBZenRjYmlBZ2ZWeHVmVnh1WEc0dktpcGNiaUFxSUVWNGNHOXpaU0JKYm14cGJtVWdVblZzWlhOY2JpQXFMMXh1WEc1SmJteHBibVZNWlhobGNpNXlkV3hsY3lBOUlHbHViR2x1WlR0Y2JseHVMeW9xWEc0Z0tpQlRkR0YwYVdNZ1RHVjRhVzVuTDBOdmJYQnBiR2x1WnlCTlpYUm9iMlJjYmlBcUwxeHVYRzVKYm14cGJtVk1aWGhsY2k1dmRYUndkWFFnUFNCbWRXNWpkR2x2YmloemNtTXNJR3hwYm10ekxDQnZjSFJwYjI1ektTQjdYRzRnSUhaaGNpQnBibXhwYm1VZ1BTQnVaWGNnU1c1c2FXNWxUR1Y0WlhJb2JHbHVhM01zSUc5d2RHbHZibk1wTzF4dUlDQnlaWFIxY200Z2FXNXNhVzVsTG05MWRIQjFkQ2h6Y21NcE8xeHVmVHRjYmx4dUx5b3FYRzRnS2lCTVpYaHBibWN2UTI5dGNHbHNhVzVuWEc0Z0tpOWNibHh1U1c1c2FXNWxUR1Y0WlhJdWNISnZkRzkwZVhCbExtOTFkSEIxZENBOUlHWjFibU4wYVc5dUtITnlZeWtnZTF4dUlDQjJZWElnYjNWMElEMGdKeWRjYmlBZ0lDQXNJR3hwYm10Y2JpQWdJQ0FzSUhSbGVIUmNiaUFnSUNBc0lHaHlaV1pjYmlBZ0lDQXNJR05oY0R0Y2JseHVJQ0IzYUdsc1pTQW9jM0pqS1NCN1hHNGdJQ0FnTHk4Z1pYTmpZWEJsWEc0Z0lDQWdhV1lnS0dOaGNDQTlJSFJvYVhNdWNuVnNaWE11WlhOallYQmxMbVY0WldNb2MzSmpLU2tnZTF4dUlDQWdJQ0FnYzNKaklEMGdjM0pqTG5OMVluTjBjbWx1WnloallYQmJNRjB1YkdWdVozUm9LVHRjYmlBZ0lDQWdJRzkxZENBclBTQmpZWEJiTVYwN1hHNGdJQ0FnSUNCamIyNTBhVzUxWlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCaGRYUnZiR2x1YTF4dUlDQWdJR2xtSUNoallYQWdQU0IwYUdsekxuSjFiR1Z6TG1GMWRHOXNhVzVyTG1WNFpXTW9jM0pqS1NrZ2UxeHVJQ0FnSUNBZ2MzSmpJRDBnYzNKakxuTjFZbk4wY21sdVp5aGpZWEJiTUYwdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUdsbUlDaGpZWEJiTWwwZ1BUMDlJQ2RBSnlrZ2UxeHVJQ0FnSUNBZ0lDQjBaWGgwSUQwZ1kyRndXekZkTG1Ob1lYSkJkQ2cyS1NBOVBUMGdKem9uWEc0Z0lDQWdJQ0FnSUNBZ1B5QjBhR2x6TG0xaGJtZHNaU2hqWVhCYk1WMHVjM1ZpYzNSeWFXNW5LRGNwS1Z4dUlDQWdJQ0FnSUNBZ0lEb2dkR2hwY3k1dFlXNW5iR1VvWTJGd1d6RmRLVHRjYmlBZ0lDQWdJQ0FnYUhKbFppQTlJSFJvYVhNdWJXRnVaMnhsS0NkdFlXbHNkRzg2SnlrZ0t5QjBaWGgwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZEdWNGRDQTlJR1Z6WTJGd1pTaGpZWEJiTVYwcE8xeHVJQ0FnSUNBZ0lDQm9jbVZtSUQwZ2RHVjRkRHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJRzkxZENBclBTQjBhR2x6TG5KbGJtUmxjbVZ5TG14cGJtc29hSEpsWml3Z2JuVnNiQ3dnZEdWNGRDazdYRzRnSUNBZ0lDQmpiMjUwYVc1MVpUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QjFjbXdnS0dkbWJTbGNiaUFnSUNCcFppQW9JWFJvYVhNdWFXNU1hVzVySUNZbUlDaGpZWEFnUFNCMGFHbHpMbkoxYkdWekxuVnliQzVsZUdWaktITnlZeWtwS1NCN1hHNGdJQ0FnSUNCemNtTWdQU0J6Y21NdWMzVmljM1J5YVc1bktHTmhjRnN3WFM1c1pXNW5kR2dwTzF4dUlDQWdJQ0FnZEdWNGRDQTlJR1Z6WTJGd1pTaGpZWEJiTVYwcE8xeHVJQ0FnSUNBZ2FISmxaaUE5SUhSbGVIUTdYRzRnSUNBZ0lDQnZkWFFnS3owZ2RHaHBjeTV5Wlc1a1pYSmxjaTVzYVc1cktHaHlaV1lzSUc1MWJHd3NJSFJsZUhRcE8xeHVJQ0FnSUNBZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z2RHRm5YRzRnSUNBZ2FXWWdLR05oY0NBOUlIUm9hWE11Y25Wc1pYTXVkR0ZuTG1WNFpXTW9jM0pqS1NrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0YwYUdsekxtbHVUR2x1YXlBbUppQXZYanhoSUM5cExuUmxjM1FvWTJGd1d6QmRLU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbWx1VEdsdWF5QTlJSFJ5ZFdVN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUm9hWE11YVc1TWFXNXJJQ1ltSUM5ZVBGeGNMMkUrTDJrdWRHVnpkQ2hqWVhCYk1GMHBLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVNYVc1cklEMGdabUZzYzJVN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCemNtTWdQU0J6Y21NdWMzVmljM1J5YVc1bktHTmhjRnN3WFM1c1pXNW5kR2dwTzF4dUlDQWdJQ0FnYjNWMElDczlJSFJvYVhNdWIzQjBhVzl1Y3k1ellXNXBkR2w2WlZ4dUlDQWdJQ0FnSUNBL0lIUm9hWE11YjNCMGFXOXVjeTV6WVc1cGRHbDZaWEpjYmlBZ0lDQWdJQ0FnSUNBL0lIUm9hWE11YjNCMGFXOXVjeTV6WVc1cGRHbDZaWElvWTJGd1d6QmRLVnh1SUNBZ0lDQWdJQ0FnSURvZ1pYTmpZWEJsS0dOaGNGc3dYU2xjYmlBZ0lDQWdJQ0FnT2lCallYQmJNRjFjYmlBZ0lDQWdJR052Ym5ScGJuVmxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJR3hwYm10Y2JpQWdJQ0JwWmlBb1kyRndJRDBnZEdocGN5NXlkV3hsY3k1c2FXNXJMbVY0WldNb2MzSmpLU2tnZTF4dUlDQWdJQ0FnYzNKaklEMGdjM0pqTG5OMVluTjBjbWx1WnloallYQmJNRjB1YkdWdVozUm9LVHRjYmlBZ0lDQWdJSFJvYVhNdWFXNU1hVzVySUQwZ2RISjFaVHRjYmlBZ0lDQWdJRzkxZENBclBTQjBhR2x6TG05MWRIQjFkRXhwYm1zb1kyRndMQ0I3WEc0Z0lDQWdJQ0FnSUdoeVpXWTZJR05oY0ZzeVhTeGNiaUFnSUNBZ0lDQWdkR2wwYkdVNklHTmhjRnN6WFZ4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCMGFHbHpMbWx1VEdsdWF5QTlJR1poYkhObE8xeHVJQ0FnSUNBZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z2NtVm1iR2x1YXl3Z2JtOXNhVzVyWEc0Z0lDQWdhV1lnS0NoallYQWdQU0IwYUdsekxuSjFiR1Z6TG5KbFpteHBibXN1WlhobFl5aHpjbU1wS1Z4dUlDQWdJQ0FnSUNCOGZDQW9ZMkZ3SUQwZ2RHaHBjeTV5ZFd4bGN5NXViMnhwYm1zdVpYaGxZeWh6Y21NcEtTa2dlMXh1SUNBZ0lDQWdjM0pqSUQwZ2MzSmpMbk4xWW5OMGNtbHVaeWhqWVhCYk1GMHViR1Z1WjNSb0tUdGNiaUFnSUNBZ0lHeHBibXNnUFNBb1kyRndXekpkSUh4OElHTmhjRnN4WFNrdWNtVndiR0ZqWlNndlhGeHpLeTluTENBbklDY3BPMXh1SUNBZ0lDQWdiR2x1YXlBOUlIUm9hWE11YkdsdWEzTmJiR2x1YXk1MGIweHZkMlZ5UTJGelpTZ3BYVHRjYmlBZ0lDQWdJR2xtSUNnaGJHbHVheUI4ZkNBaGJHbHVheTVvY21WbUtTQjdYRzRnSUNBZ0lDQWdJRzkxZENBclBTQmpZWEJiTUYwdVkyaGhja0YwS0RBcE8xeHVJQ0FnSUNBZ0lDQnpjbU1nUFNCallYQmJNRjB1YzNWaWMzUnlhVzVuS0RFcElDc2djM0pqTzF4dUlDQWdJQ0FnSUNCamIyNTBhVzUxWlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhSb2FYTXVhVzVNYVc1cklEMGdkSEoxWlR0Y2JpQWdJQ0FnSUc5MWRDQXJQU0IwYUdsekxtOTFkSEIxZEV4cGJtc29ZMkZ3TENCc2FXNXJLVHRjYmlBZ0lDQWdJSFJvYVhNdWFXNU1hVzVySUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0JqYjI1MGFXNTFaVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJ6ZEhKdmJtZGNiaUFnSUNCcFppQW9ZMkZ3SUQwZ2RHaHBjeTV5ZFd4bGN5NXpkSEp2Ym1jdVpYaGxZeWh6Y21NcEtTQjdYRzRnSUNBZ0lDQnpjbU1nUFNCemNtTXVjM1ZpYzNSeWFXNW5LR05oY0Zzd1hTNXNaVzVuZEdncE8xeHVJQ0FnSUNBZ2IzVjBJQ3M5SUhSb2FYTXVjbVZ1WkdWeVpYSXVjM1J5YjI1bktIUm9hWE11YjNWMGNIVjBLR05oY0ZzeVhTQjhmQ0JqWVhCYk1WMHBLVHRjYmlBZ0lDQWdJR052Ym5ScGJuVmxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJR1Z0WEc0Z0lDQWdhV1lnS0dOaGNDQTlJSFJvYVhNdWNuVnNaWE11WlcwdVpYaGxZeWh6Y21NcEtTQjdYRzRnSUNBZ0lDQnpjbU1nUFNCemNtTXVjM1ZpYzNSeWFXNW5LR05oY0Zzd1hTNXNaVzVuZEdncE8xeHVJQ0FnSUNBZ2IzVjBJQ3M5SUhSb2FYTXVjbVZ1WkdWeVpYSXVaVzBvZEdocGN5NXZkWFJ3ZFhRb1kyRndXekpkSUh4OElHTmhjRnN4WFNrcE8xeHVJQ0FnSUNBZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1kyOWtaVnh1SUNBZ0lHbG1JQ2hqWVhBZ1BTQjBhR2x6TG5KMWJHVnpMbU52WkdVdVpYaGxZeWh6Y21NcEtTQjdYRzRnSUNBZ0lDQnpjbU1nUFNCemNtTXVjM1ZpYzNSeWFXNW5LR05oY0Zzd1hTNXNaVzVuZEdncE8xeHVJQ0FnSUNBZ2IzVjBJQ3M5SUhSb2FYTXVjbVZ1WkdWeVpYSXVZMjlrWlhOd1lXNG9aWE5qWVhCbEtHTmhjRnN5WFN3Z2RISjFaU2twTzF4dUlDQWdJQ0FnWTI5dWRHbHVkV1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnWW5KY2JpQWdJQ0JwWmlBb1kyRndJRDBnZEdocGN5NXlkV3hsY3k1aWNpNWxlR1ZqS0hOeVl5a3BJSHRjYmlBZ0lDQWdJSE55WXlBOUlITnlZeTV6ZFdKemRISnBibWNvWTJGd1d6QmRMbXhsYm1kMGFDazdYRzRnSUNBZ0lDQnZkWFFnS3owZ2RHaHBjeTV5Wlc1a1pYSmxjaTVpY2lncE8xeHVJQ0FnSUNBZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1pHVnNJQ2huWm0wcFhHNGdJQ0FnYVdZZ0tHTmhjQ0E5SUhSb2FYTXVjblZzWlhNdVpHVnNMbVY0WldNb2MzSmpLU2tnZTF4dUlDQWdJQ0FnYzNKaklEMGdjM0pqTG5OMVluTjBjbWx1WnloallYQmJNRjB1YkdWdVozUm9LVHRjYmlBZ0lDQWdJRzkxZENBclBTQjBhR2x6TG5KbGJtUmxjbVZ5TG1SbGJDaDBhR2x6TG05MWRIQjFkQ2hqWVhCYk1WMHBLVHRjYmlBZ0lDQWdJR052Ym5ScGJuVmxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJSFJsZUhSY2JpQWdJQ0JwWmlBb1kyRndJRDBnZEdocGN5NXlkV3hsY3k1MFpYaDBMbVY0WldNb2MzSmpLU2tnZTF4dUlDQWdJQ0FnYzNKaklEMGdjM0pqTG5OMVluTjBjbWx1WnloallYQmJNRjB1YkdWdVozUm9LVHRjYmlBZ0lDQWdJRzkxZENBclBTQjBhR2x6TG5KbGJtUmxjbVZ5TG5SbGVIUW9aWE5qWVhCbEtIUm9hWE11YzIxaGNuUjVjR0Z1ZEhNb1kyRndXekJkS1NrcE8xeHVJQ0FnSUNBZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tITnlZeWtnZTF4dUlDQWdJQ0FnZEdoeWIzY2dibVYzWEc0Z0lDQWdJQ0FnSUVWeWNtOXlLQ2RKYm1acGJtbDBaU0JzYjI5d0lHOXVJR0o1ZEdVNklDY2dLeUJ6Y21NdVkyaGhja052WkdWQmRDZ3dLU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnY21WMGRYSnVJRzkxZER0Y2JuMDdYRzVjYmk4cUtseHVJQ29nUTI5dGNHbHNaU0JNYVc1clhHNGdLaTljYmx4dVNXNXNhVzVsVEdWNFpYSXVjSEp2ZEc5MGVYQmxMbTkxZEhCMWRFeHBibXNnUFNCbWRXNWpkR2x2YmloallYQXNJR3hwYm1zcElIdGNiaUFnZG1GeUlHaHlaV1lnUFNCbGMyTmhjR1VvYkdsdWF5NW9jbVZtS1Z4dUlDQWdJQ3dnZEdsMGJHVWdQU0JzYVc1ckxuUnBkR3hsSUQ4Z1pYTmpZWEJsS0d4cGJtc3VkR2wwYkdVcElEb2diblZzYkR0Y2JseHVJQ0J5WlhSMWNtNGdZMkZ3V3pCZExtTm9ZWEpCZENnd0tTQWhQVDBnSnlFblhHNGdJQ0FnUHlCMGFHbHpMbkpsYm1SbGNtVnlMbXhwYm1zb2FISmxaaXdnZEdsMGJHVXNJSFJvYVhNdWIzVjBjSFYwS0dOaGNGc3hYU2twWEc0Z0lDQWdPaUIwYUdsekxuSmxibVJsY21WeUxtbHRZV2RsS0doeVpXWXNJSFJwZEd4bExDQmxjMk5oY0dVb1kyRndXekZkS1NrN1hHNTlPMXh1WEc0dktpcGNiaUFxSUZOdFlYSjBlWEJoYm5SeklGUnlZVzV6Wm05eWJXRjBhVzl1YzF4dUlDb3ZYRzVjYmtsdWJHbHVaVXhsZUdWeUxuQnliM1J2ZEhsd1pTNXpiV0Z5ZEhsd1lXNTBjeUE5SUdaMWJtTjBhVzl1S0hSbGVIUXBJSHRjYmlBZ2FXWWdLQ0YwYUdsekxtOXdkR2x2Ym5NdWMyMWhjblI1Y0dGdWRITXBJSEpsZEhWeWJpQjBaWGgwTzF4dUlDQnlaWFIxY200Z2RHVjRkRnh1SUNBZ0lDOHZJR1Z0TFdSaGMyaGxjMXh1SUNBZ0lDNXlaWEJzWVdObEtDOHRMUzB2Wnl3Z0oxeGNkVEl3TVRRbktWeHVJQ0FnSUM4dklHVnVMV1JoYzJobGMxeHVJQ0FnSUM1eVpYQnNZV05sS0M4dExTOW5MQ0FuWEZ4MU1qQXhNeWNwWEc0Z0lDQWdMeThnYjNCbGJtbHVaeUJ6YVc1bmJHVnpYRzRnSUNBZ0xuSmxjR3hoWTJVb0x5aGVmRnN0WEZ4MU1qQXhOQzhvWEZ4YmUxd2lYRnh6WFNrbkwyY3NJQ2NrTVZ4Y2RUSXdNVGduS1Z4dUlDQWdJQzh2SUdOc2IzTnBibWNnYzJsdVoyeGxjeUFtSUdGd2IzTjBjbTl3YUdWelhHNGdJQ0FnTG5KbGNHeGhZMlVvTHljdlp5d2dKMXhjZFRJd01Ua25LVnh1SUNBZ0lDOHZJRzl3Wlc1cGJtY2daRzkxWW14bGMxeHVJQ0FnSUM1eVpYQnNZV05sS0M4b1hueGJMVnhjZFRJd01UUXZLRnhjVzN0Y1hIVXlNREU0WEZ4elhTbGNJaTluTENBbkpERmNYSFV5TURGakp5bGNiaUFnSUNBdkx5QmpiRzl6YVc1bklHUnZkV0pzWlhOY2JpQWdJQ0F1Y21Wd2JHRmpaU2d2WENJdlp5d2dKMXhjZFRJd01XUW5LVnh1SUNBZ0lDOHZJR1ZzYkdsd2MyVnpYRzRnSUNBZ0xuSmxjR3hoWTJVb0wxeGNMbnN6ZlM5bkxDQW5YRngxTWpBeU5pY3BPMXh1ZlR0Y2JseHVMeW9xWEc0Z0tpQk5ZVzVuYkdVZ1RHbHVhM05jYmlBcUwxeHVYRzVKYm14cGJtVk1aWGhsY2k1d2NtOTBiM1I1Y0dVdWJXRnVaMnhsSUQwZ1puVnVZM1JwYjI0b2RHVjRkQ2tnZTF4dUlDQnBaaUFvSVhSb2FYTXViM0IwYVc5dWN5NXRZVzVuYkdVcElISmxkSFZ5YmlCMFpYaDBPMXh1SUNCMllYSWdiM1YwSUQwZ0p5ZGNiaUFnSUNBc0lHd2dQU0IwWlhoMExteGxibWQwYUZ4dUlDQWdJQ3dnYVNBOUlEQmNiaUFnSUNBc0lHTm9PMXh1WEc0Z0lHWnZjaUFvT3lCcElEd2diRHNnYVNzcktTQjdYRzRnSUNBZ1kyZ2dQU0IwWlhoMExtTm9ZWEpEYjJSbFFYUW9hU2s3WEc0Z0lDQWdhV1lnS0UxaGRHZ3VjbUZ1Wkc5dEtDa2dQaUF3TGpVcElIdGNiaUFnSUNBZ0lHTm9JRDBnSjNnbklDc2dZMmd1ZEc5VGRISnBibWNvTVRZcE8xeHVJQ0FnSUgxY2JpQWdJQ0J2ZFhRZ0t6MGdKeVlqSnlBcklHTm9JQ3NnSnpzbk8xeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlHOTFkRHRjYm4wN1hHNWNiaThxS2x4dUlDb2dVbVZ1WkdWeVpYSmNiaUFxTDF4dVhHNW1kVzVqZEdsdmJpQlNaVzVrWlhKbGNpaHZjSFJwYjI1ektTQjdYRzRnSUhSb2FYTXViM0IwYVc5dWN5QTlJRzl3ZEdsdmJuTWdmSHdnZTMwN1hHNTlYRzVjYmxKbGJtUmxjbVZ5TG5CeWIzUnZkSGx3WlM1amIyUmxJRDBnWm5WdVkzUnBiMjRvWTI5a1pTd2diR0Z1Wnl3Z1pYTmpZWEJsWkNrZ2UxeHVJQ0JwWmlBb2RHaHBjeTV2Y0hScGIyNXpMbWhwWjJoc2FXZG9kQ2tnZTF4dUlDQWdJSFpoY2lCdmRYUWdQU0IwYUdsekxtOXdkR2x2Ym5NdWFHbG5hR3hwWjJoMEtHTnZaR1VzSUd4aGJtY3BPMXh1SUNBZ0lHbG1JQ2h2ZFhRZ0lUMGdiblZzYkNBbUppQnZkWFFnSVQwOUlHTnZaR1VwSUh0Y2JpQWdJQ0FnSUdWelkyRndaV1FnUFNCMGNuVmxPMXh1SUNBZ0lDQWdZMjlrWlNBOUlHOTFkRHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JwWmlBb0lXeGhibWNwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdKenh3Y21VK1BHTnZaR1UrSjF4dUlDQWdJQ0FnS3lBb1pYTmpZWEJsWkNBL0lHTnZaR1VnT2lCbGMyTmhjR1VvWTI5a1pTd2dkSEoxWlNrcFhHNGdJQ0FnSUNBcklDZGNYRzQ4TDJOdlpHVStQQzl3Y21VK0p6dGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQW5QSEJ5WlQ0OFkyOWtaU0JqYkdGemN6MWNJaWRjYmlBZ0lDQXJJSFJvYVhNdWIzQjBhVzl1Y3k1c1lXNW5VSEpsWm1sNFhHNGdJQ0FnS3lCbGMyTmhjR1VvYkdGdVp5d2dkSEoxWlNsY2JpQWdJQ0FySUNkY0lqNG5YRzRnSUNBZ0t5QW9aWE5qWVhCbFpDQS9JR052WkdVZ09pQmxjMk5oY0dVb1kyOWtaU3dnZEhKMVpTa3BYRzRnSUNBZ0t5QW5YRnh1UEM5amIyUmxQand2Y0hKbFBseGNiaWM3WEc1OU8xeHVYRzVTWlc1a1pYSmxjaTV3Y205MGIzUjVjR1V1WW14dlkydHhkVzkwWlNBOUlHWjFibU4wYVc5dUtIRjFiM1JsS1NCN1hHNGdJSEpsZEhWeWJpQW5QR0pzYjJOcmNYVnZkR1UrWEZ4dUp5QXJJSEYxYjNSbElDc2dKend2WW14dlkydHhkVzkwWlQ1Y1hHNG5PMXh1ZlR0Y2JseHVVbVZ1WkdWeVpYSXVjSEp2ZEc5MGVYQmxMbWgwYld3Z1BTQm1kVzVqZEdsdmJpaG9kRzFzS1NCN1hHNGdJSEpsZEhWeWJpQm9kRzFzTzF4dWZUdGNibHh1VW1WdVpHVnlaWEl1Y0hKdmRHOTBlWEJsTG1obFlXUnBibWNnUFNCbWRXNWpkR2x2YmloMFpYaDBMQ0JzWlhabGJDd2djbUYzS1NCN1hHNGdJSEpsZEhWeWJpQW5QR2duWEc0Z0lDQWdLeUJzWlhabGJGeHVJQ0FnSUNzZ0p5QnBaRDFjSWlkY2JpQWdJQ0FySUhSb2FYTXViM0IwYVc5dWN5NW9aV0ZrWlhKUWNtVm1hWGhjYmlBZ0lDQXJJSEpoZHk1MGIweHZkMlZ5UTJGelpTZ3BMbkpsY0d4aFkyVW9MMXRlWEZ4M1hTc3ZaeXdnSnkwbktWeHVJQ0FnSUNzZ0oxd2lQaWRjYmlBZ0lDQXJJSFJsZUhSY2JpQWdJQ0FySUNjOEwyZ25YRzRnSUNBZ0t5QnNaWFpsYkZ4dUlDQWdJQ3NnSno1Y1hHNG5PMXh1ZlR0Y2JseHVVbVZ1WkdWeVpYSXVjSEp2ZEc5MGVYQmxMbWh5SUQwZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUhKbGRIVnliaUIwYUdsekxtOXdkR2x2Ym5NdWVHaDBiV3dnUHlBblBHaHlMejVjWEc0bklEb2dKenhvY2o1Y1hHNG5PMXh1ZlR0Y2JseHVVbVZ1WkdWeVpYSXVjSEp2ZEc5MGVYQmxMbXhwYzNRZ1BTQm1kVzVqZEdsdmJpaGliMlI1TENCdmNtUmxjbVZrS1NCN1hHNGdJSFpoY2lCMGVYQmxJRDBnYjNKa1pYSmxaQ0EvSUNkdmJDY2dPaUFuZFd3bk8xeHVJQ0J5WlhSMWNtNGdKenduSUNzZ2RIbHdaU0FySUNjK1hGeHVKeUFySUdKdlpIa2dLeUFuUEM4bklDc2dkSGx3WlNBcklDYytYRnh1Snp0Y2JuMDdYRzVjYmxKbGJtUmxjbVZ5TG5CeWIzUnZkSGx3WlM1c2FYTjBhWFJsYlNBOUlHWjFibU4wYVc5dUtIUmxlSFFwSUh0Y2JpQWdjbVYwZFhKdUlDYzhiR2srSnlBcklIUmxlSFFnS3lBblBDOXNhVDVjWEc0bk8xeHVmVHRjYmx4dVVtVnVaR1Z5WlhJdWNISnZkRzkwZVhCbExuQmhjbUZuY21Gd2FDQTlJR1oxYm1OMGFXOXVLSFJsZUhRcElIdGNiaUFnY21WMGRYSnVJQ2M4Y0Q0bklDc2dkR1Y0ZENBcklDYzhMM0ErWEZ4dUp6dGNibjA3WEc1Y2JsSmxibVJsY21WeUxuQnliM1J2ZEhsd1pTNTBZV0pzWlNBOUlHWjFibU4wYVc5dUtHaGxZV1JsY2l3Z1ltOWtlU2tnZTF4dUlDQnlaWFIxY200Z0p6eDBZV0pzWlQ1Y1hHNG5YRzRnSUNBZ0t5QW5QSFJvWldGa1BseGNiaWRjYmlBZ0lDQXJJR2hsWVdSbGNseHVJQ0FnSUNzZ0p6d3ZkR2hsWVdRK1hGeHVKMXh1SUNBZ0lDc2dKengwWW05a2VUNWNYRzRuWEc0Z0lDQWdLeUJpYjJSNVhHNGdJQ0FnS3lBblBDOTBZbTlrZVQ1Y1hHNG5YRzRnSUNBZ0t5QW5QQzkwWVdKc1pUNWNYRzRuTzF4dWZUdGNibHh1VW1WdVpHVnlaWEl1Y0hKdmRHOTBlWEJsTG5SaFlteGxjbTkzSUQwZ1puVnVZM1JwYjI0b1kyOXVkR1Z1ZENrZ2UxeHVJQ0J5WlhSMWNtNGdKengwY2o1Y1hHNG5JQ3NnWTI5dWRHVnVkQ0FySUNjOEwzUnlQbHhjYmljN1hHNTlPMXh1WEc1U1pXNWtaWEpsY2k1d2NtOTBiM1I1Y0dVdWRHRmliR1ZqWld4c0lEMGdablZ1WTNScGIyNG9ZMjl1ZEdWdWRDd2dabXhoWjNNcElIdGNiaUFnZG1GeUlIUjVjR1VnUFNCbWJHRm5jeTVvWldGa1pYSWdQeUFuZEdnbklEb2dKM1JrSnp0Y2JpQWdkbUZ5SUhSaFp5QTlJR1pzWVdkekxtRnNhV2R1WEc0Z0lDQWdQeUFuUENjZ0t5QjBlWEJsSUNzZ0p5QnpkSGxzWlQxY0luUmxlSFF0WVd4cFoyNDZKeUFySUdac1lXZHpMbUZzYVdkdUlDc2dKMXdpUGlkY2JpQWdJQ0E2SUNjOEp5QXJJSFI1Y0dVZ0t5QW5QaWM3WEc0Z0lISmxkSFZ5YmlCMFlXY2dLeUJqYjI1MFpXNTBJQ3NnSnp3dkp5QXJJSFI1Y0dVZ0t5QW5QbHhjYmljN1hHNTlPMXh1WEc0dkx5QnpjR0Z1SUd4bGRtVnNJSEpsYm1SbGNtVnlYRzVTWlc1a1pYSmxjaTV3Y205MGIzUjVjR1V1YzNSeWIyNW5JRDBnWm5WdVkzUnBiMjRvZEdWNGRDa2dlMXh1SUNCeVpYUjFjbTRnSnp4emRISnZibWMrSnlBcklIUmxlSFFnS3lBblBDOXpkSEp2Ym1jK0p6dGNibjA3WEc1Y2JsSmxibVJsY21WeUxuQnliM1J2ZEhsd1pTNWxiU0E5SUdaMWJtTjBhVzl1S0hSbGVIUXBJSHRjYmlBZ2NtVjBkWEp1SUNjOFpXMCtKeUFySUhSbGVIUWdLeUFuUEM5bGJUNG5PMXh1ZlR0Y2JseHVVbVZ1WkdWeVpYSXVjSEp2ZEc5MGVYQmxMbU52WkdWemNHRnVJRDBnWm5WdVkzUnBiMjRvZEdWNGRDa2dlMXh1SUNCeVpYUjFjbTRnSnp4amIyUmxQaWNnS3lCMFpYaDBJQ3NnSnp3dlkyOWtaVDRuTzF4dWZUdGNibHh1VW1WdVpHVnlaWEl1Y0hKdmRHOTBlWEJsTG1KeUlEMGdablZ1WTNScGIyNG9LU0I3WEc0Z0lISmxkSFZ5YmlCMGFHbHpMbTl3ZEdsdmJuTXVlR2gwYld3Z1B5QW5QR0p5THo0bklEb2dKenhpY2o0bk8xeHVmVHRjYmx4dVVtVnVaR1Z5WlhJdWNISnZkRzkwZVhCbExtUmxiQ0E5SUdaMWJtTjBhVzl1S0hSbGVIUXBJSHRjYmlBZ2NtVjBkWEp1SUNjOFpHVnNQaWNnS3lCMFpYaDBJQ3NnSnp3dlpHVnNQaWM3WEc1OU8xeHVYRzVTWlc1a1pYSmxjaTV3Y205MGIzUjVjR1V1YkdsdWF5QTlJR1oxYm1OMGFXOXVLR2h5WldZc0lIUnBkR3hsTENCMFpYaDBLU0I3WEc0Z0lHbG1JQ2gwYUdsekxtOXdkR2x2Ym5NdWMyRnVhWFJwZW1VcElIdGNiaUFnSUNCMGNua2dlMXh1SUNBZ0lDQWdkbUZ5SUhCeWIzUWdQU0JrWldOdlpHVlZVa2xEYjIxd2IyNWxiblFvZFc1bGMyTmhjR1VvYUhKbFppa3BYRzRnSUNBZ0lDQWdJQzV5WlhCc1lXTmxLQzliWGx4Y2R6cGRMMmNzSUNjbktWeHVJQ0FnSUNBZ0lDQXVkRzlNYjNkbGNrTmhjMlVvS1R0Y2JpQWdJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnSnljN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNod2NtOTBMbWx1WkdWNFQyWW9KMnBoZG1GelkzSnBjSFE2SnlrZ1BUMDlJREFnZkh3Z2NISnZkQzVwYm1SbGVFOW1LQ2QyWW5OamNtbHdkRG9uS1NBOVBUMGdNQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJQ2NuTzF4dUlDQWdJSDFjYmlBZ2ZWeHVJQ0IyWVhJZ2IzVjBJRDBnSnp4aElHaHlaV1k5WENJbklDc2dhSEpsWmlBcklDZGNJaWM3WEc0Z0lHbG1JQ2gwYVhSc1pTa2dlMXh1SUNBZ0lHOTFkQ0FyUFNBbklIUnBkR3hsUFZ3aUp5QXJJSFJwZEd4bElDc2dKMXdpSnp0Y2JpQWdmVnh1SUNCdmRYUWdLejBnSno0bklDc2dkR1Y0ZENBcklDYzhMMkUrSnp0Y2JpQWdjbVYwZFhKdUlHOTFkRHRjYm4wN1hHNWNibEpsYm1SbGNtVnlMbkJ5YjNSdmRIbHdaUzVwYldGblpTQTlJR1oxYm1OMGFXOXVLR2h5WldZc0lIUnBkR3hsTENCMFpYaDBLU0I3WEc0Z0lIWmhjaUJ2ZFhRZ1BTQW5QR2x0WnlCemNtTTlYQ0luSUNzZ2FISmxaaUFySUNkY0lpQmhiSFE5WENJbklDc2dkR1Y0ZENBcklDZGNJaWM3WEc0Z0lHbG1JQ2gwYVhSc1pTa2dlMXh1SUNBZ0lHOTFkQ0FyUFNBbklIUnBkR3hsUFZ3aUp5QXJJSFJwZEd4bElDc2dKMXdpSnp0Y2JpQWdmVnh1SUNCdmRYUWdLejBnZEdocGN5NXZjSFJwYjI1ekxuaG9kRzFzSUQ4Z0p5OCtKeUE2SUNjK0p6dGNiaUFnY21WMGRYSnVJRzkxZER0Y2JuMDdYRzVjYmxKbGJtUmxjbVZ5TG5CeWIzUnZkSGx3WlM1MFpYaDBJRDBnWm5WdVkzUnBiMjRvZEdWNGRDa2dlMXh1SUNCeVpYUjFjbTRnZEdWNGREdGNibjA3WEc1Y2JpOHFLbHh1SUNvZ1VHRnljMmx1WnlBbUlFTnZiWEJwYkdsdVoxeHVJQ292WEc1Y2JtWjFibU4wYVc5dUlGQmhjbk5sY2lodmNIUnBiMjV6S1NCN1hHNGdJSFJvYVhNdWRHOXJaVzV6SUQwZ1cxMDdYRzRnSUhSb2FYTXVkRzlyWlc0Z1BTQnVkV3hzTzF4dUlDQjBhR2x6TG05d2RHbHZibk1nUFNCdmNIUnBiMjV6SUh4OElHMWhjbXRsWkM1a1pXWmhkV3gwY3p0Y2JpQWdkR2hwY3k1dmNIUnBiMjV6TG5KbGJtUmxjbVZ5SUQwZ2RHaHBjeTV2Y0hScGIyNXpMbkpsYm1SbGNtVnlJSHg4SUc1bGR5QlNaVzVrWlhKbGNqdGNiaUFnZEdocGN5NXlaVzVrWlhKbGNpQTlJSFJvYVhNdWIzQjBhVzl1Y3k1eVpXNWtaWEpsY2p0Y2JpQWdkR2hwY3k1eVpXNWtaWEpsY2k1dmNIUnBiMjV6SUQwZ2RHaHBjeTV2Y0hScGIyNXpPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGTjBZWFJwWXlCUVlYSnpaU0JOWlhSb2IyUmNiaUFxTDF4dVhHNVFZWEp6WlhJdWNHRnljMlVnUFNCbWRXNWpkR2x2YmloemNtTXNJRzl3ZEdsdmJuTXNJSEpsYm1SbGNtVnlLU0I3WEc0Z0lIWmhjaUJ3WVhKelpYSWdQU0J1WlhjZ1VHRnljMlZ5S0c5d2RHbHZibk1zSUhKbGJtUmxjbVZ5S1R0Y2JpQWdjbVYwZFhKdUlIQmhjbk5sY2k1d1lYSnpaU2h6Y21NcE8xeHVmVHRjYmx4dUx5b3FYRzRnS2lCUVlYSnpaU0JNYjI5d1hHNGdLaTljYmx4dVVHRnljMlZ5TG5CeWIzUnZkSGx3WlM1d1lYSnpaU0E5SUdaMWJtTjBhVzl1S0hOeVl5a2dlMXh1SUNCMGFHbHpMbWx1YkdsdVpTQTlJRzVsZHlCSmJteHBibVZNWlhobGNpaHpjbU11YkdsdWEzTXNJSFJvYVhNdWIzQjBhVzl1Y3l3Z2RHaHBjeTV5Wlc1a1pYSmxjaWs3WEc0Z0lIUm9hWE11ZEc5clpXNXpJRDBnYzNKakxuSmxkbVZ5YzJVb0tUdGNibHh1SUNCMllYSWdiM1YwSUQwZ0p5YzdYRzRnSUhkb2FXeGxJQ2gwYUdsekxtNWxlSFFvS1NrZ2UxeHVJQ0FnSUc5MWRDQXJQU0IwYUdsekxuUnZheWdwTzF4dUlDQjlYRzVjYmlBZ2NtVjBkWEp1SUc5MWREdGNibjA3WEc1Y2JpOHFLbHh1SUNvZ1RtVjRkQ0JVYjJ0bGJseHVJQ292WEc1Y2JsQmhjbk5sY2k1d2NtOTBiM1I1Y0dVdWJtVjRkQ0E5SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0J5WlhSMWNtNGdkR2hwY3k1MGIydGxiaUE5SUhSb2FYTXVkRzlyWlc1ekxuQnZjQ2dwTzF4dWZUdGNibHh1THlvcVhHNGdLaUJRY21WMmFXVjNJRTVsZUhRZ1ZHOXJaVzVjYmlBcUwxeHVYRzVRWVhKelpYSXVjSEp2ZEc5MGVYQmxMbkJsWldzZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ2NtVjBkWEp1SUhSb2FYTXVkRzlyWlc1elczUm9hWE11ZEc5clpXNXpMbXhsYm1kMGFDQXRJREZkSUh4OElEQTdYRzU5TzF4dVhHNHZLaXBjYmlBcUlGQmhjbk5sSUZSbGVIUWdWRzlyWlc1elhHNGdLaTljYmx4dVVHRnljMlZ5TG5CeWIzUnZkSGx3WlM1d1lYSnpaVlJsZUhRZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ2RtRnlJR0p2WkhrZ1BTQjBhR2x6TG5SdmEyVnVMblJsZUhRN1hHNWNiaUFnZDJocGJHVWdLSFJvYVhNdWNHVmxheWdwTG5SNWNHVWdQVDA5SUNkMFpYaDBKeWtnZTF4dUlDQWdJR0p2WkhrZ0t6MGdKMXhjYmljZ0t5QjBhR2x6TG01bGVIUW9LUzUwWlhoME8xeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlIUm9hWE11YVc1c2FXNWxMbTkxZEhCMWRDaGliMlI1S1R0Y2JuMDdYRzVjYmk4cUtseHVJQ29nVUdGeWMyVWdRM1Z5Y21WdWRDQlViMnRsYmx4dUlDb3ZYRzVjYmxCaGNuTmxjaTV3Y205MGIzUjVjR1V1ZEc5cklEMGdablZ1WTNScGIyNG9LU0I3WEc0Z0lITjNhWFJqYUNBb2RHaHBjeTUwYjJ0bGJpNTBlWEJsS1NCN1hHNGdJQ0FnWTJGelpTQW5jM0JoWTJVbk9pQjdYRzRnSUNBZ0lDQnlaWFIxY200Z0p5YzdYRzRnSUNBZ2ZWeHVJQ0FnSUdOaGMyVWdKMmh5SnpvZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjbVZ1WkdWeVpYSXVhSElvS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdZMkZ6WlNBbmFHVmhaR2x1WnljNklIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbkpsYm1SbGNtVnlMbWhsWVdScGJtY29YRzRnSUNBZ0lDQWdJSFJvYVhNdWFXNXNhVzVsTG05MWRIQjFkQ2gwYUdsekxuUnZhMlZ1TG5SbGVIUXBMRnh1SUNBZ0lDQWdJQ0IwYUdsekxuUnZhMlZ1TG1SbGNIUm9MRnh1SUNBZ0lDQWdJQ0IwYUdsekxuUnZhMlZ1TG5SbGVIUXBPMXh1SUNBZ0lIMWNiaUFnSUNCallYTmxJQ2RqYjJSbEp6b2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11Y21WdVpHVnlaWEl1WTI5a1pTaDBhR2x6TG5SdmEyVnVMblJsZUhRc1hHNGdJQ0FnSUNBZ0lIUm9hWE11ZEc5clpXNHViR0Z1Wnl4Y2JpQWdJQ0FnSUNBZ2RHaHBjeTUwYjJ0bGJpNWxjMk5oY0dWa0tUdGNiaUFnSUNCOVhHNGdJQ0FnWTJGelpTQW5kR0ZpYkdVbk9pQjdYRzRnSUNBZ0lDQjJZWElnYUdWaFpHVnlJRDBnSnlkY2JpQWdJQ0FnSUNBZ0xDQmliMlI1SUQwZ0p5ZGNiaUFnSUNBZ0lDQWdMQ0JwWEc0Z0lDQWdJQ0FnSUN3Z2NtOTNYRzRnSUNBZ0lDQWdJQ3dnWTJWc2JGeHVJQ0FnSUNBZ0lDQXNJR1pzWVdkelhHNGdJQ0FnSUNBZ0lDd2dhanRjYmx4dUlDQWdJQ0FnTHk4Z2FHVmhaR1Z5WEc0Z0lDQWdJQ0JqWld4c0lEMGdKeWM3WEc0Z0lDQWdJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2dkR2hwY3k1MGIydGxiaTVvWldGa1pYSXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ1pteGhaM01nUFNCN0lHaGxZV1JsY2pvZ2RISjFaU3dnWVd4cFoyNDZJSFJvYVhNdWRHOXJaVzR1WVd4cFoyNWJhVjBnZlR0Y2JpQWdJQ0FnSUNBZ1kyVnNiQ0FyUFNCMGFHbHpMbkpsYm1SbGNtVnlMblJoWW14bFkyVnNiQ2hjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbWx1YkdsdVpTNXZkWFJ3ZFhRb2RHaHBjeTUwYjJ0bGJpNW9aV0ZrWlhKYmFWMHBMRnh1SUNBZ0lDQWdJQ0FnSUhzZ2FHVmhaR1Z5T2lCMGNuVmxMQ0JoYkdsbmJqb2dkR2hwY3k1MGIydGxiaTVoYkdsbmJsdHBYU0I5WEc0Z0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCb1pXRmtaWElnS3owZ2RHaHBjeTV5Wlc1a1pYSmxjaTUwWVdKc1pYSnZkeWhqWld4c0tUdGNibHh1SUNBZ0lDQWdabTl5SUNocElEMGdNRHNnYVNBOElIUm9hWE11ZEc5clpXNHVZMlZzYkhNdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJQ0FnY205M0lEMGdkR2hwY3k1MGIydGxiaTVqWld4c2MxdHBYVHRjYmx4dUlDQWdJQ0FnSUNCalpXeHNJRDBnSnljN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYWlBOUlEQTdJR29nUENCeWIzY3ViR1Z1WjNSb095QnFLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmpaV3hzSUNzOUlIUm9hWE11Y21WdVpHVnlaWEl1ZEdGaWJHVmpaV3hzS0Z4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1cGJteHBibVV1YjNWMGNIVjBLSEp2ZDF0cVhTa3NYRzRnSUNBZ0lDQWdJQ0FnSUNCN0lHaGxZV1JsY2pvZ1ptRnNjMlVzSUdGc2FXZHVPaUIwYUdsekxuUnZhMlZ1TG1Gc2FXZHVXMnBkSUgxY2JpQWdJQ0FnSUNBZ0lDQXBPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ1ltOWtlU0FyUFNCMGFHbHpMbkpsYm1SbGNtVnlMblJoWW14bGNtOTNLR05sYkd3cE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjbVZ1WkdWeVpYSXVkR0ZpYkdVb2FHVmhaR1Z5TENCaWIyUjVLVHRjYmlBZ0lDQjlYRzRnSUNBZ1kyRnpaU0FuWW14dlkydHhkVzkwWlY5emRHRnlkQ2M2SUh0Y2JpQWdJQ0FnSUhaaGNpQmliMlI1SUQwZ0p5YzdYRzVjYmlBZ0lDQWdJSGRvYVd4bElDaDBhR2x6TG01bGVIUW9LUzUwZVhCbElDRTlQU0FuWW14dlkydHhkVzkwWlY5bGJtUW5LU0I3WEc0Z0lDQWdJQ0FnSUdKdlpIa2dLejBnZEdocGN5NTBiMnNvS1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjbVZ1WkdWeVpYSXVZbXh2WTJ0eGRXOTBaU2hpYjJSNUtUdGNiaUFnSUNCOVhHNGdJQ0FnWTJGelpTQW5iR2x6ZEY5emRHRnlkQ2M2SUh0Y2JpQWdJQ0FnSUhaaGNpQmliMlI1SUQwZ0p5ZGNiaUFnSUNBZ0lDQWdMQ0J2Y21SbGNtVmtJRDBnZEdocGN5NTBiMnRsYmk1dmNtUmxjbVZrTzF4dVhHNGdJQ0FnSUNCM2FHbHNaU0FvZEdocGN5NXVaWGgwS0NrdWRIbHdaU0FoUFQwZ0oyeHBjM1JmWlc1a0p5a2dlMXh1SUNBZ0lDQWdJQ0JpYjJSNUlDczlJSFJvYVhNdWRHOXJLQ2s3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxuSmxibVJsY21WeUxteHBjM1FvWW05a2VTd2diM0prWlhKbFpDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdOaGMyVWdKMnhwYzNSZmFYUmxiVjl6ZEdGeWRDYzZJSHRjYmlBZ0lDQWdJSFpoY2lCaWIyUjVJRDBnSnljN1hHNWNiaUFnSUNBZ0lIZG9hV3hsSUNoMGFHbHpMbTVsZUhRb0tTNTBlWEJsSUNFOVBTQW5iR2x6ZEY5cGRHVnRYMlZ1WkNjcElIdGNiaUFnSUNBZ0lDQWdZbTlrZVNBclBTQjBhR2x6TG5SdmEyVnVMblI1Y0dVZ1BUMDlJQ2QwWlhoMEoxeHVJQ0FnSUNBZ0lDQWdJRDhnZEdocGN5NXdZWEp6WlZSbGVIUW9LVnh1SUNBZ0lDQWdJQ0FnSURvZ2RHaHBjeTUwYjJzb0tUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11Y21WdVpHVnlaWEl1YkdsemRHbDBaVzBvWW05a2VTazdYRzRnSUNBZ2ZWeHVJQ0FnSUdOaGMyVWdKMnh2YjNObFgybDBaVzFmYzNSaGNuUW5PaUI3WEc0Z0lDQWdJQ0IyWVhJZ1ltOWtlU0E5SUNjbk8xeHVYRzRnSUNBZ0lDQjNhR2xzWlNBb2RHaHBjeTV1WlhoMEtDa3VkSGx3WlNBaFBUMGdKMnhwYzNSZmFYUmxiVjlsYm1RbktTQjdYRzRnSUNBZ0lDQWdJR0p2WkhrZ0t6MGdkR2hwY3k1MGIyc29LVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWNtVnVaR1Z5WlhJdWJHbHpkR2wwWlcwb1ltOWtlU2s3WEc0Z0lDQWdmVnh1SUNBZ0lHTmhjMlVnSjJoMGJXd25PaUI3WEc0Z0lDQWdJQ0IyWVhJZ2FIUnRiQ0E5SUNGMGFHbHpMblJ2YTJWdUxuQnlaU0FtSmlBaGRHaHBjeTV2Y0hScGIyNXpMbkJsWkdGdWRHbGpYRzRnSUNBZ0lDQWdJRDhnZEdocGN5NXBibXhwYm1VdWIzVjBjSFYwS0hSb2FYTXVkRzlyWlc0dWRHVjRkQ2xjYmlBZ0lDQWdJQ0FnT2lCMGFHbHpMblJ2YTJWdUxuUmxlSFE3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1eVpXNWtaWEpsY2k1b2RHMXNLR2gwYld3cE8xeHVJQ0FnSUgxY2JpQWdJQ0JqWVhObElDZHdZWEpoWjNKaGNHZ25PaUI3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1eVpXNWtaWEpsY2k1d1lYSmhaM0poY0dnb2RHaHBjeTVwYm14cGJtVXViM1YwY0hWMEtIUm9hWE11ZEc5clpXNHVkR1Y0ZENrcE8xeHVJQ0FnSUgxY2JpQWdJQ0JqWVhObElDZDBaWGgwSnpvZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjbVZ1WkdWeVpYSXVjR0Z5WVdkeVlYQm9LSFJvYVhNdWNHRnljMlZVWlhoMEtDa3BPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZUdGNibHh1THlvcVhHNGdLaUJJWld4d1pYSnpYRzRnS2k5Y2JseHVablZ1WTNScGIyNGdaWE5qWVhCbEtHaDBiV3dzSUdWdVkyOWtaU2tnZTF4dUlDQnlaWFIxY200Z2FIUnRiRnh1SUNBZ0lDNXlaWEJzWVdObEtDRmxibU52WkdVZ1B5QXZKaWcvSVNNL1hGeDNLenNwTDJjZ09pQXZKaTluTENBbkptRnRjRHNuS1Z4dUlDQWdJQzV5WlhCc1lXTmxLQzg4TDJjc0lDY21iSFE3SnlsY2JpQWdJQ0F1Y21Wd2JHRmpaU2d2UGk5bkxDQW5KbWQwT3ljcFhHNGdJQ0FnTG5KbGNHeGhZMlVvTDF3aUwyY3NJQ2NtY1hWdmREc25LVnh1SUNBZ0lDNXlaWEJzWVdObEtDOG5MMmNzSUNjbUl6TTVPeWNwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxYm1WelkyRndaU2hvZEcxc0tTQjdYRzRnSUhKbGRIVnliaUJvZEcxc0xuSmxjR3hoWTJVb0x5WW9XeU5jWEhkZEt5azdMMmNzSUdaMWJtTjBhVzl1S0Y4c0lHNHBJSHRjYmlBZ0lDQnVJRDBnYmk1MGIweHZkMlZ5UTJGelpTZ3BPMXh1SUNBZ0lHbG1JQ2h1SUQwOVBTQW5ZMjlzYjI0bktTQnlaWFIxY200Z0p6b25PMXh1SUNBZ0lHbG1JQ2h1TG1Ob1lYSkJkQ2d3S1NBOVBUMGdKeU1uS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYmk1amFHRnlRWFFvTVNrZ1BUMDlJQ2Q0SjF4dUlDQWdJQ0FnSUNBL0lGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9jR0Z5YzJWSmJuUW9iaTV6ZFdKemRISnBibWNvTWlrc0lERTJLU2xjYmlBZ0lDQWdJQ0FnT2lCVGRISnBibWN1Wm5KdmJVTm9ZWEpEYjJSbEtDdHVMbk4xWW5OMGNtbHVaeWd4S1NrN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQW5KenRjYmlBZ2ZTazdYRzU5WEc1Y2JtWjFibU4wYVc5dUlISmxjR3hoWTJVb2NtVm5aWGdzSUc5d2RDa2dlMXh1SUNCeVpXZGxlQ0E5SUhKbFoyVjRMbk52ZFhKalpUdGNiaUFnYjNCMElEMGdiM0IwSUh4OElDY25PMXh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnYzJWc1ppaHVZVzFsTENCMllXd3BJSHRjYmlBZ0lDQnBaaUFvSVc1aGJXVXBJSEpsZEhWeWJpQnVaWGNnVW1WblJYaHdLSEpsWjJWNExDQnZjSFFwTzF4dUlDQWdJSFpoYkNBOUlIWmhiQzV6YjNWeVkyVWdmSHdnZG1Gc08xeHVJQ0FnSUhaaGJDQTlJSFpoYkM1eVpYQnNZV05sS0M4b1hueGJYbHhjVzEwcFhGeGVMMmNzSUNja01TY3BPMXh1SUNBZ0lISmxaMlY0SUQwZ2NtVm5aWGd1Y21Wd2JHRmpaU2h1WVcxbExDQjJZV3dwTzF4dUlDQWdJSEpsZEhWeWJpQnpaV3htTzF4dUlDQjlPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnViMjl3S0NrZ2UzMWNibTV2YjNBdVpYaGxZeUE5SUc1dmIzQTdYRzVjYm1aMWJtTjBhVzl1SUcxbGNtZGxLRzlpYWlrZ2UxeHVJQ0IyWVhJZ2FTQTlJREZjYmlBZ0lDQXNJSFJoY21kbGRGeHVJQ0FnSUN3Z2EyVjVPMXh1WEc0Z0lHWnZjaUFvT3lCcElEd2dZWEpuZFcxbGJuUnpMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZEdGeVoyVjBJRDBnWVhKbmRXMWxiblJ6VzJsZE8xeHVJQ0FnSUdadmNpQW9hMlY1SUdsdUlIUmhjbWRsZENrZ2UxeHVJQ0FnSUNBZ2FXWWdLRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2gwWVhKblpYUXNJR3RsZVNrcElIdGNiaUFnSUNBZ0lDQWdiMkpxVzJ0bGVWMGdQU0IwWVhKblpYUmJhMlY1WFR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnYjJKcU8xeHVmVnh1WEc1Y2JpOHFLbHh1SUNvZ1RXRnlhMlZrWEc0Z0tpOWNibHh1Wm5WdVkzUnBiMjRnYldGeWEyVmtLSE55WXl3Z2IzQjBMQ0JqWVd4c1ltRmpheWtnZTF4dUlDQnBaaUFvWTJGc2JHSmhZMnNnZkh3Z2RIbHdaVzltSUc5d2RDQTlQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUdsbUlDZ2hZMkZzYkdKaFkyc3BJSHRjYmlBZ0lDQWdJR05oYkd4aVlXTnJJRDBnYjNCME8xeHVJQ0FnSUNBZ2IzQjBJRDBnYm5Wc2JEdGNiaUFnSUNCOVhHNWNiaUFnSUNCdmNIUWdQU0J0WlhKblpTaDdmU3dnYldGeWEyVmtMbVJsWm1GMWJIUnpMQ0J2Y0hRZ2ZId2dlMzBwTzF4dVhHNGdJQ0FnZG1GeUlHaHBaMmhzYVdkb2RDQTlJRzl3ZEM1b2FXZG9iR2xuYUhSY2JpQWdJQ0FnSUN3Z2RHOXJaVzV6WEc0Z0lDQWdJQ0FzSUhCbGJtUnBibWRjYmlBZ0lDQWdJQ3dnYVNBOUlEQTdYRzVjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnZEc5clpXNXpJRDBnVEdWNFpYSXViR1Y0S0hOeVl5d2diM0IwS1Z4dUlDQWdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJqWVd4c1ltRmpheWhsS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J3Wlc1a2FXNW5JRDBnZEc5clpXNXpMbXhsYm1kMGFEdGNibHh1SUNBZ0lIWmhjaUJrYjI1bElEMGdablZ1WTNScGIyNG9aWEp5S1NCN1hHNGdJQ0FnSUNCcFppQW9aWEp5S1NCN1hHNGdJQ0FnSUNBZ0lHOXdkQzVvYVdkb2JHbG5hSFFnUFNCb2FXZG9iR2xuYUhRN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCallXeHNZbUZqYXlobGNuSXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0IyWVhJZ2IzVjBPMXh1WEc0Z0lDQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0lDQnZkWFFnUFNCUVlYSnpaWEl1Y0dGeWMyVW9kRzlyWlc1ekxDQnZjSFFwTzF4dUlDQWdJQ0FnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUNBZ0lDQmxjbklnUFNCbE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnZjSFF1YUdsbmFHeHBaMmgwSUQwZ2FHbG5hR3hwWjJoME8xeHVYRzRnSUNBZ0lDQnlaWFIxY200Z1pYSnlYRzRnSUNBZ0lDQWdJRDhnWTJGc2JHSmhZMnNvWlhKeUtWeHVJQ0FnSUNBZ0lDQTZJR05oYkd4aVlXTnJLRzUxYkd3c0lHOTFkQ2s3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJR2xtSUNnaGFHbG5hR3hwWjJoMElIeDhJR2hwWjJoc2FXZG9kQzVzWlc1bmRHZ2dQQ0F6S1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWkc5dVpTZ3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHUmxiR1YwWlNCdmNIUXVhR2xuYUd4cFoyaDBPMXh1WEc0Z0lDQWdhV1lnS0NGd1pXNWthVzVuS1NCeVpYUjFjbTRnWkc5dVpTZ3BPMXh1WEc0Z0lDQWdabTl5SUNnN0lHa2dQQ0IwYjJ0bGJuTXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNobWRXNWpkR2x2YmloMGIydGxiaWtnZTF4dUlDQWdJQ0FnSUNCcFppQW9kRzlyWlc0dWRIbHdaU0FoUFQwZ0oyTnZaR1VuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlDMHRjR1Z1WkdsdVp5QjhmQ0JrYjI1bEtDazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR2hwWjJoc2FXZG9kQ2gwYjJ0bGJpNTBaWGgwTENCMGIydGxiaTVzWVc1bkxDQm1kVzVqZEdsdmJpaGxjbklzSUdOdlpHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9aWEp5S1NCeVpYUjFjbTRnWkc5dVpTaGxjbklwTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2hqYjJSbElEMDlJRzUxYkd3Z2ZId2dZMjlrWlNBOVBUMGdkRzlyWlc0dWRHVjRkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlDMHRjR1Z1WkdsdVp5QjhmQ0JrYjI1bEtDazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lIUnZhMlZ1TG5SbGVIUWdQU0JqYjJSbE8xeHVJQ0FnSUNBZ0lDQWdJSFJ2YTJWdUxtVnpZMkZ3WldRZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNBZ0lDMHRjR1Z1WkdsdVp5QjhmQ0JrYjI1bEtDazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnZlNrb2RHOXJaVzV6VzJsZEtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTQ3WEc0Z0lIMWNiaUFnZEhKNUlIdGNiaUFnSUNCcFppQW9iM0IwS1NCdmNIUWdQU0J0WlhKblpTaDdmU3dnYldGeWEyVmtMbVJsWm1GMWJIUnpMQ0J2Y0hRcE8xeHVJQ0FnSUhKbGRIVnliaUJRWVhKelpYSXVjR0Z5YzJVb1RHVjRaWEl1YkdWNEtITnlZeXdnYjNCMEtTd2diM0IwS1R0Y2JpQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJR1V1YldWemMyRm5aU0FyUFNBblhGeHVVR3hsWVhObElISmxjRzl5ZENCMGFHbHpJSFJ2SUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5amFHcHFMMjFoY210bFpDNG5PMXh1SUNBZ0lHbG1JQ2dvYjNCMElIeDhJRzFoY210bFpDNWtaV1poZFd4MGN5a3VjMmxzWlc1MEtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z0p6eHdQa0Z1SUdWeWNtOXlJRzlqWTNWeVpXUTZQQzl3UGp4d2NtVStKMXh1SUNBZ0lDQWdJQ0FySUdWelkyRndaU2hsTG0xbGMzTmhaMlVnS3lBbkp5d2dkSEoxWlNsY2JpQWdJQ0FnSUNBZ0t5QW5QQzl3Y21VK0p6dGNiaUFnSUNCOVhHNGdJQ0FnZEdoeWIzY2daVHRjYmlBZ2ZWeHVmVnh1WEc0dktpcGNiaUFxSUU5d2RHbHZibk5jYmlBcUwxeHVYRzV0WVhKclpXUXViM0IwYVc5dWN5QTlYRzV0WVhKclpXUXVjMlYwVDNCMGFXOXVjeUE5SUdaMWJtTjBhVzl1S0c5d2RDa2dlMXh1SUNCdFpYSm5aU2h0WVhKclpXUXVaR1ZtWVhWc2RITXNJRzl3ZENrN1hHNGdJSEpsZEhWeWJpQnRZWEpyWldRN1hHNTlPMXh1WEc1dFlYSnJaV1F1WkdWbVlYVnNkSE1nUFNCN1hHNGdJR2RtYlRvZ2RISjFaU3hjYmlBZ2RHRmliR1Z6T2lCMGNuVmxMRnh1SUNCaWNtVmhhM002SUdaaGJITmxMRnh1SUNCd1pXUmhiblJwWXpvZ1ptRnNjMlVzWEc0Z0lITmhibWwwYVhwbE9pQm1ZV3h6WlN4Y2JpQWdjMkZ1YVhScGVtVnlPaUJ1ZFd4c0xGeHVJQ0J0WVc1bmJHVTZJSFJ5ZFdVc1hHNGdJSE50WVhKMFRHbHpkSE02SUdaaGJITmxMRnh1SUNCemFXeGxiblE2SUdaaGJITmxMRnh1SUNCb2FXZG9iR2xuYUhRNklHNTFiR3dzWEc0Z0lHeGhibWRRY21WbWFYZzZJQ2RzWVc1bkxTY3NYRzRnSUhOdFlYSjBlWEJoYm5Sek9pQm1ZV3h6WlN4Y2JpQWdhR1ZoWkdWeVVISmxabWw0T2lBbkp5eGNiaUFnY21WdVpHVnlaWEk2SUc1bGR5QlNaVzVrWlhKbGNpeGNiaUFnZUdoMGJXdzZJR1poYkhObFhHNTlPMXh1WEc0dktpcGNiaUFxSUVWNGNHOXpaVnh1SUNvdlhHNWNibTFoY210bFpDNVFZWEp6WlhJZ1BTQlFZWEp6WlhJN1hHNXRZWEpyWldRdWNHRnljMlZ5SUQwZ1VHRnljMlZ5TG5CaGNuTmxPMXh1WEc1dFlYSnJaV1F1VW1WdVpHVnlaWElnUFNCU1pXNWtaWEpsY2p0Y2JseHViV0Z5YTJWa0xreGxlR1Z5SUQwZ1RHVjRaWEk3WEc1dFlYSnJaV1F1YkdWNFpYSWdQU0JNWlhobGNpNXNaWGc3WEc1Y2JtMWhjbXRsWkM1SmJteHBibVZNWlhobGNpQTlJRWx1YkdsdVpVeGxlR1Z5TzF4dWJXRnlhMlZrTG1sdWJHbHVaVXhsZUdWeUlEMGdTVzVzYVc1bFRHVjRaWEl1YjNWMGNIVjBPMXh1WEc1dFlYSnJaV1F1Y0dGeWMyVWdQU0J0WVhKclpXUTdYRzVjYm1sbUlDaDBlWEJsYjJZZ2JXOWtkV3hsSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0oyOWlhbVZqZENjcElIdGNiaUFnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0J0WVhKclpXUTdYRzU5SUdWc2MyVWdhV1lnS0hSNWNHVnZaaUJrWldacGJtVWdQVDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdaR1ZtYVc1bExtRnRaQ2tnZTF4dUlDQmtaV1pwYm1Vb1puVnVZM1JwYjI0b0tTQjdJSEpsZEhWeWJpQnRZWEpyWldRN0lIMHBPMXh1ZlNCbGJITmxJSHRjYmlBZ2RHaHBjeTV0WVhKclpXUWdQU0J0WVhKclpXUTdYRzU5WEc1Y2JuMHBMbU5oYkd3b1puVnVZM1JwYjI0b0tTQjdYRzRnSUhKbGRIVnliaUIwYUdseklIeDhJQ2gwZVhCbGIyWWdkMmx1Wkc5M0lDRTlQU0FuZFc1a1pXWnBibVZrSnlBL0lIZHBibVJ2ZHlBNklHZHNiMkpoYkNrN1hHNTlLQ2twTzF4dUlsMTkiLCJcbnZhciBlbnYgPSByZXF1aXJlKCcuL2Vudi5qcycpO1xudmFyIExleGVyID0gcmVxdWlyZShcIi4vcGFyc2VyL0xleGVyLmpzXCIpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL3BhcnNlci9QYXJzZXIuanNcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4vY29uZmlnLmpzXCIpO1xudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL2hlbHBlci9leHRlbmQuanMnKTtcbmlmKGVudi5icm93c2VyKXtcbiAgdmFyIGNvbWJpbmUgPSByZXF1aXJlKCcuL2hlbHBlci9jb21iaW5lLmpzJyk7XG4gIHZhciBkb20gPSByZXF1aXJlKFwiLi9kb20uanNcIik7XG4gIHZhciB3YWxrZXJzID0gcmVxdWlyZSgnLi93YWxrZXJzLmpzJyk7XG4gIHZhciBHcm91cCA9IHJlcXVpcmUoJy4vZ3JvdXAuanMnKTtcbn1cbnZhciBldmVudHMgPSByZXF1aXJlKCcuL2hlbHBlci9ldmVudC5qcycpO1xudmFyIFdhdGNoZXIgPSByZXF1aXJlKCcuL2hlbHBlci93YXRjaGVyLmpzJyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL2hlbHBlci9wYXJzZS5qcycpO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4vaGVscGVyL2ZpbHRlci5qcycpO1xudmFyIGRvYyA9IGRvbS5kb2M7XG5cblxuLyoqXG4qIGBSZWd1bGFyYCBpcyByZWd1bGFyanMncyBOYW1lU3BhY2UgYW5kIEJhc2VDbGFzcy4gRXZlcnkgQ29tcG9uZW50IGlzIGluaGVyaXRlZCBmcm9tIGl0XG4qIFxuKiBAY2xhc3MgUmVndWxhclxuKiBAbW9kdWxlIFJlZ3VsYXJcbiogQGNvbnN0cnVjdG9yXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHNwZWNpZmljYXRpb24gb2YgdGhlIGNvbXBvbmVudFxuKi9cbnZhciBSZWd1bGFyID0gZnVuY3Rpb24oZGVmaW5pdGlvbiwgb3B0aW9ucyl7XG4gIHZhciBwcmV2UnVubmluZyA9IGVudi5pc1J1bm5pbmc7XG4gIGVudi5pc1J1bm5pbmcgPSB0cnVlO1xuICB2YXIgbm9kZSwgdGVtcGxhdGU7XG5cbiAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24gfHwge307XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGRlZmluaXRpb24uZGF0YSA9IGRlZmluaXRpb24uZGF0YSB8fCB7fTtcbiAgZGVmaW5pdGlvbi5jb21wdXRlZCA9IGRlZmluaXRpb24uY29tcHV0ZWQgfHwge307XG4gIGRlZmluaXRpb24uZXZlbnRzID0gZGVmaW5pdGlvbi5ldmVudHMgfHwge307XG4gIGlmKHRoaXMuZGF0YSkgXy5leHRlbmQoZGVmaW5pdGlvbi5kYXRhLCB0aGlzLmRhdGEpO1xuICBpZih0aGlzLmNvbXB1dGVkKSBfLmV4dGVuZChkZWZpbml0aW9uLmNvbXB1dGVkLCB0aGlzLmNvbXB1dGVkKTtcbiAgaWYodGhpcy5ldmVudHMpIF8uZXh0ZW5kKGRlZmluaXRpb24uZXZlbnRzLCB0aGlzLmV2ZW50cyk7XG5cbiAgXy5leHRlbmQodGhpcywgZGVmaW5pdGlvbiwgdHJ1ZSk7XG4gIGlmKHRoaXMuJHBhcmVudCl7XG4gICAgIHRoaXMuJHBhcmVudC5fYXBwZW5kKHRoaXMpO1xuICB9XG4gIHRoaXMuX2NoaWxkcmVuID0gW107XG4gIHRoaXMuJHJlZnMgPSB7fTtcblxuICB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG5cbiAgLy8gdGVtcGxhdGUgaXMgYSBzdHJpbmcgKGxlbiA8IDE2KS4gd2Ugd2lsbCBmaW5kIGl0IGNvbnRhaW5lciBmaXJzdFxuICBpZigodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyAmJiB0ZW1wbGF0ZS5sZW5ndGggPCAxNikgJiYgKG5vZGUgPSBkb20uZmluZCh0ZW1wbGF0ZSkpKSB7XG4gICAgdGVtcGxhdGUgPSBub2RlLmlubmVySFRNTDtcbiAgfVxuICAvLyBpZiB0ZW1wbGF0ZSBpcyBhIHhtbFxuICBpZih0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZS5ub2RlVHlwZSkgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5pbm5lckhUTUw7XG4gIGlmKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHRoaXMudGVtcGxhdGUgPSBuZXcgUGFyc2VyKHRlbXBsYXRlKS5wYXJzZSgpO1xuXG4gIHRoaXMuY29tcHV0ZWQgPSBoYW5kbGVDb21wdXRlZCh0aGlzLmNvbXB1dGVkKTtcbiAgdGhpcy4kcm9vdCA9IHRoaXMuJHJvb3QgfHwgdGhpcztcbiAgLy8gaWYgaGF2ZSBldmVudHNcbiAgaWYodGhpcy5ldmVudHMpe1xuICAgIHRoaXMuJG9uKHRoaXMuZXZlbnRzKTtcbiAgfVxuICB0aGlzLiRlbWl0KFwiJGNvbmZpZ1wiKTtcbiAgdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcodGhpcy5kYXRhKTtcbiAgaWYodGhpcy5fYm9keSAmJiB0aGlzLl9ib2R5Lmxlbmd0aCl7XG4gICAgdGhpcy4kYm9keSA9IF8uZ2V0Q29tcGlsZUZuKHRoaXMuX2JvZHksIHRoaXMuJHBhcmVudCwge1xuICAgICAgb3V0ZXI6IHRoaXMsXG4gICAgICBuYW1lc3BhY2U6IG9wdGlvbnMubmFtZXNwYWNlLFxuICAgICAgZXh0cmE6IG9wdGlvbnMuZXh0cmEsXG4gICAgICByZWNvcmQ6IHRydWVcbiAgICB9KVxuICAgIHRoaXMuX2JvZHkgPSBudWxsO1xuICB9XG4gIC8vIGhhbmRsZSBjb21wdXRlZFxuICBpZih0ZW1wbGF0ZSl7XG4gICAgdGhpcy5ncm91cCA9IHRoaXMuJGNvbXBpbGUodGhpcy50ZW1wbGF0ZSwge25hbWVzcGFjZTogb3B0aW9ucy5uYW1lc3BhY2V9KTtcbiAgICBjb21iaW5lLm5vZGUodGhpcyk7XG4gIH1cblxuXG4gIGlmKCF0aGlzLiRwYXJlbnQpIHRoaXMuJHVwZGF0ZSgpO1xuICB0aGlzLiRyZWFkeSA9IHRydWU7XG4gIHRoaXMuJGVtaXQoXCIkaW5pdFwiKTtcbiAgaWYoIHRoaXMuaW5pdCApIHRoaXMuaW5pdCh0aGlzLmRhdGEpO1xuXG4gIC8vIEBUT0RPOiByZW1vdmUsIG1heWJlICwgdGhlcmUgaXMgbm8gbmVlZCB0byB1cGRhdGUgYWZ0ZXIgaW5pdDsgXG4gIC8vIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpIHRoaXMuJHVwZGF0ZSgpO1xuICBlbnYuaXNSdW5uaW5nID0gcHJldlJ1bm5pbmc7XG5cbiAgLy8gY2hpbGRyZW4gaXMgbm90IHJlcXVpcmVkO1xufVxuXG5cbndhbGtlcnMgJiYgKHdhbGtlcnMuUmVndWxhciA9IFJlZ3VsYXIpO1xuXG5cbi8vIGRlc2NyaXB0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAxLiBSZWd1bGFyIGFuZCBkZXJpdmVkIENsYXNzIHVzZSBzYW1lIGZpbHRlclxuXy5leHRlbmQoUmVndWxhciwge1xuICAvLyBwcml2YXRlIGRhdGEgc3R1ZmZcbiAgX2RpcmVjdGl2ZXM6IHsgX19yZWdleHBfXzpbXSB9LFxuICBfcGx1Z2luczoge30sXG4gIF9wcm90b0luaGVyaXRDYWNoZTogWyAnZGlyZWN0aXZlJywgJ3VzZSddICxcbiAgX19hZnRlcl9fOiBmdW5jdGlvbihzdXByLCBvKSB7XG5cbiAgICB2YXIgdGVtcGxhdGU7XG4gICAgdGhpcy5fX2FmdGVyX18gPSBzdXByLl9fYWZ0ZXJfXztcblxuICAgIC8vIHVzZSBuYW1lIG1ha2UgdGhlIGNvbXBvbmVudCBnbG9iYWwuXG4gICAgaWYoby5uYW1lKSBSZWd1bGFyLmNvbXBvbmVudChvLm5hbWUsIHRoaXMpO1xuICAgIC8vIHRoaXMucHJvdG90eXBlLnRlbXBsYXRlID0gZG9tLmluaXRUZW1wbGF0ZShvKVxuICAgIGlmKHRlbXBsYXRlID0gby50ZW1wbGF0ZSl7XG4gICAgICB2YXIgbm9kZSwgbmFtZTtcbiAgICAgIGlmKCB0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnICYmIHRlbXBsYXRlLmxlbmd0aCA8IDE2ICYmICggbm9kZSA9IGRvbS5maW5kKCB0ZW1wbGF0ZSApKSApe1xuICAgICAgICB0ZW1wbGF0ZSA9IG5vZGUuaW5uZXJIVE1MO1xuICAgICAgICBpZihuYW1lID0gZG9tLmF0dHIobm9kZSwgJ25hbWUnKSkgUmVndWxhci5jb21wb25lbnQobmFtZSwgdGhpcyk7XG4gICAgICB9XG5cbiAgICAgIGlmKHRlbXBsYXRlLm5vZGVUeXBlKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLmlubmVySFRNTDtcblxuICAgICAgaWYodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyl7XG4gICAgICAgIHRoaXMucHJvdG90eXBlLnRlbXBsYXRlID0gbmV3IFBhcnNlcih0ZW1wbGF0ZSkucGFyc2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihvLmNvbXB1dGVkKSB0aGlzLnByb3RvdHlwZS5jb21wdXRlZCA9IGhhbmRsZUNvbXB1dGVkKG8uY29tcHV0ZWQpO1xuICAgIC8vIGluaGVyaXQgZGlyZWN0aXZlIGFuZCBvdGhlciBjb25maWcgZnJvbSBzdXByXG4gICAgUmVndWxhci5faW5oZXJpdENvbmZpZyh0aGlzLCBzdXByKTtcblxuICB9LFxuICAvKipcbiAgICogRGVmaW5lIGEgZGlyZWN0aXZlXG4gICAqXG4gICAqIEBtZXRob2QgZGlyZWN0aXZlXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ29weSBvZiAuLi5cbiAgICovICBcbiAgZGlyZWN0aXZlOiBmdW5jdGlvbihuYW1lLCBjZmcpe1xuXG4gICAgaWYoXy50eXBlT2YobmFtZSkgPT09IFwib2JqZWN0XCIpe1xuICAgICAgZm9yKHZhciBrIGluIG5hbWUpe1xuICAgICAgICBpZihuYW1lLmhhc093blByb3BlcnR5KGspKSB0aGlzLmRpcmVjdGl2ZShrLCBuYW1lW2tdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IF8udHlwZU9mKG5hbWUpO1xuICAgIHZhciBkaXJlY3RpdmVzID0gdGhpcy5fZGlyZWN0aXZlcywgZGlyZWN0aXZlO1xuICAgIGlmKGNmZyA9PSBudWxsKXtcbiAgICAgIGlmKCB0eXBlID09PSBcInN0cmluZ1wiICYmIChkaXJlY3RpdmUgPSBkaXJlY3RpdmVzW25hbWVdKSApIHJldHVybiBkaXJlY3RpdmU7XG4gICAgICBlbHNle1xuICAgICAgICB2YXIgcmVnZXhwID0gZGlyZWN0aXZlcy5fX3JlZ2V4cF9fO1xuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSByZWdleHAubGVuZ3RoOyBpIDwgbGVuIDsgaSsrKXtcbiAgICAgICAgICBkaXJlY3RpdmUgPSByZWdleHBbaV07XG4gICAgICAgICAgdmFyIHRlc3QgPSBkaXJlY3RpdmUucmVnZXhwLnRlc3QobmFtZSk7XG4gICAgICAgICAgaWYodGVzdCkgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYodHlwZW9mIGNmZyA9PT0gJ2Z1bmN0aW9uJykgY2ZnID0geyBsaW5rOiBjZmcgfSBcbiAgICBpZih0eXBlID09PSAnc3RyaW5nJykgZGlyZWN0aXZlc1tuYW1lXSA9IGNmZztcbiAgICBlbHNlIGlmKHR5cGUgPT09ICdyZWdleHAnKXtcbiAgICAgIGNmZy5yZWdleHAgPSBuYW1lO1xuICAgICAgZGlyZWN0aXZlcy5fX3JlZ2V4cF9fLnB1c2goY2ZnKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBwbHVnaW46IGZ1bmN0aW9uKG5hbWUsIGZuKXtcbiAgICB2YXIgcGx1Z2lucyA9IHRoaXMuX3BsdWdpbnM7XG4gICAgaWYoZm4gPT0gbnVsbCkgcmV0dXJuIHBsdWdpbnNbbmFtZV07XG4gICAgcGx1Z2luc1tuYW1lXSA9IGZuO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICB1c2U6IGZ1bmN0aW9uKGZuKXtcbiAgICBpZih0eXBlb2YgZm4gPT09IFwic3RyaW5nXCIpIGZuID0gUmVndWxhci5wbHVnaW4oZm4pO1xuICAgIGlmKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdGhpcztcbiAgICBmbih0aGlzLCBSZWd1bGFyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gY29uZmlnIHRoZSBSZWd1bGFyanMncyBnbG9iYWxcbiAgY29uZmlnOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgdmFyIG5lZWRHZW5MZXhlciA9IGZhbHNlO1xuICAgIGlmKHR5cGVvZiBuYW1lID09PSBcIm9iamVjdFwiKXtcbiAgICAgIGZvcih2YXIgaSBpbiBuYW1lKXtcbiAgICAgICAgLy8gaWYgeW91IGNvbmZpZ1xuICAgICAgICBpZiggaSA9PT1cIkVORFwiIHx8IGk9PT0nQkVHSU4nICkgIG5lZWRHZW5MZXhlciA9IHRydWU7XG4gICAgICAgIGNvbmZpZ1tpXSA9IG5hbWVbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmKG5lZWRHZW5MZXhlcikgTGV4ZXIuc2V0dXAoKTtcbiAgfSxcbiAgZXhwcmVzc2lvbjogcGFyc2UuZXhwcmVzc2lvbixcbiAgUGFyc2VyOiBQYXJzZXIsXG4gIExleGVyOiBMZXhlcixcbiAgX2FkZFByb3RvSW5oZXJpdENhY2hlOiBmdW5jdGlvbihuYW1lLCB0cmFuc2Zvcm0pe1xuICAgIGlmKCBBcnJheS5pc0FycmF5KCBuYW1lICkgKXtcbiAgICAgIHJldHVybiBuYW1lLmZvckVhY2goUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUpO1xuICAgIH1cbiAgICB2YXIgY2FjaGVLZXkgPSBcIl9cIiArIG5hbWUgKyBcInNcIlxuICAgIFJlZ3VsYXIuX3Byb3RvSW5oZXJpdENhY2hlLnB1c2gobmFtZSlcbiAgICBSZWd1bGFyW2NhY2hlS2V5XSA9IHt9O1xuICAgIGlmKFJlZ3VsYXJbbmFtZV0pIHJldHVybjtcbiAgICBSZWd1bGFyW25hbWVdID0gZnVuY3Rpb24oa2V5LCBjZmcpe1xuICAgICAgdmFyIGNhY2hlID0gdGhpc1tjYWNoZUtleV07XG5cbiAgICAgIGlmKHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIpe1xuICAgICAgICBmb3IodmFyIGkgaW4ga2V5KXtcbiAgICAgICAgICBpZihrZXkuaGFzT3duUHJvcGVydHkoaSkpIHRoaXNbbmFtZV0oaSwga2V5W2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGlmKGNmZyA9PSBudWxsKSByZXR1cm4gY2FjaGVba2V5XTtcbiAgICAgIGNhY2hlW2tleV0gPSB0cmFuc2Zvcm0/IHRyYW5zZm9ybShjZmcpIDogY2ZnO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LFxuICBfaW5oZXJpdENvbmZpZzogZnVuY3Rpb24oc2VsZiwgc3Vwcil7XG5cbiAgICAvLyBwcm90b3R5cGUgaW5oZXJpdCBzb21lIFJlZ3VsYXIgcHJvcGVydHlcbiAgICAvLyBzbyBldmVyeSBDb21wb25lbnQgd2lsbCBoYXZlIG93biBjb250YWluZXIgdG8gc2VydmUgZGlyZWN0aXZlLCBmaWx0ZXIgZXRjLi5cbiAgICB2YXIgZGVmcyA9IFJlZ3VsYXIuX3Byb3RvSW5oZXJpdENhY2hlO1xuICAgIHZhciBrZXlzID0gXy5zbGljZShkZWZzKTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgIHNlbGZba2V5XSA9IHN1cHJba2V5XTtcbiAgICAgIHZhciBjYWNoZUtleSA9ICdfJyArIGtleSArICdzJztcbiAgICAgIGlmKHN1cHJbY2FjaGVLZXldKSBzZWxmW2NhY2hlS2V5XSA9IF8uY3JlYXRlT2JqZWN0KHN1cHJbY2FjaGVLZXldKTtcbiAgICB9KVxuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbn0pO1xuXG5leHRlbmQoUmVndWxhcik7XG5cblJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiY29tcG9uZW50XCIpXG5cblJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiZmlsdGVyXCIsIGZ1bmN0aW9uKGNmZyl7XG4gIHJldHVybiB0eXBlb2YgY2ZnID09PSBcImZ1bmN0aW9uXCI/IHtnZXQ6IGNmZ306IGNmZztcbn0pXG5cblxuZXZlbnRzLm1peFRvKFJlZ3VsYXIpO1xuV2F0Y2hlci5taXhUbyhSZWd1bGFyKTtcblxuUmVndWxhci5pbXBsZW1lbnQoe1xuICBpbml0OiBmdW5jdGlvbigpe30sXG4gIGNvbmZpZzogZnVuY3Rpb24oKXt9LFxuICBkZXN0cm95OiBmdW5jdGlvbigpe1xuICAgIC8vIGRlc3Ryb3kgZXZlbnQgd29udCBwcm9wZ2F0aW9uO1xuICAgIHRoaXMuJGVtaXQoXCIkZGVzdHJveVwiKTtcbiAgICB0aGlzLmdyb3VwICYmIHRoaXMuZ3JvdXAuZGVzdHJveSh0cnVlKTtcbiAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBudWxsO1xuICAgIHRoaXMuX3dhdGNoZXJzID0gbnVsbDtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgaWYocGFyZW50KXtcbiAgICAgIHZhciBpbmRleCA9IHBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIHBhcmVudC5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEpO1xuICAgIH1cbiAgICB0aGlzLiRwYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuJHJvb3QgPSBudWxsO1xuICAgIHRoaXMuX2hhbmRsZXMgPSBudWxsO1xuICAgIHRoaXMuJHJlZnMgPSBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb21waWxlIGEgYmxvY2sgYXN0IDsgcmV0dXJuIGEgZ3JvdXA7XG4gICAqIEBwYXJhbSAge0FycmF5fSBwYXJzZWQgYXN0XG4gICAqIEBwYXJhbSAge1t0eXBlXX0gcmVjb3JkXG4gICAqIEByZXR1cm4ge1t0eXBlXX1cbiAgICovXG4gICRjb21waWxlOiBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmKHR5cGVvZiBhc3QgPT09ICdzdHJpbmcnKXtcbiAgICAgIGFzdCA9IG5ldyBQYXJzZXIoYXN0KS5wYXJzZSgpXG4gICAgfVxuICAgIHZhciBwcmVFeHQgPSB0aGlzLl9fZXh0X18sXG4gICAgICByZWNvcmQgPSBvcHRpb25zLnJlY29yZCwgXG4gICAgICByZWNvcmRzO1xuXG4gICAgaWYob3B0aW9ucy5leHRyYSkgdGhpcy5fX2V4dF9fID0gb3B0aW9ucy5leHRyYTtcblxuICAgIGlmKHJlY29yZCkgdGhpcy5fcmVjb3JkKCk7XG4gICAgdmFyIGdyb3VwID0gdGhpcy5fd2Fsayhhc3QsIG9wdGlvbnMpO1xuICAgIGlmKHJlY29yZCl7XG4gICAgICByZWNvcmRzID0gdGhpcy5fcmVsZWFzZSgpO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgaWYocmVjb3Jkcy5sZW5ndGgpe1xuICAgICAgICAvLyBhdXRvIGRlc3Ryb3kgYWxsIHdhdGhlcjtcbiAgICAgICAgZ3JvdXAub25kZXN0cm95ID0gZnVuY3Rpb24oKXsgc2VsZi4kdW53YXRjaChyZWNvcmRzKTsgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihvcHRpb25zLmV4dHJhKSB0aGlzLl9fZXh0X18gPSBwcmVFeHQ7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGNyZWF0ZSB0d28td2F5IGJpbmRpbmcgd2l0aCBhbm90aGVyIGNvbXBvbmVudDtcbiAgICogKndhcm4qOiBcbiAgICogICBleHByMSBhbmQgZXhwcjIgbXVzdCBjYW4gb3BlcmF0ZSBzZXQmZ2V0LCBmb3IgZXhhbXBsZTogdGhlICdhLmInIG9yICdhW2IgKyAxXScgaXMgc2V0LWFibGUsIGJ1dCAnYS5iICsgMScgaXMgbm90LCBcbiAgICogICBiZWFjdXNlIFJlZ3VsYXIgZG9udCBrbm93IGhvdyB0byBpbnZlcnNlIHNldCB0aHJvdWdoIHRoZSBleHByZXNzaW9uO1xuICAgKiAgIFxuICAgKiAgIGlmIGJlZm9yZSAkYmluZCwgdHdvIGNvbXBvbmVudCdzIHN0YXRlIGlzIG5vdCBzeW5jLCB0aGUgY29tcG9uZW50KHBhc3NlZCBwYXJhbSkgd2lsbCBzeW5jIHdpdGggdGhlIGNhbGxlZCBjb21wb25lbnQ7XG4gICAqXG4gICAqICpleGFtcGxlOiAqXG4gICAqXG4gICAqIGBgYGphdmFzY3JpcHRcbiAgICogLy8gaW4gdGhpcyBleGFtcGxlLCB3ZSBuZWVkIHRvIGxpbmsgdHdvIHBhZ2VyIGNvbXBvbmVudFxuICAgKiB2YXIgcGFnZXIgPSBuZXcgUGFnZXIoe30pIC8vIHBhZ2VyIGNvbXBvZW5udFxuICAgKiB2YXIgcGFnZXIyID0gbmV3IFBhZ2VyKHt9KSAvLyBhbm90aGVyIHBhZ2VyIGNvbXBvbmVudFxuICAgKiBwYWdlci4kYmluZChwYWdlcjIsICdjdXJyZW50Jyk7IC8vIHR3byB3YXkgYmluZCB0aHJvdyB0d28gY29tcG9uZW50XG4gICAqIHBhZ2VyLiRiaW5kKHBhZ2VyMiwgJ3RvdGFsJyk7ICAgLy8gXG4gICAqIC8vIG9yIGp1c3RcbiAgICogcGFnZXIuJGJpbmQocGFnZXIyLCB7XCJjdXJyZW50XCI6IFwiY3VycmVudFwiLCBcInRvdGFsXCI6IFwidG90YWxcIn0pIFxuICAgKiBgYGBcbiAgICogXG4gICAqIEBwYXJhbSAge1JlZ3VsYXJ9IGNvbXBvbmVudCB0aGVcbiAgICogQHBhcmFtICB7U3RyaW5nfEV4cHJlc3Npb259IGV4cHIxICAgICByZXF1aXJlZCwgc2VsZiBleHByMSB0byBvcGVyYXRlIGJpbmRpbmdcbiAgICogQHBhcmFtICB7U3RyaW5nfEV4cHJlc3Npb259IGV4cHIyICAgICBvcHRpb25hbCwgb3RoZXIgY29tcG9uZW50J3MgZXhwciB0byBiaW5kIHdpdGgsIGlmIG5vdCBwYXNzZWQsIHRoZSBleHByMiB3aWxsIHVzZSB0aGUgZXhwcjE7XG4gICAqIEByZXR1cm4gICAgICAgICAgdGhpcztcbiAgICovXG4gICRiaW5kOiBmdW5jdGlvbihjb21wb25lbnQsIGV4cHIxLCBleHByMil7XG4gICAgdmFyIHR5cGUgPSBfLnR5cGVPZihleHByMSk7XG4gICAgaWYoIGV4cHIxLnR5cGUgPT09ICdleHByZXNzaW9uJyB8fCB0eXBlID09PSAnc3RyaW5nJyApe1xuICAgICAgdGhpcy5fYmluZChjb21wb25lbnQsIGV4cHIxLCBleHByMilcbiAgICB9ZWxzZSBpZiggdHlwZSA9PT0gXCJhcnJheVwiICl7IC8vIG11bHRpcGx5IHNhbWUgcGF0aCBiaW5kaW5nIHRocm91Z2ggYXJyYXlcbiAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGV4cHIxLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgdGhpcy5fYmluZChjb21wb25lbnQsIGV4cHIxW2ldKTtcbiAgICAgIH1cbiAgICB9ZWxzZSBpZih0eXBlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIGZvcih2YXIgaSBpbiBleHByMSkgaWYoZXhwcjEuaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgICB0aGlzLl9iaW5kKGNvbXBvbmVudCwgaSwgZXhwcjFbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBkaWdlc3RcbiAgICBjb21wb25lbnQuJHVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogdW5iaW5kIG9uZSBjb21wb25lbnQoIHNlZSAkYmluZCBhbHNvKVxuICAgKlxuICAgKiB1bmJpbmQgd2lsbCB1bmJpbmQgYWxsIHJlbGF0aW9uIGJldHdlZW4gdHdvIGNvbXBvbmVudFxuICAgKiBcbiAgICogQHBhcmFtICB7UmVndWxhcn0gY29tcG9uZW50IFtkZXNjcmlwdGlvbmVndWxhclxuICAgKiBAcmV0dXJuIHtUaGlzfSAgICB0aGlzXG4gICAqL1xuICAkdW5iaW5kOiBmdW5jdGlvbigpe1xuICAgIC8vIHRvZG9cbiAgfSxcbiAgJGluamVjdDogY29tYmluZS5pbmplY3QsXG4gICRtdXRlOiBmdW5jdGlvbihpc011dGUpe1xuXG4gICAgaXNNdXRlID0gISFpc011dGU7XG5cbiAgICB2YXIgbmVlZHVwZGF0ZSA9IGlzTXV0ZSA9PT0gZmFsc2UgJiYgdGhpcy5fbXV0ZTtcblxuICAgIHRoaXMuX211dGUgPSAhIWlzTXV0ZTtcblxuICAgIGlmKG5lZWR1cGRhdGUpIHRoaXMuJHVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyBwcml2YXRlIGJpbmQgbG9naWNcbiAgX2JpbmQ6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXhwcjEsIGV4cHIyKXtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBiYXNpYyBiaW5kaW5nXG5cbiAgICBpZighY29tcG9uZW50IHx8ICEoY29tcG9uZW50IGluc3RhbmNlb2YgUmVndWxhcikpIHRocm93IFwiJGJpbmQoKSBzaG91bGQgcGFzcyBSZWd1bGFyIGNvbXBvbmVudCBhcyBmaXJzdCBhcmd1bWVudFwiO1xuICAgIGlmKCFleHByMSkgdGhyb3cgXCIkYmluZCgpIHNob3VsZCAgcGFzcyBhcyBsZWFzdCBvbmUgZXhwcmVzc2lvbiB0byBiaW5kXCI7XG5cbiAgICBpZighZXhwcjIpIGV4cHIyID0gZXhwcjE7XG5cbiAgICBleHByMSA9IHBhcnNlLmV4cHJlc3Npb24oIGV4cHIxICk7XG4gICAgZXhwcjIgPSBwYXJzZS5leHByZXNzaW9uKCBleHByMiApO1xuXG4gICAgLy8gc2V0IGlzIG5lZWQgdG8gb3BlcmF0ZSBzZXR0aW5nIDtcbiAgICBpZihleHByMi5zZXQpe1xuICAgICAgdmFyIHdpZDEgPSB0aGlzLiR3YXRjaCggZXhwcjEsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgY29tcG9uZW50LiR1cGRhdGUoZXhwcjIsIHZhbHVlKVxuICAgICAgfSk7XG4gICAgICBjb21wb25lbnQuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYuJHVud2F0Y2god2lkMSlcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmKGV4cHIxLnNldCl7XG4gICAgICB2YXIgd2lkMiA9IGNvbXBvbmVudC4kd2F0Y2goZXhwcjIsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgc2VsZi4kdXBkYXRlKGV4cHIxLCB2YWx1ZSlcbiAgICAgIH0pO1xuICAgICAgLy8gd2hlbiBicm90aGVyIGRlc3Ryb3ksIHdlIHVubGluayB0aGlzIHdhdGNoZXJcbiAgICAgIHRoaXMuJG9uKCckZGVzdHJveScsIGNvbXBvbmVudC4kdW53YXRjaC5iaW5kKGNvbXBvbmVudCx3aWQyKSlcbiAgICB9XG4gICAgLy8gc3luYyB0aGUgY29tcG9uZW50J3Mgc3RhdGUgdG8gY2FsbGVkJ3Mgc3RhdGVcbiAgICBleHByMi5zZXQoY29tcG9uZW50LCBleHByMS5nZXQodGhpcykpO1xuICB9LFxuICBfd2FsazogZnVuY3Rpb24oYXN0LCBhcmcxKXtcbiAgICBpZiggXy50eXBlT2YoYXN0KSA9PT0gJ2FycmF5JyApe1xuICAgICAgdmFyIHJlcyA9IFtdO1xuXG4gICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICByZXMucHVzaCggdGhpcy5fd2Fsayhhc3RbaV0sIGFyZzEpICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgR3JvdXAocmVzKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIGFzdCA9PT0gJ3N0cmluZycpIHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUoYXN0KVxuICAgIHJldHVybiB3YWxrZXJzW2FzdC50eXBlIHx8IFwiZGVmYXVsdFwiXS5jYWxsKHRoaXMsIGFzdCwgYXJnMSk7XG4gIH0sXG4gIF9hcHBlbmQ6IGZ1bmN0aW9uKGNvbXBvbmVudCl7XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjb21wb25lbnQpO1xuICAgIGNvbXBvbmVudC4kcGFyZW50ID0gdGhpcztcbiAgfSxcbiAgX2hhbmRsZUV2ZW50OiBmdW5jdGlvbihlbGVtLCB0eXBlLCB2YWx1ZSwgYXR0cnMpe1xuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLmNvbnN0cnVjdG9yLFxuICAgICAgZmlyZSA9IHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiPyBfLmhhbmRsZUV2ZW50LmNhbGwoIHRoaXMsIHZhbHVlLCB0eXBlICkgOiB2YWx1ZSxcbiAgICAgIGhhbmRsZXIgPSBDb21wb25lbnQuZXZlbnQodHlwZSksIGRlc3Ryb3k7XG5cbiAgICBpZiAoIGhhbmRsZXIgKSB7XG4gICAgICBkZXN0cm95ID0gaGFuZGxlci5jYWxsKHRoaXMsIGVsZW0sIGZpcmUsIGF0dHJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tLm9uKGVsZW0sIHR5cGUsIGZpcmUpO1xuICAgIH1cbiAgICByZXR1cm4gaGFuZGxlciA/IGRlc3Ryb3kgOiBmdW5jdGlvbigpIHtcbiAgICAgIGRvbS5vZmYoZWxlbSwgdHlwZSwgZmlyZSk7XG4gICAgfVxuICB9LFxuICAvLyAxLiDnlKjmnaXlpITnkIZleHByQm9keSAtPiBGdW5jdGlvblxuICAvLyAyLiBsaXN06YeM55qE5b6q546vXG4gIF90b3VjaEV4cHI6IGZ1bmN0aW9uKGV4cHIpe1xuICAgIHZhciAgcmF3Z2V0LCBleHQgPSB0aGlzLl9fZXh0X18sIHRvdWNoZWQgPSB7fTtcbiAgICBpZihleHByLnR5cGUgIT09ICdleHByZXNzaW9uJyB8fCBleHByLnRvdWNoZWQpIHJldHVybiBleHByO1xuICAgIHJhd2dldCA9IGV4cHIuZ2V0IHx8IChleHByLmdldCA9IG5ldyBGdW5jdGlvbihfLmN0eE5hbWUsIF8uZXh0TmFtZSAsIF8ucHJlZml4KyBcInJldHVybiAoXCIgKyBleHByLmJvZHkgKyBcIilcIikpO1xuICAgIHRvdWNoZWQuZ2V0ID0gIWV4dD8gcmF3Z2V0OiBmdW5jdGlvbihjb250ZXh0KXtcbiAgICAgIHJldHVybiByYXdnZXQoY29udGV4dCwgZXh0KVxuICAgIH1cblxuICAgIGlmKGV4cHIuc2V0Ym9keSAmJiAhZXhwci5zZXQpe1xuICAgICAgdmFyIHNldGJvZHkgPSBleHByLnNldGJvZHk7XG4gICAgICBleHByLnNldCA9IGZ1bmN0aW9uKGN0eCwgdmFsdWUsIGV4dCl7XG4gICAgICAgIGV4cHIuc2V0ID0gbmV3IEZ1bmN0aW9uKF8uY3R4TmFtZSwgXy5zZXROYW1lICwgXy5leHROYW1lLCBfLnByZWZpeCArIHNldGJvZHkpOyAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV4cHIuc2V0KGN0eCwgdmFsdWUsIGV4dCk7XG4gICAgICB9XG4gICAgICBleHByLnNldGJvZHkgPSBudWxsO1xuICAgIH1cbiAgICBpZihleHByLnNldCl7XG4gICAgICB0b3VjaGVkLnNldCA9ICFleHQ/IGV4cHIuc2V0IDogZnVuY3Rpb24oY3R4LCB2YWx1ZSl7XG4gICAgICAgIHJldHVybiBleHByLnNldChjdHgsIHZhbHVlLCBleHQpO1xuICAgICAgfVxuICAgIH1cbiAgICBfLmV4dGVuZCh0b3VjaGVkLCB7XG4gICAgICB0eXBlOiAnZXhwcmVzc2lvbicsXG4gICAgICB0b3VjaGVkOiB0cnVlLFxuICAgICAgb25jZTogZXhwci5vbmNlIHx8IGV4cHIuY29uc3RhbnRcbiAgICB9KVxuICAgIHJldHVybiB0b3VjaGVkXG4gIH0sXG4gIC8vIGZpbmQgZmlsdGVyXG4gIF9mXzogZnVuY3Rpb24obmFtZSl7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgdmFyIGZpbHRlciA9IENvbXBvbmVudC5maWx0ZXIobmFtZSk7XG4gICAgaWYoIWZpbHRlcikgdGhyb3cgRXJyb3IoJ2ZpbHRlciAnICsgbmFtZSArICcgaXMgdW5kZWZpbmVkJyk7XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfSxcbiAgLy8gc2ltcGxlIGFjY2Vzc29yIGdldFxuICBfc2dfOmZ1bmN0aW9uKHBhdGgsIGRlZmF1bHRzLCBleHQpe1xuICAgIGlmKHR5cGVvZiBleHQgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgIC8vIGlmKHBhdGggPT09IFwiZGVtb3NcIikgIGRlYnVnZ2VyXG4gICAgICB2YXIgY29tcHV0ZWQgPSB0aGlzLmNvbXB1dGVkLFxuICAgICAgICBjb21wdXRlZFByb3BlcnR5ID0gY29tcHV0ZWRbcGF0aF07XG4gICAgICBpZihjb21wdXRlZFByb3BlcnR5KXtcbiAgICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eS50eXBlPT09J2V4cHJlc3Npb24nICYmICFjb21wdXRlZFByb3BlcnR5LmdldCkgdGhpcy5fdG91Y2hFeHByKGNvbXB1dGVkUHJvcGVydHkpO1xuICAgICAgICBpZihjb21wdXRlZFByb3BlcnR5LmdldCkgIHJldHVybiBjb21wdXRlZFByb3BlcnR5LmdldCh0aGlzKTtcbiAgICAgICAgZWxzZSBfLmxvZyhcInRoZSBjb21wdXRlZCAnXCIgKyBwYXRoICsgXCInIGRvbid0IGRlZmluZSB0aGUgZ2V0IGZ1bmN0aW9uLCAgZ2V0IGRhdGEuXCIrcGF0aCArIFwiIGFsdG5hdGVseVwiLCBcImVycm9yXCIpXG4gICAgICB9XG4gIH1cbiAgICBpZih0eXBlb2YgZGVmYXVsdHMgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHBhdGggPT0gXCJ1bmRlZmluZWRcIiApe1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIChleHQgJiYgdHlwZW9mIGV4dFtwYXRoXSAhPT0gJ3VuZGVmaW5lZCcpPyBleHRbcGF0aF06IGRlZmF1bHRzW3BhdGhdO1xuXG4gIH0sXG4gIC8vIHNpbXBsZSBhY2Nlc3NvciBzZXRcbiAgX3NzXzpmdW5jdGlvbihwYXRoLCB2YWx1ZSwgZGF0YSAsIG9wLCBjb21wdXRlZCl7XG4gICAgdmFyIGNvbXB1dGVkID0gdGhpcy5jb21wdXRlZCxcbiAgICAgIG9wID0gb3AgfHwgXCI9XCIsIHByZXYsIFxuICAgICAgY29tcHV0ZWRQcm9wZXJ0eSA9IGNvbXB1dGVkPyBjb21wdXRlZFtwYXRoXTpudWxsO1xuXG4gICAgaWYob3AgIT09ICc9Jyl7XG4gICAgICBwcmV2ID0gY29tcHV0ZWRQcm9wZXJ0eT8gY29tcHV0ZWRQcm9wZXJ0eS5nZXQodGhpcyk6IGRhdGFbcGF0aF07XG4gICAgICBzd2l0Y2gob3Ape1xuICAgICAgICBjYXNlIFwiKz1cIjpcbiAgICAgICAgICB2YWx1ZSA9IHByZXYgKyB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIi09XCI6XG4gICAgICAgICAgdmFsdWUgPSBwcmV2IC0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIqPVwiOlxuICAgICAgICAgIHZhbHVlID0gcHJldiAqIHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiLz1cIjpcbiAgICAgICAgICB2YWx1ZSA9IHByZXYgLyB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIiU9XCI6XG4gICAgICAgICAgdmFsdWUgPSBwcmV2ICUgdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGNvbXB1dGVkUHJvcGVydHkpIHtcbiAgICAgIGlmKGNvbXB1dGVkUHJvcGVydHkuc2V0KSByZXR1cm4gY29tcHV0ZWRQcm9wZXJ0eS5zZXQodGhpcywgdmFsdWUpO1xuICAgICAgZWxzZSBfLmxvZyhcInRoZSBjb21wdXRlZCAnXCIgKyBwYXRoICsgXCInIGRvbid0IGRlZmluZSB0aGUgc2V0IGZ1bmN0aW9uLCAgYXNzaWduIGRhdGEuXCIrcGF0aCArIFwiIGFsdG5hdGVseVwiLCBcImVycm9yXCIgKVxuICAgIH1cbiAgICBkYXRhW3BhdGhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59KTtcblxuUmVndWxhci5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24oKXtcbiAgXy5sb2coXCJ1c2UgJGluamVjdCBpbnN0ZWFkIG9mIGluamVjdFwiLCBcImVycm9yXCIpO1xuICByZXR1cm4gdGhpcy4kaW5qZWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cblxuLy8gb25seSBvbmUgYnVpbHRpbiBmaWx0ZXJcblxuUmVndWxhci5maWx0ZXIoZmlsdGVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWd1bGFyO1xuXG5cblxudmFyIGhhbmRsZUNvbXB1dGVkID0gKGZ1bmN0aW9uKCl7XG4gIC8vIHdyYXAgdGhlIGNvbXB1dGVkIGdldHRlcjtcbiAgZnVuY3Rpb24gd3JhcEdldChnZXQpe1xuICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0KXtcbiAgICAgIHJldHVybiBnZXQuY2FsbChjb250ZXh0LCBjb250ZXh0LmRhdGEgKTtcbiAgICB9XG4gIH1cbiAgLy8gd3JhcCB0aGUgY29tcHV0ZWQgc2V0dGVyO1xuICBmdW5jdGlvbiB3cmFwU2V0KHNldCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQsIHZhbHVlKXtcbiAgICAgIHNldC5jYWxsKCBjb250ZXh0LCB2YWx1ZSwgY29udGV4dC5kYXRhICk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbXB1dGVkKXtcbiAgICBpZighY29tcHV0ZWQpIHJldHVybjtcbiAgICB2YXIgcGFyc2VkQ29tcHV0ZWQgPSB7fSwgaGFuZGxlLCBwYWlyLCB0eXBlO1xuICAgIGZvcih2YXIgaSBpbiBjb21wdXRlZCl7XG4gICAgICBoYW5kbGUgPSBjb21wdXRlZFtpXVxuICAgICAgdHlwZSA9IHR5cGVvZiBoYW5kbGU7XG5cbiAgICAgIGlmKGhhbmRsZS50eXBlID09PSAnZXhwcmVzc2lvbicpe1xuICAgICAgICBwYXJzZWRDb21wdXRlZFtpXSA9IGhhbmRsZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiggdHlwZSA9PT0gXCJzdHJpbmdcIiApe1xuICAgICAgICBwYXJzZWRDb21wdXRlZFtpXSA9IHBhcnNlLmV4cHJlc3Npb24oaGFuZGxlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHBhaXIgPSBwYXJzZWRDb21wdXRlZFtpXSA9IHt0eXBlOiAnZXhwcmVzc2lvbid9O1xuICAgICAgICBpZih0eXBlID09PSBcImZ1bmN0aW9uXCIgKXtcbiAgICAgICAgICBwYWlyLmdldCA9IHdyYXBHZXQoaGFuZGxlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgaWYoaGFuZGxlLmdldCkgcGFpci5nZXQgPSB3cmFwR2V0KGhhbmRsZS5nZXQpO1xuICAgICAgICAgIGlmKGhhbmRsZS5zZXQpIHBhaXIuc2V0ID0gd3JhcFNldChoYW5kbGUuc2V0KTtcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZENvbXB1dGVkO1xuICB9XG59KSgpO1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ0JFR0lOJzogJ3snLFxuICAnRU5EJzogJ30nXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICdDT01QT05FTlRfVFlQRSc6IDEsXG4gICdFTEVNRU5UX1RZUEUnOiAyXG59IiwidmFyIC8vIHBhY2thZ2VzXG4gIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKSxcbiBhbmltYXRlID0gcmVxdWlyZShcIi4uL2hlbHBlci9hbmltYXRlLmpzXCIpLFxuIGRvbSA9IHJlcXVpcmUoXCIuLi9kb20uanNcIiksXG4gUmVndWxhciA9IHJlcXVpcmUoXCIuLi9SZWd1bGFyLmpzXCIpO1xuXG5cbnZhciAvLyB2YXJpYWJsZXNcbiAgckNsYXNzTmFtZSA9IC9eWy1cXHddKyhcXHNbLVxcd10rKSokLyxcbiAgckNvbW1hU2VwID0gL1tcXHJcXG5cXGYgXSosW1xcclxcblxcZiBdKig/PVxcdytcXDopLywgLy8gIGRvbnQgc3BsaXQgY29tbWEgaW4gIEV4cHJlc3Npb25cbiAgclN0eWxlcyA9IC9eXFx7LipcXH0kLywgLy8gIGZvciBTaW1waWxmeVxuICByU3BhY2UgPSAvXFxzKy8sIC8vICBmb3IgU2ltcGlsZnlcbiAgV0hFTl9DT01NQU5EID0gXCJ3aGVuXCIsXG4gIEVWRU5UX0NPTU1BTkQgPSBcIm9uXCIsXG4gIFRIRU5fQ09NTUFORCA9IFwidGhlblwiO1xuXG4vKipcbiAqIEFuaW1hdGlvbiBQbHVnaW5cbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBDb21wb25lbnQgXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVTZWVkKHR5cGUpe1xuXG4gIHZhciBzdGVwcyA9IFtdLCBjdXJyZW50ID0gMCwgY2FsbGJhY2sgPSBfLm5vb3A7XG4gIHZhciBrZXk7XG5cbiAgdmFyIG91dCA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHN0YXJ0OiBmdW5jdGlvbihjYil7XG4gICAgICBrZXkgPSBfLnVpZCgpO1xuICAgICAgaWYodHlwZW9mIGNiID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrID0gY2I7XG4gICAgICBpZihjdXJyZW50PiAwICl7XG4gICAgICAgIGN1cnJlbnQgPSAwIDtcbiAgICAgIH1lbHNle1xuICAgICAgICBvdXQuc3RlcCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dC5jb21wZWxldGU7XG4gICAgfSxcbiAgICBjb21wZWxldGU6IGZ1bmN0aW9uKCl7XG4gICAgICBrZXkgPSBudWxsO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgIGNhbGxiYWNrID0gXy5ub29wO1xuICAgICAgY3VycmVudCA9IDA7XG4gICAgfSxcbiAgICBzdGVwOiBmdW5jdGlvbigpe1xuICAgICAgaWYoc3RlcHNbY3VycmVudF0pIHN0ZXBzW2N1cnJlbnQgXSggb3V0LmRvbmUuYmluZChvdXQsIGtleSkgKTtcbiAgICB9LFxuICAgIGRvbmU6IGZ1bmN0aW9uKHBrZXkpe1xuICAgICAgaWYocGtleSAhPT0ga2V5KSByZXR1cm47IC8vIG1lYW5zIHRoZSBsb29wIGlzIGRvd25cbiAgICAgIGlmKCBjdXJyZW50IDwgc3RlcHMubGVuZ3RoIC0gMSApIHtcbiAgICAgICAgY3VycmVudCsrO1xuICAgICAgICBvdXQuc3RlcCgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIG91dC5jb21wZWxldGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHB1c2g6IGZ1bmN0aW9uKHN0ZXApe1xuICAgICAgc3RlcHMucHVzaChzdGVwKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG5cblJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiYW5pbWF0aW9uXCIpXG5cblxuLy8gYnVpbHRpbiBhbmltYXRpb25cblJlZ3VsYXIuYW5pbWF0aW9uKHtcbiAgXCJ3YWl0XCI6IGZ1bmN0aW9uKCBzdGVwICl7XG4gICAgdmFyIHRpbWVvdXQgPSBwYXJzZUludCggc3RlcC5wYXJhbSApIHx8IDBcbiAgICByZXR1cm4gZnVuY3Rpb24oZG9uZSl7XG4gICAgICAvLyBfLmxvZyhcImRlbGF5IFwiICsgdGltZW91dClcbiAgICAgIHNldFRpbWVvdXQoIGRvbmUsIHRpbWVvdXQgKTtcbiAgICB9XG4gIH0sXG4gIFwiY2xhc3NcIjogZnVuY3Rpb24oc3RlcCl7XG4gICAgdmFyIHRtcCA9IHN0ZXAucGFyYW0uc3BsaXQoXCIsXCIpLFxuICAgICAgY2xhc3NOYW1lID0gdG1wWzBdIHx8IFwiXCIsXG4gICAgICBtb2RlID0gcGFyc2VJbnQodG1wWzFdKSB8fCAxO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgLy8gXy5sb2coY2xhc3NOYW1lKVxuICAgICAgYW5pbWF0ZS5zdGFydENsYXNzQW5pbWF0ZSggc3RlcC5lbGVtZW50LCBjbGFzc05hbWUgLCBkb25lLCBtb2RlICk7XG4gICAgfVxuICB9LFxuICBcImNhbGxcIjogZnVuY3Rpb24oc3RlcCl7XG4gICAgdmFyIGZuID0gdGhpcy4kZXhwcmVzc2lvbihzdGVwLnBhcmFtKS5nZXQsIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIC8vIF8ubG9nKHN0ZXAucGFyYW0sICdjYWxsJylcbiAgICAgIGZuKHNlbGYpO1xuICAgICAgc2VsZi4kdXBkYXRlKCk7XG4gICAgICBkb25lKClcbiAgICB9XG4gIH0sXG4gIFwiZW1pdFwiOiBmdW5jdGlvbihzdGVwKXtcbiAgICB2YXIgcGFyYW0gPSBzdGVwLnBhcmFtO1xuICAgIHZhciB0bXAgPSBwYXJhbS5zcGxpdChcIixcIiksXG4gICAgICBldnQgPSB0bXBbMF0gfHwgXCJcIixcbiAgICAgIGFyZ3MgPSB0bXBbMV0/IHRoaXMuJGV4cHJlc3Npb24odG1wWzFdKS5nZXQ6IG51bGw7XG5cbiAgICBpZighZXZ0KSB0aHJvdyBFcnJvcihcInlvdSBzaG91ZCBzcGVjaWZpZWQgYSBldmVudG5hbWUgaW4gZW1pdCBjb21tYW5kXCIpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIHNlbGYuJGVtaXQoZXZ0LCBhcmdzPyBhcmdzKHNlbGYpIDogdW5kZWZpbmVkKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH0sXG4gIC8vIHN0eWxlOiBsZWZ0IHsxMH1weCxcbiAgc3R5bGU6IGZ1bmN0aW9uKHN0ZXApe1xuICAgIHZhciBzdHlsZXMgPSB7fSwgXG4gICAgICBwYXJhbSA9IHN0ZXAucGFyYW0sXG4gICAgICBwYWlycyA9IHBhcmFtLnNwbGl0KFwiLFwiKSwgdmFsaWQ7XG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihwYWlyKXtcbiAgICAgIHBhaXIgPSBwYWlyLnRyaW0oKTtcbiAgICAgIGlmKHBhaXIpe1xuICAgICAgICB2YXIgdG1wID0gcGFpci5zcGxpdCggclNwYWNlICksXG4gICAgICAgICAgbmFtZSA9IHRtcC5zaGlmdCgpLFxuICAgICAgICAgIHZhbHVlID0gdG1wLmpvaW4oXCIgXCIpO1xuXG4gICAgICAgIGlmKCAhbmFtZSB8fCAhdmFsdWUgKSB0aHJvdyBFcnJvcihcImludmFsaWQgc3R5bGUgaW4gY29tbWFuZDogc3R5bGVcIik7XG4gICAgICAgIHN0eWxlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIGlmKHZhbGlkKXtcbiAgICAgICAgYW5pbWF0ZS5zdGFydFN0eWxlQW5pbWF0ZShzdGVwLmVsZW1lbnQsIHN0eWxlcywgZG9uZSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuXG5cbi8vIGhhbmNkbGUgdGhlIHItYW5pbWF0aW9uIGRpcmVjdGl2ZVxuLy8gZWwgOiB0aGUgZWxlbWVudCB0byBwcm9jZXNzXG4vLyB2YWx1ZTogdGhlIGRpcmVjdGl2ZSB2YWx1ZVxuZnVuY3Rpb24gcHJvY2Vzc0FuaW1hdGUoIGVsZW1lbnQsIHZhbHVlICl7XG4gIHZhciBDb21wb25lbnQgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblxuICB2YXIgY29tcG9zaXRlcyA9IHZhbHVlLnNwbGl0KFwiO1wiKSwgXG4gICAgY29tcG9zaXRlLCBjb250ZXh0ID0gdGhpcywgc2VlZHMgPSBbXSwgc2VlZCwgZGVzdHJvaWVzID0gW10sIGRlc3Ryb3ksXG4gICAgY29tbWFuZCwgcGFyYW0gLCBjdXJyZW50ID0gMCwgdG1wLCBhbmltYXRvciwgc2VsZiA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gcmVzZXQoIHR5cGUgKXtcbiAgICBzZWVkICYmIHNlZWRzLnB1c2goIHNlZWQgKVxuICAgIHNlZWQgPSBjcmVhdGVTZWVkKCB0eXBlICk7XG4gIH1cblxuICBmdW5jdGlvbiB3aGVuQ2FsbGJhY2soc3RhcnQsIHZhbHVlKXtcbiAgICBpZiggISF2YWx1ZSApIHN0YXJ0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGlvbkRlc3Ryb3koZWxlbWVudCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICBkZWxldGUgZWxlbWVudC5vbmVudGVyO1xuICAgICAgZGVsZXRlIGVsZW1lbnQub25sZWF2ZTtcbiAgICB9IFxuICB9XG5cbiAgZm9yKCB2YXIgaSA9IDAsIGxlbiA9IGNvbXBvc2l0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcblxuICAgIGNvbXBvc2l0ZSA9IGNvbXBvc2l0ZXNbaV07XG4gICAgdG1wID0gY29tcG9zaXRlLnNwbGl0KFwiOlwiKTtcbiAgICBjb21tYW5kID0gdG1wWzBdICYmIHRtcFswXS50cmltKCk7XG4gICAgcGFyYW0gPSB0bXBbMV0gJiYgdG1wWzFdLnRyaW0oKTtcblxuICAgIGlmKCAhY29tbWFuZCApIGNvbnRpbnVlO1xuXG4gICAgaWYoIGNvbW1hbmQgPT09IFdIRU5fQ09NTUFORCApe1xuICAgICAgcmVzZXQoXCJ3aGVuXCIpO1xuICAgICAgdGhpcy4kd2F0Y2gocGFyYW0sIHdoZW5DYWxsYmFjay5iaW5kKCB0aGlzLCBzZWVkLnN0YXJ0ICkgKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKCBjb21tYW5kID09PSBFVkVOVF9DT01NQU5EKXtcbiAgICAgIHJlc2V0KHBhcmFtKTtcbiAgICAgIGlmKCBwYXJhbSA9PT0gXCJsZWF2ZVwiICl7XG4gICAgICAgIGVsZW1lbnQub25sZWF2ZSA9IHNlZWQuc3RhcnQ7XG4gICAgICAgIGRlc3Ryb2llcy5wdXNoKCBhbmltYXRpb25EZXN0cm95KGVsZW1lbnQpICk7XG4gICAgICB9ZWxzZSBpZiggcGFyYW0gPT09IFwiZW50ZXJcIiApe1xuICAgICAgICBlbGVtZW50Lm9uZW50ZXIgPSBzZWVkLnN0YXJ0O1xuICAgICAgICBkZXN0cm9pZXMucHVzaCggYW5pbWF0aW9uRGVzdHJveShlbGVtZW50KSApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKCAoXCJvblwiICsgcGFyYW0pIGluIGVsZW1lbnQpeyAvLyBpZiBkb20gaGF2ZSB0aGUgZXZlbnQgLCB3ZSB1c2UgZG9tIGV2ZW50XG4gICAgICAgICAgZGVzdHJvaWVzLnB1c2godGhpcy5faGFuZGxlRXZlbnQoIGVsZW1lbnQsIHBhcmFtLCBzZWVkLnN0YXJ0ICkpO1xuICAgICAgICB9ZWxzZXsgLy8gb3RoZXJ3aXNlLCB3ZSB1c2UgY29tcG9uZW50IGV2ZW50XG4gICAgICAgICAgdGhpcy4kb24ocGFyYW0sIHNlZWQuc3RhcnQpO1xuICAgICAgICAgIGRlc3Ryb2llcy5wdXNoKHRoaXMuJG9mZi5iaW5kKHRoaXMsIHBhcmFtLCBzZWVkLnN0YXJ0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIGFuaW1hdG9yID0gIENvbXBvbmVudC5hbmltYXRpb24oY29tbWFuZCkgXG4gICAgaWYoIGFuaW1hdG9yICYmIHNlZWQgKXtcbiAgICAgIHNlZWQucHVzaChcbiAgICAgICAgYW5pbWF0b3IuY2FsbCh0aGlzLHtcbiAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgIGRvbmU6IHNlZWQuZG9uZSxcbiAgICAgICAgICBwYXJhbTogcGFyYW0gXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfWVsc2V7XG4gICAgICB0aHJvdyBFcnJvciggYW5pbWF0b3I/IFwieW91IHNob3VsZCBzdGFydCB3aXRoIGBvbmAgb3IgYGV2ZW50YCBpbiBhbmltYXRpb25cIiA6IChcInVuZGVmaW5lZCBhbmltYXRvciDjgJBcIiArIGNvbW1hbmQgK1wi44CRXCIgKSk7XG4gICAgfVxuICB9XG5cbiAgaWYoZGVzdHJvaWVzLmxlbmd0aCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICBkZXN0cm9pZXMuZm9yRWFjaChmdW5jdGlvbihkZXN0cm95KXtcbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuXG5SZWd1bGFyLmRpcmVjdGl2ZSggXCJyLWFuaW1hdGlvblwiLCBwcm9jZXNzQW5pbWF0ZSlcblJlZ3VsYXIuZGlyZWN0aXZlKCBcInItYW5pbVwiLCBwcm9jZXNzQW5pbWF0ZSlcblxuIiwiLy8gUmVndWxhclxudmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xudmFyIGFuaW1hdGUgPSByZXF1aXJlKFwiLi4vaGVscGVyL2FuaW1hdGUuanNcIik7XG52YXIgUmVndWxhciA9IHJlcXVpcmUoXCIuLi9SZWd1bGFyLmpzXCIpO1xudmFyIGNvbnN0cyA9IHJlcXVpcmUoXCIuLi9jb25zdFwiKTtcblxuXG5cbnJlcXVpcmUoXCIuL2V2ZW50LmpzXCIpO1xucmVxdWlyZShcIi4vZm9ybS5qc1wiKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbi8vICoqd2FybioqOiBjbGFzcyBpbnRlcGxhdGlvbiB3aWxsIG92ZXJyaWRlIHRoaXMgZGlyZWN0aXZlIFxuICAnci1jbGFzcyc6IGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcbiAgICBpZih0eXBlb2YgdmFsdWU9PT0gJ3N0cmluZycpe1xuICAgICAgdmFsdWUgPSBfLmZpeE9ialN0cih2YWx1ZSlcbiAgICB9XG4gICAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gJyAnKyBlbGVtLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMrL2csICcgJykgKycgJztcbiAgICAgIGZvcih2YXIgaSBpbiBudmFsdWUpIGlmKG52YWx1ZS5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5yZXBsYWNlKCcgJyArIGkgKyAnICcsJyAnKTtcbiAgICAgICAgaWYobnZhbHVlW2ldID09PSB0cnVlKXtcbiAgICAgICAgICBjbGFzc05hbWUgKz0gaSsnICc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKTtcbiAgICB9LHRydWUpO1xuICB9LFxuICAvLyAqKndhcm4qKjogc3R5bGUgaW50ZXBsYXRpb24gd2lsbCBvdmVycmlkZSB0aGlzIGRpcmVjdGl2ZSBcbiAgJ3Itc3R5bGUnOiBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XG4gICAgaWYodHlwZW9mIHZhbHVlPT09ICdzdHJpbmcnKXtcbiAgICAgIHZhbHVlID0gXy5maXhPYmpTdHIodmFsdWUpXG4gICAgfVxuICAgIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUpe1xuICAgICAgZm9yKHZhciBpIGluIG52YWx1ZSkgaWYobnZhbHVlLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgICAgZG9tLmNzcyhlbGVtLCBpLCBudmFsdWVbaV0pO1xuICAgICAgfVxuICAgIH0sdHJ1ZSk7XG4gIH0sXG4gIC8vIHdoZW4gZXhwcmVzc2lvbiBpcyBldmFsdWF0ZSB0byB0cnVlLCB0aGUgZWxlbSB3aWxsIGFkZCBkaXNwbGF5Om5vbmVcbiAgLy8gRXhhbXBsZTogPGRpdiByLWhpZGU9e3tpdGVtcy5sZW5ndGggPiAwfX0+PC9kaXY+XG4gICdyLWhpZGUnOiBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XG4gICAgdmFyIHByZUJvb2wgPSBudWxsLCBjb21wZWxldGU7XG4gICAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgICB2YXIgYm9vbCA9ICEhbnZhbHVlO1xuICAgICAgaWYoYm9vbCA9PT0gcHJlQm9vbCkgcmV0dXJuOyBcbiAgICAgIHByZUJvb2wgPSBib29sO1xuICAgICAgaWYoYm9vbCl7XG4gICAgICAgIGlmKGVsZW0ub25sZWF2ZSl7XG4gICAgICAgICAgY29tcGVsZXRlID0gZWxlbS5vbmxlYXZlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICAgICAgY29tcGVsZXRlID0gbnVsbDtcbiAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKGNvbXBlbGV0ZSkgY29tcGVsZXRlKCk7XG4gICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgIGlmKGVsZW0ub25lbnRlcil7XG4gICAgICAgICAgZWxlbS5vbmVudGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgJ3ItaHRtbCc6IGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcbiAgICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcbiAgICAgIG52YWx1ZSA9IG52YWx1ZSB8fCBcIlwiO1xuICAgICAgZG9tLmh0bWwoZWxlbSwgbnZhbHVlKVxuICAgIH0sIHtmb3JjZTogdHJ1ZX0pO1xuICB9LFxuICAncmVmJzoge1xuICAgIGFjY2VwdDogY29uc3RzLkNPTVBPTkVOVF9UWVBFICsgY29uc3RzLkVMRU1FTlRfVFlQRSxcbiAgICBsaW5rOiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKXtcbiAgICAgIHZhciByZWZzID0gdGhpcy4kcmVmcyB8fCAodGhpcy4kcmVmcyA9IHt9KTtcbiAgICAgIHZhciBjdmFsO1xuICAgICAgaWYoXy5pc0V4cHIodmFsdWUpKXtcbiAgICAgICAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWwsIG92YWwpe1xuICAgICAgICAgIGN2YWwgPSBudmFsO1xuICAgICAgICAgIGlmKHJlZnNbb3ZhbF0gPT09IGVsZW0pIHJlZnNbb3ZhbF0gPSBudWxsO1xuICAgICAgICAgIGlmKGN2YWwpIHJlZnNbY3ZhbF0gPSBlbGVtO1xuICAgICAgICB9KVxuICAgICAgfWVsc2V7XG4gICAgICAgIHJlZnNbY3ZhbCA9IHZhbHVlXSA9IGVsZW07XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgcmVmc1tjdmFsXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblJlZ3VsYXIuZGlyZWN0aXZlKG1vZHVsZS5leHBvcnRzKTtcblxuXG5cblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBldmVudCBkaXJlY3RpdmUgIGJ1bmRsZVxuICpcbiAqL1xudmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xudmFyIFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vUmVndWxhci5qc1wiKTtcblxuUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUoXCJldmVudFwiKTtcblxuUmVndWxhci5kaXJlY3RpdmUoIC9eb24tXFx3KyQvLCBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgLCBhdHRycykge1xuICBpZiAoICFuYW1lIHx8ICF2YWx1ZSApIHJldHVybjtcbiAgdmFyIHR5cGUgPSBuYW1lLnNwbGl0KFwiLVwiKVsxXTtcbiAgcmV0dXJuIHRoaXMuX2hhbmRsZUV2ZW50KCBlbGVtLCB0eXBlLCB2YWx1ZSwgYXR0cnMgKTtcbn0pO1xuLy8gVE9ETy5cbi8qKlxuLSAkKCdkeCcpLmRlbGVnYXRlKClcbiovXG5SZWd1bGFyLmRpcmVjdGl2ZSggL14oZGVsZWdhdGV8ZGUpLVxcdyskLywgZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuICB2YXIgcm9vdCA9IHRoaXMuJHJvb3Q7XG4gIHZhciBfZGVsZWdhdGVzID0gcm9vdC5fZGVsZWdhdGVzIHx8ICggcm9vdC5fZGVsZWdhdGVzID0ge30gKTtcbiAgaWYgKCAhbmFtZSB8fCAhdmFsdWUgKSByZXR1cm47XG4gIHZhciB0eXBlID0gbmFtZS5zcGxpdChcIi1cIilbMV07XG4gIHZhciBmaXJlID0gXy5oYW5kbGVFdmVudC5jYWxsKHRoaXMsIHZhbHVlLCB0eXBlKTtcblxuICBmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50KGV2KXtcbiAgICBtYXRjaFBhcmVudChldiwgX2RlbGVnYXRlc1t0eXBlXSwgcm9vdC5wYXJlbnROb2RlKTtcbiAgfVxuXG4gIGlmKCAhX2RlbGVnYXRlc1t0eXBlXSApe1xuICAgIF9kZWxlZ2F0ZXNbdHlwZV0gPSBbXTtcblxuICAgIGlmKHJvb3QucGFyZW50Tm9kZSl7XG4gICAgICBkb20ub24ocm9vdC5wYXJlbnROb2RlLCB0eXBlLCBkZWxlZ2F0ZUV2ZW50KTtcbiAgICB9ZWxzZXtcbiAgICAgIHJvb3QuJG9uKCBcIiRpbmplY3RcIiwgZnVuY3Rpb24oIG5ld1BhcmVudCApe1xuICAgICAgICB2YXIgcHJlUGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgICBpZiggcHJlUGFyZW50ICl7XG4gICAgICAgICAgZG9tLm9mZihwcmVQYXJlbnQsIHR5cGUsIGRlbGVnYXRlRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGRvbS5vbihuZXdQYXJlbnQsIHR5cGUsIGRlbGVnYXRlRXZlbnQpO1xuICAgICAgfSlcbiAgICB9XG4gICAgcm9vdC4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpe1xuICAgICAgaWYocm9vdC5wYXJlbnROb2RlKSBkb20ub2ZmKHJvb3QucGFyZW50Tm9kZSwgdHlwZSwgZGVsZWdhdGVFdmVudClcbiAgICAgIF9kZWxlZ2F0ZXNbdHlwZV0gPSBudWxsO1xuICAgIH0pXG4gIH1cbiAgdmFyIGRlbGVnYXRlID0ge1xuICAgIGVsZW1lbnQ6IGVsZW0sXG4gICAgZmlyZTogZmlyZVxuICB9XG4gIF9kZWxlZ2F0ZXNbdHlwZV0ucHVzaCggZGVsZWdhdGUgKTtcblxuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICB2YXIgZGVsZWdhdGVzID0gX2RlbGVnYXRlc1t0eXBlXTtcbiAgICBpZighZGVsZWdhdGVzIHx8ICFkZWxlZ2F0ZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yKCB2YXIgaSA9IDAsIGxlbiA9IGRlbGVnYXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgICAgaWYoIGRlbGVnYXRlc1tpXSA9PT0gZGVsZWdhdGUgKSBkZWxlZ2F0ZXMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxuXG59KTtcblxuXG5mdW5jdGlvbiBtYXRjaFBhcmVudChldiAsIGRlbGVnYXRlcywgc3RvcCl7XG4gIGlmKCFzdG9wKSByZXR1cm47XG4gIHZhciB0YXJnZXQgPSBldi50YXJnZXQsIHBhaXI7XG4gIHdoaWxlKHRhcmdldCAmJiB0YXJnZXQgIT09IHN0b3Ape1xuICAgIGZvciggdmFyIGkgPSAwLCBsZW4gPSBkZWxlZ2F0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgICAgIHBhaXIgPSBkZWxlZ2F0ZXNbaV07XG4gICAgICBpZihwYWlyICYmIHBhaXIuZWxlbWVudCA9PT0gdGFyZ2V0KXtcbiAgICAgICAgcGFpci5maXJlKGV2KVxuICAgICAgfVxuICAgIH1cbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfVxufSIsIi8vIFJlZ3VsYXJcbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2RvbS5qc1wiKTtcbnZhciBSZWd1bGFyID0gcmVxdWlyZShcIi4uL1JlZ3VsYXIuanNcIik7XG5cbnZhciBtb2RlbEhhbmRsZXJzID0ge1xuICBcInRleHRcIjogaW5pdFRleHQsXG4gIFwic2VsZWN0XCI6IGluaXRTZWxlY3QsXG4gIFwiY2hlY2tib3hcIjogaW5pdENoZWNrQm94LFxuICBcInJhZGlvXCI6IGluaXRSYWRpb1xufVxuXG5cbi8vIEBUT0RPXG5cblxuLy8gdHdvLXdheSBiaW5kaW5nIHdpdGggci1tb2RlbFxuLy8gd29ya3Mgb24gaW5wdXQsIHRleHRhcmVhLCBjaGVja2JveCwgcmFkaW8sIHNlbGVjdFxuXG5SZWd1bGFyLmRpcmVjdGl2ZShcInItbW9kZWxcIiwgZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xuICB2YXIgdGFnID0gZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBzaWduID0gdGFnO1xuICBpZihzaWduID09PSBcImlucHV0XCIpIHNpZ24gPSBlbGVtLnR5cGUgfHwgXCJ0ZXh0XCI7XG4gIGVsc2UgaWYoc2lnbiA9PT0gXCJ0ZXh0YXJlYVwiKSBzaWduID0gXCJ0ZXh0XCI7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgdmFsdWUgPSB0aGlzLiRleHByZXNzaW9uKHZhbHVlKTtcblxuICBpZiggbW9kZWxIYW5kbGVyc1tzaWduXSApIHJldHVybiBtb2RlbEhhbmRsZXJzW3NpZ25dLmNhbGwodGhpcywgZWxlbSwgdmFsdWUpO1xuICBlbHNlIGlmKHRhZyA9PT0gXCJpbnB1dFwiKXtcbiAgICByZXR1cm4gbW9kZWxIYW5kbGVycy50ZXh0LmNhbGwodGhpcywgZWxlbSwgdmFsdWUpO1xuICB9XG59KTtcblxuXG5cbi8vIGJpbmRpbmcgPHNlbGVjdD5cblxuZnVuY3Rpb24gaW5pdFNlbGVjdCggZWxlbSwgcGFyc2VkKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgd2MgPXRoaXMuJHdhdGNoKHBhcnNlZCwgZnVuY3Rpb24obmV3VmFsdWUpe1xuICAgIHZhciBjaGlsZHJlbiA9IF8uc2xpY2UoZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJykpXG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihub2RlLCBpbmRleCl7XG4gICAgICBpZihub2RlLnZhbHVlID09IG5ld1ZhbHVlKXtcbiAgICAgICAgZWxlbS5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSlcbiAgfSk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlcigpe1xuICAgIHBhcnNlZC5zZXQoc2VsZiwgdGhpcy52YWx1ZSk7XG4gICAgd2MubGFzdCA9IHRoaXMudmFsdWU7XG4gICAgc2VsZi4kdXBkYXRlKCk7XG4gIH1cblxuICBkb20ub24oZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gIFxuICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQgJiYgZWxlbS52YWx1ZSl7XG4gICAgIHBhcnNlZC5zZXQoc2VsZiwgZWxlbS52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIGRlc3Ryb3koKXtcbiAgICBkb20ub2ZmKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICB9XG59XG5cbi8vIGlucHV0LHRleHRhcmVhIGJpbmRpbmdcblxuZnVuY3Rpb24gaW5pdFRleHQoZWxlbSwgcGFyc2VkKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgd2MgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKG5ld1ZhbHVlKXtcbiAgICBpZihlbGVtLnZhbHVlICE9PSBuZXdWYWx1ZSkgZWxlbS52YWx1ZSA9IG5ld1ZhbHVlID09IG51bGw/IFwiXCI6IFwiXCIgKyBuZXdWYWx1ZTtcbiAgfSk7XG5cbiAgLy8gQFRPRE8gdG8gZml4ZWQgZXZlbnRcbiAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoZXYpe1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBpZihldi50eXBlPT09J2N1dCcgfHwgZXYudHlwZT09PSdwYXN0ZScpe1xuICAgICAgXy5uZXh0VGljayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGF0LnZhbHVlXG4gICAgICAgIHBhcnNlZC5zZXQoc2VsZiwgdmFsdWUpO1xuICAgICAgICB3Yy5sYXN0ID0gdmFsdWU7XG4gICAgICAgIHNlbGYuJHVwZGF0ZSgpO1xuICAgICAgfSlcbiAgICB9ZWxzZXtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhhdC52YWx1ZVxuICAgICAgICBwYXJzZWQuc2V0KHNlbGYsIHZhbHVlKTtcbiAgICAgICAgd2MubGFzdCA9IHZhbHVlO1xuICAgICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgaWYoZG9tLm1zaWUgIT09IDkgJiYgXCJvbmlucHV0XCIgaW4gZG9tLnROb2RlICl7XG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgaGFuZGxlciApO1xuICB9ZWxzZXtcbiAgICBkb20ub24oZWxlbSwgXCJwYXN0ZVwiLCBoYW5kbGVyKVxuICAgIGRvbS5vbihlbGVtLCBcImtleXVwXCIsIGhhbmRsZXIpXG4gICAgZG9tLm9uKGVsZW0sIFwiY3V0XCIsIGhhbmRsZXIpXG4gICAgZG9tLm9uKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG4gIH1cbiAgaWYocGFyc2VkLmdldChzZWxmKSA9PT0gdW5kZWZpbmVkICYmIGVsZW0udmFsdWUpe1xuICAgICBwYXJzZWQuc2V0KHNlbGYsIGVsZW0udmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoKXtcbiAgICBpZihkb20ubXNpZSAhPT0gOSAmJiBcIm9uaW5wdXRcIiBpbiBkb20udE5vZGUgKXtcbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZXIgKTtcbiAgICB9ZWxzZXtcbiAgICAgIGRvbS5vZmYoZWxlbSwgXCJwYXN0ZVwiLCBoYW5kbGVyKVxuICAgICAgZG9tLm9mZihlbGVtLCBcImtleXVwXCIsIGhhbmRsZXIpXG4gICAgICBkb20ub2ZmKGVsZW0sIFwiY3V0XCIsIGhhbmRsZXIpXG4gICAgICBkb20ub2ZmKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG5cblxuLy8gaW5wdXQ6Y2hlY2tib3ggIGJpbmRpbmdcblxuZnVuY3Rpb24gaW5pdENoZWNrQm94KGVsZW0sIHBhcnNlZCl7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHdhdGNoZXIgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKG5ld1ZhbHVlKXtcbiAgICBkb20uYXR0cihlbGVtLCAnY2hlY2tlZCcsICEhbmV3VmFsdWUpO1xuICB9KTtcblxuICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoKXtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgcGFyc2VkLnNldChzZWxmLCB2YWx1ZSk7XG4gICAgd2F0Y2hlci5sYXN0ID0gdmFsdWU7XG4gICAgc2VsZi4kdXBkYXRlKCk7XG4gIH1cbiAgaWYocGFyc2VkLnNldCkgZG9tLm9uKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG5cbiAgaWYocGFyc2VkLmdldChzZWxmKSA9PT0gdW5kZWZpbmVkKXtcbiAgICBwYXJzZWQuc2V0KHNlbGYsICEhZWxlbS5jaGVja2VkKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBkZXN0cm95KCl7XG4gICAgaWYocGFyc2VkLnNldCkgZG9tLm9mZihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuICB9XG59XG5cblxuLy8gaW5wdXQ6cmFkaW8gYmluZGluZ1xuXG5mdW5jdGlvbiBpbml0UmFkaW8oZWxlbSwgcGFyc2VkKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgd2MgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKCBuZXdWYWx1ZSApe1xuICAgIGlmKG5ld1ZhbHVlID09IGVsZW0udmFsdWUpIGVsZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgZWxzZSBlbGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgfSk7XG5cblxuICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoKXtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIHBhcnNlZC5zZXQoc2VsZiwgdmFsdWUpO1xuICAgIHNlbGYuJHVwZGF0ZSgpO1xuICB9XG4gIGlmKHBhcnNlZC5zZXQpIGRvbS5vbihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuICAvLyBiZWFjdXNlIG9ubHkgYWZ0ZXIgY29tcGlsZShpbml0KSwgdGhlIGRvbSBzdHJ1Y3RydWUgaXMgZXhzaXQuIFxuICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQpe1xuICAgIGlmKGVsZW0uY2hlY2tlZCkge1xuICAgICAgcGFyc2VkLnNldChzZWxmLCBlbGVtLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gZGVzdHJveSgpe1xuICAgIGlmKHBhcnNlZC5zZXQpIGRvbS5vZmYoZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcilcbiAgfVxufVxuIiwiXG4vLyB0aGFua3MgZm9yIGFuZ3VsYXIgJiYgbW9vdG9vbHMgZm9yIHNvbWUgY29uY2lzZSZjcm9zcy1wbGF0Zm9ybSAgaW1wbGVtZW50aW9uXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIFRoZSBNSVQgTGljZW5zZVxuLy8gQ29weXJpZ2h0IChjKSAyMDEwLTIwMTQgR29vZ2xlLCBJbmMuIGh0dHA6Ly9hbmd1bGFyanMub3JnXG5cbi8vIC0tLVxuLy8gbGljZW5zZTogTUlULXN0eWxlIGxpY2Vuc2UuIGh0dHA6Ly9tb290b29scy5uZXRcblxuXG52YXIgZG9tID0gbW9kdWxlLmV4cG9ydHM7XG52YXIgZW52ID0gcmVxdWlyZShcIi4vZW52LmpzXCIpO1xudmFyIF8gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIHROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbnZhciBhZGRFdmVudCwgcmVtb3ZlRXZlbnQ7XG52YXIgbm9vcCA9IGZ1bmN0aW9uKCl7fVxuXG52YXIgbmFtZXNwYWNlcyA9IHtcbiAgaHRtbDogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsXG4gIHN2ZzogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG59XG5cbmRvbS5ib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuZG9tLmRvYyA9IGRvY3VtZW50O1xuXG4vLyBjYW1lbENhc2VcbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpe1xuICByZXR1cm4gKFwiXCIgKyBzdHIpLnJlcGxhY2UoLy1cXEQvZywgZnVuY3Rpb24obWF0Y2gpe1xuICAgIHJldHVybiBtYXRjaC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cblxuZG9tLnROb2RlID0gdE5vZGU7XG5cbmlmKHROb2RlLmFkZEV2ZW50TGlzdGVuZXIpe1xuICBhZGRFdmVudCA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGZuKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSk7XG4gIH1cbiAgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpIFxuICB9XG59ZWxzZXtcbiAgYWRkRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xuICAgIG5vZGUuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGZuKTtcbiAgfVxuICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGZuKSB7XG4gICAgbm9kZS5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgZm4pOyBcbiAgfVxufVxuXG5cbmRvbS5tc2llID0gcGFyc2VJbnQoKC9tc2llIChcXGQrKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpIHx8IFtdKVsxXSk7XG5pZiAoaXNOYU4oZG9tLm1zaWUpKSB7XG4gIGRvbS5tc2llID0gcGFyc2VJbnQoKC90cmlkZW50XFwvLio7IHJ2OihcXGQrKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpIHx8IFtdKVsxXSk7XG59XG5cbmRvbS5maW5kID0gZnVuY3Rpb24oc2wpe1xuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSB7XG4gICAgdHJ5e1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2wpO1xuICAgIH1jYXRjaChlKXtcblxuICAgIH1cbiAgfVxuICBpZihzbC5pbmRleE9mKCcjJykhPT0tMSkgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBzbC5zbGljZSgxKSApO1xufVxuXG5kb20uaW5qZWN0ID0gZnVuY3Rpb24obm9kZSwgcmVmZXIsIHBvc2l0aW9uKXtcblxuICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8ICdib3R0b20nO1xuICBpZighbm9kZSkgcmV0dXJuIDtcbiAgaWYoQXJyYXkuaXNBcnJheShub2RlKSl7XG4gICAgdmFyIHRtcCA9IG5vZGU7XG4gICAgbm9kZSA9IGRvbS5mcmFnbWVudCgpO1xuICAgIGZvcih2YXIgaSA9IDAsbGVuID0gdG1wLmxlbmd0aDsgaSA8IGxlbiA7aSsrKXtcbiAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodG1wW2ldKVxuICAgIH1cbiAgfVxuXG4gIHZhciBmaXJzdENoaWxkLCBuZXh0O1xuICBzd2l0Y2gocG9zaXRpb24pe1xuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICByZWZlci5hcHBlbmRDaGlsZCggbm9kZSApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIGlmKCBmaXJzdENoaWxkID0gcmVmZXIuZmlyc3RDaGlsZCApe1xuICAgICAgICByZWZlci5pbnNlcnRCZWZvcmUoIG5vZGUsIHJlZmVyLmZpcnN0Q2hpbGQgKTtcbiAgICAgIH1lbHNle1xuICAgICAgICByZWZlci5hcHBlbmRDaGlsZCggbm9kZSApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYWZ0ZXInOlxuICAgICAgaWYoIG5leHQgPSByZWZlci5uZXh0U2libGluZyApe1xuICAgICAgICBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBub2RlLCBuZXh0ICk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgcmVmZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggbm9kZSApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmVmb3JlJzpcbiAgICAgIHJlZmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBub2RlLCByZWZlciApO1xuICB9XG59XG5cblxuZG9tLmlkID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufVxuXG4vLyBjcmVhdGVFbGVtZW50IFxuZG9tLmNyZWF0ZSA9IGZ1bmN0aW9uKHR5cGUsIG5zLCBhdHRycyl7XG4gIGlmKG5zID09PSAnc3ZnJyl7XG4gICAgaWYoIWVudi5zdmcpIHRocm93IEVycm9yKCd0aGUgZW52IG5lZWQgc3ZnIHN1cHBvcnQnKVxuICAgIG5zID0gbmFtZXNwYWNlcy5zdmc7XG4gIH1cbiAgcmV0dXJuICFucz8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLCB0eXBlKTtcbn1cblxuLy8gZG9jdW1lbnRGcmFnbWVudFxuZG9tLmZyYWdtZW50ID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbn1cblxuXG5cbnZhciBzcGVjaWFsQXR0ciA9IHtcbiAgJ2NsYXNzJzogZnVuY3Rpb24obm9kZSwgdmFsdWUpe1xuICAgICgnY2xhc3NOYW1lJyBpbiBub2RlICYmIChub2RlLm5hbWVzcGFjZVVSSSA9PT0gbmFtZXNwYWNlcy5odG1sIHx8ICFub2RlLm5hbWVzcGFjZVVSSSkpID9cbiAgICAgIG5vZGUuY2xhc3NOYW1lID0gKHZhbHVlIHx8ICcnKSA6IG5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIHZhbHVlKTtcbiAgfSxcbiAgJ2Zvcic6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKXtcbiAgICAoJ2h0bWxGb3InIGluIG5vZGUpID8gbm9kZS5odG1sRm9yID0gdmFsdWUgOiBub2RlLnNldEF0dHJpYnV0ZSgnZm9yJywgdmFsdWUpO1xuICB9LFxuICAnc3R5bGUnOiBmdW5jdGlvbihub2RlLCB2YWx1ZSl7XG4gICAgKG5vZGUuc3R5bGUpID8gbm9kZS5zdHlsZS5jc3NUZXh0ID0gdmFsdWUgOiBub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCB2YWx1ZSk7XG4gIH0sXG4gICd2YWx1ZSc6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKXtcbiAgICBub2RlLnZhbHVlID0gKHZhbHVlICE9IG51bGwpID8gdmFsdWUgOiAnJztcbiAgfVxufVxuXG5cbi8vIGF0dHJpYnV0ZSBTZXR0ZXIgJiBHZXR0ZXJcbmRvbS5hdHRyID0gZnVuY3Rpb24obm9kZSwgbmFtZSwgdmFsdWUpe1xuICBpZiAoXy5pc0Jvb2xlYW5BdHRyKG5hbWUpKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICghIXZhbHVlKSB7XG4gICAgICAgIG5vZGVbbmFtZV0gPSB0cnVlO1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCBuYW1lKTtcbiAgICAgICAgLy8gbHQgaWU3IC4gdGhlIGphdmFzY3JpcHQgY2hlY2tlZCBzZXR0aW5nIGlzIGluIHZhbGlkXG4gICAgICAgIC8vaHR0cDovL2J5dGVzLmNvbS90b3BpYy9qYXZhc2NyaXB0L2luc2lnaHRzLzc5OTE2Ny1icm93c2VyLXF1aXJrLWR5bmFtaWNhbGx5LWFwcGVuZGVkLWNoZWNrZWQtY2hlY2tib3gtZG9lcy1ub3QtYXBwZWFyLWNoZWNrZWQtaWVcbiAgICAgICAgaWYoZG9tLm1zaWUgJiYgZG9tLm1zaWUgPD03ICkgbm9kZS5kZWZhdWx0Q2hlY2tlZCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVbbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAobm9kZVtuYW1lXSB8fFxuICAgICAgICAgICAgICAgKG5vZGUuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0obmFtZSl8fCBub29wKS5zcGVjaWZpZWQpID8gbmFtZSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gaWYgaW4gc3BlY2lhbEF0dHI7XG4gICAgaWYoc3BlY2lhbEF0dHJbbmFtZV0pIHNwZWNpYWxBdHRyW25hbWVdKG5vZGUsIHZhbHVlKTtcbiAgICBlbHNlIGlmKHZhbHVlID09PSBudWxsKSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxuICAgIGVsc2Ugbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKSB7XG4gICAgLy8gdGhlIGV4dHJhIGFyZ3VtZW50IFwiMlwiIGlzIHRvIGdldCB0aGUgcmlnaHQgdGhpbmcgZm9yIGEuaHJlZiBpbiBJRSwgc2VlIGpRdWVyeSBjb2RlXG4gICAgLy8gc29tZSBlbGVtZW50cyAoZS5nLiBEb2N1bWVudCkgZG9uJ3QgaGF2ZSBnZXQgYXR0cmlidXRlLCBzbyByZXR1cm4gdW5kZWZpbmVkXG4gICAgdmFyIHJldCA9IG5vZGUuZ2V0QXR0cmlidXRlKG5hbWUsIDIpO1xuICAgIC8vIG5vcm1hbGl6ZSBub24tZXhpc3RpbmcgYXR0cmlidXRlcyB0byB1bmRlZmluZWQgKGFzIGpRdWVyeSlcbiAgICByZXR1cm4gcmV0ID09PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuICB9XG59XG5cblxuZG9tLm9uID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgaGFuZGxlcil7XG4gIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcbiAgaGFuZGxlci5yZWFsID0gZnVuY3Rpb24oZXYpe1xuICAgIHZhciAkZXZlbnQgPSBuZXcgRXZlbnQoZXYpO1xuICAgICRldmVudC5vcmlnaW4gPSBub2RlO1xuICAgIGhhbmRsZXIuY2FsbChub2RlLCAkZXZlbnQpO1xuICB9XG4gIHR5cGVzLmZvckVhY2goZnVuY3Rpb24odHlwZSl7XG4gICAgdHlwZSA9IGZpeEV2ZW50TmFtZShub2RlLCB0eXBlKTtcbiAgICBhZGRFdmVudChub2RlLCB0eXBlLCBoYW5kbGVyLnJlYWwpO1xuICB9KTtcbn1cbmRvbS5vZmYgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBoYW5kbGVyKXtcbiAgdmFyIHR5cGVzID0gdHlwZS5zcGxpdCgnICcpO1xuICBoYW5kbGVyID0gaGFuZGxlci5yZWFsIHx8IGhhbmRsZXI7XG4gIHR5cGVzLmZvckVhY2goZnVuY3Rpb24odHlwZSl7XG4gICAgdHlwZSA9IGZpeEV2ZW50TmFtZShub2RlLCB0eXBlKTtcbiAgICByZW1vdmVFdmVudChub2RlLCB0eXBlLCBoYW5kbGVyKTtcbiAgfSlcbn1cblxuXG5kb20udGV4dCA9IChmdW5jdGlvbiAoKXtcbiAgdmFyIG1hcCA9IHt9O1xuICBpZiAoZG9tLm1zaWUgJiYgZG9tLm1zaWUgPCA5KSB7XG4gICAgbWFwWzFdID0gJ2lubmVyVGV4dCc7ICAgIFxuICAgIG1hcFszXSA9ICdub2RlVmFsdWUnOyAgICBcbiAgfSBlbHNlIHtcbiAgICBtYXBbMV0gPSBtYXBbM10gPSAndGV4dENvbnRlbnQnO1xuICB9XG4gIFxuICByZXR1cm4gZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XG4gICAgdmFyIHRleHRQcm9wID0gbWFwW25vZGUubm9kZVR5cGVdO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dFByb3AgPyBub2RlW3RleHRQcm9wXSA6ICcnO1xuICAgIH1cbiAgICBub2RlW3RleHRQcm9wXSA9IHZhbHVlO1xuICB9XG59KSgpO1xuXG5cbmRvbS5odG1sID0gZnVuY3Rpb24oIG5vZGUsIGh0bWwgKXtcbiAgaWYodHlwZW9mIGh0bWwgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHJldHVybiBub2RlLmlubmVySFRNTDtcbiAgfWVsc2V7XG4gICAgbm9kZS5pbm5lckhUTUwgPSBodG1sO1xuICB9XG59XG5cbmRvbS5yZXBsYWNlID0gZnVuY3Rpb24obm9kZSwgcmVwbGFjZWQpe1xuICBpZihyZXBsYWNlZC5wYXJlbnROb2RlKSByZXBsYWNlZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChub2RlLCByZXBsYWNlZCk7XG59XG5cbmRvbS5yZW1vdmUgPSBmdW5jdGlvbihub2RlKXtcbiAgaWYobm9kZS5wYXJlbnROb2RlKSBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5cbi8vIGNzcyBTZXR0bGUgJiBHZXR0ZXIgZnJvbSBhbmd1bGFyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIGl0IGlzbnQgY29tcHV0ZWQgc3R5bGUgXG5kb20uY3NzID0gZnVuY3Rpb24obm9kZSwgbmFtZSwgdmFsdWUpe1xuICBpZiggXy50eXBlT2YobmFtZSkgPT09IFwib2JqZWN0XCIgKXtcbiAgICBmb3IodmFyIGkgaW4gbmFtZSl7XG4gICAgICBpZiggbmFtZS5oYXNPd25Qcm9wZXJ0eShpKSApe1xuICAgICAgICBkb20uY3NzKCBub2RlLCBpLCBuYW1lW2ldICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblxuICAgIG5hbWUgPSBjYW1lbENhc2UobmFtZSk7XG4gICAgaWYobmFtZSkgbm9kZS5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB2YXIgdmFsO1xuICAgIGlmIChkb20ubXNpZSA8PSA4KSB7XG4gICAgICAvLyB0aGlzIGlzIHNvbWUgSUUgc3BlY2lmaWMgd2VpcmRuZXNzIHRoYXQgalF1ZXJ5IDEuNi40IGRvZXMgbm90IHN1cmUgd2h5XG4gICAgICB2YWwgPSBub2RlLmN1cnJlbnRTdHlsZSAmJiBub2RlLmN1cnJlbnRTdHlsZVtuYW1lXTtcbiAgICAgIGlmICh2YWwgPT09ICcnKSB2YWwgPSAnYXV0byc7XG4gICAgfVxuICAgIHZhbCA9IHZhbCB8fCBub2RlLnN0eWxlW25hbWVdO1xuICAgIGlmIChkb20ubXNpZSA8PSA4KSB7XG4gICAgICB2YWwgPSB2YWwgPT09ICcnID8gdW5kZWZpbmVkIDogdmFsO1xuICAgIH1cbiAgICByZXR1cm4gIHZhbDtcbiAgfVxufVxuXG5kb20uYWRkQ2xhc3MgPSBmdW5jdGlvbihub2RlLCBjbGFzc05hbWUpe1xuICB2YXIgY3VycmVudCA9IG5vZGUuY2xhc3NOYW1lIHx8IFwiXCI7XG4gIGlmICgoXCIgXCIgKyBjdXJyZW50ICsgXCIgXCIpLmluZGV4T2YoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikgPT09IC0xKSB7XG4gICAgbm9kZS5jbGFzc05hbWUgPSBjdXJyZW50PyAoIGN1cnJlbnQgKyBcIiBcIiArIGNsYXNzTmFtZSApIDogY2xhc3NOYW1lO1xuICB9XG59XG5cbmRvbS5kZWxDbGFzcyA9IGZ1bmN0aW9uKG5vZGUsIGNsYXNzTmFtZSl7XG4gIHZhciBjdXJyZW50ID0gbm9kZS5jbGFzc05hbWUgfHwgXCJcIjtcbiAgbm9kZS5jbGFzc05hbWUgPSAoXCIgXCIgKyBjdXJyZW50ICsgXCIgXCIpLnJlcGxhY2UoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIiwgXCIgXCIpLnRyaW0oKTtcbn1cblxuZG9tLmhhc0NsYXNzID0gZnVuY3Rpb24obm9kZSwgY2xhc3NOYW1lKXtcbiAgdmFyIGN1cnJlbnQgPSBub2RlLmNsYXNzTmFtZSB8fCBcIlwiO1xuICByZXR1cm4gKFwiIFwiICsgY3VycmVudCArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpICE9PSAtMTtcbn1cblxuXG5cbi8vIHNpbXBsZSBFdmVudCB3cmFwXG5cbi8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTA2ODE5Ni9pZTgtaWU3LW9uY2hhbmdlLWV2ZW50LWlzLWVtaXRlZC1vbmx5LWFmdGVyLXJlcGVhdGVkLXNlbGVjdGlvblxuZnVuY3Rpb24gZml4RXZlbnROYW1lKGVsZW0sIG5hbWUpe1xuICByZXR1cm4gKG5hbWUgPT09ICdjaGFuZ2UnICAmJiAgZG9tLm1zaWUgPCA5ICYmIFxuICAgICAgKGVsZW0gJiYgZWxlbS50YWdOYW1lICYmIGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpPT09J2lucHV0JyAmJiBcbiAgICAgICAgKGVsZW0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBlbGVtLnR5cGUgPT09ICdyYWRpbycpXG4gICAgICApXG4gICAgKT8gJ2NsaWNrJzogbmFtZTtcbn1cblxudmFyIHJNb3VzZUV2ZW50ID0gL14oPzpjbGlja3xkYmxjbGlja3xjb250ZXh0bWVudXxET01Nb3VzZVNjcm9sbHxtb3VzZSg/OlxcdyspKSQvXG52YXIgZG9jID0gZG9jdW1lbnQ7XG5kb2MgPSAoIWRvYy5jb21wYXRNb2RlIHx8IGRvYy5jb21wYXRNb2RlID09PSAnQ1NTMUNvbXBhdCcpID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGRvYy5ib2R5O1xuZnVuY3Rpb24gRXZlbnQoZXYpe1xuICBldiA9IGV2IHx8IHdpbmRvdy5ldmVudDtcbiAgaWYoZXYuX2ZpeGVkKSByZXR1cm4gZXY7XG4gIHRoaXMuZXZlbnQgPSBldjtcbiAgdGhpcy50YXJnZXQgPSBldi50YXJnZXQgfHwgZXYuc3JjRWxlbWVudDtcblxuICB2YXIgdHlwZSA9IHRoaXMudHlwZSA9IGV2LnR5cGU7XG4gIHZhciBidXR0b24gPSB0aGlzLmJ1dHRvbiA9IGV2LmJ1dHRvbjtcblxuICAvLyBpZiBpcyBtb3VzZSBldmVudCBwYXRjaCBwYWdlWFxuICBpZihyTW91c2VFdmVudC50ZXN0KHR5cGUpKXsgLy9maXggcGFnZVhcbiAgICB0aGlzLnBhZ2VYID0gKGV2LnBhZ2VYICE9IG51bGwpID8gZXYucGFnZVggOiBldi5jbGllbnRYICsgZG9jLnNjcm9sbExlZnQ7XG4gICAgdGhpcy5wYWdlWSA9IChldi5wYWdlWCAhPSBudWxsKSA/IGV2LnBhZ2VZIDogZXYuY2xpZW50WSArIGRvYy5zY3JvbGxUb3A7XG4gICAgaWYgKHR5cGUgPT09ICdtb3VzZW92ZXInIHx8IHR5cGUgPT09ICdtb3VzZW91dCcpey8vIGZpeCByZWxhdGVkVGFyZ2V0XG4gICAgICB2YXIgcmVsYXRlZCA9IGV2LnJlbGF0ZWRUYXJnZXQgfHwgZXZbKHR5cGUgPT09ICdtb3VzZW92ZXInID8gJ2Zyb20nIDogJ3RvJykgKyAnRWxlbWVudCddO1xuICAgICAgd2hpbGUgKHJlbGF0ZWQgJiYgcmVsYXRlZC5ub2RlVHlwZSA9PT0gMykgcmVsYXRlZCA9IHJlbGF0ZWQucGFyZW50Tm9kZTtcbiAgICAgIHRoaXMucmVsYXRlZFRhcmdldCA9IHJlbGF0ZWQ7XG4gICAgfVxuICB9XG4gIC8vIGlmIGlzIG1vdXNlc2Nyb2xsXG4gIGlmICh0eXBlID09PSAnRE9NTW91c2VTY3JvbGwnIHx8IHR5cGUgPT09ICdtb3VzZXdoZWVsJyl7XG4gICAgLy8gZmYgZXYuZGV0YWlsOiAzICAgIG90aGVyIGV2LndoZWVsRGVsdGE6IC0xMjBcbiAgICB0aGlzLndoZWVsRGVsdGEgPSAoZXYud2hlZWxEZWx0YSkgPyBldi53aGVlbERlbHRhIC8gMTIwIDogLShldi5kZXRhaWwgfHwgMCkgLyAzO1xuICB9XG4gIFxuICAvLyBmaXggd2hpY2hcbiAgdGhpcy53aGljaCA9IGV2LndoaWNoIHx8IGV2LmtleUNvZGU7XG4gIGlmKCAhdGhpcy53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCl7XG4gICAgLy8gaHR0cDovL2FwaS5qcXVlcnkuY29tL2V2ZW50LndoaWNoLyB1c2Ugd2hpY2hcbiAgICB0aGlzLndoaWNoID0gKCBidXR0b24gJiAxID8gMSA6ICggYnV0dG9uICYgMiA/IDMgOiAoIGJ1dHRvbiAmIDQgPyAyIDogMCApICkgKTtcbiAgfVxuICB0aGlzLl9maXhlZCA9IHRydWU7XG59XG5cbl8uZXh0ZW5kKEV2ZW50LnByb3RvdHlwZSwge1xuICBpbW1lZGlhdGVTdG9wOiBfLmlzRmFsc2UsXG4gIHN0b3A6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCgpLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9LFxuICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKXtcbiAgICBpZiAodGhpcy5ldmVudC5wcmV2ZW50RGVmYXVsdCkgdGhpcy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGVsc2UgdGhpcy5ldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCl7XG4gICAgaWYgKHRoaXMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB0aGlzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGVsc2UgdGhpcy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCl7XG4gICAgaWYodGhpcy5ldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHRoaXMuZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIH1cbn0pXG5cblxuZG9tLm5leHRGcmFtZSA9IChmdW5jdGlvbigpe1xuICAgIHZhciByZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8IFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAxNilcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgIHZhciBjYW5jZWwgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHRpZCl7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aWQpXG4gICAgICAgICAgICAgICAgIH1cbiAgXG4gIHJldHVybiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgdmFyIGlkID0gcmVxdWVzdChjYWxsYmFjayk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7IGNhbmNlbChpZCk7IH1cbiAgfVxufSkoKTtcblxuLy8gM2tzIGZvciBhbmd1bGFyJ3MgcmFmICBzZXJ2aWNlXG52YXIgaztcbmRvbS5uZXh0UmVmbG93ID0gZG9tLm1zaWU/IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgcmV0dXJuIGRvbS5uZXh0RnJhbWUoZnVuY3Rpb24oKXtcbiAgICBrID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcbiAgICBjYWxsYmFjaygpO1xuICB9KVxufTogZG9tLm5leHRGcmFtZTtcblxuXG5cbiIsIi8vIHNvbWUgZml4dHVyZSB0ZXN0O1xuLy8gLS0tLS0tLS0tLS0tLS0tXG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuZXhwb3J0cy5zdmcgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCBcImh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjQmFzaWNTdHJ1Y3R1cmVcIiwgXCIxLjFcIiApO1xufSkoKTtcblxuXG5leHBvcnRzLmJyb3dzZXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQubm9kZVR5cGU7XG4vLyB3aGV0aGVyIGhhdmUgY29tcG9uZW50IGluIGluaXRpYWxpemluZ1xuZXhwb3J0cy5leHByQ2FjaGUgPSBfLmNhY2hlKDEwMDApO1xuZXhwb3J0cy5pc1J1bm5pbmcgPSBmYWxzZTtcbiIsInZhciBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgY29tYmluZSA9IHJlcXVpcmUoJy4vaGVscGVyL2NvbWJpbmUnKVxuXG5mdW5jdGlvbiBHcm91cChsaXN0KXtcbiAgdGhpcy5jaGlsZHJlbiA9IGxpc3QgfHwgW107XG59XG5cblxudmFyIG8gPSBfLmV4dGVuZChHcm91cC5wcm90b3R5cGUsIHtcbiAgZGVzdHJveTogZnVuY3Rpb24oZmlyc3Qpe1xuICAgIGNvbWJpbmUuZGVzdHJveSh0aGlzLmNoaWxkcmVuLCBmaXJzdCk7XG4gICAgaWYodGhpcy5vbmRlc3Ryb3kpIHRoaXMub25kZXN0cm95KCk7XG4gICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gIH0sXG4gIGdldDogZnVuY3Rpb24oaSl7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baV1cbiAgfSxcbiAgcHVzaDogZnVuY3Rpb24oaXRlbSl7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKCBpdGVtICk7XG4gIH1cbn0pXG5vLmluamVjdCA9IG8uJGluamVjdCA9IGNvbWJpbmUuaW5qZWN0XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyb3VwO1xuXG5cbiIsInZhciBfID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgZG9tICA9IHJlcXVpcmUoXCIuLi9kb20uanNcIik7XG52YXIgYW5pbWF0ZSA9IHt9O1xudmFyIGVudiA9IHJlcXVpcmUoXCIuLi9lbnYuanNcIik7XG5cblxudmFyIFxuICB0cmFuc2l0aW9uRW5kID0gJ3RyYW5zaXRpb25lbmQnLCBcbiAgYW5pbWF0aW9uRW5kID0gJ2FuaW1hdGlvbmVuZCcsIFxuICB0cmFuc2l0aW9uUHJvcGVydHkgPSAndHJhbnNpdGlvbicsIFxuICBhbmltYXRpb25Qcm9wZXJ0eSA9ICdhbmltYXRpb24nO1xuXG5pZighKCdvbnRyYW5zaXRpb25lbmQnIGluIHdpbmRvdykpe1xuICBpZignb253ZWJraXR0cmFuc2l0aW9uZW5kJyBpbiB3aW5kb3cpIHtcbiAgICBcbiAgICAvLyBDaHJvbWUvU2FmICgrIE1vYmlsZSBTYWYpL0FuZHJvaWRcbiAgICB0cmFuc2l0aW9uRW5kICs9ICcgd2Via2l0VHJhbnNpdGlvbkVuZCc7XG4gICAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ3dlYmtpdFRyYW5zaXRpb24nXG4gIH0gZWxzZSBpZignb25vdHJhbnNpdGlvbmVuZCcgaW4gZG9tLnROb2RlIHx8IG5hdmlnYXRvci5hcHBOYW1lID09PSAnT3BlcmEnKSB7XG5cbiAgICAvLyBPcGVyYVxuICAgIHRyYW5zaXRpb25FbmQgKz0gJyBvVHJhbnNpdGlvbkVuZCc7XG4gICAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ29UcmFuc2l0aW9uJztcbiAgfVxufVxuaWYoISgnb25hbmltYXRpb25lbmQnIGluIHdpbmRvdykpe1xuICBpZiAoJ29ud2Via2l0YW5pbWF0aW9uZW5kJyBpbiB3aW5kb3cpe1xuICAgIC8vIENocm9tZS9TYWYgKCsgTW9iaWxlIFNhZikvQW5kcm9pZFxuICAgIGFuaW1hdGlvbkVuZCArPSAnIHdlYmtpdEFuaW1hdGlvbkVuZCc7XG4gICAgYW5pbWF0aW9uUHJvcGVydHkgPSAnd2Via2l0QW5pbWF0aW9uJztcblxuICB9ZWxzZSBpZiAoJ29ub2FuaW1hdGlvbmVuZCcgaW4gZG9tLnROb2RlKXtcbiAgICAvLyBPcGVyYVxuICAgIGFuaW1hdGlvbkVuZCArPSAnIG9BbmltYXRpb25FbmQnO1xuICAgIGFuaW1hdGlvblByb3BlcnR5ID0gJ29BbmltYXRpb24nO1xuICB9XG59XG5cbi8qKlxuICogaW5qZWN0IG5vZGUgd2l0aCBhbmltYXRpb25cbiAqIEBwYXJhbSAge1t0eXBlXX0gbm9kZSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcmVmZXIgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gZGlyZWN0aW9uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuYW5pbWF0ZS5pbmplY3QgPSBmdW5jdGlvbiggbm9kZSwgcmVmZXIgLGRpcmVjdGlvbiwgY2FsbGJhY2sgKXtcbiAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBfLm5vb3A7XG4gIGlmKCBBcnJheS5pc0FycmF5KG5vZGUpICl7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9tLmZyYWdtZW50KCk7XG4gICAgdmFyIGNvdW50PTA7XG5cbiAgICBmb3IodmFyIGkgPSAwLGxlbiA9IG5vZGUubGVuZ3RoO2kgPCBsZW47IGkrKyApe1xuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm9kZVtpXSk7IFxuICAgIH1cbiAgICBkb20uaW5qZWN0KGZyYWdtZW50LCByZWZlciwgZGlyZWN0aW9uKTtcblxuICAgIC8vIGlmIGFsbCBub2RlcyBpcyBkb25lLCB3ZSBjYWxsIHRoZSBjYWxsYmFja1xuICAgIHZhciBlbnRlckNhbGxiYWNrID0gZnVuY3Rpb24gKCl7XG4gICAgICBjb3VudCsrO1xuICAgICAgaWYoIGNvdW50ID09PSBsZW4gKSBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZihsZW4gPT09IGNvdW50KSBjYWxsYmFjaygpO1xuICAgIGZvciggaSA9IDA7IGkgPCBsZW47IGkrKyApe1xuICAgICAgaWYobm9kZVtpXS5vbmVudGVyKXtcbiAgICAgICAgbm9kZVtpXS5vbmVudGVyKGVudGVyQ2FsbGJhY2spO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGVudGVyQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1lbHNle1xuICAgIGRvbS5pbmplY3QoIG5vZGUsIHJlZmVyLCBkaXJlY3Rpb24gKTtcbiAgICBpZihub2RlLm9uZW50ZXIpe1xuICAgICAgbm9kZS5vbmVudGVyKGNhbGxiYWNrKVxuICAgIH1lbHNle1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiByZW1vdmUgbm9kZSB3aXRoIGFuaW1hdGlvblxuICogQHBhcmFtICB7W3R5cGVdfSAgIG5vZGUgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5hbmltYXRlLnJlbW92ZSA9IGZ1bmN0aW9uKG5vZGUsIGNhbGxiYWNrKXtcbiAgaWYoIW5vZGUpIHRocm93IG5ldyBFcnJvcignbm9kZSB0byBiZSByZW1vdmVkIGlzIHVuZGVmaW5lZCcpXG4gIHZhciBjb3VudCA9IDA7XG4gIGZ1bmN0aW9uIGxvb3AoKXtcbiAgICBjb3VudCsrO1xuICAgIGlmKGNvdW50ID09PSBsZW4pIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgfVxuICBpZihBcnJheS5pc0FycmF5KG5vZGUpKXtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBub2RlLmxlbmd0aDsgaSA8IGxlbiA7IGkrKyl7XG4gICAgICBhbmltYXRlLnJlbW92ZShub2RlW2ldLCBsb29wKVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBpZihub2RlLm9ubGVhdmUpe1xuICAgIG5vZGUub25sZWF2ZShmdW5jdGlvbigpe1xuICAgICAgcmVtb3ZlRG9uZShub2RlLCBjYWxsYmFjaylcbiAgICB9KVxuICB9ZWxzZXtcbiAgICByZW1vdmVEb25lKG5vZGUsIGNhbGxiYWNrKVxuICB9XG59XG5cbnZhciByZW1vdmVEb25lID0gZnVuY3Rpb24gKG5vZGUsIGNhbGxiYWNrKXtcbiAgICBkb20ucmVtb3ZlKG5vZGUpO1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG59XG5cblxuXG5hbmltYXRlLnN0YXJ0Q2xhc3NBbmltYXRlID0gZnVuY3Rpb24gKCBub2RlLCBjbGFzc05hbWUsICBjYWxsYmFjaywgbW9kZSApe1xuICB2YXIgYWN0aXZlQ2xhc3NOYW1lLCB0aW1lb3V0LCB0aWQsIG9uY2VBbmltO1xuICBpZiggKCFhbmltYXRpb25FbmQgJiYgIXRyYW5zaXRpb25FbmQpIHx8IGVudi5pc1J1bm5pbmcgKXtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfVxuXG4gIGlmKG1vZGUgIT09IDQpe1xuICAgIG9uY2VBbmltID0gXy5vbmNlKGZ1bmN0aW9uIG9uQW5pbWF0ZUVuZCgpe1xuICAgICAgaWYodGlkKSBjbGVhclRpbWVvdXQodGlkKTtcblxuICAgICAgaWYobW9kZSA9PT0gMikge1xuICAgICAgICBkb20uZGVsQ2xhc3Mobm9kZSwgYWN0aXZlQ2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmKG1vZGUgIT09IDMpeyAvLyBtb2RlIGhvbGQgdGhlIGNsYXNzXG4gICAgICAgIGRvbS5kZWxDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuICAgICAgfVxuICAgICAgZG9tLm9mZihub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltKVxuICAgICAgZG9tLm9mZihub2RlLCB0cmFuc2l0aW9uRW5kLCBvbmNlQW5pbSlcblxuICAgICAgY2FsbGJhY2soKTtcblxuICAgIH0pO1xuICB9ZWxzZXtcbiAgICBvbmNlQW5pbSA9IF8ub25jZShmdW5jdGlvbiBvbkFuaW1hdGVFbmQoKXtcbiAgICAgIGlmKHRpZCkgY2xlYXJUaW1lb3V0KHRpZCk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9XG4gIGlmKG1vZGUgPT09IDIpeyAvLyBhdXRvIHJlbW92ZWRcbiAgICBkb20uYWRkQ2xhc3MoIG5vZGUsIGNsYXNzTmFtZSApO1xuXG4gICAgYWN0aXZlQ2xhc3NOYW1lID0gY2xhc3NOYW1lLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgIHJldHVybiBuYW1lICsgJy1hY3RpdmUnO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuXG4gICAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcbiAgICAgIGRvbS5hZGRDbGFzcyggbm9kZSwgYWN0aXZlQ2xhc3NOYW1lICk7XG4gICAgICB0aW1lb3V0ID0gZ2V0TWF4VGltZW91dCggbm9kZSApO1xuICAgICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcbiAgICB9KTtcblxuICB9ZWxzZSBpZihtb2RlPT09NCl7XG4gICAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcbiAgICAgIGRvbS5kZWxDbGFzcyggbm9kZSwgY2xhc3NOYW1lICk7XG4gICAgICB0aW1lb3V0ID0gZ2V0TWF4VGltZW91dCggbm9kZSApO1xuICAgICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcbiAgICB9KTtcblxuICB9ZWxzZXtcbiAgICBkb20ubmV4dFJlZmxvdyhmdW5jdGlvbigpe1xuICAgICAgZG9tLmFkZENsYXNzKCBub2RlLCBjbGFzc05hbWUgKTtcbiAgICAgIHRpbWVvdXQgPSBnZXRNYXhUaW1lb3V0KCBub2RlICk7XG4gICAgICB0aWQgPSBzZXRUaW1lb3V0KCBvbmNlQW5pbSwgdGltZW91dCApO1xuICAgIH0pO1xuICB9XG5cblxuXG4gIGRvbS5vbiggbm9kZSwgYW5pbWF0aW9uRW5kLCBvbmNlQW5pbSApXG4gIGRvbS5vbiggbm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0gKVxuICByZXR1cm4gb25jZUFuaW07XG59XG5cblxuYW5pbWF0ZS5zdGFydFN0eWxlQW5pbWF0ZSA9IGZ1bmN0aW9uKG5vZGUsIHN0eWxlcywgY2FsbGJhY2spe1xuICB2YXIgdGltZW91dCwgb25jZUFuaW0sIHRpZDtcblxuICBkb20ubmV4dFJlZmxvdyhmdW5jdGlvbigpe1xuICAgIGRvbS5jc3MoIG5vZGUsIHN0eWxlcyApO1xuICAgIHRpbWVvdXQgPSBnZXRNYXhUaW1lb3V0KCBub2RlICk7XG4gICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcbiAgfSk7XG5cblxuICBvbmNlQW5pbSA9IF8ub25jZShmdW5jdGlvbiBvbkFuaW1hdGVFbmQoKXtcbiAgICBpZih0aWQpIGNsZWFyVGltZW91dCh0aWQpO1xuXG4gICAgZG9tLm9mZihub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltKVxuICAgIGRvbS5vZmYobm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0pXG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0pO1xuXG4gIGRvbS5vbiggbm9kZSwgYW5pbWF0aW9uRW5kLCBvbmNlQW5pbSApXG4gIGRvbS5vbiggbm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0gKVxuXG4gIHJldHVybiBvbmNlQW5pbTtcbn1cblxuXG4vKipcbiAqIGdldCBtYXh0aW1lb3V0XG4gKiBAcGFyYW0gIHtOb2RlfSBub2RlIFxuICogQHJldHVybiB7W3R5cGVdfSAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF4VGltZW91dChub2RlKXtcbiAgdmFyIHRpbWVvdXQgPSAwLFxuICAgIHREdXJhdGlvbiA9IDAsXG4gICAgdERlbGF5ID0gMCxcbiAgICBhRHVyYXRpb24gPSAwLFxuICAgIGFEZWxheSA9IDAsXG4gICAgcmF0aW8gPSA1IC8gMyxcbiAgICBzdHlsZXMgO1xuXG4gIGlmKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKXtcblxuICAgIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLFxuICAgIHREdXJhdGlvbiA9IGdldE1heFRpbWUoIHN0eWxlc1t0cmFuc2l0aW9uUHJvcGVydHkgKyAnRHVyYXRpb24nXSkgfHwgdER1cmF0aW9uO1xuICAgIHREZWxheSA9IGdldE1heFRpbWUoIHN0eWxlc1t0cmFuc2l0aW9uUHJvcGVydHkgKyAnRGVsYXknXSkgfHwgdERlbGF5O1xuICAgIGFEdXJhdGlvbiA9IGdldE1heFRpbWUoIHN0eWxlc1thbmltYXRpb25Qcm9wZXJ0eSArICdEdXJhdGlvbiddKSB8fCBhRHVyYXRpb247XG4gICAgYURlbGF5ID0gZ2V0TWF4VGltZSggc3R5bGVzW2FuaW1hdGlvblByb3BlcnR5ICsgJ0RlbGF5J10pIHx8IGFEZWxheTtcbiAgICB0aW1lb3V0ID0gTWF0aC5tYXgoIHREdXJhdGlvbit0RGVsYXksIGFEdXJhdGlvbiArIGFEZWxheSApO1xuXG4gIH1cbiAgcmV0dXJuIHRpbWVvdXQgKiAxMDAwICogcmF0aW87XG59XG5cbmZ1bmN0aW9uIGdldE1heFRpbWUoc3RyKXtcblxuICB2YXIgbWF4VGltZW91dCA9IDAsIHRpbWU7XG5cbiAgaWYoIXN0cikgcmV0dXJuIDA7XG5cbiAgc3RyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cil7XG5cbiAgICB0aW1lID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIGlmKCB0aW1lID4gbWF4VGltZW91dCApIG1heFRpbWVvdXQgPSB0aW1lO1xuXG4gIH0pO1xuXG4gIHJldHVybiBtYXhUaW1lb3V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuaW1hdGU7IiwiXG5mdW5jdGlvbiBzaW1wbGVEaWZmKG5vdywgb2xkKXtcbiAgdmFyIG5sZW4gPSBub3cubGVuZ3RoO1xuICB2YXIgb2xlbiA9IG9sZC5sZW5ndGg7XG4gIGlmKG5sZW4gIT09IG9sZW4pe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBubGVuIDsgaSsrKXtcbiAgICBpZihub3dbaV0gIT09IG9sZFtpXSkgcmV0dXJuICB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZVxuXG59XG5cbmZ1bmN0aW9uIGVxdWFscyhhLGIpe1xuICByZXR1cm4gYSA9PT0gYjtcbn1cbmZ1bmN0aW9uIGxkKGFycmF5MSwgYXJyYXkyKXtcbiAgdmFyIG4gPSBhcnJheTEubGVuZ3RoO1xuICB2YXIgbSA9IGFycmF5Mi5sZW5ndGg7XG4gIHZhciBtYXRyaXggPSBbXTtcbiAgZm9yKHZhciBpID0gMDsgaSA8PSBuOyBpKyspe1xuICAgIG1hdHJpeC5wdXNoKFtpXSk7XG4gIH1cbiAgZm9yKHZhciBqPTE7ajw9bTtqKyspe1xuICAgIG1hdHJpeFswXVtqXT1qO1xuICB9XG4gIGZvcih2YXIgaSA9IDE7IGkgPD0gbjsgaSsrKXtcbiAgICBmb3IodmFyIGogPSAxOyBqIDw9IG07IGorKyl7XG4gICAgICBpZihlcXVhbHMoYXJyYXkxW2ktMV0sIGFycmF5MltqLTFdKSl7XG4gICAgICAgIG1hdHJpeFtpXVtqXSA9IG1hdHJpeFtpLTFdW2otMV07XG4gICAgICB9ZWxzZXtcbiAgICAgICAgbWF0cml4W2ldW2pdID0gTWF0aC5taW4oXG4gICAgICAgICAgbWF0cml4W2ktMV1bal0rMSwgLy9kZWxldGVcbiAgICAgICAgICBtYXRyaXhbaV1bai0xXSsxLy9hZGRcbiAgICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXRyaXg7XG59XG5mdW5jdGlvbiB3aG9sZShhcnIyLCBhcnIxLCBpbmRleFRyYWNrKSB7XG4gIGlmKGluZGV4VHJhY2spIHJldHVybiBzaW1wbGVEaWZmKGFycjIsIGFycjEpO1xuICB2YXIgbWF0cml4ID0gbGQoYXJyMSwgYXJyMilcbiAgdmFyIG4gPSBhcnIxLmxlbmd0aDtcbiAgdmFyIGkgPSBuO1xuICB2YXIgbSA9IGFycjIubGVuZ3RoO1xuICB2YXIgaiA9IG07XG4gIHZhciBlZGl0cyA9IFtdO1xuICB2YXIgY3VycmVudCA9IG1hdHJpeFtpXVtqXTtcbiAgd2hpbGUoaT4wIHx8IGo+MCl7XG4gIC8vIHRoZSBsYXN0IGxpbmVcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgZWRpdHMudW5zaGlmdCgzKTtcbiAgICAgIGotLTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLyB0aGUgbGFzdCBjb2xcbiAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgZWRpdHMudW5zaGlmdCgyKTtcbiAgICAgIGktLTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgbm9ydGhXZXN0ID0gbWF0cml4W2kgLSAxXVtqIC0gMV07XG4gICAgdmFyIHdlc3QgPSBtYXRyaXhbaSAtIDFdW2pdO1xuICAgIHZhciBub3J0aCA9IG1hdHJpeFtpXVtqIC0gMV07XG5cbiAgICB2YXIgbWluID0gTWF0aC5taW4obm9ydGgsIHdlc3QsIG5vcnRoV2VzdCk7XG5cbiAgICBpZiAobWluID09PSB3ZXN0KSB7XG4gICAgICBlZGl0cy51bnNoaWZ0KDIpOyAvL2RlbGV0ZVxuICAgICAgaS0tO1xuICAgICAgY3VycmVudCA9IHdlc3Q7XG4gICAgfSBlbHNlIGlmIChtaW4gPT09IG5vcnRoV2VzdCApIHtcbiAgICAgIGlmIChub3J0aFdlc3QgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgZWRpdHMudW5zaGlmdCgwKTsgLy9ubyBjaGFuZ2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRzLnVuc2hpZnQoMSk7IC8vdXBkYXRlXG4gICAgICAgIGN1cnJlbnQgPSBub3J0aFdlc3Q7XG4gICAgICB9XG4gICAgICBpLS07XG4gICAgICBqLS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGVkaXRzLnVuc2hpZnQoMyk7IC8vYWRkXG4gICAgICBqLS07XG4gICAgICBjdXJyZW50ID0gbm9ydGg7XG4gICAgfVxuICB9XG4gIHZhciBMRUFWRSA9IDA7XG4gIHZhciBBREQgPSAzO1xuICB2YXIgREVMRUxFID0gMjtcbiAgdmFyIFVQREFURSA9IDE7XG4gIHZhciBuID0gMDttPTA7XG4gIHZhciBzdGVwcyA9IFtdO1xuICB2YXIgc3RlcCA9IHtpbmRleDogbnVsbCwgYWRkOjAsIHJlbW92ZWQ6W119O1xuXG4gIGZvcih2YXIgaT0wO2k8ZWRpdHMubGVuZ3RoO2krKyl7XG4gICAgaWYoZWRpdHNbaV0gPiAwICl7IC8vIE5PVCBMRUFWRVxuICAgICAgaWYoc3RlcC5pbmRleCA9PT0gbnVsbCl7XG4gICAgICAgIHN0ZXAuaW5kZXggPSBtO1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vTEVBVkVcbiAgICAgIGlmKHN0ZXAuaW5kZXggIT0gbnVsbCl7XG4gICAgICAgIHN0ZXBzLnB1c2goc3RlcClcbiAgICAgICAgc3RlcCA9IHtpbmRleDogbnVsbCwgYWRkOjAsIHJlbW92ZWQ6W119O1xuICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2goZWRpdHNbaV0pe1xuICAgICAgY2FzZSBMRUFWRTpcbiAgICAgICAgbisrO1xuICAgICAgICBtKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBREQ6XG4gICAgICAgIHN0ZXAuYWRkKys7XG4gICAgICAgIG0rKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERFTEVMRTpcbiAgICAgICAgc3RlcC5yZW1vdmVkLnB1c2goYXJyMVtuXSlcbiAgICAgICAgbisrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVVBEQVRFOlxuICAgICAgICBzdGVwLmFkZCsrO1xuICAgICAgICBzdGVwLnJlbW92ZWQucHVzaChhcnIxW25dKVxuICAgICAgICBuKys7XG4gICAgICAgIG0rKztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmKHN0ZXAuaW5kZXggIT0gbnVsbCl7XG4gICAgc3RlcHMucHVzaChzdGVwKVxuICB9XG4gIHJldHVybiBzdGVwc1xufVxubW9kdWxlLmV4cG9ydHMgPSB3aG9sZTsiLCIvLyBzb21lIG5lc3RlZCAgb3BlcmF0aW9uIGluIGFzdCBcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xudmFyIGFuaW1hdGUgPSByZXF1aXJlKFwiLi9hbmltYXRlLmpzXCIpO1xuXG52YXIgY29tYmluZSA9IG1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBkb20gaW4gb2JqZWN0XG4gIG5vZGU6IGZ1bmN0aW9uKGl0ZW0pe1xuICAgIHZhciBjaGlsZHJlbixub2RlLCBub2RlcztcbiAgICBpZighaXRlbSkgcmV0dXJuO1xuICAgIGlmKGl0ZW0uZWxlbWVudCkgcmV0dXJuIGl0ZW0uZWxlbWVudDtcbiAgICBpZih0eXBlb2YgaXRlbS5ub2RlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBpdGVtLm5vZGUoKTtcbiAgICBpZih0eXBlb2YgaXRlbS5ub2RlVHlwZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGl0ZW07XG4gICAgaWYoaXRlbS5ncm91cCkgcmV0dXJuIGNvbWJpbmUubm9kZShpdGVtLmdyb3VwKVxuICAgIGlmKGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbil7XG4gICAgICBpZihjaGlsZHJlbi5sZW5ndGggPT09IDEpe1xuICAgICAgICByZXR1cm4gY29tYmluZS5ub2RlKGNoaWxkcmVuWzBdKTtcbiAgICAgIH1cbiAgICAgIG5vZGVzID0gW107XG4gICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgICAgICBub2RlID0gY29tYmluZS5ub2RlKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShub2RlKSl7XG4gICAgICAgICAgbm9kZXMucHVzaC5hcHBseShub2Rlcywgbm9kZSlcbiAgICAgICAgfWVsc2UgaWYobm9kZSkge1xuICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgfSxcbiAgLy8gQFRPRE8gcmVtb3ZlIF9ncmFnQ29udGFpbmVyXG4gIGluamVjdDogZnVuY3Rpb24obm9kZSwgcG9zICl7XG4gICAgdmFyIGdyb3VwID0gdGhpcztcbiAgICB2YXIgZnJhZ21lbnQgPSBjb21iaW5lLm5vZGUoZ3JvdXAuZ3JvdXAgfHwgZ3JvdXApO1xuICAgIGlmKG5vZGUgPT09IGZhbHNlKSB7XG4gICAgICBhbmltYXRlLnJlbW92ZShmcmFnbWVudClcbiAgICAgIHJldHVybiBncm91cDtcbiAgICB9ZWxzZXtcbiAgICAgIGlmKCFmcmFnbWVudCkgcmV0dXJuIGdyb3VwO1xuICAgICAgaWYodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSBub2RlID0gZG9tLmZpbmQobm9kZSk7XG4gICAgICBpZighbm9kZSkgdGhyb3cgRXJyb3IoJ2luamVjdGVkIG5vZGUgaXMgbm90IGZvdW5kJyk7XG4gICAgICAvLyB1c2UgYW5pbWF0ZSB0byBhbmltYXRlIGZpcnN0Y2hpbGRyZW5cbiAgICAgIGFuaW1hdGUuaW5qZWN0KGZyYWdtZW50LCBub2RlLCBwb3MpO1xuICAgIH1cbiAgICAvLyBpZiBpdCBpcyBhIGNvbXBvbmVudFxuICAgIGlmKGdyb3VwLiRlbWl0KSB7XG4gICAgICBncm91cC4kZW1pdChcIiRpbmplY3RcIiwgbm9kZSwgcG9zKTtcbiAgICAgIGdyb3VwLnBhcmVudE5vZGUgPSAocG9zID09PSdhZnRlcicgfHwgcG9zID09PSAnYmVmb3JlJyk/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGU7XG4gICAgfVxuICAgIHJldHVybiBncm91cDtcbiAgfSxcblxuICAvLyBnZXQgdGhlIGxhc3QgZG9tIGluIG9iamVjdChmb3IgaW5zZXJ0aW9uIG9wZXJhdGlvbilcbiAgbGFzdDogZnVuY3Rpb24oaXRlbSl7XG4gICAgdmFyIGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcblxuICAgIGlmKHR5cGVvZiBpdGVtLmxhc3QgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGl0ZW0ubGFzdCgpO1xuICAgIGlmKHR5cGVvZiBpdGVtLm5vZGVUeXBlID09PSBcIm51bWJlclwiKSByZXR1cm4gaXRlbTtcblxuICAgIGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGNvbWJpbmUubGFzdChjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSk7XG4gICAgaWYoaXRlbS5ncm91cCkgcmV0dXJuIGNvbWJpbmUubGFzdChpdGVtLmdyb3VwKTtcblxuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKGl0ZW0sIGZpcnN0KXtcbiAgICBpZighaXRlbSkgcmV0dXJuO1xuICAgIGlmKEFycmF5LmlzQXJyYXkoaXRlbSkpe1xuICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gaXRlbS5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgICAgICBjb21iaW5lLmRlc3Ryb3koaXRlbVtpXSwgZmlyc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuO1xuICAgIGlmKHR5cGVvZiBpdGVtLmRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGl0ZW0uZGVzdHJveShmaXJzdCk7XG4gICAgaWYodHlwZW9mIGl0ZW0ubm9kZVR5cGUgPT09IFwibnVtYmVyXCIgJiYgZmlyc3QpICBkb20ucmVtb3ZlKGl0ZW0pO1xuICAgIGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XG4gICAgICBjb21iaW5lLmRlc3Ryb3koY2hpbGRyZW4sIHRydWUpO1xuICAgICAgaXRlbS5jaGlsZHJlbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbn0iLCIvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzNTQwNjQvaG93LXRvLWNvbnZlcnQtY2hhcmFjdGVycy10by1odG1sLWVudGl0aWVzLXVzaW5nLXBsYWluLWphdmFzY3JpcHRcbnZhciBlbnRpdGllcyA9IHtcbiAgJ3F1b3QnOjM0LCBcbiAgJ2FtcCc6MzgsIFxuICAnYXBvcyc6MzksIFxuICAnbHQnOjYwLCBcbiAgJ2d0Jzo2MiwgXG4gICduYnNwJzoxNjAsIFxuICAnaWV4Y2wnOjE2MSwgXG4gICdjZW50JzoxNjIsIFxuICAncG91bmQnOjE2MywgXG4gICdjdXJyZW4nOjE2NCwgXG4gICd5ZW4nOjE2NSwgXG4gICdicnZiYXInOjE2NiwgXG4gICdzZWN0JzoxNjcsIFxuICAndW1sJzoxNjgsIFxuICAnY29weSc6MTY5LCBcbiAgJ29yZGYnOjE3MCwgXG4gICdsYXF1byc6MTcxLCBcbiAgJ25vdCc6MTcyLCBcbiAgJ3NoeSc6MTczLCBcbiAgJ3JlZyc6MTc0LCBcbiAgJ21hY3InOjE3NSwgXG4gICdkZWcnOjE3NiwgXG4gICdwbHVzbW4nOjE3NywgXG4gICdzdXAyJzoxNzgsIFxuICAnc3VwMyc6MTc5LCBcbiAgJ2FjdXRlJzoxODAsIFxuICAnbWljcm8nOjE4MSwgXG4gICdwYXJhJzoxODIsIFxuICAnbWlkZG90JzoxODMsIFxuICAnY2VkaWwnOjE4NCwgXG4gICdzdXAxJzoxODUsIFxuICAnb3JkbSc6MTg2LCBcbiAgJ3JhcXVvJzoxODcsIFxuICAnZnJhYzE0JzoxODgsIFxuICAnZnJhYzEyJzoxODksIFxuICAnZnJhYzM0JzoxOTAsIFxuICAnaXF1ZXN0JzoxOTEsIFxuICAnQWdyYXZlJzoxOTIsIFxuICAnQWFjdXRlJzoxOTMsIFxuICAnQWNpcmMnOjE5NCwgXG4gICdBdGlsZGUnOjE5NSwgXG4gICdBdW1sJzoxOTYsIFxuICAnQXJpbmcnOjE5NywgXG4gICdBRWxpZyc6MTk4LCBcbiAgJ0NjZWRpbCc6MTk5LCBcbiAgJ0VncmF2ZSc6MjAwLCBcbiAgJ0VhY3V0ZSc6MjAxLCBcbiAgJ0VjaXJjJzoyMDIsIFxuICAnRXVtbCc6MjAzLCBcbiAgJ0lncmF2ZSc6MjA0LCBcbiAgJ0lhY3V0ZSc6MjA1LCBcbiAgJ0ljaXJjJzoyMDYsIFxuICAnSXVtbCc6MjA3LCBcbiAgJ0VUSCc6MjA4LCBcbiAgJ050aWxkZSc6MjA5LCBcbiAgJ09ncmF2ZSc6MjEwLCBcbiAgJ09hY3V0ZSc6MjExLCBcbiAgJ09jaXJjJzoyMTIsIFxuICAnT3RpbGRlJzoyMTMsIFxuICAnT3VtbCc6MjE0LCBcbiAgJ3RpbWVzJzoyMTUsIFxuICAnT3NsYXNoJzoyMTYsIFxuICAnVWdyYXZlJzoyMTcsIFxuICAnVWFjdXRlJzoyMTgsIFxuICAnVWNpcmMnOjIxOSwgXG4gICdVdW1sJzoyMjAsIFxuICAnWWFjdXRlJzoyMjEsIFxuICAnVEhPUk4nOjIyMiwgXG4gICdzemxpZyc6MjIzLCBcbiAgJ2FncmF2ZSc6MjI0LCBcbiAgJ2FhY3V0ZSc6MjI1LCBcbiAgJ2FjaXJjJzoyMjYsIFxuICAnYXRpbGRlJzoyMjcsIFxuICAnYXVtbCc6MjI4LCBcbiAgJ2FyaW5nJzoyMjksIFxuICAnYWVsaWcnOjIzMCwgXG4gICdjY2VkaWwnOjIzMSwgXG4gICdlZ3JhdmUnOjIzMiwgXG4gICdlYWN1dGUnOjIzMywgXG4gICdlY2lyYyc6MjM0LCBcbiAgJ2V1bWwnOjIzNSwgXG4gICdpZ3JhdmUnOjIzNiwgXG4gICdpYWN1dGUnOjIzNywgXG4gICdpY2lyYyc6MjM4LCBcbiAgJ2l1bWwnOjIzOSwgXG4gICdldGgnOjI0MCwgXG4gICdudGlsZGUnOjI0MSwgXG4gICdvZ3JhdmUnOjI0MiwgXG4gICdvYWN1dGUnOjI0MywgXG4gICdvY2lyYyc6MjQ0LCBcbiAgJ290aWxkZSc6MjQ1LCBcbiAgJ291bWwnOjI0NiwgXG4gICdkaXZpZGUnOjI0NywgXG4gICdvc2xhc2gnOjI0OCwgXG4gICd1Z3JhdmUnOjI0OSwgXG4gICd1YWN1dGUnOjI1MCwgXG4gICd1Y2lyYyc6MjUxLCBcbiAgJ3V1bWwnOjI1MiwgXG4gICd5YWN1dGUnOjI1MywgXG4gICd0aG9ybic6MjU0LCBcbiAgJ3l1bWwnOjI1NSwgXG4gICdmbm9mJzo0MDIsIFxuICAnQWxwaGEnOjkxMywgXG4gICdCZXRhJzo5MTQsIFxuICAnR2FtbWEnOjkxNSwgXG4gICdEZWx0YSc6OTE2LCBcbiAgJ0Vwc2lsb24nOjkxNywgXG4gICdaZXRhJzo5MTgsIFxuICAnRXRhJzo5MTksIFxuICAnVGhldGEnOjkyMCwgXG4gICdJb3RhJzo5MjEsIFxuICAnS2FwcGEnOjkyMiwgXG4gICdMYW1iZGEnOjkyMywgXG4gICdNdSc6OTI0LCBcbiAgJ051Jzo5MjUsIFxuICAnWGknOjkyNiwgXG4gICdPbWljcm9uJzo5MjcsIFxuICAnUGknOjkyOCwgXG4gICdSaG8nOjkyOSwgXG4gICdTaWdtYSc6OTMxLCBcbiAgJ1RhdSc6OTMyLCBcbiAgJ1Vwc2lsb24nOjkzMywgXG4gICdQaGknOjkzNCwgXG4gICdDaGknOjkzNSwgXG4gICdQc2knOjkzNiwgXG4gICdPbWVnYSc6OTM3LCBcbiAgJ2FscGhhJzo5NDUsIFxuICAnYmV0YSc6OTQ2LCBcbiAgJ2dhbW1hJzo5NDcsIFxuICAnZGVsdGEnOjk0OCwgXG4gICdlcHNpbG9uJzo5NDksIFxuICAnemV0YSc6OTUwLCBcbiAgJ2V0YSc6OTUxLCBcbiAgJ3RoZXRhJzo5NTIsIFxuICAnaW90YSc6OTUzLCBcbiAgJ2thcHBhJzo5NTQsIFxuICAnbGFtYmRhJzo5NTUsIFxuICAnbXUnOjk1NiwgXG4gICdudSc6OTU3LCBcbiAgJ3hpJzo5NTgsIFxuICAnb21pY3Jvbic6OTU5LCBcbiAgJ3BpJzo5NjAsIFxuICAncmhvJzo5NjEsIFxuICAnc2lnbWFmJzo5NjIsIFxuICAnc2lnbWEnOjk2MywgXG4gICd0YXUnOjk2NCwgXG4gICd1cHNpbG9uJzo5NjUsIFxuICAncGhpJzo5NjYsIFxuICAnY2hpJzo5NjcsIFxuICAncHNpJzo5NjgsIFxuICAnb21lZ2EnOjk2OSwgXG4gICd0aGV0YXN5bSc6OTc3LCBcbiAgJ3Vwc2loJzo5NzgsIFxuICAncGl2Jzo5ODIsIFxuICAnYnVsbCc6ODIyNiwgXG4gICdoZWxsaXAnOjgyMzAsIFxuICAncHJpbWUnOjgyNDIsIFxuICAnUHJpbWUnOjgyNDMsIFxuICAnb2xpbmUnOjgyNTQsIFxuICAnZnJhc2wnOjgyNjAsIFxuICAnd2VpZXJwJzo4NDcyLCBcbiAgJ2ltYWdlJzo4NDY1LCBcbiAgJ3JlYWwnOjg0NzYsIFxuICAndHJhZGUnOjg0ODIsIFxuICAnYWxlZnN5bSc6ODUwMSwgXG4gICdsYXJyJzo4NTkyLCBcbiAgJ3VhcnInOjg1OTMsIFxuICAncmFycic6ODU5NCwgXG4gICdkYXJyJzo4NTk1LCBcbiAgJ2hhcnInOjg1OTYsIFxuICAnY3JhcnInOjg2MjksIFxuICAnbEFycic6ODY1NiwgXG4gICd1QXJyJzo4NjU3LCBcbiAgJ3JBcnInOjg2NTgsIFxuICAnZEFycic6ODY1OSwgXG4gICdoQXJyJzo4NjYwLCBcbiAgJ2ZvcmFsbCc6ODcwNCwgXG4gICdwYXJ0Jzo4NzA2LCBcbiAgJ2V4aXN0Jzo4NzA3LCBcbiAgJ2VtcHR5Jzo4NzA5LCBcbiAgJ25hYmxhJzo4NzExLCBcbiAgJ2lzaW4nOjg3MTIsIFxuICAnbm90aW4nOjg3MTMsIFxuICAnbmknOjg3MTUsIFxuICAncHJvZCc6ODcxOSwgXG4gICdzdW0nOjg3MjEsIFxuICAnbWludXMnOjg3MjIsIFxuICAnbG93YXN0Jzo4NzI3LCBcbiAgJ3JhZGljJzo4NzMwLCBcbiAgJ3Byb3AnOjg3MzMsIFxuICAnaW5maW4nOjg3MzQsIFxuICAnYW5nJzo4NzM2LCBcbiAgJ2FuZCc6ODc0MywgXG4gICdvcic6ODc0NCwgXG4gICdjYXAnOjg3NDUsIFxuICAnY3VwJzo4NzQ2LCBcbiAgJ2ludCc6ODc0NywgXG4gICd0aGVyZTQnOjg3NTYsIFxuICAnc2ltJzo4NzY0LCBcbiAgJ2NvbmcnOjg3NzMsIFxuICAnYXN5bXAnOjg3NzYsIFxuICAnbmUnOjg4MDAsIFxuICAnZXF1aXYnOjg4MDEsIFxuICAnbGUnOjg4MDQsIFxuICAnZ2UnOjg4MDUsIFxuICAnc3ViJzo4ODM0LCBcbiAgJ3N1cCc6ODgzNSwgXG4gICduc3ViJzo4ODM2LCBcbiAgJ3N1YmUnOjg4MzgsIFxuICAnc3VwZSc6ODgzOSwgXG4gICdvcGx1cyc6ODg1MywgXG4gICdvdGltZXMnOjg4NTUsIFxuICAncGVycCc6ODg2OSwgXG4gICdzZG90Jzo4OTAxLCBcbiAgJ2xjZWlsJzo4OTY4LCBcbiAgJ3JjZWlsJzo4OTY5LCBcbiAgJ2xmbG9vcic6ODk3MCwgXG4gICdyZmxvb3InOjg5NzEsIFxuICAnbGFuZyc6OTAwMSwgXG4gICdyYW5nJzo5MDAyLCBcbiAgJ2xveic6OTY3NCwgXG4gICdzcGFkZXMnOjk4MjQsIFxuICAnY2x1YnMnOjk4MjcsIFxuICAnaGVhcnRzJzo5ODI5LCBcbiAgJ2RpYW1zJzo5ODMwLCBcbiAgJ09FbGlnJzozMzgsIFxuICAnb2VsaWcnOjMzOSwgXG4gICdTY2Fyb24nOjM1MiwgXG4gICdzY2Fyb24nOjM1MywgXG4gICdZdW1sJzozNzYsIFxuICAnY2lyYyc6NzEwLCBcbiAgJ3RpbGRlJzo3MzIsIFxuICAnZW5zcCc6ODE5NCwgXG4gICdlbXNwJzo4MTk1LCBcbiAgJ3RoaW5zcCc6ODIwMSwgXG4gICd6d25qJzo4MjA0LCBcbiAgJ3p3aic6ODIwNSwgXG4gICdscm0nOjgyMDYsIFxuICAncmxtJzo4MjA3LCBcbiAgJ25kYXNoJzo4MjExLCBcbiAgJ21kYXNoJzo4MjEyLCBcbiAgJ2xzcXVvJzo4MjE2LCBcbiAgJ3JzcXVvJzo4MjE3LCBcbiAgJ3NicXVvJzo4MjE4LCBcbiAgJ2xkcXVvJzo4MjIwLCBcbiAgJ3JkcXVvJzo4MjIxLCBcbiAgJ2JkcXVvJzo4MjIyLCBcbiAgJ2RhZ2dlcic6ODIyNCwgXG4gICdEYWdnZXInOjgyMjUsIFxuICAncGVybWlsJzo4MjQwLCBcbiAgJ2xzYXF1byc6ODI0OSwgXG4gICdyc2FxdW8nOjgyNTAsIFxuICAnZXVybyc6ODM2NFxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgID0gZW50aXRpZXM7IiwiLy8gc2ltcGxlc3QgZXZlbnQgZW1pdHRlciA2MCBsaW5lc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIHNsaWNlID0gW10uc2xpY2UsIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBBUEkgPSB7XG4gICRvbjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgaWYodHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiKXtcbiAgICAgIGZvciAodmFyIGkgaW4gZXZlbnQpIHtcbiAgICAgICAgdGhpcy4kb24oaSwgZXZlbnRbaV0pO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgLy8gQHBhdGNoOiBmb3IgbGlzdFxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgdmFyIGhhbmRsZXMgPSBjb250ZXh0Ll9oYW5kbGVzIHx8IChjb250ZXh0Ll9oYW5kbGVzID0ge30pLFxuICAgICAgICBjYWxscyA9IGhhbmRsZXNbZXZlbnRdIHx8IChoYW5kbGVzW2V2ZW50XSA9IFtdKTtcbiAgICAgIGNhbGxzLnB1c2goZm4pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgJG9mZjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgIGlmKCFjb250ZXh0Ll9oYW5kbGVzKSByZXR1cm47XG4gICAgaWYoIWV2ZW50KSB0aGlzLl9oYW5kbGVzID0ge307XG4gICAgdmFyIGhhbmRsZXMgPSBjb250ZXh0Ll9oYW5kbGVzLFxuICAgICAgY2FsbHM7XG5cbiAgICBpZiAoY2FsbHMgPSBoYW5kbGVzW2V2ZW50XSkge1xuICAgICAgaWYgKCFmbikge1xuICAgICAgICBoYW5kbGVzW2V2ZW50XSA9IFtdO1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZm4gPT09IGNhbGxzW2ldKSB7XG4gICAgICAgICAgY2FsbHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xuICB9LFxuICAvLyBidWJibGUgZXZlbnRcbiAgJGVtaXQ6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAvLyBAcGF0Y2g6IGZvciBsaXN0XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgIHZhciBoYW5kbGVzID0gY29udGV4dC5faGFuZGxlcywgY2FsbHMsIGFyZ3MsIHR5cGU7XG4gICAgaWYoIWV2ZW50KSByZXR1cm47XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIHR5cGUgPSBldmVudDtcblxuICAgIGlmKCFoYW5kbGVzKSByZXR1cm4gY29udGV4dDtcbiAgICBpZihjYWxscyA9IGhhbmRsZXNbdHlwZS5zbGljZSgxKV0pe1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbiA9IGNhbGxzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIGNhbGxzW2pdLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghKGNhbGxzID0gaGFuZGxlc1t0eXBlXSkpIHJldHVybiBjb250ZXh0O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2FsbHNbaV0uYXBwbHkoY29udGV4dCwgYXJncylcbiAgICB9XG4gICAgLy8gaWYoY2FsbHMubGVuZ3RoKSBjb250ZXh0LiR1cGRhdGUoKTtcbiAgICByZXR1cm4gY29udGV4dDtcbiAgfSxcbiAgLy8gY2FwdHVyZSAgZXZlbnRcbiAgJG9uZTogZnVuY3Rpb24oKXtcbiAgICBcbn1cbn1cbi8vIGNvbnRhaW5lciBjbGFzc1xuZnVuY3Rpb24gRXZlbnQoKSB7fVxuXy5leHRlbmQoRXZlbnQucHJvdG90eXBlLCBBUEkpXG5cbkV2ZW50Lm1peFRvID0gZnVuY3Rpb24ob2JqKXtcbiAgb2JqID0gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID8gb2JqLnByb3RvdHlwZSA6IG9iajtcbiAgXy5leHRlbmQob2JqLCBBUEkpXG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50OyIsIi8vIChjKSAyMDEwLTIwMTQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vIEJhY2tib25lIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuLy8gRm9yIGFsbCBkZXRhaWxzIGFuZCBkb2N1bWVudGF0aW9uOlxuLy8gaHR0cDovL2JhY2tib25lanMub3JnXG5cbi8vIGtsYXNzOiBhIGNsYXNzaWNhbCBKUyBPT1AgZmHDp2FkZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2RlZC9rbGFzc1xuLy8gTGljZW5zZSBNSVQgKGMpIER1c3RpbiBEaWF6IDIwMTRcbiAgXG4vLyBpbnNwaXJlZCBieSBiYWNrYm9uZSdzIGV4dGVuZCBhbmQga2xhc3NcbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIiksXG4gIGZuVGVzdCA9IC94eS8udGVzdChmdW5jdGlvbigpe1wieHlcIjt9KSA/IC9cXGJzdXByXFxiLzovLiovLFxuICBpc0ZuID0gZnVuY3Rpb24obyl7cmV0dXJuIHR5cGVvZiBvID09PSBcImZ1bmN0aW9uXCJ9O1xuXG5cbmZ1bmN0aW9uIHdyYXAoaywgZm4sIHN1cHJvKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRtcCA9IHRoaXMuc3VwcjtcbiAgICB0aGlzLnN1cHIgPSBzdXByb1trXTtcbiAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnN1cHIgPSB0bXA7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzKCB3aGF0LCBvLCBzdXBybyApIHtcbiAgZm9yICggdmFyIGsgaW4gbyApIHtcbiAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXG4gICAgICB3aGF0W2tdID0gaXNGbiggb1trXSApICYmIGlzRm4oIHN1cHJvW2tdICkgJiYgXG4gICAgICAgIGZuVGVzdC50ZXN0KCBvW2tdICkgPyB3cmFwKGssIG9ba10sIHN1cHJvKSA6IG9ba107XG4gICAgfVxuICB9XG59XG5cbi8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBbXCJldmVudHNcIiwgXCJkYXRhXCIsIFwiY29tcHV0ZWRcIl0gLCB3ZSBzaG91bGQgbWVyZ2UgdGhlbVxudmFyIG1lcmdlZCA9IFtcImV2ZW50c1wiLCBcImRhdGFcIiwgXCJjb21wdXRlZFwiXSwgbWxlbiA9IG1lcmdlZC5sZW5ndGg7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZChvKXtcbiAgbyA9IG8gfHwge307XG4gIHZhciBzdXByID0gdGhpcywgcHJvdG8sXG4gICAgc3Vwcm8gPSBzdXByICYmIHN1cHIucHJvdG90eXBlIHx8IHt9O1xuXG4gIGlmKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nKXtcbiAgICBwcm90byA9IG8ucHJvdG90eXBlO1xuICAgIG8uaW1wbGVtZW50ID0gaW1wbGVtZW50O1xuICAgIG8uZXh0ZW5kID0gZXh0ZW5kO1xuICAgIHJldHVybiBvO1xuICB9IFxuICBcbiAgZnVuY3Rpb24gZm4oKSB7XG4gICAgc3Vwci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHJvdG8gPSBfLmNyZWF0ZVByb3RvKGZuLCBzdXBybyk7XG5cbiAgZnVuY3Rpb24gaW1wbGVtZW50KG8pe1xuICAgIC8vIHdlIG5lZWQgbWVyZ2UgdGhlIG1lcmdlZCBwcm9wZXJ0eVxuICAgIHZhciBsZW4gPSBtbGVuO1xuICAgIGZvcig7bGVuLS07KXtcbiAgICAgIHZhciBwcm9wID0gbWVyZ2VkW2xlbl07XG4gICAgICBpZihvLmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3RvLmhhc093blByb3BlcnR5KHByb3ApKXtcbiAgICAgICAgXy5leHRlbmQocHJvdG9bcHJvcF0sIG9bcHJvcF0sIHRydWUpIFxuICAgICAgICBkZWxldGUgb1twcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHByb2Nlc3MocHJvdG8sIG8sIHN1cHJvKTsgXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG5cbiAgZm4uaW1wbGVtZW50ID0gaW1wbGVtZW50XG4gIGZuLmltcGxlbWVudChvKVxuICBpZihzdXByLl9fYWZ0ZXJfXykgc3Vwci5fX2FmdGVyX18uY2FsbChmbiwgc3Vwciwgbyk7XG4gIGZuLmV4dGVuZCA9IGV4dGVuZDtcbiAgcmV0dXJuIGZuO1xufVxuXG4iLCJcbnZhciBmID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8ganNvbjogIHR3byB3YXkgXG4vLyAgLSBnZXQ6IEpTT04uc3RyaW5naWZ5XG4vLyAgLSBzZXQ6IEpTT04ucGFyc2Vcbi8vICAtIGV4YW1wbGU6IGB7IHRpdGxlfGpzb24gfWBcbmYuanNvbiA9IHtcbiAgZ2V0OiBmdW5jdGlvbiggdmFsdWUgKXtcbiAgICByZXR1cm4gdHlwZW9mIEpTT04gIT09ICd1bmRlZmluZWQnPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSk6IHZhbHVlO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApe1xuICAgIHJldHVybiB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCc/IEpTT04ucGFyc2UodmFsdWUpIDogdmFsdWU7XG4gIH1cbn1cblxuLy8gbGFzdDogb25lLXdheVxuLy8gIC0gZ2V0OiByZXR1cm4gdGhlIGxhc3QgaXRlbSBpbiBsaXN0XG4vLyAgLSBleGFtcGxlOiBgeyBsaXN0fGxhc3QgfWBcbmYubGFzdCA9IGZ1bmN0aW9uKGFycil7XG4gIHJldHVybiBhcnIgJiYgYXJyW2Fyci5sZW5ndGggLSAxXTtcbn1cblxuLy8gYXZlcmFnZTogb25lLXdheVxuLy8gIC0gZ2V0OiBjb3B1dGUgdGhlIGF2ZXJhZ2Ugb2YgdGhlIGxpc3Rcbi8vICAtIGV4YW1wbGU6IGB7IGxpc3R8IGF2ZXJhZ2U6IFwic2NvcmVcIiB9YFxuZi5hdmVyYWdlID0gZnVuY3Rpb24oYXJyYXksIGtleSl7XG4gIGFycmF5ID0gYXJyYXkgfHwgW107XG4gIHJldHVybiBhcnJheS5sZW5ndGg/IGYudG90YWwoYXJyYXksIGtleSkvIGFycmF5Lmxlbmd0aCA6IDA7XG59XG5cblxuLy8gdG90YWw6IG9uZS13YXlcbi8vICAtIGdldDogY29wdXRlIHRoZSB0b3RhbCBvZiB0aGUgbGlzdFxuLy8gIC0gZXhhbXBsZTogYHsgbGlzdHwgYXZlcmFnZTogXCJzY29yZVwiIH1gXG5mLnRvdGFsID0gZnVuY3Rpb24oYXJyYXksIGtleSl7XG4gIHZhciB0b3RhbCA9IDA7XG4gIGlmKCFhcnJheSkgcmV0dXJuO1xuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtICl7XG4gICAgdG90YWwgKz0ga2V5PyBpdGVtW2tleV0gOiBpdGVtO1xuICB9KVxuICByZXR1cm4gdG90YWw7XG59XG5cbi8vIHZhciBiYXNpY1NvcnRGbiA9IGZ1bmN0aW9uKGEsIGIpe3JldHVybiBiIC0gYX1cblxuLy8gZi5zb3J0ID0gZnVuY3Rpb24oYXJyYXksIGtleSwgcmV2ZXJzZSl7XG4vLyAgIHZhciB0eXBlID0gdHlwZW9mIGtleSwgc29ydEZuOyBcbi8vICAgc3dpdGNoKHR5cGUpe1xuLy8gICAgIGNhc2UgJ2Z1bmN0aW9uJzogc29ydEZuID0ga2V5OyBicmVhaztcbi8vICAgICBjYXNlICdzdHJpbmcnOiBzb3J0Rm4gPSBmdW5jdGlvbihhLCBiKXt9O2JyZWFrO1xuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBzb3J0Rm4gPSBiYXNpY1NvcnRGbjtcbi8vICAgfVxuLy8gICAvLyBuZWVkIG90aGVyIHJlZmVybmNlLlxuLy8gICByZXR1cm4gYXJyYXkuc2xpY2UoKS5zb3J0KGZ1bmN0aW9uKGEsYil7XG4vLyAgICAgcmV0dXJuIHJldmVyc2U/IC1zb3J0Rm4oYSwgYik6IHNvcnRGbihhLCBiKTtcbi8vICAgfSlcbi8vICAgcmV0dXJuIGFycmF5XG4vLyB9XG5cblxuIiwidmFyIGV4cHJDYWNoZSA9IHJlcXVpcmUoJy4uL2VudicpLmV4cHJDYWNoZTtcbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgUGFyc2VyID0gcmVxdWlyZShcIi4uL3BhcnNlci9QYXJzZXIuanNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXhwcmVzc2lvbjogZnVuY3Rpb24oZXhwciwgc2ltcGxlKXtcbiAgICAvLyBAVE9ETyBjYWNoZVxuICAgIGlmKCB0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycgJiYgKCBleHByID0gZXhwci50cmltKCkgKSApe1xuICAgICAgZXhwciA9IGV4cHJDYWNoZS5nZXQoIGV4cHIgKSB8fCBleHByQ2FjaGUuc2V0KCBleHByLCBuZXcgUGFyc2VyKCBleHByLCB7IG1vZGU6IDIsIGV4cHJlc3Npb246IHRydWUgfSApLmV4cHJlc3Npb24oKSApXG4gICAgfVxuICAgIGlmKGV4cHIpIHJldHVybiBleHByO1xuICB9LFxuICBwYXJzZTogZnVuY3Rpb24odGVtcGxhdGUpe1xuICAgIHJldHVybiBuZXcgUGFyc2VyKHRlbXBsYXRlKS5wYXJzZSgpO1xuICB9XG59XG5cbiIsIi8vIHNoaW0gZm9yIGVzNVxudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgdHN0ciA9ICh7fSkudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIGV4dGVuZChvMSwgbzIgKXtcbiAgZm9yKHZhciBpIGluIG8yKSBpZiggbzFbaV0gPT09IHVuZGVmaW5lZCl7XG4gICAgbzFbaV0gPSBvMltpXVxuICB9XG4gIHJldHVybiBvMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICAvLyBTdHJpbmcgcHJvdG8gO1xuICBleHRlbmQoU3RyaW5nLnByb3RvdHlwZSwge1xuICAgIHRyaW06IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgfVxuICB9KTtcblxuXG4gIC8vIEFycmF5IHByb3RvO1xuICBleHRlbmQoQXJyYXkucHJvdG90eXBlLCB7XG4gICAgaW5kZXhPZjogZnVuY3Rpb24ob2JqLCBmcm9tKXtcbiAgICAgIGZyb20gPSBmcm9tIHx8IDA7XG4gICAgICBmb3IgKHZhciBpID0gZnJvbSwgbGVuID0gdGhpcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGhpc1tpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KXtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KXtcbiAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXNzID0gY2FsbGJhY2suY2FsbChjb250ZXh0LCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICAgICAgaWYocGFzcykgcmVzLnB1c2godGhpc1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCl7XG4gICAgICB2YXIgcmVzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXMucHVzaChjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRoaXNbaV0sIGksIHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9KTtcblxuICAvLyBGdW5jdGlvbiBwcm90bztcbiAgZXh0ZW5kKEZ1bmN0aW9uLnByb3RvdHlwZSwge1xuICAgIGJpbmQ6IGZ1bmN0aW9uKGNvbnRleHQpe1xuICAgICAgdmFyIGZuID0gdGhpcztcbiAgICAgIHZhciBwcmVBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBhcmdzID0gcHJlQXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgXG4gIC8vIEFycmF5XG4gIGV4dGVuZChBcnJheSwge1xuICAgIGlzQXJyYXk6IGZ1bmN0aW9uKGFycil7XG4gICAgICByZXR1cm4gdHN0ci5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB9XG4gIH0pXG59XG5cbiIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbC5qcycpO1xudmFyIHBhcnNlRXhwcmVzc2lvbiA9IHJlcXVpcmUoJy4vcGFyc2UuanMnKS5leHByZXNzaW9uO1xudmFyIGRpZmZBcnJheSA9IHJlcXVpcmUoJy4vYXJyYXlEaWZmLmpzJyk7XG5cbmZ1bmN0aW9uIFdhdGNoZXIoKXt9XG5cbnZhciBtZXRob2RzID0ge1xuICAkd2F0Y2g6IGZ1bmN0aW9uKGV4cHIsIGZuLCBvcHRpb25zKXtcbiAgICB2YXIgZ2V0LCBvbmNlLCB0ZXN0LCBybGVuLCBleHRyYSA9IHRoaXMuX19leHRfXzsgLy9yZWNvcmRzIGxlbmd0aFxuICAgIGlmKCF0aGlzLl93YXRjaGVycykgdGhpcy5fd2F0Y2hlcnMgPSBbXTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmKG9wdGlvbnMgPT09IHRydWUpe1xuICAgICAgIG9wdGlvbnMgPSB7IGRlZXA6IHRydWUgfVxuICAgIH1cbiAgICB2YXIgdWlkID0gXy51aWQoJ3dfJyk7XG4gICAgaWYoQXJyYXkuaXNBcnJheShleHByKSl7XG4gICAgICB2YXIgdGVzdHMgPSBbXTtcbiAgICAgIGZvcih2YXIgaSA9IDAsbGVuID0gZXhwci5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgdGVzdHMucHVzaCh0aGlzLiRleHByZXNzaW9uKGV4cHJbaV0pLmdldClcbiAgICAgIH1cbiAgICAgIHZhciBwcmV2ID0gW107XG4gICAgICB0ZXN0ID0gZnVuY3Rpb24oY29udGV4dCl7XG4gICAgICAgIHZhciBlcXVhbCA9IHRydWU7XG4gICAgICAgIGZvcih2YXIgaSA9MCwgbGVuID0gdGVzdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgIHZhciBzcGxpY2UgPSB0ZXN0c1tpXShjb250ZXh0LCBleHRyYSk7XG4gICAgICAgICAgaWYoIV8uZXF1YWxzKHNwbGljZSwgcHJldltpXSkpe1xuICAgICAgICAgICAgIGVxdWFsID0gZmFsc2U7XG4gICAgICAgICAgICAgcHJldltpXSA9IF8uY2xvbmUoc3BsaWNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVxdWFsPyBmYWxzZTogcHJldjtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGlmKHR5cGVvZiBleHByID09PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgZ2V0ID0gZXhwci5iaW5kKHRoaXMpOyAgICAgIFxuICAgICAgfWVsc2V7XG4gICAgICAgIGV4cHIgPSB0aGlzLl90b3VjaEV4cHIoIHBhcnNlRXhwcmVzc2lvbihleHByKSApO1xuICAgICAgICBnZXQgPSBleHByLmdldDtcbiAgICAgICAgb25jZSA9IGV4cHIub25jZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgd2F0Y2hlciA9IHtcbiAgICAgIGlkOiB1aWQsIFxuICAgICAgZ2V0OiBnZXQsIFxuICAgICAgZm46IGZuLCBcbiAgICAgIG9uY2U6IG9uY2UsIFxuICAgICAgZm9yY2U6IG9wdGlvbnMuZm9yY2UsXG4gICAgICAvLyBkb24ndCB1c2UgbGQgdG8gcmVzb2x2ZSBhcnJheSBkaWZmXG4gICAgICBub3RsZDogb3B0aW9ucy5pbmRleFRyYWNrLFxuICAgICAgdGVzdDogdGVzdCxcbiAgICAgIGRlZXA6IG9wdGlvbnMuZGVlcCxcbiAgICAgIGxhc3Q6IG9wdGlvbnMuc3luYz8gZ2V0KHRoaXMpOiBvcHRpb25zLmxhc3RcbiAgICB9XG4gICAgXG4gICAgdGhpcy5fd2F0Y2hlcnMucHVzaCggd2F0Y2hlciApO1xuXG4gICAgcmxlbiA9IHRoaXMuX3JlY29yZHMgJiYgdGhpcy5fcmVjb3Jkcy5sZW5ndGg7XG4gICAgaWYocmxlbikgdGhpcy5fcmVjb3Jkc1tybGVuLTFdLnB1c2godWlkKVxuICAgIC8vIGluaXQgc3RhdGUuXG4gICAgaWYob3B0aW9ucy5pbml0ID09PSB0cnVlKXtcbiAgICAgIHZhciBwcmVwaGFzZSA9IHRoaXMuJHBoYXNlO1xuICAgICAgdGhpcy4kcGhhc2UgPSAnZGlnZXN0JztcbiAgICAgIHRoaXMuX2NoZWNrU2luZ2xlV2F0Y2goIHdhdGNoZXIsIHRoaXMuX3dhdGNoZXJzLmxlbmd0aC0xICk7XG4gICAgICB0aGlzLiRwaGFzZSA9IHByZXBoYXNlO1xuICAgIH1cbiAgICByZXR1cm4gd2F0Y2hlcjtcbiAgfSxcbiAgJHVud2F0Y2g6IGZ1bmN0aW9uKHVpZCl7XG4gICAgdWlkID0gdWlkLnVpZCB8fCB1aWQ7XG4gICAgaWYoIXRoaXMuX3dhdGNoZXJzKSB0aGlzLl93YXRjaGVycyA9IFtdO1xuICAgIGlmKEFycmF5LmlzQXJyYXkodWlkKSl7XG4gICAgICBmb3IodmFyIGkgPTAsIGxlbiA9IHVpZC5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgIHRoaXMuJHVud2F0Y2godWlkW2ldKTtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIHZhciB3YXRjaGVycyA9IHRoaXMuX3dhdGNoZXJzLCB3YXRjaGVyLCB3bGVuO1xuICAgICAgaWYoIXVpZCB8fCAhd2F0Y2hlcnMgfHwgISh3bGVuID0gd2F0Y2hlcnMubGVuZ3RoKSkgcmV0dXJuO1xuICAgICAgZm9yKDt3bGVuLS07KXtcbiAgICAgICAgd2F0Y2hlciA9IHdhdGNoZXJzW3dsZW5dO1xuICAgICAgICBpZih3YXRjaGVyICYmIHdhdGNoZXIuaWQgPT09IHVpZCApe1xuICAgICAgICAgIHdhdGNoZXJzLnNwbGljZSh3bGVuLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgJGV4cHJlc3Npb246IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICByZXR1cm4gdGhpcy5fdG91Y2hFeHByKHBhcnNlRXhwcmVzc2lvbih2YWx1ZSkpXG4gIH0sXG4gIC8qKlxuICAgKiB0aGUgd2hvbGUgZGlnZXN0IGxvb3AgLGp1c3QgbGlrZSBhbmd1bGFyLCBpdCBqdXN0IGEgZGlydHktY2hlY2sgbG9vcDtcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwYXRoICBub3cgcmVndWxhciBwcm9jZXNzIGEgcHVyZSBkaXJ0eS1jaGVjayBsb29wLCBidXQgaW4gcGFyc2UgcGhhc2UsIFxuICAgKiAgICAgICAgICAgICAgICAgIFJlZ3VsYXIncyBwYXJzZXIgZXh0cmFjdCB0aGUgZGVwZW5kZW5jaWVzLCBpbiBmdXR1cmUgbWF5YmUgaXQgd2lsbCBjaGFuZ2UgdG8gZGlydHktY2hlY2sgY29tYmluZSB3aXRoIHBhdGgtYXdhcmUgdXBkYXRlO1xuICAgKiBAcmV0dXJuIHtWb2lkfSAgIFxuICAgKi9cblxuICAkZGlnZXN0OiBmdW5jdGlvbigpe1xuICAgIGlmKHRoaXMuJHBoYXNlID09PSAnZGlnZXN0JyB8fCB0aGlzLl9tdXRlKSByZXR1cm47XG4gICAgdGhpcy4kcGhhc2UgPSAnZGlnZXN0JztcbiAgICB2YXIgZGlydHkgPSBmYWxzZSwgbiA9MDtcbiAgICB3aGlsZShkaXJ0eSA9IHRoaXMuX2RpZ2VzdCgpKXtcblxuICAgICAgaWYoKCsrbikgPiAyMCl7IC8vIG1heCBsb29wXG4gICAgICAgIHRocm93IEVycm9yKCd0aGVyZSBtYXkgYSBjaXJjdWxhciBkZXBlbmRlbmNpZXMgcmVhY2hlcycpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKCBuID4gMCAmJiB0aGlzLiRlbWl0KSB0aGlzLiRlbWl0KFwiJHVwZGF0ZVwiKTtcbiAgICB0aGlzLiRwaGFzZSA9IG51bGw7XG4gIH0sXG4gIC8vIHByaXZhdGUgZGlnZXN0IGxvZ2ljXG4gIF9kaWdlc3Q6IGZ1bmN0aW9uKCl7XG4gICAgLy8gaWYodGhpcy5jb250ZXh0KSByZXR1cm4gdGhpcy5jb250ZXh0LiRkaWdlc3QoKTtcbiAgICAvLyBpZih0aGlzLiRlbWl0KSB0aGlzLiRlbWl0KCdkaWdlc3QnKTtcbiAgICB2YXIgd2F0Y2hlcnMgPSB0aGlzLl93YXRjaGVycztcbiAgICB2YXIgZGlydHkgPSBmYWxzZSwgY2hpbGRyZW4sIHdhdGNoZXIsIHdhdGNoZXJEaXJ0eTtcbiAgICBpZih3YXRjaGVycyAmJiB3YXRjaGVycy5sZW5ndGgpe1xuICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gd2F0Y2hlcnMubGVuZ3RoO2kgPCBsZW47IGkrKyl7XG4gICAgICAgIHdhdGNoZXIgPSB3YXRjaGVyc1tpXTtcbiAgICAgICAgd2F0Y2hlckRpcnR5ID0gdGhpcy5fY2hlY2tTaW5nbGVXYXRjaCh3YXRjaGVyLCBpKTtcbiAgICAgICAgaWYod2F0Y2hlckRpcnR5KSBkaXJ0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNoZWNrIGNoaWxkcmVuJ3MgZGlydHkuXG4gICAgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICBpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xuICAgICAgZm9yKHZhciBtID0gMCwgbWxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgbSA8IG1sZW47IG0rKyl7XG4gICAgICAgIGlmKGNoaWxkcmVuW21dICYmIGNoaWxkcmVuW21dLl9kaWdlc3QoKSkgZGlydHkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGlydHk7XG4gIH0sXG4gIC8vIGNoZWNrIGEgc2luZ2xlIG9uZSB3YXRjaGVyIFxuICBfY2hlY2tTaW5nbGVXYXRjaDogZnVuY3Rpb24od2F0Y2hlciwgaSl7XG4gICAgdmFyIGRpcnR5ID0gZmFsc2U7XG4gICAgaWYoIXdhdGNoZXIpIHJldHVybjtcblxuICAgIHZhciBub3csIGxhc3QsIHRsYXN0LCB0bm93LCAgZXEsIGRpZmY7XG5cbiAgICBpZighd2F0Y2hlci50ZXN0KXtcblxuICAgICAgbm93ID0gd2F0Y2hlci5nZXQodGhpcyk7XG4gICAgICBsYXN0ID0gd2F0Y2hlci5sYXN0O1xuICAgICAgdGxhc3QgPSBfLnR5cGVPZihsYXN0KTtcbiAgICAgIHRub3cgPSBfLnR5cGVPZihub3cpO1xuICAgICAgZXEgPSB0cnVlLCBkaWZmO1xuXG4gICAgICAvLyAhT2JqZWN0XG4gICAgICBpZiggISh0bm93ID09PSAnb2JqZWN0JyAmJiB0bGFzdD09PSdvYmplY3QnICYmIHdhdGNoZXIuZGVlcCkgKXtcbiAgICAgICAgLy8gQXJyYXlcbiAgICAgICAgaWYoIHRub3cgPT09ICdhcnJheScgJiYgKCB0bGFzdD09J3VuZGVmaW5lZCcgfHwgdGxhc3QgPT09ICdhcnJheScpICl7XG4gICAgICAgICAgZGlmZiA9IGRpZmZBcnJheShub3csIHdhdGNoZXIubGFzdCB8fCBbXSwgd2F0Y2hlci5ub3RsZClcbiAgICAgICAgICBpZiggdGxhc3QgIT09ICdhcnJheScgfHwgZGlmZiA9PT0gdHJ1ZSB8fCBkaWZmLmxlbmd0aCApIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZXEgPSBfLmVxdWFscyggbm93LCBsYXN0ICk7XG4gICAgICAgICAgaWYoICFlcSB8fCB3YXRjaGVyLmZvcmNlICl7XG4gICAgICAgICAgICB3YXRjaGVyLmZvcmNlID0gbnVsbDtcbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTsgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZm9yKHZhciBqIGluIG5vdyl7XG4gICAgICAgICAgaWYobGFzdFtqXSAhPT0gbm93W2pdKXtcbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihkaXJ0eSAhPT0gdHJ1ZSl7XG4gICAgICAgICAgZm9yKHZhciBuIGluIGxhc3Qpe1xuICAgICAgICAgICAgaWYobGFzdFtuXSAhPT0gbm93W25dKXtcbiAgICAgICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2V7XG4gICAgICAvLyBAVE9ETyDmmK/lkKbmiorlpJrph43mlLnmjolcbiAgICAgIHZhciByZXN1bHQgPSB3YXRjaGVyLnRlc3QodGhpcyk7XG4gICAgICBpZihyZXN1bHQpe1xuICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgIHdhdGNoZXIuZm4uYXBwbHkodGhpcywgcmVzdWx0KVxuICAgICAgfVxuICAgIH1cbiAgICBpZihkaXJ0eSAmJiAhd2F0Y2hlci50ZXN0KXtcbiAgICAgIGlmKHRub3cgPT09ICdvYmplY3QnICYmIHdhdGNoZXIuZGVlcCB8fCB0bm93ID09PSAnYXJyYXknKXtcbiAgICAgICAgd2F0Y2hlci5sYXN0ID0gXy5jbG9uZShub3cpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHdhdGNoZXIubGFzdCA9IG5vdztcbiAgICAgIH1cbiAgICAgIHdhdGNoZXIuZm4uY2FsbCh0aGlzLCBub3csIGxhc3QsIGRpZmYpXG4gICAgICBpZih3YXRjaGVyLm9uY2UpIHRoaXMuX3dhdGNoZXJzLnNwbGljZShpLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlydHk7XG4gIH0sXG5cbiAgLyoqXG4gICAqICoqdGlwcyoqOiB3aGF0ZXZlciBwYXJhbSB5b3UgcGFzc2VkIGluICR1cGRhdGUsIGFmdGVyIHRoZSBmdW5jdGlvbiBjYWxsZWQsIGRpcnR5LWNoZWNrKGRpZ2VzdCkgcGhhc2Ugd2lsbCBlbnRlcjtcbiAgICogXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufFN0cmluZ3xFeHByZXNzaW9ufSBwYXRoICBcbiAgICogQHBhcmFtICB7V2hhdGV2ZXJ9IHZhbHVlIG9wdGlvbmFsLCB3aGVuIHBhdGggaXMgRnVuY3Rpb24sIHRoZSB2YWx1ZSBpcyBpZ25vcmVkXG4gICAqIEByZXR1cm4ge3RoaXN9ICAgICB0aGlzIFxuICAgKi9cbiAgJHNldDogZnVuY3Rpb24ocGF0aCwgdmFsdWUpe1xuICAgIGlmKHBhdGggIT0gbnVsbCl7XG4gICAgICB2YXIgdHlwZSA9IF8udHlwZU9mKHBhdGgpO1xuICAgICAgaWYoIHR5cGUgPT09ICdzdHJpbmcnIHx8IHBhdGgudHlwZSA9PT0gJ2V4cHJlc3Npb24nICl7XG4gICAgICAgIHBhdGggPSB0aGlzLiRleHByZXNzaW9uKHBhdGgpO1xuICAgICAgICBwYXRoLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICB9ZWxzZSBpZih0eXBlID09PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgcGF0aC5jYWxsKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZm9yKHZhciBpIGluIHBhdGgpIHtcbiAgICAgICAgICB0aGlzLiRzZXQoaSwgcGF0aFtpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gMS4gZXhwciBjYW5iZSBzdHJpbmcgb3IgYSBFeHByZXNzaW9uXG4gIC8vIDIuIGRldGVjdDogaWYgdHJ1ZSwgaWYgZXhwciBpcyBhIHN0cmluZyB3aWxsIGRpcmVjdGx5IHJldHVybjtcbiAgJGdldDogZnVuY3Rpb24oZXhwciwgZGV0ZWN0KSAge1xuICAgIGlmKGRldGVjdCAmJiB0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycpIHJldHVybiBleHByO1xuICAgIHJldHVybiB0aGlzLiRleHByZXNzaW9uKGV4cHIpLmdldCh0aGlzKTtcbiAgfSxcbiAgJHVwZGF0ZTogZnVuY3Rpb24oKXtcbiAgICB0aGlzLiRzZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgcm9vdFBhcmVudCA9IHRoaXM7XG5cbiAgICBkb3tcbiAgICAgIGlmKHJvb3RQYXJlbnQuZGF0YS5pc29sYXRlIHx8ICFyb290UGFyZW50LiRwYXJlbnQpIGJyZWFrO1xuICAgICAgcm9vdFBhcmVudCA9IHJvb3RQYXJlbnQuJHBhcmVudDtcbiAgICB9IHdoaWxlKHJvb3RQYXJlbnQpXG5cbiAgICByb290UGFyZW50LiRkaWdlc3QoKTtcbiAgfSxcbiAgLy8gYXV0byBjb2xsZWN0IHdhdGNoZXJzIGZvciBsb2dpYy1jb250cm9sLlxuICBfcmVjb3JkOiBmdW5jdGlvbigpe1xuICAgIGlmKCF0aGlzLl9yZWNvcmRzKSB0aGlzLl9yZWNvcmRzID0gW107XG4gICAgdGhpcy5fcmVjb3Jkcy5wdXNoKFtdKTtcbiAgfSxcbiAgX3JlbGVhc2U6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZHMucG9wKCk7XG4gIH1cbn1cblxuXG5fLmV4dGVuZChXYXRjaGVyLnByb3RvdHlwZSwgbWV0aG9kcylcblxuXG5XYXRjaGVyLm1peFRvID0gZnVuY3Rpb24ob2JqKXtcbiAgb2JqID0gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID8gb2JqLnByb3RvdHlwZSA6IG9iajtcbiAgcmV0dXJuIF8uZXh0ZW5kKG9iaiwgbWV0aG9kcylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXRjaGVyOyIsInZhciBlbnYgPSAgcmVxdWlyZShcIi4vZW52LmpzXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTsgXG52YXIgUmVndWxhciA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vUmVndWxhci5qc1wiKTtcbnZhciBQYXJzZXIgPSBSZWd1bGFyLlBhcnNlcjtcbnZhciBMZXhlciA9IFJlZ3VsYXIuTGV4ZXI7XG5cbmlmKGVudi5icm93c2VyKXtcbiAgICByZXF1aXJlKFwiLi9kaXJlY3RpdmUvYmFzZS5qc1wiKTtcbiAgICByZXF1aXJlKFwiLi9kaXJlY3RpdmUvYW5pbWF0aW9uLmpzXCIpO1xuICAgIHJlcXVpcmUoXCIuL21vZHVsZS90aW1lb3V0LmpzXCIpO1xuICAgIFJlZ3VsYXIuZG9tID0gcmVxdWlyZShcIi4vZG9tLmpzXCIpO1xufVxuUmVndWxhci5lbnYgPSBlbnY7XG5SZWd1bGFyLnV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xuUmVndWxhci5wYXJzZSA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucyl7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmKG9wdGlvbnMuQkVHSU4gfHwgb3B0aW9ucy5FTkQpe1xuICAgIGlmKG9wdGlvbnMuQkVHSU4pIGNvbmZpZy5CRUdJTiA9IG9wdGlvbnMuQkVHSU47XG4gICAgaWYob3B0aW9ucy5FTkQpIGNvbmZpZy5FTkQgPSBvcHRpb25zLkVORDtcbiAgICBMZXhlci5zZXR1cCgpO1xuICB9XG4gIHZhciBhc3QgPSBuZXcgUGFyc2VyKHN0cikucGFyc2UoKTtcbiAgcmV0dXJuICFvcHRpb25zLnN0cmluZ2lmeT8gYXN0IDogSlNPTi5zdHJpbmdpZnkoYXN0KTtcbn1cblxuIiwidmFyIFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vUmVndWxhci5qc1wiKTtcblxuLyoqXG4gKiBUaW1lb3V0IE1vZHVsZVxuICogQHBhcmFtIHtDb21wb25lbnR9IENvbXBvbmVudCBcbiAqL1xuZnVuY3Rpb24gVGltZW91dE1vZHVsZShDb21wb25lbnQpe1xuXG4gIENvbXBvbmVudC5pbXBsZW1lbnQoe1xuICAgIC8qKlxuICAgICAqIGp1c3QgbGlrZSBzZXRUaW1lb3V0LCBidXQgd2lsbCBlbnRlciBkaWdlc3QgYXV0b21hdGVseVxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZGVsYXkgXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAgIHRpbWVvdXRpZFxuICAgICAqL1xuICAgICR0aW1lb3V0OiBmdW5jdGlvbihmbiwgZGVsYXkpe1xuICAgICAgZGVsYXkgPSBkZWxheSB8fCAwO1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgZm4uY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7IC8vZW50ZXIgZGlnZXN0XG4gICAgICB9LmJpbmQodGhpcyksIGRlbGF5KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIGp1c3QgbGlrZSBzZXRJbnRlcnZhbCwgYnV0IHdpbGwgZW50ZXIgZGlnZXN0IGF1dG9tYXRlbHlcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGludGVydmFsIFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gICBpbnRlcnZhbGlkXG4gICAgICovXG4gICAgJGludGVydmFsOiBmdW5jdGlvbihmbiwgaW50ZXJ2YWwpe1xuICAgICAgaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAxMDAwLzYwO1xuICAgICAgcmV0dXJuIHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgIGZuLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpOyAvL2VudGVyIGRpZ2VzdFxuICAgICAgfS5iaW5kKHRoaXMpLCBpbnRlcnZhbCk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5SZWd1bGFyLnBsdWdpbigndGltZW91dCcsIFRpbWVvdXRNb2R1bGUpO1xuUmVndWxhci5wbHVnaW4oJyR0aW1lb3V0JywgVGltZW91dE1vZHVsZSk7IiwidmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnLmpzXCIpO1xuXG4vLyBzb21lIGN1c3RvbSB0YWcgIHdpbGwgY29uZmxpY3Qgd2l0aCB0aGUgTGV4ZXIgcHJvZ3Jlc3NcbnZhciBjb25mbGljdFRhZyA9IHtcIn1cIjogXCJ7XCIsIFwiXVwiOiBcIltcIn0sIG1hcDEsIG1hcDI7XG4vLyBzb21lIG1hY3JvIGZvciBsZXhlclxudmFyIG1hY3JvID0ge1xuICAnTkFNRSc6IC8oPzpbOl9BLVphLXpdWy1cXC46XzAtOUEtWmEtel0qKS8sXG4gICdJREVOVCc6IC9bXFwkX0EtWmEtel1bXzAtOUEtWmEtelxcJF0qLyxcbiAgJ1NQQUNFJzogL1tcXHJcXG5cXGYgXS9cbn1cblxuXG52YXIgdGVzdCA9IC9hfChiKS8uZXhlYyhcImFcIik7XG52YXIgdGVzdFN1YkNhcHVyZSA9IHRlc3QgJiYgdGVzdFsxXSA9PT0gdW5kZWZpbmVkPyBcbiAgZnVuY3Rpb24oc3RyKXsgcmV0dXJuIHN0ciAhPT0gdW5kZWZpbmVkIH1cbiAgOmZ1bmN0aW9uKHN0cil7cmV0dXJuICEhc3RyfTtcblxuZnVuY3Rpb24gd3JhcEhhbmRlcihoYW5kbGVyKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFsbCl7XG4gICAgcmV0dXJuIHt0eXBlOiBoYW5kbGVyLCB2YWx1ZTogYWxsIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBMZXhlcihpbnB1dCwgb3B0cyl7XG4gIGlmKGNvbmZsaWN0VGFnW2NvbmZpZy5FTkRdKXtcbiAgICB0aGlzLm1hcmtTdGFydCA9IGNvbmZsaWN0VGFnW2NvbmZpZy5FTkRdO1xuICAgIHRoaXMubWFya0VuZCA9IGNvbmZpZy5FTkQ7XG4gIH1cblxuICB0aGlzLmlucHV0ID0gKGlucHV0fHxcIlwiKS50cmltKCk7XG4gIHRoaXMub3B0cyA9IG9wdHMgfHwge307XG4gIHRoaXMubWFwID0gdGhpcy5vcHRzLm1vZGUgIT09IDI/ICBtYXAxOiBtYXAyO1xuICB0aGlzLnN0YXRlcyA9IFtcIklOSVRcIl07XG4gIGlmKG9wdHMgJiYgb3B0cy5leHByZXNzaW9uKXtcbiAgICAgdGhpcy5zdGF0ZXMucHVzaChcIkpTVFwiKTtcbiAgICAgdGhpcy5leHByZXNzaW9uID0gdHJ1ZTtcbiAgfVxufVxuXG52YXIgbG8gPSBMZXhlci5wcm90b3R5cGVcblxuXG5sby5sZXggPSBmdW5jdGlvbihzdHIpe1xuICBzdHIgPSAoc3RyIHx8IHRoaXMuaW5wdXQpLnRyaW0oKTtcbiAgdmFyIHRva2VucyA9IFtdLCBzcGxpdCwgdGVzdCxtbGVuLCB0b2tlbiwgc3RhdGU7XG4gIHRoaXMuaW5wdXQgPSBzdHIsIFxuICB0aGlzLm1hcmtzID0gMDtcbiAgLy8gaW5pdCB0aGUgcG9zIGluZGV4XG4gIHRoaXMuaW5kZXg9MDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZShzdHIpe1xuICAgIGkrK1xuICAgIHN0YXRlID0gdGhpcy5zdGF0ZSgpO1xuICAgIHNwbGl0ID0gdGhpcy5tYXBbc3RhdGVdIFxuICAgIHRlc3QgPSBzcGxpdC5UUlVOSy5leGVjKHN0cik7XG4gICAgaWYoIXRlc3Qpe1xuICAgICAgdGhpcy5lcnJvcignVW5yZWNvZ2luaXplZCBUb2tlbicpO1xuICAgIH1cbiAgICBtbGVuID0gdGVzdFswXS5sZW5ndGg7XG4gICAgc3RyID0gc3RyLnNsaWNlKG1sZW4pXG4gICAgdG9rZW4gPSB0aGlzLl9wcm9jZXNzLmNhbGwodGhpcywgdGVzdCwgc3BsaXQsIHN0cilcbiAgICBpZih0b2tlbikgdG9rZW5zLnB1c2godG9rZW4pXG4gICAgdGhpcy5pbmRleCArPSBtbGVuO1xuICAgIC8vIGlmKHN0YXRlID09ICdUQUcnIHx8IHN0YXRlID09ICdKU1QnKSBzdHIgPSB0aGlzLnNraXBzcGFjZShzdHIpO1xuICB9XG5cbiAgdG9rZW5zLnB1c2goe3R5cGU6ICdFT0YnfSk7XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxubG8uZXJyb3IgPSBmdW5jdGlvbihtc2cpe1xuICB0aHJvdyAgRXJyb3IoXCJQYXJzZSBFcnJvcjogXCIgKyBtc2cgKyAgJzpcXG4nICsgXy50cmFja0Vycm9yUG9zKHRoaXMuaW5wdXQsIHRoaXMuaW5kZXgpKTtcbn1cblxubG8uX3Byb2Nlc3MgPSBmdW5jdGlvbihhcmdzLCBzcGxpdCxzdHIpe1xuICAvLyBjb25zb2xlLmxvZyhhcmdzLmpvaW4oXCIsXCIpLCB0aGlzLnN0YXRlKCkpXG4gIHZhciBsaW5rcyA9IHNwbGl0LmxpbmtzLCBtYXJjaGVkID0gZmFsc2UsIHRva2VuO1xuXG4gIGZvcih2YXIgbGVuID0gbGlua3MubGVuZ3RoLCBpPTA7aTxsZW4gO2krKyl7XG4gICAgdmFyIGxpbmsgPSBsaW5rc1tpXSxcbiAgICAgIGhhbmRsZXIgPSBsaW5rWzJdLFxuICAgICAgaW5kZXggPSBsaW5rWzBdO1xuICAgIC8vIGlmKGFyZ3NbNl0gPT09ICc+JyAmJiBpbmRleCA9PT0gNikgY29uc29sZS5sb2coJ2hhaGEnKVxuICAgIGlmKHRlc3RTdWJDYXB1cmUoYXJnc1tpbmRleF0pKSB7XG4gICAgICBtYXJjaGVkID0gdHJ1ZTtcbiAgICAgIGlmKGhhbmRsZXIpe1xuICAgICAgICB0b2tlbiA9IGhhbmRsZXIuYXBwbHkodGhpcywgYXJncy5zbGljZShpbmRleCwgaW5kZXggKyBsaW5rWzFdKSlcbiAgICAgICAgaWYodG9rZW4pICB0b2tlbi5wb3MgPSB0aGlzLmluZGV4O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmKCFtYXJjaGVkKXsgLy8gaW4gaWUgbHQ4IC4gc3ViIGNhcHR1cmUgaXMgXCJcIiBidXQgb250IFxuICAgIHN3aXRjaChzdHIuY2hhckF0KDApKXtcbiAgICAgIGNhc2UgXCI8XCI6XG4gICAgICAgIHRoaXMuZW50ZXIoXCJUQUdcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5lbnRlcihcIkpTVFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0b2tlbjtcbn1cbmxvLmVudGVyID0gZnVuY3Rpb24oc3RhdGUpe1xuICB0aGlzLnN0YXRlcy5wdXNoKHN0YXRlKVxuICByZXR1cm4gdGhpcztcbn1cblxubG8uc3RhdGUgPSBmdW5jdGlvbigpe1xuICB2YXIgc3RhdGVzID0gdGhpcy5zdGF0ZXM7XG4gIHJldHVybiBzdGF0ZXNbc3RhdGVzLmxlbmd0aC0xXTtcbn1cblxubG8ubGVhdmUgPSBmdW5jdGlvbihzdGF0ZSl7XG4gIHZhciBzdGF0ZXMgPSB0aGlzLnN0YXRlcztcbiAgaWYoIXN0YXRlIHx8IHN0YXRlc1tzdGF0ZXMubGVuZ3RoLTFdID09PSBzdGF0ZSkgc3RhdGVzLnBvcCgpXG59XG5cblxuTGV4ZXIuc2V0dXAgPSBmdW5jdGlvbigpe1xuICBtYWNyby5FTkQgPSBjb25maWcuRU5EO1xuICBtYWNyby5CRUdJTiA9IGNvbmZpZy5CRUdJTjtcbiAgLy9cbiAgbWFwMSA9IGdlbk1hcChbXG4gICAgLy8gSU5JVFxuICAgIHJ1bGVzLkVOVEVSX0pTVCxcbiAgICBydWxlcy5FTlRFUl9UQUcsXG4gICAgcnVsZXMuVEVYVCxcblxuICAgIC8vVEFHXG4gICAgcnVsZXMuVEFHX05BTUUsXG4gICAgcnVsZXMuVEFHX09QRU4sXG4gICAgcnVsZXMuVEFHX0NMT1NFLFxuICAgIHJ1bGVzLlRBR19QVU5DSE9SLFxuICAgIHJ1bGVzLlRBR19FTlRFUl9KU1QsXG4gICAgcnVsZXMuVEFHX1VOUV9WQUxVRSxcbiAgICBydWxlcy5UQUdfU1RSSU5HLFxuICAgIHJ1bGVzLlRBR19TUEFDRSxcbiAgICBydWxlcy5UQUdfQ09NTUVOVCxcblxuICAgIC8vIEpTVFxuICAgIHJ1bGVzLkpTVF9PUEVOLFxuICAgIHJ1bGVzLkpTVF9DTE9TRSxcbiAgICBydWxlcy5KU1RfQ09NTUVOVCxcbiAgICBydWxlcy5KU1RfRVhQUl9PUEVOLFxuICAgIHJ1bGVzLkpTVF9JREVOVCxcbiAgICBydWxlcy5KU1RfU1BBQ0UsXG4gICAgcnVsZXMuSlNUX0xFQVZFLFxuICAgIHJ1bGVzLkpTVF9OVU1CRVIsXG4gICAgcnVsZXMuSlNUX1BVTkNIT1IsXG4gICAgcnVsZXMuSlNUX1NUUklORyxcbiAgICBydWxlcy5KU1RfQ09NTUVOVFxuICAgIF0pXG5cbiAgLy8gaWdub3JlZCB0aGUgdGFnLXJlbGF0aXZlIHRva2VuXG4gIG1hcDIgPSBnZW5NYXAoW1xuICAgIC8vIElOSVQgbm8gPCByZXN0cmljdFxuICAgIHJ1bGVzLkVOVEVSX0pTVDIsXG4gICAgcnVsZXMuVEVYVCxcbiAgICAvLyBKU1RcbiAgICBydWxlcy5KU1RfQ09NTUVOVCxcbiAgICBydWxlcy5KU1RfT1BFTixcbiAgICBydWxlcy5KU1RfQ0xPU0UsXG4gICAgcnVsZXMuSlNUX0VYUFJfT1BFTixcbiAgICBydWxlcy5KU1RfSURFTlQsXG4gICAgcnVsZXMuSlNUX1NQQUNFLFxuICAgIHJ1bGVzLkpTVF9MRUFWRSxcbiAgICBydWxlcy5KU1RfTlVNQkVSLFxuICAgIHJ1bGVzLkpTVF9QVU5DSE9SLFxuICAgIHJ1bGVzLkpTVF9TVFJJTkcsXG4gICAgcnVsZXMuSlNUX0NPTU1FTlRcbiAgICBdKVxufVxuXG5cbmZ1bmN0aW9uIGdlbk1hcChydWxlcyl7XG4gIHZhciBydWxlLCBtYXAgPSB7fSwgc2lnbjtcbiAgZm9yKHZhciBpID0gMCwgbGVuID0gcnVsZXMubGVuZ3RoOyBpIDwgbGVuIDsgaSsrKXtcbiAgICBydWxlID0gcnVsZXNbaV07XG4gICAgc2lnbiA9IHJ1bGVbMl0gfHwgJ0lOSVQnO1xuICAgICggbWFwW3NpZ25dIHx8IChtYXBbc2lnbl0gPSB7cnVsZXM6W10sIGxpbmtzOltdfSkgKS5ydWxlcy5wdXNoKHJ1bGUpO1xuICB9XG4gIHJldHVybiBzZXR1cChtYXApO1xufVxuXG5mdW5jdGlvbiBzZXR1cChtYXApe1xuICB2YXIgc3BsaXQsIHJ1bGVzLCB0cnVua3MsIGhhbmRsZXIsIHJlZywgcmV0YWluLCBydWxlO1xuICBmdW5jdGlvbiByZXBsYWNlRm4oYWxsLCBvbmUpe1xuICAgIHJldHVybiB0eXBlb2YgbWFjcm9bb25lXSA9PT0gJ3N0cmluZyc/IFxuICAgICAgXy5lc2NhcGVSZWdFeHAobWFjcm9bb25lXSkgXG4gICAgICA6IFN0cmluZyhtYWNyb1tvbmVdKS5zbGljZSgxLC0xKTtcbiAgfVxuXG4gIGZvcih2YXIgaSBpbiBtYXApe1xuXG4gICAgc3BsaXQgPSBtYXBbaV07XG4gICAgc3BsaXQuY3VySW5kZXggPSAxO1xuICAgIHJ1bGVzID0gc3BsaXQucnVsZXM7XG4gICAgdHJ1bmtzID0gW107XG5cbiAgICBmb3IodmFyIGogPSAwLGxlbiA9IHJ1bGVzLmxlbmd0aDsgajxsZW47IGorKyl7XG4gICAgICBydWxlID0gcnVsZXNbal07IFxuICAgICAgcmVnID0gcnVsZVswXTtcbiAgICAgIGhhbmRsZXIgPSBydWxlWzFdO1xuXG4gICAgICBpZih0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZycpe1xuICAgICAgICBoYW5kbGVyID0gd3JhcEhhbmRlcihoYW5kbGVyKTtcbiAgICAgIH1cbiAgICAgIGlmKF8udHlwZU9mKHJlZykgPT09ICdyZWdleHAnKSByZWcgPSByZWcudG9TdHJpbmcoKS5zbGljZSgxLCAtMSk7XG5cbiAgICAgIHJlZyA9IHJlZy5yZXBsYWNlKC9cXHsoXFx3KylcXH0vZywgcmVwbGFjZUZuKVxuICAgICAgcmV0YWluID0gXy5maW5kU3ViQ2FwdHVyZShyZWcpICsgMTsgXG4gICAgICBzcGxpdC5saW5rcy5wdXNoKFtzcGxpdC5jdXJJbmRleCwgcmV0YWluLCBoYW5kbGVyXSk7IFxuICAgICAgc3BsaXQuY3VySW5kZXggKz0gcmV0YWluO1xuICAgICAgdHJ1bmtzLnB1c2gocmVnKTtcbiAgICB9XG4gICAgc3BsaXQuVFJVTksgPSBuZXcgUmVnRXhwKFwiXig/OihcIiArIHRydW5rcy5qb2luKFwiKXwoXCIpICsgXCIpKVwiKVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbnZhciBydWxlcyA9IHtcblxuICAvLyAxLiBJTklUXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIG1vZGUxJ3MgSlNUIEVOVEVSIFJVTEVcbiAgRU5URVJfSlNUOiBbL1teXFx4MDA8XSo/KD89e0JFR0lOfSkvLCBmdW5jdGlvbihhbGwpe1xuICAgIHRoaXMuZW50ZXIoJ0pTVCcpO1xuICAgIGlmKGFsbCkgcmV0dXJuIHt0eXBlOiAnVEVYVCcsIHZhbHVlOiBhbGx9XG4gIH1dLFxuXG4gIC8vIG1vZGUyJ3MgSlNUIEVOVEVSIFJVTEVcbiAgRU5URVJfSlNUMjogWy9bXlxceDAwXSo/KD89e0JFR0lOfSkvLCBmdW5jdGlvbihhbGwpe1xuICAgIHRoaXMuZW50ZXIoJ0pTVCcpO1xuICAgIGlmKGFsbCkgcmV0dXJuIHt0eXBlOiAnVEVYVCcsIHZhbHVlOiBhbGx9XG4gIH1dLFxuXG4gIEVOVEVSX1RBRzogWy9bXlxceDAwPD5dKj8oPz08KS8sIGZ1bmN0aW9uKGFsbCl7IFxuICAgIHRoaXMuZW50ZXIoJ1RBRycpO1xuICAgIGlmKGFsbCkgcmV0dXJuIHt0eXBlOiAnVEVYVCcsIHZhbHVlOiBhbGx9XG4gIH1dLFxuXG4gIFRFWFQ6IFsvW15cXHgwMF0rLywgJ1RFWFQnXSxcblxuICAvLyAyLiBUQUdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgVEFHX05BTUU6IFsve05BTUV9LywgJ05BTUUnLCAnVEFHJ10sXG4gIFRBR19VTlFfVkFMVUU6IFsvW15cXHt9JlwiJz0+PGBcXHJcXG5cXGYgXSsvLCAnVU5RJywgJ1RBRyddLFxuXG4gIFRBR19PUEVOOiBbLzwoe05BTUV9KVxccyovLCBmdW5jdGlvbihhbGwsIG9uZSl7IC8vXCJcbiAgICByZXR1cm4ge3R5cGU6ICdUQUdfT1BFTicsIHZhbHVlOiBvbmV9XG4gIH0sICdUQUcnXSxcbiAgVEFHX0NMT1NFOiBbLzxcXC8oe05BTUV9KVtcXHJcXG5cXGYgXSo+LywgZnVuY3Rpb24oYWxsLCBvbmUpe1xuICAgIHRoaXMubGVhdmUoKTtcbiAgICByZXR1cm4ge3R5cGU6ICdUQUdfQ0xPU0UnLCB2YWx1ZTogb25lIH1cbiAgfSwgJ1RBRyddLFxuXG4gICAgLy8gbW9kZTIncyBKU1QgRU5URVIgUlVMRVxuICBUQUdfRU5URVJfSlNUOiBbLyg/PXtCRUdJTn0pLywgZnVuY3Rpb24oKXtcbiAgICB0aGlzLmVudGVyKCdKU1QnKTtcbiAgfSwgJ1RBRyddLFxuXG5cbiAgVEFHX1BVTkNIT1I6IFsvW1xcPlxcLz0mXS8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgaWYoYWxsID09PSAnPicpIHRoaXMubGVhdmUoKTtcbiAgICByZXR1cm4ge3R5cGU6IGFsbCwgdmFsdWU6IGFsbCB9XG4gIH0sICdUQUcnXSxcbiAgVEFHX1NUUklORzogIFsgLycoW14nXSopJ3xcIihbXlwiXSopXFxcIi8sIC8qJyovICBmdW5jdGlvbihhbGwsIG9uZSwgdHdvKXsgXG4gICAgdmFyIHZhbHVlID0gb25lIHx8IHR3byB8fCBcIlwiO1xuXG4gICAgcmV0dXJuIHt0eXBlOiAnU1RSSU5HJywgdmFsdWU6IHZhbHVlfVxuICB9LCAnVEFHJ10sXG5cbiAgVEFHX1NQQUNFOiBbL3tTUEFDRX0rLywgbnVsbCwgJ1RBRyddLFxuICBUQUdfQ09NTUVOVDogWy88XFwhLS0oW15cXHgwMF0qPyktLVxcPi8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgdGhpcy5sZWF2ZSgpXG4gICAgLy8gdGhpcy5sZWF2ZSgnVEFHJylcbiAgfSAsJ1RBRyddLFxuXG4gIC8vIDMuIEpTVFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgSlNUX09QRU46IFsne0JFR0lOfSN7U1BBQ0V9Kih7SURFTlR9KScsIGZ1bmN0aW9uKGFsbCwgbmFtZSl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdPUEVOJyxcbiAgICAgIHZhbHVlOiBuYW1lXG4gICAgfVxuICB9LCAnSlNUJ10sXG4gIEpTVF9MRUFWRTogWy97RU5EfS8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgaWYodGhpcy5tYXJrRW5kID09PSBhbGwgJiYgdGhpcy5leHByZXNzaW9uKSByZXR1cm4ge3R5cGU6IHRoaXMubWFya0VuZCwgdmFsdWU6IHRoaXMubWFya0VuZH07XG4gICAgaWYoIXRoaXMubWFya0VuZCB8fCAhdGhpcy5tYXJrcyApe1xuICAgICAgdGhpcy5maXJzdEVudGVyU3RhcnQgPSBmYWxzZTtcbiAgICAgIHRoaXMubGVhdmUoJ0pTVCcpO1xuICAgICAgcmV0dXJuIHt0eXBlOiAnRU5EJ31cbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMubWFya3MtLTtcbiAgICAgIHJldHVybiB7dHlwZTogdGhpcy5tYXJrRW5kLCB2YWx1ZTogdGhpcy5tYXJrRW5kfVxuICAgIH1cbiAgfSwgJ0pTVCddLFxuICBKU1RfQ0xPU0U6IFsve0JFR0lOfVxccypcXC8oe0lERU5UfSlcXHMqe0VORH0vLCBmdW5jdGlvbihhbGwsIG9uZSl7XG4gICAgdGhpcy5sZWF2ZSgnSlNUJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdDTE9TRScsXG4gICAgICB2YWx1ZTogb25lXG4gICAgfVxuICB9LCAnSlNUJ10sXG4gIEpTVF9DT01NRU5UOiBbL3tCRUdJTn1cXCEoW15cXHgwMF0qPylcXCF7RU5EfS8sIGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5sZWF2ZSgpO1xuICB9LCAnSlNUJ10sXG4gIEpTVF9FWFBSX09QRU46IFsne0JFR0lOfScsZnVuY3Rpb24oYWxsLCBvbmUpe1xuICAgIGlmKGFsbCA9PT0gdGhpcy5tYXJrU3RhcnQpe1xuICAgICAgaWYodGhpcy5leHByZXNzaW9uKSByZXR1cm4geyB0eXBlOiB0aGlzLm1hcmtTdGFydCwgdmFsdWU6IHRoaXMubWFya1N0YXJ0IH07XG4gICAgICBpZih0aGlzLmZpcnN0RW50ZXJTdGFydCB8fCB0aGlzLm1hcmtzKXtcbiAgICAgICAgdGhpcy5tYXJrcysrXG4gICAgICAgIHRoaXMuZmlyc3RFbnRlclN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRoaXMubWFya1N0YXJ0LCB2YWx1ZTogdGhpcy5tYXJrU3RhcnQgfTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmZpcnN0RW50ZXJTdGFydCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnRVhQUl9PUEVOJyxcbiAgICAgIGVzY2FwZTogZmFsc2VcbiAgICB9XG5cbiAgfSwgJ0pTVCddLFxuICBKU1RfSURFTlQ6IFsne0lERU5UfScsICdJREVOVCcsICdKU1QnXSxcbiAgSlNUX1NQQUNFOiBbL1sgXFxyXFxuXFxmXSsvLCBudWxsLCAnSlNUJ10sXG4gIEpTVF9QVU5DSE9SOiBbL1s9IV0/PT18Wy09PjwrKlxcLyVcXCFdP1xcPXxcXHxcXHx8JiZ8XFxAXFwofFxcLlxcLnxbPFxcPlxcW1xcXVxcKFxcKVxcLVxcfFxce31cXCtcXCpcXC8lPzpcXC4hLF0vLCBmdW5jdGlvbihhbGwpe1xuICAgIHJldHVybiB7IHR5cGU6IGFsbCwgdmFsdWU6IGFsbCB9XG4gIH0sJ0pTVCddLFxuXG4gIEpTVF9TVFJJTkc6ICBbIC8nKFteJ10qKSd8XCIoW15cIl0qKVwiLywgZnVuY3Rpb24oYWxsLCBvbmUsIHR3byl7IC8vXCInXG4gICAgcmV0dXJuIHt0eXBlOiAnU1RSSU5HJywgdmFsdWU6IG9uZSB8fCB0d28gfHwgXCJcIn1cbiAgfSwgJ0pTVCddLFxuICBKU1RfTlVNQkVSOiBbLyg/OlswLTldKlxcLlswLTldK3xbMC05XSspKGVcXGQrKT8vLCBmdW5jdGlvbihhbGwpe1xuICAgIHJldHVybiB7dHlwZTogJ05VTUJFUicsIHZhbHVlOiBwYXJzZUZsb2F0KGFsbCwgMTApfTtcbiAgfSwgJ0pTVCddXG59XG5cblxuLy8gc2V0dXAgd2hlbiBmaXJzdCBjb25maWdcbkxleGVyLnNldHVwKCk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExleGVyO1xuIiwidmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWcuanNcIik7XG52YXIgbm9kZSA9IHJlcXVpcmUoXCIuL25vZGUuanNcIik7XG52YXIgTGV4ZXIgPSByZXF1aXJlKFwiLi9MZXhlci5qc1wiKTtcbnZhciB2YXJOYW1lID0gXy52YXJOYW1lO1xudmFyIGN0eE5hbWUgPSBfLmN0eE5hbWU7XG52YXIgZXh0TmFtZSA9IF8uZXh0TmFtZTtcbnZhciBpc1BhdGggPSBfLm1ha2VQcmVkaWNhdGUoXCJTVFJJTkcgSURFTlQgTlVNQkVSXCIpO1xudmFyIGlzS2V5V29yZCA9IF8ubWFrZVByZWRpY2F0ZShcInRydWUgZmFsc2UgdW5kZWZpbmVkIG51bGwgdGhpcyBBcnJheSBEYXRlIEpTT04gTWF0aCBOYU4gUmVnRXhwIGRlY29kZVVSSSBkZWNvZGVVUklDb21wb25lbnQgZW5jb2RlVVJJIGVuY29kZVVSSUNvbXBvbmVudCBwYXJzZUZsb2F0IHBhcnNlSW50IE9iamVjdFwiKTtcblxuXG5cblxuZnVuY3Rpb24gUGFyc2VyKGlucHV0LCBvcHRzKXtcbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICB0aGlzLnRva2VucyA9IG5ldyBMZXhlcihpbnB1dCwgb3B0cykubGV4KCk7XG4gIHRoaXMucG9zID0gMDtcbiAgdGhpcy5sZW5ndGggPSB0aGlzLnRva2Vucy5sZW5ndGg7XG59XG5cblxudmFyIG9wID0gUGFyc2VyLnByb3RvdHlwZTtcblxuXG5vcC5wYXJzZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMucG9zID0gMDtcbiAgdmFyIHJlcz0gdGhpcy5wcm9ncmFtKCk7XG4gIGlmKHRoaXMubGwoKS50eXBlID09PSAnVEFHX0NMT1NFJyl7XG4gICAgdGhpcy5lcnJvcihcIllvdSBtYXkgZ290IGEgdW5jbG9zZWQgVGFnXCIpXG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxub3AubGwgPSAgZnVuY3Rpb24oayl7XG4gIGsgPSBrIHx8IDE7XG4gIGlmKGsgPCAwKSBrID0gayArIDE7XG4gIHZhciBwb3MgPSB0aGlzLnBvcyArIGsgLSAxO1xuICBpZihwb3MgPiB0aGlzLmxlbmd0aCAtIDEpe1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMubGVuZ3RoLTFdO1xuICB9XG4gIHJldHVybiB0aGlzLnRva2Vuc1twb3NdO1xufVxuICAvLyBsb29rYWhlYWRcbm9wLmxhID0gZnVuY3Rpb24oayl7XG4gIHJldHVybiAodGhpcy5sbChrKSB8fCAnJykudHlwZTtcbn1cblxub3AubWF0Y2ggPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSl7XG4gIHZhciBsbDtcbiAgaWYoIShsbCA9IHRoaXMuZWF0KHR5cGUsIHZhbHVlKSkpe1xuICAgIGxsICA9IHRoaXMubGwoKTtcbiAgICB0aGlzLmVycm9yKCdleHBlY3QgWycgKyB0eXBlICsgKHZhbHVlID09IG51bGw/ICcnOic6JysgdmFsdWUpICsgJ11cIiAtPiBnb3QgXCJbJyArIGxsLnR5cGUgKyAodmFsdWU9PW51bGw/ICcnOic6JytsbC52YWx1ZSkgKyAnXScsIGxsLnBvcylcbiAgfWVsc2V7XG4gICAgcmV0dXJuIGxsO1xuICB9XG59XG5cbm9wLmVycm9yID0gZnVuY3Rpb24obXNnLCBwb3Mpe1xuICBtc2cgPSAgXCJcXG7jgJAgcGFyc2UgZmFpbGVkIOOAkSBcIiArIG1zZyArICAnOlxcblxcbicgKyBfLnRyYWNrRXJyb3JQb3ModGhpcy5pbnB1dCwgdHlwZW9mIHBvcyA9PT0gJ251bWJlcic/IHBvczogdGhpcy5sbCgpLnBvc3x8MCk7XG4gIHRocm93IG5ldyBFcnJvcihtc2cpO1xufVxuXG5vcC5uZXh0ID0gZnVuY3Rpb24oayl7XG4gIGsgPSBrIHx8IDE7XG4gIHRoaXMucG9zICs9IGs7XG59XG5vcC5lYXQgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSl7XG4gIHZhciBsbCA9IHRoaXMubGwoKTtcbiAgaWYodHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKXtcbiAgICBmb3IodmFyIGxlbiA9IHR5cGUubGVuZ3RoIDsgbGVuLS07KXtcbiAgICAgIGlmKGxsLnR5cGUgPT09IHR5cGVbbGVuXSkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIGxsO1xuICAgICAgfVxuICAgIH1cbiAgfWVsc2V7XG4gICAgaWYoIGxsLnR5cGUgPT09IHR5cGUgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbGwudmFsdWUgPT09IHZhbHVlKSApe1xuICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgIHJldHVybiBsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBwcm9ncmFtXG4vLyAgOkVPRlxuLy8gIHwgKHN0YXRlbWVudCkqIEVPRlxub3AucHJvZ3JhbSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBzdGF0ZW1lbnRzID0gW10sICBsbCA9IHRoaXMubGwoKTtcbiAgd2hpbGUobGwudHlwZSAhPT0gJ0VPRicgJiYgbGwudHlwZSAhPT0nVEFHX0NMT1NFJyl7XG5cbiAgICBzdGF0ZW1lbnRzLnB1c2godGhpcy5zdGF0ZW1lbnQoKSk7XG4gICAgbGwgPSB0aGlzLmxsKCk7XG4gIH1cbiAgLy8gaWYobGwudHlwZSA9PT0gJ1RBR19DTE9TRScpIHRoaXMuZXJyb3IoXCJZb3UgbWF5IGhhdmUgdW5tYXRjaGVkIFRhZ1wiKVxuICByZXR1cm4gc3RhdGVtZW50cztcbn1cblxuLy8gc3RhdGVtZW50XG4vLyAgOiB4bWxcbi8vICB8IGpzdFxuLy8gIHwgdGV4dFxub3Auc3RhdGVtZW50ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxsID0gdGhpcy5sbCgpO1xuICBzd2l0Y2gobGwudHlwZSl7XG4gICAgY2FzZSAnTkFNRSc6XG4gICAgY2FzZSAnVEVYVCc6XG4gICAgICB2YXIgdGV4dCA9IGxsLnZhbHVlO1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB3aGlsZShsbCA9IHRoaXMuZWF0KFsnTkFNRScsICdURVhUJ10pKXtcbiAgICAgICAgdGV4dCArPSBsbC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlLnRleHQodGV4dCk7XG4gICAgY2FzZSAnVEFHX09QRU4nOlxuICAgICAgcmV0dXJuIHRoaXMueG1sKCk7XG4gICAgY2FzZSAnT1BFTic6IFxuICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aXZlKCk7XG4gICAgY2FzZSAnRVhQUl9PUEVOJzpcbiAgICAgIHJldHVybiB0aGlzLmludGVycGxhdGlvbigpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIHRva2VuOiAnKyB0aGlzLmxhKCkpXG4gIH1cbn1cblxuLy8geG1sIFxuLy8gc3RhZyBzdGF0ZW1lbnQqIFRBR19DTE9TRT8oaWYgc2VsZi1jbG9zZWQgdGFnKVxub3AueG1sID0gZnVuY3Rpb24oKXtcbiAgdmFyIG5hbWUsIGF0dHJzLCBjaGlsZHJlbiwgc2VsZkNsb3NlZDtcbiAgbmFtZSA9IHRoaXMubWF0Y2goJ1RBR19PUEVOJykudmFsdWU7XG4gIGF0dHJzID0gdGhpcy5hdHRycygpO1xuICBzZWxmQ2xvc2VkID0gdGhpcy5lYXQoJy8nKVxuICB0aGlzLm1hdGNoKCc+Jyk7XG4gIGlmKCAhc2VsZkNsb3NlZCAmJiAhXy5pc1ZvaWRUYWcobmFtZSkgKXtcbiAgICBjaGlsZHJlbiA9IHRoaXMucHJvZ3JhbSgpO1xuICAgIGlmKCF0aGlzLmVhdCgnVEFHX0NMT1NFJywgbmFtZSkpIHRoaXMuZXJyb3IoJ2V4cGVjdCA8LycrbmFtZSsnPiBnb3QnKyAnbm8gbWF0Y2hlZCBjbG9zZVRhZycpXG4gIH1cbiAgcmV0dXJuIG5vZGUuZWxlbWVudChuYW1lLCBhdHRycywgY2hpbGRyZW4pO1xufVxuXG4vLyB4ZW50aXR5XG4vLyAgLXJ1bGUod3JhcCBhdHRyaWJ1dGUpXG4vLyAgLWF0dHJpYnV0ZVxuLy9cbi8vIF9fZXhhbXBsZV9fXG4vLyAgbmFtZSA9IDEgfCAgXG4vLyAgbmctaGlkZSB8XG4vLyAgb24tY2xpY2s9e3t9fSB8IFxuLy8gIHt7I2lmIG5hbWV9fW9uLWNsaWNrPXt7eHh9fXt7I2Vsc2V9fW9uLXRhcD17e319e3svaWZ9fVxuXG5vcC54ZW50aXR5ID0gZnVuY3Rpb24obGwpe1xuICB2YXIgbmFtZSA9IGxsLnZhbHVlLCB2YWx1ZSwgbW9kaWZpZXI7XG4gIGlmKGxsLnR5cGUgPT09ICdOQU1FJyl7XG4gICAgLy9AIG9ubHkgZm9yIHRlc3RcbiAgICBpZih+bmFtZS5pbmRleE9mKCcuJykpe1xuICAgICAgdmFyIHRtcCA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgIG5hbWUgPSB0bXBbMF07XG4gICAgICBtb2RpZmllciA9IHRtcFsxXVxuXG4gICAgfVxuICAgIGlmKCB0aGlzLmVhdChcIj1cIikgKSB2YWx1ZSA9IHRoaXMuYXR0dmFsdWUobW9kaWZpZXIpO1xuICAgIHJldHVybiBub2RlLmF0dHJpYnV0ZSggbmFtZSwgdmFsdWUsIG1vZGlmaWVyICk7XG4gIH1lbHNle1xuICAgIGlmKCBuYW1lICE9PSAnaWYnKSB0aGlzLmVycm9yKFwiY3VycmVudCB2ZXJzaW9uLiBPTkxZIFJVTEUgI2lmICNlbHNlICNlbHNlaWYgaXMgdmFsaWQgaW4gdGFnLCB0aGUgcnVsZSAjXCIgKyBuYW1lICsgJyBpcyBpbnZhbGlkJyk7XG4gICAgcmV0dXJuIHRoaXNbJ2lmJ10odHJ1ZSk7XG4gIH1cblxufVxuXG4vLyBzdGFnICAgICA6Oj0gICAgJzwnIE5hbWUgKFMgYXR0cikqIFM/ICc+JyAgXG4vLyBhdHRyICAgIDo6PSAgICAgTmFtZSBFcSBhdHR2YWx1ZVxub3AuYXR0cnMgPSBmdW5jdGlvbihpc0F0dHJpYnV0ZSl7XG4gIHZhciBlYXRcbiAgaWYoIWlzQXR0cmlidXRlKXtcbiAgICBlYXQgPSBbXCJOQU1FXCIsIFwiT1BFTlwiXVxuICB9ZWxzZXtcbiAgICBlYXQgPSBbXCJOQU1FXCJdXG4gIH1cblxuICB2YXIgYXR0cnMgPSBbXSwgbGw7XG4gIHdoaWxlIChsbCA9IHRoaXMuZWF0KGVhdCkpe1xuICAgIGF0dHJzLnB1c2godGhpcy54ZW50aXR5KCBsbCApKVxuICB9XG4gIHJldHVybiBhdHRycztcbn1cblxuLy8gYXR0dmFsdWVcbi8vICA6IFNUUklORyAgXG4vLyAgfCBOQU1FXG5vcC5hdHR2YWx1ZSA9IGZ1bmN0aW9uKG1kZil7XG4gIHZhciBsbCA9IHRoaXMubGwoKTtcbiAgc3dpdGNoKGxsLnR5cGUpe1xuICAgIGNhc2UgXCJOQU1FXCI6XG4gICAgY2FzZSBcIlVOUVwiOlxuICAgIGNhc2UgXCJTVFJJTkdcIjpcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgdmFyIHZhbHVlID0gbGwudmFsdWU7XG4gICAgICBpZih+dmFsdWUuaW5kZXhPZihjb25maWcuQkVHSU4pICYmIH52YWx1ZS5pbmRleE9mKGNvbmZpZy5FTkQpICYmIG1kZiE9PSdjbXBsJyl7XG4gICAgICAgIHZhciBjb25zdGFudCA9IHRydWU7XG4gICAgICAgIHZhciBwYXJzZWQgPSBuZXcgUGFyc2VyKHZhbHVlLCB7IG1vZGU6IDIgfSkucGFyc2UoKTtcbiAgICAgICAgLy8gaWYocGFyc2VkLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRbMF0udHlwZSA9PT0gJ2V4cHJlc3Npb24nKSByZXR1cm4gcGFyc2VkWzBdO1xuICAgICAgICB2YXIgYm9keSA9IFtdO1xuICAgICAgICBwYXJzZWQuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICBpZighaXRlbS5jb25zdGFudCkgY29uc3RhbnQ9ZmFsc2U7XG4gICAgICAgICAgLy8gc2lsZW50IHRoZSBtdXRpcGxlIGludGVwbGF0aW9uXG4gICAgICAgICAgICBib2R5LnB1c2goaXRlbS5ib2R5IHx8IFwiJ1wiICsgaXRlbS50ZXh0LnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKSArIFwiJ1wiKTsgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgYm9keSA9IFwiW1wiICsgYm9keS5qb2luKFwiLFwiKSArIFwiXS5qb2luKCcnKVwiO1xuICAgICAgICB2YWx1ZSA9IG5vZGUuZXhwcmVzc2lvbihib2R5LCBudWxsLCBjb25zdGFudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcIkVYUFJfT1BFTlwiOlxuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwbGF0aW9uKCk7XG4gICAgLy8gY2FzZSBcIk9QRU5cIjpcbiAgICAvLyAgIGlmKGxsLnZhbHVlID09PSAnaW5jJyB8fCBsbC52YWx1ZSA9PT0gJ2luY2x1ZGUnKXtcbiAgICAvLyAgICAgdGhpcy5uZXh0KCk7XG4gICAgLy8gICAgIHJldHVybiB0aGlzLmluYygpO1xuICAgIC8vICAgfWVsc2V7XG4gICAgLy8gICAgIHRoaXMuZXJyb3IoJ2F0dHJpYnV0ZSB2YWx1ZSBvbmx5IHN1cHBvcnQgaW50ZXBsYXRpb24gYW5kIHsjaW5jfSBzdGF0ZW1lbnQnKVxuICAgIC8vICAgfVxuICAgIC8vICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMuZXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW46ICcrIHRoaXMubGEoKSlcbiAgfVxufVxuXG5cbi8vIHt7I319XG5vcC5kaXJlY3RpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgbmFtZSA9IHRoaXMubGwoKS52YWx1ZTtcbiAgdGhpcy5uZXh0KCk7XG4gIGlmKHR5cGVvZiB0aGlzW25hbWVdID09PSAnZnVuY3Rpb24nKXtcbiAgICByZXR1cm4gdGhpc1tuYW1lXSgpXG4gIH1lbHNle1xuICAgIHRoaXMuZXJyb3IoJ1VuZGVmaW5lZCBkaXJlY3RpdmVbJysgbmFtZSArJ10nKTtcbiAgfVxufVxuXG5cbi8vIHt7fX1cbm9wLmludGVycGxhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMubWF0Y2goJ0VYUFJfT1BFTicpO1xuICB2YXIgcmVzID0gdGhpcy5leHByZXNzaW9uKHRydWUpO1xuICB0aGlzLm1hdGNoKCdFTkQnKTtcbiAgcmV0dXJuIHJlcztcbn1cblxuLy8ge3t+fX1cbm9wLmluYyA9IG9wLmluY2x1ZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgY29udGVudCA9IHRoaXMuZXhwcmVzc2lvbigpO1xuICB0aGlzLm1hdGNoKCdFTkQnKTtcbiAgcmV0dXJuIG5vZGUudGVtcGxhdGUoY29udGVudCk7XG59XG5cbi8vIHt7I2lmfX1cbm9wW1wiaWZcIl0gPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgdGVzdCA9IHRoaXMuZXhwcmVzc2lvbigpO1xuICB2YXIgY29uc2VxdWVudCA9IFtdLCBhbHRlcm5hdGU9W107XG5cbiAgdmFyIGNvbnRhaW5lciA9IGNvbnNlcXVlbnQ7XG4gIHZhciBzdGF0ZW1lbnQgPSAhdGFnPyBcInN0YXRlbWVudFwiIDogXCJhdHRyc1wiO1xuXG4gIHRoaXMubWF0Y2goJ0VORCcpO1xuXG4gIHZhciBsbCwgY2xvc2U7XG4gIHdoaWxlKCAhIChjbG9zZSA9IHRoaXMuZWF0KCdDTE9TRScpKSApe1xuICAgIGxsID0gdGhpcy5sbCgpO1xuICAgIGlmKCBsbC50eXBlID09PSAnT1BFTicgKXtcbiAgICAgIHN3aXRjaCggbGwudmFsdWUgKXtcbiAgICAgICAgY2FzZSAnZWxzZSc6XG4gICAgICAgICAgY29udGFpbmVyID0gYWx0ZXJuYXRlO1xuICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgIHRoaXMubWF0Y2goICdFTkQnICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Vsc2VpZic6XG4gICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgYWx0ZXJuYXRlLnB1c2goIHRoaXNbXCJpZlwiXSh0YWcpICk7XG4gICAgICAgICAgcmV0dXJuIG5vZGVbJ2lmJ10oIHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSApO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnRhaW5lci5wdXNoKCB0aGlzW3N0YXRlbWVudF0odHJ1ZSkgKTtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGNvbnRhaW5lci5wdXNoKHRoaXNbc3RhdGVtZW50XSh0cnVlKSk7XG4gICAgfVxuICB9XG4gIC8vIGlmIHN0YXRlbWVudCBub3QgbWF0Y2hlZFxuICBpZihjbG9zZS52YWx1ZSAhPT0gXCJpZlwiKSB0aGlzLmVycm9yKCdVbm1hdGNoZWQgaWYgZGlyZWN0aXZlJylcbiAgcmV0dXJuIG5vZGVbXCJpZlwiXSh0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpO1xufVxuXG5cbi8vIEBtYXJrICAgbXVzdGFjaGUgc3ludGF4IGhhdmUgbmF0cnVyZSBkaXMsIGNhbm90IHdpdGggZXhwcmVzc2lvblxuLy8ge3sjbGlzdH19XG5vcC5saXN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gc2VxdWVuY2UgY2FuIGJlIGEgbGlzdCBvciBoYXNoXG4gIHZhciBzZXF1ZW5jZSA9IHRoaXMuZXhwcmVzc2lvbigpLCB2YXJpYWJsZSwgbGwsIHRyYWNrO1xuICB2YXIgY29uc2VxdWVudCA9IFtdLCBhbHRlcm5hdGU9W107XG4gIHZhciBjb250YWluZXIgPSBjb25zZXF1ZW50O1xuXG4gIHRoaXMubWF0Y2goJ0lERU5UJywgJ2FzJyk7XG5cbiAgdmFyaWFibGUgPSB0aGlzLm1hdGNoKCdJREVOVCcpLnZhbHVlO1xuXG4gIGlmKHRoaXMuZWF0KCdJREVOVCcsICdieScpKXtcbiAgICBpZih0aGlzLmVhdCgnSURFTlQnLHZhcmlhYmxlICsgJ19pbmRleCcpKXtcbiAgICAgIHRyYWNrID0gdHJ1ZTtcbiAgICB9ZWxzZXtcbiAgICAgIHRyYWNrID0gdGhpcy5leHByZXNzaW9uKCk7XG4gICAgICBpZih0cmFjay5jb25zdGFudCl7XG4gICAgICAgIC8vIHRydWUgaXMgbWVhbnMgY29uc3RhbnQsIHdlIGhhbmRsZSBpdCBqdXN0IGxpa2UgeHh4X2luZGV4LlxuICAgICAgICB0cmFjayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5tYXRjaCgnRU5EJyk7XG5cbiAgd2hpbGUoICEobGwgPSB0aGlzLmVhdCgnQ0xPU0UnKSkgKXtcbiAgICBpZih0aGlzLmVhdCgnT1BFTicsICdlbHNlJykpe1xuICAgICAgY29udGFpbmVyID0gIGFsdGVybmF0ZTtcbiAgICAgIHRoaXMubWF0Y2goJ0VORCcpO1xuICAgIH1lbHNle1xuICAgICAgY29udGFpbmVyLnB1c2godGhpcy5zdGF0ZW1lbnQoKSk7XG4gICAgfVxuICB9XG4gIFxuICBpZihsbC52YWx1ZSAhPT0gJ2xpc3QnKSB0aGlzLmVycm9yKCdleHBlY3QgJyArICdsaXN0IGdvdCAnICsgJy8nICsgbGwudmFsdWUgKyAnICcsIGxsLnBvcyApO1xuICByZXR1cm4gbm9kZS5saXN0KHNlcXVlbmNlLCB2YXJpYWJsZSwgY29uc2VxdWVudCwgYWx0ZXJuYXRlLCB0cmFjayk7XG59XG5cblxub3AuZXhwcmVzc2lvbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBleHByZXNzaW9uO1xuICBpZih0aGlzLmVhdCgnQCgnKSl7IC8vb25jZSBiaW5kXG4gICAgZXhwcmVzc2lvbiA9IHRoaXMuZXhwcigpO1xuICAgIGV4cHJlc3Npb24ub25jZSA9IHRydWU7XG4gICAgdGhpcy5tYXRjaCgnKScpXG4gIH1lbHNle1xuICAgIGV4cHJlc3Npb24gPSB0aGlzLmV4cHIoKTtcbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbjtcbn1cblxub3AuZXhwciA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuZGVwZW5kID0gW107XG5cbiAgdmFyIGJ1ZmZlciA9IHRoaXMuZmlsdGVyKClcblxuICB2YXIgYm9keSA9IGJ1ZmZlci5nZXQgfHwgYnVmZmVyO1xuICB2YXIgc2V0Ym9keSA9IGJ1ZmZlci5zZXQ7XG4gIHJldHVybiBub2RlLmV4cHJlc3Npb24oYm9keSwgc2V0Ym9keSwgIXRoaXMuZGVwZW5kLmxlbmd0aCk7XG59XG5cblxuLy8gZmlsdGVyXG4vLyBhc3NpZ24gKCd8JyBmaWx0ZXJuYW1lWyc6JyBhcmdzXSkgKiBcbm9wLmZpbHRlciA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5hc3NpZ24oKTtcbiAgdmFyIGxsID0gdGhpcy5lYXQoJ3wnKTtcbiAgdmFyIGJ1ZmZlciA9IFtdLCBzZXRCdWZmZXIsIHByZWZpeCxcbiAgICBhdHRyID0gXCJ0XCIsIFxuICAgIHNldCA9IGxlZnQuc2V0LCBnZXQsIFxuICAgIHRtcCA9IFwiXCI7XG5cbiAgaWYobGwpe1xuICAgIGlmKHNldCkgc2V0QnVmZmVyID0gW107XG5cbiAgICBwcmVmaXggPSBcIihmdW5jdGlvbihcIiArIGF0dHIgKyBcIil7XCI7XG5cbiAgICBkb3tcbiAgICAgIHRtcCA9IGF0dHIgKyBcIiA9IFwiICsgY3R4TmFtZSArIFwiLl9mXygnXCIgKyB0aGlzLm1hdGNoKCdJREVOVCcpLnZhbHVlKyBcIicgKS5nZXQuY2FsbCggXCIrXy5jdHhOYW1lICtcIixcIiArIGF0dHIgO1xuICAgICAgaWYodGhpcy5lYXQoJzonKSl7XG4gICAgICAgIHRtcCArPVwiLCBcIisgdGhpcy5hcmd1bWVudHMoXCJ8XCIpLmpvaW4oXCIsXCIpICsgXCIpO1wiXG4gICAgICB9ZWxzZXtcbiAgICAgICAgdG1wICs9ICcpOydcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXNoKHRtcCk7XG4gICAgICBzZXRCdWZmZXIgJiYgc2V0QnVmZmVyLnVuc2hpZnQoIHRtcC5yZXBsYWNlKFwiICkuZ2V0LmNhbGxcIiwgXCIgKS5zZXQuY2FsbFwiKSApO1xuXG4gICAgfXdoaWxlKGxsID0gdGhpcy5lYXQoJ3wnKSk7XG4gICAgYnVmZmVyLnB1c2goXCJyZXR1cm4gXCIgKyBhdHRyICk7XG4gICAgc2V0QnVmZmVyICYmIHNldEJ1ZmZlci5wdXNoKFwicmV0dXJuIFwiICsgYXR0cik7XG5cbiAgICBnZXQgPSAgcHJlZml4ICsgYnVmZmVyLmpvaW4oXCJcIikgKyBcIn0pKFwiK2xlZnQuZ2V0K1wiKVwiO1xuICAgIC8vIHdlIGNhbGwgYmFjayB0byB2YWx1ZS5cbiAgICBpZihzZXRCdWZmZXIpe1xuICAgICAgLy8gY2hhbmdlIF9zc19fKG5hbWUsIF9wXykgdG8gX3NfXyhuYW1lLCBmaWx0ZXJGbihfcF8pKTtcbiAgICAgIHNldCA9IHNldC5yZXBsYWNlKF8uc2V0TmFtZSwgXG4gICAgICAgIHByZWZpeCArIHNldEJ1ZmZlci5qb2luKFwiXCIpICsgXCJ9KShcIivjgIBfLnNldE5hbWXjgIArXCIpXCIgKTtcblxuICAgIH1cbiAgICAvLyB0aGUgc2V0IGZ1bmN0aW9uIGlzIGRlcGVuZCBvbiB0aGUgZmlsdGVyIGRlZmluaXRpb24uIGlmIGl0IGhhdmUgc2V0IG1ldGhvZCwgdGhlIHNldCB3aWxsIHdvcmtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoZ2V0LCBzZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0O1xufVxuXG4vLyBhc3NpZ25cbi8vIGxlZnQtaGFuZC1leHByID0gY29uZGl0aW9uXG5vcC5hc3NpZ24gPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMuY29uZGl0aW9uKCksIGxsO1xuICBpZihsbCA9IHRoaXMuZWF0KFsnPScsICcrPScsICctPScsICcqPScsICcvPScsICclPSddKSl7XG4gICAgaWYoIWxlZnQuc2V0KSB0aGlzLmVycm9yKCdpbnZhbGlkIGxlZnRoYW5kIGV4cHJlc3Npb24gaW4gYXNzaWdubWVudCBleHByZXNzaW9uJyk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KCBsZWZ0LnNldC5yZXBsYWNlKCBcIixcIiArIF8uc2V0TmFtZSwgXCIsXCIgKyB0aGlzLmNvbmRpdGlvbigpLmdldCApLnJlcGxhY2UoXCInPSdcIiwgXCInXCIrbGwudHlwZStcIidcIiksIGxlZnQuc2V0KTtcbiAgICAvLyByZXR1cm4gdGhpcy5nZXRzZXQoJygnICsgbGVmdC5nZXQgKyBsbC50eXBlICArIHRoaXMuY29uZGl0aW9uKCkuZ2V0ICsgJyknLCBsZWZ0LnNldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG5cbi8vIG9yXG4vLyBvciA/IGFzc2lnbiA6IGFzc2lnblxub3AuY29uZGl0aW9uID0gZnVuY3Rpb24oKXtcblxuICB2YXIgdGVzdCA9IHRoaXMub3IoKTtcbiAgaWYodGhpcy5lYXQoJz8nKSl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KFt0ZXN0LmdldCArIFwiP1wiLCBcbiAgICAgIHRoaXMuYXNzaWduKCkuZ2V0LCBcbiAgICAgIHRoaXMubWF0Y2goXCI6XCIpLnR5cGUsIFxuICAgICAgdGhpcy5hc3NpZ24oKS5nZXRdLmpvaW4oXCJcIikpO1xuICB9XG5cbiAgcmV0dXJuIHRlc3Q7XG59XG5cbi8vIGFuZFxuLy8gYW5kICYmIG9yXG5vcC5vciA9IGZ1bmN0aW9uKCl7XG5cbiAgdmFyIGxlZnQgPSB0aGlzLmFuZCgpO1xuXG4gIGlmKHRoaXMuZWF0KCd8fCcpKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyAnfHwnICsgdGhpcy5vcigpLmdldCk7XG4gIH1cblxuICByZXR1cm4gbGVmdDtcbn1cbi8vIGVxdWFsXG4vLyBlcXVhbCAmJiBhbmRcbm9wLmFuZCA9IGZ1bmN0aW9uKCl7XG5cbiAgdmFyIGxlZnQgPSB0aGlzLmVxdWFsKCk7XG5cbiAgaWYodGhpcy5lYXQoJyYmJykpe1xuICAgIHJldHVybiB0aGlzLmdldHNldChsZWZ0LmdldCArICcmJicgKyB0aGlzLmFuZCgpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG4vLyByZWxhdGlvblxuLy8gXG4vLyBlcXVhbCA9PSByZWxhdGlvblxuLy8gZXF1YWwgIT0gcmVsYXRpb25cbi8vIGVxdWFsID09PSByZWxhdGlvblxuLy8gZXF1YWwgIT09IHJlbGF0aW9uXG5vcC5lcXVhbCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5yZWxhdGlvbigpLCBsbDtcbiAgLy8gQHBlcmY7XG4gIGlmKCBsbCA9IHRoaXMuZWF0KFsnPT0nLCchPScsICc9PT0nLCAnIT09J10pKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyBsbC50eXBlICsgdGhpcy5lcXVhbCgpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnRcbn1cbi8vIHJlbGF0aW9uIDwgYWRkaXRpdmVcbi8vIHJlbGF0aW9uID4gYWRkaXRpdmVcbi8vIHJlbGF0aW9uIDw9IGFkZGl0aXZlXG4vLyByZWxhdGlvbiA+PSBhZGRpdGl2ZVxuLy8gcmVsYXRpb24gaW4gYWRkaXRpdmVcbm9wLnJlbGF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLmFkZGl0aXZlKCksIGxsO1xuICAvLyBAcGVyZlxuICBpZihsbCA9ICh0aGlzLmVhdChbJzwnLCAnPicsICc+PScsICc8PSddKSB8fCB0aGlzLmVhdCgnSURFTlQnLCAnaW4nKSApKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyBsbC52YWx1ZSArIHRoaXMucmVsYXRpb24oKS5nZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0XG59XG4vLyBhZGRpdGl2ZSA6XG4vLyBtdWx0aXZlXG4vLyBhZGRpdGl2ZSArIG11bHRpdmVcbi8vIGFkZGl0aXZlIC0gbXVsdGl2ZVxub3AuYWRkaXRpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMubXVsdGl2ZSgpICxsbDtcbiAgaWYobGw9IHRoaXMuZWF0KFsnKycsJy0nXSkgKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyBsbC52YWx1ZSArIHRoaXMuYWRkaXRpdmUoKS5nZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0XG59XG4vLyBtdWx0aXZlIDpcbi8vIHVuYXJ5XG4vLyBtdWx0aXZlICogdW5hcnlcbi8vIG11bHRpdmUgLyB1bmFyeVxuLy8gbXVsdGl2ZSAlIHVuYXJ5XG5vcC5tdWx0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLnJhbmdlKCkgLGxsO1xuICBpZiggbGwgPSB0aGlzLmVhdChbJyonLCAnLycgLCclJ10pICl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGxlZnQuZ2V0ICsgbGwudHlwZSArIHRoaXMubXVsdGl2ZSgpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG5cbm9wLnJhbmdlID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLnVuYXJ5KCksIGxsLCByaWdodDtcblxuICBpZihsbCA9IHRoaXMuZWF0KCcuLicpKXtcbiAgICByaWdodCA9IHRoaXMudW5hcnkoKTtcbiAgICB2YXIgYm9keSA9IFxuICAgICAgXCIoZnVuY3Rpb24oc3RhcnQsZW5kKXt2YXIgcmVzID0gW10sc3RlcD1lbmQ+c3RhcnQ/MTotMTsgZm9yKHZhciBpID0gc3RhcnQ7IGVuZD5zdGFydD9pIDw9IGVuZDogaT49ZW5kOyBpPWkrc3RlcCl7cmVzLnB1c2goaSk7IH0gcmV0dXJuIHJlcyB9KShcIitsZWZ0LmdldCtcIixcIityaWdodC5nZXQrXCIpXCJcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoYm9keSk7XG4gIH1cblxuICByZXR1cm4gbGVmdDtcbn1cblxuXG5cbi8vIGxlZnRoYW5kXG4vLyArIHVuYXJ5XG4vLyAtIHVuYXJ5XG4vLyB+IHVuYXJ5XG4vLyAhIHVuYXJ5XG5vcC51bmFyeSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsbDtcbiAgaWYobGwgPSB0aGlzLmVhdChbJysnLCctJywnficsICchJ10pKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoJygnICsgbGwudHlwZSArIHRoaXMudW5hcnkoKS5nZXQgKyAnKScpIDtcbiAgfWVsc2V7XG4gICAgcmV0dXJuIHRoaXMubWVtYmVyKClcbiAgfVxufVxuXG4vLyBjYWxsW2xlZnRoYW5kXSA6XG4vLyBtZW1iZXIgYXJnc1xuLy8gbWVtYmVyIFsgZXhwcmVzc2lvbiBdXG4vLyBtZW1iZXIgLiBpZGVudCAgXG5cbm9wLm1lbWJlciA9IGZ1bmN0aW9uKGJhc2UsIGxhc3QsIHBhdGhlcywgcHJldkJhc2Upe1xuICB2YXIgbGwsIHBhdGgsIGV4dFZhbHVlO1xuXG5cbiAgdmFyIG9ubHlTaW1wbGVBY2Nlc3NvciA9IGZhbHNlO1xuICBpZighYmFzZSl7IC8vZmlyc3RcbiAgICBwYXRoID0gdGhpcy5wcmltYXJ5KCk7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgcGF0aDtcbiAgICBpZih0eXBlID09PSAnc3RyaW5nJyl7IFxuICAgICAgcGF0aGVzID0gW107XG4gICAgICBwYXRoZXMucHVzaCggcGF0aCApO1xuICAgICAgbGFzdCA9IHBhdGg7XG4gICAgICBleHRWYWx1ZSA9IGV4dE5hbWUgKyBcIi5cIiArIHBhdGhcbiAgICAgIGJhc2UgPSBjdHhOYW1lICsgXCIuX3NnXygnXCIgKyBwYXRoICsgXCInLCBcIiArIHZhck5hbWUgKyBcIiwgXCIgKyBleHROYW1lICsgXCIpXCI7XG4gICAgICBvbmx5U2ltcGxlQWNjZXNzb3IgPSB0cnVlO1xuICAgIH1lbHNleyAvL1ByaW1hdGl2ZSBUeXBlXG4gICAgICBpZihwYXRoLmdldCA9PT0gJ3RoaXMnKXtcbiAgICAgICAgYmFzZSA9IGN0eE5hbWU7XG4gICAgICAgIHBhdGhlcyA9IFsndGhpcyddO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHBhdGhlcyA9IG51bGw7XG4gICAgICAgIGJhc2UgPSBwYXRoLmdldDtcbiAgICAgIH1cbiAgICB9XG4gIH1lbHNleyAvLyBub3QgZmlyc3QgZW50ZXJcbiAgICBpZih0eXBlb2YgbGFzdCA9PT0gJ3N0cmluZycgJiYgaXNQYXRoKCBsYXN0KSApeyAvLyBpcyB2YWxpZCBwYXRoXG4gICAgICBwYXRoZXMucHVzaChsYXN0KTtcbiAgICB9ZWxzZXtcbiAgICAgIGlmKHBhdGhlcyAmJiBwYXRoZXMubGVuZ3RoKSB0aGlzLmRlcGVuZC5wdXNoKHBhdGhlcyk7XG4gICAgICBwYXRoZXMgPSBudWxsO1xuICAgIH1cbiAgfVxuICBpZihsbCA9IHRoaXMuZWF0KFsnWycsICcuJywgJygnXSkpe1xuICAgIHN3aXRjaChsbC50eXBlKXtcbiAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgIC8vIG1lbWJlcihvYmplY3QsIHByb3BlcnR5LCBjb21wdXRlZClcbiAgICAgICAgdmFyIHRtcE5hbWUgPSB0aGlzLm1hdGNoKCdJREVOVCcpLnZhbHVlO1xuICAgICAgICBwcmV2QmFzZSA9IGJhc2U7XG4gICAgICAgIGlmKCB0aGlzLmxhKCkgIT09IFwiKFwiICl7IFxuICAgICAgICAgIGJhc2UgPSBjdHhOYW1lICsgXCIuX3NnXygnXCIgKyB0bXBOYW1lICsgXCInLCBcIiArIGJhc2UgKyBcIilcIjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgYmFzZSArPSBcIlsnXCIgKyB0bXBOYW1lICsgXCInXVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1lbWJlciggYmFzZSwgdG1wTmFtZSwgcGF0aGVzLCAgcHJldkJhc2UpO1xuICAgICAgY2FzZSAnWyc6XG4gICAgICAgICAgLy8gbWVtYmVyKG9iamVjdCwgcHJvcGVydHksIGNvbXB1dGVkKVxuICAgICAgICBwYXRoID0gdGhpcy5hc3NpZ24oKTtcbiAgICAgICAgcHJldkJhc2UgPSBiYXNlO1xuICAgICAgICBpZiggdGhpcy5sYSgpICE9PSBcIihcIiApeyBcbiAgICAgICAgLy8gbWVhbnMgZnVuY3Rpb24gY2FsbCwgd2UgbmVlZCB0aHJvdyB1bmRlZmluZWQgZXJyb3Igd2hlbiBjYWxsIGZ1bmN0aW9uXG4gICAgICAgIC8vIGFuZCBjb25maXJtIHRoYXQgdGhlIGZ1bmN0aW9uIGNhbGwgd29udCBsb3NlIGl0cyBjb250ZXh0XG4gICAgICAgICAgYmFzZSA9IGN0eE5hbWUgKyBcIi5fc2dfKFwiICsgcGF0aC5nZXQgKyBcIiwgXCIgKyBiYXNlICsgXCIpXCI7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGJhc2UgKz0gXCJbXCIgKyBwYXRoLmdldCArIFwiXVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0Y2goJ10nKVxuICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXIoYmFzZSwgcGF0aCwgcGF0aGVzLCBwcmV2QmFzZSk7XG4gICAgICBjYXNlICcoJzpcbiAgICAgICAgLy8gY2FsbChjYWxsZWUsIGFyZ3MpXG4gICAgICAgIHZhciBhcmdzID0gdGhpcy5hcmd1bWVudHMoKS5qb2luKCcsJyk7XG4gICAgICAgIGJhc2UgPSAgYmFzZStcIihcIiArIGFyZ3MgK1wiKVwiO1xuICAgICAgICB0aGlzLm1hdGNoKCcpJylcbiAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVyKGJhc2UsIG51bGwsIHBhdGhlcyk7XG4gICAgfVxuICB9XG4gIGlmKCBwYXRoZXMgJiYgcGF0aGVzLmxlbmd0aCApIHRoaXMuZGVwZW5kLnB1c2goIHBhdGhlcyApO1xuICB2YXIgcmVzID0gIHtnZXQ6IGJhc2V9O1xuICBpZihsYXN0KXtcbiAgICByZXMuc2V0ID0gY3R4TmFtZSArIFwiLl9zc18oXCIgKyBcbiAgICAgICAgKGxhc3QuZ2V0PyBsYXN0LmdldCA6IFwiJ1wiKyBsYXN0ICsgXCInXCIpICsgXG4gICAgICAgIFwiLFwiKyBfLnNldE5hbWUgKyBcIixcIisgXG4gICAgICAgIChwcmV2QmFzZT9wcmV2QmFzZTpfLnZhck5hbWUpICsgXG4gICAgICAgIFwiLCAnPScsIFwiKyAoIG9ubHlTaW1wbGVBY2Nlc3Nvcj8gMSA6IDAgKSArIFwiKVwiO1xuICBcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFxuICovXG5vcC5hcmd1bWVudHMgPSBmdW5jdGlvbihlbmQpe1xuICBlbmQgPSBlbmQgfHwgJyknXG4gIHZhciBhcmdzID0gW107XG4gIGRve1xuICAgIGlmKHRoaXMubGEoKSAhPT0gZW5kKXtcbiAgICAgIGFyZ3MucHVzaCh0aGlzLmFzc2lnbigpLmdldClcbiAgICB9XG4gIH13aGlsZSggdGhpcy5lYXQoJywnKSk7XG4gIHJldHVybiBhcmdzXG59XG5cblxuLy8gcHJpbWFyeSA6XG4vLyB0aGlzIFxuLy8gaWRlbnRcbi8vIGxpdGVyYWxcbi8vIGFycmF5XG4vLyBvYmplY3Rcbi8vICggZXhwcmVzc2lvbiApXG5cbm9wLnByaW1hcnkgPSBmdW5jdGlvbigpe1xuICB2YXIgbGwgPSB0aGlzLmxsKCk7XG4gIHN3aXRjaChsbC50eXBlKXtcbiAgICBjYXNlIFwie1wiOlxuICAgICAgcmV0dXJuIHRoaXMub2JqZWN0KCk7XG4gICAgY2FzZSBcIltcIjpcbiAgICAgIHJldHVybiB0aGlzLmFycmF5KCk7XG4gICAgY2FzZSBcIihcIjpcbiAgICAgIHJldHVybiB0aGlzLnBhcmVuKCk7XG4gICAgLy8gbGl0ZXJhbCBvciBpZGVudFxuICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIHJldHVybiB0aGlzLmdldHNldChcIidcIiArIGxsLnZhbHVlICsgXCInXCIpXG4gICAgY2FzZSAnTlVNQkVSJzpcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0c2V0KFwiXCIrbGwudmFsdWUpO1xuICAgIGNhc2UgXCJJREVOVFwiOlxuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICBpZihpc0tleVdvcmQobGwudmFsdWUpKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0c2V0KCBsbC52YWx1ZSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxsLnZhbHVlO1xuICAgIGRlZmF1bHQ6IFxuICAgICAgdGhpcy5lcnJvcignVW5leHBlY3RlZCBUb2tlbjogJyArIGxsLnR5cGUpO1xuICB9XG59XG5cbi8vIG9iamVjdFxuLy8gIHtwcm9wQXNzaWduIFssIHByb3BBc3NpZ25dICogWyxdfVxuXG4vLyBwcm9wQXNzaWduXG4vLyAgcHJvcCA6IGFzc2lnblxuXG4vLyBwcm9wXG4vLyAgU1RSSU5HXG4vLyAgSURFTlRcbi8vICBOVU1CRVJcblxub3Aub2JqZWN0ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNvZGUgPSBbdGhpcy5tYXRjaCgneycpLnR5cGVdO1xuXG4gIHZhciBsbCA9IHRoaXMuZWF0KCBbJ1NUUklORycsICdJREVOVCcsICdOVU1CRVInXSApO1xuICB3aGlsZShsbCl7XG4gICAgY29kZS5wdXNoKFwiJ1wiICsgbGwudmFsdWUgKyBcIidcIiArIHRoaXMubWF0Y2goJzonKS50eXBlKTtcbiAgICB2YXIgZ2V0ID0gdGhpcy5hc3NpZ24oKS5nZXQ7XG4gICAgY29kZS5wdXNoKGdldCk7XG4gICAgbGwgPSBudWxsO1xuICAgIGlmKHRoaXMuZWF0KFwiLFwiKSAmJiAobGwgPSB0aGlzLmVhdChbJ1NUUklORycsICdJREVOVCcsICdOVU1CRVInXSkpICkgY29kZS5wdXNoKFwiLFwiKTtcbiAgfVxuICBjb2RlLnB1c2godGhpcy5tYXRjaCgnfScpLnR5cGUpO1xuICByZXR1cm4ge2dldDogY29kZS5qb2luKFwiXCIpfVxufVxuXG4vLyBhcnJheVxuLy8gWyBhc3NpZ25bLGFzc2lnbl0qXVxub3AuYXJyYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgY29kZSA9IFt0aGlzLm1hdGNoKCdbJykudHlwZV0sIGl0ZW07XG4gIGlmKCB0aGlzLmVhdChcIl1cIikgKXtcblxuICAgICBjb2RlLnB1c2goXCJdXCIpO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlKGl0ZW0gPSB0aGlzLmFzc2lnbigpKXtcbiAgICAgIGNvZGUucHVzaChpdGVtLmdldCk7XG4gICAgICBpZih0aGlzLmVhdCgnLCcpKSBjb2RlLnB1c2goXCIsXCIpO1xuICAgICAgZWxzZSBicmVhaztcbiAgICB9XG4gICAgY29kZS5wdXNoKHRoaXMubWF0Y2goJ10nKS50eXBlKTtcbiAgfVxuICByZXR1cm4ge2dldDogY29kZS5qb2luKFwiXCIpfTtcbn1cblxuLy8gJygnIGV4cHJlc3Npb24gJyknXG5vcC5wYXJlbiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMubWF0Y2goJygnKTtcbiAgdmFyIHJlcyA9IHRoaXMuZmlsdGVyKClcbiAgcmVzLmdldCA9ICcoJyArIHJlcy5nZXQgKyAnKSc7XG4gIHRoaXMubWF0Y2goJyknKTtcbiAgcmV0dXJuIHJlcztcbn1cblxub3AuZ2V0c2V0ID0gZnVuY3Rpb24oZ2V0LCBzZXQpe1xuICByZXR1cm4ge1xuICAgIGdldDogZ2V0LFxuICAgIHNldDogc2V0XG4gIH1cbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVsZW1lbnQ6IGZ1bmN0aW9uKG5hbWUsIGF0dHJzLCBjaGlsZHJlbil7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdlbGVtZW50JyxcbiAgICAgIHRhZzogbmFtZSxcbiAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgIH1cbiAgfSxcbiAgYXR0cmlidXRlOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgbWRmKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2F0dHJpYnV0ZScsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgbWRmOiBtZGZcbiAgICB9XG4gIH0sXG4gIFwiaWZcIjogZnVuY3Rpb24odGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2lmJyxcbiAgICAgIHRlc3Q6IHRlc3QsXG4gICAgICBjb25zZXF1ZW50OiBjb25zZXF1ZW50LFxuICAgICAgYWx0ZXJuYXRlOiBhbHRlcm5hdGVcbiAgICB9XG4gIH0sXG4gIGxpc3Q6IGZ1bmN0aW9uKHNlcXVlbmNlLCB2YXJpYWJsZSwgYm9keSwgYWx0ZXJuYXRlLCB0cmFjayl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdsaXN0JyxcbiAgICAgIHNlcXVlbmNlOiBzZXF1ZW5jZSxcbiAgICAgIGFsdGVybmF0ZTogYWx0ZXJuYXRlLFxuICAgICAgdmFyaWFibGU6IHZhcmlhYmxlLFxuICAgICAgYm9keTogYm9keSxcbiAgICAgIHRyYWNrOiB0cmFja1xuICAgIH1cbiAgfSxcbiAgZXhwcmVzc2lvbjogZnVuY3Rpb24oIGJvZHksIHNldGJvZHksIGNvbnN0YW50ICl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiZXhwcmVzc2lvblwiLFxuICAgICAgYm9keTogYm9keSxcbiAgICAgIGNvbnN0YW50OiBjb25zdGFudCB8fCBmYWxzZSxcbiAgICAgIHNldGJvZHk6IHNldGJvZHkgfHwgZmFsc2VcbiAgICB9XG4gIH0sXG4gIHRleHQ6IGZ1bmN0aW9uKHRleHQpe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgIHRleHQ6IHRleHRcbiAgICB9XG4gIH0sXG4gIHRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICd0ZW1wbGF0ZScsXG4gICAgICBjb250ZW50OiB0ZW1wbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xucmVxdWlyZSgnLi9oZWxwZXIvc2hpbS5qcycpKCk7XG52YXIgXyAgPSBtb2R1bGUuZXhwb3J0cztcbnZhciBlbnRpdGllcyA9IHJlcXVpcmUoJy4vaGVscGVyL2VudGl0aWVzLmpzJyk7XG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBvMnN0ciA9ICh7fSkudG9TdHJpbmc7XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0ndW5kZWZpbmVkJz8gd2luZG93OiBnbG9iYWw7XG5cblxuXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXy51aWQgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIF91aWQ9MDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF91aWQrKztcbiAgfVxufSkoKTtcblxuXy5leHRlbmQgPSBmdW5jdGlvbiggbzEsIG8yLCBvdmVycmlkZSApe1xuICAvLyBpZihfLnR5cGVPZihvdmVycmlkZSkgPT09ICdhcnJheScpe1xuICAvLyAgZm9yKHZhciBpID0gMCwgbGVuID0gb3ZlcnJpZGUubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgLy8gICB2YXIga2V5ID0gb3ZlcnJpZGVbaV07XG4gIC8vICAgbzFba2V5XSA9IG8yW2tleV07XG4gIC8vICB9IFxuICAvLyB9ZWxzZXtcbiAgZm9yKHZhciBpIGluIG8yKXtcbiAgICBpZiggdHlwZW9mIG8xW2ldID09PSBcInVuZGVmaW5lZFwiIHx8IG92ZXJyaWRlID09PSB0cnVlICl7XG4gICAgICBvMVtpXSA9IG8yW2ldXG4gICAgfVxuICB9XG4gIC8vIH1cbiAgcmV0dXJuIG8xO1xufVxuXG5fLmtleXMgPSBmdW5jdGlvbihvYmope1xuICBpZihPYmplY3Qua2V5cykgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yKHZhciBpIGluIG9iaikgaWYob2JqLmhhc093blByb3BlcnR5KGkpKXtcbiAgICByZXMucHVzaChpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5fLnZhck5hbWUgPSAnZCc7XG5fLnNldE5hbWUgPSAncF8nO1xuXy5jdHhOYW1lID0gJ2MnO1xuXy5leHROYW1lID0gJ2UnO1xuXG5fLnJXb3JkID0gL15bXFwkXFx3XSskLztcbl8uclNpbXBsZUFjY2Vzc29yID0gL15bXFwkXFx3XSsoXFwuW1xcJFxcd10rKSokLztcblxuXy5uZXh0VGljayA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbic/IFxuICBzZXRJbW1lZGlhdGUuYmluZCh3aW4pIDogXG4gIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgMCkgXG4gIH1cblxuXG5cbl8ucHJlZml4ID0gXCJ2YXIgXCIgKyBfLnZhck5hbWUgKyBcIj1cIiArIF8uY3R4TmFtZSArIFwiLmRhdGE7XCIgKyAgXy5leHROYW1lICArIFwiPVwiICsgXy5leHROYW1lICsgXCJ8fCcnO1wiO1xuXG5cbl8uc2xpY2UgPSBmdW5jdGlvbihvYmosIHN0YXJ0LCBlbmQpe1xuICB2YXIgcmVzID0gW107XG4gIGZvcih2YXIgaSA9IHN0YXJ0IHx8IDAsIGxlbiA9IGVuZCB8fCBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIHZhciBpdGVtID0gb2JqW2ldO1xuICAgIHJlcy5wdXNoKGl0ZW0pXG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuXy50eXBlT2YgPSBmdW5jdGlvbiAobykge1xuICByZXR1cm4gbyA9PSBudWxsID8gU3RyaW5nKG8pIDpvMnN0ci5jYWxsKG8pLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5cbl8ubWFrZVByZWRpY2F0ZSA9IGZ1bmN0aW9uIG1ha2VQcmVkaWNhdGUod29yZHMsIHByZWZpeCkge1xuICAgIGlmICh0eXBlb2Ygd29yZHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgd29yZHMgPSB3b3Jkcy5zcGxpdChcIiBcIik7XG4gICAgfVxuICAgIHZhciBmID0gXCJcIixcbiAgICBjYXRzID0gW107XG4gICAgb3V0OiBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2F0cy5sZW5ndGg7ICsrail7XG4gICAgICAgICAgaWYgKGNhdHNbal1bMF0ubGVuZ3RoID09PSB3b3Jkc1tpXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2F0c1tqXS5wdXNoKHdvcmRzW2ldKTtcbiAgICAgICAgICAgICAgY29udGludWUgb3V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRzLnB1c2goW3dvcmRzW2ldXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmVUbyhhcnIpIHtcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDEpIHJldHVybiBmICs9IFwicmV0dXJuIHN0ciA9PT0gJ1wiICsgYXJyWzBdICsgXCInO1wiO1xuICAgICAgICBmICs9IFwic3dpdGNoKHN0cil7XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgZiArPSBcImNhc2UgJ1wiICsgYXJyW2ldICsgXCInOlwiO1xuICAgICAgICB9XG4gICAgICAgIGYgKz0gXCJyZXR1cm4gdHJ1ZX1yZXR1cm4gZmFsc2U7XCI7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGVyZSBhcmUgbW9yZSB0aGFuIHRocmVlIGxlbmd0aCBjYXRlZ29yaWVzLCBhbiBvdXRlclxuICAgIC8vIHN3aXRjaCBmaXJzdCBkaXNwYXRjaGVzIG9uIHRoZSBsZW5ndGhzLCB0byBzYXZlIG9uIGNvbXBhcmlzb25zLlxuICAgIGlmIChjYXRzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgY2F0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgZiArPSBcInN3aXRjaChzdHIubGVuZ3RoKXtcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2F0ID0gY2F0c1tpXTtcbiAgICAgICAgICAgIGYgKz0gXCJjYXNlIFwiICsgY2F0WzBdLmxlbmd0aCArIFwiOlwiO1xuICAgICAgICAgICAgY29tcGFyZVRvKGNhdCk7XG4gICAgICAgIH1cbiAgICAgICAgZiArPSBcIn1cIjtcblxuICAgICAgICAvLyBPdGhlcndpc2UsIHNpbXBseSBnZW5lcmF0ZSBhIGZsYXQgYHN3aXRjaGAgc3RhdGVtZW50LlxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBhcmVUbyh3b3Jkcyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJzdHJcIiwgZik7XG59XG5cblxuXy50cmFja0Vycm9yUG9zID0gKGZ1bmN0aW9uICgpe1xuICAvLyBsaW5lYnJlYWtcbiAgdmFyIGxiID0gL1xcclxcbnxbXFxuXFxyXFx1MjAyOFxcdTIwMjldL2c7XG4gIHZhciBtaW5SYW5nZSA9IDIwLCBtYXhSYW5nZSA9IDIwO1xuICBmdW5jdGlvbiBmaW5kTGluZShsaW5lcywgcG9zKXtcbiAgICB2YXIgdG1wTGVuID0gMDtcbiAgICBmb3IodmFyIGkgPSAwLGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHZhciBsaW5lTGVuID0gKGxpbmVzW2ldIHx8IFwiXCIpLmxlbmd0aDtcblxuICAgICAgaWYodG1wTGVuICsgbGluZUxlbiA+IHBvcykge1xuICAgICAgICByZXR1cm4ge251bTogaSwgbGluZTogbGluZXNbaV0sIHN0YXJ0OiBwb3MgLSBpIC0gdG1wTGVuICwgcHJldjpsaW5lc1tpLTFdLCBuZXh0OiBsaW5lc1tpKzFdIH07XG4gICAgICB9XG4gICAgICAvLyAxIGlzIGZvciB0aGUgbGluZWJyZWFrXG4gICAgICB0bXBMZW4gPSB0bXBMZW4gKyBsaW5lTGVuIDtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZm9ybWF0TGluZShzdHIsICBzdGFydCwgbnVtLCB0YXJnZXQpe1xuICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuICAgIHZhciBtaW4gPSBzdGFydCAtIG1pblJhbmdlO1xuICAgIGlmKG1pbiA8IDApIG1pbiA9IDA7XG4gICAgdmFyIG1heCA9IHN0YXJ0ICsgbWF4UmFuZ2U7XG4gICAgaWYobWF4ID4gbGVuKSBtYXggPSBsZW47XG5cbiAgICB2YXIgcmVtYWluID0gc3RyLnNsaWNlKG1pbiwgbWF4KTtcbiAgICB2YXIgcHJlZml4ID0gXCJbXCIgKyhudW0rMSkgKyBcIl0gXCIgKyAobWluID4gMD8gXCIuLlwiIDogXCJcIilcbiAgICB2YXIgcG9zdGZpeCA9IG1heCA8IGxlbiA/IFwiLi5cIjogXCJcIjtcbiAgICB2YXIgcmVzID0gcHJlZml4ICsgcmVtYWluICsgcG9zdGZpeDtcbiAgICBpZih0YXJnZXQpIHJlcyArPSBcIlxcblwiICsgbmV3IEFycmF5KHN0YXJ0LW1pbiArIHByZWZpeC5sZW5ndGggKyAxKS5qb2luKFwiIFwiKSArIFwiXl5eXCI7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQsIHBvcyl7XG4gICAgaWYocG9zID4gaW5wdXQubGVuZ3RoLTEpIHBvcyA9IGlucHV0Lmxlbmd0aC0xO1xuICAgIGxiLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIGxpbmVzID0gaW5wdXQuc3BsaXQobGIpO1xuICAgIHZhciBsaW5lID0gZmluZExpbmUobGluZXMscG9zKTtcbiAgICB2YXIgc3RhcnQgPSBsaW5lLnN0YXJ0LCBudW0gPSBsaW5lLm51bTtcblxuICAgIHJldHVybiAobGluZS5wcmV2PyBmb3JtYXRMaW5lKGxpbmUucHJldiwgc3RhcnQsIG51bS0xICkgKyAnXFxuJzogJycgKSArIFxuICAgICAgZm9ybWF0TGluZShsaW5lLmxpbmUsIHN0YXJ0LCBudW0sIHRydWUpICsgJ1xcbicgKyBcbiAgICAgIChsaW5lLm5leHQ/IGZvcm1hdExpbmUobGluZS5uZXh0LCBzdGFydCwgbnVtKzEgKSArICdcXG4nOiAnJyApO1xuXG4gIH1cbn0pKCk7XG5cblxudmFyIGlnbm9yZWRSZWYgPSAvXFwoKFxcP1xcIXxcXD9cXDp8XFw/XFw9KS9nO1xuXy5maW5kU3ViQ2FwdHVyZSA9IGZ1bmN0aW9uIChyZWdTdHIpIHtcbiAgdmFyIGxlZnQgPSAwLFxuICAgIHJpZ2h0ID0gMCxcbiAgICBsZW4gPSByZWdTdHIubGVuZ3RoLFxuICAgIGlnbm9yZWQgPSByZWdTdHIubWF0Y2goaWdub3JlZFJlZik7IC8vIGlnbm9yZWQgdW5jYXB0dXJlXG4gIGlmKGlnbm9yZWQpIGlnbm9yZWQgPSBpZ25vcmVkLmxlbmd0aFxuICBlbHNlIGlnbm9yZWQgPSAwO1xuICBmb3IgKDsgbGVuLS07KSB7XG4gICAgdmFyIGxldHRlciA9IHJlZ1N0ci5jaGFyQXQobGVuKTtcbiAgICBpZiAobGVuID09PSAwIHx8IHJlZ1N0ci5jaGFyQXQobGVuIC0gMSkgIT09IFwiXFxcXFwiICkgeyBcbiAgICAgIGlmIChsZXR0ZXIgPT09IFwiKFwiKSBsZWZ0Kys7XG4gICAgICBpZiAobGV0dGVyID09PSBcIilcIikgcmlnaHQrKztcbiAgICB9XG4gIH1cbiAgaWYgKGxlZnQgIT09IHJpZ2h0KSB0aHJvdyBcIlJlZ0V4cDogXCIrIHJlZ1N0ciArIFwiJ3MgYnJhY2tldCBpcyBub3QgbWFyY2hlZFwiO1xuICBlbHNlIHJldHVybiBsZWZ0IC0gaWdub3JlZDtcbn07XG5cblxuXy5lc2NhcGVSZWdFeHAgPSBmdW5jdGlvbiggc3RyKXsvLyBDcmVkaXQ6IFhSZWdFeHAgMC42LjEgKGMpIDIwMDctMjAwOCBTdGV2ZW4gTGV2aXRoYW4gPGh0dHA6Ly9zdGV2ZW5sZXZpdGhhbi5jb20vcmVnZXgveHJlZ2V4cC8+IE1JVCBMaWNlbnNlXG4gIHJldHVybiBzdHIucmVwbGFjZSgvWy1bXFxde30oKSorPy5cXFxcXiR8LCNcXHNdL2csIGZ1bmN0aW9uKG1hdGNoKXtcbiAgICByZXR1cm4gJ1xcXFwnICsgbWF0Y2g7XG4gIH0pO1xufTtcblxuXG52YXIgckVudGl0eSA9IG5ldyBSZWdFeHAoXCImKFwiICsgXy5rZXlzKGVudGl0aWVzKS5qb2luKCd8JykgKyAnKTsnLCAnZ2knKTtcblxuXy5jb252ZXJ0RW50aXR5ID0gZnVuY3Rpb24oY2hyKXtcblxuICByZXR1cm4gKFwiXCIgKyBjaHIpLnJlcGxhY2UockVudGl0eSwgZnVuY3Rpb24oYWxsLCBjYXB0dXJlKXtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlbnRpdGllc1tjYXB0dXJlXSlcbiAgfSk7XG5cbn1cblxuXG4vLyBzaW1wbGUgZ2V0IGFjY2Vzc29yXG5cbl8uY3JlYXRlT2JqZWN0ID0gZnVuY3Rpb24obywgcHJvcHMpe1xuICAgIGZ1bmN0aW9uIEZvbygpIHt9XG4gICAgRm9vLnByb3RvdHlwZSA9IG87XG4gICAgdmFyIHJlcyA9IG5ldyBGb287XG4gICAgaWYocHJvcHMpIF8uZXh0ZW5kKHJlcywgcHJvcHMpO1xuICAgIHJldHVybiByZXM7XG59XG5cbl8uY3JlYXRlUHJvdG8gPSBmdW5jdGlvbihmbiwgbyl7XG4gICAgZnVuY3Rpb24gRm9vKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZm47fVxuICAgIEZvby5wcm90b3R5cGUgPSBvO1xuICAgIHJldHVybiAoZm4ucHJvdG90eXBlID0gbmV3IEZvbygpKTtcbn1cblxuXG5cbi8qKlxuY2xvbmVcbiovXG5fLmNsb25lID0gZnVuY3Rpb24gY2xvbmUob2JqKXtcbiAgICB2YXIgdHlwZSA9IF8udHlwZU9mKG9iaik7XG4gICAgaWYodHlwZSA9PT0gJ2FycmF5Jyl7XG4gICAgICB2YXIgY2xvbmVkID0gW107XG4gICAgICBmb3IodmFyIGk9MCxsZW4gPSBvYmoubGVuZ3RoOyBpPCBsZW47aSsrKXtcbiAgICAgICAgY2xvbmVkW2ldID0gb2JqW2ldXG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cbiAgICBpZih0eXBlID09PSAnb2JqZWN0Jyl7XG4gICAgICB2YXIgY2xvbmVkID0ge307XG4gICAgICBmb3IodmFyIGkgaW4gb2JqKSBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgICBjbG9uZWRbaV0gPSBvYmpbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbl8uZXF1YWxzID0gZnVuY3Rpb24obm93LCBvbGQpe1xuICB2YXIgdHlwZSA9IHR5cGVvZiBub3c7XG4gIGlmKHR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvbGQgPT09ICdudW1iZXInJiYgaXNOYU4obm93KSAmJiBpc05hTihvbGQpKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gbm93ID09PSBvbGQ7XG59XG5cbnZhciBkYXNoID0gLy0oW2Etel0pL2c7XG5fLmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZShkYXNoLCBmdW5jdGlvbihhbGwsIGNhcHR1cmUpe1xuICAgIHJldHVybiBjYXB0dXJlLnRvVXBwZXJDYXNlKCk7XG4gIH0pXG59XG5cblxuXG5fLnRocm90dGxlID0gZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCl7XG4gIHZhciB3YWl0ID0gd2FpdCB8fCAxMDA7XG4gIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgdmFyIHByZXZpb3VzID0gMDtcbiAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcHJldmlvdXMgPSArbmV3IERhdGU7XG4gICAgdGltZW91dCA9IG51bGw7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbm93ID0gKyBuZXcgRGF0ZTtcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgY29udGV4dCA9IHRoaXM7XG4gICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG4vLyBob2dhbiBlc2NhcGVcbi8vID09PT09PT09PT09PT09XG5fLmVzY2FwZSA9IChmdW5jdGlvbigpe1xuICB2YXIgckFtcCA9IC8mL2csXG4gICAgICByTHQgPSAvPC9nLFxuICAgICAgckd0ID0gLz4vZyxcbiAgICAgIHJBcG9zID0gL1xcJy9nLFxuICAgICAgclF1b3QgPSAvXFxcIi9nLFxuICAgICAgaENoYXJzID0gL1smPD5cXFwiXFwnXS87XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBoQ2hhcnMudGVzdChzdHIpID9cbiAgICAgIHN0clxuICAgICAgICAucmVwbGFjZShyQW1wLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZShyTHQsICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2Uockd0LCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKHJBcG9zLCAnJiMzOTsnKVxuICAgICAgICAucmVwbGFjZShyUXVvdCwgJyZxdW90OycpIDpcbiAgICAgIHN0cjtcbiAgfVxufSkoKTtcblxuXy5jYWNoZSA9IGZ1bmN0aW9uKG1heCl7XG4gIG1heCA9IG1heCB8fCAxMDAwO1xuICB2YXIga2V5cyA9IFtdLFxuICAgICAgY2FjaGUgPSB7fTtcbiAgcmV0dXJuIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgIGNhY2hlW2tleXMuc2hpZnQoKV0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICAvLyBcbiAgICAgIGlmKGNhY2hlW2tleV0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgICAgY2FjaGVba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNhY2hlO1xuICAgICAgcmV0dXJuIGNhY2hlW2tleV07XG4gICAgfSxcbiAgICBtYXg6IG1heCxcbiAgICBsZW46ZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBrZXlzLmxlbmd0aDtcbiAgICB9XG4gIH07XG59XG5cbi8vIC8vIHNldHVwIHRoZSByYXcgRXhwcmVzc2lvblxuLy8gXy50b3VjaEV4cHJlc3Npb24gPSBmdW5jdGlvbihleHByKXtcbi8vICAgaWYoZXhwci50eXBlID09PSAnZXhwcmVzc2lvbicpe1xuLy8gICB9XG4vLyAgIHJldHVybiBleHByO1xuLy8gfVxuXG5cbi8vIGhhbmRsZSB0aGUgc2FtZSBsb2dpYyBvbiBjb21wb25lbnQncyBgb24tKmAgYW5kIGVsZW1lbnQncyBgb24tKmBcbi8vIHJldHVybiB0aGUgZmlyZSBvYmplY3Rcbl8uaGFuZGxlRXZlbnQgPSBmdW5jdGlvbih2YWx1ZSwgdHlwZSApe1xuICB2YXIgc2VsZiA9IHRoaXMsIGV2YWx1YXRlO1xuICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicpeyAvLyBpZiBpcyBleHByZXNzaW9uLCBnbyBldmFsdWF0ZWQgd2F5XG4gICAgZXZhbHVhdGUgPSB2YWx1ZS5nZXQ7XG4gIH1cbiAgaWYoZXZhbHVhdGUpe1xuICAgIHJldHVybiBmdW5jdGlvbiBmaXJlKG9iail7XG4gICAgICBzZWxmLmRhdGEuJGV2ZW50ID0gb2JqO1xuICAgICAgdmFyIHJlcyA9IGV2YWx1YXRlKHNlbGYpO1xuICAgICAgaWYocmVzID09PSBmYWxzZSAmJiBvYmogJiYgb2JqLnByZXZlbnREZWZhdWx0KSBvYmoucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNlbGYuZGF0YS4kZXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH1lbHNle1xuICAgIHJldHVybiBmdW5jdGlvbiBmaXJlKCl7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSAgICAgIFxuICAgICAgYXJncy51bnNoaWZ0KHZhbHVlKTtcbiAgICAgIHNlbGYuJGVtaXQuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gb25seSBjYWxsIG9uY2Vcbl8ub25jZSA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHRpbWUgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBpZiggdGltZSsrID09PSAwKSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbl8uZml4T2JqU3RyID0gZnVuY3Rpb24oc3RyKXtcbiAgaWYoc3RyLnRyaW0oKS5pbmRleE9mKCd7JykgIT09IDApe1xuICAgIHJldHVybiAneycgKyBzdHIgKyAnfSc7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5cbl8ubG9nID0gZnVuY3Rpb24obXNnLCB0eXBlKXtcbiAgaWYodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpICBjb25zb2xlW3R5cGUgfHwgXCJsb2dcIl0obXNnKTtcbn1cblxuXG5cblxuLy9odHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9zaW5nbGUtcGFnZS5odG1sI3ZvaWQtZWxlbWVudHNcbl8uaXNWb2lkVGFnID0gXy5tYWtlUHJlZGljYXRlKFwiYXJlYSBiYXNlIGJyIGNvbCBlbWJlZCBociBpbWcgaW5wdXQga2V5Z2VuIGxpbmsgbWVudWl0ZW0gbWV0YSBwYXJhbSBzb3VyY2UgdHJhY2sgd2JyIHItY29udGVudFwiKTtcbl8uaXNCb29sZWFuQXR0ciA9IF8ubWFrZVByZWRpY2F0ZSgnc2VsZWN0ZWQgY2hlY2tlZCBkaXNhYmxlZCByZWFkT25seSByZXF1aXJlZCBvcGVuIGF1dG9mb2N1cyBjb250cm9scyBhdXRvcGxheSBjb21wYWN0IGxvb3AgZGVmZXIgbXVsdGlwbGUnKTtcblxuXy5pc0ZhbHNlIC0gZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2V9XG5fLmlzVHJ1ZSAtIGZ1bmN0aW9uKCl7cmV0dXJuIHRydWV9XG5cbl8uaXNFeHByID0gZnVuY3Rpb24oZXhwcil7XG4gIHJldHVybiBleHByICYmIGV4cHIudHlwZSA9PT0gJ2V4cHJlc3Npb24nO1xufVxuLy8gQFRPRE86IG1ha2UgaXQgbW9yZSBzdHJpY3Rcbl8uaXNHcm91cCA9IGZ1bmN0aW9uKGdyb3VwKXtcbiAgcmV0dXJuIGdyb3VwLmluamVjdCB8fCBncm91cC4kaW5qZWN0O1xufVxuXG5fLmdldENvbXBpbGVGbiA9IGZ1bmN0aW9uKHNvdXJjZSwgY3R4LCBvcHRpb25zKXtcbiAgcmV0dXJuIGN0eC4kY29tcGlsZS5iaW5kKGN0eCxzb3VyY2UsIG9wdGlvbnMpXG59XG5cblxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl5WldkMWJHRnlhbk12YzNKakwzVjBhV3d1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2ljbVZ4ZFdseVpTZ25MaTlvWld4d1pYSXZjMmhwYlM1cWN5Y3BLQ2s3WEc1MllYSWdYeUFnUFNCdGIyUjFiR1V1Wlhod2IzSjBjenRjYm5aaGNpQmxiblJwZEdsbGN5QTlJSEpsY1hWcGNtVW9KeTR2YUdWc2NHVnlMMlZ1ZEdsMGFXVnpMbXB6SnlrN1hHNTJZWElnYzJ4cFkyVWdQU0JiWFM1emJHbGpaVHRjYm5aaGNpQnZNbk4wY2lBOUlDaDdmU2t1ZEc5VGRISnBibWM3WEc1MllYSWdkMmx1SUQwZ2RIbHdaVzltSUhkcGJtUnZkeUFoUFQwbmRXNWtaV1pwYm1Wa0p6OGdkMmx1Wkc5M09pQm5iRzlpWVd3N1hHNWNibHh1WHk1dWIyOXdJRDBnWm5WdVkzUnBiMjRvS1h0OU8xeHVYeTUxYVdRZ1BTQW9ablZ1WTNScGIyNG9LWHRjYmlBZ2RtRnlJRjkxYVdROU1EdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVLQ2w3WEc0Z0lDQWdjbVYwZFhKdUlGOTFhV1FyS3p0Y2JpQWdmVnh1ZlNrb0tUdGNibHh1WHk1bGVIUmxibVFnUFNCbWRXNWpkR2x2YmlnZ2J6RXNJRzh5TENCdmRtVnljbWxrWlNBcGUxeHVJQ0F2THlCcFppaGZMblI1Y0dWUFppaHZkbVZ5Y21sa1pTa2dQVDA5SUNkaGNuSmhlU2NwZTF4dUlDQXZMeUFnWm05eUtIWmhjaUJwSUQwZ01Dd2diR1Z1SUQwZ2IzWmxjbkpwWkdVdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lCcEt5c2dLWHRjYmlBZ0x5OGdJQ0IyWVhJZ2EyVjVJRDBnYjNabGNuSnBaR1ZiYVYwN1hHNGdJQzh2SUNBZ2J6RmJhMlY1WFNBOUlHOHlXMnRsZVYwN1hHNGdJQzh2SUNCOUlGeHVJQ0F2THlCOVpXeHpaWHRjYmlBZ1ptOXlLSFpoY2lCcElHbHVJRzh5S1h0Y2JpQWdJQ0JwWmlnZ2RIbHdaVzltSUc4eFcybGRJRDA5UFNCY0luVnVaR1ZtYVc1bFpGd2lJSHg4SUc5MlpYSnlhV1JsSUQwOVBTQjBjblZsSUNsN1hHNGdJQ0FnSUNCdk1WdHBYU0E5SUc4eVcybGRYRzRnSUNBZ2ZWeHVJQ0I5WEc0Z0lDOHZJSDFjYmlBZ2NtVjBkWEp1SUc4eE8xeHVmVnh1WEc1ZkxtdGxlWE1nUFNCbWRXNWpkR2x2Ymlodlltb3BlMXh1SUNCcFppaFBZbXBsWTNRdWEyVjVjeWtnY21WMGRYSnVJRTlpYW1WamRDNXJaWGx6S0c5aWFpazdYRzRnSUhaaGNpQnlaWE1nUFNCYlhUdGNiaUFnWm05eUtIWmhjaUJwSUdsdUlHOWlhaWtnYVdZb2IySnFMbWhoYzA5M2JsQnliM0JsY25SNUtHa3BLWHRjYmlBZ0lDQnlaWE11Y0hWemFDaHBLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVZ6TzF4dWZWeHVYRzVmTG5aaGNrNWhiV1VnUFNBblpDYzdYRzVmTG5ObGRFNWhiV1VnUFNBbmNGOG5PMXh1WHk1amRIaE9ZVzFsSUQwZ0oyTW5PMXh1WHk1bGVIUk9ZVzFsSUQwZ0oyVW5PMXh1WEc1ZkxuSlhiM0prSUQwZ0wxNWJYRndrWEZ4M1hTc2tMenRjYmw4dWNsTnBiWEJzWlVGalkyVnpjMjl5SUQwZ0wxNWJYRndrWEZ4M1hTc29YRnd1VzF4Y0pGeGNkMTByS1Nva0x6dGNibHh1WHk1dVpYaDBWR2xqYXlBOUlIUjVjR1Z2WmlCelpYUkpiVzFsWkdsaGRHVWdQVDA5SUNkbWRXNWpkR2x2YmljL0lGeHVJQ0J6WlhSSmJXMWxaR2xoZEdVdVltbHVaQ2gzYVc0cElEb2dYRzRnSUdaMWJtTjBhVzl1S0dOaGJHeGlZV05yS1NCN1hHNGdJQ0FnYzJWMFZHbHRaVzkxZENoallXeHNZbUZqYXl3Z01Da2dYRzRnSUgxY2JseHVYRzVjYmw4dWNISmxabWw0SUQwZ1hDSjJZWElnWENJZ0t5QmZMblpoY2s1aGJXVWdLeUJjSWoxY0lpQXJJRjh1WTNSNFRtRnRaU0FySUZ3aUxtUmhkR0U3WENJZ0t5QWdYeTVsZUhST1lXMWxJQ0FySUZ3aVBWd2lJQ3NnWHk1bGVIUk9ZVzFsSUNzZ1hDSjhmQ2NuTzF3aU8xeHVYRzVjYmw4dWMyeHBZMlVnUFNCbWRXNWpkR2x2Ymlodlltb3NJSE4wWVhKMExDQmxibVFwZTF4dUlDQjJZWElnY21WeklEMGdXMTA3WEc0Z0lHWnZjaWgyWVhJZ2FTQTlJSE4wWVhKMElIeDhJREFzSUd4bGJpQTlJR1Z1WkNCOGZDQnZZbW91YkdWdVozUm9PeUJwSUR3Z2JHVnVPeUJwS3lzcGUxeHVJQ0FnSUhaaGNpQnBkR1Z0SUQwZ2IySnFXMmxkTzF4dUlDQWdJSEpsY3k1d2RYTm9LR2wwWlcwcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGN6dGNibjFjYmx4dVh5NTBlWEJsVDJZZ1BTQm1kVzVqZEdsdmJpQW9ieWtnZTF4dUlDQnlaWFIxY200Z2J5QTlQU0J1ZFd4c0lEOGdVM1J5YVc1bktHOHBJRHB2TW5OMGNpNWpZV3hzS0c4cExuTnNhV05sS0Rnc0lDMHhLUzUwYjB4dmQyVnlRMkZ6WlNncE8xeHVmVnh1WEc1Y2JsOHViV0ZyWlZCeVpXUnBZMkYwWlNBOUlHWjFibU4wYVc5dUlHMWhhMlZRY21Wa2FXTmhkR1VvZDI5eVpITXNJSEJ5WldacGVDa2dlMXh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdkMjl5WkhNZ1BUMDlJRndpYzNSeWFXNW5YQ0lwSUh0Y2JpQWdJQ0FnSUNBZ2QyOXlaSE1nUFNCM2IzSmtjeTV6Y0d4cGRDaGNJaUJjSWlrN1hHNGdJQ0FnZlZ4dUlDQWdJSFpoY2lCbUlEMGdYQ0pjSWl4Y2JpQWdJQ0JqWVhSeklEMGdXMTA3WEc0Z0lDQWdiM1YwT2lCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElIZHZjbVJ6TG14bGJtZDBhRHNnS3l0cEtTQjdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2RtRnlJR29nUFNBd095QnFJRHdnWTJGMGN5NXNaVzVuZEdnN0lDc3JhaWw3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLR05oZEhOYmFsMWJNRjB1YkdWdVozUm9JRDA5UFNCM2IzSmtjMXRwWFM1c1pXNW5kR2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnWTJGMGMxdHFYUzV3ZFhOb0tIZHZjbVJ6VzJsZEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVkR2x1ZFdVZ2IzVjBPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmpZWFJ6TG5CMWMyZ29XM2R2Y21SelcybGRYU2s3WEc0Z0lDQWdmVnh1SUNBZ0lHWjFibU4wYVc5dUlHTnZiWEJoY21WVWJ5aGhjbklwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR0Z5Y2k1c1pXNW5kR2dnUFQwOUlERXBJSEpsZEhWeWJpQm1JQ3M5SUZ3aWNtVjBkWEp1SUhOMGNpQTlQVDBnSjF3aUlDc2dZWEp5V3pCZElDc2dYQ0luTzF3aU8xeHVJQ0FnSUNBZ0lDQm1JQ3M5SUZ3aWMzZHBkR05vS0hOMGNpbDdYQ0k3WEc0Z0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1lYSnlMbXhsYm1kMGFEc2dLeXRwS1h0Y2JpQWdJQ0FnSUNBZ0lDQWdaaUFyUFNCY0ltTmhjMlVnSjF3aUlDc2dZWEp5VzJsZElDc2dYQ0luT2x3aU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJR1lnS3owZ1hDSnlaWFIxY200Z2RISjFaWDF5WlhSMWNtNGdabUZzYzJVN1hDSTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdWMmhsYmlCMGFHVnlaU0JoY21VZ2JXOXlaU0IwYUdGdUlIUm9jbVZsSUd4bGJtZDBhQ0JqWVhSbFoyOXlhV1Z6TENCaGJpQnZkWFJsY2x4dUlDQWdJQzh2SUhOM2FYUmphQ0JtYVhKemRDQmthWE53WVhSamFHVnpJRzl1SUhSb1pTQnNaVzVuZEdoekxDQjBieUJ6WVhabElHOXVJR052YlhCaGNtbHpiMjV6TGx4dUlDQWdJR2xtSUNoallYUnpMbXhsYm1kMGFDQStJRE1wSUh0Y2JpQWdJQ0FnSUNBZ1kyRjBjeTV6YjNKMEtHWjFibU4wYVc5dUtHRXNJR0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmlMbXhsYm1kMGFDQXRJR0V1YkdWdVozUm9PMXh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ1ppQXJQU0JjSW5OM2FYUmphQ2h6ZEhJdWJHVnVaM1JvS1h0Y0lqdGNiaUFnSUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JqWVhSekxteGxibWQwYURzZ0t5dHBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWTJGMElEMGdZMkYwYzF0cFhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdZZ0t6MGdYQ0pqWVhObElGd2lJQ3NnWTJGMFd6QmRMbXhsYm1kMGFDQXJJRndpT2x3aU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dGNHRnlaVlJ2S0dOaGRDazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWmlBclBTQmNJbjFjSWp0Y2JseHVJQ0FnSUNBZ0lDQXZMeUJQZEdobGNuZHBjMlVzSUhOcGJYQnNlU0JuWlc1bGNtRjBaU0JoSUdac1lYUWdZSE4zYVhSamFHQWdjM1JoZEdWdFpXNTBMbHh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lHTnZiWEJoY21WVWJ5aDNiM0prY3lrN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQnVaWGNnUm5WdVkzUnBiMjRvWENKemRISmNJaXdnWmlrN1hHNTlYRzVjYmx4dVh5NTBjbUZqYTBWeWNtOXlVRzl6SUQwZ0tHWjFibU4wYVc5dUlDZ3BlMXh1SUNBdkx5QnNhVzVsWW5KbFlXdGNiaUFnZG1GeUlHeGlJRDBnTDF4Y2NseGNibnhiWEZ4dVhGeHlYRngxTWpBeU9GeGNkVEl3TWpsZEwyYzdYRzRnSUhaaGNpQnRhVzVTWVc1blpTQTlJREl3TENCdFlYaFNZVzVuWlNBOUlESXdPMXh1SUNCbWRXNWpkR2x2YmlCbWFXNWtUR2x1WlNoc2FXNWxjeXdnY0c5ektYdGNiaUFnSUNCMllYSWdkRzF3VEdWdUlEMGdNRHRjYmlBZ0lDQm1iM0lvZG1GeUlHa2dQU0F3TEd4bGJpQTlJR3hwYm1WekxteGxibWQwYURzZ2FTQThJR3hsYmpzZ2FTc3JLWHRjYmlBZ0lDQWdJSFpoY2lCc2FXNWxUR1Z1SUQwZ0tHeHBibVZ6VzJsZElIeDhJRndpWENJcExteGxibWQwYUR0Y2JseHVJQ0FnSUNBZ2FXWW9kRzF3VEdWdUlDc2diR2x1WlV4bGJpQStJSEJ2Y3lrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2UyNTFiVG9nYVN3Z2JHbHVaVG9nYkdsdVpYTmJhVjBzSUhOMFlYSjBPaUJ3YjNNZ0xTQnBJQzBnZEcxd1RHVnVJQ3dnY0hKbGRqcHNhVzVsYzF0cExURmRMQ0J1WlhoME9pQnNhVzVsYzF0cEt6RmRJSDA3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0F2THlBeElHbHpJR1p2Y2lCMGFHVWdiR2x1WldKeVpXRnJYRzRnSUNBZ0lDQjBiWEJNWlc0Z1BTQjBiWEJNWlc0Z0t5QnNhVzVsVEdWdUlEdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ1puVnVZM1JwYjI0Z1ptOXliV0YwVEdsdVpTaHpkSElzSUNCemRHRnlkQ3dnYm5WdExDQjBZWEpuWlhRcGUxeHVJQ0FnSUhaaGNpQnNaVzRnUFNCemRISXViR1Z1WjNSb08xeHVJQ0FnSUhaaGNpQnRhVzRnUFNCemRHRnlkQ0F0SUcxcGJsSmhibWRsTzF4dUlDQWdJR2xtS0cxcGJpQThJREFwSUcxcGJpQTlJREE3WEc0Z0lDQWdkbUZ5SUcxaGVDQTlJSE4wWVhKMElDc2diV0Y0VW1GdVoyVTdYRzRnSUNBZ2FXWW9iV0Y0SUQ0Z2JHVnVLU0J0WVhnZ1BTQnNaVzQ3WEc1Y2JpQWdJQ0IyWVhJZ2NtVnRZV2x1SUQwZ2MzUnlMbk5zYVdObEtHMXBiaXdnYldGNEtUdGNiaUFnSUNCMllYSWdjSEpsWm1sNElEMGdYQ0piWENJZ0t5aHVkVzByTVNrZ0t5QmNJbDBnWENJZ0t5QW9iV2x1SUQ0Z01EOGdYQ0l1TGx3aUlEb2dYQ0pjSWlsY2JpQWdJQ0IyWVhJZ2NHOXpkR1pwZUNBOUlHMWhlQ0E4SUd4bGJpQS9JRndpTGk1Y0lqb2dYQ0pjSWp0Y2JpQWdJQ0IyWVhJZ2NtVnpJRDBnY0hKbFptbDRJQ3NnY21WdFlXbHVJQ3NnY0c5emRHWnBlRHRjYmlBZ0lDQnBaaWgwWVhKblpYUXBJSEpsY3lBclBTQmNJbHhjYmx3aUlDc2dibVYzSUVGeWNtRjVLSE4wWVhKMExXMXBiaUFySUhCeVpXWnBlQzVzWlc1bmRHZ2dLeUF4S1M1cWIybHVLRndpSUZ3aUtTQXJJRndpWGw1ZVhDSTdYRzRnSUNBZ2NtVjBkWEp1SUhKbGN6dGNiaUFnZlZ4dUlDQnlaWFIxY200Z1puVnVZM1JwYjI0b2FXNXdkWFFzSUhCdmN5bDdYRzRnSUNBZ2FXWW9jRzl6SUQ0Z2FXNXdkWFF1YkdWdVozUm9MVEVwSUhCdmN5QTlJR2x1Y0hWMExteGxibWQwYUMweE8xeHVJQ0FnSUd4aUxteGhjM1JKYm1SbGVDQTlJREE3WEc0Z0lDQWdkbUZ5SUd4cGJtVnpJRDBnYVc1d2RYUXVjM0JzYVhRb2JHSXBPMXh1SUNBZ0lIWmhjaUJzYVc1bElEMGdabWx1WkV4cGJtVW9iR2x1WlhNc2NHOXpLVHRjYmlBZ0lDQjJZWElnYzNSaGNuUWdQU0JzYVc1bExuTjBZWEowTENCdWRXMGdQU0JzYVc1bExtNTFiVHRjYmx4dUlDQWdJSEpsZEhWeWJpQW9iR2x1WlM1d2NtVjJQeUJtYjNKdFlYUk1hVzVsS0d4cGJtVXVjSEpsZGl3Z2MzUmhjblFzSUc1MWJTMHhJQ2tnS3lBblhGeHVKem9nSnljZ0tTQXJJRnh1SUNBZ0lDQWdabTl5YldGMFRHbHVaU2hzYVc1bExteHBibVVzSUhOMFlYSjBMQ0J1ZFcwc0lIUnlkV1VwSUNzZ0oxeGNiaWNnS3lCY2JpQWdJQ0FnSUNoc2FXNWxMbTVsZUhRL0lHWnZjbTFoZEV4cGJtVW9iR2x1WlM1dVpYaDBMQ0J6ZEdGeWRDd2diblZ0S3pFZ0tTQXJJQ2RjWEc0bk9pQW5KeUFwTzF4dVhHNGdJSDFjYm4wcEtDazdYRzVjYmx4dWRtRnlJR2xuYm05eVpXUlNaV1lnUFNBdlhGd29LRnhjUDF4Y0lYeGNYRDljWERwOFhGdy9YRnc5S1M5bk8xeHVYeTVtYVc1a1UzVmlRMkZ3ZEhWeVpTQTlJR1oxYm1OMGFXOXVJQ2h5WldkVGRISXBJSHRjYmlBZ2RtRnlJR3hsWm5RZ1BTQXdMRnh1SUNBZ0lISnBaMmgwSUQwZ01DeGNiaUFnSUNCc1pXNGdQU0J5WldkVGRISXViR1Z1WjNSb0xGeHVJQ0FnSUdsbmJtOXlaV1FnUFNCeVpXZFRkSEl1YldGMFkyZ29hV2R1YjNKbFpGSmxaaWs3SUM4dklHbG5ibTl5WldRZ2RXNWpZWEIwZFhKbFhHNGdJR2xtS0dsbmJtOXlaV1FwSUdsbmJtOXlaV1FnUFNCcFoyNXZjbVZrTG14bGJtZDBhRnh1SUNCbGJITmxJR2xuYm05eVpXUWdQU0F3TzF4dUlDQm1iM0lnS0RzZ2JHVnVMUzA3S1NCN1hHNGdJQ0FnZG1GeUlHeGxkSFJsY2lBOUlISmxaMU4wY2k1amFHRnlRWFFvYkdWdUtUdGNiaUFnSUNCcFppQW9iR1Z1SUQwOVBTQXdJSHg4SUhKbFoxTjBjaTVqYUdGeVFYUW9iR1Z1SUMwZ01Ta2dJVDA5SUZ3aVhGeGNYRndpSUNrZ2V5QmNiaUFnSUNBZ0lHbG1JQ2hzWlhSMFpYSWdQVDA5SUZ3aUtGd2lLU0JzWldaMEt5czdYRzRnSUNBZ0lDQnBaaUFvYkdWMGRHVnlJRDA5UFNCY0lpbGNJaWtnY21sbmFIUXJLenRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdhV1lnS0d4bFpuUWdJVDA5SUhKcFoyaDBLU0IwYUhKdmR5QmNJbEpsWjBWNGNEb2dYQ0lySUhKbFoxTjBjaUFySUZ3aUozTWdZbkpoWTJ0bGRDQnBjeUJ1YjNRZ2JXRnlZMmhsWkZ3aU8xeHVJQ0JsYkhObElISmxkSFZ5YmlCc1pXWjBJQzBnYVdkdWIzSmxaRHRjYm4wN1hHNWNibHh1WHk1bGMyTmhjR1ZTWldkRmVIQWdQU0JtZFc1amRHbHZiaWdnYzNSeUtYc3ZMeUJEY21Wa2FYUTZJRmhTWldkRmVIQWdNQzQyTGpFZ0tHTXBJREl3TURjdE1qQXdPQ0JUZEdWMlpXNGdUR1YyYVhSb1lXNGdQR2gwZEhBNkx5OXpkR1YyWlc1c1pYWnBkR2hoYmk1amIyMHZjbVZuWlhndmVISmxaMlY0Y0M4K0lFMUpWQ0JNYVdObGJuTmxYRzRnSUhKbGRIVnliaUJ6ZEhJdWNtVndiR0ZqWlNndld5MWJYRnhkZTMwb0tTb3JQeTVjWEZ4Y1hpUjhMQ05jWEhOZEwyY3NJR1oxYm1OMGFXOXVLRzFoZEdOb0tYdGNiaUFnSUNCeVpYUjFjbTRnSjF4Y1hGd25JQ3NnYldGMFkyZzdYRzRnSUgwcE8xeHVmVHRjYmx4dVhHNTJZWElnY2tWdWRHbDBlU0E5SUc1bGR5QlNaV2RGZUhBb1hDSW1LRndpSUNzZ1h5NXJaWGx6S0dWdWRHbDBhV1Z6S1M1cWIybHVLQ2Q4SnlrZ0t5QW5LVHNuTENBbloya25LVHRjYmx4dVh5NWpiMjUyWlhKMFJXNTBhWFI1SUQwZ1puVnVZM1JwYjI0b1kyaHlLWHRjYmx4dUlDQnlaWFIxY200Z0tGd2lYQ0lnS3lCamFISXBMbkpsY0d4aFkyVW9ja1Z1ZEdsMGVTd2dablZ1WTNScGIyNG9ZV3hzTENCallYQjBkWEpsS1h0Y2JpQWdJQ0J5WlhSMWNtNGdVM1J5YVc1bkxtWnliMjFEYUdGeVEyOWtaU2hsYm5ScGRHbGxjMXRqWVhCMGRYSmxYU2xjYmlBZ2ZTazdYRzVjYm4xY2JseHVYRzR2THlCemFXMXdiR1VnWjJWMElHRmpZMlZ6YzI5eVhHNWNibDh1WTNKbFlYUmxUMkpxWldOMElEMGdablZ1WTNScGIyNG9ieXdnY0hKdmNITXBlMXh1SUNBZ0lHWjFibU4wYVc5dUlFWnZieWdwSUh0OVhHNGdJQ0FnUm05dkxuQnliM1J2ZEhsd1pTQTlJRzg3WEc0Z0lDQWdkbUZ5SUhKbGN5QTlJRzVsZHlCR2IyODdYRzRnSUNBZ2FXWW9jSEp2Y0hNcElGOHVaWGgwWlc1a0tISmxjeXdnY0hKdmNITXBPMXh1SUNBZ0lISmxkSFZ5YmlCeVpYTTdYRzU5WEc1Y2JsOHVZM0psWVhSbFVISnZkRzhnUFNCbWRXNWpkR2x2YmlobWJpd2dieWw3WEc0Z0lDQWdablZ1WTNScGIyNGdSbTl2S0NrZ2V5QjBhR2x6TG1OdmJuTjBjblZqZEc5eUlEMGdabTQ3ZlZ4dUlDQWdJRVp2Ynk1d2NtOTBiM1I1Y0dVZ1BTQnZPMXh1SUNBZ0lISmxkSFZ5YmlBb1ptNHVjSEp2ZEc5MGVYQmxJRDBnYm1WM0lFWnZieWdwS1R0Y2JuMWNibHh1WEc1Y2JpOHFLbHh1WTJ4dmJtVmNiaW92WEc1ZkxtTnNiMjVsSUQwZ1puVnVZM1JwYjI0Z1kyeHZibVVvYjJKcUtYdGNiaUFnSUNCMllYSWdkSGx3WlNBOUlGOHVkSGx3WlU5bUtHOWlhaWs3WEc0Z0lDQWdhV1lvZEhsd1pTQTlQVDBnSjJGeWNtRjVKeWw3WEc0Z0lDQWdJQ0IyWVhJZ1kyeHZibVZrSUQwZ1cxMDdYRzRnSUNBZ0lDQm1iM0lvZG1GeUlHazlNQ3hzWlc0Z1BTQnZZbW91YkdWdVozUm9PeUJwUENCc1pXNDdhU3NyS1h0Y2JpQWdJQ0FnSUNBZ1kyeHZibVZrVzJsZElEMGdiMkpxVzJsZFhHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnWTJ4dmJtVmtPMXh1SUNBZ0lIMWNiaUFnSUNCcFppaDBlWEJsSUQwOVBTQW5iMkpxWldOMEp5bDdYRzRnSUNBZ0lDQjJZWElnWTJ4dmJtVmtJRDBnZTMwN1hHNGdJQ0FnSUNCbWIzSW9kbUZ5SUdrZ2FXNGdiMkpxS1NCcFppaHZZbW91YUdGelQzZHVVSEp2Y0dWeWRIa29hU2twZTF4dUlDQWdJQ0FnSUNCamJHOXVaV1JiYVYwZ1BTQnZZbXBiYVYwN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnWTJ4dmJtVmtPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnYjJKcU8xeHVJQ0I5WEc1Y2JsOHVaWEYxWVd4eklEMGdablZ1WTNScGIyNG9ibTkzTENCdmJHUXBlMXh1SUNCMllYSWdkSGx3WlNBOUlIUjVjR1Z2WmlCdWIzYzdYRzRnSUdsbUtIUjVjR1VnUFQwOUlDZHVkVzFpWlhJbklDWW1JSFI1Y0dWdlppQnZiR1FnUFQwOUlDZHVkVzFpWlhJbkppWWdhWE5PWVU0b2JtOTNLU0FtSmlCcGMwNWhUaWh2YkdRcEtTQnlaWFIxY200Z2RISjFaVnh1SUNCeVpYUjFjbTRnYm05M0lEMDlQU0J2YkdRN1hHNTlYRzVjYm5aaGNpQmtZWE5vSUQwZ0x5MG9XMkV0ZWwwcEwyYzdYRzVmTG1OaGJXVnNRMkZ6WlNBOUlHWjFibU4wYVc5dUtITjBjaWw3WEc0Z0lISmxkSFZ5YmlCemRISXVjbVZ3YkdGalpTaGtZWE5vTENCbWRXNWpkR2x2YmloaGJHd3NJR05oY0hSMWNtVXBlMXh1SUNBZ0lISmxkSFZ5YmlCallYQjBkWEpsTG5SdlZYQndaWEpEWVhObEtDazdYRzRnSUgwcFhHNTlYRzVjYmx4dVhHNWZMblJvY205MGRHeGxJRDBnWm5WdVkzUnBiMjRnZEdoeWIzUjBiR1VvWm5WdVl5d2dkMkZwZENsN1hHNGdJSFpoY2lCM1lXbDBJRDBnZDJGcGRDQjhmQ0F4TURBN1hHNGdJSFpoY2lCamIyNTBaWGgwTENCaGNtZHpMQ0J5WlhOMWJIUTdYRzRnSUhaaGNpQjBhVzFsYjNWMElEMGdiblZzYkR0Y2JpQWdkbUZ5SUhCeVpYWnBiM1Z6SUQwZ01EdGNiaUFnZG1GeUlHeGhkR1Z5SUQwZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ2NISmxkbWx2ZFhNZ1BTQXJibVYzSUVSaGRHVTdYRzRnSUNBZ2RHbHRaVzkxZENBOUlHNTFiR3c3WEc0Z0lDQWdjbVZ6ZFd4MElEMGdablZ1WXk1aGNIQnNlU2hqYjI1MFpYaDBMQ0JoY21kektUdGNiaUFnSUNCamIyNTBaWGgwSUQwZ1lYSm5jeUE5SUc1MWJHdzdYRzRnSUgwN1hHNGdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQjJZWElnYm05M0lEMGdLeUJ1WlhjZ1JHRjBaVHRjYmlBZ0lDQjJZWElnY21WdFlXbHVhVzVuSUQwZ2QyRnBkQ0F0SUNodWIzY2dMU0J3Y21WMmFXOTFjeWs3WEc0Z0lDQWdZMjl1ZEdWNGRDQTlJSFJvYVhNN1hHNGdJQ0FnWVhKbmN5QTlJR0Z5WjNWdFpXNTBjenRjYmlBZ0lDQnBaaUFvY21WdFlXbHVhVzVuSUR3OUlEQWdmSHdnY21WdFlXbHVhVzVuSUQ0Z2QyRnBkQ2tnZTF4dUlDQWdJQ0FnWTJ4bFlYSlVhVzFsYjNWMEtIUnBiV1Z2ZFhRcE8xeHVJQ0FnSUNBZ2RHbHRaVzkxZENBOUlHNTFiR3c3WEc0Z0lDQWdJQ0J3Y21WMmFXOTFjeUE5SUc1dmR6dGNiaUFnSUNBZ0lISmxjM1ZzZENBOUlHWjFibU11WVhCd2JIa29ZMjl1ZEdWNGRDd2dZWEpuY3lrN1hHNGdJQ0FnSUNCamIyNTBaWGgwSUQwZ1lYSm5jeUE5SUc1MWJHdzdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDZ2hkR2x0Wlc5MWRDa2dlMXh1SUNBZ0lDQWdkR2x0Wlc5MWRDQTlJSE5sZEZScGJXVnZkWFFvYkdGMFpYSXNJSEpsYldGcGJtbHVaeWs3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc0Z0lIMDdYRzU5TzF4dVhHNHZMeUJvYjJkaGJpQmxjMk5oY0dWY2JpOHZJRDA5UFQwOVBUMDlQVDA5UFQwOVhHNWZMbVZ6WTJGd1pTQTlJQ2htZFc1amRHbHZiaWdwZTF4dUlDQjJZWElnY2tGdGNDQTlJQzhtTDJjc1hHNGdJQ0FnSUNCeVRIUWdQU0F2UEM5bkxGeHVJQ0FnSUNBZ2NrZDBJRDBnTHo0dlp5eGNiaUFnSUNBZ0lISkJjRzl6SUQwZ0wxeGNKeTluTEZ4dUlDQWdJQ0FnY2xGMWIzUWdQU0F2WEZ4Y0lpOW5MRnh1SUNBZ0lDQWdhRU5vWVhKeklEMGdMMXNtUEQ1Y1hGd2lYRnduWFM4N1hHNWNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVLSE4wY2lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJvUTJoaGNuTXVkR1Z6ZENoemRISXBJRDljYmlBZ0lDQWdJSE4wY2x4dUlDQWdJQ0FnSUNBdWNtVndiR0ZqWlNoeVFXMXdMQ0FuSm1GdGNEc25LVnh1SUNBZ0lDQWdJQ0F1Y21Wd2JHRmpaU2h5VEhRc0lDY21iSFE3SnlsY2JpQWdJQ0FnSUNBZ0xuSmxjR3hoWTJVb2NrZDBMQ0FuSm1kME95Y3BYRzRnSUNBZ0lDQWdJQzV5WlhCc1lXTmxLSEpCY0c5ekxDQW5KaU16T1RzbktWeHVJQ0FnSUNBZ0lDQXVjbVZ3YkdGalpTaHlVWFZ2ZEN3Z0p5WnhkVzkwT3ljcElEcGNiaUFnSUNBZ0lITjBjanRjYmlBZ2ZWeHVmU2tvS1R0Y2JseHVYeTVqWVdOb1pTQTlJR1oxYm1OMGFXOXVLRzFoZUNsN1hHNGdJRzFoZUNBOUlHMWhlQ0I4ZkNBeE1EQXdPMXh1SUNCMllYSWdhMlY1Y3lBOUlGdGRMRnh1SUNBZ0lDQWdZMkZqYUdVZ1BTQjdmVHRjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0J6WlhRNklHWjFibU4wYVc5dUtHdGxlU3dnZG1Gc2RXVXBJSHRjYmlBZ0lDQWdJR2xtSUNoclpYbHpMbXhsYm1kMGFDQStJSFJvYVhNdWJXRjRLU0I3WEc0Z0lDQWdJQ0FnSUdOaFkyaGxXMnRsZVhNdWMyaHBablFvS1YwZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQXZMeUJjYmlBZ0lDQWdJR2xtS0dOaFkyaGxXMnRsZVYwZ1BUMDlJSFZ1WkdWbWFXNWxaQ2w3WEc0Z0lDQWdJQ0FnSUd0bGVYTXVjSFZ6YUNoclpYa3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdZMkZqYUdWYmEyVjVYU0E5SUhaaGJIVmxPMXh1SUNBZ0lDQWdjbVYwZFhKdUlIWmhiSFZsTzF4dUlDQWdJSDBzWEc0Z0lDQWdaMlYwT2lCbWRXNWpkR2x2YmloclpYa3BJSHRjYmlBZ0lDQWdJR2xtSUNoclpYa2dQVDA5SUhWdVpHVm1hVzVsWkNrZ2NtVjBkWEp1SUdOaFkyaGxPMXh1SUNBZ0lDQWdjbVYwZFhKdUlHTmhZMmhsVzJ0bGVWMDdYRzRnSUNBZ2ZTeGNiaUFnSUNCdFlYZzZJRzFoZUN4Y2JpQWdJQ0JzWlc0NlpuVnVZM1JwYjI0b0tYdGNiaUFnSUNBZ0lISmxkSFZ5YmlCclpYbHpMbXhsYm1kMGFEdGNiaUFnSUNCOVhHNGdJSDA3WEc1OVhHNWNiaTh2SUM4dklITmxkSFZ3SUhSb1pTQnlZWGNnUlhod2NtVnpjMmx2Ymx4dUx5OGdYeTUwYjNWamFFVjRjSEpsYzNOcGIyNGdQU0JtZFc1amRHbHZiaWhsZUhCeUtYdGNiaTh2SUNBZ2FXWW9aWGh3Y2k1MGVYQmxJRDA5UFNBblpYaHdjbVZ6YzJsdmJpY3BlMXh1THk4Z0lDQjlYRzR2THlBZ0lISmxkSFZ5YmlCbGVIQnlPMXh1THk4Z2ZWeHVYRzVjYmk4dklHaGhibVJzWlNCMGFHVWdjMkZ0WlNCc2IyZHBZeUJ2YmlCamIyMXdiMjVsYm5RbmN5QmdiMjR0S21BZ1lXNWtJR1ZzWlcxbGJuUW5jeUJnYjI0dEttQmNiaTh2SUhKbGRIVnliaUIwYUdVZ1ptbHlaU0J2WW1wbFkzUmNibDh1YUdGdVpHeGxSWFpsYm5RZ1BTQm1kVzVqZEdsdmJpaDJZV3gxWlN3Z2RIbHdaU0FwZTF4dUlDQjJZWElnYzJWc1ppQTlJSFJvYVhNc0lHVjJZV3gxWVhSbE8xeHVJQ0JwWmloMllXeDFaUzUwZVhCbElEMDlQU0FuWlhod2NtVnpjMmx2YmljcGV5QXZMeUJwWmlCcGN5QmxlSEJ5WlhOemFXOXVMQ0JuYnlCbGRtRnNkV0YwWldRZ2QyRjVYRzRnSUNBZ1pYWmhiSFZoZEdVZ1BTQjJZV3gxWlM1blpYUTdYRzRnSUgxY2JpQWdhV1lvWlhaaGJIVmhkR1VwZTF4dUlDQWdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQm1hWEpsS0c5aWFpbDdYRzRnSUNBZ0lDQnpaV3htTG1SaGRHRXVKR1YyWlc1MElEMGdiMkpxTzF4dUlDQWdJQ0FnZG1GeUlISmxjeUE5SUdWMllXeDFZWFJsS0hObGJHWXBPMXh1SUNBZ0lDQWdhV1lvY21WeklEMDlQU0JtWVd4elpTQW1KaUJ2WW1vZ0ppWWdiMkpxTG5CeVpYWmxiblJFWldaaGRXeDBLU0J2WW1vdWNISmxkbVZ1ZEVSbFptRjFiSFFvS1R0Y2JpQWdJQ0FnSUhObGJHWXVaR0YwWVM0a1pYWmxiblFnUFNCMWJtUmxabWx1WldRN1hHNGdJQ0FnSUNCelpXeG1MaVIxY0dSaGRHVW9LVHRjYmlBZ0lDQjlYRzRnSUgxbGJITmxlMXh1SUNBZ0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlCbWFYSmxLQ2w3WEc0Z0lDQWdJQ0IyWVhJZ1lYSm5jeUE5SUhOc2FXTmxMbU5oYkd3b1lYSm5kVzFsYm5SektTQWdJQ0FnSUZ4dUlDQWdJQ0FnWVhKbmN5NTFibk5vYVdaMEtIWmhiSFZsS1R0Y2JpQWdJQ0FnSUhObGJHWXVKR1Z0YVhRdVlYQndiSGtvYzJWc1ppd2dZWEpuY3lrN1hHNGdJQ0FnSUNCelpXeG1MaVIxY0dSaGRHVW9LVHRjYmlBZ0lDQjlYRzRnSUgxY2JuMWNibHh1THk4Z2IyNXNlU0JqWVd4c0lHOXVZMlZjYmw4dWIyNWpaU0E5SUdaMWJtTjBhVzl1S0dadUtYdGNiaUFnZG1GeUlIUnBiV1VnUFNBd08xeHVJQ0J5WlhSMWNtNGdablZ1WTNScGIyNG9LWHRjYmlBZ0lDQnBaaWdnZEdsdFpTc3JJRDA5UFNBd0tTQm1iaTVoY0hCc2VTaDBhR2x6TENCaGNtZDFiV1Z1ZEhNcE8xeHVJQ0I5WEc1OVhHNWNibDh1Wm1sNFQySnFVM1J5SUQwZ1puVnVZM1JwYjI0b2MzUnlLWHRjYmlBZ2FXWW9jM1J5TG5SeWFXMG9LUzVwYm1SbGVFOW1LQ2Q3SnlrZ0lUMDlJREFwZTF4dUlDQWdJSEpsZEhWeWJpQW5leWNnS3lCemRISWdLeUFuZlNjN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhOMGNqdGNibjFjYmx4dVhHNWNibDh1Ykc5bklEMGdablZ1WTNScGIyNG9iWE5uTENCMGVYQmxLWHRjYmlBZ2FXWW9kSGx3Wlc5bUlHTnZibk52YkdVZ0lUMDlJRndpZFc1a1pXWnBibVZrWENJcElDQmpiMjV6YjJ4bFczUjVjR1VnZkh3Z1hDSnNiMmRjSWwwb2JYTm5LVHRjYm4xY2JseHVYRzVjYmx4dUx5OW9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OW9kRzFzTDNkbkwyUnlZV1owY3k5b2RHMXNMMjFoYzNSbGNpOXphVzVuYkdVdGNHRm5aUzVvZEcxc0kzWnZhV1F0Wld4bGJXVnVkSE5jYmw4dWFYTldiMmxrVkdGbklEMGdYeTV0WVd0bFVISmxaR2xqWVhSbEtGd2lZWEpsWVNCaVlYTmxJR0p5SUdOdmJDQmxiV0psWkNCb2NpQnBiV2NnYVc1d2RYUWdhMlY1WjJWdUlHeHBibXNnYldWdWRXbDBaVzBnYldWMFlTQndZWEpoYlNCemIzVnlZMlVnZEhKaFkyc2dkMkp5SUhJdFkyOXVkR1Z1ZEZ3aUtUdGNibDh1YVhOQ2IyOXNaV0Z1UVhSMGNpQTlJRjh1YldGclpWQnlaV1JwWTJGMFpTZ25jMlZzWldOMFpXUWdZMmhsWTJ0bFpDQmthWE5oWW14bFpDQnlaV0ZrVDI1c2VTQnlaWEYxYVhKbFpDQnZjR1Z1SUdGMWRHOW1iMk4xY3lCamIyNTBjbTlzY3lCaGRYUnZjR3hoZVNCamIyMXdZV04wSUd4dmIzQWdaR1ZtWlhJZ2JYVnNkR2x3YkdVbktUdGNibHh1WHk1cGMwWmhiSE5sSUMwZ1puVnVZM1JwYjI0b0tYdHlaWFIxY200Z1ptRnNjMlY5WEc1ZkxtbHpWSEoxWlNBdElHWjFibU4wYVc5dUtDbDdjbVYwZFhKdUlIUnlkV1Y5WEc1Y2JsOHVhWE5GZUhCeUlEMGdablZ1WTNScGIyNG9aWGh3Y2lsN1hHNGdJSEpsZEhWeWJpQmxlSEJ5SUNZbUlHVjRjSEl1ZEhsd1pTQTlQVDBnSjJWNGNISmxjM05wYjI0bk8xeHVmVnh1THk4Z1FGUlBSRTg2SUcxaGEyVWdhWFFnYlc5eVpTQnpkSEpwWTNSY2JsOHVhWE5IY205MWNDQTlJR1oxYm1OMGFXOXVLR2R5YjNWd0tYdGNiaUFnY21WMGRYSnVJR2R5YjNWd0xtbHVhbVZqZENCOGZDQm5jbTkxY0M0a2FXNXFaV04wTzF4dWZWeHVYRzVmTG1kbGRFTnZiWEJwYkdWR2JpQTlJR1oxYm1OMGFXOXVLSE52ZFhKalpTd2dZM1I0TENCdmNIUnBiMjV6S1h0Y2JpQWdjbVYwZFhKdUlHTjBlQzRrWTI5dGNHbHNaUzVpYVc1a0tHTjBlQ3h6YjNWeVkyVXNJRzl3ZEdsdmJuTXBYRzU5WEc1Y2JseHVJbDE5IiwidmFyIGRpZmZBcnJheSA9IHJlcXVpcmUoJy4vaGVscGVyL2FycmF5RGlmZi5qcycpO1xudmFyIGNvbWJpbmUgPSByZXF1aXJlKCcuL2hlbHBlci9jb21iaW5lLmpzJyk7XG52YXIgYW5pbWF0ZSA9IHJlcXVpcmUoXCIuL2hlbHBlci9hbmltYXRlLmpzXCIpO1xudmFyIG5vZGUgPSByZXF1aXJlKFwiLi9wYXJzZXIvbm9kZS5qc1wiKTtcbnZhciBHcm91cCA9IHJlcXVpcmUoJy4vZ3JvdXAuanMnKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi9kb20uanNcIik7XG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5cbnZhciB3YWxrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxud2Fsa2Vycy5saXN0ID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcblxuICB2YXIgUmVndWxhciA9IHdhbGtlcnMuUmVndWxhcjsgIFxuICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiUmVndWxhciBsaXN0XCIpLFxuICAgIG5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlLFxuICAgIGV4dHJhID0gb3B0aW9ucy5leHRyYTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoW3BsYWNlaG9sZGVyXSk7XG4gIHZhciBpbmRleE5hbWUgPSBhc3QudmFyaWFibGUgKyAnX2luZGV4JztcbiAgdmFyIHZhcmlhYmxlID0gYXN0LnZhcmlhYmxlO1xuICB2YXIgYWx0ZXJuYXRlID0gYXN0LmFsdGVybmF0ZTtcbiAgdmFyIHRyYWNrID0gYXN0LnRyYWNrLCBrZXlPZiwgZXh0cmFPYmo7XG4gIGlmKCB0cmFjayAmJiB0cmFjayAhPT0gdHJ1ZSApe1xuICAgIHRyYWNrID0gdGhpcy5fdG91Y2hFeHByKHRyYWNrKTtcbiAgICBleHRyYU9iaiA9IF8uY3JlYXRlT2JqZWN0KGV4dHJhKTtcbiAgICBrZXlPZiA9IGZ1bmN0aW9uKCBpdGVtLCBpbmRleCApe1xuICAgICAgZXh0cmFPYmpbIHZhcmlhYmxlIF0gPSBpdGVtO1xuICAgICAgZXh0cmFPYmpbIGluZGV4TmFtZSBdID0gaW5kZXg7XG4gICAgICByZXR1cm4gdHJhY2suZ2V0KCBzZWxmLCBleHRyYU9iaiApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiByZW1vdmVSYW5nZShpbmRleCwgcmxlbil7XG4gICAgZm9yKHZhciBqID0gMDsgajwgcmxlbjsgaisrKXsgLy9yZW1vdmVkXG4gICAgICB2YXIgcmVtb3ZlZCA9IGdyb3VwLmNoaWxkcmVuLnNwbGljZSggaW5kZXggKyAxLCAxKVswXTtcbiAgICAgIHJlbW92ZWQuZGVzdHJveSh0cnVlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gYWRkUmFuZ2UoaW5kZXgsIGVuZCwgbmV3VmFsdWUpe1xuICAgIGZvcih2YXIgbyA9IGluZGV4OyBvIDwgZW5kOyBvKyspeyAvL2FkZFxuICAgICAgLy8gcHJvdG90eXBlIGluaGVyaXRcbiAgICAgIHZhciBpdGVtID0gbmV3VmFsdWVbb107XG4gICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgZGF0YVtpbmRleE5hbWVdID0gbztcbiAgICAgIGRhdGFbdmFyaWFibGVdID0gaXRlbTtcblxuICAgICAgZGF0YSA9IF8uY3JlYXRlT2JqZWN0KGV4dHJhLCBkYXRhKTtcbiAgICAgIHZhciBzZWN0aW9uID0gc2VsZi4kY29tcGlsZShhc3QuYm9keSwge1xuICAgICAgICBleHRyYTogZGF0YSxcbiAgICAgICAgbmFtZXNwYWNlOm5hbWVzcGFjZSxcbiAgICAgICAgcmVjb3JkOiB0cnVlLFxuICAgICAgICBvdXRlcjogb3B0aW9ucy5vdXRlclxuICAgICAgfSlcbiAgICAgIHNlY3Rpb24uZGF0YSA9IGRhdGE7XG4gICAgICAvLyBhdXRvbGlua1xuICAgICAgdmFyIGluc2VydCA9ICBjb21iaW5lLmxhc3QoZ3JvdXAuZ2V0KG8pKTtcbiAgICAgIGlmKGluc2VydC5wYXJlbnROb2RlKXtcbiAgICAgICAgYW5pbWF0ZS5pbmplY3QoY29tYmluZS5ub2RlKHNlY3Rpb24pLGluc2VydCwgJ2FmdGVyJyk7XG4gICAgICB9XG4gICAgICAvLyBpbnNlcnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29tYmluZS5ub2RlKHNlY3Rpb24pLCBpbnNlcnQubmV4dFNpYmxpbmcpO1xuICAgICAgZ3JvdXAuY2hpbGRyZW4uc3BsaWNlKCBvICsgMSAsIDAsIHNlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVJhbmdlKHN0YXJ0LCBlbmQsIG5ld1ZhbHVlKXtcbiAgICBmb3IodmFyIGsgPSBzdGFydDsgayA8IGVuZDsgaysrKXsgLy8gbm8gY2hhbmdlXG4gICAgICB2YXIgc2VjdCA9IGdyb3VwLmdldCggayArIDEgKTtcbiAgICAgIHNlY3QuZGF0YVsgaW5kZXhOYW1lIF0gPSBrO1xuICAgICAgc2VjdC5kYXRhWyB2YXJpYWJsZSBdID0gbmV3VmFsdWVba107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTEQobmV3VmFsdWUsIG9sZFZhbHVlLCBzcGxpY2VzKXtcbiAgICBpZighbmV3VmFsdWUpIHtcbiAgICAgIG5ld1ZhbHVlID0gW107XG4gICAgICBzcGxpY2VzID0gZGlmZkFycmF5KG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgfVxuICAgICBcbiAgICBpZighc3BsaWNlcyB8fCAhc3BsaWNlcy5sZW5ndGgpIHJldHVybjtcbiAgICB2YXIgY3VyID0gcGxhY2Vob2xkZXI7XG4gICAgdmFyIG0gPSAwLCBsZW4gPSBuZXdWYWx1ZS5sZW5ndGg7XG4gICAgICBcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3BsaWNlcy5sZW5ndGg7IGkrKyl7IC8vaW5pdFxuICAgICAgdmFyIHNwbGljZSA9IHNwbGljZXNbaV07XG4gICAgICB2YXIgaW5kZXggPSBzcGxpY2UuaW5kZXg7IC8vIGJlYWN1c2Ugd2UgdXNlIGEgY29tbWVudCBmb3IgcGxhY2Vob2xkZXJcbiAgICAgIHZhciByZW1vdmVkID0gc3BsaWNlLnJlbW92ZWQ7XG4gICAgICB2YXIgYWRkID0gc3BsaWNlLmFkZDtcbiAgICAgIHZhciBybGVuID0gcmVtb3ZlZC5sZW5ndGg7XG4gICAgICAvLyBmb3IgdHJhY2tcbiAgICAgIGlmKCB0cmFjayAmJiBybGVuICYmIGFkZCApe1xuICAgICAgICB2YXIgbWluYXIgPSBNYXRoLm1pbihybGVuLCBhZGQpO1xuICAgICAgICB2YXIgdEluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUodEluZGV4IDwgbWluYXIpe1xuICAgICAgICAgIGlmKCBrZXlPZihuZXdWYWx1ZVtpbmRleF0sIGluZGV4KSAhPT0ga2V5T2YoIHJlbW92ZWRbMF0sIGluZGV4ICkgKXtcbiAgICAgICAgICAgIHJlbW92ZVJhbmdlKGluZGV4LCAxKVxuICAgICAgICAgICAgYWRkUmFuZ2UoaW5kZXgsIGluZGV4KzEsIG5ld1ZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZW1vdmVkLnNoaWZ0KCk7XG4gICAgICAgICAgYWRkLS07XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICB0SW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBybGVuID0gcmVtb3ZlZC5sZW5ndGg7XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGVcbiAgICAgIHVwZGF0ZVJhbmdlKG0sIGluZGV4LCBuZXdWYWx1ZSk7XG4gICAgICByZW1vdmVSYW5nZSggaW5kZXggLHJsZW4pXG5cbiAgICAgIGFkZFJhbmdlKGluZGV4LCBpbmRleCthZGQsIG5ld1ZhbHVlKVxuXG4gICAgICBtID0gaW5kZXggKyBhZGQgLSBybGVuO1xuICAgICAgbSAgPSBtIDwgMD8gMCA6IG07XG5cbiAgICB9XG4gICAgaWYobSA8IGxlbil7XG4gICAgICBmb3IodmFyIGkgPSBtOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICB2YXIgcGFpciA9IGdyb3VwLmdldChpICsgMSk7XG4gICAgICAgIHBhaXIuZGF0YVtpbmRleE5hbWVdID0gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgdHJhY2sgaXMgY29uc3RhbnQgdGVzdC5cbiAgZnVuY3Rpb24gdXBkYXRlU2ltcGxlKG5ld1ZhbHVlLCBvbGRWYWx1ZSl7XG4gICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSB8fCBbXTtcbiAgICBvbGRWYWx1ZSAgPSBvbGRWYWx1ZSB8fCBbXTtcblxuICAgIHZhciBubGVuID0gbmV3VmFsdWUubGVuZ3RoIHx8IDA7XG4gICAgdmFyIG9sZW4gPSBvbGRWYWx1ZS5sZW5ndGggfHwgMDtcbiAgICB2YXIgbWxlbiA9IE1hdGgubWluKG5sZW4sIG9sZW4pO1xuXG5cbiAgICB1cGRhdGVSYW5nZSgwLCBtbGVuLCBuZXdWYWx1ZSlcbiAgICBpZihubGVuIDwgb2xlbil7IC8vbmVlZCBhZGRcbiAgICAgIHJlbW92ZVJhbmdlKG5sZW4sIG9sZW4tbmxlbik7XG4gICAgfWVsc2UgaWYobmxlbiA+IG9sZW4pe1xuICAgICAgYWRkUmFuZ2Uob2xlbiwgbmxlbiwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShuZXdWYWx1ZSwgb2xkVmFsdWUsIHNwbGljZXMpe1xuICAgIHZhciBubGVuID0gbmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoO1xuICAgIHZhciBvbGVuID0gb2xkVmFsdWUgJiYgb2xkVmFsdWUubGVuZ3RoO1xuICAgIGlmKCAhb2xlbiAmJiBubGVuICYmIGdyb3VwLmdldCgxKSl7XG4gICAgICB2YXIgYWx0R3JvdXAgPSBncm91cC5jaGlsZHJlbi5wb3AoKTtcbiAgICAgIGlmKGFsdEdyb3VwLmRlc3Ryb3kpICBhbHRHcm91cC5kZXN0cm95KHRydWUpO1xuICAgIH1cblxuICAgIGlmKHRyYWNrID09PSB0cnVlKXtcbiAgICAgIHVwZGF0ZVNpbXBsZShuZXdWYWx1ZSwgb2xkVmFsdWUsIHNwbGljZXMpXG4gICAgfWVsc2V7XG4gICAgICB1cGRhdGVMRChuZXdWYWx1ZSwgb2xkVmFsdWUsIHNwbGljZXMpXG4gICAgfVxuXG4gICAgLy8gQCB7I2xpc3R9IHsjZWxzZX1cbiAgICBpZiggIW5sZW4gJiYgYWx0ZXJuYXRlICYmIGFsdGVybmF0ZS5sZW5ndGgpe1xuICAgICAgdmFyIHNlY3Rpb24gPSBzZWxmLiRjb21waWxlKGFsdGVybmF0ZSwge1xuICAgICAgICBleHRyYTogZXh0cmEsXG4gICAgICAgIHJlY29yZDogdHJ1ZSxcbiAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXIsXG4gICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICB9KVxuICAgICAgZ3JvdXAuY2hpbGRyZW4ucHVzaChzZWN0aW9uKTtcbiAgICAgIGlmKHBsYWNlaG9sZGVyLnBhcmVudE5vZGUpe1xuICAgICAgICBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoc2VjdGlvbiksIHBsYWNlaG9sZGVyLCAnYWZ0ZXInKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdGhpcy4kd2F0Y2goYXN0LnNlcXVlbmNlLCB1cGRhdGUsIHsgaW5pdDogdHJ1ZSwgaW5kZXhUcmFjazogdHJhY2sgPT09IHRydWUgfSk7XG4gIHJldHVybiBncm91cDtcbn1cbi8vIHsjaW5jbHVkZSB9IG9yIHsjaW5jIHRlbXBsYXRlfVxud2Fsa2Vycy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gIHZhciBjb250ZW50ID0gYXN0LmNvbnRlbnQsIGNvbXBpbGVkO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCdpbmxjdWRlJyk7XG4gIHZhciBjb21waWxlZCwgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsIGV4dHJhID0gb3B0aW9ucy5leHRyYTtcbiAgdmFyIGdyb3VwID0gbmV3IEdyb3VwKFtwbGFjZWhvbGRlcl0pO1xuICBpZihjb250ZW50KXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy4kd2F0Y2goY29udGVudCwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoIGNvbXBpbGVkID0gZ3JvdXAuZ2V0KDEpKXtcbiAgICAgICAgY29tcGlsZWQuZGVzdHJveSh0cnVlKTsgXG4gICAgICAgIGdyb3VwLmNoaWxkcmVuLnBvcCgpO1xuICAgICAgfVxuICAgICAgZ3JvdXAucHVzaCggY29tcGlsZWQgPSAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSA/IHZhbHVlKCk6IHNlbGYuJGNvbXBpbGUodmFsdWUsIHtyZWNvcmQ6IHRydWUsIG91dGVyOiBvcHRpb25zLm91dGVyLG5hbWVzcGFjZTogbmFtZXNwYWNlLCBleHRyYTogZXh0cmF9KSApOyBcbiAgICAgIGlmKHBsYWNlaG9sZGVyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgY29tcGlsZWQuJGluamVjdChwbGFjZWhvbGRlciwgJ2JlZm9yZScpXG4gICAgICB9XG4gICAgfSwge1xuICAgICAgaW5pdDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBncm91cDtcbn07XG5cblxuLy8gaG93IHRvIHJlc29sdmUgdGhpcyBwcm9ibGVtXG52YXIgaWkgPSAwO1xud2Fsa2Vyc1snaWYnXSA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gIHZhciBzZWxmID0gdGhpcywgY29uc2VxdWVudCwgYWx0ZXJuYXRlLCBleHRyYSA9IG9wdGlvbnMuZXh0cmE7XG4gIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5lbGVtZW50KXsgLy8gYXR0cmlidXRlIGludGVwbGF0aW9uXG4gICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgICBpZighIW52YWx1ZSl7XG4gICAgICAgIGlmKGFsdGVybmF0ZSkgY29tYmluZS5kZXN0cm95KGFsdGVybmF0ZSlcbiAgICAgICAgaWYoYXN0LmNvbnNlcXVlbnQpIGNvbnNlcXVlbnQgPSBzZWxmLiRjb21waWxlKGFzdC5jb25zZXF1ZW50LCB7cmVjb3JkOiB0cnVlLCBlbGVtZW50OiBvcHRpb25zLmVsZW1lbnQgLCBleHRyYTpleHRyYX0pO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKGNvbnNlcXVlbnQpIGNvbWJpbmUuZGVzdHJveShjb25zZXF1ZW50KVxuICAgICAgICBpZihhc3QuYWx0ZXJuYXRlKSBhbHRlcm5hdGUgPSBzZWxmLiRjb21waWxlKGFzdC5hbHRlcm5hdGUsIHtyZWNvcmQ6IHRydWUsIGVsZW1lbnQ6IG9wdGlvbnMuZWxlbWVudCwgZXh0cmE6IGV4dHJhfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuJHdhdGNoKGFzdC50ZXN0LCB1cGRhdGUsIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGNvbnNlcXVlbnQpIGNvbWJpbmUuZGVzdHJveShjb25zZXF1ZW50KTtcbiAgICAgICAgZWxzZSBpZihhbHRlcm5hdGUpIGNvbWJpbmUuZGVzdHJveShhbHRlcm5hdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciB0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUsIG5vZGU7XG4gIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJSZWd1bGFyIGlmXCIgKyBpaSsrKTtcbiAgdmFyIGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gIGdyb3VwLnB1c2gocGxhY2Vob2xkZXIpO1xuICB2YXIgcHJlVmFsdWUgPSBudWxsLCBuYW1lc3BhY2U9IG9wdGlvbnMubmFtZXNwYWNlO1xuXG5cbiAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIChudmFsdWUsIG9sZCl7XG4gICAgdmFyIHZhbHVlID0gISFudmFsdWU7XG4gICAgaWYodmFsdWUgPT09IHByZVZhbHVlKSByZXR1cm47XG4gICAgcHJlVmFsdWUgPSB2YWx1ZTtcbiAgICBpZihncm91cC5jaGlsZHJlblsxXSl7XG4gICAgICBncm91cC5jaGlsZHJlblsxXS5kZXN0cm95KHRydWUpO1xuICAgICAgZ3JvdXAuY2hpbGRyZW4ucG9wKCk7XG4gICAgfVxuICAgIGlmKHZhbHVlKXsgLy90cnVlXG4gICAgICBpZihhc3QuY29uc2VxdWVudCAmJiBhc3QuY29uc2VxdWVudC5sZW5ndGgpe1xuICAgICAgICBjb25zZXF1ZW50ID0gc2VsZi4kY29tcGlsZSggYXN0LmNvbnNlcXVlbnQgLCB7cmVjb3JkOnRydWUsIG91dGVyOiBvcHRpb25zLm91dGVyLG5hbWVzcGFjZTogbmFtZXNwYWNlLCBleHRyYTpleHRyYSB9KVxuICAgICAgICAvLyBwbGFjZWhvbGRlci5wYXJlbnROb2RlICYmIHBsYWNlaG9sZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBub2RlLCBwbGFjZWhvbGRlciApO1xuICAgICAgICBncm91cC5wdXNoKGNvbnNlcXVlbnQpO1xuICAgICAgICBpZihwbGFjZWhvbGRlci5wYXJlbnROb2RlKXtcbiAgICAgICAgICBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoY29uc2VxdWVudCksIHBsYWNlaG9sZGVyLCAnYmVmb3JlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ZWxzZXsgLy9mYWxzZVxuICAgICAgaWYoYXN0LmFsdGVybmF0ZSAmJiBhc3QuYWx0ZXJuYXRlLmxlbmd0aCl7XG4gICAgICAgIGFsdGVybmF0ZSA9IHNlbGYuJGNvbXBpbGUoYXN0LmFsdGVybmF0ZSwge3JlY29yZDp0cnVlLCBvdXRlcjogb3B0aW9ucy5vdXRlcixuYW1lc3BhY2U6IG5hbWVzcGFjZSwgZXh0cmE6ZXh0cmF9KTtcbiAgICAgICAgZ3JvdXAucHVzaChhbHRlcm5hdGUpO1xuICAgICAgICBpZihwbGFjZWhvbGRlci5wYXJlbnROb2RlKXtcbiAgICAgICAgICBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoYWx0ZXJuYXRlKSwgcGxhY2Vob2xkZXIsICdiZWZvcmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB0aGlzLiR3YXRjaChhc3QudGVzdCwgdXBkYXRlLCB7Zm9yY2U6IHRydWUsIGluaXQ6IHRydWV9KTtcblxuICByZXR1cm4gZ3JvdXA7XG59XG5cblxud2Fsa2Vycy5leHByZXNzaW9uID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgdGhpcy4kd2F0Y2goYXN0LCBmdW5jdGlvbihuZXd2YWwpe1xuICAgIGRvbS50ZXh0KG5vZGUsIFwiXCIgKyAobmV3dmFsID09IG51bGw/IFwiXCI6IFwiXCIgKyBuZXd2YWwpICk7XG4gIH0pXG4gIHJldHVybiBub2RlO1xufVxud2Fsa2Vycy50ZXh0ID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShfLmNvbnZlcnRFbnRpdHkoYXN0LnRleHQpKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG52YXIgZXZlbnRSZWcgPSAvXm9uLSguKykkL1xuXG4vKipcbiAqIHdhbGtlcnMgZWxlbWVudCAoY29udGFpbnMgY29tcG9uZW50KVxuICovXG53YWxrZXJzLmVsZW1lbnQgPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICB2YXIgYXR0cnMgPSBhc3QuYXR0cnMsIHNlbGYgPSB0aGlzLFxuICAgIENvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcixcbiAgICBjaGlsZHJlbiA9IGFzdC5jaGlsZHJlbixcbiAgICBuYW1lc3BhY2UgPSBvcHRpb25zLm5hbWVzcGFjZSwgXG4gICAgZXh0cmEgPSBvcHRpb25zLmV4dHJhLFxuICAgIHRhZyA9IGFzdC50YWcsXG4gICAgQ29tcG9uZW50ID0gQ29uc3RydWN0b3IuY29tcG9uZW50KHRhZyksXG4gICAgcmVmLCBncm91cCwgZWxlbWVudDtcblxuICBpZiggdGFnID09PSAnci1jb250ZW50JyApe1xuICAgIC8vIF8ubG9nKCdyLWNvbnRlbnQgaXMgZGVwcmVjYXRlZCwgdXNlIHsjaW5jIHRoaXMuJGJvZHl9IGluc3RlYWQgKGB7I2luY2x1ZGV9YCBhcyBzYW1lKScsICdlcnJvcicpO1xuICAgIHJldHVybiB0aGlzLiRib2R5ICYmIHRoaXMuJGJvZHkoKTtcbiAgfSBcblxuICBpZihDb21wb25lbnQgfHwgdGFnID09PSAnci1jb21wb25lbnQnKXtcbiAgICBvcHRpb25zLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiAgICByZXR1cm4gd2Fsa2Vycy5jb21wb25lbnQuY2FsbCh0aGlzLCBhc3QsIG9wdGlvbnMpXG4gIH1cblxuICBpZih0YWcgPT09ICdzdmcnKSBuYW1lc3BhY2UgPSBcInN2Z1wiO1xuICAvLyBARGVwcmVjYXRlZDogbWF5IGJlIHJlbW92ZWQgaW4gbmV4dCB2ZXJzaW9uLCB1c2UgeyNpbmMgfSBpbnN0ZWFkXG4gIFxuICBpZiggY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoICl7XG4gICAgZ3JvdXAgPSB0aGlzLiRjb21waWxlKGNoaWxkcmVuLCB7b3V0ZXI6IG9wdGlvbnMub3V0ZXIsbmFtZXNwYWNlOiBuYW1lc3BhY2UsIGV4dHJhOiBleHRyYSB9KTtcbiAgfVxuXG4gIGVsZW1lbnQgPSBkb20uY3JlYXRlKHRhZywgbmFtZXNwYWNlLCBhdHRycyk7XG5cbiAgaWYoZ3JvdXAgJiYgIV8uaXNWb2lkVGFnKHRhZykpe1xuICAgIGRvbS5pbmplY3QoIGNvbWJpbmUubm9kZShncm91cCkgLCBlbGVtZW50KVxuICB9XG5cbiAgLy8gc29ydCBiZWZvcmVcbiAgaWYoIWFzdC50b3VjaGVkKXtcbiAgICBhdHRycy5zb3J0KGZ1bmN0aW9uKGExLCBhMil7XG4gICAgICB2YXIgZDEgPSBDb25zdHJ1Y3Rvci5kaXJlY3RpdmUoYTEubmFtZSksXG4gICAgICAgIGQyID0gQ29uc3RydWN0b3IuZGlyZWN0aXZlKGEyLm5hbWUpO1xuICAgICAgaWYoIGQxICYmIGQyICkgcmV0dXJuIChkMi5wcmlvcml0eSB8fCAxKSAtIChkMS5wcmlvcml0eSB8fCAxKTtcbiAgICAgIGlmKGQxKSByZXR1cm4gMTtcbiAgICAgIGlmKGQyKSByZXR1cm4gLTE7XG4gICAgICBpZihhMi5uYW1lID09PSBcInR5cGVcIikgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSlcbiAgICBhc3QudG91Y2hlZCA9IHRydWU7XG4gIH1cbiAgLy8gbWF5IGRpc3RpbmN0IHdpdGggaWYgZWxzZVxuICB2YXIgZGVzdHJvaWVzID0gd2Fsa0F0dHJpYnV0ZXMuY2FsbCh0aGlzLCBhdHRycywgZWxlbWVudCwgZXh0cmEpO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJlbGVtZW50XCIsXG4gICAgZ3JvdXA6IGdyb3VwLFxuICAgIG5vZGU6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9LFxuICAgIGxhc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKGZpcnN0KXtcbiAgICAgIGlmKCBmaXJzdCApe1xuICAgICAgICBhbmltYXRlLnJlbW92ZSggZWxlbWVudCwgZ3JvdXA/IGdyb3VwLmRlc3Ryb3kuYmluZCggZ3JvdXAgKTogXy5ub29wICk7XG4gICAgICB9ZWxzZSBpZihncm91cCkge1xuICAgICAgICBncm91cC5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICAvLyBkZXN0cm95IHJlZlxuICAgICAgaWYoIGRlc3Ryb2llcy5sZW5ndGggKSB7XG4gICAgICAgIGRlc3Ryb2llcy5mb3JFYWNoKGZ1bmN0aW9uKCBkZXN0cm95ICl7XG4gICAgICAgICAgaWYoIGRlc3Ryb3kgKXtcbiAgICAgICAgICAgIGlmKCB0eXBlb2YgZGVzdHJveS5kZXN0cm95ID09PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgIGRlc3Ryb3kuZGVzdHJveSgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxud2Fsa2Vycy5jb21wb25lbnQgPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICB2YXIgYXR0cnMgPSBhc3QuYXR0cnMsIFxuICAgIENvbXBvbmVudCA9IG9wdGlvbnMuQ29tcG9uZW50LFxuICAgIENvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcixcbiAgICBpc29sYXRlLCBcbiAgICBleHRyYSA9IG9wdGlvbnMuZXh0cmEsXG4gICAgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsXG4gICAgcmVmLCBzZWxmID0gdGhpcywgaXM7XG5cbiAgdmFyIGRhdGEgPSB7fSwgZXZlbnRzO1xuXG4gIGZvcih2YXIgaSA9IDAsIGxlbiA9IGF0dHJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICB2YXIgYXR0ciA9IGF0dHJzW2ldO1xuICAgIC8vIGNvbnNpZGVyIGRpc2FibGVkICAgZXF1bGFzdG8gIGRpc2FibGVkPXt0cnVlfVxuICAgIHZhciB2YWx1ZSA9IHRoaXMuX3RvdWNoRXhwcihhdHRyLnZhbHVlID09PSB1bmRlZmluZWQ/IHRydWU6IGF0dHIudmFsdWUpO1xuICAgIGlmKHZhbHVlLmNvbnN0YW50KSB2YWx1ZSA9IGF0dHIudmFsdWUgPSB2YWx1ZS5nZXQodGhpcyk7XG4gICAgaWYoYXR0ci52YWx1ZSAmJiBhdHRyLnZhbHVlLmNvbnN0YW50ID09PSB0cnVlKXtcbiAgICAgIHZhbHVlID0gdmFsdWUuZ2V0KHRoaXMpO1xuICAgIH1cbiAgICB2YXIgbmFtZSA9IGF0dHIubmFtZTtcbiAgICBpZighYXR0ci5ldmVudCl7XG4gICAgICB2YXIgZXRlc3QgPSBuYW1lLm1hdGNoKGV2ZW50UmVnKTtcbiAgICAgIC8vIGV2ZW50OiAnbmF2J1xuICAgICAgaWYoZXRlc3QpIGF0dHIuZXZlbnQgPSBldGVzdFsxXTtcbiAgICB9XG5cbiAgICAvLyBAY29tcGlsZSBtb2RpZmllclxuICAgIGlmKGF0dHIubWRmID09PSAnY21wbCcpe1xuICAgICAgdmFsdWUgPSBfLmdldENvbXBpbGVGbih2YWx1ZSwgdGhpcywge1xuICAgICAgICByZWNvcmQ6IHRydWUsIFxuICAgICAgICBuYW1lc3BhY2U6bmFtZXNwYWNlLCBcbiAgICAgICAgZXh0cmE6IGV4dHJhLCBcbiAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXJcbiAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIC8vIEBpZiBpcyByLWNvbXBvbmVudCAuIHdlIG5lZWQgdG8gZmluZCB0aGUgdGFyZ2V0IENvbXBvbmVudFxuICAgIGlmKG5hbWUgPT09ICdpcycgJiYgIUNvbXBvbmVudCl7XG4gICAgICBpcyA9IHZhbHVlO1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSB0aGlzLiRnZXQodmFsdWUsIHRydWUpO1xuICAgICAgQ29tcG9uZW50ID0gQ29uc3RydWN0b3IuY29tcG9uZW50KGNvbXBvbmVudE5hbWUpXG4gICAgICBpZih0eXBlb2YgQ29tcG9uZW50ICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoXCJjb21wb25lbnQgXCIgKyBjb21wb25lbnROYW1lICsgXCIgaGFzIG5vdCByZWdpc3RlZCFcIik7XG4gICAgfVxuICAgIC8vIGJpbmQgZXZlbnQgcHJveHlcbiAgICB2YXIgZXZlbnROYW1lO1xuICAgIGlmKGV2ZW50TmFtZSA9IGF0dHIuZXZlbnQpe1xuICAgICAgZXZlbnRzID0gZXZlbnRzIHx8IHt9O1xuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBfLmhhbmRsZUV2ZW50LmNhbGwodGhpcywgdmFsdWUsIGV2ZW50TmFtZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9ZWxzZSB7XG4gICAgICBuYW1lID0gYXR0ci5uYW1lID0gXy5jYW1lbENhc2UobmFtZSk7XG4gICAgfVxuXG4gICAgaWYodmFsdWUudHlwZSAhPT0gJ2V4cHJlc3Npb24nKXtcbiAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcbiAgICB9ZWxzZXtcbiAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZS5nZXQoc2VsZik7IFxuICAgIH1cbiAgICBpZiggbmFtZSA9PT0gJ3JlZicgICYmIHZhbHVlICE9IG51bGwpe1xuICAgICAgcmVmID0gdmFsdWVcbiAgICB9XG4gICAgaWYoIG5hbWUgPT09ICdpc29sYXRlJyl7XG4gICAgICAvLyAxOiBzdG9wOiBjb21wb3NpdGUgLT4gcGFyZW50XG4gICAgICAvLyAyLiBzdG9wOiBjb21wb3NpdGUgPC0gcGFyZW50XG4gICAgICAvLyAzLiBzdG9wIDEgYW5kIDI6IGNvbXBvc2l0ZSA8LT4gcGFyZW50XG4gICAgICAvLyAwLiBzdG9wIG5vdGhpbmcgKGRlZnVhbHQpXG4gICAgICBpc29sYXRlID0gdmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nPyB2YWx1ZS5nZXQoc2VsZik6IHBhcnNlSW50KHZhbHVlID09PSB0cnVlPyAzOiB2YWx1ZSwgMTApO1xuICAgICAgZGF0YS5pc29sYXRlID0gaXNvbGF0ZTtcbiAgICB9XG4gIH1cblxuICB2YXIgZGVmaW5pdGlvbiA9IHsgXG4gICAgZGF0YTogZGF0YSwgXG4gICAgZXZlbnRzOiBldmVudHMsIFxuICAgICRwYXJlbnQ6IHRoaXMsXG4gICAgJHJvb3Q6IHRoaXMuJHJvb3QsXG4gICAgJG91dGVyOiBvcHRpb25zLm91dGVyLFxuICAgIF9ib2R5OiBhc3QuY2hpbGRyZW5cbiAgfVxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZSwgXG4gICAgZXh0cmE6IG9wdGlvbnMuZXh0cmFcbiAgfVxuXG5cbiAgdmFyIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQoZGVmaW5pdGlvbiwgb3B0aW9ucyksIHJlZmxpbms7XG5cblxuICBpZihyZWYgJiYgdGhpcy4kcmVmcyl7XG4gICAgcmVmbGluayA9IENvbXBvbmVudC5kaXJlY3RpdmUoJ3JlZicpLmxpbmtcbiAgICB0aGlzLiRvbignJGRlc3Ryb3knLCByZWZsaW5rLmNhbGwodGhpcywgY29tcG9uZW50LCByZWYpIClcbiAgfVxuICBpZihyZWYgJiYgIHNlbGYuJHJlZnMpIHNlbGYuJHJlZnNbcmVmXSA9IGNvbXBvbmVudDtcbiAgZm9yKHZhciBpID0gMCwgbGVuID0gYXR0cnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG4gICAgdmFyIHZhbHVlID0gYXR0ci52YWx1ZXx8dHJ1ZTtcbiAgICB2YXIgbmFtZSA9IGF0dHIubmFtZTtcbiAgICAvLyBuZWVkIGNvbXBpbGVkXG4gICAgaWYodmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nICYmICFhdHRyLmV2ZW50KXtcbiAgICAgIHZhbHVlID0gc2VsZi5fdG91Y2hFeHByKHZhbHVlKTtcbiAgICAgIC8vIHVzZSBiaXQgb3BlcmF0ZSB0byBjb250cm9sIHNjb3BlXG4gICAgICBpZiggIShpc29sYXRlICYgMikgKSBcbiAgICAgICAgdGhpcy4kd2F0Y2godmFsdWUsIGNvbXBvbmVudC4kdXBkYXRlLmJpbmQoY29tcG9uZW50LCBuYW1lKSlcbiAgICAgIGlmKCB2YWx1ZS5zZXQgJiYgIShpc29sYXRlICYgMSApICkgXG4gICAgICAgIC8vIHN5bmMgdGhlIGRhdGEuIGl0IGZvcmNlIHRoZSBjb21wb25lbnQgZG9uJ3QgdHJpZ2dlciBhdHRyLm5hbWUncyBmaXJzdCBkaXJ0eSBlY2hlY2tcbiAgICAgICAgY29tcG9uZW50LiR3YXRjaChuYW1lLCBzZWxmLiR1cGRhdGUuYmluZChzZWxmLCB2YWx1ZSksIHtzeW5jOiB0cnVlfSk7XG4gICAgfVxuICB9XG4gIGlmKGlzICYmIGlzLnR5cGUgPT09ICdleHByZXNzaW9uJyAgKXtcbiAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICBncm91cC5wdXNoKGNvbXBvbmVudCk7XG4gICAgdGhpcy4kd2F0Y2goaXMsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIC8vIGZvdW5kIHRoZSBuZXcgY29tcG9uZW50XG4gICAgICB2YXIgQ29tcG9uZW50ID0gQ29uc3RydWN0b3IuY29tcG9uZW50KHZhbHVlKTtcbiAgICAgIGlmKCFDb21wb25lbnQpIHRocm93IG5ldyBFcnJvcihcImNvbXBvbmVudCBcIiArIHZhbHVlICsgXCIgaGFzIG5vdCByZWdpc3RlZCFcIik7XG4gICAgICB2YXIgbmNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQoZGVmaW5pdGlvbik7XG4gICAgICB2YXIgY29tcG9uZW50ID0gZ3JvdXAuY2hpbGRyZW4ucG9wKCk7XG4gICAgICBncm91cC5wdXNoKG5jb21wb25lbnQpO1xuICAgICAgbmNvbXBvbmVudC4kaW5qZWN0KGNvbWJpbmUubGFzdChjb21wb25lbnQpLCAnYWZ0ZXInKVxuICAgICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIC8vIEBUT0RPICBpZiBjb21wb25lbnQgY2hhbmdlZCAsIHdlIG5lZWQgdXBkYXRlIHJlZlxuICAgICAgaWYocmVmKXtcbiAgICAgICAgc2VsZi4kcmVmc1tyZWZdID0gbmNvbXBvbmVudDtcbiAgICAgIH1cbiAgICB9LCB7c3luYzogdHJ1ZX0pXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG4gIHJldHVybiBjb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIHdhbGtBdHRyaWJ1dGVzKGF0dHJzLCBlbGVtZW50LCBleHRyYSl7XG4gIHZhciBiaW5kaW5ncyA9IFtdXG4gIGZvcih2YXIgaSA9IDAsIGxlbiA9IGF0dHJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICB2YXIgYmluZGluZyA9IHRoaXMuX3dhbGsoYXR0cnNbaV0sIHtlbGVtZW50OiBlbGVtZW50LCBmcm9tRWxlbWVudDogdHJ1ZSwgYXR0cnM6IGF0dHJzLCBleHRyYTogZXh0cmF9KVxuICAgIGlmKGJpbmRpbmcpIGJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gIH1cbiAgcmV0dXJuIGJpbmRpbmdzO1xufVxuXG53YWxrZXJzLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGFzdCAsb3B0aW9ucyl7XG5cbiAgdmFyIGF0dHIgPSBhc3Q7XG4gIHZhciBuYW1lID0gYXR0ci5uYW1lO1xuICB2YXIgdmFsdWUgPSBhdHRyLnZhbHVlIHx8IFwiXCI7XG4gIHZhciBjb25zdGFudCA9IHZhbHVlLmNvbnN0YW50O1xuICB2YXIgQ29tcG9uZW50ID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgdmFyIGRpcmVjdGl2ZSA9IENvbXBvbmVudC5kaXJlY3RpdmUobmFtZSk7XG4gIHZhciBlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50O1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuICB2YWx1ZSA9IHRoaXMuX3RvdWNoRXhwcih2YWx1ZSk7XG5cbiAgaWYoY29uc3RhbnQpIHZhbHVlID0gdmFsdWUuZ2V0KHRoaXMpO1xuXG4gIGlmKGRpcmVjdGl2ZSAmJiBkaXJlY3RpdmUubGluayl7XG4gICAgdmFyIGJpbmRpbmcgPSBkaXJlY3RpdmUubGluay5jYWxsKHNlbGYsIGVsZW1lbnQsIHZhbHVlLCBuYW1lLCBvcHRpb25zLmF0dHJzKTtcbiAgICBpZih0eXBlb2YgYmluZGluZyA9PT0gJ2Z1bmN0aW9uJykgYmluZGluZyA9IHtkZXN0cm95OiBiaW5kaW5nfTsgXG4gICAgcmV0dXJuIGJpbmRpbmc7XG4gIH0gZWxzZXtcbiAgICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicgKXtcbiAgICAgIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUsIG9sZCl7XG4gICAgICAgIGRvbS5hdHRyKGVsZW1lbnQsIG5hbWUsIG52YWx1ZSk7XG4gICAgICB9LCB7aW5pdDogdHJ1ZX0pO1xuICAgIH1lbHNle1xuICAgICAgaWYoXy5pc0Jvb2xlYW5BdHRyKG5hbWUpKXtcbiAgICAgICAgZG9tLmF0dHIoZWxlbWVudCwgbmFtZSwgdHJ1ZSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZG9tLmF0dHIoZWxlbWVudCwgbmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZighb3B0aW9ucy5mcm9tRWxlbWVudCl7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpe1xuICAgICAgICAgIGRvbS5hdHRyKGVsZW1lbnQsIG5hbWUsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxuIiwiLyohXG4gICogUmVxd2VzdCEgQSBnZW5lcmFsIHB1cnBvc2UgWEhSIGNvbm5lY3Rpb24gbWFuYWdlclxuICAqIGxpY2Vuc2UgTUlUIChjKSBEdXN0aW4gRGlheiAyMDE0XG4gICogaHR0cHM6Ly9naXRodWIuY29tL2RlZC9yZXF3ZXN0XG4gICovXG5cbiFmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0oJ3JlcXdlc3QnLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHdpbiA9IHdpbmRvd1xuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGh0dHBzUmUgPSAvXmh0dHAvXG4gICAgLCBwcm90b2NvbFJlID0gLyheXFx3Kyk6XFwvXFwvL1xuICAgICwgdHdvSHVuZG8gPSAvXigyMFxcZHwxMjIzKSQvIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XG4gICAgLCBieVRhZyA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSdcbiAgICAsIHJlYWR5U3RhdGUgPSAncmVhZHlTdGF0ZSdcbiAgICAsIGNvbnRlbnRUeXBlID0gJ0NvbnRlbnQtVHlwZSdcbiAgICAsIHJlcXVlc3RlZFdpdGggPSAnWC1SZXF1ZXN0ZWQtV2l0aCdcbiAgICAsIGhlYWQgPSBkb2NbYnlUYWddKCdoZWFkJylbMF1cbiAgICAsIHVuaXFpZCA9IDBcbiAgICAsIGNhbGxiYWNrUHJlZml4ID0gJ3JlcXdlc3RfJyArICgrbmV3IERhdGUoKSlcbiAgICAsIGxhc3RWYWx1ZSAvLyBkYXRhIHN0b3JlZCBieSB0aGUgbW9zdCByZWNlbnQgSlNPTlAgY2FsbGJhY2tcbiAgICAsIHhtbEh0dHBSZXF1ZXN0ID0gJ1hNTEh0dHBSZXF1ZXN0J1xuICAgICwgeERvbWFpblJlcXVlc3QgPSAnWERvbWFpblJlcXVlc3QnXG4gICAgLCBub29wID0gZnVuY3Rpb24gKCkge31cblxuICAgICwgaXNBcnJheSA9IHR5cGVvZiBBcnJheS5pc0FycmF5ID09ICdmdW5jdGlvbidcbiAgICAgICAgPyBBcnJheS5pc0FycmF5XG4gICAgICAgIDogZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICB9XG5cbiAgICAsIGRlZmF1bHRIZWFkZXJzID0ge1xuICAgICAgICAgICdjb250ZW50VHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICwgJ3JlcXVlc3RlZFdpdGgnOiB4bWxIdHRwUmVxdWVzdFxuICAgICAgICAsICdhY2NlcHQnOiB7XG4gICAgICAgICAgICAgICcqJzogICd0ZXh0L2phdmFzY3JpcHQsIHRleHQvaHRtbCwgYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbCwgKi8qJ1xuICAgICAgICAgICAgLCAneG1sJzogICdhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sJ1xuICAgICAgICAgICAgLCAnaHRtbCc6ICd0ZXh0L2h0bWwnXG4gICAgICAgICAgICAsICd0ZXh0JzogJ3RleHQvcGxhaW4nXG4gICAgICAgICAgICAsICdqc29uJzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdCdcbiAgICAgICAgICAgICwgJ2pzJzogICAnYXBwbGljYXRpb24vamF2YXNjcmlwdCwgdGV4dC9qYXZhc2NyaXB0J1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICwgeGhyID0gZnVuY3Rpb24obykge1xuICAgICAgICAvLyBpcyBpdCB4LWRvbWFpblxuICAgICAgICBpZiAob1snY3Jvc3NPcmlnaW4nXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHZhciB4aHIgPSB3aW5beG1sSHR0cFJlcXVlc3RdID8gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgOiBudWxsXG4gICAgICAgICAgaWYgKHhociAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgICAgIHJldHVybiB4aHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpblt4RG9tYWluUmVxdWVzdF0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcy1vcmlnaW4gcmVxdWVzdHMnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh3aW5beG1sSHR0cFJlcXVlc3RdKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAsIGdsb2JhbFNldHVwT3B0aW9ucyA9IHtcbiAgICAgICAgZGF0YUZpbHRlcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgZnVuY3Rpb24gc3VjY2VlZChyKSB7XG4gICAgdmFyIHByb3RvY29sID0gcHJvdG9jb2xSZS5leGVjKHIudXJsKTtcbiAgICBwcm90b2NvbCA9IChwcm90b2NvbCAmJiBwcm90b2NvbFsxXSkgfHwgd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgIHJldHVybiBodHRwc1JlLnRlc3QocHJvdG9jb2wpID8gdHdvSHVuZG8udGVzdChyLnJlcXVlc3Quc3RhdHVzKSA6ICEhci5yZXF1ZXN0LnJlc3BvbnNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUmVhZHlTdGF0ZShyLCBzdWNjZXNzLCBlcnJvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyB1c2UgX2Fib3J0ZWQgdG8gbWl0aWdhdGUgYWdhaW5zdCBJRSBlcnIgYzAwYzAyM2ZcbiAgICAgIC8vIChjYW4ndCByZWFkIHByb3BzIG9uIGFib3J0ZWQgcmVxdWVzdCBvYmplY3RzKVxuICAgICAgaWYgKHIuX2Fib3J0ZWQpIHJldHVybiBlcnJvcihyLnJlcXVlc3QpXG4gICAgICBpZiAoci5fdGltZWRPdXQpIHJldHVybiBlcnJvcihyLnJlcXVlc3QsICdSZXF1ZXN0IGlzIGFib3J0ZWQ6IHRpbWVvdXQnKVxuICAgICAgaWYgKHIucmVxdWVzdCAmJiByLnJlcXVlc3RbcmVhZHlTdGF0ZV0gPT0gNCkge1xuICAgICAgICByLnJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gbm9vcFxuICAgICAgICBpZiAoc3VjY2VlZChyKSkgc3VjY2VzcyhyLnJlcXVlc3QpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBlcnJvcihyLnJlcXVlc3QpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SGVhZGVycyhodHRwLCBvKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBvWydoZWFkZXJzJ10gfHwge31cbiAgICAgICwgaFxuXG4gICAgaGVhZGVyc1snQWNjZXB0J10gPSBoZWFkZXJzWydBY2NlcHQnXVxuICAgICAgfHwgZGVmYXVsdEhlYWRlcnNbJ2FjY2VwdCddW29bJ3R5cGUnXV1cbiAgICAgIHx8IGRlZmF1bHRIZWFkZXJzWydhY2NlcHQnXVsnKiddXG5cbiAgICB2YXIgaXNBRm9ybURhdGEgPSB0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgKG9bJ2RhdGEnXSBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbiAgICAvLyBicmVha3MgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzIHdpdGggbGVnYWN5IGJyb3dzZXJzXG4gICAgaWYgKCFvWydjcm9zc09yaWdpbiddICYmICFoZWFkZXJzW3JlcXVlc3RlZFdpdGhdKSBoZWFkZXJzW3JlcXVlc3RlZFdpdGhdID0gZGVmYXVsdEhlYWRlcnNbJ3JlcXVlc3RlZFdpdGgnXVxuICAgIGlmICghaGVhZGVyc1tjb250ZW50VHlwZV0gJiYgIWlzQUZvcm1EYXRhKSBoZWFkZXJzW2NvbnRlbnRUeXBlXSA9IG9bJ2NvbnRlbnRUeXBlJ10gfHwgZGVmYXVsdEhlYWRlcnNbJ2NvbnRlbnRUeXBlJ11cbiAgICBmb3IgKGggaW4gaGVhZGVycylcbiAgICAgIGhlYWRlcnMuaGFzT3duUHJvcGVydHkoaCkgJiYgJ3NldFJlcXVlc3RIZWFkZXInIGluIGh0dHAgJiYgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyKGgsIGhlYWRlcnNbaF0pXG4gIH1cblxuICBmdW5jdGlvbiBzZXRDcmVkZW50aWFscyhodHRwLCBvKSB7XG4gICAgaWYgKHR5cGVvZiBvWyd3aXRoQ3JlZGVudGlhbHMnXSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGh0dHAud2l0aENyZWRlbnRpYWxzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cC53aXRoQ3JlZGVudGlhbHMgPSAhIW9bJ3dpdGhDcmVkZW50aWFscyddXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhbENhbGxiYWNrKGRhdGEpIHtcbiAgICBsYXN0VmFsdWUgPSBkYXRhXG4gIH1cblxuICBmdW5jdGlvbiB1cmxhcHBlbmQgKHVybCwgcykge1xuICAgIHJldHVybiB1cmwgKyAoL1xcPy8udGVzdCh1cmwpID8gJyYnIDogJz8nKSArIHNcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUpzb25wKG8sIGZuLCBlcnIsIHVybCkge1xuICAgIHZhciByZXFJZCA9IHVuaXFpZCsrXG4gICAgICAsIGNia2V5ID0gb1snanNvbnBDYWxsYmFjayddIHx8ICdjYWxsYmFjaycgLy8gdGhlICdjYWxsYmFjaycga2V5XG4gICAgICAsIGNidmFsID0gb1snanNvbnBDYWxsYmFja05hbWUnXSB8fCByZXF3ZXN0LmdldGNhbGxiYWNrUHJlZml4KHJlcUlkKVxuICAgICAgLCBjYnJlZyA9IG5ldyBSZWdFeHAoJygoXnxcXFxcP3wmKScgKyBjYmtleSArICcpPShbXiZdKyknKVxuICAgICAgLCBtYXRjaCA9IHVybC5tYXRjaChjYnJlZylcbiAgICAgICwgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgICAsIGxvYWRlZCA9IDBcbiAgICAgICwgaXNJRTEwID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFIDEwLjAnKSAhPT0gLTFcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgaWYgKG1hdGNoWzNdID09PSAnPycpIHtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoY2JyZWcsICckMT0nICsgY2J2YWwpIC8vIHdpbGRjYXJkIGNhbGxiYWNrIGZ1bmMgbmFtZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2J2YWwgPSBtYXRjaFszXSAvLyBwcm92aWRlZCBjYWxsYmFjayBmdW5jIG5hbWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdXJsYXBwZW5kKHVybCwgY2JrZXkgKyAnPScgKyBjYnZhbCkgLy8gbm8gY2FsbGJhY2sgZGV0YWlscywgYWRkICdlbVxuICAgIH1cblxuICAgIHdpbltjYnZhbF0gPSBnZW5lcmFsQ2FsbGJhY2tcblxuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICBzY3JpcHQuc3JjID0gdXJsXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZVxuICAgIGlmICh0eXBlb2Ygc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzSUUxMCkge1xuICAgICAgLy8gbmVlZCB0aGlzIGZvciBJRSBkdWUgdG8gb3V0LW9mLW9yZGVyIG9ucmVhZHlzdGF0ZWNoYW5nZSgpLCBiaW5kaW5nIHNjcmlwdFxuICAgICAgLy8gZXhlY3V0aW9uIHRvIGFuIGV2ZW50IGxpc3RlbmVyIGdpdmVzIHVzIGNvbnRyb2wgb3ZlciB3aGVuIHRoZSBzY3JpcHRcbiAgICAgIC8vIGlzIGV4ZWN1dGVkLiBTZWUgaHR0cDovL2phdWJvdXJnLm5ldC8yMDEwLzA3L2xvYWRpbmctc2NyaXB0LWFzLW9uY2xpY2staGFuZGxlci1vZi5odG1sXG4gICAgICBzY3JpcHQuaHRtbEZvciA9IHNjcmlwdC5pZCA9ICdfcmVxd2VzdF8nICsgcmVxSWRcbiAgICB9XG5cbiAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgoc2NyaXB0W3JlYWR5U3RhdGVdICYmIHNjcmlwdFtyZWFkeVN0YXRlXSAhPT0gJ2NvbXBsZXRlJyAmJiBzY3JpcHRbcmVhZHlTdGF0ZV0gIT09ICdsb2FkZWQnKSB8fCBsb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGxcbiAgICAgIHNjcmlwdC5vbmNsaWNrICYmIHNjcmlwdC5vbmNsaWNrKClcbiAgICAgIC8vIENhbGwgdGhlIHVzZXIgY2FsbGJhY2sgd2l0aCB0aGUgbGFzdCB2YWx1ZSBzdG9yZWQgYW5kIGNsZWFuIHVwIHZhbHVlcyBhbmQgc2NyaXB0cy5cbiAgICAgIGZuKGxhc3RWYWx1ZSlcbiAgICAgIGxhc3RWYWx1ZSA9IHVuZGVmaW5lZFxuICAgICAgaGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpXG4gICAgICBsb2FkZWQgPSAxXG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBzY3JpcHQgdG8gdGhlIERPTSBoZWFkXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpXG5cbiAgICAvLyBFbmFibGUgSlNPTlAgdGltZW91dFxuICAgIHJldHVybiB7XG4gICAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGxcbiAgICAgICAgZXJyKHt9LCAnUmVxdWVzdCBpcyBhYm9ydGVkOiB0aW1lb3V0Jywge30pXG4gICAgICAgIGxhc3RWYWx1ZSA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkLnJlbW92ZUNoaWxkKHNjcmlwdClcbiAgICAgICAgbG9hZGVkID0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJlcXVlc3QoZm4sIGVycikge1xuICAgIHZhciBvID0gdGhpcy5vXG4gICAgICAsIG1ldGhvZCA9IChvWydtZXRob2QnXSB8fCAnR0VUJykudG9VcHBlckNhc2UoKVxuICAgICAgLCB1cmwgPSB0eXBlb2YgbyA9PT0gJ3N0cmluZycgPyBvIDogb1sndXJsJ11cbiAgICAgIC8vIGNvbnZlcnQgbm9uLXN0cmluZyBvYmplY3RzIHRvIHF1ZXJ5LXN0cmluZyBmb3JtIHVubGVzcyBvWydwcm9jZXNzRGF0YSddIGlzIGZhbHNlXG4gICAgICAsIGRhdGEgPSAob1sncHJvY2Vzc0RhdGEnXSAhPT0gZmFsc2UgJiYgb1snZGF0YSddICYmIHR5cGVvZiBvWydkYXRhJ10gIT09ICdzdHJpbmcnKVxuICAgICAgICA/IHJlcXdlc3QudG9RdWVyeVN0cmluZyhvWydkYXRhJ10pXG4gICAgICAgIDogKG9bJ2RhdGEnXSB8fCBudWxsKVxuICAgICAgLCBodHRwXG4gICAgICAsIHNlbmRXYWl0ID0gZmFsc2VcblxuICAgIC8vIGlmIHdlJ3JlIHdvcmtpbmcgb24gYSBHRVQgcmVxdWVzdCBhbmQgd2UgaGF2ZSBkYXRhIHRoZW4gd2Ugc2hvdWxkIGFwcGVuZFxuICAgIC8vIHF1ZXJ5IHN0cmluZyB0byBlbmQgb2YgVVJMIGFuZCBub3QgcG9zdCBkYXRhXG4gICAgaWYgKChvWyd0eXBlJ10gPT0gJ2pzb25wJyB8fCBtZXRob2QgPT0gJ0dFVCcpICYmIGRhdGEpIHtcbiAgICAgIHVybCA9IHVybGFwcGVuZCh1cmwsIGRhdGEpXG4gICAgICBkYXRhID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChvWyd0eXBlJ10gPT0gJ2pzb25wJykgcmV0dXJuIGhhbmRsZUpzb25wKG8sIGZuLCBlcnIsIHVybClcblxuICAgIC8vIGdldCB0aGUgeGhyIGZyb20gdGhlIGZhY3RvcnkgaWYgcGFzc2VkXG4gICAgLy8gaWYgdGhlIGZhY3RvcnkgcmV0dXJucyBudWxsLCBmYWxsLWJhY2sgdG8gb3Vyc1xuICAgIGh0dHAgPSAoby54aHIgJiYgby54aHIobykpIHx8IHhocihvKVxuXG4gICAgaHR0cC5vcGVuKG1ldGhvZCwgdXJsLCBvWydhc3luYyddID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSlcbiAgICBzZXRIZWFkZXJzKGh0dHAsIG8pXG4gICAgc2V0Q3JlZGVudGlhbHMoaHR0cCwgbylcbiAgICBpZiAod2luW3hEb21haW5SZXF1ZXN0XSAmJiBodHRwIGluc3RhbmNlb2Ygd2luW3hEb21haW5SZXF1ZXN0XSkge1xuICAgICAgICBodHRwLm9ubG9hZCA9IGZuXG4gICAgICAgIGh0dHAub25lcnJvciA9IGVyclxuICAgICAgICAvLyBOT1RFOiBzZWVcbiAgICAgICAgLy8gaHR0cDovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL2lld2ViZGV2ZWxvcG1lbnQvdGhyZWFkLzMwZWYzYWRkLTc2N2MtNDQzNi1iOGE5LWYxY2ExOWI0ODEyZVxuICAgICAgICBodHRwLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHt9XG4gICAgICAgIHNlbmRXYWl0ID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZVJlYWR5U3RhdGUodGhpcywgZm4sIGVycilcbiAgICB9XG4gICAgb1snYmVmb3JlJ10gJiYgb1snYmVmb3JlJ10oaHR0cClcbiAgICBpZiAoc2VuZFdhaXQpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBodHRwLnNlbmQoZGF0YSlcbiAgICAgIH0sIDIwMClcbiAgICB9IGVsc2Uge1xuICAgICAgaHR0cC5zZW5kKGRhdGEpXG4gICAgfVxuICAgIHJldHVybiBodHRwXG4gIH1cblxuICBmdW5jdGlvbiBSZXF3ZXN0KG8sIGZuKSB7XG4gICAgdGhpcy5vID0gb1xuICAgIHRoaXMuZm4gPSBmblxuXG4gICAgaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiBzZXRUeXBlKGhlYWRlcikge1xuICAgIC8vIGpzb24sIGphdmFzY3JpcHQsIHRleHQvcGxhaW4sIHRleHQvaHRtbCwgeG1sXG4gICAgaWYgKGhlYWRlci5tYXRjaCgnanNvbicpKSByZXR1cm4gJ2pzb24nXG4gICAgaWYgKGhlYWRlci5tYXRjaCgnamF2YXNjcmlwdCcpKSByZXR1cm4gJ2pzJ1xuICAgIGlmIChoZWFkZXIubWF0Y2goJ3RleHQnKSkgcmV0dXJuICdodG1sJ1xuICAgIGlmIChoZWFkZXIubWF0Y2goJ3htbCcpKSByZXR1cm4gJ3htbCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQobywgZm4pIHtcblxuICAgIHRoaXMudXJsID0gdHlwZW9mIG8gPT0gJ3N0cmluZycgPyBvIDogb1sndXJsJ11cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsXG5cbiAgICAvLyB3aGV0aGVyIHJlcXVlc3QgaGFzIGJlZW4gZnVsZmlsbGVkIGZvciBwdXJwb3NlXG4gICAgLy8gb2YgdHJhY2tpbmcgdGhlIFByb21pc2VzXG4gICAgdGhpcy5fZnVsZmlsbGVkID0gZmFsc2VcbiAgICAvLyBzdWNjZXNzIGhhbmRsZXJzXG4gICAgdGhpcy5fc3VjY2Vzc0hhbmRsZXIgPSBmdW5jdGlvbigpe31cbiAgICB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXJzID0gW11cbiAgICAvLyBlcnJvciBoYW5kbGVyc1xuICAgIHRoaXMuX2Vycm9ySGFuZGxlcnMgPSBbXVxuICAgIC8vIGNvbXBsZXRlIChib3RoIHN1Y2Nlc3MgYW5kIGZhaWwpIGhhbmRsZXJzXG4gICAgdGhpcy5fY29tcGxldGVIYW5kbGVycyA9IFtdXG4gICAgdGhpcy5fZXJyZWQgPSBmYWxzZVxuICAgIHRoaXMuX3Jlc3BvbnNlQXJncyA9IHt9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXNcblxuICAgIGZuID0gZm4gfHwgZnVuY3Rpb24gKCkge31cblxuICAgIGlmIChvWyd0aW1lb3V0J10pIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aW1lZE91dCgpXG4gICAgICB9LCBvWyd0aW1lb3V0J10pXG4gICAgfVxuXG4gICAgaWYgKG9bJ3N1Y2Nlc3MnXSkge1xuICAgICAgdGhpcy5fc3VjY2Vzc0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9bJ3N1Y2Nlc3MnXS5hcHBseShvLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9bJ2Vycm9yJ10pIHtcbiAgICAgIHRoaXMuX2Vycm9ySGFuZGxlcnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9bJ2Vycm9yJ10uYXBwbHkobywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAob1snY29tcGxldGUnXSkge1xuICAgICAgdGhpcy5fY29tcGxldGVIYW5kbGVycy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb1snY29tcGxldGUnXS5hcHBseShvLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlIChyZXNwKSB7XG4gICAgICBvWyd0aW1lb3V0J10gJiYgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcbiAgICAgIHNlbGYudGltZW91dCA9IG51bGxcbiAgICAgIHdoaWxlIChzZWxmLl9jb21wbGV0ZUhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2VsZi5fY29tcGxldGVIYW5kbGVycy5zaGlmdCgpKHJlc3ApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VjY2VzcyAocmVzcCkge1xuICAgICAgdmFyIHR5cGUgPSBvWyd0eXBlJ10gfHwgcmVzcCAmJiBzZXRUeXBlKHJlc3AuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpKSAvLyByZXNwIGNhbiBiZSB1bmRlZmluZWQgaW4gSUVcbiAgICAgIHJlc3AgPSAodHlwZSAhPT0gJ2pzb25wJykgPyBzZWxmLnJlcXVlc3QgOiByZXNwXG4gICAgICAvLyB1c2UgZ2xvYmFsIGRhdGEgZmlsdGVyIG9uIHJlc3BvbnNlIHRleHRcbiAgICAgIHZhciBmaWx0ZXJlZFJlc3BvbnNlID0gZ2xvYmFsU2V0dXBPcHRpb25zLmRhdGFGaWx0ZXIocmVzcC5yZXNwb25zZVRleHQsIHR5cGUpXG4gICAgICAgICwgciA9IGZpbHRlcmVkUmVzcG9uc2VcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3AucmVzcG9uc2VUZXh0ID0gclxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBjYW4ndCBhc3NpZ24gdGhpcyBpbiBJRTw9OCwganVzdCBpZ25vcmVcbiAgICAgIH1cbiAgICAgIGlmIChyKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcCA9IHdpbi5KU09OID8gd2luLkpTT04ucGFyc2UocikgOiBldmFsKCcoJyArIHIgKyAnKScpXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3IocmVzcCwgJ0NvdWxkIG5vdCBwYXJzZSBKU09OIGluIHJlc3BvbnNlJywgZXJyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdqcyc6XG4gICAgICAgICAgcmVzcCA9IGV2YWwocilcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgICByZXNwID0gclxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3htbCc6XG4gICAgICAgICAgcmVzcCA9IHJlc3AucmVzcG9uc2VYTUxcbiAgICAgICAgICAgICAgJiYgcmVzcC5yZXNwb25zZVhNTC5wYXJzZUVycm9yIC8vIElFIHRyb2xvbG9cbiAgICAgICAgICAgICAgJiYgcmVzcC5yZXNwb25zZVhNTC5wYXJzZUVycm9yLmVycm9yQ29kZVxuICAgICAgICAgICAgICAmJiByZXNwLnJlc3BvbnNlWE1MLnBhcnNlRXJyb3IucmVhc29uXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogcmVzcC5yZXNwb25zZVhNTFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLnJlc3AgPSByZXNwXG4gICAgICBzZWxmLl9mdWxmaWxsZWQgPSB0cnVlXG4gICAgICBmbihyZXNwKVxuICAgICAgc2VsZi5fc3VjY2Vzc0hhbmRsZXIocmVzcClcbiAgICAgIHdoaWxlIChzZWxmLl9mdWxmaWxsbWVudEhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzcCA9IHNlbGYuX2Z1bGZpbGxtZW50SGFuZGxlcnMuc2hpZnQoKShyZXNwKVxuICAgICAgfVxuXG4gICAgICBjb21wbGV0ZShyZXNwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVkT3V0KCkge1xuICAgICAgc2VsZi5fdGltZWRPdXQgPSB0cnVlXG4gICAgICBzZWxmLnJlcXVlc3QuYWJvcnQoKSAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yKHJlc3AsIG1zZywgdCkge1xuICAgICAgcmVzcCA9IHNlbGYucmVxdWVzdFxuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLnJlc3AgPSByZXNwXG4gICAgICBzZWxmLl9yZXNwb25zZUFyZ3MubXNnID0gbXNnXG4gICAgICBzZWxmLl9yZXNwb25zZUFyZ3MudCA9IHRcbiAgICAgIHNlbGYuX2VycmVkID0gdHJ1ZVxuICAgICAgd2hpbGUgKHNlbGYuX2Vycm9ySGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBzZWxmLl9lcnJvckhhbmRsZXJzLnNoaWZ0KCkocmVzcCwgbXNnLCB0KVxuICAgICAgfVxuICAgICAgY29tcGxldGUocmVzcClcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3QgPSBnZXRSZXF1ZXN0LmNhbGwodGhpcywgc3VjY2VzcywgZXJyb3IpXG4gIH1cblxuICBSZXF3ZXN0LnByb3RvdHlwZSA9IHtcbiAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fYWJvcnRlZCA9IHRydWVcbiAgICAgIHRoaXMucmVxdWVzdC5hYm9ydCgpXG4gICAgfVxuXG4gICwgcmV0cnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGluaXQuY2FsbCh0aGlzLCB0aGlzLm8sIHRoaXMuZm4pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU21hbGwgZGV2aWF0aW9uIGZyb20gdGhlIFByb21pc2VzIEEgQ29tbW9uSnMgc3BlY2lmaWNhdGlvblxuICAgICAqIGh0dHA6Ly93aWtpLmNvbW1vbmpzLm9yZy93aWtpL1Byb21pc2VzL0FcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIGB0aGVuYCB3aWxsIGV4ZWN1dGUgdXBvbiBzdWNjZXNzZnVsIHJlcXVlc3RzXG4gICAgICovXG4gICwgdGhlbjogZnVuY3Rpb24gKHN1Y2Nlc3MsIGZhaWwpIHtcbiAgICAgIHN1Y2Nlc3MgPSBzdWNjZXNzIHx8IGZ1bmN0aW9uICgpIHt9XG4gICAgICBmYWlsID0gZmFpbCB8fCBmdW5jdGlvbiAoKSB7fVxuICAgICAgaWYgKHRoaXMuX2Z1bGZpbGxlZCkge1xuICAgICAgICB0aGlzLl9yZXNwb25zZUFyZ3MucmVzcCA9IHN1Y2Nlc3ModGhpcy5fcmVzcG9uc2VBcmdzLnJlc3ApXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2VycmVkKSB7XG4gICAgICAgIGZhaWwodGhpcy5fcmVzcG9uc2VBcmdzLnJlc3AsIHRoaXMuX3Jlc3BvbnNlQXJncy5tc2csIHRoaXMuX3Jlc3BvbnNlQXJncy50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVycy5wdXNoKHN1Y2Nlc3MpXG4gICAgICAgIHRoaXMuX2Vycm9ySGFuZGxlcnMucHVzaChmYWlsKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBgYWx3YXlzYCB3aWxsIGV4ZWN1dGUgd2hldGhlciB0aGUgcmVxdWVzdCBzdWNjZWVkcyBvciBmYWlsc1xuICAgICAqL1xuICAsIGFsd2F5czogZnVuY3Rpb24gKGZuKSB7XG4gICAgICBpZiAodGhpcy5fZnVsZmlsbGVkIHx8IHRoaXMuX2VycmVkKSB7XG4gICAgICAgIGZuKHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY29tcGxldGVIYW5kbGVycy5wdXNoKGZuKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBgZmFpbGAgd2lsbCBleGVjdXRlIHdoZW4gdGhlIHJlcXVlc3QgZmFpbHNcbiAgICAgKi9cbiAgLCBmYWlsOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGlmICh0aGlzLl9lcnJlZCkge1xuICAgICAgICBmbih0aGlzLl9yZXNwb25zZUFyZ3MucmVzcCwgdGhpcy5fcmVzcG9uc2VBcmdzLm1zZywgdGhpcy5fcmVzcG9uc2VBcmdzLnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goZm4pXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgLCAnY2F0Y2gnOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiB0aGlzLmZhaWwoZm4pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVxd2VzdChvLCBmbikge1xuICAgIHJldHVybiBuZXcgUmVxd2VzdChvLCBmbilcbiAgfVxuXG4gIC8vIG5vcm1hbGl6ZSBuZXdsaW5lIHZhcmlhbnRzIGFjY29yZGluZyB0byBzcGVjIC0+IENSTEZcbiAgZnVuY3Rpb24gbm9ybWFsaXplKHMpIHtcbiAgICByZXR1cm4gcyA/IHMucmVwbGFjZSgvXFxyP1xcbi9nLCAnXFxyXFxuJykgOiAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gc2VyaWFsKGVsLCBjYikge1xuICAgIHZhciBuID0gZWwubmFtZVxuICAgICAgLCB0ID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIG9wdENiID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAvLyBJRSBnaXZlcyB2YWx1ZT1cIlwiIGV2ZW4gd2hlcmUgdGhlcmUgaXMgbm8gdmFsdWUgYXR0cmlidXRlXG4gICAgICAgICAgLy8gJ3NwZWNpZmllZCcgcmVmOiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1Db3JlL2NvcmUuaHRtbCNJRC04NjI1MjkyNzNcbiAgICAgICAgICBpZiAobyAmJiAhb1snZGlzYWJsZWQnXSlcbiAgICAgICAgICAgIGNiKG4sIG5vcm1hbGl6ZShvWydhdHRyaWJ1dGVzJ11bJ3ZhbHVlJ10gJiYgb1snYXR0cmlidXRlcyddWyd2YWx1ZSddWydzcGVjaWZpZWQnXSA/IG9bJ3ZhbHVlJ10gOiBvWyd0ZXh0J10pKVxuICAgICAgICB9XG4gICAgICAsIGNoLCByYSwgdmFsLCBpXG5cbiAgICAvLyBkb24ndCBzZXJpYWxpemUgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWJsZWQgb3Igd2l0aG91dCBhIG5hbWVcbiAgICBpZiAoZWwuZGlzYWJsZWQgfHwgIW4pIHJldHVyblxuXG4gICAgc3dpdGNoICh0KSB7XG4gICAgY2FzZSAnaW5wdXQnOlxuICAgICAgaWYgKCEvcmVzZXR8YnV0dG9ufGltYWdlfGZpbGUvaS50ZXN0KGVsLnR5cGUpKSB7XG4gICAgICAgIGNoID0gL2NoZWNrYm94L2kudGVzdChlbC50eXBlKVxuICAgICAgICByYSA9IC9yYWRpby9pLnRlc3QoZWwudHlwZSlcbiAgICAgICAgdmFsID0gZWwudmFsdWVcbiAgICAgICAgLy8gV2ViS2l0IGdpdmVzIHVzIFwiXCIgaW5zdGVhZCBvZiBcIm9uXCIgaWYgYSBjaGVja2JveCBoYXMgbm8gdmFsdWUsIHNvIGNvcnJlY3QgaXQgaGVyZVxuICAgICAgICA7KCEoY2ggfHwgcmEpIHx8IGVsLmNoZWNrZWQpICYmIGNiKG4sIG5vcm1hbGl6ZShjaCAmJiB2YWwgPT09ICcnID8gJ29uJyA6IHZhbCkpXG4gICAgICB9XG4gICAgICBicmVha1xuICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgIGNiKG4sIG5vcm1hbGl6ZShlbC52YWx1ZSkpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICBpZiAoZWwudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0LW9uZScpIHtcbiAgICAgICAgb3B0Q2IoZWwuc2VsZWN0ZWRJbmRleCA+PSAwID8gZWwub3B0aW9uc1tlbC5zZWxlY3RlZEluZGV4XSA6IG51bGwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSAwOyBlbC5sZW5ndGggJiYgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZWwub3B0aW9uc1tpXS5zZWxlY3RlZCAmJiBvcHRDYihlbC5vcHRpb25zW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIGNvbGxlY3QgdXAgYWxsIGZvcm0gZWxlbWVudHMgZm91bmQgZnJvbSB0aGUgcGFzc2VkIGFyZ3VtZW50IGVsZW1lbnRzIGFsbFxuICAvLyB0aGUgd2F5IGRvd24gdG8gY2hpbGQgZWxlbWVudHM7IHBhc3MgYSAnPGZvcm0+JyBvciBmb3JtIGZpZWxkcy5cbiAgLy8gY2FsbGVkIHdpdGggJ3RoaXMnPWNhbGxiYWNrIHRvIHVzZSBmb3Igc2VyaWFsKCkgb24gZWFjaCBlbGVtZW50XG4gIGZ1bmN0aW9uIGVhY2hGb3JtRWxlbWVudCgpIHtcbiAgICB2YXIgY2IgPSB0aGlzXG4gICAgICAsIGUsIGlcbiAgICAgICwgc2VyaWFsaXplU3VidGFncyA9IGZ1bmN0aW9uIChlLCB0YWdzKSB7XG4gICAgICAgICAgdmFyIGksIGosIGZhXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZhID0gZVtieVRhZ10odGFnc1tpXSlcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBmYS5sZW5ndGg7IGorKykgc2VyaWFsKGZhW2pdLCBjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGUgPSBhcmd1bWVudHNbaV1cbiAgICAgIGlmICgvaW5wdXR8c2VsZWN0fHRleHRhcmVhL2kudGVzdChlLnRhZ05hbWUpKSBzZXJpYWwoZSwgY2IpXG4gICAgICBzZXJpYWxpemVTdWJ0YWdzKGUsIFsgJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYScgXSlcbiAgICB9XG4gIH1cblxuICAvLyBzdGFuZGFyZCBxdWVyeSBzdHJpbmcgc3R5bGUgc2VyaWFsaXphdGlvblxuICBmdW5jdGlvbiBzZXJpYWxpemVRdWVyeVN0cmluZygpIHtcbiAgICByZXR1cm4gcmVxd2VzdC50b1F1ZXJ5U3RyaW5nKHJlcXdlc3Quc2VyaWFsaXplQXJyYXkuYXBwbHkobnVsbCwgYXJndW1lbnRzKSlcbiAgfVxuXG4gIC8vIHsgJ25hbWUnOiAndmFsdWUnLCAuLi4gfSBzdHlsZSBzZXJpYWxpemF0aW9uXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZUhhc2goKSB7XG4gICAgdmFyIGhhc2ggPSB7fVxuICAgIGVhY2hGb3JtRWxlbWVudC5hcHBseShmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChuYW1lIGluIGhhc2gpIHtcbiAgICAgICAgaGFzaFtuYW1lXSAmJiAhaXNBcnJheShoYXNoW25hbWVdKSAmJiAoaGFzaFtuYW1lXSA9IFtoYXNoW25hbWVdXSlcbiAgICAgICAgaGFzaFtuYW1lXS5wdXNoKHZhbHVlKVxuICAgICAgfSBlbHNlIGhhc2hbbmFtZV0gPSB2YWx1ZVxuICAgIH0sIGFyZ3VtZW50cylcbiAgICByZXR1cm4gaGFzaFxuICB9XG5cbiAgLy8gWyB7IG5hbWU6ICduYW1lJywgdmFsdWU6ICd2YWx1ZScgfSwgLi4uIF0gc3R5bGUgc2VyaWFsaXphdGlvblxuICByZXF3ZXN0LnNlcmlhbGl6ZUFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnIgPSBbXVxuICAgIGVhY2hGb3JtRWxlbWVudC5hcHBseShmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGFyci5wdXNoKHtuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWV9KVxuICAgIH0sIGFyZ3VtZW50cylcbiAgICByZXR1cm4gYXJyXG4gIH1cblxuICByZXF3ZXN0LnNlcmlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gICAgdmFyIG9wdCwgZm5cbiAgICAgICwgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcblxuICAgIG9wdCA9IGFyZ3MucG9wKClcbiAgICBvcHQgJiYgb3B0Lm5vZGVUeXBlICYmIGFyZ3MucHVzaChvcHQpICYmIChvcHQgPSBudWxsKVxuICAgIG9wdCAmJiAob3B0ID0gb3B0LnR5cGUpXG5cbiAgICBpZiAob3B0ID09ICdtYXAnKSBmbiA9IHNlcmlhbGl6ZUhhc2hcbiAgICBlbHNlIGlmIChvcHQgPT0gJ2FycmF5JykgZm4gPSByZXF3ZXN0LnNlcmlhbGl6ZUFycmF5XG4gICAgZWxzZSBmbiA9IHNlcmlhbGl6ZVF1ZXJ5U3RyaW5nXG5cbiAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncylcbiAgfVxuXG4gIHJlcXdlc3QudG9RdWVyeVN0cmluZyA9IGZ1bmN0aW9uIChvLCB0cmFkKSB7XG4gICAgdmFyIHByZWZpeCwgaVxuICAgICAgLCB0cmFkaXRpb25hbCA9IHRyYWQgfHwgZmFsc2VcbiAgICAgICwgcyA9IFtdXG4gICAgICAsIGVuYyA9IGVuY29kZVVSSUNvbXBvbmVudFxuICAgICAgLCBhZGQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgIC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuICAgICAgICAgIHZhbHVlID0gKCdmdW5jdGlvbicgPT09IHR5cGVvZiB2YWx1ZSkgPyB2YWx1ZSgpIDogKHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlKVxuICAgICAgICAgIHNbcy5sZW5ndGhdID0gZW5jKGtleSkgKyAnPScgKyBlbmModmFsdWUpXG4gICAgICAgIH1cbiAgICAvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuICAgIGlmIChpc0FycmF5KG8pKSB7XG4gICAgICBmb3IgKGkgPSAwOyBvICYmIGkgPCBvLmxlbmd0aDsgaSsrKSBhZGQob1tpXVsnbmFtZSddLCBvW2ldWyd2YWx1ZSddKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuICAgICAgLy8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG4gICAgICBmb3IgKHByZWZpeCBpbiBvKSB7XG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KHByZWZpeCkpIGJ1aWxkUGFyYW1zKHByZWZpeCwgb1twcmVmaXhdLCB0cmFkaXRpb25hbCwgYWRkKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNwYWNlcyBzaG91bGQgYmUgKyBhY2NvcmRpbmcgdG8gc3BlY1xuICAgIHJldHVybiBzLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRQYXJhbXMocHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQpIHtcbiAgICB2YXIgbmFtZSwgaSwgdlxuICAgICAgLCByYnJhY2tldCA9IC9cXFtcXF0kL1xuXG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgLy8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXG4gICAgICBmb3IgKGkgPSAwOyBvYmogJiYgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICB2ID0gb2JqW2ldXG4gICAgICAgIGlmICh0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KHByZWZpeCkpIHtcbiAgICAgICAgICAvLyBUcmVhdCBlYWNoIGFycmF5IGl0ZW0gYXMgYSBzY2FsYXIuXG4gICAgICAgICAgYWRkKHByZWZpeCwgdilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyAnWycgKyAodHlwZW9mIHYgPT09ICdvYmplY3QnID8gaSA6ICcnKSArICddJywgdiwgdHJhZGl0aW9uYWwsIGFkZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2JqICYmIG9iai50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgLy8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuICAgICAgZm9yIChuYW1lIGluIG9iaikge1xuICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyAnWycgKyBuYW1lICsgJ10nLCBvYmpbbmFtZV0sIHRyYWRpdGlvbmFsLCBhZGQpXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuICAgICAgYWRkKHByZWZpeCwgb2JqKVxuICAgIH1cbiAgfVxuXG4gIHJlcXdlc3QuZ2V0Y2FsbGJhY2tQcmVmaXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrUHJlZml4XG4gIH1cblxuICAvLyBqUXVlcnkgYW5kIFplcHRvIGNvbXBhdGliaWxpdHksIGRpZmZlcmVuY2VzIGNhbiBiZSByZW1hcHBlZCBoZXJlIHNvIHlvdSBjYW4gY2FsbFxuICAvLyAuYWpheC5jb21wYXQob3B0aW9ucywgY2FsbGJhY2spXG4gIHJlcXdlc3QuY29tcGF0ID0gZnVuY3Rpb24gKG8sIGZuKSB7XG4gICAgaWYgKG8pIHtcbiAgICAgIG9bJ3R5cGUnXSAmJiAob1snbWV0aG9kJ10gPSBvWyd0eXBlJ10pICYmIGRlbGV0ZSBvWyd0eXBlJ11cbiAgICAgIG9bJ2RhdGFUeXBlJ10gJiYgKG9bJ3R5cGUnXSA9IG9bJ2RhdGFUeXBlJ10pXG4gICAgICBvWydqc29ucENhbGxiYWNrJ10gJiYgKG9bJ2pzb25wQ2FsbGJhY2tOYW1lJ10gPSBvWydqc29ucENhbGxiYWNrJ10pICYmIGRlbGV0ZSBvWydqc29ucENhbGxiYWNrJ11cbiAgICAgIG9bJ2pzb25wJ10gJiYgKG9bJ2pzb25wQ2FsbGJhY2snXSA9IG9bJ2pzb25wJ10pXG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVxd2VzdChvLCBmbilcbiAgfVxuXG4gIHJlcXdlc3QuYWpheFNldHVwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIGZvciAodmFyIGsgaW4gb3B0aW9ucykge1xuICAgICAgZ2xvYmFsU2V0dXBPcHRpb25zW2tdID0gb3B0aW9uc1trXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXF3ZXN0XG59KTtcbiIsIi8qIVxuICogQ29weXJpZ2h0IChjKSAyMDE1IENocmlzIE8nSGFyYSA8Y29oYXJhODdAZ21haWwuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuICogYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4gKiBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbiAqIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbiAqIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xuICogcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG4gKiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAqIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4gKiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcbiAqIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4gKiBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG4gKiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbiAqIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbihmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0Jykge1xuICAgICAgICBkZWZpbmUoZGVmaW5pdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKTtcbiAgICB9XG59KSgndmFsaWRhdG9yJywgZnVuY3Rpb24gKHZhbGlkYXRvcikge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFsaWRhdG9yID0geyB2ZXJzaW9uOiAnNC4wLjInIH07XG5cbiAgICB2YXIgZW1haWxVc2VyID0gL14oKChbYS16XXxcXGR8WyEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XSkrKFxcLihbYS16XXxcXGR8WyEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XSkrKSopfFwiKFxccyooKFtcXHgwMS1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZlxceDdmXXxcXHgyMXxbXFx4MjMtXFx4NWJdfFtcXHg1ZC1cXHg3ZV0pfChcXFxcW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBkLVxceDdmXSkpKSpcXHMqXCIpJC9pO1xuXG4gICAgdmFyIGVtYWlsVXNlclV0ZjggPSAvXigoKFthLXpdfFxcZHxbISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSsoXFwuKFthLXpdfFxcZHxbISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSspKil8XCIoXFxzKigoW1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4N2ZdfFxceDIxfFtcXHgyMy1cXHg1Yl18W1xceDVkLVxceDdlXXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KFxcXFwoW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBkLVxceDdmXXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKSkqXFxzKlwiKSQvaTtcblxuICAgIHZhciBkaXNwbGF5TmFtZSA9IC9eKD86W2Etel18XFxkfFshI1xcJCUmJ1xcKlxcK1xcLVxcLz1cXD9cXF5fYHtcXHx9flxcLl18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKyg/OlthLXpdfFxcZHxbISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5cXC5dfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdfFxccykqPCguKyk+JC9pO1xuXG4gICAgdmFyIGNyZWRpdENhcmQgPSAvXig/OjRbMC05XXsxMn0oPzpbMC05XXszfSk/fDVbMS01XVswLTldezE0fXw2KD86MDExfDVbMC05XVswLTldKVswLTldezEyfXwzWzQ3XVswLTldezEzfXwzKD86MFswLTVdfFs2OF1bMC05XSlbMC05XXsxMX18KD86MjEzMXwxODAwfDM1XFxkezN9KVxcZHsxMX0pJC87XG5cbiAgICB2YXIgaXNpbiA9IC9eW0EtWl17Mn1bMC05QS1aXXs5fVswLTldJC87XG5cbiAgICB2YXIgaXNibjEwTWF5YmUgPSAvXig/OlswLTldezl9WHxbMC05XXsxMH0pJC9cbiAgICAgICwgaXNibjEzTWF5YmUgPSAvXig/OlswLTldezEzfSkkLztcblxuICAgIHZhciBpcHY0TWF5YmUgPSAvXihcXGQrKVxcLihcXGQrKVxcLihcXGQrKVxcLihcXGQrKSQvXG4gICAgICAsIGlwdjZCbG9jayA9IC9eWzAtOUEtRl17MSw0fSQvaTtcblxuICAgIHZhciB1dWlkID0ge1xuICAgICAgICAnMyc6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tM1swLTlBLUZdezN9LVswLTlBLUZdezR9LVswLTlBLUZdezEyfSQvaVxuICAgICAgLCAnNCc6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tNFswLTlBLUZdezN9LVs4OUFCXVswLTlBLUZdezN9LVswLTlBLUZdezEyfSQvaVxuICAgICAgLCAnNSc6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tNVswLTlBLUZdezN9LVs4OUFCXVswLTlBLUZdezN9LVswLTlBLUZdezEyfSQvaVxuICAgICAgLCBhbGw6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tWzAtOUEtRl17NH0tWzAtOUEtRl17NH0tWzAtOUEtRl17MTJ9JC9pXG4gICAgfTtcblxuICAgIHZhciBhbHBoYSA9IC9eW0EtWl0rJC9pXG4gICAgICAsIGFscGhhbnVtZXJpYyA9IC9eWzAtOUEtWl0rJC9pXG4gICAgICAsIG51bWVyaWMgPSAvXlstK10/WzAtOV0rJC9cbiAgICAgICwgaW50ID0gL14oPzpbLStdPyg/OjB8WzEtOV1bMC05XSopKSQvXG4gICAgICAsIGZsb2F0ID0gL14oPzpbLStdPyg/OlswLTldKykpPyg/OlxcLlswLTldKik/KD86W2VFXVtcXCtcXC1dPyg/OlswLTldKykpPyQvXG4gICAgICAsIGhleGFkZWNpbWFsID0gL15bMC05QS1GXSskL2lcbiAgICAgICwgZGVjaW1hbCA9IC9eWy0rXT8oWzAtOV0rfFxcLlswLTldK3xbMC05XStcXC5bMC05XSspJC9cbiAgICAgICwgaGV4Y29sb3IgPSAvXiM/KFswLTlBLUZdezN9fFswLTlBLUZdezZ9KSQvaTtcblxuICAgIHZhciBhc2NpaSA9IC9eW1xceDAwLVxceDdGXSskL1xuICAgICAgLCBtdWx0aWJ5dGUgPSAvW15cXHgwMC1cXHg3Rl0vXG4gICAgICAsIGZ1bGxXaWR0aCA9IC9bXlxcdTAwMjAtXFx1MDA3RVxcdUZGNjEtXFx1RkY5RlxcdUZGQTAtXFx1RkZEQ1xcdUZGRTgtXFx1RkZFRTAtOWEtekEtWl0vXG4gICAgICAsIGhhbGZXaWR0aCA9IC9bXFx1MDAyMC1cXHUwMDdFXFx1RkY2MS1cXHVGRjlGXFx1RkZBMC1cXHVGRkRDXFx1RkZFOC1cXHVGRkVFMC05YS16QS1aXS87XG5cbiAgICB2YXIgc3Vycm9nYXRlUGFpciA9IC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdLztcblxuICAgIHZhciBiYXNlNjQgPSAvXig/OltBLVowLTkrXFwvXXs0fSkqKD86W0EtWjAtOStcXC9dezJ9PT18W0EtWjAtOStcXC9dezN9PXxbQS1aMC05K1xcL117NH0pJC9pO1xuXG4gICAgdmFyIHBob25lcyA9IHtcbiAgICAgICd6aC1DTic6IC9eKFxcKz8wPzg2XFwtPyk/MVszNDU3ODldXFxkezl9JC8sXG4gICAgICAnZW4tWkEnOiAvXihcXCs/Mjd8MClcXGR7OX0kLyxcbiAgICAgICdlbi1BVSc6IC9eKFxcKz82MXwwKTRcXGR7OH0kLyxcbiAgICAgICdlbi1ISyc6IC9eKFxcKz84NTJcXC0/KT9bNTY5XVxcZHszfVxcLT9cXGR7NH0kLyxcbiAgICAgICdmci1GUic6IC9eKFxcKz8zM3wwKVs2N11cXGR7OH0kLyxcbiAgICAgICdwdC1QVCc6IC9eKFxcKzM1MSk/OVsxMjM2XVxcZHs3fSQvLFxuICAgICAgJ2VsLUdSJzogL14oXFwrMzApPygoMlxcZHs5fSl8KDY5XFxkezh9KSkkLyxcbiAgICAgICdlbi1HQic6IC9eKFxcKz80NHwwKTdcXGR7OX0kLyxcbiAgICAgICdlbi1VUyc6IC9eKFxcKz8xKT9bMi05XVxcZHsyfVsyLTldKD8hMTEpXFxkezZ9JC8sXG4gICAgICAnZW4tWk0nOiAvXihcXCsyNik/MDlbNTY3XVxcZHs3fSQvLFxuICAgICAgJ3J1LVJVJzogL14oXFwrPzd8OCk/OVxcZHs5fSQvXG4gICAgfTtcblxuICAgIC8vIGZyb20gaHR0cDovL2dvby5nbC8wZWpISFdcbiAgICB2YXIgaXNvODYwMSA9IC9eKFtcXCstXT9cXGR7NH0oPyFcXGR7Mn1cXGIpKSgoLT8pKCgwWzEtOV18MVswLTJdKShcXDMoWzEyXVxcZHwwWzEtOV18M1swMV0pKT98VyhbMC00XVxcZHw1WzAtMl0pKC0/WzEtN10pP3woMDBbMS05XXwwWzEtOV1cXGR8WzEyXVxcZHsyfXwzKFswLTVdXFxkfDZbMS02XSkpKShbVFxcc10oKChbMDFdXFxkfDJbMC0zXSkoKDo/KVswLTVdXFxkKT98MjRcXDo/MDApKFtcXC4sXVxcZCsoPyE6KSk/KT8oXFwxN1swLTVdXFxkKFtcXC4sXVxcZCspPyk/KFt6Wl18KFtcXCstXSkoWzAxXVxcZHwyWzAtM10pOj8oWzAtNV1cXGQpPyk/KT8pPyQvO1xuXG4gICAgdmFsaWRhdG9yLmV4dGVuZCA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgICAgICB2YWxpZGF0b3JbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBhcmdzWzBdID0gdmFsaWRhdG9yLnRvU3RyaW5nKGFyZ3NbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHZhbGlkYXRvciwgYXJncyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8vUmlnaHQgYmVmb3JlIGV4cG9ydGluZyB0aGUgdmFsaWRhdG9yIG9iamVjdCwgcGFzcyBlYWNoIG9mIHRoZSBidWlsdGluc1xuICAgIC8vdGhyb3VnaCBleHRlbmQoKSBzbyB0aGF0IHRoZWlyIGZpcnN0IGFyZ3VtZW50IGlzIGNvZXJjZWQgdG8gYSBzdHJpbmdcbiAgICB2YWxpZGF0b3IuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yW25hbWVdICE9PSAnZnVuY3Rpb24nIHx8IG5hbWUgPT09ICd0b1N0cmluZycgfHxcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9PT0gJ3RvRGF0ZScgfHwgbmFtZSA9PT0gJ2V4dGVuZCcgfHwgbmFtZSA9PT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWxpZGF0b3IuZXh0ZW5kKG5hbWUsIHZhbGlkYXRvcltuYW1lXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLnRvU3RyaW5nID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmIGlucHV0ICE9PSBudWxsICYmIGlucHV0LnRvU3RyaW5nKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQgPT09IG51bGwgfHwgdHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJyB8fCAoaXNOYU4oaW5wdXQpICYmICFpbnB1dC5sZW5ndGgpKSB7XG4gICAgICAgICAgICBpbnB1dCA9ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlucHV0ICs9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLnRvRGF0ZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0ZSkgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgZGF0ZSA9IERhdGUucGFyc2UoZGF0ZSk7XG4gICAgICAgIHJldHVybiAhaXNOYU4oZGF0ZSkgPyBuZXcgRGF0ZShkYXRlKSA6IG51bGw7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci50b0Zsb2F0ID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IudG9JbnQgPSBmdW5jdGlvbiAoc3RyLCByYWRpeCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoc3RyLCByYWRpeCB8fCAxMCk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci50b0Jvb2xlYW4gPSBmdW5jdGlvbiAoc3RyLCBzdHJpY3QpIHtcbiAgICAgICAgaWYgKHN0cmljdCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ciA9PT0gJzEnIHx8IHN0ciA9PT0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHIgIT09ICcwJyAmJiBzdHIgIT09ICdmYWxzZScgJiYgc3RyICE9PSAnJztcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmVxdWFscyA9IGZ1bmN0aW9uIChzdHIsIGNvbXBhcmlzb24pIHtcbiAgICAgICAgcmV0dXJuIHN0ciA9PT0gdmFsaWRhdG9yLnRvU3RyaW5nKGNvbXBhcmlzb24pO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuY29udGFpbnMgPSBmdW5jdGlvbiAoc3RyLCBlbGVtKSB7XG4gICAgICAgIHJldHVybiBzdHIuaW5kZXhPZih2YWxpZGF0b3IudG9TdHJpbmcoZWxlbSkpID49IDA7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5tYXRjaGVzID0gZnVuY3Rpb24gKHN0ciwgcGF0dGVybiwgbW9kaWZpZXJzKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGF0dGVybikgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBtb2RpZmllcnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3Qoc3RyKTtcbiAgICB9O1xuXG4gICAgdmFyIGRlZmF1bHRfZW1haWxfb3B0aW9ucyA9IHtcbiAgICAgICAgYWxsb3dfZGlzcGxheV9uYW1lOiBmYWxzZSxcbiAgICAgICAgYWxsb3dfdXRmOF9sb2NhbF9wYXJ0OiB0cnVlLFxuICAgICAgICByZXF1aXJlX3RsZDogdHJ1ZVxuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNFbWFpbCA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG1lcmdlKG9wdGlvbnMsIGRlZmF1bHRfZW1haWxfb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dfZGlzcGxheV9uYW1lKSB7XG4gICAgICAgICAgICB2YXIgZGlzcGxheV9lbWFpbCA9IHN0ci5tYXRjaChkaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICBpZiAoZGlzcGxheV9lbWFpbCkge1xuICAgICAgICAgICAgICAgIHN0ciA9IGRpc3BsYXlfZW1haWxbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJ0AnKVxuICAgICAgICAgICwgZG9tYWluID0gcGFydHMucG9wKClcbiAgICAgICAgICAsIHVzZXIgPSBwYXJ0cy5qb2luKCdAJyk7XG5cbiAgICAgICAgdmFyIGxvd2VyX2RvbWFpbiA9IGRvbWFpbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAobG93ZXJfZG9tYWluID09PSAnZ21haWwuY29tJyB8fCBsb3dlcl9kb21haW4gPT09ICdnb29nbGVtYWlsLmNvbScpIHtcbiAgICAgICAgICAgIHVzZXIgPSB1c2VyLnJlcGxhY2UoL1xcLi9nLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmFsaWRhdG9yLmlzQnl0ZUxlbmd0aCh1c2VyLCAwLCA2NCkgfHxcbiAgICAgICAgICAgICAgICAhdmFsaWRhdG9yLmlzQnl0ZUxlbmd0aChkb21haW4sIDAsIDI1NikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmFsaWRhdG9yLmlzRlFETihkb21haW4sIHtyZXF1aXJlX3RsZDogb3B0aW9ucy5yZXF1aXJlX3RsZH0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucy5hbGxvd191dGY4X2xvY2FsX3BhcnQgP1xuICAgICAgICAgICAgZW1haWxVc2VyVXRmOC50ZXN0KHVzZXIpIDpcbiAgICAgICAgICAgIGVtYWlsVXNlci50ZXN0KHVzZXIpO1xuICAgIH07XG5cbiAgICB2YXIgZGVmYXVsdF91cmxfb3B0aW9ucyA9IHtcbiAgICAgICAgcHJvdG9jb2xzOiBbICdodHRwJywgJ2h0dHBzJywgJ2Z0cCcgXVxuICAgICAgLCByZXF1aXJlX3RsZDogdHJ1ZVxuICAgICAgLCByZXF1aXJlX3Byb3RvY29sOiBmYWxzZVxuICAgICAgLCByZXF1aXJlX3ZhbGlkX3Byb3RvY29sOiB0cnVlXG4gICAgICAsIGFsbG93X3VuZGVyc2NvcmVzOiBmYWxzZVxuICAgICAgLCBhbGxvd190cmFpbGluZ19kb3Q6IGZhbHNlXG4gICAgICAsIGFsbG93X3Byb3RvY29sX3JlbGF0aXZlX3VybHM6IGZhbHNlXG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc1VSTCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF1cmwgfHwgdXJsLmxlbmd0aCA+PSAyMDgzIHx8IC9cXHMvLnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignbWFpbHRvOicpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG1lcmdlKG9wdGlvbnMsIGRlZmF1bHRfdXJsX29wdGlvbnMpO1xuICAgICAgICB2YXIgcHJvdG9jb2wsIGF1dGgsIGhvc3QsIGhvc3RuYW1lLCBwb3J0LFxuICAgICAgICAgICAgcG9ydF9zdHIsIHNwbGl0O1xuICAgICAgICBzcGxpdCA9IHVybC5zcGxpdCgnOi8vJyk7XG4gICAgICAgIGlmIChzcGxpdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwcm90b2NvbCA9IHNwbGl0LnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5yZXF1aXJlX3ZhbGlkX3Byb3RvY29sICYmIG9wdGlvbnMucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnJlcXVpcmVfcHJvdG9jb2wpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSAgZWxzZSBpZiAob3B0aW9ucy5hbGxvd19wcm90b2NvbF9yZWxhdGl2ZV91cmxzICYmIHVybC5zdWJzdHIoMCwgMikgPT09ICcvLycpIHtcbiAgICAgICAgICAgIHNwbGl0WzBdID0gdXJsLnN1YnN0cigyKTtcbiAgICAgICAgfVxuICAgICAgICB1cmwgPSBzcGxpdC5qb2luKCc6Ly8nKTtcbiAgICAgICAgc3BsaXQgPSB1cmwuc3BsaXQoJyMnKTtcbiAgICAgICAgdXJsID0gc3BsaXQuc2hpZnQoKTtcblxuICAgICAgICBzcGxpdCA9IHVybC5zcGxpdCgnPycpO1xuICAgICAgICB1cmwgPSBzcGxpdC5zaGlmdCgpO1xuXG4gICAgICAgIHNwbGl0ID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgICAgIHVybCA9IHNwbGl0LnNoaWZ0KCk7XG4gICAgICAgIHNwbGl0ID0gdXJsLnNwbGl0KCdAJyk7XG4gICAgICAgIGlmIChzcGxpdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBhdXRoID0gc3BsaXQuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChhdXRoLmluZGV4T2YoJzonKSA+PSAwICYmIGF1dGguc3BsaXQoJzonKS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGhvc3RuYW1lID0gc3BsaXQuam9pbignQCcpO1xuICAgICAgICBzcGxpdCA9IGhvc3RuYW1lLnNwbGl0KCc6Jyk7XG4gICAgICAgIGhvc3QgPSBzcGxpdC5zaGlmdCgpO1xuICAgICAgICBpZiAoc3BsaXQubGVuZ3RoKSB7XG4gICAgICAgICAgICBwb3J0X3N0ciA9IHNwbGl0LmpvaW4oJzonKTtcbiAgICAgICAgICAgIHBvcnQgPSBwYXJzZUludChwb3J0X3N0ciwgMTApO1xuICAgICAgICAgICAgaWYgKCEvXlswLTldKyQvLnRlc3QocG9ydF9zdHIpIHx8IHBvcnQgPD0gMCB8fCBwb3J0ID4gNjU1MzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWxpZGF0b3IuaXNJUChob3N0KSAmJiAhdmFsaWRhdG9yLmlzRlFETihob3N0LCBvcHRpb25zKSAmJlxuICAgICAgICAgICAgICAgIGhvc3QgIT09ICdsb2NhbGhvc3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaG9zdF93aGl0ZWxpc3QgJiZcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhvc3Rfd2hpdGVsaXN0LmluZGV4T2YoaG9zdCkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaG9zdF9ibGFja2xpc3QgJiZcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhvc3RfYmxhY2tsaXN0LmluZGV4T2YoaG9zdCkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0lQID0gZnVuY3Rpb24gKHN0ciwgdmVyc2lvbikge1xuICAgICAgICB2ZXJzaW9uID0gdmFsaWRhdG9yLnRvU3RyaW5nKHZlcnNpb24pO1xuICAgICAgICBpZiAoIXZlcnNpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuaXNJUChzdHIsIDQpIHx8IHZhbGlkYXRvci5pc0lQKHN0ciwgNik7XG4gICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbiA9PT0gJzQnKSB7XG4gICAgICAgICAgICBpZiAoIWlwdjRNYXliZS50ZXN0KHN0cikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJy4nKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcGFydHNbM10gPD0gMjU1O1xuICAgICAgICB9IGVsc2UgaWYgKHZlcnNpb24gPT09ICc2Jykge1xuICAgICAgICAgICAgdmFyIGJsb2NrcyA9IHN0ci5zcGxpdCgnOicpO1xuICAgICAgICAgICAgdmFyIGZvdW5kT21pc3Npb25CbG9jayA9IGZhbHNlOyAvLyBtYXJrZXIgdG8gaW5kaWNhdGUgOjpcblxuICAgICAgICAgICAgLy8gQXQgbGVhc3Qgc29tZSBPUyBhY2NlcHQgdGhlIGxhc3QgMzIgYml0cyBvZiBhbiBJUHY2IGFkZHJlc3NcbiAgICAgICAgICAgIC8vIChpLmUuIDIgb2YgdGhlIGJsb2NrcykgaW4gSVB2NCBub3RhdGlvbiwgYW5kIFJGQyAzNDkzIHNheXNcbiAgICAgICAgICAgIC8vIHRoYXQgJzo6ZmZmZjphLmIuYy5kJyBpcyB2YWxpZCBmb3IgSVB2NC1tYXBwZWQgSVB2NiBhZGRyZXNzZXMsXG4gICAgICAgICAgICAvLyBhbmQgJzo6YS5iLmMuZCcgaXMgZGVwcmVjYXRlZCwgYnV0IGFsc28gdmFsaWQuXG4gICAgICAgICAgICB2YXIgZm91bmRJUHY0VHJhbnNpdGlvbkJsb2NrID0gdmFsaWRhdG9yLmlzSVAoYmxvY2tzW2Jsb2Nrcy5sZW5ndGggLSAxXSwgNCk7XG4gICAgICAgICAgICB2YXIgZXhwZWN0ZWROdW1iZXJPZkJsb2NrcyA9IGZvdW5kSVB2NFRyYW5zaXRpb25CbG9jayA/IDcgOiA4O1xuXG4gICAgICAgICAgICBpZiAoYmxvY2tzLmxlbmd0aCA+IGV4cGVjdGVkTnVtYmVyT2ZCbG9ja3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpbml0aWFsIG9yIGZpbmFsIDo6XG4gICAgICAgICAgICBpZiAoc3RyID09PSAnOjonKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ci5zdWJzdHIoMCwgMikgPT09ICc6OicpIHtcbiAgICAgICAgICAgICAgICBibG9ja3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBibG9ja3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBmb3VuZE9taXNzaW9uQmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSAyKSA9PT0gJzo6Jykge1xuICAgICAgICAgICAgICAgIGJsb2Nrcy5wb3AoKTtcbiAgICAgICAgICAgICAgICBibG9ja3MucG9wKCk7XG4gICAgICAgICAgICAgICAgZm91bmRPbWlzc2lvbkJsb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXN0IGZvciBhIDo6IHdoaWNoIGNhbiBub3QgYmUgYXQgdGhlIHN0cmluZyBzdGFydC9lbmRcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSB0aG9zZSBjYXNlcyBoYXZlIGJlZW4gaGFuZGxlZCBhYm92ZVxuICAgICAgICAgICAgICAgIGlmIChibG9ja3NbaV0gPT09ICcnICYmIGkgPiAwICYmIGkgPCBibG9ja3MubGVuZ3RoIC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZE9taXNzaW9uQmxvY2spXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG11bHRpcGxlIDo6IGluIGFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgZm91bmRPbWlzc2lvbkJsb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvdW5kSVB2NFRyYW5zaXRpb25CbG9jayAmJiBpID09IGJsb2Nrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGhhcyBiZWVuIGNoZWNrZWQgYmVmb3JlIHRoYXQgdGhlIGxhc3RcbiAgICAgICAgICAgICAgICAgICAgLy8gYmxvY2sgaXMgYSB2YWxpZCBJUHY0IGFkZHJlc3NcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpcHY2QmxvY2sudGVzdChibG9ja3NbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmb3VuZE9taXNzaW9uQmxvY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmxvY2tzLmxlbmd0aCA+PSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmxvY2tzLmxlbmd0aCA9PT0gZXhwZWN0ZWROdW1iZXJPZkJsb2NrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHZhciBkZWZhdWx0X2ZxZG5fb3B0aW9ucyA9IHtcbiAgICAgICAgcmVxdWlyZV90bGQ6IHRydWVcbiAgICAgICwgYWxsb3dfdW5kZXJzY29yZXM6IGZhbHNlXG4gICAgICAsIGFsbG93X3RyYWlsaW5nX2RvdDogZmFsc2VcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzRlFETiA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG1lcmdlKG9wdGlvbnMsIGRlZmF1bHRfZnFkbl9vcHRpb25zKTtcblxuICAgICAgICAvKiBSZW1vdmUgdGhlIG9wdGlvbmFsIHRyYWlsaW5nIGRvdCBiZWZvcmUgY2hlY2tpbmcgdmFsaWRpdHkgKi9cbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dfdHJhaWxpbmdfZG90ICYmIHN0cltzdHIubGVuZ3RoIC0gMV0gPT09ICcuJykge1xuICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBzdHIubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCcuJyk7XG4gICAgICAgIGlmIChvcHRpb25zLnJlcXVpcmVfdGxkKSB7XG4gICAgICAgICAgICB2YXIgdGxkID0gcGFydHMucG9wKCk7XG4gICAgICAgICAgICBpZiAoIXBhcnRzLmxlbmd0aCB8fCAhL14oW2EtelxcdTAwYTEtXFx1ZmZmZl17Mix9fHhuW2EtejAtOS1dezIsfSkkL2kudGVzdCh0bGQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHBhcnQsIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93X3VuZGVyc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnQuaW5kZXhPZignX18nKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFydCA9IHBhcnQucmVwbGFjZSgvXy9nLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIS9eW2EtelxcdTAwYTEtXFx1ZmZmZjAtOS1dKyQvaS50ZXN0KHBhcnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC9bXFx1ZmYwMS1cXHVmZjVlXS8udGVzdChwYXJ0KSkge1xuICAgICAgICAgICAgICAgIC8vIGRpc2FsbG93IGZ1bGwtd2lkdGggY2hhcnNcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFydFswXSA9PT0gJy0nIHx8IHBhcnRbcGFydC5sZW5ndGggLSAxXSA9PT0gJy0nIHx8XG4gICAgICAgICAgICAgICAgICAgIHBhcnQuaW5kZXhPZignLS0tJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzQm9vbGVhbiA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICByZXR1cm4gKFsndHJ1ZScsICdmYWxzZScsICcxJywgJzAnXS5pbmRleE9mKHN0cikgPj0gMCk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0FscGhhID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gYWxwaGEudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNBbHBoYW51bWVyaWMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBhbHBoYW51bWVyaWMudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNOdW1lcmljID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gbnVtZXJpYy50ZXN0KHN0cik7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0RlY2ltYWwgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIgIT09ICcnICYmIGRlY2ltYWwudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNIZXhhZGVjaW1hbCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIGhleGFkZWNpbWFsLnRlc3Qoc3RyKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzSGV4Q29sb3IgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBoZXhjb2xvci50ZXN0KHN0cik7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0xvd2VyY2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ciA9PT0gc3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc1VwcGVyY2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ciA9PT0gc3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0ludCA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHJldHVybiBpbnQudGVzdChzdHIpICYmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbWluJykgfHwgc3RyID49IG9wdGlvbnMubWluKSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21heCcpIHx8IHN0ciA8PSBvcHRpb25zLm1heCk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0Zsb2F0ID0gZnVuY3Rpb24gKHN0ciwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHN0ciAhPT0gJycgJiYgZmxvYXQudGVzdChzdHIpICYmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbWluJykgfHwgc3RyID49IG9wdGlvbnMubWluKSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21heCcpIHx8IHN0ciA8PSBvcHRpb25zLm1heCk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0RpdmlzaWJsZUJ5ID0gZnVuY3Rpb24gKHN0ciwgbnVtKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0b3IudG9GbG9hdChzdHIpICUgdmFsaWRhdG9yLnRvSW50KG51bSkgPT09IDA7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc051bGwgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIubGVuZ3RoID09PSAwO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBtaW4sIG1heCkge1xuICAgICAgICB2YXIgc3Vycm9nYXRlUGFpcnMgPSBzdHIubWF0Y2goL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZykgfHwgW107XG4gICAgICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoIC0gc3Vycm9nYXRlUGFpcnMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbGVuID49IG1pbiAmJiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGVuIDw9IG1heCk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0J5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBtaW4sIG1heCkge1xuICAgICAgICB2YXIgbGVuID0gZW5jb2RlVVJJKHN0cikuc3BsaXQoLyUuLnwuLykubGVuZ3RoIC0gMTtcbiAgICAgICAgcmV0dXJuIGxlbiA+PSBtaW4gJiYgKHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnIHx8IGxlbiA8PSBtYXgpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNVVUlEID0gZnVuY3Rpb24gKHN0ciwgdmVyc2lvbikge1xuICAgICAgICB2YXIgcGF0dGVybiA9IHV1aWRbdmVyc2lvbiA/IHZlcnNpb24gOiAnYWxsJ107XG4gICAgICAgIHJldHVybiBwYXR0ZXJuICYmIHBhdHRlcm4udGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNEYXRlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gIWlzTmFOKERhdGUucGFyc2Uoc3RyKSk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0FmdGVyID0gZnVuY3Rpb24gKHN0ciwgZGF0ZSkge1xuICAgICAgICB2YXIgY29tcGFyaXNvbiA9IHZhbGlkYXRvci50b0RhdGUoZGF0ZSB8fCBuZXcgRGF0ZSgpKVxuICAgICAgICAgICwgb3JpZ2luYWwgPSB2YWxpZGF0b3IudG9EYXRlKHN0cik7XG4gICAgICAgIHJldHVybiAhIShvcmlnaW5hbCAmJiBjb21wYXJpc29uICYmIG9yaWdpbmFsID4gY29tcGFyaXNvbik7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0JlZm9yZSA9IGZ1bmN0aW9uIChzdHIsIGRhdGUpIHtcbiAgICAgICAgdmFyIGNvbXBhcmlzb24gPSB2YWxpZGF0b3IudG9EYXRlKGRhdGUgfHwgbmV3IERhdGUoKSlcbiAgICAgICAgICAsIG9yaWdpbmFsID0gdmFsaWRhdG9yLnRvRGF0ZShzdHIpO1xuICAgICAgICByZXR1cm4gb3JpZ2luYWwgJiYgY29tcGFyaXNvbiAmJiBvcmlnaW5hbCA8IGNvbXBhcmlzb247XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0luID0gZnVuY3Rpb24gKHN0ciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcHRpb25zKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKGkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gdmFsaWRhdG9yLnRvU3RyaW5nKG9wdGlvbnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2Yoc3RyKSA+PSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoc3RyKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmluZGV4T2Yoc3RyKSA+PSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzQ3JlZGl0Q2FyZCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdmFyIHNhbml0aXplZCA9IHN0ci5yZXBsYWNlKC9bXjAtOV0rL2csICcnKTtcbiAgICAgICAgaWYgKCFjcmVkaXRDYXJkLnRlc3Qoc2FuaXRpemVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdW0gPSAwLCBkaWdpdCwgdG1wTnVtLCBzaG91bGREb3VibGU7XG4gICAgICAgIGZvciAodmFyIGkgPSBzYW5pdGl6ZWQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGRpZ2l0ID0gc2FuaXRpemVkLnN1YnN0cmluZyhpLCAoaSArIDEpKTtcbiAgICAgICAgICAgIHRtcE51bSA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkRG91YmxlKSB7XG4gICAgICAgICAgICAgICAgdG1wTnVtICo9IDI7XG4gICAgICAgICAgICAgICAgaWYgKHRtcE51bSA+PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gKCh0bXBOdW0gJSAxMCkgKyAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gdG1wTnVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IHRtcE51bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3VsZERvdWJsZSA9ICFzaG91bGREb3VibGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhKChzdW0gJSAxMCkgPT09IDAgPyBzYW5pdGl6ZWQgOiBmYWxzZSk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5pc0lTSU4gPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmICghaXNpbi50ZXN0KHN0cikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGVja3N1bVN0ciA9IHN0ci5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbihjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChjaGFyYWN0ZXIsIDM2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHN1bSA9IDAsIGRpZ2l0LCB0bXBOdW0sIHNob3VsZERvdWJsZSA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGkgPSBjaGVja3N1bVN0ci5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgZGlnaXQgPSBjaGVja3N1bVN0ci5zdWJzdHJpbmcoaSwgKGkgKyAxKSk7XG4gICAgICAgICAgICB0bXBOdW0gPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgICAgICAgICAgaWYgKHNob3VsZERvdWJsZSkge1xuICAgICAgICAgICAgICAgIHRtcE51bSAqPSAyO1xuICAgICAgICAgICAgICAgIGlmICh0bXBOdW0gPj0gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IHRtcE51bSArIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IHRtcE51bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1bSArPSB0bXBOdW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG91bGREb3VibGUgPSAhc2hvdWxkRG91YmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHN0ci5zdWJzdHIoc3RyLmxlbmd0aCAtIDEpLCAxMCkgPT09ICgxMDAwMCAtIHN1bSkgJSAxMDtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzSVNCTiA9IGZ1bmN0aW9uIChzdHIsIHZlcnNpb24pIHtcbiAgICAgICAgdmVyc2lvbiA9IHZhbGlkYXRvci50b1N0cmluZyh2ZXJzaW9uKTtcbiAgICAgICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmlzSVNCTihzdHIsIDEwKSB8fCB2YWxpZGF0b3IuaXNJU0JOKHN0ciwgMTMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzYW5pdGl6ZWQgPSBzdHIucmVwbGFjZSgvW1xccy1dKy9nLCAnJylcbiAgICAgICAgICAsIGNoZWNrc3VtID0gMCwgaTtcbiAgICAgICAgaWYgKHZlcnNpb24gPT09ICcxMCcpIHtcbiAgICAgICAgICAgIGlmICghaXNibjEwTWF5YmUudGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IChpICsgMSkgKiBzYW5pdGl6ZWQuY2hhckF0KGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNhbml0aXplZC5jaGFyQXQoOSkgPT09ICdYJykge1xuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IDEwICogMTA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoZWNrc3VtICs9IDEwICogc2FuaXRpemVkLmNoYXJBdCg5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoY2hlY2tzdW0gJSAxMSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFzYW5pdGl6ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSAgaWYgKHZlcnNpb24gPT09ICcxMycpIHtcbiAgICAgICAgICAgIGlmICghaXNibjEzTWF5YmUudGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZhY3RvciA9IFsgMSwgMyBdO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjaGVja3N1bSArPSBmYWN0b3JbaSAlIDJdICogc2FuaXRpemVkLmNoYXJBdChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzYW5pdGl6ZWQuY2hhckF0KDEyKSAtICgoMTAgLSAoY2hlY2tzdW0gJSAxMCkpICUgMTApID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhc2FuaXRpemVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzTW9iaWxlUGhvbmUgPSBmdW5jdGlvbihzdHIsIGxvY2FsZSkge1xuICAgICAgICBpZiAobG9jYWxlIGluIHBob25lcykge1xuICAgICAgICAgICAgcmV0dXJuIHBob25lc1tsb2NhbGVdLnRlc3Qoc3RyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHZhciBkZWZhdWx0X2N1cnJlbmN5X29wdGlvbnMgPSB7XG4gICAgICAgIHN5bWJvbDogJyQnXG4gICAgICAsIHJlcXVpcmVfc3ltYm9sOiBmYWxzZVxuICAgICAgLCBhbGxvd19zcGFjZV9hZnRlcl9zeW1ib2w6IGZhbHNlXG4gICAgICAsIHN5bWJvbF9hZnRlcl9kaWdpdHM6IGZhbHNlXG4gICAgICAsIGFsbG93X25lZ2F0aXZlczogdHJ1ZVxuICAgICAgLCBwYXJlbnNfZm9yX25lZ2F0aXZlczogZmFsc2VcbiAgICAgICwgbmVnYXRpdmVfc2lnbl9iZWZvcmVfZGlnaXRzOiBmYWxzZVxuICAgICAgLCBuZWdhdGl2ZV9zaWduX2FmdGVyX2RpZ2l0czogZmFsc2VcbiAgICAgICwgYWxsb3dfbmVnYXRpdmVfc2lnbl9wbGFjZWhvbGRlcjogZmFsc2VcbiAgICAgICwgdGhvdXNhbmRzX3NlcGFyYXRvcjogJywnXG4gICAgICAsIGRlY2ltYWxfc2VwYXJhdG9yOiAnLidcbiAgICAgICwgYWxsb3dfc3BhY2VfYWZ0ZXJfZGlnaXRzOiBmYWxzZVxuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNDdXJyZW5jeSA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG1lcmdlKG9wdGlvbnMsIGRlZmF1bHRfY3VycmVuY3lfb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbmN5UmVnZXgob3B0aW9ucykudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNKU09OID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2Uoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiAhIW9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNNdWx0aWJ5dGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBtdWx0aWJ5dGUudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNBc2NpaSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIGFzY2lpLnRlc3Qoc3RyKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzRnVsbFdpZHRoID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gZnVsbFdpZHRoLnRlc3Qoc3RyKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzSGFsZldpZHRoID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gaGFsZldpZHRoLnRlc3Qoc3RyKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzVmFyaWFibGVXaWR0aCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxXaWR0aC50ZXN0KHN0cikgJiYgaGFsZldpZHRoLnRlc3Qoc3RyKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzU3Vycm9nYXRlUGFpciA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN1cnJvZ2F0ZVBhaXIudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNCYXNlNjQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBiYXNlNjQudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuaXNNb25nb0lkID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmlzSGV4YWRlY2ltYWwoc3RyKSAmJiBzdHIubGVuZ3RoID09PSAyNDtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmlzSVNPODYwMSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIGlzbzg2MDEudGVzdChzdHIpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3IubHRyaW0gPSBmdW5jdGlvbiAoc3RyLCBjaGFycykge1xuICAgICAgICB2YXIgcGF0dGVybiA9IGNoYXJzID8gbmV3IFJlZ0V4cCgnXlsnICsgY2hhcnMgKyAnXSsnLCAnZycpIDogL15cXHMrL2c7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShwYXR0ZXJuLCAnJyk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5ydHJpbSA9IGZ1bmN0aW9uIChzdHIsIGNoYXJzKSB7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gY2hhcnMgPyBuZXcgUmVnRXhwKCdbJyArIGNoYXJzICsgJ10rJCcsICdnJykgOiAvXFxzKyQvZztcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHBhdHRlcm4sICcnKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLnRyaW0gPSBmdW5jdGlvbiAoc3RyLCBjaGFycykge1xuICAgICAgICB2YXIgcGF0dGVybiA9IGNoYXJzID8gbmV3IFJlZ0V4cCgnXlsnICsgY2hhcnMgKyAnXSt8WycgKyBjaGFycyArICddKyQnLCAnZycpIDogL15cXHMrfFxccyskL2c7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShwYXR0ZXJuLCAnJyk7XG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5lc2NhcGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiAoc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmI3gyNzsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnJiN4MkY7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXGAvZywgJyYjOTY7JykpO1xuICAgIH07XG5cbiAgICB2YWxpZGF0b3Iuc3RyaXBMb3cgPSBmdW5jdGlvbiAoc3RyLCBrZWVwX25ld19saW5lcykge1xuICAgICAgICB2YXIgY2hhcnMgPSBrZWVwX25ld19saW5lcyA/ICdcXFxceDAwLVxcXFx4MDlcXFxceDBCXFxcXHgwQ1xcXFx4MEUtXFxcXHgxRlxcXFx4N0YnIDogJ1xcXFx4MDAtXFxcXHgxRlxcXFx4N0YnO1xuICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmJsYWNrbGlzdChzdHIsIGNoYXJzKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLndoaXRlbGlzdCA9IGZ1bmN0aW9uIChzdHIsIGNoYXJzKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCdbXicgKyBjaGFycyArICddKycsICdnJyksICcnKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdG9yLmJsYWNrbGlzdCA9IGZ1bmN0aW9uIChzdHIsIGNoYXJzKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCdbJyArIGNoYXJzICsgJ10rJywgJ2cnKSwgJycpO1xuICAgIH07XG5cbiAgICB2YXIgZGVmYXVsdF9ub3JtYWxpemVfZW1haWxfb3B0aW9ucyA9IHtcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlXG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5ub3JtYWxpemVFbWFpbCA9IGZ1bmN0aW9uIChlbWFpbCwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gbWVyZ2Uob3B0aW9ucywgZGVmYXVsdF9ub3JtYWxpemVfZW1haWxfb3B0aW9ucyk7XG4gICAgICAgIGlmICghdmFsaWRhdG9yLmlzRW1haWwoZW1haWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnRzID0gZW1haWwuc3BsaXQoJ0AnLCAyKTtcbiAgICAgICAgcGFydHNbMV0gPSBwYXJ0c1sxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAocGFydHNbMV0gPT09ICdnbWFpbC5jb20nIHx8IHBhcnRzWzFdID09PSAnZ29vZ2xlbWFpbC5jb20nKSB7XG4gICAgICAgICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFwuL2csICcnKTtcbiAgICAgICAgICAgIGlmIChwYXJ0c1swXVswXSA9PT0gJysnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS5zcGxpdCgnKycpWzBdO1xuICAgICAgICAgICAgcGFydHNbMV0gPSAnZ21haWwuY29tJztcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmxvd2VyY2FzZSkge1xuICAgICAgICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKCdAJyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1lcmdlKG9iaiwgZGVmYXVsdHMpIHtcbiAgICAgICAgb2JqID0gb2JqIHx8IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3VycmVuY3lSZWdleChvcHRpb25zKSB7XG4gICAgICAgIHZhciBzeW1ib2wgPSAnKFxcXFwnICsgb3B0aW9ucy5zeW1ib2wucmVwbGFjZSgvXFwuL2csICdcXFxcLicpICsgJyknICsgKG9wdGlvbnMucmVxdWlyZV9zeW1ib2wgPyAnJyA6ICc/JylcbiAgICAgICAgICAgICwgbmVnYXRpdmUgPSAnLT8nXG4gICAgICAgICAgICAsIHdob2xlX2RvbGxhcl9hbW91bnRfd2l0aG91dF9zZXAgPSAnWzEtOV1cXFxcZConXG4gICAgICAgICAgICAsIHdob2xlX2RvbGxhcl9hbW91bnRfd2l0aF9zZXAgPSAnWzEtOV1cXFxcZHswLDJ9KFxcXFwnICsgb3B0aW9ucy50aG91c2FuZHNfc2VwYXJhdG9yICsgJ1xcXFxkezN9KSonXG4gICAgICAgICAgICAsIHZhbGlkX3dob2xlX2RvbGxhcl9hbW91bnRzID0gWycwJywgd2hvbGVfZG9sbGFyX2Ftb3VudF93aXRob3V0X3NlcCwgd2hvbGVfZG9sbGFyX2Ftb3VudF93aXRoX3NlcF1cbiAgICAgICAgICAgICwgd2hvbGVfZG9sbGFyX2Ftb3VudCA9ICcoJyArIHZhbGlkX3dob2xlX2RvbGxhcl9hbW91bnRzLmpvaW4oJ3wnKSArICcpPydcbiAgICAgICAgICAgICwgZGVjaW1hbF9hbW91bnQgPSAnKFxcXFwnICsgb3B0aW9ucy5kZWNpbWFsX3NlcGFyYXRvciArICdcXFxcZHsyfSk/JztcbiAgICAgICAgdmFyIHBhdHRlcm4gPSB3aG9sZV9kb2xsYXJfYW1vdW50ICsgZGVjaW1hbF9hbW91bnQ7XG4gICAgICAgIC8vIGRlZmF1bHQgaXMgbmVnYXRpdmUgc2lnbiBiZWZvcmUgc3ltYm9sLCBidXQgdGhlcmUgYXJlIHR3byBvdGhlciBvcHRpb25zIChiZXNpZGVzIHBhcmVucylcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dfbmVnYXRpdmVzICYmICFvcHRpb25zLnBhcmVuc19mb3JfbmVnYXRpdmVzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5uZWdhdGl2ZV9zaWduX2FmdGVyX2RpZ2l0cykge1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gKz0gbmVnYXRpdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLm5lZ2F0aXZlX3NpZ25fYmVmb3JlX2RpZ2l0cykge1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBuZWdhdGl2ZSArIHBhdHRlcm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gU291dGggQWZyaWNhbiBSYW5kLCBmb3IgZXhhbXBsZSwgdXNlcyBSIDEyMyAoc3BhY2UpIGFuZCBSLTEyMyAobm8gc3BhY2UpXG4gICAgICAgIGlmIChvcHRpb25zLmFsbG93X25lZ2F0aXZlX3NpZ25fcGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHBhdHRlcm4gPSAnKCAoPyFcXFxcLSkpPycgKyBwYXR0ZXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuYWxsb3dfc3BhY2VfYWZ0ZXJfc3ltYm9sKSB7XG4gICAgICAgICAgICBwYXR0ZXJuID0gJyA/JyArIHBhdHRlcm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5hbGxvd19zcGFjZV9hZnRlcl9kaWdpdHMpIHtcbiAgICAgICAgICAgIHBhdHRlcm4gKz0gJyggKD8hJCkpPyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc3ltYm9sX2FmdGVyX2RpZ2l0cykge1xuICAgICAgICAgICAgcGF0dGVybiArPSBzeW1ib2w7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXR0ZXJuID0gc3ltYm9sICsgcGF0dGVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5hbGxvd19uZWdhdGl2ZXMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhcmVuc19mb3JfbmVnYXRpdmVzKSB7XG4gICAgICAgICAgICAgICAgcGF0dGVybiA9ICcoXFxcXCgnICsgcGF0dGVybiArICdcXFxcKXwnICsgcGF0dGVybiArICcpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEob3B0aW9ucy5uZWdhdGl2ZV9zaWduX2JlZm9yZV9kaWdpdHMgfHwgb3B0aW9ucy5uZWdhdGl2ZV9zaWduX2FmdGVyX2RpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gbmVnYXRpdmUgKyBwYXR0ZXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJ14nICtcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGVyZSdzIGEgZG9sbGFyIGFuZC9vciBkZWNpbWFsIGFtb3VudCwgYW5kIHRoYXQgaXQgZG9lc24ndCBzdGFydCB3aXRoIGEgc3BhY2Ugb3IgYSBuZWdhdGl2ZSBzaWduIGZvbGxvd2VkIGJ5IGEgc3BhY2VcbiAgICAgICAgICAgICcoPyEtPyApKD89LipcXFxcZCknICtcbiAgICAgICAgICAgIHBhdHRlcm4gK1xuICAgICAgICAgICAgJyQnXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmluaXQoKTtcblxuICAgIHJldHVybiB2YWxpZGF0b3I7XG5cbn0pO1xuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbXBvbmVudCDnu4Tku7bln7rnsbtcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWd1bGFyID0gcmVxdWlyZSgncmVndWxhcmpzJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4vZmlsdGVyLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENvbXBvbmVudFxuICogQGV4dGVuZCBSZWd1bGFyXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBDb21wb25lbnQgPSBSZWd1bGFyLmV4dGVuZCh7XG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICdjbGFzcyc6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9XG59KVxuLmZpbHRlcihmaWx0ZXIpXG4uZGlyZWN0aXZlKHtcblxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmlsdGVyID0ge307XG5cbmZpbHRlci5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBmaXgoc3RyKSB7XG4gICAgICAgIHN0ciA9ICcnICsgKFN0cmluZyhzdHIpIHx8ICcnKTtcbiAgICAgICAgcmV0dXJuIHN0ci5sZW5ndGggPD0gMT8gJzAnICsgc3RyIDogc3RyO1xuICAgIH1cbiAgICB2YXIgbWFwcyA9IHtcbiAgICAgICAgJ3l5eXknOiBmdW5jdGlvbihkYXRlKXtyZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpfSxcbiAgICAgICAgJ01NJzogZnVuY3Rpb24oZGF0ZSl7cmV0dXJuIGZpeChkYXRlLmdldE1vbnRoKCkgKyAxKTsgfSxcbiAgICAgICAgJ2RkJzogZnVuY3Rpb24oZGF0ZSl7IHJldHVybiBmaXgoZGF0ZS5nZXREYXRlKCkpIH0sXG4gICAgICAgICdISCc6IGZ1bmN0aW9uKGRhdGUpe3JldHVybiBmaXgoZGF0ZS5nZXRIb3VycygpKSB9LFxuICAgICAgICAnbW0nOiBmdW5jdGlvbihkYXRlKXsgcmV0dXJuIGZpeChkYXRlLmdldE1pbnV0ZXMoKSl9LFxuICAgICAgICAnc3MnOiBmdW5jdGlvbihkYXRlKXsgcmV0dXJuIGZpeChkYXRlLmdldFNlY29uZHMoKSl9XG4gICAgfVxuXG4gICAgdmFyIHRydW5rID0gbmV3IFJlZ0V4cChPYmplY3Qua2V5cyhtYXBzKS5qb2luKCd8JyksJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGZvcm1hdCl7XG4gICAgICAgIGlmKCF2YWx1ZSl7cmV0dXJuICcnO31cbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkIEhIOm1tJztcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdC5yZXBsYWNlKHRydW5rLCBmdW5jdGlvbihjYXB0dXJlKXtcbiAgICAgICAgICAgIHJldHVybiBtYXBzW2NhcHR1cmVdPyBtYXBzW2NhcHR1cmVdKHZhbHVlKTogJyc7XG4gICAgICAgIH0pO1xuICAgIH1cbn0oKTtcblxuZmlsdGVyLmF2ZXJhZ2UgPSBmdW5jdGlvbihhcnJheSwga2V5KSB7XG4gICAgYXJyYXkgPSBhcnJheSB8fCBbXTtcbiAgICByZXR1cm4gYXJyYXkubGVuZ3RoPyBmaWx0ZXIudG90YWwoYXJyYXksIGtleSkgLyBhcnJheS5sZW5ndGggOiAwO1xufVxuZmlsdGVyLnRvdGFsID0gZnVuY3Rpb24oYXJyYXksIGtleSkge1xuICAgIHZhciB0b3RhbCA9IDA7XG4gICAgaWYoIWFycmF5KSByZXR1cm47XG4gICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApe1xuICAgICAgICB0b3RhbCArPSBrZXk/IGl0ZW1ba2V5XSA6IGl0ZW07XG4gICAgfSlcbiAgICByZXR1cm4gdG90YWw7XG59XG5cbmZpbHRlci5maWx0ZXIgPSBmdW5jdGlvbihhcnJheSwgZmlsdGVyRm4pIHtcbiAgICBpZighYXJyYXkgfHwgIWFycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuICAgICAgICByZXR1cm4gZmlsdGVyRm4oaXRlbSwgaW5kZXgpO1xuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXdlc3QgPSByZXF1aXJlKCdyZXF3ZXN0Jyk7XG52YXIgYWpheCA9IHt9O1xuLy8gdmFyIGV2ZW50RW1pdHRlciA9IG5ldyByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXIoKTtcbi8vIHZhciBhamF4ID0ge1xuLy8gICAgICRvbjogZXZlbnRFbWl0dGVyLm9uLFxuLy8gICAgICRvZmY6IGV2ZW50RW1pdHRlci5yZW1vdmVMaXN0ZW5lcixcbi8vICAgICAkZW1pdDogZXZlbnRFbWl0dGVyLmVtaXRcbi8vIH07XG5cbnZhciBOb3RpZnkgPSByZXF1aXJlKCcuLi9tb2R1bGUvbm90aWZ5LmpzJyk7XG5cbmFqYXgucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdCkge1xuICAgIHZhciBub29wID0gZnVuY3Rpb24oKXt9O1xuICAgIHZhciBvbGRFcnJvciA9IG9wdC5lcnJvciB8fCBub29wLFxuICAgICAgICBvbGRTdWNjZXNzID0gb3B0LnN1Y2Nlc3MgfHwgbm9vcCxcbiAgICAgICAgb2xkQ29tcGxldGUgPSBvcHQuY29tcGxldGUgfHwgbm9vcDtcblxuICAgIG9wdC5kYXRhID0gb3B0LmRhdGEgfHwge307XG5cbiAgICBpZighb3B0LmNvbnRlbnRUeXBlICYmIG9wdC5tZXRob2QgJiYgb3B0Lm1ldGhvZC50b0xvd2VyQ2FzZSgpICE9PSAnZ2V0JylcbiAgICAgICAgb3B0LmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgIGVsc2VcbiAgICAgICAgb3B0LmRhdGEudGltZXN0YW1wID0gK25ldyBEYXRlO1xuXG4gICAgaWYob3B0LmNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgICAgb3B0LmRhdGEgPSBKU09OLnN0cmluZ2lmeShvcHQuZGF0YSk7XG4gICAgfVxuXG4gICAgLy9hamF4LiRlbWl0KCdzdGFydCcsIG9wdCk7XG4gICAgb3B0LnN1Y2Nlc3MgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIC8vYWpheC4kZW1pdCgnc3VjY2VzcycsIGRhdGEpO1xuXG4gICAgICAgIGlmKGRhdGEuY29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICBOb3RpZnkuZXJyb3IoZGF0YS5tc2cpO1xuICAgICAgICAgICAgb2xkRXJyb3IoZGF0YS5yZXN1bHQsIGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvbGRTdWNjZXNzKGRhdGEucmVzdWx0LCBkYXRhKTtcbiAgICB9XG5cbiAgICBvcHQuZXJyb3IgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIC8vYWpheC4kZW1pdCgnZXJyb3InLCBkYXRhKTtcbiAgICAgICAgb2xkRXJyb3IoZGF0YS5yZXN1bHQsIGRhdGEpO1xuICAgIH1cblxuICAgIG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy9hamF4LiRlbWl0KCdjb21wbGV0ZScsIGRhdGEpO1xuICAgICAgICBvbGRDb21wbGV0ZShkYXRhLnJlc3VsdCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmVxd2VzdChvcHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFqYXg7IiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFNvdXJjZUNvbXBvbmVudCDmlbDmja7nu4Tku7bln7rnsbtcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudC5qcycpO1xudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgU291cmNlQ29tcG9uZW50XG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBTb3VyY2VDb21wb25lbnQgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBzZXJ2aWNlOiBudWxsLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5kYXRhLnNlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSB0aGlzLmRhdGEuc2VydmljZTtcblxuICAgICAgICBpZih0aGlzLnNlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLiR1cGRhdGVTb3VyY2UoKTtcblxuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZ2V0UGFyYW1zIOi/lOWbnuivt+axguaXtumcgOimgeeahOWPguaVsFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG4gICAgZ2V0UGFyYW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCAkdXBkYXRlU291cmNlKCkg5LuOc2VydmljZeS4reabtOaWsOaVsOaNrua6kFxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmV0dXJuIHtTb3VyY2VDb21wb25lbnR9IHRoaXNcbiAgICAgKi9cbiAgICAkdXBkYXRlU291cmNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldExpc3QodGhpcy5nZXRQYXJhbXMoKSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLiR1cGRhdGUoJ3NvdXJjZScsIHJlc3VsdCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvdXJjZUNvbXBvbmVudDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWd1bGFyID0gcmVxdWlyZSgncmVndWxhcmpzJyk7XG5cbnZhciBfID0ge1xuICAgIGV4dGVuZDogZnVuY3Rpb24obzEsIG8yLCBvdmVycmlkZSkge1xuICAgICAgICBmb3IodmFyIGkgaW4gbzIpXG4gICAgICAgICAgICBpZihvdmVycmlkZSB8fCBvMVtpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG8xW2ldID0gbzJbaV1cbiAgICAgICAgcmV0dXJuIG8xO1xuICAgIH0sXG4gICAgZG9tOiBSZWd1bGFyLmRvbSxcbiAgICBtdWx0aWxpbmU6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgdmFyIHJlZyA9IC9eZnVuY3Rpb25cXHMqXFwoXFwpXFxzKlxce1xccypcXC9cXCorXFxzKihbXFxzXFxTXSopXFxzKlxcKitcXC9cXHMqXFx9JC87XG4gICAgICAgIHJldHVybiByZWcuZXhlYyhmdW5jKVsxXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gXzsiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVmFsaWRhdG9yIOihqOWNlemqjOivgVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHZhbGkgPSByZXF1aXJlKCd2YWxpZGF0b3InKTtcbnZhciB2YWxpZGF0b3IgPSB7fVxuXG4vKipcbiAqIDIzNTIzNVxucnVsZXMgPSBbXG4gICAge3R5cGU6ICdpc1JlcXVpcmVkJywgbWluOiAyLCBtYXg6IDVcbl1cbiovXG5cbnZhbGlkYXRvci52YWxpZGF0ZSA9IGZ1bmN0aW9uKHZhbHVlLCBydWxlcykge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgfVxuXG4gICAgcnVsZXMuZm9yRWFjaChmdW5jdGlvbihydWxlKSB7XG4gICAgICAgIHJ1bGUuc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgaWYocnVsZS50eXBlID09PSAnaXMnKSB7XG4gICAgICAgICAgICBydWxlLnN1Y2Nlc3MgPSBydWxlLnJlZy50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmKHJ1bGUudHlwZSA9PT0gJ2lzUmVxdWlyZWQnKSB7XG4gICAgICAgICAgICBydWxlLnN1Y2Nlc3MgPSAhIXZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYocnVsZS50eXBlID09PSAnaXNGaWxsZWQnKSB7XG4gICAgICAgICAgICBydWxlLnN1Y2Nlc3MgPSAhIXZhbHVlICYmIHZhbHVlLnRyaW0oKTtcbiAgICAgICAgfSBlbHNlIGlmKHJ1bGUudHlwZSA9PT0gJ2lzRW1haWwnKSB7XG4gICAgICAgICAgICBydWxlLnN1Y2Nlc3MgPSB2YWxpLmlzRW1haWwodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYocnVsZS50eXBlID09PSAnaXNVUkwnKSB7XG4gICAgICAgICAgICBydWxlLnN1Y2Nlc3MgPSB2YWxpLmlzVVJMKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmKHJ1bGUudHlwZSA9PT0gJ2lzTnVtYmVyJykge1xuICAgICAgICAgICAgcnVsZS5zdWNjZXNzID0gdmFsaS5pc0ludCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZihydWxlLnR5cGUgPT09ICdpc0ludCcpIHtcbiAgICAgICAgICAgIHJ1bGUuc3VjY2VzcyA9IHZhbGkuaXNJbnQodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYocnVsZS50eXBlID09PSAnaXNGbG9hdCcpIHtcbiAgICAgICAgICAgIHJ1bGUuc3VjY2VzcyA9IHZhbGkuaXNGbG9hdCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZihydWxlLnR5cGUgPT09ICdpc0xlbmd0aCcpIHtcbiAgICAgICAgICAgIHJ1bGUuc3VjY2VzcyA9IHZhbGkuaXNMZW5ndGgodmFsdWUsIHJ1bGUubWluLCBydWxlLm1heCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBydWxlLnN1Y2Nlc3MgPSBydWxlLm1ldGhvZCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcnVsZS5zdWNjZXNzICYmIHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBydWxlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbnZhbGlkYXRvci52YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbihkYXRhLCBmaWVsZHMpIHtcbiAgICB2YXIgY29uY2x1c2lvbiA9IHtcbiAgICAgICAgcmVzdWx0czoge30sXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgfVxuICAgIFxuICAgIGZvcih2YXIga2V5IGluIGZpZWxkcykge1xuICAgICAgICB2YXIgcnVsZXMgPSBmaWVsZHNba2V5XTtcbiAgICAgICAgaWYoIXJ1bGVzKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcblxuICAgICAgICBjb25jbHVzaW9uLnJlc3VsdHNba2V5XSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgcnVsZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25jbHVzaW9uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRvcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tYWNjb3JkaW9uIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8ci1jb250ZW50IC8+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWNjb3JkaW9uICAgICAgIOmAiemhueWNoVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2FjY29yZGlvbi5odG1sJyk7XG52YXIgaXRlbVRlbXBsYXRlID0gcmVxdWlyZSgnLi9hY2NvcmRpb25QYW5lLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEFjY29yZGlvblxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBBY2NvcmRpb24gPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnYWNjb3JkaW9uJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgc291cmNlOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbnZhciBBY2NvcmRpb25QYW5lID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2FjY29yZGlvblBhbmUnLFxuICAgIHRlbXBsYXRlOiBpdGVtVGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBvcGVuOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgaWYodGhpcy4kb3V0ZXIpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLiRvdXRlci5kYXRhLnNvdXJjZTtcbiAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIG9wZW46IG9wZW4sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGF0YS5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBhY2NvcmRpb246IHRoaXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzb3VyY2UucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihvcGVuKSB7XG4gICAgICAgIHRoaXMuZGF0YS5vcGVuID0gb3BlbjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvcmRpb247IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJhY2NvcmRpb25fcGFuZVxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImFjY29yZGlvbl9wYW5lX2hkXFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT57bmFtZX08L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiYWNjb3JkaW9uX3BhbmVfYmRcXFwiIHItaGlkZT17IW9wZW59PiAgICAgICAgeyNpbmNsdWRlIHRoaXMuJGJvZHl9ICAgIDwvZGl2PjwvZGl2PlwiIiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWNhbGVuZGFyIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9oZFxcXCI+ICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfcHJldlxcXCI+ICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIG9uLWNsaWNrPXt0aGlzLmFkZFllYXIoLTEpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1hbmdsZS1kb3VibGUtbGVmdFxcXCI+PC9pPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCIgb24tY2xpY2s9e3RoaXMuYWRkTW9udGgoLTEpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1hbmdsZS1sZWZ0XFxcIj48L2k+PC9zcGFuPiAgICAgICAgPC9zcGFuPiAgICAgICAgPHNwYW4+e2RhdGUgfCBmb3JtYXQ6IFxcJ3l5eXktTU1cXCd9PC9zcGFuPiAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX25leHRcXFwiPiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIiBvbi1jbGljaz17dGhpcy5hZGRNb250aCgxKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tYW5nbGUtcmlnaHRcXFwiPjwvaT48L3NwYW4+ICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIG9uLWNsaWNrPXt0aGlzLmFkZFllYXIoMSl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWFuZ2xlLWRvdWJsZS1yaWdodFxcXCI+PC9pPjwvc3Bhbj4gICAgICAgIDwvc3Bhbj4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX2JkXFxcIj4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX3dlZWtcXFwiPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7ml6U8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuS4gDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5LqMPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7kuIk8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuWbmzwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5LqUPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7lha08L3NwYW4+PC9kaXY+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9kYXlcXFwiPnsjbGlzdCBfZGF5cyBhcyBkYXl9PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IGRhdGUudG9EYXRlU3RyaW5nKCkgPT09IGRheS50b0RhdGVTdHJpbmcoKSwgXFwnei1tdXRlZFxcJzogZGF0ZS5nZXRNb250aCgpICE9PSBkYXkuZ2V0TW9udGgoKSwgXFwnei1kaXNcXCc6IHRoaXMuaXNEaXNhYmxlZERheShkYXkpfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChkYXkpfT57ZGF5IHwgZm9ybWF0OiBcXCdkZFxcJ308L3NwYW4+ey9saXN0fTwvZGl2PiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDYWxlbmRhciAg5pel5Y6GXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vY2FsZW5kYXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgQ2FsZW5kYXJcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtEYXRlPW51bGx9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRhdGUgICAgICAgICAgICAgICDlvZPliY3pgInmi6nnmoTml6XmnJ9cbiAqIEBwYXJhbSB7RGF0ZT1udWxsfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5taW5EYXRlICAgICAgICAgICAg5pyA5bCP5pel5pyf77yM5aaC5p6c5Li656m65YiZ5LiN6ZmQ5Yi2XG4gKiBAcGFyYW0ge0RhdGU9bnVsbH0gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubWF4RGF0ZSAgICAgICAgICAgIOacgOWkp+aXpeacn++8jOWmguaenOS4uuepuuWImeS4jemZkOWItlxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgQ2FsZW5kYXIgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBkYXRlOiBudWxsLFxuICAgICAgICAgICAgbWluRGF0ZTogbnVsbCxcbiAgICAgICAgICAgIG1heERhdGU6IG51bGwsXG4gICAgICAgICAgICBfZGF5czogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKCdkYXRlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZihuZXdWYWx1ZSAmJiBvbGRWYWx1ZSAmJiBuZXdWYWx1ZS5nZXRGdWxsWWVhcigpID09PSBvbGRWYWx1ZS5nZXRGdWxsWWVhcigpICYmIG5ld1ZhbHVlLmdldE1vbnRoKCkgPT09IG9sZFZhbHVlLmdldE1vbnRoKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZighdGhpcy5kYXRhLmRhdGUpXG4gICAgICAgICAgICB0aGlzLmdvVG9kYXkoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdXBkYXRlKCkg5pel5pyf5pS55Y+Y5ZCO5pu05paw5pel5Y6GXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGF0YS5fZGF5cyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLmRhdGEuZGF0ZTtcbiAgICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICB2YXIgbWZpcnN0ID0gbmV3IERhdGUoZGF0ZSk7IG1maXJzdC5zZXREYXRlKDEpO1xuICAgICAgICB2YXIgbWZpcnN0VGltZSA9IG1maXJzdC5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBuZmlyc3QgPSBuZXcgRGF0ZShtZmlyc3QpOyBuZmlyc3Quc2V0TW9udGgobW9udGggKyAxKTsgbmZpcnN0LnNldERhdGUoMSk7XG4gICAgICAgIHZhciBuZmlyc3RUaW1lID0gbmZpcnN0LmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGxhc3RUaW1lID0gbmZpcnN0VGltZSArICgoNyAtIG5maXJzdC5nZXREYXkoKSklNyAtIDEpKjI0KjM2MDAqMTAwMDtcbiAgICAgICAgdmFyIG51bSA9IC0gbWZpcnN0LmdldERheSgpO1xuICAgICAgICB2YXIgdG1wVGltZSwgdG1wO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB0bXBUaW1lID0gbWZpcnN0VGltZSArIChudW0rKykqMjQqMzYwMCoxMDAwO1xuICAgICAgICAgICAgdG1wID0gbmV3IERhdGUodG1wVGltZSk7XG4gICAgICAgICAgICB0aGlzLmRhdGEuX2RheXMucHVzaCh0bXApO1xuICAgICAgICB9IHdoaWxlKHRtcFRpbWUgPCBsYXN0VGltZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGFkZFllYXIoeWVhcikg6LCD5pW05bm05Lu9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge251bWJlcj0wfSB5ZWFyIOWKoC/lh4/nmoTlubTku71cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGFkZFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZCB8fCAheWVhcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0YS5kYXRlKTtcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyB5ZWFyKTtcbiAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBkYXRlO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBhZGRNb250aChtb250aCkg6LCD5pW05pyI5Lu9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge251bWJlcj0wfSBtb250aCDliqAv5YeP55qE5pyI5Lu9XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBhZGRNb250aDogZnVuY3Rpb24obW9udGgpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZCB8fCAhbW9udGgpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZSk7XG4gICAgICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgbW9udGgpO1xuICAgICAgICB0aGlzLmRhdGEuZGF0ZSA9IGRhdGU7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChkYXRlKSDpgInmi6nkuIDkuKrml6XmnJ9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7RGF0ZT1udWxsfSBkYXRlIOmAieaLqeeahOaXpeacn1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQgfHwgdGhpcy5pc0Rpc2FibGVkRGF5KGRhdGUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZGF0YS5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA5Liq5pel5pyf5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkYXRlIOW9k+WJjemAieaLqeeahOaXpeacn1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZ29Ub2RheSgpIOWbnuWIsOS7iuWkqVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGdvVG9kYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGEuZGF0ZSA9IG5ldyBEYXRlKChuZXcgRGF0ZSgpLmdldFRpbWUoKS8oMjQqMzYwMCoxMDAwKT4+MCkqKDI0KjM2MDAqMTAwMCkpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBpc0Rpc2FibGVkRGF5IOaYr+WQpuemgeeUqOafkOS4gOWkqVxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZGF5IOafkOS4gOWkqVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaXNEaXNhYmxlZERheTogZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgIHZhciBtaW5EYXRlID0gdGhpcy5kYXRhLm1pbkRhdGUgPyBuZXcgRGF0ZSgodGhpcy5kYXRhLm1pbkRhdGUuZ2V0VGltZSgpLygyNCozNjAwKjEwMDApPj4wKSooMjQqMzYwMCoxMDAwKSkgOiBudWxsO1xuICAgICAgICB2YXIgbWF4RGF0ZSA9IHRoaXMuZGF0YS5tYXhEYXRlID8gbmV3IERhdGUoKHRoaXMuZGF0YS5tYXhEYXRlLmdldFRpbWUoKS8oMjQqMzYwMCoxMDAwKT4+MCkqKDI0KjM2MDAqMTAwMCkpIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gKG1pbkRhdGUgJiYgZGF5IDwgbWluRGF0ZSkgfHwgKG1heERhdGUgJiYgZGF5ID4gbWF4RGF0ZSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FsZW5kYXI7IiwibW9kdWxlLmV4cG9ydHM9XCJcIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBFZGl0b3IgICAg57yW6L6R5ZmoXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZWRpdG9yLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEVkaXRvclxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnIHwgQmluZGluZyBQcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge3N0cmluZz0n5o+Q56S6J30gICAgICAgICAgIG9wdGlvbnMuZGF0YS50aXRsZSAgICAgICAgICAgICAg5a+56K+d5qGG5qCH6aKYIHwgVGl0bGUgb2YgRGlhbG9nXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY29udGVudCAgICAgICAgICAgIOWvueivneahhuWGheWuuVxuICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbj10cnVlfSAgICAgb3B0aW9ucy5kYXRhLm9rQnV0dG9uICAgICAgICAgICDmmK/lkKbmmL7npLrnoa7lrprmjInpkq7jgILlgLzkuLpgc3RyaW5nYOaXtuaYvuekuuivpeauteaWh+Wtl+OAglxuICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbj1mYWxzZX0gICAgb3B0aW9ucy5kYXRhLmNhbmNlbEJ1dHRvbiAgICAgICDmmK/lkKbmmL7npLrlj5bmtojmjInpkq7jgILlgLzkuLpgc3RyaW5nYOaXtuaYvuekuuivpeauteaWh+Wtl+OAglxuICogQHBhcmFtIHtudW1iZXI9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLndpZHRoICAgICAgICAgICAgICDlr7nor53moYblrr3luqbjgILlgLzkuLrlkKblrprml7blrr3luqbkuLpDU1Porr7nva7nmoTlrr3luqbjgIJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259ICAgICAgICAgICAgICAgIG9wdGlvbnMub2sgICAgICAgICAgICAgICAgICAgICAg5b2T54K55Ye756Gu5a6a55qE5pe25YCZ5omn6KGMXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSAgICAgICAgICAgICAgICBvcHRpb25zLmNhbmNlbCAgICAgICAgICAgICAgICAgIOW9k+eCueWHu+WPlua2iOeahOaXtuWAmeaJp+ihjFxuICovXG52YXIgRWRpdG9yID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ21vZGFsJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICBva0J1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICB3aWR0aDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgICAgICAvLyDor4HmmI7kuI3mmK/lhoXltYznu4Tku7ZcbiAgICAgICAgaWYodGhpcy4kcm9vdCA9PT0gdGhpcylcbiAgICAgICAgICAgIHRoaXMuJGluamVjdChkb2N1bWVudC5ib2R5KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2xvc2UocmVzdWx0KSDlhbPpl63mqKHmgIHlr7nor53moYZcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gcmVzdWx0IOeCueWHu+ehruWumui/mOaYr+WPlua2iFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2xvc2U6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNsb3NlIOWFs+mXreWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlc3VsdCDngrnlh7vkuobnoa7lrprov5jmmK/lj5bmtohcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJywge1xuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdCA/IHRoaXMub2soKSA6IHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IG9rIOehruWumuWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnb2snKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgY2xvc2Ug5Y+W5raI5a+56K+d5qGG5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tZ3JpZHZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGRpdiBjbGFzcz1cXFwiZ3JpZHZpZXdfaXRlbVxcXCIgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogc2VsZWN0ZWQgPT09IGl0ZW19IH0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvZGl2PiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogR3JpZFZpZXcgIOe9keagvOinhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2dyaWRWaWV3Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEdyaWRWaWV3XG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBHcmlkVmlldyA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdncmlkVmlldycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZFZpZXc7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLWVkaXRvciB7QChjbGFzcyl9XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgPGRpdiBjbGFzcz1cXFwiZWRpdG9yX3ByZXZpZXdcXFwiIHItaHRtbD17aHRtbH0+PC9kaXY+ICAgIDx1bCBjbGFzcz1cXFwibS10b29sYmFyIGVkaXRvcl90b29sYmFyXFxcIj4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5Yqg57KXXFxcIiBvbi1jbGljaz17dGhpcy5ib2xkKCl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWJvbGRcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5pac5L2TXFxcIiBvbi1jbGljaz17dGhpcy5pdGFsaWMoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24taXRhbGljXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGkgY2xhc3M9XFxcInNlcGVyYXRvclxcXCI+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5byV55SoXFxcIiBvbi1jbGljaz17dGhpcy5xdW90ZSgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1xdW90ZVxcXCI+PC9pPjwvYT48L2xpPiAgICAgICAgPGxpPjxhIHRpdGxlPVxcXCLml6Dluo/liJfooahcXFwiIG9uLWNsaWNrPXt0aGlzLnVsKCl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWxpc3QtdWxcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5pyJ5bqP5YiX6KGoXFxcIiBvbi1jbGljaz17dGhpcy5vbCgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1saXN0LW9sXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGkgY2xhc3M9XFxcInNlcGVyYXRvclxcXCI+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi6ZO+5o6lXFxcIiBvbi1jbGljaz17dGhpcy5saW5rKCl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWxpbmtcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5Zu+54mHXFxcIiBvbi1jbGljaz17dGhpcy5pbWFnZSgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1pbWFnZVxcXCI+PC9pPjwvYT48L2xpPiAgICA8L3VsPiAgICA8dGV4dGFyZWEgY2xhc3M9XFxcImVkaXRvcl90ZXh0YXJlYVxcXCIgci1tb2RlbD17Y29udGVudH0gcmVmPVxcXCJ0ZXh0YXJlYVxcXCIgeyNpZiByZWFkb25seX1yZWFkb25seXsvaWZ9PjwvdGV4dGFyZWE+PC9kaXY+PHVwbG9hZGVyIHZpc2libGU9e2ZhbHNlfSB1cmw9e2ltYWdlVXJsfSBleHRlbnNpb25zPXtleHRlbnNpb25zfSByZWY9XFxcInVwbG9hZGVyXFxcIiBvbi1zdWNjZXNzPXt0aGlzLnVwbG9hZGVyU3VjY2VzcygkZXZlbnQpfSBvbi1lcnJvcj17dGhpcy51cGxvYWRlckVycm9yKCRldmVudCl9IC8+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogSFRNTEVkaXRvciDnvJbovpHlmahcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9odG1sRWRpdG9yLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEhUTUxFZGl0b3JcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5jYW5jZWwgICAgICAgICAgICAgICAgICDlvZPngrnlh7vlj5bmtojnmoTml7blgJnmiafooYxcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqL1xudmFyIEhUTUxFZGl0b3IgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnaHRtbEVkaXRvcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGh0bWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jb250ZW50O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBib2xkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnKionICsgcmFuZ2VEYXRhLnRleHQgKyAnKionO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBpdGFsaWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICcqJyArIHJhbmdlRGF0YS50ZXh0ICsgJyonO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBxdW90ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIGZvcih2YXIgaSA9IHJhbmdlRGF0YS5zdGFydDsgaSA+IDA7IGktLSlcbiAgICAgICAgICAgIGlmKHZhbHVlW2ldID09ICdcXG4nKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICc+ICc7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIHVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgZm9yKHZhciBpID0gcmFuZ2VEYXRhLnN0YXJ0OyBpID4gMDsgaS0tKVxuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT0gJ1xcbicpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIHJhbmdlRGF0YS5zdGFydCA9IGk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJy0gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgb2w6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICBmb3IodmFyIGkgPSByYW5nZURhdGEuc3RhcnQ7IGkgPiAwOyBpLS0pXG4gICAgICAgICAgICBpZih2YWx1ZVtpXSA9PSAnXFxuJylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnMS4gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJ1vpk77mjqVdKGh0dHA6Ly8pJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgaW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZGVyLnVwbG9hZCgpO1xuICAgIH0sXG4gICAgbGF0ZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICckJGFeMiArIGJeMiA9IGNeMiQkJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdXBsb2FkZXJTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJ1xcbiFbXSh+LycgKyBkYXRhLnJlc3VsdCArICcpJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdXBsb2FkZXJFcnJvcjogZnVuY3Rpb24oZSkge1xuICAgICAgICBOb3RpZnkuZXJyb3IoZSk7XG4gICAgfSxcbiAgICBnZXRDdXJzb3JQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0YXJlYSA9IHRoaXMuJHJlZnMudGV4dGFyZWE7XG5cbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHt0ZXh0OiAnJywgc3RhcnQ6IDAsIGVuZDogMCB9O1xuICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgaWYgKHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKSB7IC8vIFczQ1xuICAgICAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0PSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5lbmQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQ7XG4gICAgICAgICAgICByYW5nZURhdGEudGV4dCA9IChyYW5nZURhdGEuc3RhcnQgIT0gcmFuZ2VEYXRhLmVuZCkgPyB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcocmFuZ2VEYXRhLnN0YXJ0LCByYW5nZURhdGEuZW5kKTogJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7IC8vIElFXG4gICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICBvUyA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLFxuICAgICAgICAgICAgICAgIC8vIERvbid0OiBvUiA9IHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSgpXG4gICAgICAgICAgICAgICAgb1IgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgb1IubW92ZVRvRWxlbWVudFRleHQodGV4dGFyZWEpO1xuXG4gICAgICAgICAgICByYW5nZURhdGEudGV4dCA9IG9TLnRleHQ7XG4gICAgICAgICAgICByYW5nZURhdGEuYm9va21hcmsgPSBvUy5nZXRCb29rbWFyaygpO1xuXG4gICAgICAgICAgICAvLyBvYmplY3QubW92ZVN0YXJ0KHNVbml0IFssIGlDb3VudF0pXG4gICAgICAgICAgICAvLyBSZXR1cm4gVmFsdWU6IEludGVnZXIgdGhhdCByZXR1cm5zIHRoZSBudW1iZXIgb2YgdW5pdHMgbW92ZWQuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBvUi5jb21wYXJlRW5kUG9pbnRzKCdTdGFydFRvU3RhcnQnLCBvUykgPCAwICYmIG9TLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLTEpICE9PSAwOyBpICsrKSB7XG4gICAgICAgICAgICAgICAgLy8gV2h5PyBZb3UgY2FuIGFsZXJ0KHRleHRhcmVhLnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBpZiAodGV4dGFyZWEudmFsdWUuY2hhckF0KGkpID09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEudGV4dC5sZW5ndGggKyByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmFuZ2VEYXRhO1xuICAgIH0sXG4gICAgc2V0Q3Vyc29yUG9zaXRpb246IGZ1bmN0aW9uKHJhbmdlRGF0YSkge1xuICAgICAgICBpZighcmFuZ2VEYXRhKSB7XG4gICAgICAgICAgICBhbGVydChcIllvdSBtdXN0IGdldCBjdXJzb3IgcG9zaXRpb24gZmlyc3QuXCIpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRleHRhcmVhID0gdGhpcy4kcmVmcy50ZXh0YXJlYTtcblxuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvbGRWYWx1ZS5zdWJzdHJpbmcoMCwgcmFuZ2VEYXRhLnN0YXJ0KSArIHJhbmdlRGF0YS50ZXh0ICsgb2xkVmFsdWUuc3Vic3RyaW5nKHJhbmdlRGF0YS5lbmQsIG9sZFZhbHVlLmxlbmd0aCk7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQgKyByYW5nZURhdGEudGV4dC5sZW5ndGg7XG4gICAgICAgIGlmICh0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZSkgeyAvLyBXM0NcbiAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZShyYW5nZURhdGEuc3RhcnQsIHJhbmdlRGF0YS5lbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSkgeyAvLyBJRVxuICAgICAgICAgICAgdmFyIG9SID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICAvLyBGaXhidWcgOlxuICAgICAgICAgICAgLy8gSW4gSUUsIGlmIGN1cnNvciBwb3NpdGlvbiBhdCB0aGUgZW5kIG9mIHRleHRhcmVhLCB0aGUgc2V0Q3Vyc29yUG9zaXRpb24gZnVuY3Rpb24gZG9uJ3Qgd29ya1xuICAgICAgICAgICAgaWYodGV4dGFyZWEudmFsdWUubGVuZ3RoID09PSByYW5nZURhdGEuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBvUi5jb2xsYXBzZShmYWxzZSlcbiAgICAgICAgICAgICAgICBvUi5zZWxlY3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb1IubW92ZVRvQm9va21hcmsocmFuZ2VEYXRhLmJvb2ttYXJrKTtcbiAgICAgICAgICAgICAgICBvUi5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUxFZGl0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cz1cIjx1bCBjbGFzcz1cXFwibS1saXN0dmlldyB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfT4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bGkgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogc2VsZWN0ZWQgPT09IGl0ZW0sIFxcJ3otZGlzXFwnOiBpdGVtLmRpc2FibGVkfSB9IHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvbGk+ICAgIHsvbGlzdH08L3VsPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIExpc3RWaWV3ICDliJfooajop4blm75cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9saXN0Vmlldy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBMaXN0Vmlld1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7c3RyaW5nPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5pdGVtVGVtcGxhdGUgICAgICAg5Y2V6aG55qih5p2/XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgTGlzdFZpZXcgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbGlzdFZpZXcnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQgfHwgaXRlbS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdFZpZXc7IiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1hcmtFZGl0b3Ig57yW6L6R5ZmoXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbWFya0VkaXRvci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG52YXIgbWFya2VkID0gcmVxdWlyZSgnbWFya2VkJyk7XG5cbi8qKlxuICogQGNsYXNzIE1hcmtFZGl0b3JcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5jYW5jZWwgICAgICAgICAgICAgICAgICDlvZPngrnlh7vlj5bmtojnmoTml7blgJnmiafooYxcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqL1xudmFyIE1hcmtFZGl0b3IgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbWFya0VkaXRvcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGh0bWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hcmtlZCh0aGlzLmRhdGEuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJvbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICcqKicgKyByYW5nZURhdGEudGV4dCArICcqKic7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIGl0YWxpYzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJyonICsgcmFuZ2VEYXRhLnRleHQgKyAnKic7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIHF1b3RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgZm9yKHZhciBpID0gcmFuZ2VEYXRhLnN0YXJ0OyBpID4gMDsgaS0tKVxuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT0gJ1xcbicpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIHJhbmdlRGF0YS5zdGFydCA9IGk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJz4gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICBmb3IodmFyIGkgPSByYW5nZURhdGEuc3RhcnQ7IGkgPiAwOyBpLS0pXG4gICAgICAgICAgICBpZih2YWx1ZVtpXSA9PSAnXFxuJylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnLSAnO1xuICAgICAgICByYW5nZURhdGEuZW5kID0gcmFuZ2VEYXRhLnN0YXJ0O1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBvbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIGZvcih2YXIgaSA9IHJhbmdlRGF0YS5zdGFydDsgaSA+IDA7IGktLSlcbiAgICAgICAgICAgIGlmKHZhbHVlW2ldID09ICdcXG4nKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICcxLiAnO1xuICAgICAgICByYW5nZURhdGEuZW5kID0gcmFuZ2VEYXRhLnN0YXJ0O1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBsaW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnW+mTvuaOpV0oaHR0cDovLyknO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBpbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJHJlZnMudXBsb2FkZXIudXBsb2FkKCk7XG4gICAgfSxcbiAgICBsYXRleDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJyQkYV4yICsgYl4yID0gY14yJCQnO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICB1cGxvYWRlclN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnXFxuIVtdKH4vJyArIGRhdGEucmVzdWx0ICsgJyknO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICB1cGxvYWRlckVycm9yOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIE5vdGlmeS5lcnJvcihlKTtcbiAgICB9LFxuICAgIGdldEN1cnNvclBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHRhcmVhID0gdGhpcy4kcmVmcy50ZXh0YXJlYTtcblxuICAgICAgICB2YXIgcmFuZ2VEYXRhID0ge3RleHQ6ICcnLCBzdGFydDogMCwgZW5kOiAwIH07XG4gICAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICBpZiAodGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2UpIHsgLy8gVzNDXG4gICAgICAgICAgICByYW5nZURhdGEuc3RhcnQ9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHRleHRhcmVhLnNlbGVjdGlvbkVuZDtcbiAgICAgICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gKHJhbmdlRGF0YS5zdGFydCAhPSByYW5nZURhdGEuZW5kKSA/IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZyhyYW5nZURhdGEuc3RhcnQsIHJhbmdlRGF0YS5lbmQpOiAnJztcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHsgLy8gSUVcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIG9TID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCksXG4gICAgICAgICAgICAgICAgLy8gRG9uJ3Q6IG9SID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKClcbiAgICAgICAgICAgICAgICBvUiA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICBvUi5tb3ZlVG9FbGVtZW50VGV4dCh0ZXh0YXJlYSk7XG5cbiAgICAgICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gb1MudGV4dDtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5ib29rbWFyayA9IG9TLmdldEJvb2ttYXJrKCk7XG5cbiAgICAgICAgICAgIC8vIG9iamVjdC5tb3ZlU3RhcnQoc1VuaXQgWywgaUNvdW50XSlcbiAgICAgICAgICAgIC8vIFJldHVybiBWYWx1ZTogSW50ZWdlciB0aGF0IHJldHVybnMgdGhlIG51bWJlciBvZiB1bml0cyBtb3ZlZC5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IG9SLmNvbXBhcmVFbmRQb2ludHMoJ1N0YXJ0VG9TdGFydCcsIG9TKSA8IDAgJiYgb1MubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtMSkgIT09IDA7IGkgKyspIHtcbiAgICAgICAgICAgICAgICAvLyBXaHk/IFlvdSBjYW4gYWxlcnQodGV4dGFyZWEudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0YXJlYS52YWx1ZS5jaGFyQXQoaSkgPT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaSArKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS50ZXh0Lmxlbmd0aCArIHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByYW5nZURhdGE7XG4gICAgfSxcbiAgICBzZXRDdXJzb3JQb3NpdGlvbjogZnVuY3Rpb24ocmFuZ2VEYXRhKSB7XG4gICAgICAgIGlmKCFyYW5nZURhdGEpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91IG11c3QgZ2V0IGN1cnNvciBwb3NpdGlvbiBmaXJzdC5cIilcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dGFyZWEgPSB0aGlzLiRyZWZzLnRleHRhcmVhO1xuXG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IG9sZFZhbHVlLnN1YnN0cmluZygwLCByYW5nZURhdGEuc3RhcnQpICsgcmFuZ2VEYXRhLnRleHQgKyBvbGRWYWx1ZS5zdWJzdHJpbmcocmFuZ2VEYXRhLmVuZCwgb2xkVmFsdWUubGVuZ3RoKTtcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydCArIHJhbmdlRGF0YS50ZXh0Lmxlbmd0aDtcbiAgICAgICAgaWYgKHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKSB7IC8vIFczQ1xuICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICAgIHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKHJhbmdlRGF0YS5zdGFydCwgcmFuZ2VEYXRhLmVuZCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKSB7IC8vIElFXG4gICAgICAgICAgICB2YXIgb1IgPSB0ZXh0YXJlYS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgICAgIC8vIEZpeGJ1ZyA6XG4gICAgICAgICAgICAvLyBJbiBJRSwgaWYgY3Vyc29yIHBvc2l0aW9uIGF0IHRoZSBlbmQgb2YgdGV4dGFyZWEsIHRoZSBzZXRDdXJzb3JQb3NpdGlvbiBmdW5jdGlvbiBkb24ndCB3b3JrXG4gICAgICAgICAgICBpZih0ZXh0YXJlYS52YWx1ZS5sZW5ndGggPT09IHJhbmdlRGF0YS5zdGFydCkge1xuICAgICAgICAgICAgICAgIG9SLmNvbGxhcHNlKGZhbHNlKVxuICAgICAgICAgICAgICAgIG9SLnNlbGVjdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvUi5tb3ZlVG9Cb29rbWFyayhyYW5nZURhdGEuYm9va21hcmspO1xuICAgICAgICAgICAgICAgIG9SLnNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya0VkaXRvcjtcbiIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdj4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bWVudSBuYW1lPXtpdGVtLm5hbWV9IHNvdXJjZT17aXRlbS5jaGlsZHJlbn0gLz4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1lbnViYXIgIOWIl+ihqOinhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21lbnViYXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcbnZhciBNZW51ID0gcmVxdWlyZSgnLi4vdW5pdC9tZW51LmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIE1lbnViYXJcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zZWxlY3RlZCAgICAgICAgICAg5b2T5YmN6YCJ5oup6aG5XG4gKiBAcGFyYW0ge3N0cmluZz1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuaXRlbVRlbXBsYXRlICAgICAgIOWNlemhueaooeadv1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIE1lbnViYXIgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbWVudWJhcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVudWJhcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tbW9kYWwge0AoY2xhc3MpfVxcXCIgb24ta2V5dXA9e3RoaXMua2V5dXAoJGV2ZW50KX0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2RpYWxvZ1xcXCIgeyNpZiB3aWR0aH1zdHlsZT1cXFwid2lkdGg6IHt3aWR0aH1weFxcXCJ7L2lmfT4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2hkXFxcIj4gICAgICAgICAgICA8YSBjbGFzcz1cXFwibW9kYWxfY2xvc2VcXFwiIG9uLWNsaWNrPXt0aGlzLmNsb3NlKCFjYW5jZWxCdXR0b24pfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jbG9zZVxcXCI+PC9pPjwvYT4gICAgICAgICAgICA8aDMgY2xhc3M9XFxcIm1vZGFsX3RpdGxlXFxcIj57dGl0bGV9PC9oMz4gICAgICAgIDwvZGl2PiAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWxfYmRcXFwiPiAgICAgICAgICAgIHsjaWYgY29udGVudFRlbXBsYXRlfXsjaW5jbHVkZSBAKGNvbnRlbnRUZW1wbGF0ZSl9eyNlbHNlfXtjb250ZW50fXsvaWZ9ICAgICAgICA8L2Rpdj4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2Z0XFxcIj4gICAgICAgICAgICB7I2lmIG9rQnV0dG9ufSAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInUtYnRuIHUtYnRuLXByaW1hcnlcXFwiIG9uLWNsaWNrPXt0aGlzLmNsb3NlKHRydWUpfT57b2tCdXR0b24gPT09IHRydWUgPyBcXCfnoa7lrppcXCcgOiBva0J1dHRvbn08L2J1dHRvbj4gICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIHsjaWYgY2FuY2VsQnV0dG9ufSAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInUtYnRuXFxcIiBvbi1jbGljaz17dGhpcy5jbG9zZShmYWxzZSl9PntjYW5jZWxCdXR0b24gPT09IHRydWUgPyBcXCflj5bmtohcXCcgOiBjYW5jZWxCdXR0b259PC9idXR0b24+ICAgICAgICAgICAgey9pZn0gICAgICAgIDwvZGl2PiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2RhbCAgICAg5qih5oCB5a+56K+d5qGGXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbW9kYWwuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgTW9kYWxcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNvbnRlbnQgICAgICAgICAgICDlr7nor53moYblhoXlrrlcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49dHJ1ZX0gICAgIG9wdGlvbnMuZGF0YS5va0J1dHRvbiAgICAgICAgICAg5piv5ZCm5pi+56S656Gu5a6a5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49ZmFsc2V9ICAgIG9wdGlvbnMuZGF0YS5jYW5jZWxCdXR0b24gICAgICAg5piv5ZCm5pi+56S65Y+W5raI5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7bnVtYmVyPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS53aWR0aCAgICAgICAgICAgICAg5a+56K+d5qGG5a695bqm44CC5YC85Li65ZCm5a6a5pe25a695bqm5Li6Q1NT6K6+572u55qE5a695bqm44CCXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBNb2RhbCA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdtb2RhbCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgb2tCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgd2lkdGg6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICAgICAgLy8g6K+B5piO5LiN5piv5YaF5bWM57uE5Lu2XG4gICAgICAgIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpXG4gICAgICAgICAgICB0aGlzLiRpbmplY3QoZG9jdW1lbnQuYm9keSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlKHJlc3VsdCkg5YWz6Zet5qih5oCB5a+56K+d5qGGXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IHJlc3VsdCDngrnlh7vnoa7lrprov5jmmK/lj5bmtohcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNsb3NlOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjbG9zZSDlhbPpl63lr7nor53moYbml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSByZXN1bHQg54K55Ye75LqG56Gu5a6a6L+Y5piv5Y+W5raIXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPyB0aGlzLm9rKCkgOiB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIG9rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBvayDnoa7lrprlr7nor53moYbml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ29rJyk7XG5cbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNhbmNlbCDlj5bmtojlr7nor53moYbml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0sXG4gICAga2V5dXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZigkZXZlbnQud2hpY2ggPT0gMTMpXG4gICAgICAgICAgICB0aGlzLm9rKCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQG1ldGhvZCBhbGVydChjb250ZW50Wyx0aXRsZV0pIOW8ueWHuuS4gOS4qmFsZXJ05a+56K+d5qGG44CC5YWz6Zet5pe25aeL57uI6Kem5Y+R56Gu5a6a5LqL5Lu244CCXG4gKiBAc3RhdGljXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gIHtzdHJpbmc9Jyd9IGNvbnRlbnQg5a+56K+d5qGG5YaF5a65XG4gKiBAcGFyYW0gIHtzdHJpbmc9J+aPkOekuid9IHRpdGxlIOWvueivneahhuagh+mimFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuTW9kYWwuYWxlcnQgPSBmdW5jdGlvbihjb250ZW50LCB0aXRsZSwgb2tCdXR0b24pIHtcbiAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgb2tCdXR0b246IG9rQnV0dG9uXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbW9kYWw7XG59XG5cbi8qKlxuICogQG1ldGhvZCBjb25maXJtKGNvbnRlbnRbLHRpdGxlXSkg5by55Ye65LiA5LiqY29uZmlybeWvueivneahhlxuICogQHN0YXRpY1xuICogQHB1YmxpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSBjb250ZW50IOWvueivneahhuWGheWuuVxuICogQHBhcmFtICB7c3RyaW5nPSfmj5DnpLonfSB0aXRsZSDlr7nor53moYbmoIfpophcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk1vZGFsLmNvbmZpcm0gPSBmdW5jdGlvbihjb250ZW50LCB0aXRsZSwgb2tCdXR0b24sIGNhbmNlbEJ1dHRvbikge1xuICAgIHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBva0J1dHRvbjogb2tCdXR0b24sXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246IGNhbmNlbEJ1dHRvbiB8fCB0cnVlXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbW9kYWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWw7XG4iLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tbm90aWZ5IG0tbm90aWZ5LXtAKHBvc2l0aW9uKX0ge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBtZXNzYWdlcyBhcyBtZXNzYWdlfSAgICA8ZGl2IGNsYXNzPVxcXCJub3RpZnlfbWVzc2FnZSBub3RpZnlfbWVzc2FnZS17QChtZXNzYWdlLnR5cGUpfVxcXCIgci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJbiBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0IGZhc3Q7XFxcIj4gICAgICAgIDxhIGNsYXNzPVxcXCJub3RpZnlfY2xvc2VcXFwiIG9uLWNsaWNrPXt0aGlzLmNsb3NlKG1lc3NhZ2UpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jbG9zZVxcXCI+PC9pPjwvYT4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm5vdGlmeV90ZXh0XFxcIj48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi17QChtZXNzYWdlLnR5cGUpfS1jaXJjbGVcXFwiIHItaGlkZT17QCghbWVzc2FnZS50eXBlKX0+PC9pPiB7QChtZXNzYWdlLnRleHQpfTwvZGl2PiAgICA8L2Rpdj4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE5vdGlmeSAgICDpgJrnn6VcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9ub3RpZnkuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgTm90aWZ5XG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnm5HlkKzmlbDmja5cbiAqIEBwYXJhbSB7c3RyaW5nPSd0b3BjZW50ZXInfSAgICAgIG9wdGlvbnMuZGF0YS5wb3NpdGlvbiAgICAgICAgICAg6YCa55+l55qE5L2N572u77yM5Y+v6YCJ5Y+C5pWw77yaYHRvcGNlbnRlcmDjgIFgdG9wbGVmdGDjgIFgdG9wcmlnaHRg44CBYGJvdHRvbWNlbnRlcmDjgIFgYm90dG9tbGVmdGDjgIFgYm90dG9tcmlnaHRg44CBYHN0YXRpY2BcbiAqIEBwYXJhbSB7bnVtYmVyPTIwMDB9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kdXJhdGlvbiAgICAgICAgICAg5q+P5p2h5raI5oGv55qE5YGc55WZ5q+r56eS5pWw77yM5aaC5p6c5Li6MO+8jOWImeihqOekuua2iOaBr+W4uOmpu+S4jea2iOWkseOAglxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIE5vdGlmeSA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdub3RpZnknLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3RvcGNlbnRlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgICAgICAvLyDor4HmmI7kuI3mmK/lhoXltYznu4Tku7ZcbiAgICAgICAgaWYodGhpcy4kcm9vdCA9PT0gdGhpcylcbiAgICAgICAgICAgIHRoaXMuJGluamVjdChkb2N1bWVudC5ib2R5KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2hvdyh0ZXh0Wyx0eXBlXVssZHVyYXRpb25dKSDlvLnlh7rkuIDkuKrmtojmga9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7c3RyaW5nPScnfSB0ZXh0IOa2iOaBr+WGheWuuVxuICAgICAqIEBwYXJhbSAge3N0cmluZz1udWxsfSB0eXBlIOa2iOaBr+exu+Wei++8jOWPr+mAieWPguaVsO+8mmBpbmZvYOOAgWBzdWNjZXNzYOOAgWB3YXJuaW5nYOOAgWBlcnJvcmBcbiAgICAgKiBAcGFyYW0gIHtudW1iZXI9bm90aWZ5LmR1cmF0aW9ufSBkdXJhdGlvbiDor6XmnaHmtojmga/nmoTlgZznlZnmr6vnp5LmlbDvvIzlpoLmnpzkuLow77yM5YiZ6KGo56S65raI5oGv5bi46am75LiN5raI5aSx44CCXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzaG93OiBmdW5jdGlvbih0ZXh0LCB0eXBlLCBkdXJhdGlvbikge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uID49IDAgPyBkdXJhdGlvbiA6IHRoaXMuZGF0YS5kdXJhdGlvblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGEubWVzc2FnZXMudW5zaGlmdChtZXNzYWdlKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG5cbiAgICAgICAgaWYobWVzc2FnZS5kdXJhdGlvbilcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQodGhpcy5jbG9zZS5iaW5kKHRoaXMsIG1lc3NhZ2UpLCBtZXNzYWdlLmR1cmF0aW9uKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNob3cg5by55Ye65LiA5Liq5raI5oGv5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtZXNzYWdlIOW8ueWHuueahOa2iOaBr+WvueixoVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2hvdycsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlKG1lc3NhZ2UpIOWFs+mXreafkOadoea2iOaBr1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IG1lc3NhZ2Ug6ZyA6KaB5YWz6Zet55qE5raI5oGv5a+56LGhXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjbG9zZTogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmRhdGEubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5kYXRhLm1lc3NhZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNsb3NlIOWFs+mXreafkOadoea2iOaBr+aXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gbWVzc2FnZSDlhbPpl63kuobnmoTmtojmga/lr7nosaFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJywge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2xvc2VBbGwoKSDlhbPpl63miYDmnInmtojmga9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjbG9zZUFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgnbWVzc2FnZXMnLCBbXSk7XG4gICAgfVxufSkudXNlKCckdGltZW91dCcpO1xuXG5cbi8qKlxuICog55u05o6l5Yid5aeL5YyW5LiA5Liq5a6e5L6LXG4gKiBAdHlwZSB7Tm90aWZ5fVxuICovXG52YXIgbm90aWZ5ID0gbmV3IE5vdGlmeSgpO1xuTm90aWZ5Lm5vdGlmeSA9IG5vdGlmeTtcblxuLyoqXG4gKiBAbWV0aG9kIHNob3codGV4dFssdHlwZV1bLGR1cmF0aW9uXSkg5by55Ye65LiA5Liq5raI5oGvXG4gKiBAc3RhdGljXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gIHtzdHJpbmc9Jyd9IHRleHQg5raI5oGv5YaF5a65XG4gKiBAcGFyYW0gIHtzdHJpbmc9bnVsbH0gdHlwZSDmtojmga/nsbvlnovvvIzlj6/pgInlj4LmlbDvvJpgaW5mb2DjgIFgc3VjY2Vzc2DjgIFgd2FybmluZ2DjgIFgZXJyb3JgXG4gKiBAcGFyYW0gIHtudW1iZXI9bm90aWZ5LmR1cmF0aW9ufSBkdXJhdGlvbiDor6XmnaHmtojmga/nmoTlgZznlZnmr6vnp5LmlbDvvIzlpoLmnpzkuLow77yM5YiZ6KGo56S65raI5oGv5bi46am75LiN5raI5aSx44CCXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5Ob3RpZnkuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgIG5vdGlmeS5zaG93LmFwcGx5KG5vdGlmeSwgYXJndW1lbnRzKTtcbn1cbi8qKlxuICogQG1ldGhvZCBbaW5mb3xzdWNjZXNzfHdhcm5pbmd8ZXJyb3JdKHRleHQpIOW8ueWHuueJueauiuexu+Wei+eahOa2iOaBr1xuICogQHN0YXRpY1xuICogQHB1YmxpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSB0ZXh0IOa2iOaBr+WGheWuuVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHR5cGVzID0gWydzdWNjZXNzJywgJ3dhcm5pbmcnLCAnaW5mbycsICdlcnJvciddO1xudHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XG4gICAgTm90aWZ5W3R5cGVdID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICBOb3RpZnkuc2hvdyh0ZXh0LCB0eXBlKTtcbiAgICB9XG59KTtcbi8qKlxuICogQG1ldGhvZCBjbG9zZShtZXNzYWdlKSDlhbPpl63mn5DmnaHmtojmga9cbiAqIEBzdGF0aWNcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSAge29iamVjdH0gbWVzc2FnZSDpnIDopoHlhbPpl63nmoTmtojmga/lr7nosaFcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk5vdGlmeS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIG5vdGlmeS5jbG9zZS5hcHBseShub3RpZnksIGFyZ3VtZW50cyk7XG59XG4vKipcbiAqIEBtZXRob2QgY2xvc2VBbGwoKSDlhbPpl63miYDmnInmtojmga9cbiAqIEBzdGF0aWNcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk5vdGlmeS5jbG9zZUFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIG5vdGlmeS5jbG9zZUFsbC5hcHBseShub3RpZnksIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm90aWZ5OyIsIm1vZHVsZS5leHBvcnRzPVwiPHVsIGNsYXNzPVxcXCJtLXBhZ2VyIG0tcGFnZXIte0AocG9zaXRpb24pfSB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfT4gICAgPGxpIGNsYXNzPVxcXCJwYWdlcl9wcmV2XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnIDogY3VycmVudCA8PSAxfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChjdXJyZW50IC0gMSl9PjxhPuS4iuS4gOmhtTwvYT48L2xpPiAgICB7I2lmIHRvdGFsIC0gbWlkZGxlID4gc2lkZSAqIDIgKyAxfSAgICAgICAgeyNsaXN0IDEuLnNpZGUgYXMgaX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBjdXJyZW50ID09IGl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGkpfT48YT57aX08L2E+PC9saT4gICAgICAgIHsvbGlzdH0gICAgICAgIHsjaWYgX3N0YXJ0ID4gc2lkZSArIDF9PGxpPi4uLjwvbGk+ey9pZn0gICAgICAgIHsjbGlzdCBfc3RhcnQuLl9lbmQgYXMgaX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBjdXJyZW50ID09IGl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGkpfT48YT57aX08L2E+PC9saT4gICAgICAgIHsvbGlzdH0gICAgICAgIHsjaWYgX2VuZCA8IHRvdGFsIC0gc2lkZX08bGk+Li4uPC9saT57L2lmfSAgICAgICAgeyNsaXN0ICh0b3RhbCAtIHNpZGUgKyAxKS4udG90YWwgYXMgaX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBjdXJyZW50ID09IGl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGkpfT48YT57aX08L2E+PC9saT4gICAgICAgIHsvbGlzdH0gICAgeyNlbHNlfSAgICAgICAgeyNsaXN0IDEuLnRvdGFsIGFzIGl9ICAgICAgICA8bGkgci1jbGFzcz17IHtcXCd6LWNydFxcJzogY3VycmVudCA9PSBpfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpKX0+PGE+e2l9PC9hPjwvbGk+ICAgICAgICB7L2xpc3R9ICAgIHsvaWZ9ICAgIDxsaSBjbGFzcz1cXFwicGFnZXJfbmV4dFxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJyA6IGN1cnJlbnQgPj0gdG90YWx9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGN1cnJlbnQgKyAxKX0+PGE+5LiL5LiA6aG1PC9hPjwvbGk+PC91bD5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQYWdlciAgICAg5YiG6aG1XG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3BhZ2VyLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFBhZ2VyXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnm5HlkKzmlbDmja5cbiAqIEBwYXJhbSB7bnVtYmVyPTF9ICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jdXJyZW50ICAgICAgICAgICAg5b2T5YmN6aG1XG4gKiBAcGFyYW0ge3RvdGFsPTExfSAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEudG90YWwgICAgICAgICAgICAgIOaAu+mhteaVsFxuICogQHBhcmFtIHtzdHJpbmc9J2NlbnRlcid9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBvc2l0aW9uICAgICAgICAgICDliIbpobXnmoTkvY3nva7vvIzlj6/pgInlj4LmlbDvvJpgY2VudGVyYOOAgWBsZWZ0YOOAgWByaWdodGBcbiAqIEBwYXJhbSB7bWlkZGxlPTV9ICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5taWRkbGUgICAgICAgICAgICAg5b2T6aG15pWw6L6D5aSa5pe277yM5Lit6Ze05pi+56S655qE6aG15pWwXG4gKiBAcGFyYW0ge3NpZGU9Mn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2lkZSAgICAgICAgICAgICAgIOW9k+mhteaVsOi+g+WkmuaXtu+8jOS4pOerr+aYvuekuueahOmhteaVsFxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgUGFnZXIgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAncGFnZXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IDEsXG4gICAgICAgICAgICB0b3RhbDogMTEsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBtaWRkbGU6IDUsXG4gICAgICAgICAgICBzaWRlOiAyLFxuICAgICAgICAgICAgX3N0YXJ0OiAxLFxuICAgICAgICAgICAgX2VuZDogNVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgdGhpcy4kd2F0Y2goWydjdXJyZW50JywgJ3RvdGFsJ10sIGZ1bmN0aW9uKGN1cnJlbnQsIHRvdGFsKSB7XG4gICAgICAgICAgICB2YXIgc2hvdyA9IHRoaXMuZGF0YS5taWRkbGU+PjE7XG4gICAgICAgICAgICB2YXIgc2lkZSA9IHRoaXMuZGF0YS5zaWRlO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEuX3N0YXJ0ID0gY3VycmVudCAtIHNob3c7XG4gICAgICAgICAgICB0aGlzLmRhdGEuX2VuZCA9IGN1cnJlbnQgKyBzaG93O1xuICAgICAgICAgICAgaWYodGhpcy5kYXRhLl9zdGFydCA8IHNpZGUgKyAxKVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5fc3RhcnQgPSBzaWRlICsgMTtcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5fZW5kID4gdG90YWwgLSBzaWRlKVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5fZW5kID0gdG90YWwgLSBzaWRlO1xuICAgICAgICAgICAgaWYoY3VycmVudCAtIHRoaXMuZGF0YS5fc3RhcnQgPCBzaG93KVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5fZW5kICs9IHRoaXMuZGF0YS5fc3RhcnQgLSBjdXJyZW50ICsgc2hvdztcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5fZW5kIC0gY3VycmVudCA8IHNob3cpXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLl9zdGFydCArPSB0aGlzLmRhdGEuX2VuZCAtIGN1cnJlbnQgLSBzaG93O1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KHBhZ2UpIOmAieaLqeafkOS4gOmhtVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHBhZ2Ug6YCJ5oup6aG1XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZihwYWdlIDwgMSkgcmV0dXJuO1xuICAgICAgICBpZihwYWdlID4gdGhpcy5kYXRhLnRvdGFsKSByZXR1cm47XG4gICAgICAgIGlmKHBhZ2UgPT0gdGhpcy5kYXRhLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuY3VycmVudCA9IHBhZ2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhteaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gY3VycmVudCDlvZPliY3pgInmi6npobVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IHRoaXMuZGF0YS5jdXJyZW50XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VyOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwibS10YWIge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDx1bCBjbGFzcz1cXFwidGFiX2hkXFxcIj4gICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBpdGVtID09IHNlbGVjdGVkLCBcXCd6LWRpc1xcJzogaXRlbS5kaXNhYmxlZH0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PntpdGVtLm5hbWV9PC9saT4gICAgICAgIHsvbGlzdH0gICAgPC91bD4gICAgPGRpdiBjbGFzcz1cXFwidGFiX2JkXFxcIj4gICAgICAgIDxyLWNvbnRlbnQgLz4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGFiICAgICAgIOmAiemhueWNoVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RhYi5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBUYWJcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgVGFiID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RhYicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogW10sXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKGl0ZW0uZGlzYWJsZWQgfHwgdGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBUYWJQYW5lID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RhYlBhbmUnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiByLWhpZGU9e3RoaXMuJG91dGVyLmRhdGEuc2VsZWN0ZWQudGFiICE9IHRoaXN9PnsjaW5jbHVkZSB0aGlzLiRib2R5fTwvZGl2PicsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7IFxuICAgICAgICBpZih0aGlzLiRvdXRlcikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuJG91dGVyLmRhdGEuc291cmNlO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5kYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGF0YS5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICB0YWI6IHRoaXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzb3VyY2UucHVzaChpdGVtKTtcblxuICAgICAgICAgICAgaWYoIXRoaXMuJG91dGVyLmRhdGEuc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy4kb3V0ZXIuZGF0YS5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYWI7IiwibW9kdWxlLmV4cG9ydHM9XCI8dGFibGUgY2xhc3M9XFxcIm0tdGFibGUgbS10YWJsZXZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCdtLXRhYmxlLXN0cmlwZWRcXCc6IHN0cmlwZWQsIFxcJ20tdGFibGUtaG92ZXJcXCc6IGhvdmVyfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8dGhlYWQ+ICAgICAgICA8dHI+ICAgICAgICAgICAgeyNsaXN0IGZpZWxkcyBhcyBmaWVsZH0gICAgICAgICAgICA8dGggci1jbGFzcz17IHtcXCd0YWJsZXZpZXdfc29ydGFibGVcXCc6IGZpZWxkLnNvcnRhYmxlfSB9IG9uLWNsaWNrPXt0aGlzLnNvcnQoZmllbGQpfT4gICAgICAgICAgICAgICAge2ZpZWxkLm5hbWUgfHwgZmllbGQua2V5fSAgICAgICAgICAgICAgICB7I2lmIGZpZWxkLnNvcnRhYmxlfSAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcInUtaWNvbiB7b3JkZXIuYnkgPT09IGZpZWxkLmtleSA/IChvcmRlci5kZXNjID8gXFwndS1pY29uLXNvcnQtZGVzY1xcJyA6IFxcJ3UtaWNvbi1zb3J0LWFzY1xcJykgOiBcXCd1LWljb24tc29ydFxcJ31cXFwiPjwvaT4gICAgICAgICAgICAgICAgey9pZn0gICAgICAgICAgICA8L3RoPiAgICAgICAgICAgIHsvbGlzdH0gICAgICAgIDwvdHI+ICAgIDwvdGhlYWQ+ICAgIDx0Ym9keT4gICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgIDx0cj4gICAgICAgICAgICB7I2xpc3QgZmllbGRzIGFzIGZpZWxkfSAgICAgICAgICAgIDx0ZD57aXRlbVtmaWVsZC5rZXldfTwvdGQ+ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC90cj4gICAgICAgIHsvbGlzdH0gICAgPC90Ym9keT48L3RhYmxlPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRhYmxlVmlldyDooajmoLzop4blm75cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90YWJsZVZpZXcuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVGFibGVWaWV3XG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmZpZWxkICAgICAgICAgICAgICDlrZfmrrXpm4ZcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5maWVsZFtdLmtleSAgICAgICAg5q+P5Liq5a2X5q6155qEa2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZmllbGRbXS5uYW1lICAgICAgIOavj+S4quWtl+auteWcqOihqOWktOaYvuekuueahOaWh+Wtl++8jOWmguaenOayoeacieWImeaYvuekumtleVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnN0cmlwZWQgICAgICAgICAgICDmmK/lkKbmmL7npLrmnaHnurlcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ob3ZlciAgICAgICAgICAgICAg5piv5ZCm5q+P6KGM5ZyoaG92ZXLml7bmmL7npLrmoLflvI9cbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgVGFibGVWaWV3ID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RhYmxlVmlldycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGZpZWxkczogW10sXG4gICAgICAgICAgICBzdHJpcGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFRPRE86IOaaguS4jeiAg+iZkeWkmuWtl+auteaOkuW6j1xuICAgICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgICAgICBieTogbnVsbCxcbiAgICAgICAgICAgICAgICBkZXNjOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNvcnQoZmllbGQpIOaMieeFp+afkOS4quWtl+auteaOkuW6j1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGZpZWxkIOaOkuW6j+Wtl+autVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc29ydDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgaWYoIWZpZWxkLnNvcnRhYmxlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBvcmRlciA9IHRoaXMuZGF0YS5vcmRlcjtcblxuICAgICAgICBpZihvcmRlci5ieSA9PT0gZmllbGQua2V5KVxuICAgICAgICAgICAgb3JkZXIuZGVzYyA9ICFvcmRlci5kZXNjO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9yZGVyLmJ5ID0gZmllbGQua2V5O1xuICAgICAgICAgICAgb3JkZXIuZGVzYyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zZXJ2aWNlKVxuICAgICAgICAgICAgdGhpcy4kdXBkYXRlU291cmNlKCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNvdXJjZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICBpZihvcmRlci5kZXNjKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVtvcmRlci5ieV0gPCBiW29yZGVyLmJ5XTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhW29yZGVyLmJ5XSA+IGJbb3JkZXIuYnldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzb3J0IOaMieeFp+afkOS4quWtl+auteaOkuW6j+aXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gZmllbGQg5o6S5bqP5a2X5q61XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzb3J0Jywge1xuICAgICAgICAgICAgZmllbGQ6IGZpZWxkXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlVmlldzsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tdHJlZXZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDx0cmVlVmlld0xpc3Qgc291cmNlPXtzb3VyY2V9IHZpc2libGU9e3RydWV9IC8+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVHJlZVZpZXcgIOagkeWei+inhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RyZWVWaWV3Lmh0bWwnKTtcbnZhciBoaWVyYXJjaGljYWxUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdHJlZVZpZXdMaXN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRyZWVWaWV3XG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5oaWVyYXJjaGljYWwgICAgICAg5piv5ZCm5YiG57qn5Yqo5oCB5Yqg6L2977yM6ZyA6KaBc2VydmljZVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIFRyZWVWaWV3ID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RyZWVWaWV3JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBoaWVyYXJjaGljYWw6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQgfHwgaXRlbS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvZ2dsZShpdGVtKSDlsZXlvIDmiJbmlLbotbfmn5DkuIDpoblcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDlsZXlvIDmlLbotbfpoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRvZ2dsZTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkIHx8IGl0ZW0uZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaXRlbS5vcGVuID0gIWl0ZW0ub3BlbjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHRvZ2dsZSDlsZXlvIDmiJbmlLbotbfmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGl0ZW0g5bGV5byA5pS26LW36aG5XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3BlbiDlsZXlvIDov5jmmK/mlLbotbdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3RvZ2dsZScsIHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICBvcGVuOiBpdGVtLm9wZW5cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBUcmVlVmlld0xpc3QgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAndHJlZVZpZXdMaXN0JyxcbiAgICB0ZW1wbGF0ZTogaGllcmFyY2hpY2FsVGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMuJGFuY2VzdG9yID0gdGhpcy4kcGFyZW50LiRhbmNlc3RvcjtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gdGhpcy4kYW5jZXN0b3Iuc2VydmljZTtcbiAgICAgICAgdGhpcy5kYXRhLml0ZW1UZW1wbGF0ZSA9IHRoaXMuJGFuY2VzdG9yLmRhdGEuaXRlbVRlbXBsYXRlO1xuICAgICAgICB0aGlzLmRhdGEuaGllcmFyY2hpY2FsID0gdGhpcy4kYW5jZXN0b3IuZGF0YS5oaWVyYXJjaGljYWw7XG5cbiAgICAgICAgdGhpcy4kd2F0Y2goJ3Zpc2libGUnLCBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYoIXRoaXMuZGF0YS5oaWVyYXJjaGljYWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZighbmV3VmFsdWUgfHwgdGhpcy4kcGFyZW50Lm5hbWUgIT09ICd0cmVlVmlld0xpc3QnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy4kdXBkYXRlU291cmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5oaWVyYXJjaGljYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGdldFBhcmFtczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5wYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gXy5leHRlbmQoe3BhcmVudElkOiB0aGlzLmRhdGEucGFyZW50LmlkfSwgdGhpcy4kYW5jZXN0b3IuZ2V0UGFyYW1zKCkpO1xuICAgIH0sXG4gICAgJHVwZGF0ZVNvdXJjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRMaXN0KHRoaXMuZ2V0UGFyYW1zKCksIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgLy8g57uZ5q+P5Liq6IqC54K5aXRlbea3u+WKoHBhcmVudFxuICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5kYXRhLnBhcmVudDtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHVwZGF0ZSgnc291cmNlJywgcmVzdWx0KTtcblxuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlU291cmNlJywge1xuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB0aGlzLiRhbmNlc3Rvci5zZWxlY3QoaXRlbSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvZ2dsZShpdGVtKSDlsZXlvIDmiJbmlLbotbfmn5DkuIDpoblcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDlsZXlvIDmlLbotbfpoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRvZ2dsZTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB0aGlzLiRhbmNlc3Rvci50b2dnbGUoaXRlbSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZVZpZXc7IiwibW9kdWxlLmV4cG9ydHM9XCI8dWwgY2xhc3M9XFxcInRyZWV2aWV3X2xpc3RcXFwiIHItaGlkZT17IXZpc2libGV9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxsaT4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRyZWV2aWV3X2l0ZW1cXFwiPiAgICAgICAgICAgIHsjaWYgaXRlbS5jaGlsZHJlbkNvdW50IHx8IChpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoKX0gICAgICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uXFxcIiByLWNsYXNzPXsge1xcJ3UtaWNvbi1jYXJldC1yaWdodFxcJzogIWl0ZW0ub3BlbiwgXFwndS1pY29uLWNhcmV0LWRvd25cXCc6IGl0ZW0ub3Blbn19IG9uLWNsaWNrPXt0aGlzLnRvZ2dsZShpdGVtKX0+PC9pPiAgICAgICAgICAgIHsvaWZ9ICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidHJlZXZpZXdfaXRlbW5hbWVcXFwiIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IHRoaXMuJGFuY2VzdG9yLmRhdGEuc2VsZWN0ZWQgPT09IGl0ZW0sIFxcJ3otZGlzXFwnOiBpdGVtLmRpc2FibGVkfSB9IHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvZGl2PiAgICAgICAgPC9kaXY+ICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9PHRyZWVWaWV3TGlzdCBzb3VyY2U9e2l0ZW0uY2hpbGRyZW59IHZpc2libGU9e2l0ZW0ub3Blbn0gcGFyZW50PXtpdGVtfSAvPnsvaWZ9ICAgIDwvbGk+ICAgIHsvbGlzdH08L3VsPlwiIiwibW9kdWxlLmV4cG9ydHM9XCI8bGFiZWwgY2xhc3M9XFxcInUtY2hlY2syIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkLCBcXCd6LWNoa1xcJzogY2hlY2tlZCwgXFwnei1wYXJ0XFwnOiBjaGVja2VkID09PSBudWxsLCBcXCd1LWNoZWNrMi1ibG9ja1xcJzogYmxvY2t9IH0gci1oaWRlPXshdmlzaWJsZX0gdGl0bGU9e25hbWV9IG9uLWNsaWNrPXt0aGlzLmNoZWNrKCFjaGVja2VkKX0+PGRpdiBjbGFzcz1cXFwiY2hlY2syX2JveFxcXCI+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2hlY2tcXFwiPjwvaT48L2Rpdj4ge25hbWV9PC9sYWJlbD5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDaGVjazIgICDlpJrpgInmjInpkq5cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9jaGVjazIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgQ2hlY2syXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5uYW1lICAgICAgICAgICAgICAg5aSa6YCJ5oyJ6ZKu55qE5paH5a2XXG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2hlY2tlZCAgICAgICAgICAgIOWkmumAieaMiemSrueahOmAieaLqeeKtuaAgVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmJsb2NrICAgICAgICAgICAgICDmmK/lkKbku6VibG9ja+aWueW8j+aYvuekulxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgQ2hlY2syID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2NoZWNrMicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBibG9jazogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjaGVjayhjaGVja2VkKSDmlLnlj5jpgInkuK3nirbmgIFcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gY2hlY2tlZCDpgInkuK3nirbmgIFcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNoZWNrOiBmdW5jdGlvbihjaGVja2VkKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5kYXRhLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNoZWNrIOaUueWPmOmAieS4reeKtuaAgeaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGVjaycsIHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2syOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS11bml0Z3JvdXAge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGNoZWNrMiBuYW1lPXtpdGVtLm5hbWV9IGNoZWNrZWQ9e2l0ZW0uY2hlY2tlZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBibG9jaz17YmxvY2t9IC8+ICAgIHsvbGlzdH08L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDaGVjazJHcm91cCDovpPlhaXmianlsZVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDaGVja0dyb3VwID0gcmVxdWlyZSgnLi9jaGVja0dyb3VwLmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2NoZWNrMkdyb3VwLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgQ2hlY2syID0gcmVxdWlyZSgnLi9jaGVjazIuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgQ2hlY2syR3JvdXBcbiAqIEBleHRlbmQgQ2hlY2tHcm91cFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmJsb2NrICAgICAgICAgICAgICDlpJrooYzmmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBDaGVjazJHcm91cCA9IENoZWNrR3JvdXAuZXh0ZW5kKHtcbiAgICBuYW1lOiAnY2hlY2syR3JvdXAnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2syR3JvdXA7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LXVuaXRncm91cCB7QChjbGFzcyl9XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bGFiZWwgY2xhc3M9XFxcInUtY2hlY2syXFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZCwgXFwndS1jaGVjazItYmxvY2tcXCc6IGJsb2NrfSB9IHRpdGxlPXtpdGVtLm5hbWV9PjxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCIgY2xhc3M9XFxcInUtY2hlY2tcXFwiIHItbW9kZWw9e2l0ZW0uY2hlY2tlZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfT4ge2l0ZW0ubmFtZX08L2xhYmVsPiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2hlY2tHcm91cCDlpJrpgInnu4RcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9jaGVja0dyb3VwLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENoZWNrR3JvdXBcbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuYmxvY2sgICAgICAgICAgICAgIOWkmuihjOaYvuekulxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIENoZWNrR3JvdXAgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnY2hlY2tHcm91cCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGJsb2NrOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNoZWNrQWxsKGNoZWNrZWQpIOaUueWPmOaJgOacieWkmumAieeahOmAieS4reeKtuaAgVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjaGVja0FsbDogZnVuY3Rpb24oY2hlY2tlZCkge1xuICAgICAgICB0aGlzLmRhdGEuc291cmNlLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNoZWNrQWxsIOaUueWPmOaJgOacieWkmumAieeahOmAieS4reeKtuaAgeaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gY2hlY2tlZCDpgInkuK3nirbmgIFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoZWNrQWxsJywge1xuICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZFxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja0dyb3VwOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS1kcm9wZG93biB1LWRyb3Bkb3duLXN1Z2dlc3Qge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiPiAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0IHUtaW5wdXQtZnVsbFxcXCIgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSB2YWx1ZT17ZGF0ZSB8IGZvcm1hdDogXFwneXl5eS1NTS1kZFxcJ30gb24tZm9jdXM9e3RoaXMudG9nZ2xlKHRydWUpfSBvbi1jaGFuZ2U9e3RoaXMuY2hhbmdlKCRldmVudCl9IHJlZj1cXFwiaW5wdXRcXFwiIGRpc2FibGVkPXtkaXNhYmxlZH0geyNpZiByZWFkb25seX1yZWFkb25seT1cXFwicmVhZG9ubHlcXFwiey9pZn0+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPGNhbGVuZGFyIGRhdGU9e2RhdGV9IG1pbkRhdGU9e21pbkRhdGV9IG1heERhdGU9e21heERhdGV9IG9uLXNlbGVjdD17dGhpcy5zZWxlY3QoJGV2ZW50LmRhdGUpfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEYXRlUGlja2VyIOaXpeacn+mAieaLqVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBEcm9wZG93biA9IHJlcXVpcmUoJy4vZHJvcGRvd24uanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZGF0ZVBpY2tlci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi4vYmFzZS9maWx0ZXIuanMnKTtcbnZhciBDYWxlbmRhciA9IHJlcXVpcmUoJy4uL21vZHVsZS9jYWxlbmRhci5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBEYXRlUGlja2VyXG4gKiBAZXh0ZW5kIERyb3Bkb3duXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRhdGUgICAgICAgICAgICAgICDlvZPliY3pgInmi6nnmoTml6XmnJ9cbiAqIEBwYXJhbSB7c3RyaW5nPSfor7fovpPlhaUnfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg5paH5pys5qGG6buY6K6k5paH5a2XXG4gKiBAcGFyYW0ge0RhdGU9bnVsbH0gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubWluRGF0ZSAgICAgICAgICAgIOacgOWwj+aXpeacn++8jOWmguaenOS4uuepuuWImeS4jemZkOWItlxuICogQHBhcmFtIHtEYXRlPW51bGx9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLm1heERhdGUgICAgICAgICAgICDmnIDlpKfml6XmnJ/vvIzlpoLmnpzkuLrnqbrliJnkuI3pmZDliLZcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIERhdGVQaWNrZXIgPSBEcm9wZG93bi5leHRlbmQoe1xuICAgIG5hbWU6ICdkYXRlUGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAn6K+36L6T5YWlJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChkYXRlKSDpgInmi6nkuIDkuKrml6XmnJ9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7RGF0ZT1udWxsfSBkYXRlIOmAieaLqeeahOaXpeacn1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gZGF0ZSDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIGRhdGU6IGRhdGVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9LFxuICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIGlmKGRhdGUgIT0gJ0ludmFsaWQgRGF0ZScpXG4gICAgICAgICAgICB0aGlzLmRhdGEuZGF0ZSA9IGRhdGU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0ZVBpY2tlcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zdWdnZXN0IHUtZHJvcGRvd24tZGF0ZXRpbWVwaWNrZXIge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiPiAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0IHUtaW5wdXQtZnVsbFxcXCIgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSB2YWx1ZT17ZGF0ZSB8IGZvcm1hdDogXFwneXl5eS1NTS1kZCBISDptbVxcJ30gb24tZm9jdXM9e3RoaXMudG9nZ2xlKHRydWUpfSBvbi1jaGFuZ2U9e3RoaXMuY2hhbmdlKCRldmVudCl9IHJlZj1cXFwiaW5wdXRcXFwiIGRpc2FibGVkPXtkaXNhYmxlZH0geyNpZiByZWFkb25seX1yZWFkb25seT1cXFwicmVhZG9ubHlcXFwiey9pZn0+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPGNhbGVuZGFyIGRhdGU9e3NlbGVjdGVkRGF0ZX0gb24tc2VsZWN0PXt0aGlzLnNlbGVjdCgkZXZlbnQuZGF0ZSl9IC8+ICAgICAgICA8dWwgY2xhc3M9XFxcIm0tbGlzdHZpZXdcXFwiPiAgICAgICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgICAgICA8bGkgb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57aXRlbS5uYW1lfTwvbGk+ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC91bD4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0ZVRpbWVQaWNrZXIg5pel5pyf6YCJ5oupXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIERhdGVQaWNrZXIgPSByZXF1aXJlKCcuL2RhdGVQaWNrZXIuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZGF0ZVRpbWVQaWNrZXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uL2Jhc2UvZmlsdGVyLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIERhdGVUaW1lUGlja2VyXG4gKiBAZXh0ZW5kIERhdGVQaWNrZXJcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZGF0ZSAgICAgICAgICAgICAgIOW9k+WJjemAieaLqeeahOaXpeacn1xuICogQHBhcmFtIHtzdHJpbmc9J+ivt+i+k+WFpSd9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDmlofmnKzmoYbpu5jorqTmloflrZdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIERhdGVUaW1lUGlja2VyID0gRGF0ZVBpY2tlci5leHRlbmQoe1xuICAgIG5hbWU6ICdkYXRlVGltZVBpY2tlcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBbXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHNvdXJjZS5wdXNoKHtuYW1lOiAnMCcgKyBpICsgJzowMCd9KTtcbiAgICAgICAgICAgIHNvdXJjZS5wdXNoKHtuYW1lOiAnMCcgKyBpICsgJzozMCd9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IodmFyIGkgPSAxMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgICAgIHNvdXJjZS5wdXNoKHtuYW1lOiBpICsgJzowMCd9KTtcbiAgICAgICAgICAgIHNvdXJjZS5wdXNoKHtuYW1lOiBpICsgJzozMCd9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHBsYWNlaG9sZGVyOiAn6K+36L6T5YWlJyxcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHNlbGVjdGVkVGltZTogJydcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIC8vIHRoaXMuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAvLyAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICAvLyAgICAgdGhpcy4kcmVmcy5jYWxlbmRhci5kYXRhLnNlbGVjdGVkID0gbmV3VmFsdWU7XG5cbiAgICAgICAgLy8gICAgIHZhciB0aW1lID0gIGZpbHRlci5mb3JtYXQobmV3VmFsdWUsIG5ld1ZhbHVlLmdldE1pbnV0ZXMoKSUzMCA9PT0gMCA/ICdISDptbScgOiAnSEg6MDAnKTtcbiAgICAgICAgLy8gICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEuc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmRhdGEuc291cmNlW2ldOyAgIFxuICAgICAgICAvLyAgICAgICAgIGlmKHRpbWUgPT09IGl0ZW0ubmFtZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWRUaW1lID0gaXRlbTtcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICB0aGlzLiR3YXRjaChbJ3NlbGVjdGVkRGF0ZScsICdzZWxlY3RlZFRpbWUnXSwgZnVuY3Rpb24oc2VsZWN0ZWREYXRlLCBzZWxlY3RlZFRpbWUpIHtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkRGF0ZSAmJiBzZWxlY3RlZFRpbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0YS5zZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gdGhpcy5kYXRhLnNlbGVjdGVkVGltZS5zcGxpdCgnOicpO1xuXG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aW1lWzBdKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXModGltZVsxXSk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5kYXRlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkYXRlIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAvLyAgICAgZGF0ZTogaXRlbVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICBpZighKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZFRpbWUgPSBpdGVtLm5hbWU7XG5cbiAgICAgICAgaWYoIShpdGVtIGluc3RhbmNlb2YgRGF0ZSkgfHwgdGhpcy5kYXRhLnNlbGVjdGVkVGltZSlcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9LFxuICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICBpZihkYXRlICE9ICdJbnZhbGlkIERhdGUnKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmRhdGEuZGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZFRpbWUgPSB2YWx1ZS5zcGxpdCgnICcpWzFdO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0ZVRpbWVQaWNrZXI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWRyb3Bkb3duIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT4gICAgICAgIHsjaWYgdGhpcy4kYm9keX0gICAgICAgICAgICB7I2luYyB0aGlzLiRib2R5fSAgICAgICAgeyNlbHNlfSAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCI+e3RpdGxlIHx8IFxcJ+S4i+aLieiPnOWNlVxcJ30gPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT4gICAgICAgIHsvaWZ9ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3XFxcIj4gICAgICAgICAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgICAgICAgICAgPGxpIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGl0ZW0uZGlzYWJsZWQsIFxcJ2Ryb3Bkb3duX2RpdmlkZXJcXCc6IGl0ZW0uZGl2aWRlcn0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PnsjaWYgQChpdGVtVGVtcGxhdGUpfXsjaW5jbHVkZSBAKGl0ZW1UZW1wbGF0ZSl9eyNlbHNlfXtpdGVtLm5hbWV9ey9pZn08L2xpPiAgICAgICAgICAgIHsvbGlzdH0gICAgICAgIDwvdWw+ICAgIDwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERyb3Bkb3duICDkuIvmi4noj5zljZVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZHJvcGRvd24uaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgRHJvcGRvd25cbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uZGlzYWJsZWQgIOemgeeUqOatpOmhuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmRpdmlkZXIgICDorr7nva7mraTpobnliIbpmpTnur9cbiAqIEBwYXJhbSB7c3RyaW5nPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5pdGVtVGVtcGxhdGUgICAgICAg5Y2V6aG55qih5p2/XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEub3BlbiAgICAgICAgICAgICAgIOW9k+WJjeS4uuWxleW8gC/mlLbotbfnirbmgIFcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIERyb3Bkb3duID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2Ryb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBudWxsLFxuICAgICAgICAgICAgb3BlbjogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoaXRlbSkg6YCJ5oup5p+Q5LiA6aG5XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZih0aGlzLmRhdGEuZGlzYWJsZWQgfHwgaXRlbS5kaXNhYmxlZCB8fCBpdGVtLmRpdmlkZXIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy90aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9nZ2xlKG9wZW4pIOWcqOWxleW8gC/mlLbotbfnirbmgIHkuYvpl7TliIfmjaJcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gb3BlbiDlsZXlvIAv5pS26LW3XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGU6IGZ1bmN0aW9uKG9wZW4pIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kYXRhLm9wZW4gPSBvcGVuO1xuXG4gICAgICAgIC8vIOagueaNrueKtuaAgeWcqERyb3Bkb3duLm9wZW5z5YiX6KGo5Lit5re75YqgL+WIoOmZpOeuoeeQhumhuVxuICAgICAgICB2YXIgaW5kZXggPSBEcm9wZG93bi5vcGVucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICBpZihvcGVuICYmIGluZGV4IDwgMClcbiAgICAgICAgICAgIERyb3Bkb3duLm9wZW5zLnB1c2godGhpcyk7XG4gICAgICAgIGVsc2UgaWYoIW9wZW4gJiYgaW5kZXggPj0gMClcbiAgICAgICAgICAgIERyb3Bkb3duLm9wZW5zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufSk7XG5cbi8vIOWkhOeQhueCueWHu2Ryb3Bkb3du5LmL5aSW55qE5Zyw5pa55ZCO55qE5pS26LW35LqL5Lu244CCXG5Ecm9wZG93bi5vcGVucyA9IFtdO1xuXG5fLmRvbS5vbihkb2N1bWVudC5ib2R5LCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgRHJvcGRvd24ub3BlbnMuZm9yRWFjaChmdW5jdGlvbihkcm9wZG93bikge1xuICAgICAgICAvLyDov5nkuKrlnLDmlrnkuI3og73nlKhzdG9wUHJvcGFnYXRpb27mnaXlpITnkIbvvIzlm6DkuLrlsZXlvIDkuIDkuKpkcm9wZG93bueahOWQjOaXtuimgeaUtui1t+WFtuS7lmRyb3Bkb3duXG4gICAgICAgIHZhciBlbGVtZW50ID0gZHJvcGRvd24uJHJlZnMuZWxlbWVudDtcbiAgICAgICAgdmFyIGVsZW1lbnQyID0gZS50YXJnZXQ7XG4gICAgICAgIHdoaWxlKGVsZW1lbnQyKSB7XG4gICAgICAgICAgICBpZihlbGVtZW50ID09IGVsZW1lbnQyKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGVsZW1lbnQyID0gZWxlbWVudDIucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBkcm9wZG93bi50b2dnbGUoZmFsc2UpO1xuICAgICAgICBkcm9wZG93bi4kdXBkYXRlKCk7XG4gICAgfSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuZ290b3AoKX0+5Zue5Yiw6aG26YOoPC9hPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEdvdG9wICDlm57liLDpobbpg6hcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9nb3RvcC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBHb3RvcFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBHb3RvcCA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdnb3RvcCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcblxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdvdG9wKCkg5Zue5Yiw6aG26YOoXG4gICAgICogQHB1YmxpY1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZ290b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHb3RvcDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxsYWJlbCBjbGFzcz1cXFwidS1pbnB1dDIge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIDxpbnB1dCBjbGFzcz1cXFwidS1pbnB1dCB1LWlucHV0LXt0eXBlfVxcXCIgci1tb2RlbD17dmFsdWV9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gZGlzYWJsZWQ9e2Rpc2FibGVkfSB7I2lmIHJlYWRvbmx5fXJlYWRvbmx5ey9pZn0gb24ta2V5dXA9e3RoaXMudmFsaWRhdGUodmFsdWUsIHJ1bGVzKX0+PC9sYWJlbD48c3BhbiBjbGFzcz1cXFwidS10aXAgdS10aXAte3R5cGV9XFxcIj57dGlwfTwvc3Bhbj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBJbnB1dDIgICDovpPlhaXmianlsZVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vaW5wdXQyLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgdmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vYmFzZS92YWxpZGF0b3IuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgSW5wdXQyXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52YWx1ZSAgICAgICAgICAgICAg6L6T5YWl5qGG55qE5YC8XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEudHlwZSAgICAgICAgICAgICAgIOi+k+WFpeahhueahOexu+Wei1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDljaDkvY3nrKZcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5ydWxlcyAgICAgICAgICAgICAg6aqM6K+B6KeE5YiZXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBJbnB1dDIgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnaW5wdXQyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdHlwZTogJycsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgICAgICBydWxlczogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlLCBydWxlcykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCBydWxlcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRhdGEudHlwZSA9IHJlc3VsdC5zdWNjZXNzID8gJ3N1Y2Nlc3MnIDogJ2Vycm9yJztcbiAgICAgICAgdGhpcy5kYXRhLnRpcCA9IHJlc3VsdC5tZXNzYWdlO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0MjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1tZW51IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT4gICAgICAgIHsjaWYgdGhpcy4kYm9keX0gICAgICAgICAgICB7I2luYyB0aGlzLiRib2R5fSAgICAgICAgeyNlbHNlfSAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCI+e3RpdGxlIHx8IFxcJ+Wkmue6p+iPnOWNlVxcJ30gPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT4gICAgICAgIHsvaWZ9ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPG1lbnVMaXN0IHNvdXJjZT17c291cmNlfSB2aXNpYmxlPXt0cnVlfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNZW51ICAgICAg5aSa57qn6I+c5Y2VXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21lbnUuaHRtbCcpO1xudmFyIGhpZXJhcmNoaWNhbFRlbXBsYXRlID0gcmVxdWlyZSgnLi9tZW51TGlzdC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyAgTWVudVxuICogQGV4dGVuZCBEcm9wZG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmRpc2FibGVkICDnpoHnlKjmraTpoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5kaXZpZGVyICAg6K6+572u5q2k6aG55YiG6ZqU57q/XG4gKiBAcGFyYW0ge3N0cmluZz1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuaXRlbVRlbXBsYXRlICAgICAgIOWNlemhueaooeadv1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLm9wZW4gICAgICAgICAgICAgICDlvZPliY3kuLrlsZXlvIAv5pS26LW354q25oCBXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBNZW51ID0gRHJvcGRvd24uZXh0ZW5kKHtcbiAgICBuYW1lOiAnbWVudScsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIG9wZW46IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXM7XG4gICAgfVxufSk7XG5cbnZhciBNZW51TGlzdCA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdtZW51TGlzdCcsXG4gICAgdGVtcGxhdGU6IGhpZXJhcmNoaWNhbFRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbCxcbiAgICAgICAgICAgIC8vIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXMuJHBhcmVudC4kYW5jZXN0b3I7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHRoaXMuJGFuY2VzdG9yLnNlcnZpY2U7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtVGVtcGxhdGUgPSB0aGlzLiRhbmNlc3Rvci5kYXRhLml0ZW1UZW1wbGF0ZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuJGFuY2VzdG9yLmRhdGEuZGlzYWJsZWQgfHwgaXRlbS5kaXNhYmxlZCB8fCBpdGVtLmRpdmlkZXIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy4kYW5jZXN0b3Iuc2VsZWN0KGl0ZW0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB0b2dnbGUoaXRlbSkg5bGV5byA5oiW5pS26LW35p+Q5LiA6aG5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g5bGV5byA5pS26LW36aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGU6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy4kYW5jZXN0b3IuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpdGVtLm9wZW4gPSAhaXRlbS5vcGVuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgdG9nZ2xlIOWxleW8gOaIluaUtui1t+afkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gaXRlbSDlsZXlvIDmlLbotbfpoblcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBvcGVuIOWxleW8gOi/mOaYr+aUtui1t1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kYW5jZXN0b3IuJGVtaXQoJ3RvZ2dsZScsIHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICBvcGVuOiBpdGVtLm9wZW5cbiAgICAgICAgfSk7XG4gICAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBNZW51OyIsIm1vZHVsZS5leHBvcnRzPVwiPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3IG1lbnVfbGlzdFxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxpIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGl0ZW0uZGlzYWJsZWQsIFxcJ2Ryb3Bkb3duX2RpdmlkZXJcXCc6IGl0ZW0uZGl2aWRlcn0gfT4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1lbnVfaXRlbVxcXCI+ICAgICAgICAgICAgeyNpZiBpdGVtLmNoaWxkcmVuQ291bnQgfHwgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGgpfSAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNhcmV0LXJpZ2h0XFxcIj48L2k+ICAgICAgICAgICAgey9pZn0gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtZW51X2l0ZW1uYW1lXFxcIiB0aXRsZT17aXRlbS5uYW1lfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PnsjaWYgQChpdGVtVGVtcGxhdGUpfXsjaW5jbHVkZSBAKGl0ZW1UZW1wbGF0ZSl9eyNlbHNlfXtpdGVtLm5hbWV9ey9pZn08L2Rpdj4gICAgICAgIDwvZGl2PiAgICAgICAgeyNpZiBpdGVtLmNoaWxkcmVuQ291bnQgfHwgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGgpfTxtZW51TGlzdCBzb3VyY2U9e2l0ZW0uY2hpbGRyZW59IHZpc2libGU9e2l0ZW0ub3Blbn0gcGFyZW50PXtpdGVtfSAvPnsvaWZ9ICAgIDwvbGk+ICAgIHsvbGlzdH08L3VsPlwiIiwibW9kdWxlLmV4cG9ydHM9XCI8bGFiZWwgY2xhc3M9XFxcInUtaW5wdXQyIHUtaW5wdXQyLW51bWJlcmlucHV0IHtAKGNsYXNzKX1cXFwiIHItaGlkZT17IXZpc2libGV9PiAgICA8aW5wdXQgY2xhc3M9XFxcInUtaW5wdXQgdS1pbnB1dC17dHlwZX1cXFwiIHItbW9kZWw9e3ZhbHVlIHwgbnVtYmVyfSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IGRpc2FibGVkPXtkaXNhYmxlZH0geyNpZiByZWFkb25seX1yZWFkb25seXsvaWZ9IG9uLWtleXVwPXt0aGlzLnZhbGlkYXRlKHZhbHVlKX0+ICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuaW5jcmVhc2UoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtdXBcXFwiPjwvaT48L2E+ICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuZGVjcmVhc2UoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT48L2xhYmVsPjxzcGFuIGNsYXNzPVxcXCJ1LXRpcCB1LXRpcC17dHlwZX1cXFwiPnt0aXB9PC9zcGFuPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE51bWJlcklucHV0IOi+k+WFpeaJqeWxlVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBJbnB1dDIgPSByZXF1aXJlKCcuL2lucHV0Mi5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9udW1iZXJJbnB1dC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBOdW1iZXJJbnB1dFxuICogQGV4dGVuZCBJbnB1dDJcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEudmFsdWUgICAgICAgICAgICAgIOi+k+WFpeahhueahOWAvFxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnR5cGUgICAgICAgICAgICAgICDovpPlhaXmoYbnmoTnsbvlnotcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg5Y2g5L2N56ymXG4gKiBAcGFyYW0ge251bWJlcj1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEubWluICAgICAgICAgICAgICAgIOacgOWwj+WAvFxuICogQHBhcmFtIHtudW1iZXI9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLm1heCAgICAgICAgICAgICAgICDmnIDlpKflgLxcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIE51bWJlcklucHV0ID0gSW5wdXQyLmV4dGVuZCh7XG4gICAgbmFtZTogJ251bWJlcklucHV0JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHR5cGU6ICcnLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgICAgICBtaW46IG51bGwsXG4gICAgICAgICAgICBtYXg6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYodGhpcy5kYXRhLm1heCAhPT0gbnVsbCAmJiB0aGlzLmRhdGEudmFsdWUgPiB0aGlzLmRhdGEubWF4KVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS52YWx1ZSA9IHRoaXMuZGF0YS5tYXg7XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEubWluICE9PSBudWxsICYmIHRoaXMuZGF0YS52YWx1ZSA8IHRoaXMuZGF0YS5taW4pXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlID0gdGhpcy5kYXRhLm1pbjtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpbmNyZWFzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGF0YS52YWx1ZSsrO1xuICAgIH0sXG4gICAgZGVjcmVhc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGEudmFsdWUtLTtcbiAgICB9XG59KS5maWx0ZXIoe1xuICAgIG51bWJlcjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJycgKyAodmFsdWUgfHwgMCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiArdmFsdWUgfHwgMDtcbiAgICAgICAgICAgIC8vIHJldHVybiArKHZhbHVlLnJlcGxhY2UoL1teXFxkXFwuXFwtXS9nLCAnJykpIHx8IDA7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXJJbnB1dDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtcHJvZ3Jlc3MgdS1wcm9ncmVzcy17QChzaXplKX0gdS1wcm9ncmVzcy17QCh0eXBlKX0ge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd1LXByb2dyZXNzLXN0cmlwZWRcXCc6IHN0cmlwZWQsIFxcJ3otYWN0XFwnOiBhY3RpdmV9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDxkaXYgY2xhc3M9XFxcInByb2dyZXNzX2JhclxcXCIgc3R5bGU9XFxcIndpZHRoOiB7cGVyY2VudH0lO1xcXCI+e3RleHQgPyAodGV4dCA9PT0gdHJ1ZSA/IHBlcmNlbnQgKyBcXCclXFwnIDogdGV4dCkgOiBcXCdcXCd9PC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUHJvZ3Jlc3MgIOi/m+W6puadoVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3Byb2dyZXNzLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFByb2dyZXNzXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7bnVtYmVyPTM2fSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5wZXJjZW50ICAgICAgICAgICAg55m+5YiG5q+UXG4gKiBAcGFyYW0ge3N0cmluZ3xib29sZWFuPXRydWV9ICAgICBvcHRpb25zLmRhdGEudGV4dCAgICAgICAgICAgICAgIOWcqOi/m+W6puadoeS4reaYr+WQpuaYvuekuueZvuWIhuavlOOAguWAvOS4umBzdHJpbmdg5pe25pi+56S66K+l5q615paH5a2X44CCXG4gKiBAcGFyYW0ge3N0cmluZz1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2l6ZSAgICAgICAgICAgICAgIOi/m+W6puadoeeahOWwuuWvuFxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnR5cGUgICAgICAgICAgICAgICDov5vluqbmnaHnmoTnsbvlnovvvIzmlLnlj5jmmL7npLrpopzoibJcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5zdHJpcGVkICAgICAgICAgICAg5piv5ZCm5pi+56S65p2h57q5XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuYWN0aXZlICAgICAgICAgICAgIOi/m+W6puadoeaYr+WQpuS4uua/gOa0u+eKtuaAge+8jOW9k2BzdHJpcGVkYOS4umB0cnVlYOaXtu+8jOi/m+W6puadoeaYvuekuuWKqOeUu1xuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIFByb2dyZXNzID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3Byb2dyZXNzJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgcGVyY2VudDogMzYsXG4gICAgICAgICAgICB0ZXh0OiB0cnVlLFxuICAgICAgICAgICAgc2l6ZTogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICBzdHJpcGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS11bml0Z3JvdXAge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxhYmVsIGNsYXNzPVxcXCJ1LXJhZGlvMlxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWQsIFxcJ3otc2VsXFwnOiBpdGVtID09PSBzZWxlY3RlZCwgXFwndS1yYWRpbzItYmxvY2tcXCc6IGJsb2NrfSB9IHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+PGRpdiBjbGFzcz1cXFwicmFkaW8yX2JveFxcXCI+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tcmFkaW9cXFwiPjwvaT48L2Rpdj4ge2l0ZW0ubmFtZX08L2xhYmVsPiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUmFkaW8yR3JvdXAg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmFkaW9Hcm91cCA9IHJlcXVpcmUoJy4vcmFkaW9Hcm91cC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9yYWRpbzJHcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBSYWRpbzJHcm91cFxuICogQGV4dGVuZCBSYWRpb0dyb3VwXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWNlZCAgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmJsb2NrICAgICAgICAgICAgICDlpJrooYzmmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBSYWRpbzJHcm91cCA9IFJhZGlvR3JvdXAuZXh0ZW5kKHtcbiAgICBuYW1lOiAncmFkaW8yR3JvdXAnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW8yR3JvdXA7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LXVuaXRncm91cCB7QChjbGFzcyl9XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bGFiZWwgY2xhc3M9XFxcInUtcmFkaW8yXFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZCwgXFwndS1yYWRpbzItYmxvY2tcXCc6IGJsb2NrfSB9IHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+PGlucHV0IHR5cGU9XFxcInJhZGlvXFxcIiBjbGFzcz1cXFwidS1yYWRpb1xcXCIgbmFtZT17X3JhZGlvR3JvdXBJZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfT4ge2l0ZW0ubmFtZX08L2xhYmVsPiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUmFkaW9Hcm91cCDljZXpgInnu4RcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9yYWRpb0dyb3VwLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFJhZGlvR3JvdXBcbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWNlZCAgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmJsb2NrICAgICAgICAgICAgICDlpJrooYzmmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBSYWRpb0dyb3VwID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3JhZGlvR3JvdXAnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIF9yYWRpb0dyb3VwSWQ6IG5ldyBEYXRlKClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoaXRlbSkg6YCJ5oup5p+Q5LiA6aG5XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2VsZWN0ZWQg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBzZWxlY3RlZDogaXRlbVxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRpb0dyb3VwOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS1kcm9wZG93biB1LWRyb3Bkb3duLXNlbGVjdDIge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiIG9uLWNsaWNrPXt0aGlzLnRvZ2dsZSghb3Blbil9PiAgICAgICAgPHNwYW4+e3NlbGVjdGVkID8gc2VsZWN0ZWQubmFtZSA6IHBsYWNlaG9sZGVyfTwvc3Bhbj4gICAgICAgIDxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNhcmV0LWRvd25cXFwiPjwvaT4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2JkXFxcIiByLWhpZGU9eyFvcGVufSByLWFuaW1hdGlvbj1cXFwib246IGVudGVyOyBjbGFzczogYW5pbWF0ZWQgZmFkZUluWSBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0WSBmYXN0O1xcXCI+ICAgICAgICA8dWwgY2xhc3M9XFxcIm0tbGlzdHZpZXdcXFwiPiAgICAgICAgICAgIHsjaWYgcGxhY2Vob2xkZXJ9PGxpIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IHNlbGVjdGVkID09PSBudWxsfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChudWxsKX0+e3BsYWNlaG9sZGVyfTwvbGk+ey9pZn0gICAgICAgICAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgICAgICAgICAgPGxpIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IHNlbGVjdGVkID09PSBpdGVtfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+e2l0ZW0ubmFtZX08L2xpPiAgICAgICAgICAgIHsvbGlzdH0gICAgICAgIDwvdWw+ICAgIDwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFNlbGVjdDIgIOmAieaLqeaJqeWxlVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zZWxlY3QyLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFNlbGVjdDJcbiAqIEBleHRlbmQgRHJvcGRvd25cbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zZWxlY3RlZCAgICAgICAgICAg5b2T5YmN6YCJ5oup6aG5XG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36YCJ5oupJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOm7mOiupOmhueeahOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIFNlbGVjdDIgPSBEcm9wZG93bi5leHRlbmQoe1xuICAgIG5hbWU6ICdzZWxlY3QyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZVxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ+ivt+mAieaLqSdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoaXRlbSkg6YCJ5oup5p+Q5LiA6aG5XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB0aGlzLiR1cGRhdGUoJ3NlbGVjdGVkJywgaXRlbSk7XG4gICAgICAgIC8vdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWRyb3Bkb3duIHUtZHJvcGRvd24tc3VnZ2VzdCB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfSByZWY9XFxcImVsZW1lbnRcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9oZFxcXCI+ICAgICAgICA8aW5wdXQgY2xhc3M9XFxcInUtaW5wdXQgdS1pbnB1dC1mdWxsXFxcIiBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IHItbW9kZWw9e3ZhbHVlfSBvbi1mb2N1cz17dGhpcy5pbnB1dCgkZXZlbnQpfSBvbi1rZXl1cD17dGhpcy5pbnB1dCgkZXZlbnQpfSBvbi1ibHVyPXt0aGlzLnVuaW5wdXQoJGV2ZW50KX0gcmVmPVxcXCJpbnB1dFxcXCIgZGlzYWJsZWQ9e2Rpc2FibGVkfSB7I2lmIHJlYWRvbmx5fXJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJ7L2lmfT4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2JkXFxcIiByLWhpZGU9eyFvcGVufSByLWFuaW1hdGlvbj1cXFwib246IGVudGVyOyBjbGFzczogYW5pbWF0ZWQgZmFkZUluWSBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0WSBmYXN0O1xcXCI+ICAgICAgICA8dWwgY2xhc3M9XFxcIm0tbGlzdHZpZXdcXFwiPiAgICAgICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgICAgICB7I2lmIHRoaXMuZmlsdGVyKGl0ZW0pfSAgICAgICAgICAgICAgICA8bGkgb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57aXRlbS5uYW1lfTwvbGk+ICAgICAgICAgICAgey9pZn0gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBTdWdnZXN0ICAg6Ieq5Yqo5o+Q56S6XG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRHJvcGRvd24gPSByZXF1aXJlKCcuL2Ryb3Bkb3duLmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3N1Z2dlc3QuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcbnZhciBMaXN0VmlldyA9IHJlcXVpcmUoJy4uL21vZHVsZS9saXN0Vmlldy5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBTdWdnZXN0XG4gKiBAZXh0ZW5kIERyb3Bkb3duXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZhbHVlICAgICAgICAgICAgICDmlofmnKzmoYbkuK3nmoTlgLxcbiAqIEBwYXJhbSB7c3RyaW5nPSfor7fovpPlhaUnfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg5paH5pys5qGG6buY6K6k5paH5a2XXG4gKiBAcGFyYW0ge251bWJlcj0wfSAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubWluTGVuZ3RoICAgICAgICAgIOacgOWwj+aPkOekuumVv+W6puOAguW9k+i+k+WFpemVv+W6pj496K+l5YC85ZCO5byA5aeL5o+Q56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nYWxsJ30gICAgICAgICAgICBvcHRpb25zLmRhdGEubWF0Y2hUeXBlICAgICAgICAgIOWMuemFjeaWueW8j++8jGBhbGxg6KGo56S65Yy56YWN5YWo5bGA77yMYHN0YXJ0YOihqOekuuWPquWMuemFjeW8gOWktO+8jGBlbmRg6KGo56S65Y+q5Yy56YWN57uT5bC+XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuc3RyaWN0ICAgICAgICAgICAgIOaYr+WQpuS4uuS4peagvOaooeW8j+OAguW9k+S4uuS4peagvOaooeW8j+aXtu+8jGB2YWx1ZWDlsZ7mgKflv4XpobvlnKhzb3VyY2XkuK3pgInmi6nvvIzlkKbliJnkuLrnqbrjgIJcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBTdWdnZXN0ID0gRHJvcGRvd24uZXh0ZW5kKHtcbiAgICBuYW1lOiAnc3VnZ2VzdCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAn6K+36L6T5YWlJyxcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMCxcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXG4gICAgICAgICAgICBtYXRjaFR5cGU6ICdhbGwnLFxuICAgICAgICAgICAgc3RyaWN0OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgnc2VsZWN0ZWQnLCBpdGVtKTtcbiAgICAgICAgdGhpcy5kYXRhLnZhbHVlID0gaXRlbS5uYW1lO1xuICAgICAgICAvL3RoaXMuZGF0YS5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2VsZWN0ZWQg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBzZWxlY3RlZDogaXRlbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB0b2dnbGUob3BlbikgIOWcqOWxleW8gOeKtuaAgeWSjOaUtui1t+eKtuaAgeS5i+mXtOWIh+aNolxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBvcGVuIOWxleW8gOi/mOaYr+aUtui1t1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihvcGVuLCBfaXNJbnB1dCkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZGF0YS5vcGVuID0gb3BlbjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHRvZ2dsZSDlsZXlvIDmiJbmlLbotbfnirbmgIHmlLnlj5jml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBvcGVuIOWxleW8gOi/mOaYr+aUtui1t1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgndG9nZ2xlJywge1xuICAgICAgICAgICAgb3Blbjogb3BlblxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgaW5kZXggPSBEcm9wZG93bi5vcGVucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICBpZihvcGVuICYmIGluZGV4IDwgMClcbiAgICAgICAgICAgIERyb3Bkb3duLm9wZW5zLnB1c2godGhpcyk7XG4gICAgICAgIGVsc2UgaWYoIW9wZW4gJiYgaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgRHJvcGRvd24ub3BlbnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgaWYoIV9pc0lucHV0ICYmIHRoaXMuZGF0YS5zdHJpY3QpXG4gICAgICAgICAgICAgICB0aGlzLmRhdGEudmFsdWUgPSB0aGlzLmRhdGEuc2VsZWN0ZWQgPyB0aGlzLmRhdGEuc2VsZWN0ZWQubmFtZSA6ICcnO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyDovpPlhaXml7ZcbiAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZGF0YS52YWx1ZTtcblxuICAgICAgICBpZih2YWx1ZS5sZW5ndGggPj0gdGhpcy5kYXRhLm1pbkxlbmd0aClcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKHRydWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSwgdHJ1ZSk7XG4gICAgfSxcbiAgICB1bmlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcblxuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZGF0YS52YWx1ZTtcblxuICAgICAgICBpZighdmFsdWUgJiYgdGhpcy5kYXRhLm1pbkxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZih0aGlzLmRhdGEubWF0Y2hUeXBlID09ICdhbGwnKVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZS5pbmRleE9mKHZhbHVlKSA+PSAwO1xuICAgICAgICBlbHNlIGlmKHRoaXMuZGF0YS5tYXRjaFR5cGUgPT0gJ3N0YXJ0JylcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSA9PSB2YWx1ZTtcbiAgICAgICAgZWxzZSBpZih0aGlzLmRhdGEubWF0Y2hUeXBlID09ICdlbmQnKVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZS5zbGljZSgtdmFsdWUubGVuZ3RoKSA9PSB2YWx1ZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdWdnZXN0OyIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaW1lUGlja2VyIOaXpeacn+mAieaLqVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBTdWdnZXN0ID0gcmVxdWlyZSgnLi9zdWdnZXN0LmpzJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBUaW1lUGlja2VyXG4gKiBAZXh0ZW5kIFN1Z2dlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEudmFsdWUgICAgICAgICAgICAgIOaWh+acrOahhuS4reeahOWAvFxuICogQHBhcmFtIHtzdHJpbmc9J+ivt+i+k+WFpSd9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDmlofmnKzmoYbpu5jorqTmloflrZdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIFRpbWVQaWNrZXIgPSBTdWdnZXN0LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RpbWVQaWNrZXInLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc291cmNlID0gW107XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBzb3VyY2UucHVzaCh7bmFtZTogJzAnICsgaSArICc6MDAnfSk7XG4gICAgICAgICAgICBzb3VyY2UucHVzaCh7bmFtZTogJzAnICsgaSArICc6MzAnfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKHZhciBpID0gMTA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgICAgICBzb3VyY2UucHVzaCh7bmFtZTogaSArICc6MDAnfSk7XG4gICAgICAgICAgICBzb3VyY2UucHVzaCh7bmFtZTogaSArICc6MzAnfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUnLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBtaW5MZW5ndGg6IDAsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIGRlbGF5OiAzMDAsXG4gICAgICAgICAgICBtYXRjaFR5cGU6ICdzdGFydCdcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc3RyaWN0OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGltZVBpY2tlcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zZWxlY3QyIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT4gICAgICAgIDxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNhcmV0LWRvd25cXFwiPjwvaT4gICAgICAgIDxzcGFuPntzZWxlY3RlZCA/IHNlbGVjdGVkLm5hbWUgOiBwbGFjZWhvbGRlcn08L3NwYW4+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPHRyZWVWaWV3IHNvdXJjZT17c291cmNlfSBvbi1zZWxlY3Q9e3RoaXMuc2VsZWN0KCRldmVudC5zZWxlY3RlZCl9IC8+ICAgIDwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRyZWVTZWxlY3Qg5qCR5Z6L6YCJ5oupXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2VsZWN0MiA9IHJlcXVpcmUoJy4vc2VsZWN0Mi5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90cmVlU2VsZWN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgVHJlZXZpZXcgPSByZXF1aXJlKCcuLi9tb2R1bGUvdHJlZVZpZXcuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVHJlZVNlbGVjdFxuICogQGV4dGVuZCBTZWxlY3QyXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9J+ivt+mAieaLqSd9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDpu5jorqTpobnnmoTmloflrZdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBUcmVlU2VsZWN0ID0gU2VsZWN0Mi5leHRlbmQoe1xuICAgIG5hbWU6ICd0cmVlU2VsZWN0JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgcGxhY2Vob2xkZXI6ICfor7fpgInmi6knXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmVlU2VsZWN0OyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS11cGxvYWRlciB7QChjbGFzcyl9XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgPGEgY2xhc3M9XFxcInUtYnRuXFxcIiBvbi1jbGljaz17dGhpcy51cGxvYWQoKX0+e25hbWUgfHwgXFwn5LiK5LygXFwnfTwvYT4gICAgPGZvcm0gbWV0aG9kPVxcXCJQT1NUXFxcIiBhY3Rpb249e3VybH0gdGFyZ2V0PVxcXCJpZnJhbWV7X2lkfVxcXCIgZW5jdHlwZT17Y29udGVudFR5cGV9IHJlZj1cXFwiZm9ybVxcXCI+ICAgICAgICA8aW5wdXQgdHlwZT1cXFwiZmlsZVxcXCIgbmFtZT1cXFwiZmlsZVxcXCIgcmVmPVxcXCJmaWxlXFxcIiBvbi1jaGFuZ2U9e3RoaXMuc3VibWl0KCl9PiAgICAgICAgeyNsaXN0IE9iamVjdC5rZXlzKGRhdGEpIGFzIGtleX0gICAgICAgIDxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9e2tleX0gdmFsdWU9e2RhdGFba2V5XX0+ICAgICAgICB7L2xpc3R9ICAgIDwvZm9ybT4gICAgPGlmcmFtZSBuYW1lPVxcXCJpZnJhbWV7X2lkfVxcXCIgb24tbG9hZD17dGhpcy5jYlVwbG9hZCgpfSByZWY9XFxcImlmcmFtZVxcXCI+ICAgIDwvaWZyYW1lPjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFVwbG9hZGVyICDkuIrkvKBcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi91cGxvYWRlci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBVcGxvYWRlclxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubmFtZSAgICAgICAgICAgICAgIOaMiemSruaWh+Wtl1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnVybCAgICAgICAgICAgICAgICDkuIrkvKDot6/lvoRcbiAqIEBwYXJhbSB7c3RyaW5nPSdqc29uJ30gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRhVHlwZSAgICAgICAgICAg5pWw5o2u57G75Z6LXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZGF0YSAgICAgICAgICAgICAgIOmZhOWKoOaVsOaNrlxuICogQHBhcmFtIHtzdHJpbmdbXT1udWxsfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmV4dGVuc2lvbnMgICAgICAgICDlj6/kuIrkvKDnmoTmianlsZXlkI3vvIzlpoLmnpzkuLrnqbrvvIzliJnooajnpLrlj6/kuIrkvKDku7vkvZXmlofku7bnsbvlnotcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgVXBsb2FkZXIgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAndXBsb2FkZXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczogbnVsbCxcbiAgICAgICAgICAgIF9pZDogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB1cGxvYWQoKSDlvLnlh7rmlofku7blr7nor53moYblubbkuJTkuIrkvKDmlofku7ZcbiAgICAgKiBAcHVibGljXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB1cGxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRyZWZzLmZpbGUuY2xpY2soKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc3VibWl0KCkg5o+Q5Lqk6KGo5Y2VXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHN1Ym1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5leHRlbnNpb25zKSB7XG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSB0aGlzLiRyZWZzLmZpbGUudmFsdWU7XG4gICAgICAgICAgICB2YXIgZXh0ID0gZmlsZU5hbWUuc3Vic3RyaW5nKGZpbGVOYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxLCBmaWxlTmFtZS5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5leHRlbnNpb25zLmluZGV4T2YoZXh0KSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVtaXQoJ2Vycm9yJywgdGhpcy5leHRlbnNpb25FcnJvcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbmRpbmcnLCB0aGlzLmRhdGEuZGF0YSk7XG5cbiAgICAgICAgdGhpcy4kcmVmcy5mb3JtLnN1Ym1pdCgpO1xuICAgIH0sXG4gICAgY2JVcGxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWZyYW1lID0gdGhpcy4kcmVmcy5pZnJhbWU7XG5cbiAgICAgICAgdmFyIHhtbCA9IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICB4bWwucmVzcG9uc2VUZXh0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keSA/IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MIDogbnVsbDtcbiAgICAgICAgICAgICAgICB4bWwucmVzcG9uc2VYTUwgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5YTUxEb2N1bWVudCA/IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LlhNTERvY3VtZW50IDogaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaWZyYW1lLmNvbnRlbnREb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIHhtbC5yZXNwb25zZVRleHQgPSBpZnJhbWUuY29udGVudERvY3VtZW50LmRvY3VtZW50LmJvZHk/aWZyYW1lLmNvbnRlbnREb2N1bWVudC5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA6IG51bGw7XG4gICAgICAgICAgICAgICAgeG1sLnJlc3BvbnNlWE1MID0gaWZyYW1lLmNvbnRlbnREb2N1bWVudC5kb2N1bWVudC5YTUxEb2N1bWVudD9pZnJhbWUuY29udGVudERvY3VtZW50LmRvY3VtZW50LlhNTERvY3VtZW50IDogaWZyYW1lLmNvbnRlbnREb2N1bWVudC5kb2N1bWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF4bWwucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGZ1bmN0aW9uIHVwbG9hZEh0dHBEYXRhKHIsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gKHR5cGUgPT0gJ3htbCcgfHwgIXR5cGUpID8gci5yZXNwb25zZVhNTCA6IHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgaXMgJ3NjcmlwdCcsIGV2YWwgaXQgaW4gZ2xvYmFsIGNvbnRleHRcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnanNvbicpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gLzxwcmUuKj8+KC4qPyk8XFwvcHJlPi8uZXhlYyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0WzFdIDogZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRlbWl0KCdzdWNjZXNzJywgdXBsb2FkSHR0cERhdGEoeG1sLCB0aGlzLmRhdGEuZGF0YVR5cGUpKTtcbiAgICAgICAgdGhpcy4kZW1pdCgnY29tcGxldGUnLCB4bWwpO1xuXG4gICAgICAgIHRoaXMuJHJlZnMuZmlsZS52YWx1ZSA9ICcnO1xuICAgIH0sXG4gICAgZXh0ZW5zaW9uRXJyb3I644CAZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAn5Y+q6IO95LiK5LygJyArIHRoaXMuZGF0YS5leHRlbnNpb25zLmpvaW4oJywgJynjgIArICfnsbvlnovnmoTmlofku7bvvIEnO1xuICAgIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBVcGxvYWRlcjsiXX0=
