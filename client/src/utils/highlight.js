function highlight(line) {
  let keywords = {
    keyword:
      'in of if for while finally var new function do return void else break catch ' +
      'instanceof with throw case default try this switch continue typeof delete ' +
      'let yield const export super debugger as async await static ' +
      // ECMAScript 6 modules import
      'import from as'
    ,
    literal:
      'true false null undefined NaN Infinity',
    built_in:
      'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
      'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
      'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
      'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
      'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
      'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
      'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' +
      'Promise'
  };

  let c = line; //未处理的代码

  //html tags
  // c = c.replace(/<(.*?)\s*/g, "<span class=\"tag\">$1</span>")

  // 匹配操作符
  c = c.replace(/(=|%|\/|\*|-|,|;|\+|<|>)/g, "<span class=\"sc\">$1</span>");

  //引号或倒引号中的字符串
  c = c.replace(/(['`].*?['`])/g, "<span class=\"quotes\">$1</span>");

  //数字
  c = c.replace(/(\d+)/g, "<span class=\"number\">$1</span>");

  //函数名
  // c = c.replace(/(\w*?)\(/g, "<span class=\"function\">$1</span>(");

  //括号
  c = c.replace(/([()])/g, "<span class=\"sc\">$1</span>");

  //保留关键字
  let k = keywords.keyword.split(' ')
  let re
  for(var i = 0; i < k.length; i++) {
    re = new RegExp("\\b"+k[i]+"\\b", "g");
    c = c.replace(re, "<span class=\"keyword\">"+k[i]+"</span>");
  }

  //单行注释 //
  c = c.replace(/(\/\/.*)/g, clear_spans);

  //还原 /* 和 */
  c = c.replace(/<span class="sc">\/<\/span><span class="sc">\*<\/span>/g, "/*");
  c = c.replace(/<span class="sc">\*<\/span><span class="sc">\/<\/span>/g, "*/");

  //多行注释, [\s\S] 匹配 /* 和 */ 之间的所有字符，包括空白字符
  c = c.replace(/(\/\*[\s\S]*?\*\/)/g, clear_spans);

  //去掉多行注释里面的 spans
  function clear_spans(match)
  {
    match = match.replace(/<span.*?>/g, "");
    match = match.replace(/<\/span>/g, "");
    return "<span class=\"comment\">"+match+"</span>";
  }

  //去掉引号中的 spans
  c = c.replace(/['`](.*?)['`]/g, (match) => {
    match = match.replace(/<span.*?>/g, "");
    match = match.replace(/<\/span>/g, "");
    return match
  });

  //处理开头的缩进
  c = c.replace(/^\s{2,}/, "<span>&nbsp;</span>")

  return c
}

export default highlight
