import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

export default function Carosel() {
    const [images, setImages] = useState(null);
    const [animate, setAnimate] = useState(false);

    // Small fallback set in case PhotoService is not available or fails
    const sampleImages = [
        { itemImageSrc: 'https://picsum.photos/1600/800?random=1', thumbnailImageSrc: 'https://picsum.photos/100/50?random=1', alt: 'Imagen 1' },
        { itemImageSrc: 'https://picsum.photos/1600/800?random=2', thumbnailImageSrc: 'https://picsum.photos/100/50?random=2', alt: 'Imagen 2' },
        { itemImageSrc: 'https://picsum.photos/1600/800?random=3', thumbnailImageSrc: 'https://picsum.photos/100/50?random=3', alt: 'Imagen 3' }
    ];

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                if (PhotoService && typeof PhotoService.getImages === 'function') {
                    const data = await PhotoService.getImages();
                    if (mounted) setImages(data || sampleImages);
                } else {
                    setImages(sampleImages);
                }
            } catch (err) {
                setImages(sampleImages);
            }
        }

        load();

        // trigger entrance animation after mount
        setTimeout(() => { if (mounted) setAnimate(true); }, 80);

        return () => { mounted = false; }
    }, []);

    const itemTemplate = (item) => {
        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt}
                style={{ width: '100%', height: '60vh', objectFit: 'cover', display: 'block' }}
            />
        );
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    return (
        <div className={`card ${animate ? 'galleria-enter' : ''}`} style={{ width: '100%' }}>
            <Galleria
                value={images}
                numVisible={5}
                circular
                style={{ width: '100%' }}
                showThumbnails={false}
                showItemNavigators
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
            />
        </div>
    )
}
