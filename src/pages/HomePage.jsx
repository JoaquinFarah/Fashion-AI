
import React from "react";
import { motion } from "framer-motion";
import FeaturedSection from "@/components/sections/FeaturedSection";
import UploadSection from "@/components/sections/UploadSection";
import CollectionSection from "@/components/sections/CollectionSection";
import { useFashionImages } from "@/hooks/useFashionImages";

const HomePage = () => {
  const {
    savedImages,
    selectedImages,
    isLoading,
    isFetching,
    handleImagesSelected,
    handleRemoveSelectedImage,
    handleRemoveSavedImage,
    handleSaveImages,
    handleClearSelected,
  } = useFashionImages();

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="page-content"
      >
         <header className="text-center mb-10 md:mb-16 pt-8">
           <motion.h1
             className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3
                        bg-gradient-to-r from-neon-pink via-purple-500 to-neon-cyan
                        bg-clip-text text-transparent animate-neon-glow"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1, duration: 0.6, type: 'spring', stiffness: 100 }}
           >
             Fashion AI Nexus
           </motion.h1>
           <motion.p
             className="text-cyber-muted text-sm md:text-base max-w-2xl mx-auto"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.5 }}
           >
             Upload, analyze, share, rate and curate your ultimate style library. Powered by AI, styled by you.
           </motion.p>
         </header>

        <FeaturedSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <UploadSection
            selectedImages={selectedImages}
            handleImagesSelected={handleImagesSelected}
            handleRemoveSelectedImage={handleRemoveSelectedImage}
            handleClearSelected={handleClearSelected}
            handleSaveImages={handleSaveImages}
            isLoading={isLoading && selectedImages.length > 0}
          />

          <CollectionSection
            savedImages={savedImages}
            isFetching={isFetching}
            handleRemoveSavedImage={handleRemoveSavedImage}
          />
        </div>
      </motion.div>

      {isLoading && selectedImages.length === 0 && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="text-white text-sm ml-4">Processing request...</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
  