
import { CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";

export default function DeauthorizePage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Desautorización de la Aplicación</CardTitle>
        <CardDescription>
          Información sobre el proceso de desautorización.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Si has llegado a esta página, es probable que hayas eliminado el acceso de Insightly desde tu configuración de Facebook o Instagram.
        </p>
        <p className="mt-4">
          Hemos recibido la notificación y, si teníamos algún dato de acceso asociado a tu cuenta, ha sido eliminado de nuestros sistemas. No se realizarán más accesos a tus datos de redes sociales.
        </p>
         <p className="mt-4">
          Gracias por usar Insightly.
        </p>
      </CardContent>
    </>
  );
}
