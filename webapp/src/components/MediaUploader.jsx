import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { validateSelectedFile } from './verifierConfig';

const formatSize = (bytes) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export default function MediaUploader({ modality, config, file, onFileChange, disabled, error, onError }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [duration, setDuration] = useState(null);
  useEffect(() => { if (!file) { setPreviewUrl(''); setDuration(null); return undefined; } const url = URL.createObjectURL(file); setPreviewUrl(url); return () => URL.revokeObjectURL(url); }, [file]);
  const selectFile = (nextFile) => { const message = validateSelectedFile(nextFile, config); if (message) { onError(message); return; } onError(''); onFileChange(nextFile); };
  const drop = (event) => { event.preventDefault(); setDragging(false); if (!disabled) selectFile(event.dataTransfer.files?.[0]); };
  if (file) return <div className="media-preview"><div className={`preview-surface ${modality}`}>{modality === 'image' && <img src={previewUrl} alt={`Preview of ${file.name}`} />}{modality === 'video' && <video src={previewUrl} controls preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} />}{modality === 'audio' && <><div className="audio-preview-icon"><Icon name="audio" size={26} /></div><audio src={previewUrl} controls preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} /></>}</div><div className="selected-file"><span className="selected-file-icon"><Icon name={config.icon} size={18} /></span><span><b>{file.name}</b><small>{formatSize(file.size)}{duration && ` · ${Math.round(duration)} sec`}</small></span><button onClick={() => { onFileChange(null); onError(''); }} disabled={disabled} aria-label="Remove selected file"><Icon name="close" size={17} /></button></div></div>;
  return <div className={`upload-wrap ${dragging ? 'is-dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop}><input ref={inputRef} type="file" accept={config.accept} onChange={(event) => selectFile(event.target.files?.[0])} disabled={disabled} /><button type="button" className="upload-panel" disabled={disabled} onClick={() => inputRef.current?.click()}><span className="upload-lens"><Icon name="upload" size={24} /></span><strong>Drag & drop a {config.label.toLowerCase()} or click to browse</strong><span>{config.formats}</span></button>{error && <p className="form-error" role="alert"><Icon name="alert" size={16} />{error}</p>}</div>;
}
