import React, {FC, ReactElement, useEffect, useRef} from 'react';
import "./preview.styles.scss";

interface PreviewProps {
  code: string;
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
        window.addEventListener('message', (event) => {
          try {
            // Transpile the data to render in the iframe
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4><p>' + err + '</p></div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

const Preview: FC<PreviewProps> = ({code}): ReactElement => {
  const iframe = useRef<any>();

  useEffect(() => {
    // Reset iframe content to remove and changes from previous execution
    iframe.current.srcdoc = html;
    // Set the result code as the code state to render in the iframe
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        frameBorder="0"
      >
      </iframe>
    </div>
  );
}

export default Preview;
