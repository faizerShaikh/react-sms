export const instanceOf = <T>(value: any, fieldName: keyof T): value is T =>
  typeof value === 'object' && fieldName in value;
