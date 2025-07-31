
import { CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";

export default function DataDeletionPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Solicitud de Eliminación de Datos</CardTitle>
        <CardDescription>
          Instrucciones para solicitar la eliminación de tus datos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          En Insightly, respetamos tu derecho a la privacidad y al control de tu información personal.
        </p>
        <p>
          De acuerdo con las políticas de la plataforma de Meta (Facebook e Instagram) y las regulaciones de privacidad como el GDPR, puedes solicitar la eliminación completa de los datos que hemos recopilado a través de tu conexión con nuestras aplicaciones.
        </p>
        <p>
          Para solicitar la eliminación de tus datos, por favor, envía un correo electrónico a <a href="mailto:privacy@insightly.app" className="underline">privacy@insightly.app</a> con el asunto "Solicitud de Eliminación de Datos". Nos pondremos en contacto contigo para confirmar tu identidad y procesaremos tu solicitud en el plazo estipulado por la ley.
        </p>
         <p>
          Una vez procesada la solicitud, todos tus datos vinculados y de análisis serán eliminados permanentemente de nuestros sistemas.
        </p>
      </CardContent>
    </>
  );
}
