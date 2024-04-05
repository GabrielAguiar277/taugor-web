import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../domain/auth-management/context/AuthProvider';
import LoadingButton from '@mui/lab/LoadingButton';

const formSchema = z.object({
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(1, "Este campo é obrigatório")
});

type FormValues = z.infer<typeof formSchema>;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function Login() {

    const [load, setLoad] = useState(false);
    const { signin } = useAuth();

    const { handleSubmit, register, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })

    const submitForm = async (data: FormValues) => {

        setLoad(true);

        try {
            const user = await signin( data.email, data.password );
            console.log(user);
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoad(false);
        }

    }


    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
                Logar
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus

                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email')}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"

                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password')}
                />
                
                {!load ?
                        (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Logar
                            </Button>
                        )
                    :
                        (
                            <LoadingButton loading fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                <span>Logando</span>
                            </LoadingButton>
                        )}

                <Grid container>
                <Grid item xs>
                    
                </Grid>
                <Grid item>
                    <Link href="/register" variant="body2">
                    {"Não tem uma conta?"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            
        </Container>
        </ThemeProvider>
    );
}