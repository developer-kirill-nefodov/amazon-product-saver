import JSON5 from 'json5';

export const safeJsonParse = (raw) => {
  try {
    const cleaned = raw
      .replace(/^```json/, '')
      .replace(/```$/, '')
      .trim();

    const parsed = JSON5.parse(cleaned);

    if (typeof parsed === 'string') {
      return JSON5.parse(parsed);
    }

    return parsed;
  } catch (err) {
    console.error('Failed to parse JSON:', err.message);
    throw new Error('Invalid format');
  }
};
