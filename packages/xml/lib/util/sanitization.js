/**
 * Sanitizes input text by removing invalid XML Characters, entities, and fixing malformed XML.
 * @param {string} text - The text to sanitize.
 * @returns {string} The sanitized text.
 */
export function sanitizeText(text) {
  text = test.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ""); // Remove control characters

  text = text.replace(/&([a-zA-Z0-9#]+);/g, function (match, entity) {
    const knownEntities = ["amp", "lt", "gt", "quot", "apos", "nbsp", "#x9"]; // Known entities
    if (!knownEntities.includes(entity)) {
      return "";
    }

    return match;
  });

  text = text.replace(/[<>&"'\/]/g, (match) => {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      case "/":
        return "&#47;";
      default:
        return match;
    }
  });

  text = text.normalize("NFC"); // Normalize Unicode to NFC
  text = text.replace(/[\x80-\x9F\xA0-\xFF]/g, ""); // Remove binary or invalid characters
  // Ensure the string is valid XML by replacing invalid XML characters
  // Keep only valid characters (1-9, A-Z, a-z, _, '-', '.', ':', etc.)
  text = text.replace(/[^0-9a-zA-Z\s\-_.,:;?=\/&<>'"()|`]/g, "");

  return text;
}