
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const ProfileContext = createContext({
  profileImageUrl: null,
  setProfileImageUrl: () => {},
  isLoading: true,
});

const PROFILE_IMAGE_KEY = 'fashion_ai_profile_image_url'; // Key for local storage

export const ProfileProvider = ({ children }) => {
  const [profileImageUrl, setProfileImageUrlState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile image URL from local storage initially
  useEffect(() => {
    const storedUrl = localStorage.getItem(PROFILE_IMAGE_KEY);
    if (storedUrl) {
      setProfileImageUrlState(storedUrl);
    }
    // In a real app, you might fetch this from user metadata in Supabase Auth
    // For now, local storage provides persistence across refreshes.
    setIsLoading(false);
  }, []);

  // Update local storage whenever the URL changes
  const setProfileImageUrl = (url) => {
    if (url) {
      localStorage.setItem(PROFILE_IMAGE_KEY, url);
    } else {
      localStorage.removeItem(PROFILE_IMAGE_KEY);
    }
    setProfileImageUrlState(url);
  };

  return (
    <ProfileContext.Provider value={{ profileImageUrl, setProfileImageUrl, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};
  