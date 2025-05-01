export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const clean: Partial<T> = {};
  
  for (const key in obj) {
    const value = obj[key];
    
    if (value === null || value === undefined) {
      continue;
    }
    
    if (Array.isArray(value)) {
      if (value.length > 0) {
        clean[key] = value as T[keyof T];
      }
      continue;
    }
    
    if (typeof value === 'object') {
      const cleaned = cleanObject(value);
      if (Object.keys(cleaned).length > 0) {
        clean[key] = cleaned as T[keyof T];
      }
      continue;
    }
    
    if (value !== '') {
      clean[key] = value;
    }
  }
  
  return clean;
} 