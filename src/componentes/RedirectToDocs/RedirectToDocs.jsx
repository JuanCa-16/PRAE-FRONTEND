import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectToDocs() {
  const navigate = useNavigate();

  useEffect(() => {
    const url  = `/0.1.0/indexDocs.html`;
    const win  = window.open(url, '_blank', 'noopener,noreferrer');

    if (!win) {                // bloqueado ➜ mismo tab
      window.location.href = url;
    } else {
      navigate(-1);            // vuelve a la pantalla anterior
    }
  }, [navigate]);

  return null;
}
