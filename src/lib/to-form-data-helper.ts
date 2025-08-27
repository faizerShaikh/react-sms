export function toFormData<T extends Record<string, any>>(
  formValue: T,
  fileFields: string[] = [],
  ignoreFields: string[] = [],
) {
  const formData = new FormData();
  for (const key in formValue) {
    if (ignoreFields.includes(key)) {
      continue;
    }
    if (formValue.hasOwnProperty(key)) {
      const value = formValue[key] as any;
      if (typeof value === 'boolean') {
        formData.append(key, value.toString());
      } else if (value) {
        if (value instanceof FileList) {
          // If it's a FileList, append each file to the FormData
          for (let i = 0; i < value.length; i++) {
            const file = value[i];
            if (file) formData.append(`${key}`, file, file.name);
          }
        } else if (value instanceof File) {
          // If it's a single File, append it to the FormData
          if (value) formData.append(key, value, value.name);
        } else if (Array.isArray(value)) {
          // If it's an array, append each item to the FormData
          for (let i = 0; i < value.length; i++) {
            const val = value[i];
            if (val instanceof File) {
              formData.append(`${key}`, val, val.name);
            } else {
              formData.append(`${key}`, value[i]);
            }
          }
        } else if (typeof value === 'object') {
          // If it's an object, stringify it and append it as a JSON string
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === 'string' && fileFields.includes(key)) {
        } else {
          // For strings, numbers, and booleans, append them directly
          formData.append(key, value);
        }
      }
    }
  }

  return formData;
}
