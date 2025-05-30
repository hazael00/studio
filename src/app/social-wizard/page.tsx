import { PageHeader } from '@/components/ui/page-header';
import { SocialMediaForm } from './components/social-media-form';
import { Sparkles } from 'lucide-react';

export default function SocialWizardPage() {
  return (
    <div>
      <PageHeader
        title="Social Media Wizard"
        description="¡Genera contenido épico para tus redes sociales con S4NT1! Títulos virales, posts creativos y más."
        icon={Sparkles}
      />
      <SocialMediaForm />
    </div>
  );
}
