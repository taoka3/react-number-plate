import { toPng } from 'html-to-image';
import type { RefObject } from "react";

type Props = {
  targetRef: RefObject<HTMLDivElement | null>;
};

const DownloadButton = ({ targetRef }: Props) => {
  const handleDownload = async () => {
    if (!targetRef.current) return;
    
    toPng(targetRef.current)
        .then((dataUrl) => {
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
