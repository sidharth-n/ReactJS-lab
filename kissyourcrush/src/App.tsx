// App.tsx
import React, { useRef } from 'react';
import Hero from './Hero';
import ExamplesGallery from './ExamplesGallery';
import UploadSection from './UploadSection';

const App = () => {
  // Reference to the UploadSection
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the UploadSection
  const scrollToUploadSection = () => {
    if (uploadSectionRef.current) {
      uploadSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero scrollToUploadSection={scrollToUploadSection} />
      <ExamplesGallery />
      <div ref={uploadSectionRef}>
        <UploadSection />
      </div>
    </div>
  );
};

export default App;
