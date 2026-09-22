'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';
import { SoundProvider } from '@web-kits/audio/react';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider search={{ SearchDialog }} theme={{ defaultTheme: 'dark' }}>
      <SoundProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </SoundProvider>
    </RootProvider>
  );
}
