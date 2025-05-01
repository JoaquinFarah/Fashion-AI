
import React, { useState, useContext, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle, UploadCloud, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { ProfileContext } from '@/context/ProfileContext';

const PROFILE_PIC_BUCKET = 'profile-pictures';

const AccountPage = () => {
  const { profileImageUrl, setProfileImageUrl } = useContext(ProfileContext);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  // Placeholder user data
  const [userInfo, setUserInfo] = useState({
    name: 'Cyber User',
    email: 'user@fashionai.nexus',
    joinedDate: '2025-01-15',
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
        setUploadError("File size exceeds 2MB limit.");
        setPreviewUrl(null);
        setSelectedFile(null);
        return;
      }
      if (!file.type.startsWith('image/')) {
        setUploadError("Invalid file type. Please select an image.");
        setPreviewUrl(null);
        setSelectedFile(null);
        return;
      }
      setUploadError(null);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({ title: "No file selected", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Optional: Remove old profile picture if it exists
      // This requires knowing the old file path, which needs to be stored somewhere (e.g., user metadata)
      // For simplicity, we'll just upload and potentially overwrite or create new files.
      // A better approach would be to store the path and delete the old one.

      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `profile-${Date.now()}.${fileExt}`; // Unique filename
      const filePath = `${fileName}`; // Store in root of profile bucket

      const { data, error } = await supabase.storage
        .from(PROFILE_PIC_BUCKET)
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true, // Overwrite if file with same name exists (useful if using a fixed name per user)
          contentType: selectedFile.type,
        });

      if (error) {
        throw error;
      }

      // Get the public URL of the newly uploaded file
      const { data: publicURLData } = supabase.storage
        .from(PROFILE_PIC_BUCKET)
        .getPublicUrl(filePath);

      if (!publicURLData?.publicUrl) {
        throw new Error("Could not retrieve public URL after upload.");
      }

      const newImageUrl = publicURLData.publicUrl;

      // Update context and potentially user metadata in Supabase Auth (if storing there)
      setProfileImageUrl(newImageUrl);
      setPreviewUrl(null); // Clear preview after successful upload
      setSelectedFile(null); // Clear selected file

      toast({
        title: "Profile Picture Updated",
        description: "Your new avatar is now active.",
      });

    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploadError(error.message || "Failed to upload image. Ensure the 'profile-pictures' bucket is public and policies are set.");
      toast({
        title: "Upload Failed",
        description: error.message || "Could not update profile picture.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Account Settings
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Profile Picture Section */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="cyber-card text-center p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-glow-primary">Avatar</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary cyber-glow-primary shadow-lg">
                  <AvatarImage src={previewUrl || profileImageUrl} alt="User profile" />
                  <AvatarFallback className="bg-primary/20 text-primary text-4xl">
                    <UserCircle size={64} />
                  </AvatarFallback>
                </Avatar>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  className="hidden"
                />

                <Button
                  onClick={triggerFileInput}
                  variant="outline"
                  className="w-full mb-3 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary cyber-glow-secondary"
                  disabled={isUploading}
                >
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>

                {selectedFile && !isUploading && (
                  <Button
                    onClick={handleUpload}
                    className="w-full cyber-button"
                  >
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Upload New Avatar
                  </Button>
                )}

                {isUploading && (
                  <Button className="w-full cyber-button" disabled>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </Button>
                )}

                {uploadError && (
                  <motion.p
                    className="mt-3 text-xs text-destructive flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AlertCircle className="w-3 h-3 mr-1"/> {uploadError}
                  </motion.p>
                )}
                 <p className="text-xs text-cyber-muted mt-3">Max 2MB. JPG, PNG, GIF, WEBP.</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Info Section */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-glow-secondary">Profile Information</CardTitle>
                <CardDescription className="text-cyber-muted">
                  View and manage your account details. (Editing disabled for now)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-neon-cyan">Display Name</Label>
                  <Input id="name" value={userInfo.name} readOnly disabled className="bg-cyber-surface/50 border-cyber-border/50 text-cyber-text" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-neon-cyan">Email Address</Label>
                  <Input id="email" type="email" value={userInfo.email} readOnly disabled className="bg-cyber-surface/50 border-cyber-border/50 text-cyber-text" />
                </div>
                 <div className="space-y-1">
                  <Label htmlFor="joined" className="text-neon-cyan">Member Since</Label>
                  <Input id="joined" value={new Date(userInfo.joinedDate).toLocaleDateString()} readOnly disabled className="bg-cyber-surface/50 border-cyber-border/50 text-cyber-text" />
                </div>
                 {/* Add more fields or edit functionality later */}
                 <div className="pt-4">
                    <Button disabled className="opacity-50 cursor-not-allowed">Save Changes (Disabled)</Button>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
  