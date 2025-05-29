import React from 'react';

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/201110083675"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-200"
      title="Chat with us on WhatsApp"
    >
      <img src="/photo/I1.png" alt="WhatsApp" className="w-8 h-8" />
    </a>
  );
} 