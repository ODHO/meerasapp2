
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { Language } from '../types';
import { translations } from '../translations';

// Set worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface BookReaderProps {
  lang: Language;
  onBack: () => void;
}

const PDF_URL = "../assets/TARAZI_SHARH_SIRAJI.pdf"; // Sample PDF

const BookReader: React.FC<BookReaderProps> = ({ lang, onBack }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const bookRef = useRef<any>(null);
  const t = translations[lang];
  const isUrdu = lang === 'ur';

  // Responsive zoom adjustment
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setZoom(0.65);
      else if (width < 768) setZoom(0.8);
      else if (width < 1024) setZoom(0.9);
      else setZoom(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Prevent download shortcuts and right click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const pages = useMemo(() => {
    const p = [];
    for (let i = 0; i < numPages; i++) {
        p.push(
            <div key={i} className="bg-white shadow-inner overflow-hidden border-l border-gray-200">
                <Page 
                    pageNumber={i + 1} 
                    width={500 * zoom} 
                    renderAnnotationLayer={false} 
                    renderTextLayer={false}
                    className="mx-auto"
                />
            </div>
        );
    }
    return p;
  }, [numPages, zoom]);

  return (
    <div className={`flex flex-col transition-all duration-500 ${isUrdu ? 'rtl' : 'ltr'}`}>
      {/* Header / Controls */}
      <div className="bg-white/80 backdrop-blur-md rounded-t-3xl border-b border-emerald-100 p-3 md:p-4 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-2 md:gap-4">
            <button 
                onClick={onBack}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-100/50 text-emerald-800 flex items-center justify-center hover:bg-emerald-200 transition-all font-bold"
            >
                <i className={`text-sm md:text-base fa-solid ${isUrdu ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
            </button>
            <h2 className="font-bold text-emerald-900 text-sm md:text-xl hidden sm:block">{(t as any).book_title}</h2>
        </div>

        <div className="flex items-center gap-1 md:gap-4 bg-emerald-50/50 p-1 md:p-1.5 rounded-full border border-emerald-100">
            <button 
                onClick={() => setZoom(prev => Math.max(0.3, prev - 0.1))}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full hover:bg-white text-emerald-800 transition-all text-xs md:text-sm shadow-sm flex items-center justify-center border border-transparent hover:border-emerald-100"
                title={(t as any).book_zoom_out}
            >
                <i className="fa-solid fa-minus"></i>
            </button>
            <span className="text-[10px] md:text-xs font-bold text-emerald-900 w-8 md:w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button 
                onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full hover:bg-white text-emerald-800 transition-all text-xs md:text-sm shadow-sm flex items-center justify-center border border-transparent hover:border-emerald-100"
                title={(t as any).book_zoom_in}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="hidden md:block w-px h-4 bg-emerald-200 mx-1"></div>
            <button 
                onClick={toggleFullscreen}
                className="hidden md:flex w-8 h-8 rounded-full hover:bg-white text-emerald-800 transition-all text-sm shadow-sm items-center justify-center border border-transparent hover:border-emerald-100"
                title={isFullscreen ? (t as any).book_exit_fullscreen : (t as any).book_fullscreen}
            >
                <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
            </button>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
            <span className="text-[10px] md:text-xs font-bold text-gray-500 hidden lg:block">
                {(t as any).book_page} {currentPage + 1} {(t as any).book_of} {numPages}
            </span>
            <div className="flex gap-1 md:gap-2">
                <button 
                    onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                    className="w-8 h-8 md:w-auto md:px-4 md:py-2 bg-emerald-800 text-white rounded-full text-xs font-bold hover:bg-emerald-900 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center"
                    disabled={currentPage === 0}
                >
                    <i className={`fa-solid ${isUrdu ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                    <span className="hidden md:inline ml-2">{(t as any).book_prev}</span>
                </button>
                <button 
                    onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                    className="w-8 h-8 md:w-auto md:px-4 md:py-2 bg-emerald-800 text-white rounded-full text-xs font-bold hover:bg-emerald-900 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center"
                    disabled={currentPage >= numPages - 1}
                >
                    <span className="hidden md:inline mr-2">{(t as any).book_next}</span>
                    <i className={`fa-solid ${isUrdu ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                </button>
            </div>
        </div>
      </div>

      {/* Book Container */}
      <div className="flex-1 bg-emerald-900/10 rounded-b-3xl p-4 md:p-8 flex items-center justify-center overflow-hidden relative shadow-inner">
        {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10 transition-all">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin mb-4"></div>
                <p className="text-emerald-900 font-bold animate-pulse">{(t as any).book_loading}</p>
            </div>
        )}

        <div className="max-w-full max-h-full transition-transform duration-500 transform hover:scale-[1.01]" 
             style={{ cursor: 'grab', userSelect: 'none' }}
             onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
             onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
        >
          <Document
            file={PDF_URL}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
          >
            {numPages > 0 && (
                <HTMLFlipBook
                    width={500 * zoom}
                    height={707 * zoom} // A4 aspect ratio roughly
                    size="fixed"
                    minWidth={315}
                    maxWidth={1000}
                    minHeight={420}
                    maxHeight={1533}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={(e: any) => setCurrentPage(e.data)}
                    ref={bookRef}
                    className="flip-book shadow-2xl"
                    style={{ backgroundColor: 'transparent' }}
                    startPage={0}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={true}
                    startZIndex={0}
                    autoSize={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                >
                    {pages}
                </HTMLFlipBook>
            )}
          </Document>
        </div>
      </div>

      {/* Floating Instructions (Desktop) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 hover:opacity-100 transition-opacity hidden md:block">
          <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-widest bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-emerald-100">
              {isUrdu ? 'صفحات پلٹنے کے لیے کونوں پر کلک کریں یا ماؤس سے کھینچیں' : 'Click corners or drag to flip pages'}
          </p>
      </div>
    </div>
  );
};

export default BookReader;
