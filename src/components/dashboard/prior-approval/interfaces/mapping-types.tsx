export const FieldTypes = {
  Text: 'text',
  Date: 'date',
  Number: 'number',
  AlphaNumeric: 'alphanumeric'
}

export interface SourceFieldType{
  type: string;
  label: string;
}

export interface TargetFieldType{
  name: string;
  type: string;
  bindedFields: string[];
  expression: string;
}
