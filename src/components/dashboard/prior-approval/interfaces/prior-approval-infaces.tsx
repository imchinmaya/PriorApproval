export interface DefineConfigParametersProps {
  clientEnvironment: string;
  configType: string;
  inputType: string;
  gcnGpiCrosswalk: string;
  eligibilityLookup: string;
  exclusionToPay: string;
  recordType: string;
  dateFormat: string;
  pbmId: string;
  mscCode: string;
  goLiveDate: Date;
  applyDateTerm: string;
  consentyxOption: string;
  fileHeader: string;
  fileFooter: string;
}

export interface StepValidation{
  validate: () => Promise<boolean>;
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
