const fs = require('fs').promises;
const path = require('path');

/**
 * Load and compile template with data values
 * @param {string} templateName - Name of the template (without extension)
 * @param {Object} data - Key-value pairs for placeholders
 * @returns {Promise<string>} compiled HTML
 */
const getCompiledTemplate = async (templateName, data) => {
  const templatePath = path.join(__dirname, '../../templates', `${templateName}.html`);
  let html = await fs.readFile(templatePath, 'utf8');
  for (const [key, value] of Object.entries(data)) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return html;
};

module.exports = { getCompiledTemplate };
