
'use client';

import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { Card } from '@mui/material';

import { z as zod } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefineConfigParametersProps, StepValidation } from './interfaces/prior-approval-infaces';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Define a schema for the date, ensuring it's greater than today
const goLiveDateSchema = zod.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    return arg;
  }, zod.date().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Clear the time part
    return date > today;
  }, {
    message: "Go Live Date must be greater than today",
  }));

export const DefineConfigParameters = React.forwardRef((props: { configParameters: DefineConfigParametersProps, updateWizardData: (step: string, key: string, value: string) => void }, ref: React.Ref<StepValidation>) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    let { configParameters, updateWizardData } = props;

    const schema = zod.object({
        clientEnvironment: zod.string().min(1, { message: 'Client Environment is required' }),
        configType: zod.string().min(1, { message: 'Config Type is required' }),
        inputType: zod.string().min(1, { message: 'Input Type is required' }),
        gcnGpiCrosswalk: zod.string().min(1, { message: 'GCN GPI Crosswalk is required' }),
        eligibilityLookup: zod.string().min(1, { message: 'Eligibility Lookup is required' }),
        exclusionToPay: zod.string().min(1, { message: 'Exclusion to Pay is required' }),
        recordType: zod.string().min(1, { message: 'Record Type is required' }),
        dateFormat: zod.string().min(1, { message: 'Date Format is required' }),
        pbmId: zod.string().min(1, { message: 'PBM ID is required' }),
        goLiveDate: goLiveDateSchema, // .min(1, { message: 'Go Live Date is required' }),
        fileHeader: zod.string().min(1, { message: 'File Header is required' }),
        fileFooter: zod.string().min(1, { message: 'File Footer is required' }),
        mscCode: configParameters.clientEnvironment !== 'bk2' ? zod.string().min(1, { message: 'Exclusion MSC Code List is required' }) : zod.string().optional(),
        applyDateTerm: configParameters.clientEnvironment !== 'bk2' ? zod.string().min(1, { message: 'Apply Term Date is required' }) : zod.string().optional(),
        consentyxOption: configParameters.clientEnvironment !== 'bk2' ? zod.string().min(1, { message: 'Consentyx Option is required' }) : zod.string().optional(),
    });

    type Values = zod.infer<typeof schema>;

    const defaultValues: Values = {
        clientEnvironment: configParameters.clientEnvironment,
        configType: configParameters.configType,
        inputType: configParameters.inputType,
        gcnGpiCrosswalk: configParameters.gcnGpiCrosswalk,
        eligibilityLookup: configParameters.eligibilityLookup,
        exclusionToPay: configParameters.exclusionToPay,
        recordType: configParameters.recordType,
        dateFormat: configParameters.dateFormat,
        pbmId: configParameters.pbmId,
        goLiveDate: configParameters.goLiveDate,
        applyDateTerm: configParameters.applyDateTerm,
        consentyxOption: configParameters.consentyxOption,
        fileHeader: configParameters.fileHeader,
        fileFooter: configParameters.fileFooter,
        mscCode: configParameters.mscCode
    };

    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    React.useImperativeHandle(ref, () => ({
        validate: () => {
            return trigger();
        }
    }));

    const clientEnvironments = [
        { value: 'bk1', label: 'Book1' },
        { value: 'bk2', label: 'Book2' },
        { value: 'oth', label: 'Others' }
    ] as const;

    const exclusionsToPay = [
        { value: 'bk1', label: 'Book1' },
        { value: 'bk2', label: 'Book2' },
        { value: 'oth', label: 'Others' }
    ] as const;

    const [recordType, setRecordType] = React.useState('');


    // Handlers for form controls
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        updateWizardData('configParameters', name, value);
        // if (name === 'clientEnvironment') {
        //   onClientEnvironmentChange(value);
        // }
    };

    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        //setMscCode(prevMscCode => ({ ...prevMscCode, [name]: checked }));
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        // Submit your form values somewhere or move to the next step
    };

    // Render the form
    return (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader subheader="The information can be edited" title="Define Config Parameters" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        {/* <Grid md={12} xs={12}>
                            <div>
                                {Object.keys(errors).map((errorKey, index) => (
                                    <div key={index}>{errors[errorKey].message}</div>
                                ))}
                            </div>
                        </Grid> */}
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.clientEnvironment)} >
                                <InputLabel>Client Environment</InputLabel>
                                <Controller
                                    name="clientEnvironment"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.clientEnvironment} label="Client Environment *"
                                            name="clientEnvironment"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleInputChange(e);
                                            }}
                                            variant="outlined">
                                            {clientEnvironments.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.clientEnvironment ? <FormHelperText>{errors.clientEnvironment.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.configType)} >
                                <InputLabel>Config Type</InputLabel>
                                <Controller
                                    name="configType"
                                    control={control}
                                    render={({ field }) => (
                                        <OutlinedInput value={configParameters.configType} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Config Type *" name="configType" />
                                    )}
                                />
                                {errors.configType ? <FormHelperText>{errors.configType.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.inputType)}>
                                <InputLabel>Input Type *</InputLabel>
                                <Controller
                                    name="inputType"
                                    control={control}
                                    render={({ field }) => (
                                        <OutlinedInput value={configParameters.inputType} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Input Type *" name="inputType" />
                                    )}
                                />
                                {errors.inputType ? <FormHelperText>{errors.inputType.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.gcnGpiCrosswalk)}>
                                <InputLabel>GCN GPI Crosswalk *</InputLabel>
                                <Controller
                                    name="gcnGpiCrosswalk"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.gcnGpiCrosswalk} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="GCN GPI Crosswalk *" name="gcnGpiCrosswalk" variant="outlined">
                                            <MenuItem value="Y">Yes</MenuItem>
                                            <MenuItem value="N">No</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.gcnGpiCrosswalk ? <FormHelperText>{errors.gcnGpiCrosswalk.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.eligibilityLookup)}>
                                <InputLabel>Eligibility Lookup *</InputLabel>
                                <Controller
                                    name="eligibilityLookup"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.eligibilityLookup} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Eligibility Lookup *" name="eligibilityLookup" variant="outlined">
                                            <MenuItem value="Y">Yes</MenuItem>
                                            <MenuItem value="N">No</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.eligibilityLookup ? <FormHelperText>{errors.eligibilityLookup.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.exclusionToPay)}>
                                <InputLabel>Exclusion to Pay *</InputLabel>
                                <Controller
                                    name="exclusionToPay"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.exclusionToPay} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Exclusion to Pay *" name="exclusionToPay" variant="outlined">
                                            <MenuItem value="Y">Yes</MenuItem>
                                            <MenuItem value="N">No</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.exclusionToPay ? <FormHelperText>{errors.exclusionToPay.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        {configParameters.clientEnvironment !== 'bk2' ? <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.mscCode)}>
                                <InputLabel>Exclusion MSC Code List *</InputLabel>
                                <Controller
                                    name="mscCode"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.mscCode} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Exclusion MSC Code List *" name="mscCode" variant="outlined">
                                            <MenuItem value="M">M(Single-Source, Colicensed)</MenuItem>
                                            <MenuItem value="N">N(Single-Source Product)</MenuItem>
                                            <MenuItem value="Y">Y(Multi-Source Product)</MenuItem>
                                            <MenuItem value="O">O(Multi-Source Originator)</MenuItem>
                                            <MenuItem value="B">B(All Brand Drugs)</MenuItem>
                                            <MenuItem value="*">*(All Drugs)</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.mscCode ? <FormHelperText>{errors.mscCode.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid> : null}
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.recordType)}>
                                <InputLabel>Record Type *</InputLabel>
                                <Controller
                                    name="recordType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.recordType} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Record Type *" name="recordType" variant="outlined">
                                            {exclusionsToPay.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.recordType ? <FormHelperText>{errors.recordType.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.dateFormat)}>
                                <InputLabel>Date Format *</InputLabel>
                                <Controller
                                    name="dateFormat"
                                    control={control}
                                    render={({ field }) => (
                                        <OutlinedInput value={configParameters.dateFormat} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Date Format *" name="dateFormat" />
                                    )}
                                />
                                {errors.dateFormat ? <FormHelperText>{errors.dateFormat.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.pbmId)}>
                                <InputLabel>PBM ID *</InputLabel>
                                <Controller
                                    name="pbmId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.pbmId} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="PBM ID *" name="pbmId" variant="outlined">
                                            <MenuItem value="CUSTOM">Custom</MenuItem>
                                            <MenuItem value="ESI500">ESI500</MenuItem>
                                            <MenuItem value="ESI600">ESI600</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.pbmId ? <FormHelperText>{errors.pbmId.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.goLiveDate)}>
                                {/* <InputLabel>Go Live Date (YYMMDD) *</InputLabel> */}
                                <Controller
                                    name="goLiveDate"
                                    control={control}
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={dayjs(configParameters.goLiveDate)}
                                                onChange={(date) => {
                                                    field.onChange(date ? date.toDate() : null);
                                                    handleInputChange({ target: { name: 'goLiveDate', value: date ? date.toDate() : null } });
                                                }}
                                                label="Go Live Date (YYMMDD) *" 
                                                slotProps={{ textField: { variant: 'outlined' } }}

                                                />
                                        </LocalizationProvider>
                                    )}
                                />
                                {errors.goLiveDate ? <FormHelperText>{errors.goLiveDate.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        {configParameters.clientEnvironment !== 'bk2' ? <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.applyDateTerm)}>
                                <InputLabel>Apply Term Date *</InputLabel>
                                <Controller
                                    name="applyDateTerm"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.applyDateTerm} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Apply Term Date *" name="applyDateTerm" variant="outlined">
                                            <MenuItem value="Y">Yes</MenuItem>
                                            <MenuItem value="N">No</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.applyDateTerm ? <FormHelperText>{errors.applyDateTerm.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid> : null}
                        {configParameters.clientEnvironment !== 'bk2' ? <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.consentyxOption)}>
                                <InputLabel>Consentyx Option *</InputLabel>
                                <Controller
                                    name="consentyxOption"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.consentyxOption} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="Consentyx Option *" name="consentyxOption" variant="outlined">
                                            <MenuItem value="Y">Yes</MenuItem>
                                            <MenuItem value="N">No</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.consentyxOption ? <FormHelperText>{errors.consentyxOption.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid> : null}
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.fileHeader)}>
                                <InputLabel>File Header *</InputLabel>
                                <Controller
                                    name="fileHeader"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.fileHeader} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="File Header *" name="fileHeader" variant="outlined">
                                            <MenuItem value="Y">Yes</MenuItem>
                                            <MenuItem value="N">No</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.fileHeader ? <FormHelperText>{errors.fileHeader.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(errors.fileFooter)}>
                                <InputLabel>File Footer *</InputLabel>
                                <Controller
                                    name="fileFooter"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={configParameters.fileFooter} onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }} label="File Footer *" name="fileFooter" variant="outlined">
                                            <MenuItem value="Y">Yes</MenuItem>
                                            <MenuItem value="N">No</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.fileFooter ? <FormHelperText>{errors.fileFooter.message}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>
    );
});

//export default DefineConfigParameters;