# FiloQuest Chile

Una plataforma gamificada para estudiantes de 3° Medio en Chile, diseñada para explorar los grandes problemas de la filosofía a través de desafíos y misiones.

## Despliegue en Vercel

Esta aplicación está configurada para ser desplegada en Vercel como una **Single Page Application (SPA)**.

### Pasos para el despliegue:

1.  **Conecta tu repositorio**: Sube el código a GitHub, GitLab o Bitbucket.
2.  **Importa en Vercel**: Ve a [vercel.com](https://vercel.com) e importa tu proyecto.
3.  **Configuración del Proyecto**:
    *   **Framework Preset**: Vite
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Variables de Entorno**:
    *   Si usas la API de Gemini, asegúrate de añadir `GEMINI_API_KEY` en la sección de "Environment Variables" de Vercel.
5.  **Despliega**: Haz clic en "Deploy".

### Solución de Problemas Comunes:

*   **Conflictos de Dependencias (ERESOLVE)**: Si encuentras errores de resolución de dependencias (especialmente con React 19), hemos incluido un archivo `.npmrc` con `legacy-peer-deps=true` para mitigar estos conflictos comunes durante la instalación en Vercel.
