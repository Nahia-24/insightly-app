
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      let newPhotoURL = user.photoURL;

      if (photoFile) {
        const storageRef = ref(storage, `avatars/${user.uid}/${photoFile.name}`);
        const snapshot = await uploadBytes(storageRef, photoFile);
        newPhotoURL = await getDownloadURL(snapshot.ref);
      }

      await updateProfile(user, {
        displayName,
        photoURL: newPhotoURL,
      });

      // We need to update the state to reflect the new URL from storage
      if (newPhotoURL) {
          setPhotoURL(newPhotoURL);
      }

      toast({
        title: 'Perfil actualizado',
        description: 'Tu información ha sido guardada exitosamente.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el perfil. ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setPhotoFile(null); // Reset file input after upload
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona la configuración de tu cuenta.
        </p>
      </div>
      <Card>
        <form onSubmit={handleSaveChanges}>
          <CardHeader>
            <CardTitle>Perfil Público</CardTitle>
            <CardDescription>Esta información será visible para otros.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="size-24">
                    <AvatarImage src={photoURL || undefined} alt="Avatar de usuario"/>
                    <AvatarFallback>{displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Cambiar Foto
                </Button>
                <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                />
              </div>

              <div className="w-full flex-1 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="display-name">Nombre de Usuario</Label>
                    <Input
                        id="display-name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" value={user?.email || ''} disabled />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-opacity">
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
