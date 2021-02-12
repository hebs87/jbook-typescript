import React, {FC, ReactElement, useEffect, useRef} from 'react';
import "./preview.styles.scss";

interface PreviewProps {
  code: string;
  error: string;
}

// HTML to render in iframe
const html = `
  <html lang="en">
    <head>
      <title>Preview</title>
    </head>
    <body>
      <div id="root"></div>
      <script >
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4><p>' + err + '</p></div>';
          console.error(err);
        }
      
        // Error handling for async events
        window.addEventListener('error', (event) => {
          // Prevent standard browser console log
          event.preventDefault();
          handleError(event.error);
        });
        
        // Error handling for standard syntax errors
        window.addEventListener('message', (event) => {
          try {
            // Transpile the data to render in the iframe
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4><p>' + err + '</p></div>';
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

const Preview: FC<PreviewProps> = ({code, error}): ReactElement => {
  const iframe = useRef<any>();

  useEffect(() => {
    // Reset iframe content to remove and changes from previous execution
    iframe.current.srcdoc = html;
    // Set the result code as the code state to render in the iframe - seTimeout to prevent early execution
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        frameBorder="0"
      />
      {
        error &&
        <div className="preview-error">
          <p><strong>Compilation Error</strong></p>
          <p>{error}</p>
        </div>
      }
    </div>
  );
}

export default Preview;
