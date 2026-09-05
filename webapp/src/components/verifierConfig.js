export const modalityConfig = {
  text: { label: 'Text', title: 'TruthLens Text Verification', description: 'Assess messages, articles, and claims for AI-content, scam, and verification signals.', action: 'Analyze Text', icon: 'text', placeholder: 'Paste text, a message, article, or claim to review…', formats: 'Paste text directly — no file needed' },
  image: { label: 'Image', title: 'TruthLens Image Verification', description: 'Analyze an image for suspicious manipulation, AI-generated patterns, metadata anomalies, and extracted text.', action: 'Analyze Image', icon: 'image', accept: 'image/jpeg,image/png,image/webp,image/gif,image/bmp', formats: 'JPG, PNG, WEBP, GIF, BMP · up to 15 MB', maxSize: 15, types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'], visual: '/images/public-information.png' },
  video: { label: 'Video', title: 'TruthLens Video Verification', description: 'Analyze sampled video frames for suspicious temporal or visual signals.', action: 'Analyze Video', icon: 'video', accept: 'video/mp4,video/quicktime,video/webm,video/x-msvideo,video/avi,video/x-matroska,video/mkv', formats: 'MP4, MOV, WEBM, AVI, MKV · up to 50 MB', maxSize: 50, types: ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo', 'video/avi', 'video/x-matroska', 'video/mkv'], visual: '/images/video-call.png' },
  audio: { label: 'Audio', title: 'TruthLens Audio Verification', description: 'Analyze voice recordings for suspicious synthetic or manipulation indicators.', action: 'Analyze Audio', icon: 'audio', accept: 'audio/mpeg,audio/wav,audio/x-wav,audio/ogg,audio/flac,audio/mp3,audio/mp4,audio/aac', formats: 'MP3, WAV, M4A, OGG, FLAC, AAC · up to 20 MB', maxSize: 20, types: ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/flac', 'audio/mp3', 'audio/mp4', 'audio/aac'] },
};

export const validateSelectedFile = (file, config) => {
  if (!file || !file.size) return 'Choose a file with content to continue.';
  if (file.size > config.maxSize * 1024 * 1024) return `This file is larger than the ${config.maxSize} MB limit for ${config.label.toLowerCase()} verification.`;
  const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
  const knownExtensions = { image: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'], video: ['.mp4', '.mov', '.webm', '.avi', '.mkv'], audio: ['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a'] };
  if (!config.types.includes(file.type) && !knownExtensions[config.label.toLowerCase()]?.includes(extension)) return `That file type is not supported. ${config.formats}`;
  return '';
};
