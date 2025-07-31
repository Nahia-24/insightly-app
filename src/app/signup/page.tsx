'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Added EyeOff icon

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        <path d="M1 1h22v22H1z" fill="none"/>
    </svg>
);


export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error de registro',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error de registro con Google',
        description: 'Asegúrate de haber habilitado el inicio de sesión con Google en tu consola de Firebase.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-sm bg-transparent border-none text-white shadow-none">
      <CardHeader className="text-center mb-6">
        <CardTitle className="text-3xl font-bold font-headline">Regístrate</CardTitle>
        <CardDescription className="text-white/70">
          Ingresa tu información para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white/90">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-purple-600 focus:border-purple-600 text-white"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-white/90">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-purple-600 focus:border-purple-600 text-white"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 focus:outline-none">
                {showPassword ? <EyeOff /> : <Eye />} {/* Toggle eye icon */}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white font-bold py-2 px-4 rounded-md" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Regístrate'}
          </Button>
          <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-md" onClick={handleGoogleSignUp} type="button">
            <GoogleIcon className="mr-2 h-4 w-4" />
            Registrarse con Google
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-white/70">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-white hover:underline font-bold">
            Iniciar Sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}