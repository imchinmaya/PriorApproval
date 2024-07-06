'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '@/paths';
import { AzureTokenParams, authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { useMsal } from '@azure/msal-react';

//import msal from '@azure/msal-node';
const msal = require('@azure/msal-node');

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;


const defaultValues = { email: 'ruchika_agarwal@optum.com', password: 'password' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { instance } = useMsal();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  //import React, { useState } from 'react';

  //function GetToken() {
  //  const [token, setToken] = useState(null);
  
    // const getToken = async () => {
    //   const url = 'https://login.microsoftonline.com/c67d957d-2203-4540-bdbc-001df62dba53/oauth2/v2.0/token';
    //   const params = new URLSearchParams();
    //   params.append('grant_type', 'client_credentials');
    //                               //7b11e4ad-6a59-41cc-9195-0c32818e50cb
    //   params.append('client_id', '726e6710-6417-4e3c-b505-dda532b4760e');
    //                                   //leK8Q~.QOC6YotDzVSprxCbnanZcH3NnWXnBfcJx
    //   params.append('client_secret', 'jJZ8Q~49muf5h8pKfEeOKEzHY-gLXIUKu2EZpcck');
    //   params.append('resource', 'https://management.azure.com/.default');
  
    //   try {
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       body: params.toString(),
    //     });
  
    //     const data = await response.json();
    //     if (response.ok) {
    //       //setToken(data.access_token);
    //       console.log('data.access_token->', data.access_token)
    //     } else {
    //       console.error('Error fetching token:', data);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };
  
  //   return (
  //     <div>
  //       <button onClick={getToken}>Get Token</button>
  //       {token && <p>Access Token: {token}</p>}
  //     </div>
  //   );
  // }
  
  //export default GetToken;

  const handleLogin = () => {
    // setIsPending(true);
    // instance.loginPopup({
    //   scopes: ["user.read"]
    // }).then(response => {
    //   console.log('response->', response);
    //   var tokenInfo: AzureTokenParams = {accessToken: response.accessToken, expiresOn: response.expiresOn, idToken: response.idToken, tokenType: response.tokenType};
    //   const { error } = authClient.signInWithMSAL(tokenInfo);
    //   if (error) {
    //     setError('root', { type: 'server', message: error });
    //     setIsPending(false);
    //     return;
    //   }
    //   //console.log(response.accessToken);
    //   // Refresh the auth state
    //   checkSession?.();



    //   // UserProvider, for this case, will not refresh the router
    //   // After refresh, GuestGuard will handle the redirect
    //   router.refresh();
    // }).catch(error => {
    //   setIsPending(false);
    //   setError('root', { type: 'server', message: error });
    //   console.error(error);
    // });

    

// Define your AAD app details
const clientId = '726e6710-6417-4e3c-b505-dda532b4760e';
const clientSecret = 'jJZ8Q~49muf5h8pKfEeOKEzHY-gLXIUKu2EZpcck';
const tenantId = 'c67d957d-2203-4540-bdbc-001df62dba53';

// Create a new instance of the MSAL Confidential Client Application
const cca = new msal.ConfidentialClientApplication({
  auth: {
    clientId: clientId,
    clientSecret: clientSecret,
    authority: `https://login.microsoftonline.com/${tenantId}`
  }
});

// Request an access token
const tokenRequest = {
  scopes: ['https://management.azure.com/.default'],
};

cca.acquireTokenByClientCredential(tokenRequest)
  .then(response2 => {
    const accessToken2 = response2?.accessToken;

    // Now use this accessToken in the previous axios example
    console.log('Access Token:', accessToken2);

    // // Invoke the pipeline with the retrieved access token
    // const subscriptionId = 'your-subscription-id';
    // const resourceGroupName = 'your-resource-group-name';
    // const factoryName = 'your-data-factory-name';
    // const pipelineName = 'your-pipeline-name';
    // const apiVersion = '2018-06-01';
    // const url = https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DataFactory/factories/${factoryName}/pipelines/${pipelineName}/createRun?api-version=${apiVersion};

    // const headers = {
    //   'Authorization': Bearer ${accessToken},
    //   'Content-Type': 'application/json'
    // };

    // const requestBody = {
    //   // Example parameter structure
    //   // "parameter1": "value1",
    //   // "parameter2": "value2"
    // };

    // axios.post(url, requestBody, { headers })
    //   .then(response => {
    //     console.log('Pipeline run initiated:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error invoking pipeline:', error);
    //   });
  })
  .catch(error => {
    console.error('Error acquiring access token:', error);
  });
  };
  
  // const onSubmit = React.useCallback(
  //   async (values: Values): Promise<void> => {
  //     setIsPending(true);

  //     const { error } = await authClient.signInWithPassword(values);

  //     if (error) {
  //       setError('root', { type: 'server', message: error });
  //       setIsPending(false);
  //       return;
  //     }

  //     //await getToken();

  // const initializeSignIn = () => {
  //   instance.loginRedirect();
  // };
      
  //     // Refresh the auth state
  //     await checkSession?.();



  //     // UserProvider, for this case, will not refresh the router
  //     // After refresh, GuestGuard will handle the redirect
  //     router.refresh();
  //   },
  //   [checkSession, router, setError]
  // );

  return (
    <Stack spacing={4}>
        <Stack spacing={2}>
          <Button disabled={isPending} onClick={handleLogin} variant="contained">
            Sign in with Microsoft 
          </Button>
        </Stack>
    </Stack>
  );
}
