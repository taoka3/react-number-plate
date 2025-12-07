import { toPng } from 'html-to-image';
import type { RefObject } from "react";

type Props = {
  targetRef: RefObject<HTMLDivElement | null>;
};

const DownloadButton = ({ targetRef }: Props) => {
  const handleDownload = async () => {
    if (!targetRef.current) return;
    
    toPng(targetRef.current,{
      filter: (n) => {
        if (n instanceof HTMLSelectElement) {

          const currentValue = n.value;

          Array.from(n.options).forEach((opt) => {
            if (opt.value === currentValue) {
              opt.setAttribute("selected", "selected");
            } else {
              opt.removeAttribute("selected");
            }
          });
          return true;
        }

        return true;
      }
    }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'NumberPlate.png';
        link.href = dataUrl;
        link.click();
        })
        .catch((err) => console.error(err));        
  };

  return <button onClick={handleDownload}>ダウンロードする</button>;
};

export default DownloadButton;
