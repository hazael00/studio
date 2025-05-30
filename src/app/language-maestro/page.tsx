import { PageHeader } from '@/components/ui/page-header';
import { TranslationForm } from './components/translation-form';
import { Languages } from 'lucide-react';

export default function LanguageMaestroPage() {
  return (
    <div>
      <PageHeader
        title="Language Maestro"
        description="¡Comunícate con el mundo! S4NT1 traduce tus mensajes en tiempo real."
        icon={Languages}
      />
      <TranslationForm />
    </div>
  );
}
