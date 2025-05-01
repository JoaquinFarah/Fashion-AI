
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFashionImages } from '@/hooks/useFashionImages';
import { RefreshCw, X, ImageOff } from 'lucide-react';

const MyPicsPage = () => {
  const { savedImages, isFetching, isLoading, handleRemoveSavedImage } = useFashionImages();

  return (
    <div className="page-container">
      <div className="page-content">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Style Collection
        </motion.h1>

        {isFetching ? (
          <div className="flex justify-center items-center h-60">
            <RefreshCw className="h-12 w-12 text-secondary animate-spin" />
            <p className="ml-4 text-lg text-cyber-muted">Loading your styles...</p>
          </div>
        ) : savedImages.length === 0 ? (
           <div className="text-center py-16">
             <ImageOff className="h-16 w-16 mx-auto text-cyber-muted mb-4" />
             <p className="text-xl text-cyber-muted italic">Your collection is empty.</p>
             <p className="text-sm text-cyber-muted mt-2">Upload some images on the homepage to get started!</p>
           </div>
        ) : (
          <motion.div
            className="image-grid"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {savedImages.map((image) => (
                <motion.div
                  key={image.id}
                  className="image-container cyber-card group"
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <img
                    src={image.url}
                    alt={image.name || "Saved fashion image"}
                    className="rounded-md object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <motion.button
                    className="remove-button"
                    onClick={() => handleRemoveSavedImage(image.id)}
                    disabled={isLoading}
                    whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isLoading ? <RefreshCw size={16} className="animate-spin"/> : <X size={16} />}
                  </motion.button>
                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-white truncate">{image.name}</p>
                   </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
       {isLoading && (
         <div className="loading-overlay">
           <div className="spinner"></div>
           <p className="text-white text-sm ml-4">Removing image...</p>
         </div>
       )}
    </div>
  );
};

export default MyPicsPage;
  