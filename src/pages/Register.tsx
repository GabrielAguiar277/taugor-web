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

import LoadingButton from '@mui/lab/LoadingButton';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../domain/auth-management/context/AuthProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
    firstName: z.string().min(2, "Digite um nome válido"),
    lastName: z.string().min(2, "Digite um sobrenome válido"),
    email: z.string().email("Digite um e-mail válido"),
    password: z.string()
    .min(8, "A senha deve conter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
    cPassword: z.string()
}).refine(data => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Senhas não conferem"
});

type FormValues = z.infer<typeof formSchema>;


const defaultTheme = createTheme();

export function Register() {

    const [load, setLoad] = useState(false);

    const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    });

    const { signup } = useAuth();
    let navigate = useNavigate();

    const submitForm = async (data: FormValues) => {

        setLoad(true);

        try {
            await signup(data.email, data.password, data.firstName, data.lastName);
            navigate("/login")
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoad(false);
        }

    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value;
        value = value.replace(/[^a-zA-Z]+/g, '');
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
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
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Controller 
                        name="firstName"
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoComplete="given-name"
                                fullWidth
                                id="firstName"
                                label="Primeiro nome"
                                autoFocus

                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                onChange={(e) => field.onChange(handleName(e))}
                            />
                        )}
                    />
                    
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller 
                        name="lastName"
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoComplete="given-name"
                                fullWidth
                                id="lastName"
                                label="Último nome"
                                

                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                onChange={(e) => field.onChange(handleName(e))}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"

                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register('email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="new-password"

                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Confirmar senha"
                        type="password"
                        id="cPassword"

                        error={!!errors.cPassword}
                        helperText={errors.cPassword?.message}
                        {...register('cPassword')}
                    />
                </Grid>
                
                </Grid>
                {
                    !load ?
                        (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrar
                            </Button>
                        )
                    :
                        (
                            <LoadingButton loading fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                <span>Cadastrando</span>
                            </LoadingButton>
                        )

                }
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                    Já tem uma conta?
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            
        </Container>
        </ThemeProvider>
    );
}