import StyleGuideForm from "@/components/style-guide/style-guide-form";

export default function StyleGuidePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Guía de Estilo IA</h1>
        <p className="text-muted-foreground">
          Analiza la identidad visual de cualquier canal de YouTube.
        </p>
      </div>
      <StyleGuideForm />
    </div>
  );
}
