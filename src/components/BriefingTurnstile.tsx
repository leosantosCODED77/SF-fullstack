import { useEffect, useRef } from 'react';

type TurnstileApi = {
  render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => string;
  remove: (widgetId: string) => void;
};
const getApi = () => (window as Window & { turnstile?: TurnstileApi }).turnstile;

/** Only loads when the optional CRM intake site key is configured. */
export function BriefingTurnstile({
  siteKey,
  onToken,
}: {
  siteKey: string;
  onToken: (token: string) => void;
}) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let widget: string | undefined;
    onToken('');
    const mount = () => {
      if (disposed || !element.current || widget || !getApi()) return;
      widget = getApi()!.render(element.current, {
        sitekey: siteKey,
        callback: onToken,
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      });
    };
    if (getApi()) mount();
    else {
      let script = document.querySelector<HTMLScriptElement>('script[data-sf-turnstile]');
      if (!script) {
        script = document.createElement('script');
        script.dataset.sfTurnstile = 'true';
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', mount);
      const interval = window.setInterval(() => {
        if (getApi()) { window.clearInterval(interval); mount(); }
      }, 250);
      return () => {
        disposed = true;
        script?.removeEventListener('load', mount);
        window.clearInterval(interval);
        if (widget && getApi()) getApi()!.remove(widget);
        onToken('');
      };
    }
    return () => {
      disposed = true;
      if (widget && getApi()) getApi()!.remove(widget);
      onToken('');
    };
  }, [siteKey, onToken]);
  return <div ref={element} aria-label="Verificação de segurança do formulário" />;
}
