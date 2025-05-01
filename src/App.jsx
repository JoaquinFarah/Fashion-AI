
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/sections/FeaturedSection";
import UploadSection from "@/components/sections/UploadSection";
import CollectionSection from "@/components/sections/CollectionSection";
import { useFashionImages } from "@/hooks/useFashionImages";

function App() {
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
    <div className="min-h-screen bg-cyber-bg text-cyber-text p-4 md:p-8 font-sans">
       {/* Optional background effects */}
       <div className="fixed inset-0 z-[-1] opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/30 via-transparent to-neon-cyan/30"></div>
          {/* Add more subtle background elements if desired */}
       </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <Header />

        <FeaturedSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <UploadSection
            selectedImages={selectedImages}
            handleImagesSelected={handleImagesSelected}
            handleRemoveSelectedImage={handleRemoveSelectedImage}
            handleClearSelected={handleClearSelected}
            handleSaveImages={handleSaveImages}
            isLoading={isLoading && selectedImages.length > 0} // Show loading only on save action
          />

          <CollectionSection
            savedImages={savedImages}
            isFetching={isFetching}
            handleRemoveSavedImage={handleRemoveSavedImage}
          />
        </div>

        <Footer />
      </motion.div>

      {/* Global loading overlay for critical operations like deletion */}
       {isLoading && selectedImages.length === 0 && (
         <div className="loading-overlay">
           <div className="spinner"></div>
           <p className="text-white text-sm ml-4">Processing request...</p>
         </div>
       )}

      <Toaster />
    </div>
  );
}

export default App;
  