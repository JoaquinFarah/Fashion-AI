
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User } from 'lucide-react';

// Placeholder Data (replace with actual fetched data later)
const featuredImages = [
  { id: 'feat1', url: 'placeholder', alt: 'Dreaming pleace', description: 'Nature showing why AI never will be superior', score: 4.8, user: 'NatStylez', src:'/paisaje.jpg' },
  { id: 'feat2', url: 'placeholder', alt: 'Elegant tech drone', description: 'Because elegance is everything', score: 4.5, user: 'TechCouture', src:'/dron.jpg' },
  { id: 'feat3', url: 'placeholder', alt: 'Abstract pattern', description: 'Avant-garde animal print', score: 4.2, user: 'PixelPioneer', src: '/gato.jpg' },
];

const FeaturedSection = () => {
  return (
    <motion.section
      className="mb-10 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-glow-secondary">
        Best rated by our community
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {featuredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
          >
            <Card className="cyber-card overflow-hidden h-full flex flex-col group">
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    alt={image.alt}
                    src={image.src} />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <CardTitle className="text-lg mb-2 text-glow-primary group-hover:text-primary transition-colors">
                    {image.alt}
                  </CardTitle>
                   <p className="text-sm text-cyber-muted mb-3">{image.description}</p>
                 </div>
                 <div className="flex justify-between items-center text-xs mt-2 text-cyber-muted border-t border-cyber-border pt-2">
                   <span className="flex items-center">
                     <User className="w-3 h-3 mr-1 text-secondary"/> {image.user}
                   </span>
                   <span className="flex items-center font-bold text-secondary text-glow-secondary">
                     <Star className="w-3 h-3 mr-1 text-secondary fill-secondary"/> {image.score}
                   </span>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturedSection;
  