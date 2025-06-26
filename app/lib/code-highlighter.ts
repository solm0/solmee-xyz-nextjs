export default function highlighter(code: string): string {
  const keywords = [
    "const", "let", "var", "function", "return", "if", "else", "switch", "case", "break",
    "for", "while", "do", "try", "catch", "finally", "throw", "new", "delete", "typeof",
    "instanceof", "await", "async", "yield", "import", "from", "export", "default",
    "class", "extends", "super", "this", "true", "false", "null", "undefined",
    "NaN", "Infinity", "useState", "useEffect", "useRef", "useContext", "useMemo",
    "useCallback", "useReducer", "useLayoutEffect", "React", "Fragment", "props", "children",
    "Math", "document", "window", "map", "filter", "reduce", "forEach", "find", "includes", "push", "pop", "shift", "unshift",
    "slice", "splice", "replace", "split", "join", "concat", "indexOf", "toLowerCase", "toUpperCase",
    "trim", "length", "charAt", "substring", "typeof", "instanceof", "parseInt", "parseFloat",
    "isNaN", "isFinite", "Object", "Array", "String", "Number", "Boolean", "JSON", "console",
    "log", "error", "warn", "alert", "setTimeout", "setInterval", "clearTimeout", "clearInterval",
    "addEventListener", "removeEventListener", "querySelector", "getElementById",
  ];

  const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  const symbolRegex = /([=+\-*/%""`!?:;.,()[\]{}<>])/g;

  const spans: string[] = [];
  let tempCode = code;

  const storeSpan = (match: string) => {
    const placeholder = `__HL_${spans.length}__`;
    spans.push(`<span class="text-green-900">${match}</span>`);
    return placeholder;
  };

  // Step 1: Replace keywords and symbols with placeholders
  tempCode = tempCode.replace(keywordRegex, storeSpan);
  tempCode = tempCode.replace(symbolRegex, storeSpan);

  // Step 2: Escape the entire result
  tempCode = tempCode
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Step 3: Restore highlighted spans
  spans.forEach((span, i) => {
    const placeholder = `__HL_${i}__`;
    tempCode = tempCode.replace(placeholder, span);
  });

  return tempCode;
}