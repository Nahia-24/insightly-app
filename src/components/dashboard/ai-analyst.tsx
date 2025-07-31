
'use client';

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { analyzeMetrics } from '@/ai/flows/metrics-analyst';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { useAiAnalyst } from '@/hooks/use-ai-analyst';

type AiAnalystProps = {
  metricsData: string;
};

export default function AiAnalyst({ metricsData }: AiAnalystProps) {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { open, setOpen } = useAiAnalyst();

  const handleAskAI = async () => {
    if (!query) return;
    setIsLoading(true);
    setAnalysis('');
    try {
      const result = await analyzeMetrics({ metricsData, query });
      setAnalysis(result.analysis);
    } catch (error) {
      console.error('Error analyzing metrics:', error);
      toast({
        title: 'Error',
        description: 'No se pudo obtener el análisis de la IA. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        setQuery('');
        setAnalysis('');
        setIsLoading(false);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot />
            Preguntar al Analista IA
          </DialogTitle>
          <DialogDescription>
            Obtén información instantánea sobre el rendimiento de tus redes sociales. Haz una pregunta a continuación.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Ej: ¿Qué plataforma tiene la mejor interacción? o Resume mi rendimiento este mes."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
          />
        </div>
        {(isLoading || analysis) && (
            <Card>
                <CardContent className="p-4">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ) : (
                        <p className="text-sm">{analysis}</p>
                    )}
                </CardContent>
            </Card>
        )}
        <DialogFooter>
          <Button onClick={handleAskAI} disabled={isLoading || !query}>
            {isLoading ? 'Analizando...' : 'Obtener Información'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
