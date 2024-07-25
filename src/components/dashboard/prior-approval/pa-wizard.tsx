'use client';

import React, { useRef } from 'react';
import Box from '@mui/material/Box';  
import Card from '@mui/material/Card';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import { Button, Step, StepConnector, StepIconProps, stepConnectorClasses, styled } from '@mui/material';
import { DefineConfigParameters, DefineConfigRefObect } from './define-config';
import { SourceFileInfo } from './source-file-info';
import { MandatoryLookup } from './mandatory-lookup';
import { OptionalLookup } from './optional-lookup';
import { MappingRules } from './mapping-rules';
import { ExecuteMapProcess } from './execute-map-process';
import { MultpleHDRHDHP } from './mulitple-hdr-hdhp';
import { Check } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';


//const steps = ['Define Config Parameters', 'Source File Information', 'Mandatory Lookups', 'Optional Lookups', 'Mapping Rules', 'UHC-Multiple HCR/HDHP', 'Execute Map Process'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <SettingsIcon />,
    3: <SettingsIcon />,
    4: <SettingsIcon />,
    5: <SettingsIcon />,
    6: <SettingsIcon />,
    7: <SettingsIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export function PAWizard(): React.JSX.Element {

  const defineConfigRef = React.useRef<DefineConfigRefObect>(null); //useRef<DefineConfigParametersHandles>(null);

  const [wizardData, setWizardData] = React.useState({
    configParameters: {
      clientEnvironment: '',
      configType: '',
      inputType: '',
      recordType: '',
      gcnGpiCrosswalk: '',
      exclusionToPay: '',
      eligibilityLookup: '',
      fileHeader: '',
      fileFooter: '',
      dateFormat: '',
      pbmId: '',
      mscCode: '',
      goLiveDate: new Date(),
      applyDateTerm: '',
      consentyxOption: '',
      //updateWizardData: updateWizardData
    },
    sourceFileInfo: {
      sourceFileType: '',
      carrierName: '',
      recordNeedsPadding: false,
      sheetIndex: '',
      headerRowCount: ''
    },
    mandatoryLookup: {
      eligibilityLookupCriteria: '',
      rcprdpLookupCriteria: '',
      rcpidpLookupCriteria: ''
    },
    optionalLookup: {
      optionalLookupCriteria: ''
    },
  });

    // Function to update the nested state object
    const updateWizardData = React.useCallback((step, key, value) => {
      setWizardData(prevData => ({
        ...prevData,
        [step]: {
          ...prevData[step],
          [key]: value,
        },
      }));
    }, []);

      // Function to handle specific changes for clientEnvironment
  const handleClientEnvironmentChange = (value) => {
    updateWizardData('configParameters', 'clientEnvironment', value);
    // Additional logic based on clientEnvironment
  };

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  //let activeStep = 1;
  //let skipped = new Set<number>();
  const isStepFailed = (step: number): boolean => {
    return step === 1;
  };

  const isStepOptional = (step: number): boolean => {
    return step === 1;
  };

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let isValid = true;

    switch(activeStep){
      case 0:
        if(defineConfigRef.current){
          //isValid = defineConfigRef.current.onSubmit();
          isValid = await defineConfigRef.current.validate();
          //isValid = defineConfigRef.current.validate();
          console.log('isValid->', isValid);
        }
    }
    if(!isValid) return;
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }



    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepper = () => {
    return (<Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
            <Step key="MappingRules">
        <StepLabel StepIconComponent={ColorlibStepIcon}>Mapping Rules</StepLabel>
      </Step>

      <Step key="DefineConfigParameters">
        <StepLabel StepIconComponent={ColorlibStepIcon}>Define Config Parameters</StepLabel>
      </Step>
      <Step key="SourceFileInformation">
        <StepLabel StepIconComponent={ColorlibStepIcon}>Source File Information</StepLabel>
      </Step>
      <Step key="MandatoryLookups">
        <StepLabel StepIconComponent={ColorlibStepIcon}>Mandatory Lookups</StepLabel>
      </Step>
      <Step key="OptionalLookups">
        <StepLabel StepIconComponent={ColorlibStepIcon}>Optional Lookups</StepLabel>
      </Step>
      {/* <Step key="MappingRules">
        <StepLabel StepIconComponent={ColorlibStepIcon}>Mapping Rules</StepLabel>
      </Step> */}
      {wizardData.configParameters.clientEnvironment == 'bk2' ? <Step key="UHCMultipleHCRHDHP">
        <StepLabel StepIconComponent={ColorlibStepIcon}>UHC-Multiple HCR/HDHP</StepLabel>
      </Step>:null}
      <Step key="ExecuteMapProcess">
        <StepLabel StepIconComponent={ColorlibStepIcon}>Execute Map Process</StepLabel>
      </Step>
    </Stepper>);
    // switch (activeStep) {
    //   case 1:
    //     return <DefineConfigParameters />;
    //   // Case for other steps...
    //   default:
    //     return <div>Unknown step</div>;
    // }
  };
  // const renderActiveStep = () => {
  //   switch (activeStep) {
  //     case 0:
  //       return <DefineConfigParameters 
        
  //       configParameters={wizardData.configParameters}
  //       updateWizardData={updateWizardData}
  //         //onClientEnvironmentChange={handleClientEnvironmentChange}
  //         ref={defineConfigRef} 
  //         />;
  //     case 1:
  //       return <SourceFileInfo />;
  //     case 2:
  //       return <MandatoryLookup />
  //     case 3:
  //       return <OptionalLookup />
  //     case 4:
  //       return <MappingRules />
  //     case 5:
  //       return <MultpleHDRHDHP />;
  //     case 6:
  //       return <ExecuteMapProcess />;
  //     // Case for other steps...
  //     default:
  //       return <div>Unknown step</div>;
  //   }
  // }

  const renderActiveStep = () => {
    switch (activeStep) {
      case 4:
        return <DefineConfigParameters 
        
        configParameters={wizardData.configParameters}
        updateWizardData={updateWizardData}
          //onClientEnvironmentChange={handleClientEnvironmentChange}
          ref={defineConfigRef} 
          />;
      case 1:
        return <SourceFileInfo />;
      case 2:
        return <MandatoryLookup />
      case 3:
        return <OptionalLookup />
      case 0:
        return <MappingRules />
      case 5:
        return <MultpleHDRHDHP />;
      case 6:
        return <ExecuteMapProcess />;
      // Case for other steps...
      default:
        return <div>Unknown step</div>;
    }
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        {renderStepper()}
        {renderActiveStep()}
        {activeStep > 0 ? <Button onClick={handleBack}>
          Back
        </Button> : null}
        {activeStep < 6 ? <Button onClick={handleNext}>
          Next
        </Button> : null}
      </Box>
    </Card>
  );
}