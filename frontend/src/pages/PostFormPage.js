import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import Cropper from 'react-easy-crop';
import ClickSpark from '../components/ClickSpark';
import TopRightTools from '../components/TopRightTools';

function getCroppedImg(imageSrc, crop, aspect, outputWidth = 1200, outputHeight = 675) {
    // Utility to crop the image and return a base64 string
    return new Promise((resolve, reject) => {
        const image = new window.Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = outputWidth;
            canvas.height = outputHeight;
            const ctx = canvas.getContext('2d');
            // Calculate cropping area
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const sx = crop.x * scaleX;
            const sy = crop.y * scaleY;
            const sw = crop.width * scaleX;
            const sh = crop.height * scaleY;
            ctx.drawImage(
                image,
                sx,
                sy,
                sw,
                sh,
                0,
                0,
                outputWidth,
                outputHeight
            );
            resolve(canvas.toDataURL('image/jpeg', 0.95));
        };
        image.onerror = reject;
    });
}

const ImageCropper = ({ file, onCrop, aspect = 16 / 9 }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    useEffect(() => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target.result);
        reader.readAsDataURL(file);
    }, [file]);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels, aspect);
        onCrop(croppedImg);
    };

    if (!imageSrc) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                <div className="relative w-[400px] h-[225px] bg-gray-200">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
                <div className="flex space-x-4 mt-4">
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={e => setZoom(Number(e.target.value))}
                        className="w-32"
                    />
                    <button type="button" className="bg-btggreen text-white px-4 py-2 rounded" onClick={handleCrop}>Crop & Add</button>
                </div>
            </div>
        </div>
    );
};

const PostFormPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: '',
        author: '',
        title: '' // still needed for backend, but not shown as a separate input
    });
    const [slides, setSlides] = useState([]); // {type, content, isTitle?}
    const [slideType, setSlideType] = useState('text');
    const [textContent, setTextContent] = useState('');
    const [isTitle, setIsTitle] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [textTitle, setTextTitle] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('btg_username') || '';
        setFormData((prev) => ({ ...prev, author: username }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Slide add logic
    const handleAddSlide = () => {
        if (slideType === 'text' && (textTitle.trim() || textContent.trim())) {
            let newSlides = slides;
            let newTitle = formData.title;
            if (isTitle) {
                // Only one title slide allowed
                newSlides = slides.map(s => ({ ...s, isTitle: false }));
                newTitle = textTitle.trim();
            }
            setSlides([
                ...newSlides,
                {
                    type: 'text',
                    title: textTitle.trim(),
                    content: textContent.trim(),
                    isTitle
                }
            ]);
            setTextTitle('');
            setTextContent('');
            setIsTitle(false);
            setFormData(f => ({ ...f, title: newTitle }));
        } else if (slideType === 'image' && imageFile) {
            setShowCropper(true);
        }
    };
    const handleCrop = (croppedDataUrl) => {
        setSlides([...slides, { type: 'image', content: croppedDataUrl }]);
        setImageFile(null);
        setShowCropper(false);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImageFile(file);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImageFile(e.dataTransfer.files[0]);
        }
    };
    const handleDragOver = (e) => e.preventDefault();
    const handleRemoveSlide = (idx) => {
        setSlides(slides.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        let title = formData.title;
        if (!title) {
            // fallback: use first text slide's title or content
            const firstTitleSlide = slides.find(s => s.type === 'text' && s.isTitle);
            if (firstTitleSlide && firstTitleSlide.title) {
                title = firstTitleSlide.title;
            } else if (firstTitleSlide && firstTitleSlide.content) {
                title = firstTitleSlide.content;
            } else {
                // fallback: use first text slide's content
                const firstText = slides.find(s => s.type === 'text');
                if (firstText && firstText.title) {
                    title = firstText.title;
                } else if (firstText && firstText.content) {
                    title = firstText.content;
                }
            }
        }
        if (!title) {
            setError('A title is required. Please mark a text slide as the title or provide a title.');
            setLoading(false);
            return;
        }
        try {
            const response = await createPost({ ...formData, title, slides });
            if (response.success) {
                navigate('/home');
            } else {
                setError(response.message || 'Failed to create post');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ClickSpark sparkColor='#F0A04B' sparkSize={10} sparkRadius={15} sparkCount={8} duration={3000}>
            <div className="min-h-screen bg-gradient-to-br from-btggreen via-white to-btgcream flex items-center justify-center">
                {/* Centered top heading */}
                <div className="w-full flex justify-center absolute top-[50px] left-0">
                    <div className="font-amatic text-6xl text-gray-900 text-center">
                        Create Your Post
                    </div>
                </div>
                {/* navbar */}
                <nav className="fixed left-10 rounded-lg top-1/2 -translate-y-1/2 bg-btgcream w-[80px] h-[350px] shadow-lg p-4 flex flex-col items-center justify-center space-y-8">
                    {/* Home Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/home')}>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">home</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            {/* Notch */}
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-2">Home</span>
                        </div>
                    </div>
                    {/* Dashboard Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/dashboardpage')}>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">dashboard</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-2">Dashboard</span>
                        </div>
                    </div>
                    {/* About Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/about')}>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">info</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-2">About</span>
                        </div>
                    </div>
                    {/* Logout Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/') }>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">logout</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-2">Logout</span>
                        </div>
                    </div>
                </nav>
                {/* top right action bar */}
                <TopRightTools navigate={navigate} />
                
                {/* post creation form below the title */}
                <div className="flex items-start justify-center pt-[160px]">
                    <form className="bg-btgcream rounded-xl shadow-lg p-8 w-[600px] flex flex-col space-y-4" onSubmit={handleSubmit}>
                        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                        {/* Category, Author, Date fields inside the form box */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-2">
                            <div className="flex-1">
                                <label className="block text-btggreen font-bold mb-1 font-poppins" htmlFor="category">Category</label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-btggreen rounded-md focus:outline-none focus:ring-2 focus:ring-btgyellow"
                                    placeholder="e.g. Artificial Intelligence"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-btggreen font-bold mb-1 font-poppins" htmlFor="author">Author</label>
                                <input
                                    id="author"
                                    name="author"
                                    type="text"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-btggreen rounded-md focus:outline-none focus:ring-2 focus:ring-btgyellow"
                                    placeholder="Your name"
                                    required
                                    disabled={loading || Boolean(localStorage.getItem('btg_username'))}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-btggreen font-bold mb-1 font-poppins">Date</label>
                                <input
                                    type="text"
                                    value={new Date().toLocaleDateString()}
                                    className="w-full px-3 py-2 border border-btggreen rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                                    readOnly
                                    tabIndex={-1}
                                />
                            </div>
                        </div>
                        {/* Slides builder */}
                        <div className="mt-4">
                            <label className="block text-btggreen font-bold mb-1 font-poppins">Slides</label>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <select value={slideType} onChange={e => setSlideType(e.target.value)} className="border rounded px-2 py-1">
                                    <option value="text">Text</option>
                                    <option value="image">Image</option>
                                </select>
                                {slideType === 'text' ? (
                                    <div className="flex-1 flex flex-col gap-2 w-full max-w-full">
                                        <label className="block text-btggreen font-semibold text-base">Slide Title (optional)</label>
                                        <input
                                            type="text"
                                            value={textTitle}
                                            onChange={e => setTextTitle(e.target.value)}
                                            className="border rounded px-3 py-2 w-full text-lg"
                                            placeholder="Enter title for this slide (optional)"
                                            disabled={loading}
                                            style={{ height: '48px' }}
                                        />
                                        <label className="flex items-center mt-1 mb-2">
                                            <input
                                                type="checkbox"
                                                checked={isTitle}
                                                onChange={e => setIsTitle(e.target.checked)}
                                                disabled={loading}
                                            />
                                            <span className="ml-2 text-sm">Mark as Title</span>
                                        </label>
                                        <label className="block text-btggreen font-semibold text-base mt-2">Slide Content</label>
                                        <textarea
                                            value={textContent}
                                            onChange={e => setTextContent(e.target.value)}
                                            className="border rounded px-3 py-2 w-full text-base resize-y"
                                            placeholder="Enter content for this slide"
                                            rows={4}
                                            disabled={loading}
                                        />
                                        <button type="button" className="bg-btggreen text-white px-4 py-2 rounded mt-2 self-end" onClick={handleAddSlide} disabled={loading}>
                                            Add Slide
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col gap-2 w-full max-w-full">
                                        <div
                                            className="border-dashed border-2 border-btggreen rounded px-4 py-2 flex-1 flex items-center justify-center cursor-pointer bg-white min-w-[120px]"
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                        >
                                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                                            <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex items-center justify-center">
                                                {imageFile ? imageFile.name : 'Browse or Drop Image'}
                                            </label>
                                        </div>
                                        <button type="button" className="bg-btggreen text-white px-4 py-2 rounded mt-2 self-end" onClick={handleAddSlide} disabled={loading || !imageFile}>
                                            Add Slide
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Image cropper modal/section */}
                            {showCropper && imageFile && (
                                <ImageCropper file={imageFile} onCrop={handleCrop} aspect={16 / 9} />
                            )}
                            {/* Slides preview */}
                            <div className="flex flex-col space-y-2 mt-2">
                                {slides.map((slide, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 bg-white rounded p-2">
                                        {slide.type === 'text' ? (
                                            <span className={slide.isTitle ? 'text-btggreen font-bold' : 'text-btggreen'}>
                                                {slide.title && <span className="font-semibold mr-2">{slide.title}</span>}
                                                {slide.content} {slide.isTitle && <span className="ml-1 text-xs text-btgyellow">(Title)</span>}
                                            </span>
                                        ) : (
                                            <img src={slide.content} alt="slide" className="h-16 w-24 object-cover rounded" />
                                        )}
                                        <button type="button" className="text-red-500 ml-2" onClick={() => handleRemoveSlide(idx)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-md font-semibold mt-2 transition-colors duration-200 bg-btggreen text-white hover:bg-btgorange shadow-md"
                            disabled={loading || slides.length === 0}
                        >
                            {loading ? 'Posting...' : 'Create Post'}
                        </button>
                    </form>
                </div>
            </div>
        </ClickSpark>
    );
};

export default PostFormPage; 